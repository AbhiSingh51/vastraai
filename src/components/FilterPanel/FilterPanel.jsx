import { CATEGORIES, COLOR_HEX, SIZES, STYLES } from '../../data/products.js';

export const DEFAULT_FILTERS = { category: 'all', maxPrice: 10000, color: 'all', size: 'all', style: 'all', rating: 0 };

const Chips = ({ label, options, value, onPick }) => (
  <fieldset>
    <legend>{label}</legend>
    <div className="chips">
      {['all', ...options].map((o) => (
        <button key={o} type="button" className={`chip ${value === o ? 'on' : ''}`} aria-pressed={value === o} onClick={() => onPick(o)}>
          {o === 'all' ? 'All' : o}
        </button>
      ))}
    </div>
  </fieldset>
);

export default function FilterPanel({ filters, onChange, onReset }) {
  const set = (key) => (value) => onChange({ ...filters, [key]: value });
  return (
    <div className="filters">
      <Chips label="Categories" options={CATEGORIES} value={filters.category} onPick={set('category')} />
      <fieldset>
        <legend>Price up to {filters.maxPrice.toLocaleString('en-IN')}</legend>
        <input type="range" min="1000" max="10000" step="500" value={filters.maxPrice} onChange={(e) => set('maxPrice')(Number(e.target.value))} aria-label="Maximum price in rupees" />
      </fieldset>
      <Chips label="Color" options={Object.keys(COLOR_HEX)} value={filters.color} onPick={set('color')} />
      <Chips label="Size" options={SIZES} value={filters.size} onPick={set('size')} />
      <Chips label="Style" options={STYLES} value={filters.style} onPick={set('style')} />
      <fieldset>
        <legend>Rating</legend>
        <select value={filters.rating} onChange={(e) => set('rating')(Number(e.target.value))} aria-label="Minimum rating">
          <option value={0}>Any rating</option>
          <option value={4}>4★ & up</option>
          <option value={4.5}>4.5★ & up</option>
        </select>
      </fieldset>
      <button type="button" className="btn btn-outline" onClick={onReset}>Reset filters</button>
    </div>
  );
}
