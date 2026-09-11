import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const NotFound: React.FC = () => (
  <PageTransition>
    <div className="pt-16 min-h-screen bg-[#FDFAF4] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="text-8xl mb-6">🥜</div>
        <h1 className="text-6xl sm:text-8xl font-bold text-[#D4A017] mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-3">Page Not Found</h2>
        <p className="text-[#777] text-sm max-w-sm mx-auto mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. Let's get you back to the good stuff.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="px-6 py-3 bg-[#0B5D3B] text-white font-medium rounded-full hover:bg-[#0d7a4e] transition-colors text-sm">
            Go Home
          </Link>
          <Link to="/shop" className="px-6 py-3 border border-[#0B5D3B] text-[#0B5D3B] font-medium rounded-full hover:bg-[#F5EDD8] transition-colors text-sm">
            Browse Shop
          </Link>
        </div>
      </motion.div>
    </div>
  </PageTransition>
);

export default NotFound;
