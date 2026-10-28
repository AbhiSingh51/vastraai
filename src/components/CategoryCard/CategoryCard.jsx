import { Link } from 'react-router-dom';

export default function CategoryCard({ name, image }) {
  return (
    <Link to={`/shop?category=${encodeURIComponent(name)}`} className="category-card">
      <img src={image} alt="" loading="lazy" />
      <span>{name}</span>
    </Link>
  );
}
