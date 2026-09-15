import { Router } from 'express';
import { login } from '../controllers/authController.js';
// La ruta solo declara el contrato HTTP; la lógica vive en el controlador.
export const authRoutes = Router(); authRoutes.post('/login', login);
