import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Tag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category } from '../../types';
import { adminListCategories, adminCreateCategory, adminUpdateCategory, adminDeleteCategory, AdminApiError } from '../../lib/adminApi';
import { C, Reveal, PageHeader, PrimaryBtn, IconBtn, FormField, Modal } from './adminUI';
import ImageUploadField from './ImageUploadField';

interface FormState { id?: string; name: string; slug: string; image: string }
const emptyForm: FormState = { name: '', slug: '', image: '' };
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    adminListCategories().then(setCategories).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setForm(emptyForm); setFormError(null); setModal(true); };
  const openEdit = (c: Category) => { setForm({ id: c.id, name: c.name, slug: c.slug, image: c.image }); setFormError(null); setModal(true); };

  const handleDelete = async (c: Category) => {
    if (!window.confirm(`Delete "${c.name}"?`)) return;
    try {
      await adminDeleteCategory(c.id);
      setCategories((prev) => prev.filter((x) => x.id !== c.id));
    } catch (err) {
      alert(err instanceof AdminApiError ? err.message : 'Failed to delete category');
    }
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim() || !form.image.trim()) {
      setFormError('Name, slug and image are all required.');
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const payload = { name: form.name.trim(), slug: form.slug.trim(), image: form.image.trim() };
      if (form.id) {
        const updated = await adminUpdateCategory(form.id, payload);
        setCategories((prev) => prev.map((c) => (c.id === form.id ? updated : c)));
      } else {
        const created = await adminCreateCategory(payload);
        setCategories((prev) => [...prev, created]);
      }
      setModal(false);
    } catch (err) {
      setFormError(err instanceof AdminApiError ? err.message : 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Categories"
        sub={`${categories.length} product categories`}
        action={<PrimaryBtn onClick={openAdd}><Plus size={15} /> Add Category</PrimaryBtn>}
      />

      {loading ? (
        <p className="text-sm" style={{ color: C.textSub }}>Loading…</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.07} direction="scale">
              <motion.div
                whileHover={{ y: -5, boxShadow: '0 20px 48px rgba(0,0,0,0.10)' }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                className="bg-white rounded-2xl border overflow-hidden group"
                style={{ borderColor: C.border }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <motion.img
                    src={cat.image} alt={cat.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(28,17,8,0.55) 100%)' }} />
                  <motion.div initial={{ opacity: 0, y: 8 }} whileHover={{ opacity: 1, y: 0 }} className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.9)', color: C.primary }}>
                      {cat.productCount} products
                    </span>
                  </motion.div>
                </div>

                <div className="px-4 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: C.goldLight }}>
                      <Tag size={13} style={{ color: C.primary }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: C.text }}>{cat.name}</p>
                      <p className="text-[11px]" style={{ color: C.textSub }}>{cat.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <IconBtn onClick={() => openEdit(cat)}><Edit2 size={13} /></IconBtn>
                    <IconBtn onClick={() => handleDelete(cat)} danger><Trash2 size={13} /></IconBtn>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <Modal open={modal} onClose={() => setModal(false)}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-base" style={{ color: C.text }}>{form.id ? 'Edit Category' : 'Add Category'}</h3>
                  <p className="text-xs mt-0.5" style={{ color: C.textSub }}>{form.id ? 'Update category details' : 'Create a new product category'}</p>
                </div>
                <motion.button whileHover={{ scale: 1.1, backgroundColor: '#F5EDD8' }} whileTap={{ scale: 0.9 }} onClick={() => setModal(false)} className="p-1.5 rounded-xl" style={{ color: C.textSub }}>
                  <X size={17} />
                </motion.button>
              </div>

              {formError && (
                <div className="mb-4 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-red-50 text-red-600 border border-red-100">{formError}</div>
              )}

              <div className="space-y-4">
                <FormField label="Category Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v, slug: f.id ? f.slug : slugify(v) }))} />
                <FormField label="Slug (URL)" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: slugify(v) }))} />
                <ImageUploadField label="Category Image" value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} folder="categories" />
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button whileHover={{ backgroundColor: C.goldLight }} whileTap={{ scale: 0.97 }} onClick={() => setModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors" style={{ borderColor: C.border, color: C.primary }}>
                  Cancel
                </motion.button>
                <PrimaryBtn onClick={handleSave} className="flex-1 justify-center" disabled={saving}>
                  {saving ? 'Saving…' : form.id ? 'Save Changes' : 'Add Category'}
                </PrimaryBtn>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCategories;
