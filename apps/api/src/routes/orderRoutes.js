import { Router } from 'express';
import { createOrder } from '../controllers/orderController.js';

export const orderRoutes = Router();
// Endpoint público para registrar pedidos; el controlador aplica validaciones estrictas.
orderRoutes.post('/', createOrder);
