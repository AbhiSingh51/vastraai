import { formatPrice } from '../../utils/format.js';

export default function OutfitCard({ items, onRemove, onAddAll }) {
  const total = items.reduce((sum, p) => sum + p.price, 0);
  return (
    <section className="outfit" aria-label="Outfit builder">
      <h2>Your outfit</h2>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            <img src={p.image} alt="" />
            <span>{p.name}<br /><small className="muted">{formatPrice(p.price)}</small></span>
            <button className="icon-btn" onClick={() => onRemove(p.id)} aria-label={`Remove ${p.name} from outfit`}>✕</button>
          </li>
        ))}
      </ul>
      <div className="row-between"><strong>Total {formatPrice(total)}</strong>
        <button className="btn btn-primary" onClick={onAddAll}>Add outfit to cart</button></div>
    </section>
  );
}
