import { Router } from 'express';
import { createProduct, deleteProduct, listManagedProducts, listProducts, updateProduct } from '../controllers/productController.js';
import { requireAdmin } from '../middleware/auth.js';

export const productRoutes = Router();
productRoutes.get('/', listProducts);
productRoutes.get('/manage', requireAdmin, listManagedProducts);
productRoutes.post('/', requireAdmin, createProduct);
productRoutes.put('/:id', requireAdmin, updateProduct);
productRoutes.delete('/:id', requireAdmin, deleteProduct);
