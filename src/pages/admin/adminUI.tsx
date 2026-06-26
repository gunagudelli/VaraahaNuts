// Shared admin UI utilities — design tokens, animation variants, reusable components
import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

/* ── Design tokens ── */
export const C = {
  bg:       '#F7F4EF',
  surface:  '#FFFFFF',
  border:   '#EDE5D8',
  borderHover: '#D4B896',
  text:     '#1E1510',
  textSub:  '#7A6A56',
  textMuted:'#B0A090',
  primary:  '#5C3D1E',
  primaryHover: '#3D2610',
  gold:     '#C9A84C',
  goldLight:'#F5EDD8',
  green:    '#10b981',
  indigo:   '#6366f1',
  blue:     '#3b82f6',
  amber:    '#f59e0b',
  red:      '#ef4444',
  purple:   '#8b5cf6',
  orange:   '#f97316',
} as const;

/* ── Animation variants ── */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
export const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
export const fadeRight = {
  hidden: { opacity: 0, x: 24 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
export const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
};
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  show:   { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } },
  exit:   { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.2 } },
};

/* ── Scroll-reveal wrapper ── */
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
}> = ({ children, delay = 0, direction = 'up', className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-32px' });
  const base = direction === 'up' ? fadeUp : direction === 'left' ? fadeLeft : direction === 'right' ? fadeRight : scaleIn;
  const variant = {
    hidden: base.hidden,
    show: { ...base.show, transition: { ...(base.show as any).transition, delay } },
  };
  return (
    <motion.div ref={ref} variants={variant} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
};

/* ── Animated counter ── */
export const AnimCounter: React.FC<{ target: number; prefix?: string; suffix?: string; className?: string }> = ({
  target, prefix = '', suffix = '', className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1500, bounce: 0 });
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => { if (inView) mv.set(target); }, [inView, target, mv]);
  React.useEffect(() => spring.on('change', v => setDisplay(Math.floor(v))), [spring]);
  return <span ref={ref} className={className}>{prefix}{display.toLocaleString('en-IN')}{suffix}</span>;
};

/* ── Progress bar (scroll-triggered) ── */
export const ProgressBar: React.FC<{ pct: number; color: string; delay?: number; height?: string }> = ({
  pct, color, delay = 0, height = 'h-1.5',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className={`${height} bg-[#EDE5D8] rounded-full overflow-hidden`}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
};

/* ── Page header ── */
export const PageHeader: React.FC<{
  title: string;
  sub: string;
  action?: React.ReactNode;
}> = ({ title, sub, action }) => (
  <motion.div
    initial={{ opacity: 0, y: -14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="flex items-center justify-between mb-7"
  >
    <div>
      <h1 className="text-xl font-bold text-[#1E1510] tracking-tight">{title}</h1>
      <p className="text-sm text-[#7A6A56] mt-0.5">{sub}</p>
    </div>
    {action}
  </motion.div>
);

/* ── Primary action button ── */
export const PrimaryBtn: React.FC<{ onClick?: () => void; children: React.ReactNode; className?: string } & HTMLMotionProps<'button'>> = ({
  onClick, children, className = '', ...rest
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.04, boxShadow: `0 8px 24px ${C.primary}30` }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${className}`}
    style={{ background: `linear-gradient(135deg, ${C.primary}, #3D2610)` }}
    {...rest}
  >
    {children}
  </motion.button>
);

/* ── Ghost button ── */
export const GhostBtn: React.FC<{ onClick?: () => void; children: React.ReactNode; className?: string }> = ({
  onClick, children, className = '',
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03, backgroundColor: C.goldLight }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${className}`}
    style={{ borderColor: C.border, color: C.primary, background: C.surface }}
  >
    {children}
  </motion.button>
);

/* ── Card ── */
export const Card: React.FC<{ children: React.ReactNode; className?: string; hover?: boolean }> = ({
  children, className = '', hover = false,
}) => (
  <motion.div
    whileHover={hover ? { y: -3, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' } : undefined}
    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    className={`bg-white rounded-2xl border overflow-hidden ${className}`}
    style={{ borderColor: C.border }}
  >
    {children}
  </motion.div>
);

/* ── Search input ── */
export const SearchInput: React.FC<{ value: string; onChange: (v: string) => void; placeholder?: string; icon?: React.ReactNode }> = ({
  value, onChange, placeholder = 'Search…', icon,
}) => (
  <motion.div
    whileFocusWithin={{ boxShadow: `0 0 0 3px ${C.gold}30` }}
    className="relative rounded-xl overflow-hidden"
  >
    {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6A56]">{icon}</span>}
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all bg-white"
      style={{ borderColor: C.border, color: C.text }}
      onFocus={e => (e.target.style.borderColor = C.gold)}
      onBlur={e => (e.target.style.borderColor = C.border)}
    />
  </motion.div>
);

/* ── Status badge ── */
export const StatusBadge: React.FC<{ label: string; cls: string; icon?: React.ElementType }> = ({ label, cls, icon: Icon }) => (
  <motion.span
    whileHover={{ scale: 1.08 }}
    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${cls}`}
  >
    {Icon && <Icon size={9} />} {label}
  </motion.span>
);

/* ── Table wrapper ── */
export const TableWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs">{children}</table>
  </div>
);

/* ── Table header ── */
export const THead: React.FC<{ cols: string[] }> = ({ cols }) => (
  <thead style={{ background: C.goldLight }}>
    <tr>
      {cols.map(h => (
        <th key={h} className="px-5 py-3.5 text-left font-semibold uppercase tracking-wider text-[10px]" style={{ color: C.primary }}>
          {h}
        </th>
      ))}
    </tr>
  </thead>
);

/* ── Animated table row ── */
export const TRow: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.tr
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.35, delay, ease: 'easeOut' }}
    whileHover={{ backgroundColor: '#FAF6EE' }}
    className="border-b transition-colors cursor-default"
    style={{ borderColor: '#F0E6D3' }}
  >
    {children}
  </motion.tr>
);

/* ── Icon action button ── */
export const IconBtn: React.FC<{ onClick?: () => void; children: React.ReactNode; danger?: boolean }> = ({
  onClick, children, danger = false,
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.15, backgroundColor: danger ? '#FEE2E2' : C.goldLight }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 400 }}
    className="p-1.5 rounded-lg transition-colors"
    style={{ color: danger ? C.red : C.primary }}
  >
    {children}
  </motion.button>
);

/* ── Form field ── */
export const FormField: React.FC<{
  label: string;
  type?: string;
  value: string | number;
  onChange: (v: string) => void;
  rows?: number;
}> = ({ label, type = 'text', value, onChange, rows }) => (
  <div>
    <label className="block text-xs font-semibold mb-1.5" style={{ color: C.primary }}>{label}</label>
    {rows ? (
      <textarea
        value={value as string}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none resize-none transition-all"
        style={{ borderColor: C.border, color: C.text }}
        onFocus={e => (e.target.style.borderColor = C.gold)}
        onBlur={e => (e.target.style.borderColor = C.border)}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-all"
        style={{ borderColor: C.border, color: C.text }}
        onFocus={e => (e.target.style.borderColor = C.gold)}
        onBlur={e => (e.target.style.borderColor = C.border)}
      />
    )}
  </div>
);

/* ── Modal backdrop + container ── */
export const Modal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode }> = ({
  open, onClose, children,
}) => {
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,10,6,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants} initial="hidden" animate="show" exit="exit"
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
        style={{ border: `1px solid ${C.border}` }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
