import { useState } from 'react';
import Modal from '../components/Modal/Modal.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { getProduct } from '../data/products.js';
import { formatPrice } from '../utils/format.js';

export default function Profile() {
  const { cart, wishlist, looks, clearAll } = useStore();
  const [confirm, setConfirm] = useState(false);
  const total = cart.reduce((sum, item) => sum + getProduct(item.productId).price, 0);

  return (
    <div className="container section narrow">
      <h1 className="page-title">Profile</h1>
      <div className="stats">
        <div><strong>{looks.length}</strong><span>Saved looks</span></div>
        <div><strong>{wishlist.length}</strong><span>Wishlist</span></div>
        <div><strong>{cart.length}</strong><span>In cart</span></div>
      </div>
      <h2 className="h3">Your cart</h2>
      {cart.length === 0 ? <p className="muted">Your cart is empty.</p> : (
        <>
          <ul className="cart-list">
            {cart.map((item, i) => {
              const p = getProduct(item.productId);
              return (
                <li key={i}><img src={p.image} alt="" /><span>{p.name}<br /><small className="muted">{[item.color, item.size].filter(Boolean).join(' · ')}</small></span><strong>{formatPrice(p.price)}</strong></li>
              );
            })}
          </ul>
          <p className="row-between"><strong>Total</strong><strong>{formatPrice(total)}</strong></p>
        </>
      )}
      <button className="btn btn-outline" onClick={() => setConfirm(true)}>Clear my data</button>
      <Modal open={confirm} title="Clear all data?" onClose={() => setConfirm(false)}>
        <p>This deletes your saved looks, wishlist and cart from this browser.</p>
        <div className="row-between">
          <button className="btn btn-outline" onClick={() => setConfirm(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { clearAll(); setConfirm(false); }}>Clear data</button>
        </div>
      </Modal>
    </div>
  );
}
