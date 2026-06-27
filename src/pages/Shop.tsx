import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import PageTransition from '../components/PageTransition';

const GREEN = '#0B5D3B';
const GOLD  = '#D4A017';

const SORT_OPTIONS = [
  { value: 'popular',    label: 'Most Popular' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Top Rated' },
];

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search,   setSearch]   = useState(searchParams.get('search')   || '');
  const [sort,     setSort]     = useState(searchParams.get('sort')     || 'popular');
  const [page,     setPage]     = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const perPage = 8;

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  const filtered = useMemo(() => {
    // Show only first variant per category (1kg)
    const seen = new Set<string>();
    let list = products.filter(p => {
      if (seen.has(p.category)) return false;
      seen.add(p.category);
      return true;
    });
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [search, sort]);

  const paginated = filtered.slice(0, page * perPage);
  const hasMore   = paginated.length < filtered.length;

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value); else params.delete(key);
    setSearchParams(params);
    setPage(1);
  };

  const clearAll = () => {
    setSearch('');
    setSearchParams(new URLSearchParams());
    setPage(1);
  };

  const activeCount = [search].filter(Boolean).length;

  return (
    <PageTransition>
      <div className="pt-[68px] min-h-screen" style={{ background: '#F8F4EE' }}>

        {/* ── Page Hero ── */}
        <div ref={heroRef} className="relative overflow-hidden py-10 sm:py-14"
          style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #0d7a4e 60%, #1a9160 100%)` }}>
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: '#fff' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: GOLD }}
            >
              Premium Collection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-3"
            >
              Shop Cashews
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="text-sm text-white/70 max-w-md mx-auto"
            >
              Farm-fresh, hygienically processed cashews — from premium whole grades to thoughtful gift packs.
            </motion.p>

            {/* Inline search */}
            <motion.form
              initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              onSubmit={e => { e.preventDefault(); updateFilter('search', search); }}
              className="mt-6 max-w-lg mx-auto flex gap-2"
            >
              <div className="relative flex-1">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
                <input
                  value={search}
                  onChange={e => { setSearch(e.target.value); updateFilter('search', e.target.value); }}
                  placeholder="Search cashews..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 text-[#1a1a1a] bg-white/95"
                  style={{ '--tw-ring-color': GOLD } as React.CSSProperties}
                />
                {search && (
                  <button type="button" onClick={() => { setSearch(''); updateFilter('search', ''); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#aaa] hover:text-[#555]">
                    <X size={12} />
                  </button>
                )}
              </div>
            </motion.form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">

          {/* ── Toolbar ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="flex items-center justify-between gap-3 mb-5 flex-wrap"
          >
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-[#555]">
                <span className="font-bold text-[#1a1a1a]">{filtered.length}</span> products
              </p>
              {activeCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={clearAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors"
                  style={{ color: '#ef4444', borderColor: '#fecaca', background: '#fff5f5' }}
                >
                  <X size={11} /> Clear filters ({activeCount})
                </motion.button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setSortOpen(s => !s)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl border text-sm font-medium text-[#444] shadow-sm"
                style={{ borderColor: '#EDE5D8' }}
              >
                <SlidersHorizontal size={14} style={{ color: GREEN }} />
                {SORT_OPTIONS.find(o => o.value === sort)?.label}
                <motion.div animate={{ rotate: sortOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                  <ChevronDown size={14} className="text-[#aaa]" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border shadow-xl z-20 overflow-hidden py-1.5"
                    style={{ borderColor: '#EDE5D8', boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                  >
                    {SORT_OPTIONS.map(o => (
                      <button
                        key={o.value}
                        onClick={() => { setSort(o.value); updateFilter('sort', o.value); setSortOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2"
                        style={{
                          color: sort === o.value ? GREEN : '#444',
                          background: sort === o.value ? `${GREEN}0D` : 'transparent',
                          fontWeight: sort === o.value ? 600 : 400,
                        }}
                      >
                        {sort === o.value && <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GREEN }} />}
                        {o.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Active filter tags */}
          <AnimatePresence>
            {search && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}
                className="flex flex-wrap gap-2 mb-5"
              >
                <motion.span
                  initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs rounded-full font-semibold"
                  style={{ background: GREEN }}
                >
                  "{search}"
                  <button onClick={() => { setSearch(''); updateFilter('search', ''); }}>
                    <X size={11} />
                  </button>
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Product Grid ── */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="text-5xl mb-4"
                >🥜</motion.div>
                <p className="text-lg font-bold text-[#1a1a1a] mb-2">No products found</p>
                <p className="text-sm text-[#777] mb-5">Try adjusting your search or removing filters</p>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={clearAll}
                  className="px-6 py-2.5 text-white text-sm font-semibold rounded-2xl"
                  style={{ background: GREEN }}
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="grid">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {paginated.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i % perPage} />
                  ))}
                </div>

                {/* Load more */}
                {hasMore && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center mt-10 gap-3"
                  >
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, Math.ceil(filtered.length / perPage)) }, (_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full transition-colors"
                          style={{ background: i < page ? GREEN : '#D4C4A8' }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[#888]">
                      Showing {paginated.length} of {filtered.length} products
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04, boxShadow: `0 8px 24px ${GREEN}30` }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPage(p => p + 1)}
                      className="px-8 py-3 text-white font-semibold rounded-2xl text-sm"
                      style={{ background: `linear-gradient(135deg, ${GREEN}, #0d7a4e)` }}
                    >
                      Load {Math.min(perPage, filtered.length - paginated.length)} More Products
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </PageTransition>
  );
};

export default Shop;
