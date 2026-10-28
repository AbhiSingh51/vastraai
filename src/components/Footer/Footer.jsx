import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="brand-name">Vastra<em>AI</em></p>
          <p className="muted">Tradition. Style. Reimagined by AI.</p>
        </div>
        <nav aria-label="Footer">
          <Link to="/shop">Shop</Link>
          <Link to="/try-on">AI Try-On</Link>
          <Link to="/my-looks">My Looks</Link>
          <Link to="/wishlist">Wishlist</Link>
        </nav>
      </div>
    </footer>
  );
}
