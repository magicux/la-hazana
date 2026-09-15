import { pool } from '../config/database.js';

export const OrderModel = {
  async create({ customer, items }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const ids = items.map((item) => item.productId);
      const { rows: products } = await client.query(
        'SELECT id, name, price FROM products WHERE active = true AND id = ANY($1::int[])',
        [ids],
      );
      if (products.length !== new Set(ids).size) throw new Error('Uno o más productos no están disponibles.');

      const byId = new Map(products.map((product) => [product.id, product]));
      const total = items.reduce((sum, item) => sum + byId.get(item.productId).price * item.quantity, 0);
      const { rows } = await client.query(
        `INSERT INTO orders (customer_name, phone, address, notes, delivery_method, total)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, status, total, created_at AS "createdAt"`,
        [customer.name, customer.phone, customer.address || null, customer.notes || null, customer.deliveryMethod, total],
      );

      for (const item of items) {
        const product = byId.get(item.productId);
        await client.query(
          'INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity) VALUES ($1, $2, $3, $4, $5)',
          [rows[0].id, product.id, product.name, product.price, item.quantity],
        );
      }
      await client.query('COMMIT');
      return rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};
