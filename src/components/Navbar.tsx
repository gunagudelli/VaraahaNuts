import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/ChatGPT Image Jun 19, 2026, 04_46_58 PM.png';
import { ShoppingCart, Heart, Search, Menu, X, ArrowRight, Phone } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useStore } from '../context/StoreContext';

const GREEN = '#0B5D3B';
const GOLD  = '#D4A017';

const navLinks = [
  { label: 'Home',       to: '/' },
  { label: 'Shop',       to: '/shop' },
  { label: 'About Us',   to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

const Navbar: React.FC = () => {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [hidden,       setHidden]       = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');
  const { cartCount, wishlist } = useStore();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (cur) => {
    setScrolled(cur > 10);
    setHidden(false);
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
        transition={{ duration: 0.36, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,1)',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'rgba(232,226,214,0.8)' : '#e8e2d6',
          boxShadow: scrolled ? '0 4px 24px rgba(11,93,59,0.08)' : 'none',
          transition: 'background 0.3s, box-shadow 0.3s, border-color 0.3s',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <motion.img
              src={logo} alt="Varaaha Cashews"
              className="h-14 w-auto object-contain"
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink key={link.label} to={link.to} end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-[#0B5D3B]' : 'text-[#444] hover:text-[#0B5D3B]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navUnderline"
                        className="absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full"
                        style={{ background: GOLD }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-0.5">
            <motion.a
              href="tel:+919704671552"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-semibold mr-1"
              style={{ background: GREEN, border: `2px solid ${GOLD}`, boxShadow: `0 4px 14px ${GREEN}40` }}
            >
              <Phone size={13} /> +91 97046 71552
            </motion.a>
            <NavIconBtn onClick={() => setSearchOpen(s => !s)} aria-label="Search">
              <Search size={18} />
            </NavIconBtn>

            <Link to="/wishlist" className="relative p-2.5 rounded-xl text-[#444] hover:text-[#0B5D3B] transition-colors">
              <Heart size={18} />
              <AnimatePresence>
                {wishlist.length > 0 && (
                  <motion.span
                    key="wbadge"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                    style={{ background: GOLD }}
                  >{wishlist.length}</motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link to="/cart" className="relative p-2.5 rounded-xl text-[#444] hover:text-[#0B5D3B] transition-colors mr-1">
              <ShoppingCart size={18} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cbadge"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                    style={{ background: GREEN }}
                  >{cartCount}</motion.span>
                )}
              </AnimatePresence>
            </Link>

            <motion.button
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
              className="lg:hidden p-2.5 rounded-xl text-[#444] hover:text-[#0B5D3B] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </nav>

        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="border-t overflow-hidden"
              style={{ borderColor: '#e8e2d6', background: 'rgba(255,255,255,0.98)' }}
            >
              <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-3">
                <div className="flex-1 relative">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]" />
                  <input
                    autoFocus value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search premium cashews, gift packs, bulk orders..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 bg-[#F8F5EF] text-[#1a1a1a]"
                    style={{ borderColor: '#e8e2d6', outlineColor: GREEN, '--tw-ring-color': GREEN } as React.CSSProperties}
                  />
                </div>
                <motion.button
                  type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-2xl"
                  style={{ background: GREEN }}
                >
                  Search <ArrowRight size={14} />
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-50 w-72 flex flex-col"
              style={{ background: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,0.12)' }}
            >
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: '#e8e2d6' }}>
                <img src={logo} alt="Varaaha Cashews" className="h-10 w-auto object-contain" />
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl text-[#555] hover:bg-[#F8F5EF]"
                >
                  <X size={18} />
                </motion.button>
              </div>

              <nav className="flex flex-col p-4 gap-1 flex-1 overflow-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.06, duration: 0.3 }}
                  >
                    <NavLink
                      to={link.to} end={link.to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                          isActive ? 'text-white shadow-md' : 'text-[#333] hover:bg-[#F8F5EF]'
                        }`
                      }
                      style={({ isActive }) => isActive ? { background: `linear-gradient(135deg, ${GREEN}, #0d7a4e)` } : {}}
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          {isActive && <ArrowRight size={14} />}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}

                <div className="mt-4 pt-4 border-t space-y-1" style={{ borderColor: '#e8e2d6' }}>
                  <Link to="/wishlist" onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm text-[#333] hover:bg-[#F8F5EF]">
                    <span className="flex items-center gap-2"><Heart size={15} /> Wishlist</span>
                    {wishlist.length > 0 && (
                      <span className="px-2 py-0.5 text-white text-[10px] font-bold rounded-full" style={{ background: GOLD }}>
                        {wishlist.length}
                      </span>
                    )}
                  </Link>
                  <Link to="/cart" onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm text-[#333] hover:bg-[#F8F5EF]">
                    <span className="flex items-center gap-2"><ShoppingCart size={15} /> Cart</span>
                    {cartCount > 0 && (
                      <span className="px-2 py-0.5 text-white text-[10px] font-bold rounded-full" style={{ background: GREEN }}>
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
              </nav>

              <div className="p-4 border-t space-y-2" style={{ borderColor: '#e8e2d6' }}>
                <a href="tel:+919704671552">
                  <motion.div
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white text-sm font-semibold mb-2"
                    style={{ background: GOLD }}
                  >
                    <Phone size={14} /> +91 97046 71552
                  </motion.div>
                </a>
                <Link to="/shop" onClick={() => setMobileOpen(false)}>
                  <motion.div
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white text-sm font-semibold"
                    style={{ background: `linear-gradient(135deg, ${GREEN}, #0d7a4e)` }}
                  >
                    Shop Now <ArrowRight size={14} />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const NavIconBtn: React.FC<{ onClick: () => void; children: React.ReactNode; 'aria-label'?: string }> = ({ onClick, children, ...rest }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    className="p-2.5 rounded-xl text-[#444] hover:text-[#0B5D3B] transition-colors"
    {...rest}
  >
    {children}
  </motion.button>
);

export default Navbar;
