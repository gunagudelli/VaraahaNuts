import React, { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { adminUploadImage, AdminApiError } from '../../lib/adminApi';
import { C } from './adminUI';

interface Props {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: 'banners' | 'products' | 'categories';
}

const ImageUploadField: React.FC<Props> = ({ label, value, onChange, folder }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const url = await adminUploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: C.primary }}>{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste an image URL, or upload from your device"
          className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-all"
          style={{ borderColor: C.border, color: C.text }}
          onFocus={(e) => (e.target.style.borderColor = C.gold)}
          onBlur={(e) => (e.target.style.borderColor = C.border)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-colors disabled:opacity-60"
          style={{ borderColor: C.border, color: C.primary, background: C.goldLight }}
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
      </div>
      {error && <p className="text-xs mt-1.5" style={{ color: C.red }}>{error}</p>}
      {value && (
        <img
          src={value}
          alt="Preview"
          className="mt-2.5 h-20 rounded-lg object-cover border"
          style={{ borderColor: C.border }}
        />
      )}
    </div>
  );
};

export default ImageUploadField;
