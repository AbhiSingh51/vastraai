import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard.jsx';

export default function ProductGrid({ products, loading = false }) {
  if (loading) {
    return (
      <div className="grid" aria-busy="true">
        {Array.from({ length: 8 }, (_, i) => <div key={i} className="skeleton skeleton-card" />)}
      </div>
    );
  }
  if (!products.length) {
    return (
      <div className="empty">
        <h3>No products match your filters</h3>
        <p className="muted">Clear a filter or search for something else.</p>
        <Link to="/shop" className="btn btn-outline">Show all products</Link>
      </div>
    );
  }
  return <div className="grid">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>;
}
