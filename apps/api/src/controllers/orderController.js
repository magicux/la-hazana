import { OrderModel } from '../models/orderModel.js';
import { logger } from '../config/logger.js';

/** Valida el pedido público; los precios siempre se recalculan desde PostgreSQL. */
export async function createOrder(req, res, next) {
  try {
    const { customer, items } = req.body;
    if (!customer?.name?.trim() || !customer?.phone?.trim()) {
      return res.status(400).json({ message: 'Nombre y teléfono son obligatorios.' });
    }
    if (!['delivery', 'pickup'].includes(customer.deliveryMethod)) {
      return res.status(400).json({ message: 'Elige despacho o retiro.' });
    }
    if (customer.deliveryMethod === 'delivery' && !customer.address?.trim()) {
      return res.status(400).json({ message: 'Ingresa una dirección para el despacho.' });
    }
    if (!Array.isArray(items) || !items.length || items.some((item) => !Number.isInteger(item.productId) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20)) {
      return res.status(400).json({ message: 'El pedido no contiene productos válidos.' });
    }
    const order = await OrderModel.create({ customer, items });
    logger.info('order_created', { requestId: req.requestId, orderId: order.id, total: order.total, itemCount: items.length, deliveryMethod: customer.deliveryMethod });
    res.status(201).json({ message: 'Pedido recibido', order });
  } catch (error) {
    next(error);
  }
}
