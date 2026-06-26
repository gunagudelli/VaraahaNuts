import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Categories: React.FC = () => (
  <PageTransition>
    <div className="pt-16 bg-[#FDFAF4] min-h-screen">
      <div className="bg-white border-b border-[#F0E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-2">Browse</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2416]">All Categories</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link to={`/shop?category=${cat.slug}`} className="group block rounded-2xl overflow-hidden relative aspect-video bg-[#F5EDD8]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2416]/75 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <p className="text-white font-semibold text-base">{cat.name}</p>
                    <p className="text-white/60 text-xs mt-0.5">{cat.productCount} products</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#C9A84C] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </PageTransition>
);

export default Categories;
