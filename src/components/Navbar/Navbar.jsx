import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { useStore } from '../../context/StoreContext.jsx';

const LINKS = [
  { to: '/', label: 'Home', end: true, icon: '⌂' },
  { to: '/shop', label: 'Shop', icon: '▦' },
  { to: '/shop?category=all', label: 'Categories', desktopOnly: true },
  { to: '/try-on', label: 'AI Try-On', icon: '✨' },
  { to: '/my-looks', label: 'My Looks', icon: '◧' },
];

export default function Navbar() {
  const { wishlist, cart } = useStore();
  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="brand" aria-label="VastraAI home">
            <span className="brand-name">Vastra<em>AI</em></span>
            <span className="brand-tag">Tradition. Style. Reimagined by AI.</span>
          </Link>
          <nav className="nav-links" aria-label="Main">
            {LINKS.map((l) => <NavLink key={l.label} to={l.to} end={l.end}>{l.label}</NavLink>)}
          </nav>
          <div className="nav-search"><SearchBar /></div>
          <div className="nav-actions">
            <Link to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`}>♡{wishlist.length > 0 && <b>{wishlist.length}</b>}</Link>
            <Link to="/profile" aria-label="Cart and profile">👜{cart.length > 0 && <b>{cart.length}</b>}</Link>
            <Link to="/profile" aria-label="Profile">◔</Link>
          </div>
        </div>
      </header>
      <nav className="bottom-nav" aria-label="Mobile">
        {[...LINKS.filter((l) => !l.desktopOnly), { to: '/wishlist', label: 'Wishlist', icon: '♡' }].map((l) => (
          <NavLink key={l.label} to={l.to} end={l.end}><span aria-hidden="true">{l.icon}</span>{l.label}</NavLink>
        ))}
      </nav>
    </>
  );
}
