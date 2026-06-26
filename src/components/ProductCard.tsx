import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Zap, Star, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';

const GREEN = '#0B5D3B';
const GOLD  = '#D4A017';

interface Props { product: Product; index?: number; }

const ProductCard: React.FC<Props> = ({ product, index = 0 }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const navigate = useNavigate();
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

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    navigate('/checkout');
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
      className="group relative bg-white rounded-3xl overflow-hidden flex flex-col"
      style={{
        border: '1px solid #EDE5D8',
        boxShadow: '0 2px 12px rgba(11,93,59,0.04)',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 48px rgba(11,93,59,0.12)`,
        borderColor: '#D4C4A8',
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden bg-[#F8F5EF]" style={{ aspectRatio: '4/3' }}>
        <Link to={`/product/${product.slug}`}>
          <motion.img
            src={product.image} alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        </Link>

        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(11,93,59,0.5) 100%)' }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <motion.span
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 + 0.2 }}
              className="px-2.5 py-0.5 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm"
              style={{ background: `linear-gradient(135deg, ${GREEN}, #0d7a4e)` }}
            >
              Best Seller
            </motion.span>
          )}
          {product.isFeatured && !product.isBestSeller && (
            <motion.span
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 + 0.2 }}
              className="px-2.5 py-0.5 text-white text-[10px] font-bold rounded-full shadow-sm"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #e8b820)` }}
            >
              Featured
            </motion.span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-sm">
              {discount}% off
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <motion.button
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400 }}
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
          style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}
        >
          <Heart
            size={14}
            style={inWishlist
              ? { fill: GOLD, color: GOLD }
              : { color: '#999' }
            }
          />
        </motion.button>

        {/* Quick view — appears on hover */}
        <motion.div
          className="absolute bottom-3 left-3 right-3 flex gap-2 pointer-events-none group-hover:pointer-events-auto"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1 }}
          style={{ opacity: 0 }}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.25 }}
          >
            <Link
              to={`/product/${product.slug}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-white text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <Eye size={12} /> View
            </Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-white text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <Zap size={12} /> Buy Now
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Info ── */}
      <div className="p-3.5 flex flex-col flex-1 gap-1">
        {/* Category */}
        <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: GOLD }}>
          {product.category.replace(/-/g, ' ')}
        </span>

        {/* Name */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-[#1a1a1a] leading-snug hover:text-[#0B5D3B] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Weight + Rating */}
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[11px] text-[#999]">{product.weight}</span>
          <div className="flex items-center gap-1">
            <Star size={10} style={{ fill: GOLD, color: GOLD }} />
            <span className="text-[11px] font-semibold text-[#555]">{product.rating}</span>
            <span className="text-[10px] text-[#bbb]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t" style={{ borderColor: '#F0E8DC' }}>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold" style={{ color: GREEN }}>₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#bbb] line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleAdd}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            className="flex items-center gap-1.5 px-3 py-2 text-white text-xs font-semibold rounded-xl transition-all"
            style={{
              background: added
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : `linear-gradient(135deg, ${GREEN}, #0d7a4e)`,
              boxShadow: added ? '0 4px 14px rgba(16,185,129,0.35)' : `0 4px 14px ${GREEN}30`,
            }}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span
                  key="done"
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }}
                  className="flex items-center gap-1"
                >
                  ✓ Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingCart size={12} /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
