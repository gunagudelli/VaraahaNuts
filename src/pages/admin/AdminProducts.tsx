import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products as initialProducts } from '../../data/products';
import type { Product } from '../../types';
import {
  C, Reveal, PageHeader, PrimaryBtn, IconBtn,
  SearchInput, StatusBadge, TableWrap, THead, TRow,
  FormField, Modal,
} from './adminUI';

const AdminProducts: React.FC = () => {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Partial<Product>>({});

  const filtered = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd  = () => { setEditing({}); setModal(true); };
  const openEdit = (p: Product) => { setEditing(p); setModal(true); };
  const handleDelete = (id: string) => setItems(prev => prev.filter(p => p.id !== id));
  const handleSave = () => {
    if (!editing.name) return;
    if (editing.id) {
      setItems(prev => prev.map(p => p.id === editing.id ? { ...p, ...editing } as Product : p));
    } else {
      setItems(prev => [...prev, {
        ...editing, id: String(Date.now()),
        slug: editing.name!.toLowerCase().replace(/\s+/g, '-'),
        rating: 4.5, reviewCount: 0, inStock: true,
      } as Product]);
    }
    setModal(false);
  };

  return (
    <div>
      <PageHeader
        title="Products"
        sub={`${items.length} total products in catalogue`}
        action={
          <PrimaryBtn onClick={openAdd}>
            <Plus size={15} /> Add Product
          </PrimaryBtn>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
        className="bg-white rounded-2xl border overflow-hidden"
        style={{ borderColor: C.border }}
      >
        {/* Toolbar */}
        <div className="px-5 py-4 border-b flex items-center justify-between gap-3 flex-wrap" style={{ borderColor: C.border }}>
          <div className="max-w-xs w-full">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search products…"
              icon={<Search size={13} />}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-3 py-1.5 rounded-xl" style={{ background: C.goldLight, color: C.primary }}>
              {filtered.length} results
            </span>
          </div>
        </div>

        {/* Table */}
        <TableWrap>
          <THead cols={['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions']} />
          <tbody>
            <AnimatePresence>
              {filtered.map((p, i) => (
                <TRow key={p.id} delay={i * 0.04}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <motion.img
                        whileHover={{ scale: 1.08 }}
                        src={p.image} alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                        style={{ background: C.goldLight }}
                      />
                      <div>
                        <p className="font-semibold text-xs leading-tight" style={{ color: C.text }}>{p.name}</p>
                        <p className="text-[11px] mt-0.5" style={{ color: C.textSub }}>{p.weight}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="text-xs px-2.5 py-1 rounded-xl font-medium capitalize"
                      style={{ background: C.goldLight, color: C.primary }}
                    >
                      {p.category.replace(/-/g, ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-bold" style={{ color: C.text }}>₹{p.price}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge
                      label={p.inStock ? 'In Stock' : 'Out'}
                      cls={p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400 text-xs">★</span>
                      <span className="text-xs font-semibold" style={{ color: C.text }}>{p.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <IconBtn onClick={() => openEdit(p)}><Edit2 size={13} /></IconBtn>
                      <IconBtn onClick={() => handleDelete(p.id)} danger><Trash2 size={13} /></IconBtn>
                    </div>
                  </td>
                </TRow>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-14 text-center">
                  <Package size={32} className="mx-auto mb-2 opacity-20" style={{ color: C.primary }} />
                  <p className="text-sm font-medium" style={{ color: C.textMuted }}>No products found</p>
                </td>
              </tr>
            )}
          </tbody>
        </TableWrap>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <Modal open={modal} onClose={() => setModal(false)}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-base" style={{ color: C.text }}>
                    {editing.id ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: C.textSub }}>
                    {editing.id ? 'Update product details' : 'Fill in the product information'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: '#F5EDD8' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setModal(false)}
                  className="p-1.5 rounded-xl"
                  style={{ color: C.textSub }}
                >
                  <X size={17} />
                </motion.button>
              </div>

              <div className="space-y-4">
                <FormField label="Product Name" value={editing.name || ''} onChange={v => setEditing(f => ({ ...f, name: v }))} />
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Price (₹)" type="number" value={editing.price || ''} onChange={v => setEditing(f => ({ ...f, price: Number(v) }))} />
                  <FormField label="Weight" value={editing.weight || ''} onChange={v => setEditing(f => ({ ...f, weight: v }))} />
                </div>
                <FormField label="Category" value={editing.category || ''} onChange={v => setEditing(f => ({ ...f, category: v }))} />
                <FormField label="Description" value={editing.description || ''} onChange={v => setEditing(f => ({ ...f, description: v }))} rows={3} />
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ backgroundColor: C.goldLight }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors"
                  style={{ borderColor: C.border, color: C.primary }}
                >
                  Cancel
                </motion.button>
                <PrimaryBtn onClick={handleSave} className="flex-1 justify-center">
                  {editing.id ? 'Save Changes' : 'Add Product'}
                </PrimaryBtn>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
