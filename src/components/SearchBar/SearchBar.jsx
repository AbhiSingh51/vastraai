import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ initial = '', onSearch }) {
  const [value, setValue] = useState(initial);
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    const query = value.trim();
    if (onSearch) onSearch(query);
    else navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop');
  };
  return (
    <form className="searchbar" role="search" onSubmit={submit}>
      <input type="search" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search products..." aria-label="Search products" />
      <button type="submit" aria-label="Search">⌕</button>
    </form>
  );
}
