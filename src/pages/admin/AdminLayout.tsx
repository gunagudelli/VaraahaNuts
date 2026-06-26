import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag,
  Users, Image, LogOut, Menu, X, ChevronRight,
  Bell, Settings, Store,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/WhatsApp Image 2026-06-16 at 1.36.56 PM.jpeg';
import { C } from './adminUI';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',  to: '/admin',           end: true  },
  { icon: Package,         label: 'Products',   to: '/admin/products',  end: false },
  { icon: ShoppingBag,     label: 'Orders',     to: '/admin/orders',    end: false },
  { icon: Users,           label: 'Customers',  to: '/admin/customers', end: false },
  { icon: Image,           label: 'Banners',    to: '/admin/banners',   end: false },
];

const SidebarContent: React.FC<{ close?: () => void }> = ({ close }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 320 }}
              className="w-9 h-9 rounded-xl overflow-hidden ring-2"
              style={{ ringColor: C.gold + '40' }}
            >
              <img src={logo} alt="Varaaha" className="w-full h-full object-cover" />
            </motion.div>
            <div>
              <p className="font-bold text-sm text-white leading-none tracking-wide">Varaaha</p>
              <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>Admin Panel</p>
            </div>
          </div>
          {close && (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={close}
              className="p-1 rounded-lg lg:hidden" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <X size={16} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Main Menu
        </p>
        {navItems.map(({ icon: Icon, label, to, end }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 + i * 0.055, duration: 0.38, ease: 'easeOut' }}
          >
            <NavLink
              to={to} end={end}
              onClick={close}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/90'
                }`
              }
              style={({ isActive }) => isActive
                ? { background: 'linear-gradient(135deg, rgba(201,168,76,0.22), rgba(201,168,76,0.10))', border: '1px solid rgba(201,168,76,0.25)' }
                : { border: '1px solid transparent' }
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="shrink-0"
                    style={{ color: isActive ? C.gold : 'inherit' }}
                  >
                    <Icon size={15} />
                  </motion.div>
                  <span className="flex-1">{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navDot"
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: C.gold }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <motion.button
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.07)', x: 3 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/90 transition-colors"
          style={{ border: '1px solid transparent' }}
        >
          <Settings size={15} /> Settings
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.07)', x: 3 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/90 transition-colors"
          style={{ border: '1px solid transparent' }}
        >
          <LogOut size={15} /> Exit Admin
        </motion.button>
      </div>
    </div>
  );
};

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ background: C.bg }}>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex w-56 shrink-0 flex-col fixed inset-y-0 left-0 z-30"
        style={{ background: 'linear-gradient(180deg, #1a110a 0%, #0e0905 100%)' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(10,6,2,0.6)', backdropFilter: 'blur(3px)' }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -224 }} animate={{ x: 0 }} exit={{ x: -224 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-56 lg:hidden"
              style={{ background: 'linear-gradient(180deg, #1a110a 0%, #0e0905 100%)' }}
            >
              <SidebarContent close={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">

        {/* Topbar */}
        <motion.header
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          className="sticky top-0 z-20 px-4 sm:px-6 h-[56px] flex items-center gap-3 border-b"
          style={{
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(16px)',
            borderColor: C.border,
            boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
          }}
        >
          {/* Hamburger */}
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-xl transition-colors"
            style={{ color: C.primary }}
          >
            <Menu size={18} />
          </motion.button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs" style={{ color: C.textSub }}>
            <Link to="/" className="flex items-center gap-1 hover:text-[#C9A84C] transition-colors font-medium">
              <Store size={12} /> Store
            </Link>
            <ChevronRight size={11} style={{ color: C.textMuted }} />
            <span className="font-semibold" style={{ color: C.text }}>Admin</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
              className="relative p-2 rounded-xl transition-colors"
              style={{ color: C.textSub }}
            >
              <Bell size={16} />
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: C.gold }}
              />
            </motion.button>

            {/* Divider */}
            <div className="w-px h-5 mx-1" style={{ background: C.border }} />

            {/* Avatar */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2.5 cursor-default">
              <div
                className="w-8 h-8 rounded-xl overflow-hidden ring-2"
                style={{ ringColor: C.gold + '40', outline: `2px solid ${C.gold}35`, outlineOffset: 1 }}
              >
                <img src={logo} alt="Admin" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold leading-none" style={{ color: C.text }}>Admin</p>
                <p className="text-[10px] mt-0.5" style={{ color: C.textMuted }}>Super User</p>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
