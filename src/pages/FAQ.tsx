import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { faqs } from '../data/products';
import PageTransition from '../components/PageTransition';

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <PageTransition>
      <div className="pt-16 bg-[#FDFAF4] min-h-screen">
        <div className="bg-white border-b border-[#F0E6D3]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-2">Help Center</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2416]">Frequently Asked Questions</h1>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white border border-[#F0E6D3] rounded-xl overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FAF6EE] transition-colors">
                  <span className="text-sm font-medium text-[#2C2416] pr-4">{faq.q}</span>
                  {open === i ? <ChevronUp size={16} className="text-[#C9A84C] shrink-0" /> : <ChevronDown size={16} className="text-[#8B5E3C] shrink-0" />}
                </button>
                {open === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-[#7A6A56] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FAQ;
