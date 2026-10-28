import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard/CategoryCard.jsx';
import ProductGrid from '../components/ProductGrid/ProductGrid.jsx';
import TryOnStudio from '../components/TryOnStudio/TryOnStudio.jsx';
import { CATEGORIES, CATEGORY_IMAGES, products } from '../data/products.js';

const FEATURED_IDS = [1, 2, 3, 4];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>Discover Your Perfect Look</h1>
            <p>Experience Indian fashion in a whole new way with AI-powered virtual try-on.</p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary btn-lg">Explore Collection</Link>
              <Link to="/try-on" className="btn btn-ai btn-lg">Try AI Virtual Try-On</Link>
            </div>
          </div>
          <div className="jharokha" aria-hidden="true">
            <img src={products[5].image} alt="" />
          </div>
        </div>
      </section>

      <section className="container section" id="categories">
        <h2 className="section-title">Shop by category</h2>
        <div className="category-grid">
          {CATEGORIES.map((name) => <CategoryCard key={name} name={name} image={CATEGORY_IMAGES[name]} />)}
        </div>
      </section>

      <section className="container section">
        <div className="row-between"><h2 className="section-title">Curated For You</h2><Link to="/shop">View all</Link></div>
        <ProductGrid products={products.filter((p) => FEATURED_IDS.includes(p.id))} />
      </section>

      <section className="tryon-band section">
        <div className="container">
          <h2 className="section-title">Try Before You Buy</h2>
          <p className="muted lead">See how it looks on you before making a decision.</p>
          <TryOnStudio />
        </div>
      </section>
    </>
  );
}
