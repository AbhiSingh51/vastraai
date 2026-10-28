import { useState } from 'react';
import { Link } from 'react-router-dom';
import OutfitCard from '../components/OutfitCard/OutfitCard.jsx';
import TryOnButton from '../components/TryOnButton/TryOnButton.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { products } from '../data/products.js';
import { formatPrice } from '../utils/format.js';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [outfitIds, setOutfitIds] = useState([]);
  const items = products.filter((p) => wishlist.includes(p.id));
  const outfit = items.filter((p) => outfitIds.includes(p.id));
  const toggleOutfit = (id) => setOutfitIds((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]));

  return (
    <div className="container section">
      <h1 className="page-title">Wishlist</h1>
      {items.length === 0 ? (
        <div className="empty">
          <h2>Nothing saved yet</h2>
          <p className="muted">Tap the heart on any product to keep it here.</p>
          <Link to="/shop" className="btn btn-primary">Browse the shop</Link>
        </div>
      ) : (
        <div className="wish-layout">
          <ul className="wish-list">
            {items.map((p) => (
              <li key={p.id} className="wish-item">
                <img src={p.image} alt={p.name} />
                <div>
                  <h3><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
                  <p>{formatPrice(p.price)}</p>
                  <label className="check"><input type="checkbox" checked={outfitIds.includes(p.id)} onChange={() => toggleOutfit(p.id)} /> Add to outfit</label>
                  <div className="row-gap">
                    <TryOnButton productId={p.id} size="sm" />
                    <button className="btn btn-primary btn-sm" onClick={() => addToCart(p)}>Add to cart</button>
                    <button className="btn btn-outline btn-sm" onClick={() => toggleWishlist(p)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {outfit.length > 0 && (
            <OutfitCard items={outfit} onRemove={toggleOutfit} onAddAll={() => addToCart(outfit)} />
          )}
        </div>
      )}
    </div>
  );
}
