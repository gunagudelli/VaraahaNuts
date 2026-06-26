import React, { useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  C, PageHeader, SearchInput, StatusBadge,
  TableWrap, THead, TRow,
} from './adminUI';

const orders = [
  { id: '#VC-1042', customer: 'Priya Sharma',  email: 'priya@email.com',  items: 2, total: 1798, status: 'delivered',  date: 'Jan 20, 2025', payment: 'UPI'  },
  { id: '#VC-1041', customer: 'Rajesh Kumar',  email: 'rajesh@email.com', items: 1, total: 1999, status: 'shipped',    date: 'Jan 20, 2025', payment: 'Card' },
  { id: '#VC-1040', customer: 'Anitha Reddy',  email: 'anitha@email.com', items: 3, total: 2097, status: 'processing', date: 'Jan 19, 2025', payment: 'COD'  },
  { id: '#VC-1039', customer: 'Mohammed Ali',  email: 'mali@email.com',   items: 5, total: 4495, status: 'pending',    date: 'Jan 19, 2025', payment: 'UPI'  },
  { id: '#VC-1038', customer: 'Deepa Nair',    email: 'deepa@email.com',  items: 1, total: 899,  status: 'delivered',  date: 'Jan 18, 2025', payment: 'Card' },
  { id: '#VC-1037', customer: 'Suresh Babu',   email: 'suresh@email.com', items: 2, total: 1498, status: 'cancelled',  date: 'Jan 17, 2025', payment: 'UPI'  },
];

const statusMeta: Record<string, { cls: string }> = {
  pending:    { cls: 'bg-amber-100 text-amber-700'   },
  processing: { cls: 'bg-blue-100 text-blue-700'     },
  shipped:    { cls: 'bg-purple-100 text-purple-700' },
  delivered:  { cls: 'bg-green-100 text-green-700'   },
  cancelled:  { cls: 'bg-red-100 text-red-600'       },
};

const paymentColor: Record<string, string> = {
  UPI: '#10b981', Card: '#6366f1', COD: '#f59e0b',
};

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const summaryStats = [
  { label: 'Total',      count: orders.length,                                   color: C.gold   },
  { label: 'Pending',    count: orders.filter(o => o.status === 'pending').length,    color: C.amber  },
  { label: 'Shipped',    count: orders.filter(o => o.status === 'shipped').length,    color: C.purple },
  { label: 'Delivered',  count: orders.filter(o => o.status === 'delivered').length,  color: C.green  },
];

const AdminOrders: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = orders.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? o.status === statusFilter : true)
  );

  return (
    <div>
      <PageHeader title="Orders" sub={`${orders.length} total orders across all statuses`} />

      {/* Summary chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {summaryStats.map(({ label, count, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            whileHover={{ y: -3, boxShadow: `0 10px 28px ${color}18` }}
            className="bg-white rounded-xl border px-4 py-3 cursor-default"
            style={{ borderColor: color + '28' }}
          >
            <p className="text-xl font-bold" style={{ color }}>{count}</p>
            <p className="text-xs mt-0.5 font-medium" style={{ color: C.textSub }}>{label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.1 }}
        className="bg-white rounded-2xl border overflow-hidden"
        style={{ borderColor: C.border }}
      >
        {/* Toolbar */}
        <div className="px-5 py-4 border-b flex flex-wrap gap-3 items-center" style={{ borderColor: C.border }}>
          <div className="flex-1 min-w-40 max-w-xs">
            <SearchInput value={search} onChange={setSearch} placeholder="Search orders…" icon={<Search size={13} />} />
          </div>

          {/* Status filter chips */}
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => setStatusFilter('')}
              className="px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all"
              style={!statusFilter
                ? { background: C.primary, color: '#fff', borderColor: C.primary }
                : { background: 'transparent', color: C.textSub, borderColor: C.border }
              }
            >All</motion.button>
            {statuses.map(s => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => setStatusFilter(s === statusFilter ? '' : s)}
                className="px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all capitalize"
                style={statusFilter === s
                  ? { background: C.primary, color: '#fff', borderColor: C.primary }
                  : { background: 'transparent', color: C.textSub, borderColor: C.border }
                }
              >{s}</motion.button>
            ))}
          </div>
        </div>

        <TableWrap>
          <THead cols={['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date']} />
          <tbody>
            <AnimatePresence>
              {filtered.map((o, i) => (
                <TRow key={o.id} delay={i * 0.04}>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold" style={{ color: C.gold }}>{o.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-xs font-semibold" style={{ color: C.text }}>{o.customer}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: C.textSub }}>{o.email}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                      style={{ background: C.goldLight, color: C.primary }}
                    >{o.items}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-bold" style={{ color: C.text }}>₹{o.total.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: (paymentColor[o.payment] || C.gold) + '15', color: paymentColor[o.payment] || C.gold }}
                    >{o.payment}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge label={o.status} cls={statusMeta[o.status].cls} />
                  </td>
                  <td className="px-5 py-3.5 text-[11px]" style={{ color: C.textMuted }}>{o.date}</td>
                </TRow>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-14 text-center">
                  <ShoppingBag size={32} className="mx-auto mb-2 opacity-20" style={{ color: C.primary }} />
                  <p className="text-sm font-medium" style={{ color: C.textMuted }}>No orders match your filter</p>
                </td>
              </tr>
            )}
          </tbody>
        </TableWrap>
      </motion.div>
    </div>
  );
};

export default AdminOrders;
