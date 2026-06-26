import React from 'react';
import { motion } from 'framer-motion';

type Variant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'zoomIn' | 'slideUp';

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
}

const variants = {
  fadeUp:    { hidden: { opacity: 0, y: 50 },   visible: { opacity: 1, y: 0 } },
  fadeDown:  { hidden: { opacity: 0, y: -40 },  visible: { opacity: 1, y: 0 } },
  fadeLeft:  { hidden: { opacity: 0, x: -60 },  visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 60 },   visible: { opacity: 1, x: 0 } },
  zoomIn:    { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
  slideUp:   { hidden: { opacity: 0, y: 80 },   visible: { opacity: 1, y: 0 } },
};

const ScrollReveal: React.FC<Props> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className = '',
  amount = 0.2,
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    variants={variants[variant]}
    transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default ScrollReveal;
