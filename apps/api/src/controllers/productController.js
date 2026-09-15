import { ProductModel } from '../models/productModel.js';

export async function listProducts(_req, res, next) {
  try {
    res.json(await ProductModel.findAll());
  } catch (error) {
    next(error);
  }
}
export async function listManagedProducts(_req, res, next) { try { res.json(await ProductModel.findAll(true)); } catch (error) { next(error); } }

function validateProduct(body) {
  const product = { name: body.name?.trim(), description: body.description?.trim(), price: Number(body.price), category: body.category, imageKey: body.imageKey || null, featured: Boolean(body.featured), active: body.active !== false, sortOrder: Number(body.sortOrder) || 0 };
  if (!product.name || !product.description || !Number.isInteger(product.price) || product.price < 0 || !['Lasañas','Empanadas','Focaccia','Bebidas'].includes(product.category)) throw new Error('Datos de producto inválidos.');
  return product;
}
export async function createProduct(req, res, next) { try { res.status(201).json(await ProductModel.create(validateProduct(req.body))); } catch (error) { next(error); } }
export async function updateProduct(req, res, next) { try { const product = await ProductModel.update(Number(req.params.id), validateProduct(req.body)); if (!product) return res.status(404).json({ message:'Producto no encontrado.' }); res.json(product); } catch (error) { next(error); } }
export async function deleteProduct(req, res, next) { try { if (!await ProductModel.remove(Number(req.params.id))) return res.status(404).json({ message:'Producto no encontrado.' }); res.status(204).end(); } catch (error) { next(error); } }
