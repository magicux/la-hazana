import { Router } from 'express';
import { createOrder } from '../controllers/orderController.js';

export const orderRoutes = Router();
orderRoutes.post('/', createOrder);
