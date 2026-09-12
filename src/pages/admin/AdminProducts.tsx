import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Package, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, Category } from '../../types';
import { adminListProducts, adminListCategories, adminCreateProduct, adminUpdateProduct, adminDeleteProduct, AdminApiError } from '../../lib/adminApi';
import {
  C, PageHeader, PrimaryBtn, IconBtn,
  SearchInput, StatusBadge, TableWrap, THead, TRow,
  FormField, Modal,
} from './adminUI';

interface ProductFormState {
  id?: string;
  name: string;
  slug: string;
  categorySlug: string;
  price: string;
  originalPrice: string;
  weight: string;
  image: string;
  images: string;
  rating: string;
  reviewCount: string;
  description: string;
  benefits: string;
  tags: string;
  inStock: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive: boolean;
}

const emptyForm: ProductFormState = {
  name: '', slug: '', categorySlug: '', price: '', originalPrice: '', weight: '',
  image: '', images: '', rating: '', reviewCount: '', description: '', benefits: '', tags: '',
  inStock: true, isFeatured: false, isBestSeller: false, isActive: true,
};

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function toForm(p: Product): ProductFormState {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    categorySlug: p.category,
    price: String(p.price),
    originalPrice: p.originalPrice !== undefined ? String(p.originalPrice) : '',
    weight: p.weight,
    image: p.image,
    images: (p.images || []).join('\n'),
    rating: String(p.rating),
    reviewCount: String(p.reviewCount),
    description: p.description,
    benefits: (p.benefits || []).join(', '),
    tags: (p.tags || []).join(', '),
    inStock: p.inStock,
    isFeatured: Boolean(p.isFeatured),
    isBestSeller: Boolean(p.isBestSeller),
    isActive: p.isActive !== false,
  };
}

function toPayload(f: ProductFormState) {
  return {
    name: f.name.trim(),
    slug: f.slug.trim(),
    categorySlug: f.categorySlug,
    price: Number(f.price) || 0,
    originalPrice: f.originalPrice.trim() ? Number(f.originalPrice) : null,
    weight: f.weight.trim(),
    image: f.image.trim(),
    images: f.images.split('\n').map((s) => s.trim()).filter(Boolean),
    rating: f.rating.trim() ? Number(f.rating) : 0,
    reviewCount: f.reviewCount.trim() ? Number(f.reviewCount) : 0,
    description: f.description.trim(),
    benefits: f.benefits.split(',').map((s) => s.trim()).filter(Boolean),
    tags: f.tags.split(',').map((s) => s.trim()).filter(Boolean),
    inStock: f.inStock,
    isFeatured: f.isFeatured,
    isBestSeller: f.isBestSeller,
    isActive: f.isActive,
  };
}

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer select-none" style={{ color: C.text }}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 rounded accent-current" style={{ color: C.gold }} />
    {label}
  </label>
);

const AdminProducts: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    Promise.all([adminListProducts(), adminListCategories()])
      .then(([p, c]) => { setItems(p); setCategories(c); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = items.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm({ ...emptyForm, categorySlug: categories[0]?.slug || '' }); setFormError(null); setModal(true); };
  const openEdit = (p: Product) => { setForm(toForm(p)); setFormError(null); setModal(true); };

  const handleDelete = async (p: Product) => {
    if (!window.confirm(`Delete "${p.name}"? This can't be undone.`)) return;
    try {
      await adminDeleteProduct(p.id);
      setItems((prev) => prev.filter((x) => x.id !== p.id));
    } catch (err) {
      alert(err instanceof AdminApiError ? err.message : 'Failed to delete product');
    }
  };

  const toggleActive = async (p: Product) => {
    const updated = await adminUpdateProduct(p.id, { isActive: !(p.isActive !== false) });
    setItems((prev) => prev.map((x) => (x.id === p.id ? updated : x)));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim() || !form.categorySlug || !form.weight.trim() || !form.image.trim()) {
      setFormError('Name, slug, category, weight and image are required.');
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const payload = toPayload(form);
      if (form.id) {
        const updated = await adminUpdateProduct(form.id, payload);
        setItems((prev) => prev.map((p) => (p.id === form.id ? updated : p)));
      } else {
        const created = await adminCreateProduct(payload);
        setItems((prev) => [created, ...prev]);
      }
      setModal(false);
    } catch (err) {
      setFormError(err instanceof AdminApiError ? err.message : 'Failed to save product');
    } finally {
      setSaving(false);
    }
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
        <div className="px-5 py-4 border-b flex items-center justify-between gap-3 flex-wrap" style={{ borderColor: C.border }}>
          <div className="max-w-xs w-full">
            <SearchInput value={search} onChange={setSearch} placeholder="Search products…" icon={<Search size={13} />} />
          </div>
          <span className="text-xs font-medium px-3 py-1.5 rounded-xl" style={{ background: C.goldLight, color: C.primary }}>
            {filtered.length} results
          </span>
        </div>

        {loading ? (
          <p className="text-sm text-center py-14" style={{ color: C.textSub }}>Loading products…</p>
        ) : (
          <TableWrap>
            <THead cols={['Product', 'Category', 'Price', 'Stock', 'Visibility', 'Actions']} />
            <tbody>
              <AnimatePresence>
                {filtered.map((p, i) => {
                  const active = p.isActive !== false;
                  return (
                    <TRow key={p.id} delay={i * 0.03}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover shrink-0" style={{ background: C.goldLight }} />
                          <div>
                            <p className="font-semibold text-xs leading-tight" style={{ color: C.text }}>{p.name}</p>
                            <p className="text-[11px] mt-0.5" style={{ color: C.textSub }}>{p.weight}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs px-2.5 py-1 rounded-xl font-medium capitalize" style={{ background: C.goldLight, color: C.primary }}>
                          {p.category.replace(/-/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-bold" style={{ color: C.text }}>₹{p.price}</td>
                      <td className="px-5 py-3.5">
                        <StatusBadge label={p.inStock ? 'In Stock' : 'Out'} cls={p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'} />
                      </td>
                      <td className="px-5 py-3.5">
                        <button onClick={() => toggleActive(p)} title={active ? 'Click to hide from storefront' : 'Click to show on storefront'}>
                          <StatusBadge
                            label={active ? 'Active' : 'Hidden'}
                            cls={active ? 'bg-green-100 text-green-700 cursor-pointer' : 'bg-gray-200 text-gray-600 cursor-pointer'}
                            icon={active ? Eye : EyeOff}
                          />
                        </button>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          <IconBtn onClick={() => openEdit(p)}><Edit2 size={13} /></IconBtn>
                          <IconBtn onClick={() => handleDelete(p)} danger><Trash2 size={13} /></IconBtn>
                        </div>
                      </td>
                    </TRow>
                  );
                })}
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
        )}
      </motion.div>

      <AnimatePresence>
        {modal && (
          <Modal open={modal} onClose={() => setModal(false)}>
            <div className="p-6 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-base" style={{ color: C.text }}>{form.id ? 'Edit Product' : 'Add New Product'}</h3>
                  <p className="text-xs mt-0.5" style={{ color: C.textSub }}>{form.id ? 'Update product details' : 'Fill in the product information'}</p>
                </div>
                <motion.button whileHover={{ scale: 1.1, backgroundColor: '#F5EDD8' }} whileTap={{ scale: 0.9 }} onClick={() => setModal(false)} className="p-1.5 rounded-xl" style={{ color: C.textSub }}>
                  <X size={17} />
                </motion.button>
              </div>

              {formError && (
                <div className="mb-4 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-red-50 text-red-600 border border-red-100">{formError}</div>
              )}

              <div className="space-y-4">
                <FormField
                  label="Product Name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v, slug: f.id ? f.slug : slugify(v) }))}
                />
                <FormField label="Slug (URL)" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: slugify(v) }))} />

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: C.primary }}>Category</label>
                  <select
                    value={form.categorySlug}
                    onChange={(e) => setForm((f) => ({ ...f, categorySlug: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none"
                    style={{ borderColor: C.border, color: C.text }}
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Price (₹)" type="number" value={form.price} onChange={(v) => setForm((f) => ({ ...f, price: v }))} />
                  <FormField label="Original Price (₹, optional)" type="number" value={form.originalPrice} onChange={(v) => setForm((f) => ({ ...f, originalPrice: v }))} />
                </div>
                <FormField label="Weight (e.g. 1kg)" value={form.weight} onChange={(v) => setForm((f) => ({ ...f, weight: v }))} />

                <FormField label="Main Image URL" value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} />
                <FormField label="Gallery Image URLs (one per line, optional)" value={form.images} onChange={(v) => setForm((f) => ({ ...f, images: v }))} rows={3} />

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Rating (0-5)" type="number" value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
                  <FormField label="Review Count" type="number" value={form.reviewCount} onChange={(v) => setForm((f) => ({ ...f, reviewCount: v }))} />
                </div>

                <FormField label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} rows={3} />
                <FormField label="Benefits (comma separated)" value={form.benefits} onChange={(v) => setForm((f) => ({ ...f, benefits: v }))} />
                <FormField label="Tags (comma separated)" value={form.tags} onChange={(v) => setForm((f) => ({ ...f, tags: v }))} />

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Checkbox label="In Stock" checked={form.inStock} onChange={(v) => setForm((f) => ({ ...f, inStock: v }))} />
                  <Checkbox label="Featured" checked={form.isFeatured} onChange={(v) => setForm((f) => ({ ...f, isFeatured: v }))} />
                  <Checkbox label="Best Seller" checked={form.isBestSeller} onChange={(v) => setForm((f) => ({ ...f, isBestSeller: v }))} />
                  <Checkbox label="Active (visible on site)" checked={form.isActive} onChange={(v) => setForm((f) => ({ ...f, isActive: v }))} />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button whileHover={{ backgroundColor: C.goldLight }} whileTap={{ scale: 0.97 }} onClick={() => setModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors" style={{ borderColor: C.border, color: C.primary }}>
                  Cancel
                </motion.button>
                <PrimaryBtn onClick={handleSave} className="flex-1 justify-center" disabled={saving}>
                  {saving ? 'Saving…' : form.id ? 'Save Changes' : 'Add Product'}
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
