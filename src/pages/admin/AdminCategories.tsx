import React from 'react';
import { categories } from '../../data/products';
import { Plus, Edit2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { C, Reveal, PageHeader, PrimaryBtn, IconBtn } from './adminUI';

const AdminCategories: React.FC = () => (
  <div>
    <PageHeader
      title="Categories"
      sub={`${categories.length} product categories`}
      action={
        <PrimaryBtn>
          <Plus size={15} /> Add Category
        </PrimaryBtn>
      }
    />

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat, i) => (
        <Reveal key={cat.id} delay={i * 0.07} direction="scale">
          <motion.div
            whileHover={{ y: -5, boxShadow: '0 20px 48px rgba(0,0,0,0.10)' }}
            transition={{ type: 'spring', stiffness: 240, damping: 20 }}
            className="bg-white rounded-2xl border overflow-hidden group"
            style={{ borderColor: C.border }}
          >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <motion.img
                src={cat.image} alt={cat.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(28,17,8,0.55) 100%)' }}
              />
              {/* overlay badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute top-3 right-3"
              >
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
                  style={{ background: 'rgba(255,255,255,0.9)', color: C.primary }}
                >
                  {cat.productCount} products
                </span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: C.goldLight }}
                >
                  <Tag size={13} style={{ color: C.primary }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: C.text }}>{cat.name}</p>
                  <p className="text-[11px]" style={{ color: C.textSub }}>{cat.productCount} products</p>
                </div>
              </div>
              <IconBtn><Edit2 size={13} /></IconBtn>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  </div>
);

export default AdminCategories;
