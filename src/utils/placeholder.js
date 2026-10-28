// Generates a garment illustration as an SVG data URI so the app works offline.
// Replace product.image with real photography when a catalog backend exists.
const SHAPES = {
  top: 'M140 60 L200 90 L260 60 L350 130 L305 200 L285 185 L295 460 L105 460 L115 185 L95 200 L50 130 Z',
  drape: 'M120 50 L280 50 L330 470 L70 470 Z',
  skirt: 'M150 60 L250 60 L275 150 L370 470 L30 470 L125 150 Z',
  legs: 'M110 60 L290 60 L300 470 L215 470 L200 200 L185 470 L100 470 Z',
  jewel: 'M130 120 a70 70 0 1 0 140 0 a70 70 0 1 0 -140 0 M160 300 a40 40 0 1 0 80 0 a40 40 0 1 0 -80 0',
};
const SHAPE_BY_CATEGORY = { Sarees: 'drape', Lehengas: 'skirt', Dresses: 'skirt', Pants: 'legs', Accessories: 'jewel' };

export const makeGarmentImage = (color, category = 'Kurtas', { variant = 0, bare = false } = {}) => {
  const shape = SHAPES[SHAPE_BY_CATEGORY[category] || 'top'];
  const motif = variant % 2
    ? `<circle cx='12' cy='12' r='3' fill='#C49A4A'/>`
    : `<path d='M0 12h24M12 0v24' stroke='#C49A4A' stroke-width='1.5'/>`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'>
<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#FFF9F0'/><stop offset='1' stop-color='#E8DCC4'/></linearGradient>
<pattern id='p' width='24' height='24' patternUnits='userSpaceOnUse'>${motif}</pattern></defs>
${bare ? '' : "<rect width='400' height='500' fill='url(#g)'/>"}
<path d='${shape}' fill='${color}' fill-rule='evenodd'/><path d='${shape}' fill='url(#p)' opacity='.35' fill-rule='evenodd'/>
<path d='${shape}' fill='none' stroke='#C49A4A' stroke-width='4' fill-rule='evenodd'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
