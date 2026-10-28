import { Link } from 'react-router-dom';
import TryOnButton from '../TryOnButton/TryOnButton.jsx';
import { useStore } from '../../context/StoreContext.jsx';
import { COLOR_HEX } from '../../data/products.js';
import { formatPrice } from '../../utils/format.js';

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-media">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <button
          className={`icon-btn wish ${saved ? 'on' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >{saved ? '♥' : '♡'}</button>
      </div>
      <div className="product-body">
        <p className="muted small">{product.category}</p>
        <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <div className="row-between">
          <strong>{formatPrice(product.price)}</strong>
          <span className="rating" aria-label={`Rated ${product.rating} out of 5`}>★ {product.rating}</span>
        </div>
        <div className="row-between">
          <span className="dots" aria-label={`Colors: ${product.colors.join(', ')}`}>
            {product.colors.map((c) => <i key={c} title={c} style={{ background: COLOR_HEX[c] }} />)}
          </span>
          <TryOnButton productId={product.id} size="sm" />
        </div>
      </div>
    </article>
  );
}
