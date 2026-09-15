CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  category VARCHAR(40) NOT NULL,
  image_key VARCHAR(60),
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  address TEXT,
  notes TEXT,
  delivery_method VARCHAR(20) NOT NULL CHECK (delivery_method IN ('delivery', 'pickup')),
  status VARCHAR(30) NOT NULL DEFAULT 'recibido',
  total INTEGER NOT NULL CHECK (total >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  product_name VARCHAR(120) NOT NULL,
  unit_price INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0)
);

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, description, price, category, image_key, featured, sort_order) VALUES
  ('Lasaña Ragú', 'Boloñesa de cocción lenta por 4 horas, cremosa bechamel y queso gratinado.', 7000, 'Lasañas', 'ragu', true, 1),
  ('Lasaña Ragú & Pesto', 'Capas de ragú y pesto de albahaca casero.', 8000, 'Lasañas', 'pesto', true, 2),
  ('Pollo al Curry', 'Pollo salteado al curry, bechamel y queso.', 7000, 'Lasañas', 'ragu', false, 3),
  ('Berenjena & Champiñón', 'Berenjena asada y champiñones salteados.', 7000, 'Lasañas', 'pesto', false, 4),
  ('Camarones', 'Lasaña cremosa de camarones y queso gratinado.', 8500, 'Lasañas', 'pesto', false, 5),
  ('Focaccia 20 cm', 'Elige hasta dos ingredientes: queso, pesto, tomate cherry, champiñones, orégano, cebolla o aceituna.', 3500, 'Focaccia', 'empanada', false, 6),
  ('Empanada Pino Carne Picada', 'Empanada horneada de pino con carne picada.', 2900, 'Empanadas', 'empanada', false, 7),
  ('Empanada Queso', 'Empanada horneada rellena de queso.', 2500, 'Empanadas', 'empanada', false, 8),
  ('Empanada Queso Camarón', 'Empanada horneada de queso y camarón.', 3000, 'Empanadas', 'empanada', false, 9),
  ('Bebida o jugo en lata', 'Bebida individual fría.', 1200, 'Bebidas', NULL, false, 10),
  ('Agua mineral', 'Agua mineral individual.', 1000, 'Bebidas', NULL, false, 11)
ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description, price = EXCLUDED.price, category = EXCLUDED.category, image_key = EXCLUDED.image_key, featured = EXCLUDED.featured, sort_order = EXCLUDED.sort_order;
