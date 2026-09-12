import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, Trash2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Banner } from '../../types';
import { adminGetBanner, adminSetBanner, adminRemoveBanner, AdminApiError } from '../../lib/adminApi';
import { C, Reveal, PageHeader, PrimaryBtn, FormField } from './adminUI';

const AdminBanners: React.FC = () => {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    adminGetBanner()
      .then((b) => {
        setBanner(b);
        setImage(b?.image || '');
        setLinkUrl(b?.linkUrl || '');
      })
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleSave = async () => {
    if (!image.trim()) {
      setError('Image URL is required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const updated = await adminSetBanner({ image: image.trim(), linkUrl: linkUrl.trim() || undefined });
      setBanner(updated);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Failed to save banner');
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    if (!window.confirm('Remove the current banner? It will disappear from the storefront immediately.')) return;
    await adminRemoveBanner();
    setBanner(null);
    setImage('');
    setLinkUrl('');
  };

  return (
    <div>
      <PageHeader
        title="Festival Banner"
        sub={banner ? 'Currently live on your homepage' : 'Nothing is showing right now'}
      />

      {loading ? (
        <p className="text-sm" style={{ color: C.textSub }}>Loading…</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Current state preview */}
          <Reveal>
            <div className="bg-white rounded-2xl border p-5" style={{ borderColor: C.border }}>
              <p className="text-sm font-bold mb-3" style={{ color: C.text }}>Live Preview</p>
              {banner ? (
                <>
                  <img src={banner.image} alt="Current banner" className="w-full rounded-xl object-cover" />
                  {banner.linkUrl && (
                    <p className="flex items-center gap-1.5 text-xs mt-3" style={{ color: C.textSub }}>
                      <ExternalLink size={12} /> Links to: <span className="font-medium" style={{ color: C.text }}>{banner.linkUrl}</span>
                    </p>
                  )}
                  <motion.button
                    whileHover={{ backgroundColor: '#FEE2E2' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRemove}
                    className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors"
                    style={{ borderColor: '#FCA5A5', color: C.red }}
                  >
                    <Trash2 size={14} /> Remove Banner
                  </motion.button>
                </>
              ) : (
                <div
                  className="rounded-xl border border-dashed py-16 flex flex-col items-center justify-center"
                  style={{ borderColor: C.border }}
                >
                  <ImageIcon size={32} className="opacity-20 mb-2" style={{ color: C.primary }} />
                  <p className="text-sm font-medium" style={{ color: C.textMuted }}>No banner active</p>
                  <p className="text-xs mt-1" style={{ color: C.textMuted }}>Set one using the form →</p>
                </div>
              )}
            </div>
          </Reveal>

          {/* Set / replace form */}
          <Reveal delay={0.08}>
            <div className="bg-white rounded-2xl border p-5" style={{ borderColor: C.border }}>
              <p className="text-sm font-bold mb-1" style={{ color: C.text }}>{banner ? 'Replace Banner' : 'Set a Banner'}</p>
              <p className="text-xs mb-4" style={{ color: C.textSub }}>
                Upload your festival/sale image somewhere and paste its URL here. Leave the link field empty if it shouldn't be clickable.
              </p>

              {error && (
                <div className="mb-4 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-red-50 text-red-600 border border-red-100">{error}</div>
              )}

              <div className="space-y-4">
                <FormField label="Image URL" value={image} onChange={setImage} />
                <FormField label="Link URL (optional)" value={linkUrl} onChange={setLinkUrl} />
              </div>

              <PrimaryBtn onClick={handleSave} className="mt-5 justify-center w-full" disabled={saving}>
                {saving ? 'Saving…' : banner ? 'Update Banner' : 'Set Banner'}
              </PrimaryBtn>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
};

export default AdminBanners;
