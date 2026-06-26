import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GREEN = '#0B5D3B';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<Props> = ({ children, className = '' }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    setProgress(0);
    const t1 = setTimeout(() => setProgress(70), 80);
    const t2 = setTimeout(() => setProgress(100), 380);
    const t3 = setTimeout(() => setVisible(false), 520);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <>
      {/* Page progress bar */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed top-0 left-0 z-[100] h-0.5 pointer-events-none"
            style={{ background: `linear-gradient(90deg, ${GREEN}, #D4A017)` }}
            initial={{ width: '0%', opacity: 1 }}
            animate={{ width: `${progress}%` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
