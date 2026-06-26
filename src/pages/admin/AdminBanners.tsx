import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { C, Reveal, PageHeader, PrimaryBtn, IconBtn } from './adminUI';

const initialBanners = [
  { id: '1', title: 'Premium Cashews — Farm Fresh',   subtitle: 'Shop the finest W240 grade cashews',      image: '/p1.jpg',  active: true,  cta: 'Shop Now'  },
  { id: '2', title: 'Gift Boxes for Every Occasion',  subtitle: 'Luxury cashew gift boxes — from ₹999',    image: '/p2.jpg',  active: true,  cta: 'View Gifts'},
  { id: '3', title: 'Bulk Orders Welcome',            subtitle: 'Special pricing for 10kg+ orders',        image: '/p11.jpg', active: false, cta: 'Get Quote' },
];

/* ── Toggle switch ── */
const Toggle: React.FC<{ on: boolean; onToggle: () => void }> = ({ on, onToggle }) => (
  <motion.button
    onClick={onToggle}
    whileTap={{ scale: 0.92 }}
    className="relative w-11 h-6 rounded-full transition-colors shrink-0"
    style={{ background: on ? C.green : '#D1C4B4' }}
  >
    <motion.div
      animate={{ x: on ? 20 : 2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
    />
  </motion.button>
);

const AdminBanners: React.FC = () => {
  const [banners, setBanners] = useState(initialBanners);

  const toggle = (id: string) => setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
  const remove = (id: string) => setBanners(prev => prev.filter(b => b.id !== id));

  return (
    <div>
      <PageHeader
        title="Banner Management"
        sub={`${banners.length} banners · ${banners.filter(b => b.active).length} active`}
        action={
          <PrimaryBtn>
            <Plus size={15} /> Add Banner
          </PrimaryBtn>
        }
      />

      <div className="space-y-3">
        <AnimatePresence>
          {banners.map((banner, i) => (
            <Reveal key={banner.id} delay={i * 0.08}>
              <motion.div
                layout
                exit={{ opacity: 0, x: 40, scale: 0.97 }}
                whileHover={{ boxShadow: '0 10px 32px rgba(0,0,0,0.07)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="bg-white rounded-2xl border flex gap-0 overflow-hidden"
                style={{ borderColor: banner.active ? C.gold + '30' : C.border }}
              >
                {/* Active indicator strip */}
                <div
                  className="w-1 shrink-0 transition-colors duration-300"
                  style={{ background: banner.active ? C.green : '#DDD5C8' }}
                />

                {/* Image */}
                <div className="w-28 shrink-0 overflow-hidden relative" style={{ minHeight: 80 }}>
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={banner.image} alt={banner.title}
                      className="w-full h-full object-cover"
                      style={{ background: C.goldLight, minHeight: 80 }}
                    />
                  </motion.div>
                  {!banner.active && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Inactive</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 px-4 py-4 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: C.text }}>{banner.title}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: C.textSub }}>{banner.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: C.goldLight, color: C.primary }}
                    >
                      CTA: {banner.cta}
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={banner.active ? { repeat: Infinity, duration: 2.5 } : {}}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={banner.active
                        ? { background: C.green + '18', color: C.green }
                        : { background: '#F0EBE4', color: C.textMuted }
                      }
                    >
                      {banner.active ? '● Active' : '○ Inactive'}
                    </motion.span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-center justify-center gap-2 px-4 border-l" style={{ borderColor: C.border }}>
                  <Toggle on={banner.active} onToggle={() => toggle(banner.id)} />
                  <div className="flex gap-1">
                    <IconBtn><Edit2 size={13} /></IconBtn>
                    <IconBtn onClick={() => remove(banner.id)} danger><Trash2 size={13} /></IconBtn>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </AnimatePresence>

        {banners.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border py-16 flex flex-col items-center"
            style={{ borderColor: C.border }}
          >
            <Image size={36} className="opacity-20 mb-3" style={{ color: C.primary }} />
            <p className="text-sm font-medium" style={{ color: C.textMuted }}>No banners yet</p>
            <p className="text-xs mt-1" style={{ color: C.textMuted }}>Click "Add Banner" to create your first one</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminBanners;
