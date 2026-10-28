import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const write = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage full or unavailable */ }
};
const MAX_LOOKS = 8;

export function StoreProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => read('vastra.wishlist', []));
  const [cart, setCart] = useState(() => read('vastra.cart', []));
  const [looks, setLooks] = useState(() => read('vastra.looks', []));
  const [toasts, setToasts] = useState([]);

  useEffect(() => write('vastra.wishlist', wishlist), [wishlist]);
  useEffect(() => write('vastra.cart', cart), [cart]);
  useEffect(() => write('vastra.looks', looks), [looks]);

  const toast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((list) => [...list, { id, message }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3200);
  }, []);

  const toggleWishlist = useCallback((product) => {
    const has = wishlist.includes(product.id);
    setWishlist((ids) => (has ? ids.filter((id) => id !== product.id) : [...ids, product.id]));
    toast(has ? 'Removed from wishlist' : 'Saved to wishlist ♡');
  }, [wishlist, toast]);

  const addToCart = useCallback((products, options = {}) => {
    const list = Array.isArray(products) ? products : [products];
    setCart((items) => [...items, ...list.map((p) => ({ productId: p.id, size: options.size, color: options.color }))]);
    toast(list.length > 1 ? `${list.length} items added to cart` : 'Added to cart');
  }, [toast]);

  const saveLook = useCallback((look) => {
    setLooks((items) => [{ ...look, id: Date.now(), createdAt: new Date().toISOString() }, ...items].slice(0, MAX_LOOKS));
    toast('Look saved to your collection ✨');
  }, [toast]);

  const deleteLook = useCallback((id) => {
    setLooks((items) => items.filter((look) => look.id !== id));
    toast('Look deleted');
  }, [toast]);

  const clearAll = useCallback(() => {
    setWishlist([]); setCart([]); setLooks([]);
    toast('Your data was cleared');
  }, [toast]);

  const value = useMemo(
    () => ({ wishlist, cart, looks, toasts, toast, toggleWishlist, addToCart, saveLook, deleteLook, clearAll }),
    [wishlist, cart, looks, toasts, toast, toggleWishlist, addToCart, saveLook, deleteLook, clearAll]
  );
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
