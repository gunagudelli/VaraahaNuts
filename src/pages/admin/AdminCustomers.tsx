import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  C, PageHeader, SearchInput,
  TableWrap, THead, TRow,
} from './adminUI';

const customers = [
  { id: '1', name: 'Priya Sharma',  email: 'priya@email.com',  phone: '+91 98765 43210', orders: 8,  spent: 12450, joined: 'Dec 2024', location: 'Hyderabad' },
  { id: '2', name: 'Rajesh Kumar',  email: 'rajesh@email.com', phone: '+91 87654 32109', orders: 5,  spent: 7890,  joined: 'Nov 2024', location: 'Bangalore' },
  { id: '3', name: 'Anitha Reddy',  email: 'anitha@email.com', phone: '+91 76543 21098', orders: 12, spent: 18200, joined: 'Oct 2024', location: 'Chennai'   },
  { id: '4', name: 'Mohammed Ali',  email: 'mali@email.com',   phone: '+91 65432 10987', orders: 3,  spent: 4495,  joined: 'Jan 2025', location: 'Mumbai'    },
  { id: '5', name: 'Deepa Nair',    email: 'deepa@email.com',  phone: '+91 54321 09876', orders: 7,  spent: 9800,  joined: 'Sep 2024', location: 'Kochi'     },
];

const spendTier = (spent: number) => {
  if (spent >= 15000) return { label: 'Premium', color: C.gold };
  if (spent >= 8000)  return { label: 'Regular', color: C.indigo };
  return { label: 'New', color: C.green };
};

const avatarColors = ['#C9A84C', '#6366f1', '#10b981', '#f97316', '#8b5cf6'];

const AdminCustomers: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.includes(search)
  );

  return (
    <div>
      <PageHeader title="Customers" sub={`${customers.length} registered customers`} />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total',   count: customers.length,                              color: C.gold   },
          { label: 'Premium', count: customers.filter(c => c.spent >= 15000).length, color: C.gold   },
          { label: 'Active',  count: customers.filter(c => c.orders >= 5).length,    color: C.green  },
        ].map(({ label, count, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
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
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.1 }}
        className="bg-white rounded-2xl border overflow-hidden"
        style={{ borderColor: C.border }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: C.border }}>
          <div className="max-w-xs">
            <SearchInput value={search} onChange={setSearch} placeholder="Search customers…" icon={<Search size={13} />} />
          </div>
        </div>

        <TableWrap>
          <THead cols={['Customer', 'Phone', 'Location', 'Orders', 'Total Spent', 'Tier', 'Joined']} />
          <tbody>
            <AnimatePresence>
              {filtered.map((c, i) => {
                const initials = c.name.split(' ').map(n => n[0]).join('');
                const tier = spendTier(c.spent);
                const bg = avatarColors[i % avatarColors.length];
                return (
                  <TRow key={c.id} delay={i * 0.05}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                          style={{ background: `linear-gradient(135deg, ${bg}, ${bg}cc)` }}
                        >
                          {initials}
                        </motion.div>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: C.text }}>{c.name}</p>
                          <p className="text-[11px] mt-0.5" style={{ color: C.textSub }}>{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs" style={{ color: C.textSub }}>{c.phone}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className="text-xs px-2.5 py-1 rounded-xl font-medium"
                        style={{ background: C.goldLight, color: C.primary }}
                      >{c.location}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-bold" style={{ color: C.text }}>{c.orders}</td>
                    <td className="px-5 py-3.5 text-xs font-bold" style={{ color: C.text }}>
                      ₹{c.spent.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: tier.color + '16', color: tier.color }}
                      >{tier.label}</span>
                    </td>
                    <td className="px-5 py-3.5 text-[11px]" style={{ color: C.textMuted }}>{c.joined}</td>
                  </TRow>
                );
              })}
            </AnimatePresence>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-14 text-center">
                  <Users size={32} className="mx-auto mb-2 opacity-20" style={{ color: C.primary }} />
                  <p className="text-sm font-medium" style={{ color: C.textMuted }}>No customers found</p>
                </td>
              </tr>
            )}
          </tbody>
        </TableWrap>
      </motion.div>
    </div>
  );
};

export default AdminCustomers;
