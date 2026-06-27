import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import PageTransition from '../components/PageTransition';

const GREEN = '#0B5D3B';
const GOLD  = '#D4A017';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const shipping = cartTotal >= 999 ? 0 : 79;
  const total = cartTotal + shipping;

  return (
    <PageTransition>
      <div className="pt-[68px] min-h-screen bg-[#FDFAF4]">
        <div className="relative overflow-hidden py-8 sm:py-10"
          style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #0d7a4e 60%, #1a9160 100%)` }}>
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-10 blur-3xl" style={{ background: '#fff' }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] mb-1.5" style={{ color: GOLD }}>Your Cart</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Shopping Cart</h1>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {cart.length} item{cart.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={48} className="text-[#E8D5B0] mx-auto mb-4" />
              <p className="text-lg font-semibold text-[#2C2416] mb-2">Your cart is empty</p>
              <p className="text-sm text-[#7A6A56] mb-6">Discover our premium cashews and dry fruits</p>
              <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C3D1E] text-white rounded-full font-medium text-sm hover:bg-[#C9A84C] transition-colors">
                Continue Shopping <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cart.map(item => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="bg-white rounded-2xl border border-[#eee] p-4 flex gap-4"
                    >
                      <Link to={`/product/${item.product.slug}`} className="shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover bg-[#F5EDD8]" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.product.slug}`}>
                          <p className="font-semibold text-sm text-[#2C2416] hover:text-[#C9A84C] transition-colors line-clamp-1">{item.product.name}</p>
                        </Link>
                        <p className="text-xs text-[#7A6A56] mt-0.5">{item.product.weight}</p>
                        <p className="text-sm font-bold text-[#2C2416] mt-1">₹{item.product.price}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#eee] rounded-full overflow-hidden">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-[#F5EDD8] transition-colors">
                              <Minus size={12} className="text-[#5C3D1E]" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-[#2C2416]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-[#F5EDD8] transition-colors">
                              <Plus size={12} className="text-[#5C3D1E]" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-[#2C2416]">₹{item.product.price * item.quantity}</span>
                            <button onClick={() => removeFromCart(item.product.id)} className="text-[#7A6A56] hover:text-red-500 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-[#8B5E3C] hover:text-[#C9A84C] transition-colors mt-2">
                  ← Continue Shopping
                </Link>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl border border-[#eee] p-6 h-fit sticky top-20">
                <h2 className="font-bold text-[#2C2416] mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm mb-4 pb-4 border-b border-[#eee]">
                  <div className="flex justify-between text-[#5C3D1E]">
                    <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-[#5C3D1E]">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  {shipping > 0 && <p className="text-xs text-[#C4956A]">Add ₹{999 - cartTotal} more for free shipping</p>}
                </div>
                <div className="flex justify-between font-bold text-[#2C2416] text-base mb-5">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <Link to="/checkout" className="block w-full text-center py-3 bg-[#1C1008] text-white font-semibold rounded-lg hover:bg-[#C9872A] transition-colors text-sm">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;
