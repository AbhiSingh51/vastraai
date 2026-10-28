import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TryOnButton from '../components/TryOnButton/TryOnButton.jsx';
import ProductGrid from '../components/ProductGrid/ProductGrid.jsx';
import NotFound from './NotFound.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { COLOR_HEX, getProduct, products } from '../data/products.js';
import { formatPrice } from '../utils/format.js';

export default function ProductDetails() {
  const product = getProduct(useParams().id);
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [active, setActive] = useState(0);
  if (!product) return <NotFound />;

  const selectedColor = color || product.colors[0];
  const selectedSize = size || product.sizes[Math.min(1, product.sizes.length - 1)];
  const saved = wishlist.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container section">
      <div className="details">
        <div className="gallery">
          <img className="gallery-main" src={product.gallery[active]} alt={`${product.name}, view ${active + 1}`} />
          <div className="thumbs">
            {product.gallery.map((src, i) => (
              <button key={i} className={i === active ? 'on' : ''} onClick={() => setActive(i)} aria-label={`Show view ${i + 1}`}><img src={src} alt="" /></button>
            ))}
          </div>
        </div>
        <div className="details-info">
          <p className="muted">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="rating" aria-label={`Rated ${product.rating} out of 5`}>{'★'.repeat(Math.round(product.rating))} {product.rating}</p>
          <p className="price">{formatPrice(product.price)}</p>
          <fieldset><legend>Available colors</legend>
            <div className="chips">
              {product.colors.map((c) => (
                <button key={c} className={`chip ${c === selectedColor ? 'on' : ''}`} aria-pressed={c === selectedColor} onClick={() => setColor(c)}>
                  <i className="swatch" style={{ background: COLOR_HEX[c] }} /> {c}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset><legend>Size</legend>
            <div className="chips">
              {product.sizes.map((s) => (
                <button key={s} className={`chip ${s === selectedSize ? 'on' : ''}`} aria-pressed={s === selectedSize} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </fieldset>
          <h2 className="h3">Description</h2>
          <p>{product.description}</p>
          <div className="stack">
            <TryOnButton productId={product.id} size="lg" className="btn-block" />
            <button className="btn btn-primary" onClick={() => addToCart(product, { size: selectedSize, color: selectedColor })}>Add to Cart</button>
            <button className="btn btn-outline" aria-pressed={saved} onClick={() => toggleWishlist(product)}>{saved ? 'Remove from Wishlist' : 'Add to Wishlist'}</button>
          </div>
        </div>
      </div>
      {related.length > 0 && (<><h2 className="section-title">You may also like</h2><ProductGrid products={related} /></>)}
    </div>
  );
}
