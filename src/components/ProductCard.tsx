import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';

const GREEN = '#0B5D3B';
const GOLD  = '#D4A017';

const IMG_BG_COLORS = [
  '#E8F5E9', // soft green
  '#FFF8E1', // soft amber
  '#E3F2FD', // soft blue
  '#FCE4EC', // soft pink
  '#F3E5F5', // soft purple
  '#E0F7FA', // soft teal
  '#FBE9E7', // soft deep orange
];

interface Props { product: Product; index?: number; }

const ProductCard: React.FC<Props> = ({ product, index = 0 }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);
  const discount   = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    inWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-2xl flex flex-col bg-white"
      style={{ border: '1.5px solid #EDE5D8', transition: 'border-color 0.3s, box-shadow 0.3s' }}
      whileHover={{ y: -4, borderColor: GREEN, boxShadow: `0 8px 28px ${GREEN}18` }}
    >
      {/* ── Image area ── */}
      <div
        className="relative rounded-t-2xl overflow-hidden"
        style={{ background: IMG_BG_COLORS[index % IMG_BG_COLORS.length], aspectRatio: '4/3' }}
      >
        <Link to={`/product/${product.slug}`}>
          <motion.img
            src={product.image} alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </Link>

        {/* Wishlist — only thing inside image area */}
        <motion.button
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400 }}
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-sm"
          style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(6px)' }}
        >
          <Heart size={13} style={inWishlist ? { fill: GOLD, color: GOLD } : { color: '#aaa' }} />
        </motion.button>
      </div>

      {/* ── Info — badges live here, fully visible ── */}
      <div className="px-2.5 pt-1.5 pb-2.5 flex flex-col flex-1 gap-1">

        {/* Badges row — outside image */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.isBestSeller && (
            <span
              className="px-2 py-0.5 text-white text-[9px] font-bold rounded-md uppercase tracking-wider"
              style={{ background: `linear-gradient(135deg, ${GREEN}, #0d7a4e)` }}
            >
              Best Seller
            </span>
          )}
          {product.isFeatured && !product.isBestSeller && (
            <span
              className="px-2 py-0.5 text-white text-[9px] font-bold rounded-md"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #e8b820)` }}
            >
              Featured
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded-md">
              {discount}% off
            </span>
          )}
        </div>

        {/* Name */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-semibold text-[#1a1a1a] leading-snug hover:text-[#0B5D3B] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Weight + Rating */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#999] font-medium">{product.weight}</span>
          <div className="flex items-center gap-0.5">
            <Star size={10} style={{ fill: GOLD, color: GOLD }} />
            <span className="text-[11px] font-semibold text-[#555]">{product.rating}</span>
            <span className="text-[10px] text-[#bbb] ml-0.5">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t" style={{ borderColor: '#F0E8DC' }}>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold" style={{ color: GREEN }}>₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-[10px] text-[#bbb] line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleAdd}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            className="flex items-center gap-1 px-3 py-1.5 text-white text-xs font-semibold rounded-lg"
            style={{
              background: added ? 'linear-gradient(135deg, #10b981, #059669)' : `linear-gradient(135deg, ${GREEN}, #0d7a4e)`,
              boxShadow: added ? '0 4px 14px rgba(16,185,129,0.35)' : `0 4px 14px ${GREEN}30`,
            }}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="done"
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }}
                  className="flex items-center gap-1"
                >✓ Added</motion.span>
              ) : (
                <motion.span key="add"
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }}
                  className="flex items-center gap-1"
                ><ShoppingCart size={11} /> Add</motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
