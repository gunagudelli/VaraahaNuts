import type { Product } from '../types';

import IMG_250G  from '../assets/ChatGPT Image Jun 26, 2026, 06_34_42 PM.png';
import IMG_750G  from '../assets/ChatGPT Image Jun 26, 2026, 06_35_58 PM.png';
import IMG_1KG   from '../assets/ChatGPT Image Jun 26, 2026, 06_21_21 PM.png';
import IMG_2KG   from '../assets/ChatGPT Image Jun 26, 2026, 06_31_20 PM.png';
import IMG_3KG   from '../assets/ChatGPT Image Jun 26, 2026, 06_40_37 PM.png';
import IMG_5KG   from '../assets/ChatGPT Image Jun 26, 2026, 06_36_22 PM.png';
import IMG_10KG  from '../assets/ChatGPT Image Jun 26, 2026, 06_42_10 PM.png';

export const products: Product[] = [

  {
    id: '1', name: 'Premium Cashews — 250g', slug: 'premium-cashews-250g',
    category: 'premium-cashews', price: 299, originalPrice: 349, weight: '250g',
    image: IMG_250G, images: [IMG_250G, IMG_750G, IMG_1KG],
    rating: 4.8, reviewCount: 156, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'Premium quality cashews, hand-selected and hygienically packed. Perfect for daily snacking and gifting.',
    benefits: ['Hand Selected', 'Farm Direct', 'Zero Additives', 'FSSAI Certified'],
    tags: ['premium'],
  },

  {
    id: '2', name: 'Premium Cashews — 750g', slug: 'premium-cashews-750g',
    category: 'premium-cashews', price: 749, originalPrice: 899, weight: '750g',
    image: IMG_750G, images: [IMG_750G, IMG_250G, IMG_1KG],
    rating: 4.8, reviewCount: 124, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'Premium quality cashews, hand-selected and hygienically packed. Perfect for daily snacking and gifting.',
    benefits: ['Hand Selected', 'Farm Direct', 'Zero Additives', 'FSSAI Certified'],
    tags: ['premium'],
  },

  {
    id: '3', name: 'Premium Cashews — 1kg', slug: 'premium-cashews-1kg',
    category: 'premium-cashews', price: 999, originalPrice: 1199, weight: '1kg',
    image: IMG_1KG, images: [IMG_1KG, IMG_750G, IMG_2KG],
    rating: 4.7, reviewCount: 210, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'Premium quality cashews, hand-selected and hygienically packed. Perfect for daily snacking and gifting.',
    benefits: ['Most Popular', 'Daily Use', 'Culinary Grade', 'Natural Fresh'],
    tags: ['premium'],
  },

  {
    id: '4', name: 'Bulk Cashews — 2kg', slug: 'premium-cashews-2kg',
    category: 'bulk-cashews', price: 1899, originalPrice: 2299, weight: '2kg',
    image: IMG_2KG, images: [IMG_2KG, IMG_1KG, IMG_3KG],
    rating: 4.7, reviewCount: 87, inStock: true, isBestSeller: true,
    description: 'Bulk pack premium cashews ideal for families, commercial kitchens, and catering services. Best value for larger quantities.',
    benefits: ['Best Value', 'Bulk Pack', 'Family Size', 'Fresh & Natural'],
    tags: ['bulk', 'value'],
  },

  {
    id: '5', name: 'Bulk Cashews — 3kg', slug: 'premium-cashews-3kg',
    category: 'bulk-cashews', price: 2799, originalPrice: 3399, weight: '3kg',
    image: IMG_3KG, images: [IMG_3KG, IMG_2KG, IMG_5KG],
    rating: 4.6, reviewCount: 65, inStock: true, isFeatured: true,
    description: 'Bulk pack premium cashews ideal for families, commercial kitchens, and catering services.',
    benefits: ['Bulk Value', 'Commercial Grade', 'Fresh Pack', 'Zero Preservatives'],
    tags: ['bulk'],
  },

  {
    id: '6', name: 'Bulk Cashews — 5kg', slug: 'premium-cashews-5kg',
    category: 'bulk-cashews', price: 4599, originalPrice: 5499, weight: '5kg',
    image: IMG_5KG, images: [IMG_5KG, IMG_3KG, IMG_10KG],
    rating: 4.8, reviewCount: 43, inStock: true,
    description: 'Large bulk pack for businesses, sweet shops, and caterers. Freshly processed and hygienically sealed.',
    benefits: ['Business Pack', 'Sweet Shops', 'Caterers', 'Hygienically Sealed'],
    tags: ['bulk', 'wholesale'],
  },

  {
    id: '7', name: 'Wholesale Cashews — 10kg', slug: 'premium-cashews-10kg',
    category: 'bulk-cashews', price: 8999, originalPrice: 10999, weight: '10kg',
    image: IMG_10KG, images: [IMG_10KG, IMG_5KG, IMG_3KG],
    rating: 4.9, reviewCount: 31, inStock: true,
    description: 'Wholesale 10kg pack for factories, large catering units, and corporate gifting. Best pricing for high-volume buyers.',
    benefits: ['Wholesale Price', 'Factory Grade', 'Bulk Order', 'Corporate Ready'],
    tags: ['bulk', 'wholesale'],
  },

];

export const categories = [
  { id: 'cat-1', name: 'Premium Cashews', slug: 'premium-cashews', image: IMG_1KG,  productCount: products.filter(p => p.category === 'premium-cashews').length },
  { id: 'cat-2', name: 'Bulk Cashews',   slug: 'bulk-cashews',   image: IMG_5KG,  productCount: products.filter(p => p.category === 'bulk-cashews').length },
];

export const testimonials = [
  { id: '1', name: 'Rakesh',          location: 'Narsipatnam, Andhra Pradesh', rating: 5, comment: 'Absolutely love the quality! The cashews are the best I have ever tasted. Packaging is premium and delivery was super fast.', avatar: 'R' },
  { id: '2', name: 'Guna',             location: 'Rajamundry, Andhra Pradesh',  rating: 5, comment: 'Ordered cashew gift boxes for Diwali and everyone loved them. The cashews were so fresh and beautifully packaged!', avatar: 'G' },
  { id: '3', name: 'Anu Prashanath',   location: 'Bangalore',                   rating: 5, comment: 'The 1kg pack is perfect for our family. So fresh and natural — you can taste the difference from store-bought!', avatar: 'AP' },
  { id: '4', name: 'Vijay',     location: 'Taminadu',                      rating: 4, comment: 'Bulk cashew order for our office was handled professionally. Great pricing, fresh product, and excellent service.', avatar: 'MA' },
  { id: '5', name: 'Chinnabbai',       location: 'Mirthipadu, Andhra Pradesh',                       rating: 5, comment: 'Farm fresh cashew quality is unmatched. You can literally taste the difference. Will never go back to supermarket cashews!', avatar: 'DN' },
  { id: '6', name: 'Sunil',            location: 'Kukatpally, Hyderabad',       rating: 5, comment: 'Ordered the 2kg bulk pack and it was worth every rupee. Super fresh, crunchy and natural taste. Highly recommended!', avatar: 'S' },
  { id: '7', name: 'Guresh',           location: 'Miyapur, Hyderabad',          rating: 5, comment: 'Best cashews I have had in a long time. The quality is consistent and packaging is very hygienic. Will order again!', avatar: 'GU' },
  { id: '8', name: 'Kuhite',           location: 'Nagpur, Mumbai',              rating: 4, comment: 'Great value for money. The cashews arrived fresh and well packed. Perfect for daily snacking and cooking.', avatar: 'K' },
  { id: '9', name: 'Jay Rao',            location: 'Benz Circle, Vijayawada',     rating: 5, comment: 'Directly from AP farms — you can taste the freshness! Placed a bulk order for our shop and customers love it.', avatar: 'P' },
];

export const faqs = [
  { q: 'What grades of cashews do you offer?',    a: 'We offer W180, W240, W320, and W450 grades. W240 is our most popular premium snacking grade.' },
  { q: 'Do you offer bulk/wholesale pricing?',    a: 'Yes! We offer special pricing for cashew orders above 10kg. Contact us for a custom quote.' },
  { q: 'What is your delivery timeframe?',         a: 'Standard delivery is 3–5 business days. Express delivery (1–2 days) is available for select cities.' },
  { q: 'Are your cashews organically processed?',  a: 'Our cashews are naturally processed with zero artificial additives. We are working towards full organic certification.' },
  { q: 'Do you ship pan-India?',                  a: 'Yes, we deliver cashews to all states across India. International shipping is available for select countries.' },
  { q: 'What is your return policy?',             a: 'We offer a 7-day freshness guarantee. If you are not satisfied with cashew quality, we will replace or refund.' },
  { q: 'Do you offer corporate cashew gifting?',  a: 'Absolutely! We create custom-branded cashew gift boxes for corporate events and festivals. Contact us for pricing.' },
];

export const CHERO = IMG_1KG;
