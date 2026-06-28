import type { Product } from '../types';

import IMG_SKIN     from '../assets/Skin cashews.jpeg';
import IMG_KAJUBB   from '../assets/Kaju BB.jpeg';
import IMG_8PIECE   from '../assets/8 piece.jpeg';
import IMG_4PIECE   from '../assets/4 Piece.jpeg';
import IMG_JHSPLITS from '../assets/JH Splits.jpeg';
import IMG_WMIX     from '../assets/Wmix cashew wholes.jpeg';
import W_500        from '../assets/500.png';
import W_250        from '../assets/250.png';
import POUCH_1KG    from '../assets/pouch 1kg.png';
import POUCH_500    from '../assets/pouch 500 grams.png';
import POUCH_250    from '../assets/pouch 250 grams.png';

export const products: Product[] = [

  // ── Avarage Wmix Cashews ──
  {
    id: '1', name: 'Avarage Wmix Cashews — 1kg', slug: 'wmix-cashews-1kg',
    category: 'wmix-cashews', price: 760, originalPrice: 800, weight: '1kg',
    image: IMG_WMIX, images: [IMG_WMIX, POUCH_1KG],
    rating: 4.5, reviewCount: 98, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'Premium quality Avarage Wmix Cashews with rich taste and natural freshness. Ideal for daily snacking, sweets, and cooking.',
    benefits: ['Rich Taste', 'Natural Fresh', 'Daily Snacking', 'FSSAI Certified'],
    tags: ['wmix'],
  },
  {
    id: '2', name: 'Avarage Wmix Cashews — 500g', slug: 'wmix-cashews-500g',
    category: 'wmix-cashews', price: 400, originalPrice: 380, weight: '500g',
    image: IMG_WMIX, images: [IMG_WMIX, POUCH_500],
    rating: 4.5, reviewCount: 74, inStock: true,
    description: 'Premium quality Avarage Wmix Cashews with rich taste and natural freshness. Ideal for daily snacking, sweets, and cooking.',
    benefits: ['Rich Taste', 'Natural Fresh', 'Daily Snacking', 'FSSAI Certified'],
    tags: ['wmix'],
  },
  {
    id: '3', name: 'Avarage Wmix Cashews — 250g', slug: 'wmix-cashews-250g',
    category: 'wmix-cashews', price: 250, originalPrice: 200, weight: '250g',
    image: IMG_WMIX, images: [IMG_WMIX, POUCH_250],
    rating: 4.5, reviewCount: 52, inStock: true,
    description: 'Premium quality Avarage Wmix Cashews with rich taste and natural freshness. Ideal for daily snacking, sweets, and cooking.',
    benefits: ['Rich Taste', 'Natural Fresh', 'Daily Snacking', 'FSSAI Certified'],
    tags: ['wmix'],
  },

  // ── Split Cashews ──
  {
    id: '4', name: 'Split Cashews — 1kg', slug: 'split-cashews-1kg',
    category: 'split-cashews', price: 770, originalPrice: 820, weight: '1kg',
    image: IMG_JHSPLITS, images: [IMG_JHSPLITS, POUCH_1KG],
    rating: 4.4, reviewCount: 86, inStock: true, isFeatured: true,
    description: 'Economical split cashews perfect for curries, gravies, bakery items, and sweets.',
    benefits: ['Great for Curries', 'Bakery Use', 'Economical', 'Natural Fresh'],
    tags: ['split'],
  },
  {
    id: '5', name: 'Split Cashews — 500g', slug: 'split-cashews-500g',
    category: 'split-cashews', price: 400, originalPrice: 380, weight: '500g',
    image: IMG_JHSPLITS, images: [IMG_JHSPLITS, POUCH_500],
    rating: 4.4, reviewCount: 61, inStock: true,
    description: 'Economical split cashews perfect for curries, gravies, bakery items, and sweets.',
    benefits: ['Great for Curries', 'Bakery Use', 'Economical', 'Natural Fresh'],
    tags: ['split'],
  },
  {
    id: '6', name: 'Split Cashews — 250g', slug: 'split-cashews-250g',
    category: 'split-cashews', price: 240, originalPrice: 200, weight: '250g',
    image: IMG_JHSPLITS, images: [IMG_JHSPLITS, POUCH_250],
    rating: 4.4, reviewCount: 39, inStock: true,
    description: 'Economical split cashews perfect for curries, gravies, bakery items, and sweets.',
    benefits: ['Great for Curries', 'Bakery Use', 'Economical', 'Natural Fresh'],
    tags: ['split'],
  },

  // ── 4 Piece Cashews ──
  {
    id: '7', name: '4 Piece Cashews — 1kg', slug: '4-piece-cashews-1kg',
    category: '4-piece-cashews', price: 685, originalPrice: 720, weight: '1kg',
    image: IMG_4PIECE, images: [IMG_4PIECE, POUCH_1KG],
    rating: 4.6, reviewCount: 112, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'Medium-sized premium cashews offering a perfect balance of taste, texture, and value.',
    benefits: ['Premium Grade', 'Balanced Taste', 'Best Value', 'FSSAI Certified'],
    tags: ['4-piece'],
  },
  {
    id: '8', name: '4 Piece Cashews — 500g', slug: '4-piece-cashews-500g',
    category: '4-piece-cashews', price: 360, originalPrice: 375, weight: '500g',
    image: IMG_4PIECE, images: [IMG_4PIECE, POUCH_500],
    rating: 4.6, reviewCount: 88, inStock: true,
    description: 'Medium-sized premium cashews offering a perfect balance of taste, texture, and value.',
    benefits: ['Premium Grade', 'Balanced Taste', 'Best Value', 'FSSAI Certified'],
    tags: ['4-piece'],
  },
  {
    id: '9', name: '4 Piece Cashews — 250g', slug: '4-piece-cashews-250g',
    category: '4-piece-cashews', price: 200, originalPrice: 200, weight: '250g',
    image: IMG_4PIECE, images: [IMG_4PIECE, POUCH_250],
    rating: 4.6, reviewCount: 55, inStock: true,
    description: 'Medium-sized premium cashews offering a perfect balance of taste, texture, and value.',
    benefits: ['Premium Grade', 'Balanced Taste', 'Best Value', 'FSSAI Certified'],
    tags: ['4-piece'],
  },

  // ── 8 Piece Cashews ──
  {
    id: '10', name: '8 Piece Cashews — 1kg', slug: '8-piece-cashews-1kg',
    category: '8-piece-cashews', price: 580, originalPrice: 620, weight: '1kg',
    image: IMG_8PIECE, images: [IMG_8PIECE, POUCH_1KG],
    rating: 4.4, reviewCount: 93, inStock: true, isBestSeller: true,
    description: 'Affordable cashews suitable for regular home use, desserts, and cooking.',
    benefits: ['Affordable', 'Home Use', 'Desserts', 'Cooking Grade'],
    tags: ['8-piece'],
  },
  {
    id: '11', name: '8 Piece Cashews — 500g', slug: '8-piece-cashews-500g',
    category: '8-piece-cashews', price: 300, originalPrice: 340, weight: '500g',
    image: IMG_8PIECE, images: [IMG_8PIECE, POUCH_500],
    rating: 4.4, reviewCount: 67, inStock: true,
    description: 'Affordable cashews suitable for regular home use, desserts, and cooking.',
    benefits: ['Affordable', 'Home Use', 'Desserts', 'Cooking Grade'],
    tags: ['8-piece'],
  },
  {
    id: '12', name: '8 Piece Cashews — 250g', slug: '8-piece-cashews-250g',
    category: '8-piece-cashews', price: 150, originalPrice: 180, weight: '250g',
    image: IMG_8PIECE, images: [IMG_8PIECE, POUCH_250],
    rating: 4.4, reviewCount: 44, inStock: true,
    description: 'Affordable cashews suitable for regular home use, desserts, and cooking.',
    benefits: ['Affordable', 'Home Use', 'Desserts', 'Cooking Grade'],
    tags: ['8-piece'],
  },

  // ── Kaju BB (Nooka) ──
  {
    id: '13', name: 'Kaju BB (Nooka) — 1kg', slug: 'kaju-bb-nooka-1kg',
    category: 'kaju-bb', price: 280, originalPrice: 320, weight: '1kg',
    image: IMG_KAJUBB, images: [IMG_KAJUBB, POUCH_1KG],
    rating: 4.3, reviewCount: 78, inStock: true,
    description: 'Budget-friendly cashew variety for everyday consumption and recipes.',
    benefits: ['Budget Friendly', 'Everyday Use', 'Recipe Grade', 'Natural Fresh'],
    tags: ['kaju-bb', 'budget'],
  },
  {
    id: '14', name: 'Kaju BB (Nooka) — 500g', slug: 'kaju-bb-nooka-500g',
    category: 'kaju-bb', price: 150, originalPrice: 150, weight: '500g',
    image: IMG_KAJUBB, images: [IMG_KAJUBB, POUCH_500],
    rating: 4.3, reviewCount: 54, inStock: true,
    description: 'Budget-friendly cashew variety for everyday consumption and recipes.',
    benefits: ['Budget Friendly', 'Everyday Use', 'Recipe Grade', 'Natural Fresh'],
    tags: ['kaju-bb', 'budget'],
  },
  {
    id: '15', name: 'Kaju BB (Nooka) — 250g', slug: 'kaju-bb-nooka-250g',
    category: 'kaju-bb', price: 70, originalPrice: 130, weight: '250g',
    image: IMG_KAJUBB, images: [IMG_KAJUBB, POUCH_250],
    rating: 4.3, reviewCount: 36, inStock: true,
    description: 'Budget-friendly cashew variety for everyday consumption and recipes.',
    benefits: ['Budget Friendly', 'Everyday Use', 'Recipe Grade', 'Natural Fresh'],
    tags: ['kaju-bb', 'budget'],
  },

  // ── W180 Jumbo Cashew (King Size) ──
  {
    id: '16', name: 'W180 Jumbo Cashew — 1kg', slug: 'w180-jumbo-cashew-1kg',
    category: 'w180-cashews', price: 960, originalPrice: 1400, weight: '1kg',
    image: POUCH_1KG, images: [POUCH_1KG],
    rating: 4.9, reviewCount: 145, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'Large premium whole cashews with excellent taste and crunchy texture. Best for gifting and premium dry fruit packs.',
    benefits: ['King Size', 'Premium Grade', 'Gift Ready', 'Crunchy Texture'],
    tags: ['w180', 'premium', 'jumbo'],
  },
  {
    id: '17', name: 'W180 Jumbo Cashew — 500g', slug: 'w180-jumbo-cashew-500g',
    category: 'w180-cashews', price: 485, originalPrice: 485, weight: '500g',
    image: POUCH_500, images: [POUCH_500, W_500],
    rating: 4.9, reviewCount: 102, inStock: true, isFeatured: true,
    description: 'Large premium whole cashews with excellent taste and crunchy texture. Best for gifting and premium dry fruit packs.',
    benefits: ['King Size', 'Premium Grade', 'Gift Ready', 'Crunchy Texture'],
    tags: ['w180', 'premium', 'jumbo'],
  },
  {
    id: '18', name: 'W180 Jumbo Cashew — 250g', slug: 'w180-jumbo-cashew-250g',
    category: 'w180-cashews', price: 355, originalPrice: 355, weight: '250g',
    image: POUCH_250, images: [POUCH_250, W_250],
    rating: 4.9, reviewCount: 68, inStock: true,
    description: 'Large premium whole cashews with excellent taste and crunchy texture. Best for gifting and premium dry fruit packs.',
    benefits: ['King Size', 'Premium Grade', 'Gift Ready', 'Crunchy Texture'],
    tags: ['w180', 'premium', 'jumbo'],
  },

  // ── W240 Super Cashew ──
  {
    id: '19', name: 'W240 Super Cashew — 1kg', slug: 'w240-super-cashew-1kg',
    category: 'w240-cashews', price: 830, originalPrice: 999, weight: '1kg',
    image: POUCH_1KG, images: [POUCH_1KG],
    rating: 4.8, reviewCount: 134, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'High-quality whole cashews with uniform size, ideal for snacks and festive occasions.',
    benefits: ['Uniform Size', 'Festive Grade', 'Premium Snack', 'FSSAI Certified'],
    tags: ['w240', 'premium'],
  },
  {
    id: '20', name: 'W240 Super Cashew — 500g', slug: 'w240-super-cashew-500g',
    category: 'w240-cashews', price: 460, originalPrice: 460, weight: '500g',
    image: POUCH_500, images: [POUCH_500, W_500],
    rating: 4.8, reviewCount: 97, inStock: true,
    description: 'High-quality whole cashews with uniform size, ideal for snacks and festive occasions.',
    benefits: ['Uniform Size', 'Festive Grade', 'Premium Snack', 'FSSAI Certified'],
    tags: ['w240', 'premium'],
  },
  {
    id: '21', name: 'W240 Super Cashew — 250g', slug: 'w240-super-cashew-250g',
    category: 'w240-cashews', price: 250, originalPrice: 250, weight: '250g',
    image: POUCH_250, images: [POUCH_250, W_250],
    rating: 4.8, reviewCount: 63, inStock: true,
    description: 'High-quality whole cashews with uniform size, ideal for snacks and festive occasions.',
    benefits: ['Uniform Size', 'Festive Grade', 'Premium Snack', 'FSSAI Certified'],
    tags: ['w240', 'premium'],
  },

  // ── W320 Cashew ──
  {
    id: '22', name: 'W320 Cashew — 1kg', slug: 'w320-cashew-1kg',
    category: 'w320-cashews', price: 760, originalPrice: 840, weight: '1kg',
    image: POUCH_1KG, images: [POUCH_1KG],
    rating: 4.7, reviewCount: 189, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'Popular grade cashews offering premium quality at an affordable price for daily use.',
    benefits: ['Popular Grade', 'Affordable', 'Daily Use', 'Farm Direct'],
    tags: ['w320'],
  },
  {
    id: '23', name: 'W320 Cashew — 500g', slug: 'w320-cashew-500g',
    category: 'w320-cashews', price: 420, originalPrice: 420, weight: '500g',
    image: POUCH_500, images: [POUCH_500, W_500],
    rating: 4.7, reviewCount: 143, inStock: true,
    description: 'Popular grade cashews offering premium quality at an affordable price for daily use.',
    benefits: ['Popular Grade', 'Affordable', 'Daily Use', 'Farm Direct'],
    tags: ['w320'],
  },
  {
    id: '24', name: 'W320 Cashew — 250g', slug: 'w320-cashew-250g',
    category: 'w320-cashews', price: 260, originalPrice: 260, weight: '250g',
    image: POUCH_250, images: [POUCH_250, W_250],
    rating: 4.7, reviewCount: 98, inStock: true,
    description: 'Popular grade cashews offering premium quality at an affordable price for daily use.',
    benefits: ['Popular Grade', 'Affordable', 'Daily Use', 'Farm Direct'],
    tags: ['w320'],
  },

  // ── Skin Cashews ──
  {
    id: '25', name: 'Skin Cashews — 1kg', slug: 'skin-cashews-1kg',
    category: 'skin-cashews', price: 950, originalPrice: 1000, weight: '1kg',
    image: IMG_SKIN, images: [IMG_SKIN, POUCH_1KG],
    rating: 4.6, reviewCount: 77, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'Naturally processed skin-on cashews with authentic flavor and nutritional benefits.',
    benefits: ['Skin-On', 'Authentic Flavor', 'Nutritional', 'Natural Process'],
    tags: ['skin', 'natural'],
  },
  {
    id: '26', name: 'Skin Cashews — 500g', slug: 'skin-cashews-500g',
    category: 'skin-cashews', price: 499, originalPrice: 499, weight: '500g',
    image: IMG_SKIN, images: [IMG_SKIN, POUCH_500],
    rating: 4.6, reviewCount: 53, inStock: true,
    description: 'Naturally processed skin-on cashews with authentic flavor and nutritional benefits.',
    benefits: ['Skin-On', 'Authentic Flavor', 'Nutritional', 'Natural Process'],
    tags: ['skin', 'natural'],
  },
  {
    id: '27', name: 'Skin Cashews — 250g', slug: 'skin-cashews-250g',
    category: 'skin-cashews', price: 250, originalPrice: 250, weight: '250g',
    image: IMG_SKIN, images: [IMG_SKIN, POUCH_250],
    rating: 4.6, reviewCount: 34, inStock: true,
    description: 'Naturally processed skin-on cashews with authentic flavor and nutritional benefits.',
    benefits: ['Skin-On', 'Authentic Flavor', 'Nutritional', 'Natural Process'],
    tags: ['skin', 'natural'],
  },

];

export const categories = [
  { id: 'cat-1', name: 'Wmix Cashews',       slug: 'wmix-cashews',    image: IMG_WMIX,     productCount: products.filter(p => p.category === 'wmix-cashews').length },
  { id: 'cat-2', name: 'Split Cashews',      slug: 'split-cashews',   image: IMG_JHSPLITS, productCount: products.filter(p => p.category === 'split-cashews').length },
  { id: 'cat-3', name: '4 Piece Cashews',    slug: '4-piece-cashews', image: IMG_4PIECE,   productCount: products.filter(p => p.category === '4-piece-cashews').length },
  { id: 'cat-4', name: '8 Piece Cashews',    slug: '8-piece-cashews', image: IMG_8PIECE,   productCount: products.filter(p => p.category === '8-piece-cashews').length },
  { id: 'cat-5', name: 'Kaju BB (Nooka)',    slug: 'kaju-bb',         image: IMG_KAJUBB,   productCount: products.filter(p => p.category === 'kaju-bb').length },
  { id: 'cat-6', name: 'W180 Jumbo Cashews', slug: 'w180-cashews',    image: POUCH_1KG,    productCount: products.filter(p => p.category === 'w180-cashews').length },
  { id: 'cat-7', name: 'W240 Super Cashews', slug: 'w240-cashews',    image: POUCH_1KG,    productCount: products.filter(p => p.category === 'w240-cashews').length },
  { id: 'cat-8', name: 'W320 Cashews',       slug: 'w320-cashews',    image: POUCH_1KG,    productCount: products.filter(p => p.category === 'w320-cashews').length },
  { id: 'cat-9', name: 'Skin Cashews',       slug: 'skin-cashews',    image: IMG_SKIN,     productCount: products.filter(p => p.category === 'skin-cashews').length },
];

export const testimonials = [
  { id: '1', name: 'Rakesh',         location: 'Narsipatnam, Andhra Pradesh', rating: 5, comment: 'Absolutely love the quality! The cashews are the best I have ever tasted. Packaging is premium and delivery was super fast.', avatar: 'R' },
  { id: '2', name: 'Guna',           location: 'Rajamundry, Andhra Pradesh',  rating: 5, comment: 'Ordered cashew gift boxes for Diwali and everyone loved them. The cashews were so fresh and beautifully packaged!', avatar: 'G' },
  { id: '3', name: 'Anu Prashanath', location: 'Bangalore',                   rating: 5, comment: 'The 1kg pack is perfect for our family. So fresh and natural — you can taste the difference from store-bought!', avatar: 'AP' },
  { id: '4', name: 'Vijay',          location: 'Taminadu',                    rating: 4, comment: 'Bulk cashew order for our office was handled professionally. Great pricing, fresh product, and excellent service.', avatar: 'MA' },
  { id: '5', name: 'Chinnabbai',     location: 'Mirthipadu, Andhra Pradesh',  rating: 5, comment: 'Farm fresh cashew quality is unmatched. You can literally taste the difference. Will never go back to supermarket cashews!', avatar: 'DN' },
  { id: '6', name: 'Sunil',          location: 'Kukatpally, Hyderabad',       rating: 5, comment: 'Ordered the 2kg bulk pack and it was worth every rupee. Super fresh, crunchy and natural taste. Highly recommended!', avatar: 'S' },
  { id: '7', name: 'Guresh',         location: 'Miyapur, Hyderabad',          rating: 5, comment: 'Best cashews I have had in a long time. The quality is consistent and packaging is very hygienic. Will order again!', avatar: 'GU' },
  { id: '8', name: 'Kuhite',         location: 'Nagpur, Mumbai',              rating: 4, comment: 'Great value for money. The cashews arrived fresh and well packed. Perfect for daily snacking and cooking.', avatar: 'K' },
  { id: '9', name: 'Jay Rao',        location: 'Benz Circle, Vijayawada',     rating: 5, comment: 'Directly from AP farms — you can taste the freshness! Placed a bulk order for our shop and customers love it.', avatar: 'P' },
];

export const faqs = [
  { q: 'What grades of cashews do you offer?',   a: 'We offer W180, W240, W320, and W450 grades. W240 is our most popular premium snacking grade.' },
  { q: 'Do you offer bulk/wholesale pricing?',   a: 'Yes! We offer special pricing for cashew orders above 10kg. Contact us for a custom quote.' },
  { q: 'What is your delivery timeframe?',        a: 'Standard delivery is 3–5 business days. Express delivery (1–2 days) is available for select cities.' },
  { q: 'Are your cashews organically processed?', a: 'Our cashews are naturally processed with zero artificial additives. We are working towards full organic certification.' },
  { q: 'Do you ship pan-India?',                 a: 'Yes, we deliver cashews to all states across India. International shipping is available for select countries.' },
  { q: 'What is your return policy?',            a: 'We offer a 7-day freshness guarantee. If you are not satisfied with cashew quality, we will replace or refund.' },
  { q: 'Do you offer corporate cashew gifting?', a: 'Absolutely! We create custom-branded cashew gift boxes for corporate events and festivals. Contact us for pricing.' },
];

export const CHERO = POUCH_1KG;
