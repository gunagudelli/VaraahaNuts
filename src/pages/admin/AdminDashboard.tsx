import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Tags, Image as ImageIcon, CheckCircle2, XCircle, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product, Category, Banner } from '../../types';
import { adminListProducts, adminListCategories, adminGetBanner } from '../../lib/adminApi';
import { C, Reveal } from './adminUI';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminListProducts(), adminListCategories(), adminGetBanner()])
      .then(([p, c, b]) => { setProducts(p); setCategories(c); setBanner(b); })
      .finally(() => setLoading(false));
  }, []);

  const activeCount = products.filter((p) => p.isActive !== false).length;
  const inactiveCount = products.length - activeCount;
  const outOfStockCount = products.filter((p) => !p.inStock).length;

  const stats = [
    { icon: Package, label: 'Total Products', value: products.length, to: '/admin/products', color: C.gold },
    { icon: CheckCircle2, label: 'Active on Storefront', value: activeCount, to: '/admin/products', color: '#10b981' },
    { icon: XCircle, label: 'Hidden (Inactive)', value: inactiveCount, to: '/admin/products', color: C.red },
    { icon: Tags, label: 'Categories', value: categories.length, to: '/admin/categories', color: C.indigo },
  ];

  return (
    <div className="space-y-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48, ease: 'easeOut' }}
      >
        <h1 className="text-xl font-bold tracking-tight" style={{ color: C.text }}>Dashboard</h1>
        <p className="text-sm mt-0.5" style={{ color: C.textSub }}>
          A quick snapshot of what's live on your storefront right now.
        </p>
      </motion.div>

      {loading ? (
        <p className="text-sm" style={{ color: C.textSub }}>Loading…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map(({ icon: Icon, label, value, to, color }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <Link to={to}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: `0 16px 40px ${color}1A` }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="bg-white rounded-2xl border p-4 cursor-pointer"
                    style={{ borderColor: color + '28' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: color + '18' }}
                    >
                      <Icon size={17} style={{ color }} />
                    </div>
                    <p className="text-[26px] font-bold leading-tight tabular-nums" style={{ color: C.text }}>{value}</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: C.textSub }}>{label}</p>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {/* Banner status */}
            <Reveal delay={0.1}>
              <div className="bg-white rounded-2xl border p-5" style={{ borderColor: C.border }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-bold" style={{ color: C.text }}>Festival Banner</p>
                    <p className="text-xs mt-0.5" style={{ color: C.textSub }}>
                      {banner ? 'Currently showing on your homepage' : 'Nothing set right now'}
                    </p>
                  </div>
                  <ImageIcon size={18} style={{ color: C.gold }} />
                </div>
                {banner ? (
                  <img src={banner.image} alt="Current banner" className="w-full rounded-xl object-cover max-h-32" />
                ) : (
                  <div
                    className="rounded-xl border border-dashed py-8 flex flex-col items-center justify-center"
                    style={{ borderColor: C.border }}
                  >
                    <p className="text-xs" style={{ color: C.textMuted }}>No banner active</p>
                  </div>
                )}
                <Link to="/admin/banners">
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-1 text-xs font-semibold mt-4"
                    style={{ color: C.primary }}
                  >
                    Manage banner <ArrowRight size={12} />
                  </motion.div>
                </Link>
              </div>
            </Reveal>

            {/* Attention needed */}
            <Reveal delay={0.16}>
              <div className="bg-white rounded-2xl border p-5" style={{ borderColor: C.border }}>
                <p className="text-sm font-bold mb-4" style={{ color: C.text }}>Worth a Look</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: C.textSub }}>Out of stock products</span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: outOfStockCount > 0 ? '#FEE2E2' : C.goldLight, color: outOfStockCount > 0 ? C.red : C.textMuted }}
                    >
                      {outOfStockCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: C.textSub }}>Hidden from storefront</span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: inactiveCount > 0 ? '#FEF3C7' : C.goldLight, color: inactiveCount > 0 ? '#b45309' : C.textMuted }}
                    >
                      {inactiveCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs flex items-center gap-1" style={{ color: C.textSub }}>
                      <Star size={11} className="text-amber-400" /> Avg. rating across catalogue
                    </span>
                    <span className="text-xs font-bold" style={{ color: C.text }}>
                      {products.length > 0 ? (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1) : '—'}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
