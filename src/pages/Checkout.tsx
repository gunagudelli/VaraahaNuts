import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, ArrowRight, Loader, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { WHATSAPP_NUMBER } from '../config';
import PageTransition from '../components/PageTransition';

const GREEN = '#0B5D3B';
const GOLD  = '#D4A017';
const WHATSAPP = WHATSAPP_NUMBER;

/* ── Country config ── */
type Country = {
  code: string;
  name: string;
  flag: string;
  dial: string;
  digits: number;
  regex: RegExp;
};

const COUNTRIES: Country[] = [
  { code: 'IN', name: 'India',          flag: '🇮🇳', dial: '+91',  digits: 10, regex: /^[6-9]\d{9}$/  },
  { code: 'US', name: 'United States',  flag: '🇺🇸', dial: '+1',   digits: 10, regex: /^[2-9]\d{9}$/  },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dial: '+44',  digits: 10, regex: /^[7]\d{9}$/    },
  { code: 'AE', name: 'UAE',            flag: '🇦🇪', dial: '+971', digits: 9,  regex: /^5\d{8}$/      },
  { code: 'SA', name: 'Saudi Arabia',   flag: '🇸🇦', dial: '+966', digits: 9,  regex: /^5\d{8}$/      },
  { code: 'SG', name: 'Singapore',      flag: '🇸🇬', dial: '+65',  digits: 8,  regex: /^[689]\d{7}$/  },
  { code: 'AU', name: 'Australia',      flag: '🇦🇺', dial: '+61',  digits: 9,  regex: /^4\d{8}$/      },
  { code: 'CA', name: 'Canada',         flag: '🇨🇦', dial: '+1',   digits: 10, regex: /^[2-9]\d{9}$/  },
  { code: 'MY', name: 'Malaysia',       flag: '🇲🇾', dial: '+60',  digits: 10, regex: /^1\d{8,9}$/    },
  { code: 'NZ', name: 'New Zealand',    flag: '🇳🇿', dial: '+64',  digits: 9,  regex: /^2\d{7,9}$/    },
];

type Form = {
  name: string; phone: string;
  doorNo: string; lane1: string; lane2: string;
  city: string; state: string; pincode: string;
};
type Errors = Partial<Record<keyof Form, string>>;

const validate = (f: Form, country: Country): Errors => {
  const e: Errors = {};
  if (!f.name.trim()) {
    e.name = 'Full name is required';
  }
  if (f.phone.length === 0) {
    e.phone = 'Mobile number is required';
  } else if (f.phone.length < country.digits) {
    e.phone = `${country.digits - f.phone.length} more digit${country.digits - f.phone.length !== 1 ? 's' : ''} needed`;
  } else if (!country.regex.test(f.phone)) {
    e.phone = `Invalid number for ${country.name} (${country.dial})`;
  }
  if (!f.doorNo.trim() || !/\d/.test(f.doorNo)) e.doorNo  = 'Must contain at least one digit';
  if (!f.lane1.trim())                           e.lane1   = 'Address Lane 1 is required';
  if (!f.lane2.trim())                           e.lane2   = 'Address Lane 2 is required';
  if (!f.city.trim())                            e.city    = 'City is required';
  if (!f.state.trim())                           e.state   = 'State is required';
  if (!/^\d{6}$/.test(f.pincode))               e.pincode = 'Enter valid 6-digit pincode';
  return e;
};

/* ── Section label — matches About page ── */
const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <p className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: GOLD }}>{text}</p>
);

/* ── Field ── */
interface FieldProps {
  name: keyof Form;
  label: string;
  type?: string;
  full?: boolean;
  placeholder?: string;
  value: string;
  error?: string;
  touched?: boolean;
  readOnly?: boolean;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  onChange: (v: string) => void;
  onBlur: () => void;
}

const Field: React.FC<FieldProps> = ({
  name: _name, label, type = 'text', full, placeholder,
  value, error, touched, readOnly, suffix, prefix, onChange, onBlur,
}) => (
  <div className={full ? 'col-span-1 sm:col-span-2' : ''}>
    <label className="block text-xs font-semibold uppercase tracking-widest text-[#888] mb-1.5">
      {label}
    </label>
    <div className="relative flex">
      {prefix && (
        <div className="flex items-center px-3 rounded-l-xl text-sm font-semibold text-[#1a1a1a] shrink-0"
          style={{ background: '#F0EAE0', borderTop: '1.5px solid #EDE5D8', borderBottom: '1.5px solid #EDE5D8', borderLeft: '1.5px solid #EDE5D8' }}>
          {prefix}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-4 py-2.5 text-sm transition-all focus:outline-none
          ${prefix ? 'rounded-r-xl rounded-l-none' : 'rounded-xl'}
          ${readOnly
            ? 'cursor-not-allowed text-[#aaa]'
            : touched && error
              ? 'text-[#1a1a1a]'
              : 'text-[#1a1a1a]'
          }
          placeholder:text-[#C5B9AC]`}
        style={
          readOnly
            ? { background: '#F5F0E8', border: '1.5px solid #EDE5D8' }
            : touched && error
              ? { background: '#fff5f5', border: '1.5px solid #f87171' }
              : { background: '#fff', border: '1.5px solid #EDE5D8' }
        }
      />
      {suffix && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{suffix}</div>}
    </div>
    {touched && error && (
      <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">⚠ {error}</p>
    )}
  </div>
);

/* ── Country Selector ── */
const CountrySelector: React.FC<{ selected: Country; onChange: (c: Country) => void }> = ({ selected, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative col-span-1 sm:col-span-2">
      <label className="block text-xs font-semibold uppercase tracking-widest text-[#888] mb-1.5">
        Country
      </label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-[#1a1a1a] focus:outline-none transition-colors"
        style={{ background: '#fff', border: '1.5px solid #EDE5D8' }}
      >
        <span className="flex items-center gap-2.5">
          <span className="text-base">{selected.flag}</span>
          <span className="font-medium">{selected.name}</span>
          <span className="text-[#aaa] text-xs">{selected.dial}</span>
        </span>
        <ChevronDown size={14} className={`text-[#aaa] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-xl overflow-hidden max-h-56 overflow-y-auto"
          style={{ border: '1.5px solid #EDE5D8', boxShadow: '0 8px 32px rgba(11,93,59,0.10)' }}>
          {COUNTRIES.map(c => (
            <button
              key={c.code}
              type="button"
              onClick={() => { onChange(c); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors"
              style={c.code === selected.code
                ? { background: `${GREEN}0D`, color: GREEN, fontWeight: 600 }
                : { color: '#1a1a1a' }
              }
              onMouseEnter={e => { if (c.code !== selected.code) (e.currentTarget as HTMLElement).style.background = '#FDFAF4'; }}
              onMouseLeave={e => { if (c.code !== selected.code) (e.currentTarget as HTMLElement).style.background = ''; }}
            >
              <span className="text-base">{c.flag}</span>
              <span className="flex-1">{c.name}</span>
              <span className="text-[#aaa] text-xs">{c.dial}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Checkout ── */
const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useStore();
  const shipping = cartTotal >= 999 ? 0 : 79;
  const total = cartTotal + shipping;

  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [form, setForm] = useState<Form>({ name: '', phone: '', doorNo: '', lane1: '', lane2: '', city: '', state: '', pincode: '' });
  const [errors, setErrors]   = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [success, setSuccess] = useState<string | false>(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError,   setPincodeError]   = useState('');

  const handleCountryChange = (c: Country) => {
    setCountry(c);
    const updated = { ...form, phone: '' };
    setForm(updated);
    if (touched.phone) setErrors(validate(updated, c));
  };

  const handleChange = (k: keyof Form, v: string) => {
    if (k === 'phone') v = v.replace(/\D/g, '').slice(0, country.digits);
    const updated = { ...form, [k]: v };
    setForm(updated);
    if (k === 'phone' && v.length > 0) {
      setTouched(t => ({ ...t, phone: true }));
      setErrors(validate(updated, country));
    } else if (touched[k]) {
      setErrors(validate(updated, country));
    }
    if (k === 'pincode' && v.length === 6) fetchPincode(v, updated);
    if (k === 'pincode' && v.length < 6)  setPincodeError('');
  };

  const fetchPincode = async (pin: string, current: Form) => {
    setPincodeLoading(true); setPincodeError('');
    try {
      const res  = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      if (data[0].Status === 'Success') {
        const post    = data[0].PostOffice[0];
        const updated = { ...current, city: post.District, state: post.State };
        setForm(updated); setErrors(validate(updated, country));
      } else { setPincodeError('Invalid pincode'); }
    } catch { setPincodeError('Could not fetch pincode data'); }
    setPincodeLoading(false);
  };

  const handleBlur = (k: keyof Form) => {
    setTouched(t => ({ ...t, [k]: true }));
    setErrors(validate(form, country));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((a, k) => ({ ...a, [k]: true }), {} as Record<keyof Form, boolean>);
    setTouched(allTouched);
    const errs = validate(form, country);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const dateStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const items   = cart.map((i, idx) =>
      `${idx + 1}. ${i.product.name} (${i.product.weight}) - Qty: ${i.quantity} - Rs.${i.product.price * i.quantity}`
    ).join('%0A');

    const msg =
      `*SRI VARAAHA CASHEWS - New Order*%0A` +
      `Customer: ${form.name}%0A` +
      `Mobile: ${country.dial} ${form.phone}%0A` +
      `Country: ${country.name}%0A` +
      `%0A*Order Items*%0A${items}%0A%0A` +
      `Subtotal: Rs.${cartTotal}%0A` +
      `Shipping: ${shipping === 0 ? 'FREE' : 'Rs.' + shipping}%0A` +
      `*Total: Rs.${total}*%0A%0A` +
      `*Delivery Address*%0A` +
      `${form.doorNo}, ${form.lane1}, ${form.lane2}, ${form.city}, ${form.state} - ${form.pincode}%0A%0A` +
      `Order Time: ${dateStr}`;

    const waUrl = `https://wa.me/${WHATSAPP}?text=${msg}`;
    setSuccess(waUrl); clearCart();
    window.open(waUrl, '_blank');
  };

  const isValid = Object.keys(validate(form, country)).length === 0;

  /* ── Success ── */
  if (success) return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4" style={{ background: '#FDFAF4' }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }} className="text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: `${GREEN}15` }}
        >
          <CheckCircle size={48} style={{ color: GREEN }} />
        </motion.div>
        <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2">Order Placed!</h2>
        <p className="text-[#888] text-sm mb-8 leading-relaxed">
          Complete your order by confirming on WhatsApp.<br />We'll get in touch shortly.
        </p>
        <motion.a
          href={success} target="_blank" rel="noreferrer"
          whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(37,211,102,0.3)' }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white"
          style={{ background: '#25D366' }}
        >
          <MessageCircle size={18} /> Open WhatsApp to Confirm
        </motion.a>
        <Link to="/" className="block mt-5 text-sm font-medium hover:underline" style={{ color: GREEN }}>
          ← Back to Home
        </Link>
      </motion.div>
    </div>
  );

  return (
    <PageTransition>
      <div className="pt-[68px] min-h-screen" style={{ background: '#FDFAF4' }}>

        {/* ── Header ── */}
        <div className="relative overflow-hidden py-8 sm:py-10"
          style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #0d7a4e 60%, #1a9160 100%)` }}>
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-10 blur-3xl" style={{ background: '#fff' }} />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] mb-1.5" style={{ color: GOLD }}>
              Your Order
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Checkout</h1>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {cart.length} item{cart.length !== 1 ? 's' : ''} ready to dispatch
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg font-semibold text-[#1a1a1a] mb-4">Your cart is empty</p>
            <Link to="/shop">
              <motion.span
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white cursor-pointer"
                style={{ background: GREEN }}
              >
                Shop Now <ArrowRight size={15} />
              </motion.span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">

                {/* ── Left: Form ── */}
                <div className="lg:col-span-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl p-6 sm:p-8"
                    style={{ background: '#fff', border: '1px solid #EDE5D8', boxShadow: `0 4px 24px ${GREEN}08` }}
                  >
                    {/* Contact */}
                    <SectionLabel text="Contact Info" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <Field name="name" label="Full Name" placeholder="Your full name"
                        value={form.name} error={errors.name} touched={touched.name}
                        onChange={v => handleChange('name', v)} onBlur={() => handleBlur('name')} />
                      <CountrySelector selected={country} onChange={handleCountryChange} />
                      <Field name="phone" label="Mobile Number" placeholder={`${country.digits}-digit number`}
                        value={form.phone} error={errors.phone} touched={touched.phone}
                        onChange={v => handleChange('phone', v)} onBlur={() => handleBlur('phone')}
                        prefix={<span className="text-sm font-bold" style={{ color: GREEN }}>{country.dial}</span>}
                        full
                      />
                    </div>

                    {/* Address */}
                    <SectionLabel text="Delivery Address" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field name="doorNo" label="Door / Flat No." placeholder="e.g. 12-3/4, Flat 5A"
                        value={form.doorNo} error={errors.doorNo} touched={touched.doorNo}
                        onChange={v => handleChange('doorNo', v)} onBlur={() => handleBlur('doorNo')} />
                      <Field name="lane1" label="Street / Colony" placeholder="Street or colony name"
                        value={form.lane1} error={errors.lane1} touched={touched.lane1}
                        onChange={v => handleChange('lane1', v)} onBlur={() => handleBlur('lane1')} />
                      <Field name="lane2" label="Area / Landmark" placeholder="Nearby landmark or area"
                        value={form.lane2} error={errors.lane2} touched={touched.lane2}
                        onChange={v => handleChange('lane2', v)} onBlur={() => handleBlur('lane2')} full />
                      <Field name="pincode" label="Pincode" placeholder="6-digit pincode"
                        value={form.pincode} error={pincodeError || errors.pincode} touched={touched.pincode}
                        onChange={v => handleChange('pincode', v)} onBlur={() => handleBlur('pincode')}
                        suffix={pincodeLoading ? <Loader size={14} className="animate-spin" style={{ color: GREEN }} /> : null} />
                      <Field name="city" label="City" placeholder="Auto-filled"
                        value={form.city} error={errors.city} touched={touched.city}
                        onChange={v => handleChange('city', v)} onBlur={() => handleBlur('city')}
                        readOnly={pincodeLoading} />
                      <Field name="state" label="State" placeholder="Auto-filled"
                        value={form.state} error={errors.state} touched={touched.state}
                        onChange={v => handleChange('state', v)} onBlur={() => handleBlur('state')}
                        readOnly={pincodeLoading} full />
                    </div>
                  </motion.div>
                </div>

                {/* ── Right: Summary ── */}
                <div className="lg:col-span-2 sticky top-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-3xl p-6"
                    style={{ background: '#fff', border: '1px solid #EDE5D8', boxShadow: `0 4px 24px ${GREEN}08` }}
                  >
                    <SectionLabel text="Your Order" />

                    {/* Items */}
                    <div className="space-y-3 mb-5">
                      {cart.map(item => (
                        <div key={item.product.id} className="flex items-center gap-3">
                          <img src={item.product.image} alt={item.product.name}
                            className="w-12 h-12 rounded-2xl object-contain shrink-0"
                            style={{ background: '#F5EDD8' }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-[#1a1a1a] truncate">{item.product.name}</p>
                            <p className="text-[11px] text-[#888] mt-0.5">{item.product.weight} · qty {item.quantity}</p>
                          </div>
                          <span className="text-sm font-bold text-[#1a1a1a] shrink-0 tabular-nums">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-2 pt-4 mb-4" style={{ borderTop: '1px solid #EDE5D8' }}>
                      <div className="flex justify-between text-sm text-[#777]">
                        <span>Subtotal</span>
                        <span className="tabular-nums text-[#1a1a1a] font-medium">₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-sm text-[#777]">
                        <span>Shipping</span>
                        <span className={`tabular-nums font-semibold ${shipping === 0 ? '' : 'text-[#1a1a1a]'}`}
                          style={shipping === 0 ? { color: GREEN } : {}}>
                          {shipping === 0 ? 'Free' : `₹${shipping}`}
                        </span>
                      </div>
                      {shipping > 0 && (
                        <div className="rounded-xl px-3 py-2 text-[11px]"
                          style={{ background: `${GOLD}12`, color: '#92660a' }}>
                          Add ₹{999 - cartTotal} more for free shipping
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-baseline py-4 mb-5"
                      style={{ borderTop: '1px solid #EDE5D8', borderBottom: '1px solid #EDE5D8' }}>
                      <span className="text-sm font-bold text-[#1a1a1a]">Total</span>
                      <span className="text-2xl font-extrabold tabular-nums" style={{ color: GREEN }}>₹{total}</span>
                    </div>

                    {/* CTA */}
                    <motion.button
                      type="submit"
                      disabled={!isValid}
                      whileHover={isValid ? { scale: 1.02, boxShadow: '0 8px 24px rgba(37,211,102,0.28)' } : {}}
                      whileTap={isValid ? { scale: 0.97 } : {}}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all"
                      style={isValid
                        ? { background: '#25D366', color: '#fff' }
                        : { background: '#EDE5D8', color: '#B5A899', cursor: 'not-allowed' }
                      }
                    >
                      <MessageCircle size={16} /> Place Order via WhatsApp
                    </motion.button>

                    {!isValid && (
                      <p className="text-[11px] text-center mt-2.5" style={{ color: '#B5A899' }}>
                        Fill all required fields to continue
                      </p>
                    )}

                    <p className="text-[10px] text-center mt-4 leading-relaxed" style={{ color: '#B5A899' }}>
                      Confirmed via WhatsApp · No payment until delivery
                    </p>
                  </motion.div>
                </div>

              </div>
            </div>
          </form>
        )}
      </div>
    </PageTransition>
  );
};

export default Checkout;