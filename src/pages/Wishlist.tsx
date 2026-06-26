import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import PageTransition from '../components/PageTransition';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  return (
    <PageTransition>
      <div className="pt-16 min-h-screen bg-[#FDFAF4]">
        <div className="bg-white border-b border-[#F0E6D3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2416]">My Wishlist</h1>
            <p className="text-sm text-[#7A6A56] mt-1">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={48} className="text-[#E8D5B0] mx-auto mb-4" />
              <p className="text-lg font-semibold text-[#2C2416] mb-2">Your wishlist is empty</p>
              <p className="text-sm text-[#7A6A56] mb-6">Save your favorite products here</p>
              <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C3D1E] text-white rounded-full font-medium text-sm hover:bg-[#C9A84C] transition-colors">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {wishlist.map((item, i) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-2xl border border-[#F0E6D3] overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[4/3] bg-[#F5EDD8]">
                      <Link to={`/product/${item.product.slug}`}>
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-400" />
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(item.product.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                      >
                        <Heart size={14} className="fill-[#C9A84C] text-[#C9A84C]" />
                      </button>
                    </div>
                    <div className="p-4">
                      <Link to={`/product/${item.product.slug}`}>
                        <p className="text-sm font-semibold text-[#2C2416] hover:text-[#C9A84C] transition-colors line-clamp-2 mb-1">{item.product.name}</p>
                      </Link>
                      <p className="text-xs text-[#7A6A56] mb-3">{item.product.weight}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#2C2416]">₹{item.product.price}</span>
                        <button
                          onClick={() => { addToCart(item.product); removeFromWishlist(item.product.id); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5C3D1E] text-white text-xs font-medium rounded-full hover:bg-[#C9A84C] transition-colors"
                        >
                          <ShoppingCart size={12} /> Move to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Wishlist;
