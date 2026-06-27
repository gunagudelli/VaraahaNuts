
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ChevronRight, Plus, Minus, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import PageTransition from '../components/PageTransition';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const inWishlist = product ? isInWishlist(product.id) : false;

  if (!product) return (
    <div className="pt-24 text-center py-20">
      <p className="text-lg font-semibold text-[#2C2416]">Product not found</p>
      <Link to="/shop" className="text-sm text-[#C9A84C] mt-2 inline-block">Back to Shop</Link>
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
            <nav className="flex items-center gap-2 text-xs text-[#7A6A56]">
              <Link to="/" className="hover:text-[#C9A84C]">Home</Link>
              <ChevronRight size={12} />
              <Link to="/shop" className="hover:text-[#C9A84C]">Shop</Link>
              <ChevronRight size={12} />
              <span className="text-[#2C2416] font-medium truncate">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Gallery */}
            <div>
              <div className="rounded-2xl overflow-hidden bg-[#F5EDD8]" style={{ height: '320px' }}>
                <motion.img
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.image}
                  alt={product.name}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#C4956A] font-medium">{product.category.replace(/-/g, ' ')}</p>
                <h1 className="text-xl sm:text-2xl font-bold text-[#2C2416] leading-tight">{product.name}</h1>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < Math.floor(product.rating) ? 'fill-[#C9A84C] text-[#C9A84C]' : 'text-[#E8D5B0]'} />
                  ))}
                </div>
                <span className="text-xs text-[#7A6A56]">{product.rating} · {product.reviewCount} reviews</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#2C2416]">₹{product.price}</span>
                {product.originalPrice && <span className="text-sm text-[#7A6A56] line-through">₹{product.originalPrice}</span>}
                {discount > 0 && <span className="px-2 py-0.5 bg-[#C9A84C]/15 text-[#8B5E3C] text-xs font-semibold rounded-full">{discount}% OFF</span>}
              </div>

              <p className="text-xs text-[#5C3D1E] leading-relaxed">{product.description}</p>

              <div className="flex gap-1.5 flex-wrap">
                {product.benefits.map(b => (
                  <span key={b} className="flex items-center gap-1 px-2.5 py-0.5 bg-[#F5EDD8] text-[#5C3D1E] text-xs font-medium rounded-full">
                    <Check size={10} className="text-[#C9A84C]" />{b}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-[#2C2416]">Weight:</span>
                {variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => navigate(`/product/${v.slug}`)}
                    className={`px-3 py-1 border-2 text-xs font-semibold rounded-full transition-all ${
                      v.id === product.id
                        ? 'border-[#C9A84C] bg-[#F5EDD8] text-[#5C3D1E]'
                        : 'border-[#E8D5B0] text-[#7A6A56] hover:border-[#C9A84C]'
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
                    <Minus size={13} className="text-[#5C3D1E]" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-[#2C2416]">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-[#F5EDD8] transition-colors">
                    <Plus size={13} className="text-[#5C3D1E]" />
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={`flex-1 min-w-32 h-9 flex items-center justify-center gap-2 rounded-full font-semibold text-xs transition-all duration-200 ${added ? 'bg-green-600 text-white' : 'bg-[#5C3D1E] text-white hover:bg-[#C9A84C]'}`}
                >
                  {added ? <><Check size={14} /> Added to Cart</> : <><ShoppingCart size={14} /> Add to Cart</>}
                </motion.button>
                <button
                  onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                  className="w-9 h-9 rounded-full border border-[#E8D5B0] flex items-center justify-center hover:border-[#C9A84C] transition-colors"
                >
                  <Heart size={14} className={inWishlist ? 'fill-[#C9A84C] text-[#C9A84C]' : 'text-[#5C3D1E]'} />
                </button>
              </div>

              <button
                onClick={() => { addToCart(product, qty); navigate('/checkout'); }}
                className="w-full h-9 rounded-full border-2 border-[#C9A84C] text-[#5C3D1E] font-semibold text-xs hover:bg-[#F5EDD8] transition-colors"
              >
                Buy Now
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#F0E6D3]">
                {([{ Icon: Truck, title: 'Free Delivery', sub: '₹999+' }, { Icon: Shield, title: 'Secure Payment', sub: '100% Safe' }, { Icon: RefreshCw, title: '7-Day Returns', sub: 'Easy Returns' }]).map(({ Icon, title, sub }) => (
                  <div key={title} className="flex flex-col items-center text-center gap-0.5">
                    <Icon size={16} className="text-[#C9A84C]" />
                    <p className="text-xs font-medium text-[#2C2416]">{title}</p>
                    <p className="text-[10px] text-[#7A6A56]">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold text-[#2C2416] mb-6">You May Also Like</h2>
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
