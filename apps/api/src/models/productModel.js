import { pool } from '../config/database.js';

export const ProductModel = {
  // `includeInactive` solo se habilita en el panel autenticado.
  async findAll(includeInactive = false) {
    const { rows } = await pool.query(
      `SELECT id, name, description, price, category, image_key AS "imageKey", image_data AS "imageData", featured, active, sort_order AS "sortOrder"
       FROM products ${includeInactive ? '' : 'WHERE active = true'} ORDER BY sort_order, id`,
    );
    return rows;
  },
  async create(product) {
    const { rows } = await pool.query(
      `INSERT INTO products (name, description, price, category, image_key, image_data, featured, active, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [product.name, product.description, product.price, product.category, product.imageKey || null, product.imageData || null, product.featured, product.active, product.sortOrder || 0],
    ); return rows[0];
  },
  async update(id, product) {
    const { rows } = await pool.query(
      `UPDATE products SET name=$1, description=$2, price=$3, category=$4, image_key=$5, image_data=$6, featured=$7, active=$8, sort_order=$9
       WHERE id=$10 RETURNING *`,
      [product.name, product.description, product.price, product.category, product.imageKey || null, product.imageData || null, product.featured, product.active, product.sortOrder || 0, id],
    ); return rows[0];
  },
  async remove(id) { const { rowCount } = await pool.query('DELETE FROM products WHERE id=$1', [id]); return rowCount > 0; },
};
