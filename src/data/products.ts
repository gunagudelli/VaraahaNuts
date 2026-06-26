import type { Product } from '../types';

// All images downloaded locally from Pexels/Pixabay — cashew & nuts only
const P2    = '/p2.jpg';
const P4    = '/p4.jpg';
const P5    = '/p5.jpg';
const P11   = '/p11.jpg';
const PHERO = '/phero.jpg';
const PEXELS = 'https://images.pexels.com/photos/18876240/pexels-photo-18876240.jpeg';

// WhatsApp real product photos
import WA1 from '../assets/WhatsApp Image 2026-06-16 at 1.36.56 PM.jpeg';
import WA2 from '../assets/WhatsApp Image 2026-06-16 at 1.37.26 PM.jpeg';
import WA3 from '../assets/WhatsApp Image 2026-06-16 at 1.37.26 PM (1).jpeg';

export const CHERO = PHERO;

export const products: Product[] = [

  {
    id: '1', name: 'Varaaha W180 King Cashews', slug: 'w180-king-cashews',
    category: 'premium-cashews', price: 1099, originalPrice: 1299, weight: '500g',
    image: WA2, images: [WA2, WA3, P4],
    rating: 4.8, reviewCount: 156, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'W180 — King of Cashews / Super Jumbo. The largest, highest-grade premium cashews, perfect for luxury gifting and high-end retail. Hand-selected for size, shape, and freshness directly from our AP facility.',
    benefits: ['Largest Grade', 'Hand Selected', 'Farm Direct', 'Zero Additives'],
    tags: ['premium'],
  },

  {
    id: '2', name: 'Varaaha W240 Jumbo Whole Cashews', slug: 'w240-jumbo-whole-cashews',
    category: 'premium-cashews', price: 899, originalPrice: 1099, weight: '500g',
    image: WA3, images: [WA3, WA2, P4],
    rating: 4.8, reviewCount: 124, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'W240 — Jumbo Whole. Highly sought-after large wholes, widely preferred for premium sweets, bakeries, and festive packs. Hygienically processed at our FSSAI-certified facility in Narsipatnam.',
    benefits: ['Jumbo Size', 'Bakery Grade', 'Festive Ready', 'FSSAI Certified'],
    tags: ['premium'],
  },

  {
    id: '3', name: 'Varaaha W320 Standard Whole Cashews', slug: 'w320-standard-whole-cashews',
    category: 'premium-cashews', price: 749, originalPrice: 899, weight: '500g',
    image: WA1, images: [WA1, WA2, P4],
    rating: 4.7, reviewCount: 210, inStock: true, isFeatured: true, isBestSeller: true,
    description: 'W320 — Standard Whole. The most popular and globally demanded standard-sized wholes, ideal for daily consumption and culinary use. Fresh, natural, and zero preservatives.',
    benefits: ['Most Popular', 'Daily Use', 'Culinary Grade', 'Natural Fresh'],
    tags: ['premium'],
  },

  {
    id: '4', name: 'Varaaha Pieces & Splits', slug: 'cashew-pieces-splits',
    category: 'bulk-cashews', price: 499, originalPrice: 649, weight: '500g',
    image: P4, images: [P4, WA1, P2],
    rating: 4.6, reviewCount: 87, inStock: true, isBestSeller: true,
    description: 'Processed Pieces & Splits (JH · K · LWP · SWP) — carefully graded broken cashews tailored for commercial kitchens, sweet manufacturing units, and catering services. Best value bulk option.',
    benefits: ['Best Value', 'Commercial Grade', 'JH·K·LWP·SWP', 'Bulk Ready'],
    tags: ['bulk', 'value'],
  },

  {
    id: '5', name: 'Varaaha Peri Peri Spiced Cashews', slug: 'peri-peri-spiced-cashews',
    category: 'flavored-cashews', price: 749, originalPrice: 899, weight: '200g',
    image: PEXELS, images: [PEXELS, WA1, P4],
    rating: 4.6, reviewCount: 98, inStock: true, isFeatured: true,
    description: 'A fiery peri peri spice blend coats our premium cashews for a bold, adventurous snacking experience. Made with natural spices, zero artificial flavours.',
    benefits: ['Bold Flavour', 'Natural Spices', 'Real Chillies', 'Exciting Taste'],
    tags: ['flavored', 'spicy'],
  },

  {
    id: '6', name: 'Varaaha Premium Cashew Gift Pack', slug: 'premium-cashew-gift-pack',
    category: 'gift-packs', price: 1199, originalPrice: 1499, weight: '500g',
    image: P5, images: [P5, P2],
    rating: 4.8, reviewCount: 43, inStock: true,
    description: 'An elegant gift pack with premium cashew variants — W180 & W240. Perfect for birthdays, anniversaries, Diwali, and corporate gifting. Custom branding available for bulk orders.',
    benefits: ['2 Variants', 'Elegant Box', 'Festive Ready', 'Custom Branding'],
    tags: ['gift'],
  },


];

export const testimonials = [
  { id: '1', name: 'Priya Sharma',  location: 'Hyderabad', rating: 5, comment: 'Absolutely love the quality! The W240 cashews are the best I have ever tasted. Packaging is premium and delivery was super fast.', avatar: 'PS' },
  { id: '2', name: 'Rajesh Kumar',  location: 'Bangalore', rating: 5, comment: 'Ordered cashew gift boxes for Diwali and everyone loved them. The cashews were so fresh and beautifully packaged!', avatar: 'RK' },
  { id: '3', name: 'Anitha Reddy',  location: 'Chennai',   rating: 5, comment: 'Peri Peri cashews are incredibly addictive! The spice level is perfect and only natural spices are used. Great brand!', avatar: 'AR' },
  { id: '4', name: 'Mohammed Ali',  location: 'Mumbai',    rating: 4, comment: 'Bulk cashew order for our office was handled professionally. Great pricing, fresh product, and excellent service.', avatar: 'MA' },
  { id: '5', name: 'Deepa Nair',    location: 'Kochi',     rating: 5, comment: 'Farm fresh cashew quality is unmatched. You can literally taste the difference. Will never go back to supermarket cashews!', avatar: 'DN' },
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
