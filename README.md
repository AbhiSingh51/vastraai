# VastraAI — AI Virtual Clothing Try-On (frontend)

React 18 + Vite + React Router. Runs fully on mock data.

```bash
npm install
npm run dev
```

## Connecting the real AI API
Edit `generateTryOn` in `src/services/api.js` (marked `REAL AI API GOES HERE`). Keep the `{ imageUrl }` return shape.

## Notes
- Product, category and hero images are generated SVG illustrations (`src/utils/placeholder.js`). Replace `image`/`gallery` in `src/data/products.js` with real photos.
- Wishlist, cart and saved looks persist in `localStorage`.
