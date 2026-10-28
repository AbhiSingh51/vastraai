import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal/Modal.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { formatDate } from '../utils/format.js';

export default function MyLooks() {
  const { looks, deleteLook } = useStore();
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  return (
    <div className="container section">
      <h1 className="page-title">My Looks</h1>
      {looks.length === 0 ? (
        <div className="empty">
          <h2>Your wardrobe is waiting.</h2>
          <p className="muted">Try your first outfit with AI.</p>
          <Link to="/try-on" className="btn btn-ai">Start Trying</Link>
        </div>
      ) : (
        <div className="grid">
          {looks.map((look) => (
            <article key={look.id} className="product-card">
              <div className="product-media"><img src={look.image} alt={look.title} /></div>
              <div className="product-body">
                <h3>{look.title}</h3>
                <p className="muted small">Created: {formatDate(look.createdAt)}</p>
                <div className="row-between">
                  <button className="btn btn-primary btn-sm" onClick={() => setViewing(look)}>View</button>
                  <button className="btn btn-outline btn-sm" onClick={() => setDeleting(look)}>Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      <Modal open={!!viewing} title={viewing?.title || ''} onClose={() => setViewing(null)}>
        {viewing && <img className="modal-img" src={viewing.image} alt={viewing.title} />}
      </Modal>
      <Modal open={!!deleting} title="Delete this look?" onClose={() => setDeleting(null)}>
        <p>This removes “{deleting?.title}” from your collection. You can't undo this.</p>
        <div className="row-between">
          <button className="btn btn-outline" onClick={() => setDeleting(null)}>Keep look</button>
          <button className="btn btn-primary" onClick={() => { deleteLook(deleting.id); setDeleting(null); }}>Delete look</button>
        </div>
      </Modal>
    </div>
  );
}
