
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ChevronRight, ChevronLeft, Plus, Minus, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProducts } from '../lib/api';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import PageTransition from '../components/PageTransition';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { setImgIdx(0); }, [slug]);

  const product = products.find(p => p.slug === slug);
  const inWishlist = product ? isInWishlist(product.id) : false;
  const gallery = product?.images && product.images.length > 0 ? product.images : product ? [product.image] : [];

  if (loading) return (
    <div className="pt-24 text-center py-20">
      <p className="text-sm text-[#777]">Loading product...</p>
    </div>
  );

  if (!product) return (
    <div className="pt-24 text-center py-20">
      <p className="text-lg font-semibold text-[#1a1a1a]">Product not found</p>
      <Link to="/shop" className="text-sm text-[#D4A017] mt-2 inline-block">Back to Shop</Link>
    </div>
  );

  const baseName = product.name.split(' —')[0];
  const variants = products.filter(p => p.category === product.category && p.name.startsWith(baseName));
  const related = variants.filter(p => p.id !== product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <PageTransition key={slug}>
      <div className="pt-16 bg-[#FDFAF4] min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#F0E6D3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-[#777]">
              <Link to="/" className="hover:text-[#D4A017]">Home</Link>
              <ChevronRight size={12} />
              <Link to="/shop" className="hover:text-[#D4A017]">Shop</Link>
              <ChevronRight size={12} />
              <span className="text-[#1a1a1a] font-medium truncate">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Gallery */}
            <div>
              <div className="relative rounded-2xl overflow-hidden bg-[#F5EDD8]" style={{ height: '320px' }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${product.id}-${imgIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    src={gallery[imgIdx]}
                    alt={product.name}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIdx(i => (i - 1 + gallery.length) % gallery.length)}
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={16} className="text-[#0B5D3B]" />
                    </button>
                    <button
                      onClick={() => setImgIdx(i => (i + 1) % gallery.length)}
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronRight size={16} className="text-[#0B5D3B]" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIdx(i)}
                          aria-label={`Show image ${i + 1}`}
                          className="w-1.5 h-1.5 rounded-full transition-all"
                          style={{ background: i === imgIdx ? '#D4A017' : 'rgba(255,255,255,0.7)', width: i === imgIdx ? '16px' : '6px' }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#D4A017] font-medium">{product.category.replace(/-/g, ' ')}</p>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] leading-tight">{product.name}</h1>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < Math.floor(product.rating) ? 'fill-[#D4A017] text-[#D4A017]' : 'text-[#E8D5B0]'} />
                  ))}
                </div>
                <span className="text-xs text-[#777]">{product.rating} · {product.reviewCount} reviews</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#1a1a1a]">₹{product.price}</span>
                {discount > 0 && <span className="text-sm text-[#777] line-through">₹{product.originalPrice}</span>}
                {discount > 0 && <span className="px-2 py-0.5 bg-[#D4A017]/15 text-[#0B5D3B] text-xs font-semibold rounded-full">{discount}% OFF</span>}
              </div>

              <p className="text-xs text-[#444] leading-relaxed">{product.description}</p>

              <div className="flex gap-1.5 flex-wrap">
                {product.benefits.map(b => (
                  <span key={b} className="flex items-center gap-1 px-2.5 py-0.5 bg-[#F5EDD8] text-[#444] text-xs font-medium rounded-full">
                    <Check size={10} className="text-[#0B5D3B]" />{b}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-[#1a1a1a]">Weight:</span>
                {variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => navigate(`/product/${v.slug}`)}
                    className={`px-3 py-1 border-2 text-xs font-semibold rounded-full transition-all ${
                      v.id === product.id
                        ? 'border-[#D4A017] bg-[#F5EDD8] text-[#0B5D3B]'
                        : 'border-[#E8D5B0] text-[#777] hover:border-[#D4A017]'
                    }`}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>

              {/* Qty & Add */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center border border-[#E8D5B0] rounded-full overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-[#F5EDD8] transition-colors">
                    <Minus size={13} className="text-[#0B5D3B]" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-[#1a1a1a]">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-[#F5EDD8] transition-colors">
                    <Plus size={13} className="text-[#0B5D3B]" />
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={`flex-1 min-w-32 h-9 flex items-center justify-center gap-2 rounded-full font-semibold text-xs transition-all duration-200 ${added ? 'bg-green-600 text-white' : 'bg-[#0B5D3B] text-white hover:bg-[#0d7a4e]'}`}
                >
                  {added ? <><Check size={14} /> Added to Cart</> : <><ShoppingCart size={14} /> Add to Cart</>}
                </motion.button>
                <button
                  onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                  className="w-9 h-9 rounded-full border border-[#E8D5B0] flex items-center justify-center hover:border-[#D4A017] transition-colors"
                >
                  <Heart size={14} className={inWishlist ? 'fill-[#D4A017] text-[#D4A017]' : 'text-[#0B5D3B]'} />
                </button>
              </div>

              <button
                onClick={() => { addToCart(product, qty); navigate('/checkout'); }}
                className="w-full h-9 rounded-full border-2 border-[#0B5D3B] text-[#0B5D3B] font-semibold text-xs hover:bg-[#F5EDD8] transition-colors"
              >
                Buy Now
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#F0E6D3]">
                {([{ Icon: Truck, title: 'Free Delivery', sub: '₹999+' }, { Icon: Shield, title: 'Secure Payment', sub: '100% Safe' }, { Icon: RefreshCw, title: '7-Day Returns', sub: 'Easy Returns' }]).map(({ Icon, title, sub }) => (
                  <div key={title} className="flex flex-col items-center text-center gap-0.5">
                    <Icon size={16} className="text-[#D4A017]" />
                    <p className="text-xs font-medium text-[#1a1a1a]">{title}</p>
                    <p className="text-[10px] text-[#777]">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
