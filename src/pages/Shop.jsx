import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterPanel, { DEFAULT_FILTERS } from '../components/FilterPanel/FilterPanel.jsx';
import ProductGrid from '../components/ProductGrid/ProductGrid.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import Modal from '../components/Modal/Modal.jsx';
import { products } from '../data/products.js';

const SORTS = {
  featured: { label: 'Featured', fn: () => 0 },
  newest: { label: 'Newest', fn: (a, b) => b.id - a.id },
  'price-asc': { label: 'Price: Low to High', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: High to Low', fn: (a, b) => b.price - a.price },
  rating: { label: 'Rating', fn: (a, b) => b.rating - a.rating },
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, category: params.get('category') || 'all' });
  const [sort, setSort] = useState('featured');
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, []);
  useEffect(() => { setFilters((f) => ({ ...f, category: params.get('category') || 'all' })); }, [params]);

  const visible = useMemo(() => products
    .filter((p) => (!query || `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase()))
      && (filters.category === 'all' || p.category === filters.category)
      && p.price <= filters.maxPrice
      && (filters.color === 'all' || p.colors.includes(filters.color))
      && (filters.size === 'all' || p.sizes.includes(filters.size))
      && (filters.style === 'all' || p.style === filters.style)
      && p.rating >= filters.rating)
    .sort(SORTS[sort].fn), [query, filters, sort]);

  const reset = () => { setFilters(DEFAULT_FILTERS); setParams({}); };
  const panel = <FilterPanel filters={filters} onChange={setFilters} onReset={reset} />;

  return (
    <div className="container section">
      <h1 className="page-title">Shop</h1>
      <div className="shop-bar">
        <SearchBar key={query} initial={query} onSearch={(q) => setParams(q ? { q } : {})} />
        <button className="btn btn-outline filter-toggle" onClick={() => setDrawer(true)}>Filters</button>
        <label className="sort">Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {Object.entries(SORTS).map(([key, { label }]) => <option key={key} value={key}>{label}</option>)}
          </select>
        </label>
      </div>
      <div className="shop-layout">
        <aside className="filter-side" aria-label="Filters">{panel}</aside>
        <div>
          <p className="muted small" aria-live="polite">{loading ? 'Loading...' : `${visible.length} products`}</p>
          <ProductGrid products={visible} loading={loading} />
        </div>
      </div>
      <Modal open={drawer} title="Filters" onClose={() => setDrawer(false)} variant="drawer">
        {panel}
        <button className="btn btn-primary" onClick={() => setDrawer(false)}>Show {visible.length} products</button>
      </Modal>
    </div>
  );
}
