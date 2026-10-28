import { Link } from 'react-router-dom';

export default function TryOnButton({ productId, size = 'md', className = '' }) {
  return (
    <Link to={`/try-on?product=${productId}`} className={`btn btn-ai btn-${size} ${className}`}>
      ✨ AI Try On
    </Link>
  );
}
