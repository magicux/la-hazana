import { useEffect, useMemo, useState } from 'react';
import logo from './assets/logo-rojo.jpeg';
import raguImage from './assets/lasana-ragu.jpeg';
import pestoImage from './assets/lasana-pesto.jpeg';
import empanadaImage from './assets/empanada-camaron.jpeg';
import localImage from './assets/local.jpeg';
import { fallbackProducts, reviews } from './data.js';
import { apiUrl } from './api.js';

const mapsUrl = 'https://maps.app.goo.gl/dxZ2pRYLoe2LSYaX9';
const whatsappUrl = 'https://wa.me/56934431070?text=Hola%20La%20Haza%C3%B1a%2C%20quiero%20hacer%20un%20pedido';
// Imágenes de respaldo para productos que aún no tienen una fotografía personalizada.
const images = { ragu: raguImage, pesto: pestoImage, empanada: empanadaImage };
const money = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

function Navbar({ count, onCart }) {
  return <nav className="navbar navbar-expand-lg sticky-top" aria-label="Navegación principal">
    <div className="container">
      <a className="navbar-brand" href="#inicio"><img src={logo} alt="La Hazaña" /></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Abrir menú"><span className="navbar-toggler-icon" /></button>
      <div className="collapse navbar-collapse" id="mainNav">
        <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <a className="nav-link" href="#menu">Menú</a><a className="nav-link" href="#opiniones">Opiniones</a><a className="nav-link" href="#ubicacion">Ubicación</a>
          <button className="btn btn-brand ms-lg-2" onClick={onCart}><i className="bi bi-bag me-2" />Mi pedido <span className="badge rounded-pill ms-1">{count}</span></button>
        </div>
      </div>
    </div>
  </nav>;
}

function Hero() {
  return <header id="inicio" className="hero"><div className="container"><div className="row align-items-center g-5">
    <div className="col-lg-6 hero-copy"><span className="eyebrow">Cocina artesanal · Peñalolén</span><h1>Una lasaña puede ser toda una <em>hazaña.</em></h1><p>Capas generosas, salsas hechas en casa y ese gratinado que convierte cualquier día en uno especial.</p>
      <div className="d-flex flex-wrap gap-3"><a href="#menu" className="btn btn-brand btn-lg">Ver el menú</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline-dark btn-lg"><i className="bi bi-whatsapp me-2" />Pedir por WhatsApp</a></div>
      <a className="hero-proof" href="#opiniones" aria-label="Ver las 8 opiniones de Google"><span className="stars">★★★★★</span><strong>5,0 en Google</strong><span>· 8 opiniones</span><i className="bi bi-arrow-down-short" /></a>
    </div>
    <div className="col-lg-6"><div className="hero-image"><img src={raguImage} alt="Lasaña ragú de La Hazaña recién gratinada" /><div className="floating-note"><small>Favorita de la casa</small><strong>Ragú 4 horas</strong></div></div></div>
  </div></div></header>;
}

function Menu({ products, addToCart }) {
  // Un producto destacado también aparece en su categoría normal.
  return <section id="menu" className="section-menu py-5"><div className="container py-4"><div className="section-heading"><span className="eyebrow">Hecho al momento</span><h2>Elige tu próxima favorita</h2><p>Recetas honestas, porciones generosas y mucho queso dorado.</p></div>
    {['Destacados','Lasañas','Empanadas','Focaccia','Bebidas'].map((section) => {
      const visible = section === 'Destacados' ? products.filter((p) => p.featured) : products.filter((p) => p.category === section);
      if (!visible.length) return null;
      return <div className="menu-section" key={section}><div className="menu-section-title"><h3>{section}</h3><span>{visible.length} {visible.length === 1 ? 'opción' : 'opciones'}</span></div><div className="row g-4">{visible.map((product) => <div className="col-md-6 col-lg-4" key={`${section}-${product.id}`}><article className="product-card h-100">
        {product.imageData || product.imageKey ? <img src={product.imageData || images[product.imageKey]} alt={product.name} /> : <div className="product-placeholder"><i className="bi bi-cup-straw" /></div>}
        <div className="product-body"><div><span className="category">{product.category}</span><h3>{product.name}</h3></div><p>{product.description}</p><div className="d-flex align-items-center justify-content-between"><strong className="price">{money.format(product.price)}</strong><button className="btn btn-add" onClick={() => addToCart(product)} aria-label={`Agregar ${product.name}`}><i className="bi bi-plus-lg" /> Agregar</button></div></div>
      </article></div>)}</div></div>;
    })}
  </div></section>;
}

function Reviews() {
  return <section id="opiniones" className="reviews py-5"><div className="container py-4"><div className="row align-items-end mb-4"><div className="col-lg-7"><span className="eyebrow">Opiniones verificadas</span><h2>Les gusta hasta la última capa</h2></div><div className="col-lg-5 text-lg-end"><a href={mapsUrl} target="_blank" rel="noreferrer" className="google-score"><span className="g-letter">G</span><strong>5,0</strong><span className="stars">★★★★★</span><span>8 opiniones</span></a></div></div>
    <div className="row g-4">{reviews.map((review) => <div className="col-lg-4" key={review.name}><blockquote className="review-card h-100"><div className="stars">★★★★★</div><p>“{review.text}”</p><footer><strong>{review.name}</strong><span>{review.date} · Google</span></footer></blockquote></div>)}</div>
    <div className="text-center mt-4"><a href={mapsUrl} target="_blank" rel="noreferrer" className="link-arrow">Ver todas las opiniones en Google <i className="bi bi-arrow-up-right" /></a></div>
  </div></section>;
}

function Location() {
  return <section id="ubicacion" className="location"><div className="container"><div className="location-card"><div className="row g-0 align-items-stretch"><div className="col-lg-6"><img src={localImage} alt="Local La Hazaña en Peñalolén" /></div><div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center"><span className="eyebrow">Ven a buscar tu pedido</span><h2>Estamos en Peñalolén</h2><p className="lead">Av. Mariano Sánchez Fontecilla 11662</p><ul className="list-unstyled contact-list"><li><i className="bi bi-clock" /> Miércoles a domingo · 11:00 a 17:00</li><li><i className="bi bi-telephone" /> +56 9 3443 1070</li><li><i className="bi bi-truck" /> Despacho gratis en perímetro desde $15.000</li></ul><div className="d-flex flex-wrap gap-2"><a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Cómo llegar</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline-dark">Escríbenos</a></div></div></div></div></div>
  </section>;
}

function Cart({ cart, setCart, products, open, setOpen }) {
  // El total mostrado es informativo; la API lo recalcula antes de guardar el pedido.
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', notes: '', deliveryMethod: 'pickup' });
  const [status, setStatus] = useState('idle');
  const total = Object.entries(cart).reduce((sum, [id, quantity]) => sum + (products.find((p) => p.id === Number(id))?.price || 0) * quantity, 0);
  const items = Object.entries(cart).map(([id, quantity]) => ({ product: products.find((p) => p.id === Number(id)), quantity })).filter((item) => item.product);
  const update = (id, quantity) => setCart((current) => quantity < 1 ? Object.fromEntries(Object.entries(current).filter(([key]) => key !== String(id))) : { ...current, [id]: quantity });
  const submit = async (event) => { event.preventDefault(); setStatus('sending'); try { const response = await fetch(apiUrl('/api/orders'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customer, items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })) }) }); if (!response.ok) throw new Error((await response.json()).message); const data = await response.json(); setCart({}); setStatus(`success:${data.order.id}`); } catch (error) { setStatus(`error:${error.message || 'Intenta nuevamente.'}`); } };
  if (!open) return null;
  return <div className="cart-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}><aside className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div className="cart-header"><div><span className="eyebrow">Tu selección</span><h2 id="cart-title">Mi pedido</h2></div><button className="btn-close" onClick={() => setOpen(false)} aria-label="Cerrar" /></div>
    {status.startsWith('success') ? <div className="order-success"><i className="bi bi-check-circle-fill" /><h3>¡Pedido recibido!</h3><p>Tu número es <strong>#{status.split(':')[1]}</strong>. Te contactaremos para confirmarlo.</p><button className="btn btn-brand" onClick={() => { setStatus('idle'); setOpen(false); }}>Listo</button></div> : items.length === 0 ? <div className="empty-cart"><i className="bi bi-bag" /><h3>Tu bolsa está vacía</h3><p>Agrega algo rico desde nuestro menú.</p><button className="btn btn-brand" onClick={() => setOpen(false)}>Explorar menú</button></div> : <form onSubmit={submit}><div className="cart-items">{items.map(({ product, quantity }) => <div className="cart-item" key={product.id}><div><strong>{product.name}</strong><span>{money.format(product.price)}</span></div><div className="quantity"><button type="button" onClick={() => update(product.id, quantity - 1)} aria-label="Quitar uno">−</button><span>{quantity}</span><button type="button" onClick={() => update(product.id, quantity + 1)} aria-label="Agregar uno">+</button></div></div>)}</div>
      <div className="cart-total"><span>Total</span><strong>{money.format(total)}</strong></div><div className="order-fields"><h3>Datos de contacto</h3><div className="row g-3"><div className="col-12"><input className="form-control" required placeholder="Tu nombre" aria-label="Tu nombre" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} /></div><div className="col-12"><input className="form-control" required placeholder="Teléfono" aria-label="Teléfono" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} /></div><div className="col-12"><select className="form-select" value={customer.deliveryMethod} onChange={(e) => setCustomer({ ...customer, deliveryMethod: e.target.value })}><option value="pickup">Retiro en el local</option><option value="delivery">Despacho a domicilio</option></select></div>{customer.deliveryMethod === 'delivery' && <div className="col-12"><input className="form-control" required placeholder="Dirección de entrega" aria-label="Dirección de entrega" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} /></div>}<div className="col-12"><textarea className="form-control" rows="2" placeholder="Notas para la cocina (opcional)" aria-label="Notas" value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })} /></div></div></div>
      {status.startsWith('error') && <div className="alert alert-danger mt-3">{status.slice(6)}</div>}<button className="btn btn-brand w-100 btn-lg mt-3" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Confirmar pedido'}</button><p className="form-note">No se realiza ningún cobro en línea. Confirmaremos disponibilidad y pago contigo.</p>
    </form>}
  </aside></div>;
}

export default function App() {
  // El catálogo local permite que la portada siga visible si el plan gratuito está despertando.
  const [products, setProducts] = useState(fallbackProducts);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => { fetch(apiUrl('/api/products')).then((response) => response.ok ? response.json() : Promise.reject()).then(setProducts).catch(() => {}); }, []);
  useEffect(() => { const context = document.modelContext; if (!context?.registerTool) return; const controller = new AbortController(); Promise.resolve(context.registerTool({ name: 'add_product_to_order', title: 'Agregar producto al pedido', description: 'Agrega una cantidad de un producto disponible al pedido visible.', inputSchema: { type: 'object', properties: { productId: { type: 'integer' }, quantity: { type: 'integer', minimum: 1, maximum: 20 } }, required: ['productId', 'quantity'], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute: ({ productId, quantity }) => { const product = products.find((item) => item.id === productId); if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw new Error('Producto o cantidad inválida.'); setCart((current) => ({ ...current, [productId]: (current[productId] || 0) + quantity })); setCartOpen(true); return { product: product.name, quantity, added: true }; } }, { signal: controller.signal })).catch(() => {}); return () => controller.abort(); }, [products]);
  const count = useMemo(() => Object.values(cart).reduce((sum, quantity) => sum + quantity, 0), [cart]);
  const addToCart = (product) => { setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 })); setCartOpen(true); };
  return <><Navbar count={count} onCart={() => setCartOpen(true)} /><main><Hero /><Reviews /><Menu products={products} addToCart={addToCart} /><Location /></main><footer className="site-footer"><div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"><img src={logo} alt="La Hazaña" /><p>Hecho con cariño en Peñalolén · <a href="https://www.instagram.com/lahazanadetudia/" target="_blank" rel="noreferrer">@lahazanadetudia</a></p></div></footer><a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Pedir por WhatsApp"><i className="bi bi-whatsapp" /></a><Cart cart={cart} setCart={setCart} products={products} open={cartOpen} setOpen={setCartOpen} /></>;
}
