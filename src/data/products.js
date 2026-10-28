import { makeGarmentImage } from '../utils/placeholder.js';

export const COLOR_HEX = {
  Blue: '#243B64', Black: '#292522', Ivory: '#E9DFC7', Maroon: '#6E1F2A', Green: '#21483A',
  Terracotta: '#B85C38', Gold: '#C49A4A', Pink: '#B0506B', Teal: '#1F6068',
};
export const CATEGORIES = ['Sarees', 'Kurtas', 'Lehengas', 'Shirts', 'Dresses', 'Jackets', 'Pants', 'Accessories'];
export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
export const STYLES = ['Ethnic', 'Western', 'Festive'];
const STYLE_BY_CATEGORY = { Sarees: 'Festive', Lehengas: 'Festive', Kurtas: 'Ethnic', Accessories: 'Ethnic' };
const DESCRIPTION_BY_CATEGORY = {
  Sarees: 'Handwoven drape with fine zari detailing, finished with a rich pallu. Pairs well with a contrast blouse.',
  Kurtas: 'Tailored in breathable fabric with delicate stitching at the placket and cuffs. Equally at home at festivals and the office.',
  Lehengas: 'A voluminous flare with hand-finished embroidery, made for weddings and celebrations.',
  Shirts: 'Soft, structured fabric with a relaxed collar. Traditional craft in a modern cut.',
  Dresses: 'A flattering silhouette that blends Indian tailoring with a contemporary line.',
  Jackets: 'A structured layer that turns any kurta or shirt into a complete outfit.',
  Pants: 'Comfortable, well-draped trousers with a clean finish for everyday styling.',
  Accessories: 'Finished by hand with traditional motifs to complete your look.',
};

// [name, category, price, colors, rating]
const RAW = [
  ['Royal Blue Silk Kurta', 'Kurtas', 2499, ['Blue', 'Black', 'Ivory'], 4.8],
  ['Ivory Embroidered Saree', 'Sarees', 4999, ['Ivory', 'Gold', 'Maroon'], 4.9],
  ['Terracotta Anarkali Dress', 'Dresses', 3499, ['Terracotta', 'Maroon'], 4.7],
  ['Midnight Blue Nehru Jacket', 'Jackets', 2999, ['Blue', 'Black'], 4.6],
  ['Maroon Banarasi Saree', 'Sarees', 6999, ['Maroon', 'Green'], 4.9],
  ['Emerald Zari Lehenga', 'Lehengas', 8999, ['Green', 'Gold'], 4.8],
  ['Blush Pink Lehenga', 'Lehengas', 9499, ['Pink', 'Ivory'], 4.7],
  ['Mustard Chikankari Kurta', 'Kurtas', 1999, ['Gold', 'Ivory'], 4.5],
  ['Linen Bandhgala Shirt', 'Shirts', 1799, ['Ivory', 'Blue'], 4.4],
  ['Indigo Block Print Shirt', 'Shirts', 1499, ['Blue', 'Ivory'], 4.5],
  ['Teal Wrap Dress', 'Dresses', 2799, ['Teal', 'Black'], 4.3],
  ['Black Velvet Bandi Jacket', 'Jackets', 3599, ['Black', 'Maroon'], 4.6],
  ['Ivory Palazzo Pants', 'Pants', 1399, ['Ivory', 'Black'], 4.4],
  ['Charcoal Cigarette Pants', 'Pants', 1699, ['Black', 'Blue'], 4.2],
  ['Gold Kundan Jhumka Set', 'Accessories', 1299, ['Gold'], 4.8],
  ['Teal Silk Dupatta', 'Accessories', 999, ['Teal', 'Maroon', 'Gold'], 4.5],
  ['Kanjivaram Green Saree', 'Sarees', 8499, ['Green', 'Maroon'], 4.9],
  ['Rust Cotton Kurta Set', 'Kurtas', 2299, ['Terracotta', 'Green'], 4.6],
  ['Pastel Sharara Set', 'Lehengas', 5999, ['Pink', 'Teal'], 4.5],
  ['Embroidered Denim Jacket', 'Jackets', 3199, ['Blue', 'Black'], 4.3],
];

export const products = RAW.map(([name, category, price, colors, rating], index) => {
  const hex = COLOR_HEX[colors[0]];
  return {
    id: index + 1,
    name,
    category,
    price,
    colors,
    sizes: category === 'Accessories' ? ['Free'] : SIZES,
    rating,
    style: STYLE_BY_CATEGORY[category] || 'Western',
    description: DESCRIPTION_BY_CATEGORY[category],
    image: makeGarmentImage(hex, category),
    gallery: [makeGarmentImage(hex, category), makeGarmentImage(hex, category, { variant: 1 })],
    cutout: makeGarmentImage(hex, category, { bare: true }), // transparent garment used by the mock try-on
  };
});

export const getProduct = (id) => products.find((product) => product.id === Number(id));
export const CATEGORY_IMAGES = Object.fromEntries(
  CATEGORIES.map((category) => [category, products.find((p) => p.category === category)?.image])
);
