import { ProductModel } from '../models/productModel.js';
import { logger } from '../config/logger.js';

export async function listProducts(_req, res, next) {
  try {
    res.json(await ProductModel.findAll());
  } catch (error) {
    next(error);
  }
}
export async function listManagedProducts(_req, res, next) { try { res.json(await ProductModel.findAll(true)); } catch (error) { next(error); } }

// Acepta imágenes optimizadas por el navegador y limita formato/tamaño en servidor.
function validateProduct(body) {
  const imageData = body.imageData || null;
  if (imageData && (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(imageData) || imageData.length > 1_500_000)) throw new Error('La imagen debe ser JPG, PNG o WebP y pesar menos de 1 MB.');
  const product = { name: body.name?.trim(), description: body.description?.trim(), price: Number(body.price), category: body.category, imageKey: imageData ? null : body.imageKey || null, imageData, featured: Boolean(body.featured), active: body.active !== false, sortOrder: Number(body.sortOrder) || 0 };
  if (!product.name || !product.description || !Number.isInteger(product.price) || product.price < 0 || !['Lasañas','Empanadas','Focaccia','Bebidas'].includes(product.category)) throw new Error('Datos de producto inválidos.');
  return product;
}
export async function createProduct(req, res, next) { try { const product=await ProductModel.create(validateProduct(req.body)); logger.info('product_created',{requestId:req.requestId,adminId:req.admin.sub,productId:product.id}); res.status(201).json(product); } catch (error) { next(error); } }
export async function updateProduct(req, res, next) { try { const product = await ProductModel.update(Number(req.params.id), validateProduct(req.body)); if (!product) return res.status(404).json({ message:'Producto no encontrado.' }); logger.info('product_updated',{requestId:req.requestId,adminId:req.admin.sub,productId:Number(req.params.id)}); res.json(product); } catch (error) { next(error); } }
export async function deleteProduct(req, res, next) { try { if (!await ProductModel.remove(Number(req.params.id))) return res.status(404).json({ message:'Producto no encontrado.' }); logger.warning('product_deleted',{requestId:req.requestId,adminId:req.admin.sub,productId:Number(req.params.id)}); res.status(204).end(); } catch (error) { next(error); } }
