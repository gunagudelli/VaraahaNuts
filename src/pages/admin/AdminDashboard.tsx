import React, { useRef, useState } from 'react';
import {
  Package, ShoppingBag, Users, IndianRupee,
  ArrowUp, ArrowDown, Clock, CheckCircle2, Truck, AlertCircle,
  TrendingUp, Star, Zap, Activity, ChevronRight,
} from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { products } from '../../data/products';
import logo from '../../assets/WhatsApp Image 2026-06-16 at 1.36.56 PM.jpeg';
import { C, Reveal, AnimCounter, ProgressBar } from './adminUI';

/* ── Sparkline SVG ── */
const SparkLine: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const max = Math.max(...data);
  const W = 72, H = 28;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - (v / max) * H}`).join(' ');
  return (
    <svg ref={ref} width={W} height={H}>
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polyline
        fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        points={pts}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
      {data.map((v, i) => (
        <motion.circle
          key={i} cx={(i / (data.length - 1)) * W} cy={H - (v / max) * H}
          r="2" fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.7 + i * 0.07, duration: 0.25, type: 'spring' }}
        />
      ))}
    </svg>
  );
};

/* ── Donut ring ── */
const DonutRing: React.FC<{ pct: number; color: string; r: number; delay: number }> = ({ pct, color, r, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const circ = 2 * Math.PI * r;
  return (
    <g ref={ref as React.RefObject<SVGGElement>}>
      <circle cx="56" cy="56" r={r} fill="none" stroke="#EDE5D8" strokeWidth="5.5" />
      <motion.circle
        cx="56" cy="56" r={r} fill="none" stroke={color} strokeWidth="5.5"
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={inView ? { strokeDashoffset: circ - (pct / 100) * circ } : {}}
        transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94], delay }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      />
    </g>
  );
};

/* ── Revenue bar with hover tooltip ── */
const RevenueBar: React.FC<{ val: number; month: string; isMax: boolean; delay: number }> = ({
  val, month, isMax, delay,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className="flex-1 flex flex-col items-center gap-1.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg whitespace-nowrap"
            style={{ background: C.text, color: '#fff' }}
          >
            ₹{val}k
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full flex items-end" style={{ height: 96 }}>
        <motion.div
          className="w-full rounded-t-xl cursor-pointer relative overflow-hidden"
          style={{
            background: isMax
              ? `linear-gradient(180deg, ${C.gold}, #e8c76a)`
              : `linear-gradient(180deg, #E8D5B0, #F5EDD8)`,
          }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${(val / 248) * 100}%` } : {}}
          transition={{ delay, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ filter: 'brightness(1.08)', scaleX: 0.92 }}
        >
          {isMax && (
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5), transparent)' }}
            />
          )}
        </motion.div>
      </div>
      <span className="text-[10px] font-medium" style={{ color: C.textSub }}>{month}</span>
    </div>
  );
};

/* ── Data ── */
const statsData = [
  {
    icon: IndianRupee, label: 'Total Revenue', target: 248500, prefix: '₹',
    change: 18.5, up: true, color: C.gold, spark: [60, 75, 55, 90, 70, 88, 100],
    badge: 'This month', grad: 'from-amber-50 to-yellow-50/60',
  },
  {
    icon: ShoppingBag, label: 'Total Orders', target: 342, prefix: '',
    change: 12.3, up: true, color: C.indigo, spark: [40, 55, 45, 70, 60, 75, 90],
    badge: '+42 today', grad: 'from-indigo-50 to-violet-50/60',
  },
  {
    icon: Users, label: 'Customers', target: 1248, prefix: '',
    change: 8.7, up: true, color: C.green, spark: [50, 60, 52, 65, 70, 80, 85],
    badge: '+18 new', grad: 'from-emerald-50 to-teal-50/60',
  },
  {
    icon: Package, label: 'Products', target: products.length, prefix: '',
    change: 2.1, up: true, color: C.orange, spark: [80, 80, 82, 85, 85, 88, 90],
    badge: 'In stock', grad: 'from-orange-50 to-amber-50/60',
  },
];

const quickKpis = [
  { icon: Star,       label: 'Avg Rating',   value: '4.8',  sub: '312 reviews',  color: C.amber  },
  { icon: Zap,        label: 'Conversion',   value: '3.4%', sub: '10.2k visits', color: C.indigo },
  { icon: Activity,   label: 'Avg Order',    value: '₹726', sub: 'Per txn',      color: C.green  },
  { icon: TrendingUp, label: 'Return Rate',  value: '68%',  sub: 'Repeat buyers',color: C.gold   },
];

const recentOrders = [
  { id: '#VC-1042', customer: 'Priya Sharma',  avatar: 'PS', items: 2, total: '₹1,798', status: 'delivered',  date: 'Jan 20' },
  { id: '#VC-1041', customer: 'Rajesh Kumar',  avatar: 'RK', items: 1, total: '₹1,999', status: 'shipped',    date: 'Jan 20' },
  { id: '#VC-1040', customer: 'Anitha Reddy',  avatar: 'AR', items: 3, total: '₹2,097', status: 'processing', date: 'Jan 19' },
  { id: '#VC-1039', customer: 'Mohammed Ali',  avatar: 'MA', items: 5, total: '₹4,495', status: 'pending',    date: 'Jan 19' },
  { id: '#VC-1038', customer: 'Deepa Nair',    avatar: 'DN', items: 1, total: '₹899',   status: 'delivered',  date: 'Jan 18' },
];

const statusMeta: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  pending:    { label: 'Pending',    cls: 'bg-amber-100 text-amber-700',   icon: Clock        },
  processing: { label: 'Processing', cls: 'bg-blue-100 text-blue-700',     icon: AlertCircle  },
  shipped:    { label: 'Shipped',    cls: 'bg-purple-100 text-purple-700', icon: Truck        },
  delivered:  { label: 'Delivered',  cls: 'bg-green-100 text-green-700',   icon: CheckCircle2 },
  cancelled:  { label: 'Cancelled',  cls: 'bg-red-100 text-red-600',       icon: AlertCircle  },
};

const monthlyRevenue = [
  { month: 'Aug', val: 120 }, { month: 'Sep', val: 165 }, { month: 'Oct', val: 140 },
  { month: 'Nov', val: 210 }, { month: 'Dec', val: 248 }, { month: 'Jan', val: 200 },
];

const topProducts = [
  { name: 'W240 Premium Whole Cashews',   sold: 124, pct: 92, color: C.gold   },
  { name: 'Luxury Gift Box — 4 Variants', sold: 87,  pct: 65, color: C.indigo },
  { name: 'Classic Roasted Cashews',      sold: 76,  pct: 57, color: C.green  },
  { name: 'Premium Mixed Dry Fruits',     sold: 64,  pct: 48, color: C.orange },
];

const orderBreakdown = [
  { label: 'Delivered',  count: 198, pct: 58, color: C.green  },
  { label: 'Shipped',    count: 72,  pct: 21, color: C.purple },
  { label: 'Processing', count: 45,  pct: 13, color: C.blue   },
  { label: 'Pending',    count: 27,  pct: 8,  color: C.amber  },
];

/* ────────────────── COMPONENT ────────────────── */
const AdminDashboard: React.FC = () => (
  <div className="space-y-6 pb-8">

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease: 'easeOut' }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-xl font-bold tracking-tight" style={{ color: C.text }}>Dashboard</h1>
        <p className="text-sm mt-0.5" style={{ color: C.textSub }}>
          Welcome back, Admin — here's your store snapshot.
        </p>
      </div>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium cursor-default"
        style={{ background: C.surface, borderColor: C.border, color: C.textSub }}
      >
        <motion.span
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="w-2 h-2 rounded-full bg-green-400 shrink-0"
        />
        Live · Jan 20, 2025
      </motion.div>
    </motion.div>

    {/* ── STAT CARDS ── */}
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {statsData.map(({ icon: Icon, label, target, prefix, change, up, color, spark, badge, grad }, i) => (
        <Reveal key={label} delay={i * 0.08}>
          <motion.div
            whileHover={{ y: -5, boxShadow: `0 20px 48px ${color}1A` }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`bg-gradient-to-br ${grad} rounded-2xl border p-4 flex flex-col gap-3.5 cursor-default relative overflow-hidden`}
            style={{ borderColor: color + '28' }}
          >
            {/* ambient glow */}
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-15 blur-2xl pointer-events-none"
              style={{ background: color }}
            />

            <div className="flex items-start justify-between relative">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.12 }}
                transition={{ type: 'spring', stiffness: 320 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: color + '18', border: `1px solid ${color}28` }}
              >
                <Icon size={17} style={{ color }} />
              </motion.div>
              <SparkLine data={spark} color={color} />
            </div>

            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.textSub }}>{label}</p>
              <p className="text-[26px] font-bold leading-tight mt-0.5 tabular-nums" style={{ color: C.text }}>
                <AnimCounter target={target} prefix={prefix} />
              </p>
            </div>

            <div className="flex items-center justify-between relative">
              <div className="flex items-center gap-1">
                {up ? <ArrowUp size={11} className="text-green-500" /> : <ArrowDown size={11} className="text-red-400" />}
                <span className={`text-[11px] font-bold ${up ? 'text-green-600' : 'text-red-500'}`}>{change}%</span>
                <span className="text-[11px]" style={{ color: C.textMuted }}> vs last</span>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ background: color + '18', color }}
              >{badge}</span>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>

    {/* ── QUICK KPI ROW ── */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {quickKpis.map(({ icon: Icon, label, value, sub, color }, i) => (
        <Reveal key={label} delay={i * 0.07}>
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: `0 10px 28px ${color}18` }}
            transition={{ type: 'spring', stiffness: 280 }}
            className="bg-white rounded-xl border px-4 py-3 flex items-center gap-3 cursor-default"
            style={{ borderColor: C.border }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + '14' }}>
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <p className="text-sm font-bold leading-none" style={{ color: C.text }}>{value}</p>
              <p className="text-[10px] font-medium mt-0.5" style={{ color: C.textSub }}>{label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: C.textMuted }}>{sub}</p>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>

    {/* ── MIDDLE: Revenue + Order Breakdown ── */}
    <div className="grid lg:grid-cols-3 gap-4">

      {/* Revenue chart */}
      <Reveal delay={0.08} direction="left" className="lg:col-span-2">
        <div
          className="bg-white rounded-2xl border p-5 h-full"
          style={{ borderColor: C.border }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-bold" style={{ color: C.text }}>Monthly Revenue</p>
              <p className="text-xs mt-0.5" style={{ color: C.textSub }}>Last 6 months performance</p>
            </div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl cursor-default"
              style={{ background: C.goldLight, color: C.primary }}
            >
              ₹ in thousands
            </motion.span>
          </div>
          <div className="flex items-end gap-2.5" style={{ height: 120 }}>
            {monthlyRevenue.map(({ month, val }, i) => (
              <RevenueBar key={month} val={val} month={month} isMax={val === 248} delay={0.15 + i * 0.08} />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Order status donut */}
      <Reveal delay={0.12} direction="right">
        <div
          className="bg-white rounded-2xl border p-5"
          style={{ borderColor: C.border }}
        >
          <p className="text-sm font-bold" style={{ color: C.text }}>Order Status</p>
          <p className="text-xs mt-0.5 mb-4" style={{ color: C.textSub }}>342 total orders</p>

          <div className="flex justify-center mb-5">
            <div className="relative w-28 h-28">
              <svg width="112" height="112" viewBox="0 0 112 112" className="absolute inset-0">
                {orderBreakdown.map(({ pct, color }, idx) => (
                  <DonutRing key={idx} pct={pct} color={color} r={44 - idx * 9} delay={0.25 + idx * 0.14} />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-base font-bold" style={{ color: C.text }}>342</span>
                <span className="text-[9px] font-medium" style={{ color: C.textMuted }}>Orders</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {orderBreakdown.map(({ label, count, pct, color }, i) => (
              <Reveal key={label} delay={0.35 + i * 0.07}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div whileHover={{ scale: 1.5 }} className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                    <span className="text-xs" style={{ color: C.textSub }}>{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-14">
                      <ProgressBar pct={pct} color={color} delay={0.4 + i * 0.1} />
                    </div>
                    <span className="text-[11px] font-bold w-6 text-right" style={{ color: C.text }}>{count}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </div>

    {/* ── BOTTOM: Recent Orders + Top Products ── */}
    <div className="grid lg:grid-cols-3 gap-4">

      {/* Recent orders */}
      <Reveal delay={0.08} direction="left" className="lg:col-span-2">
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: C.border }}>
          <div
            className="px-5 py-4 border-b flex items-center justify-between"
            style={{ borderColor: C.border }}
          >
            <p className="text-sm font-bold" style={{ color: C.text }}>Recent Orders</p>
            <motion.button
              whileHover={{ x: 3 }}
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: C.gold }}
            >
              View All <ChevronRight size={12} />
            </motion.button>
          </div>
          <div>
            {recentOrders.map((order, i) => {
              const meta = statusMeta[order.status];
              const StatusIcon = meta.icon;
              return (
                <Reveal key={order.id} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ backgroundColor: '#FAF6EE', x: 3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    className="flex items-center gap-3 px-5 py-3.5 border-b last:border-0 cursor-default"
                    style={{ borderColor: '#F5EEE4' }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: C.goldLight, color: C.primary }}
                    >
                      {order.avatar}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: C.text }}>{order.customer}</p>
                      <p className="text-[11px]" style={{ color: C.textSub }}>{order.id} · {order.items} items</p>
                    </div>
                    <div className="text-right shrink-0 mr-3">
                      <p className="text-xs font-bold" style={{ color: C.text }}>{order.total}</p>
                      <p className="text-[10px]" style={{ color: C.textMuted }}>{order.date}</p>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.06 }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold shrink-0 ${meta.cls}`}
                    >
                      <StatusIcon size={9} /> {meta.label}
                    </motion.span>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Top products */}
      <Reveal delay={0.12} direction="right">
        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: C.border }}>
          <p className="text-sm font-bold" style={{ color: C.text }}>Top Products</p>
          <p className="text-xs mt-0.5 mb-5" style={{ color: C.textSub }}>By units sold this month</p>

          <div className="space-y-4">
            {topProducts.map(({ name, sold, pct, color }, i) => (
              <Reveal key={name} delay={i * 0.08}>
                <motion.div whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-xs font-medium leading-tight line-clamp-1 pr-2" style={{ color: C.text }}>{name}</p>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="text-xs font-bold shrink-0"
                      style={{ color }}
                    >{sold}</motion.span>
                  </div>
                  <ProgressBar pct={pct} color={color} delay={0.3 + i * 0.09} />
                </motion.div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t flex items-center gap-2.5" style={{ borderColor: C.border }}>
            <motion.img
              src={logo} alt="Varaaha"
              className="w-8 h-8 rounded-xl object-cover"
              whileHover={{ scale: 1.1, rotate: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <div>
              <p className="text-[11px] font-bold" style={{ color: C.text }}>Varaaha Cashews</p>
              <p className="text-[10px]" style={{ color: C.textMuted }}>Premium · Farm Fresh</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>

  </div>
);

export default AdminDashboard;
