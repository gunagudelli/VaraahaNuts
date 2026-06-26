import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import PageTransition from '../components/PageTransition';

const WHATSAPP = '919704671552';

type Form = {
  name: string; phone: string; email: string;
  address: string; city: string; state: string; pincode: string;
};
type Errors = Partial<Record<keyof Form, string>>;

const validate = (f: Form): Errors => {
  const e: Errors = {};
  if (!f.name.trim())                            e.name    = 'Full name is required';
  if (!/^[6-9]\d{9}$/.test(f.phone))            e.phone   = 'Enter a valid 10-digit mobile number.';
  if (f.email && !/\S+@\S+\.\S+/.test(f.email)) e.email   = 'Enter valid email address';
  if (!f.address.trim())                         e.address = 'Full address is required.';
  else if (f.address.trim().length < 10)          e.address = 'Address must be at least 10 characters.';
  if (!f.city.trim())                            e.city    = 'City is required';
  if (!f.state.trim())                           e.state   = 'State is required';
  if (!/^\d{6}$/.test(f.pincode))               e.pincode = 'Enter valid 6-digit pincode';
  return e;
};

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
  onChange: (v: string) => void;
  onBlur: () => void;
}

const Field: React.FC<FieldProps> = ({ name, label, type = 'text', full, placeholder, value, error, touched, readOnly, suffix, onChange, onBlur }) => (
  <div className={full ? 'col-span-2' : ''}>
    <label className="block text-xs font-semibold text-[#1C1014] mb-1.5">
      {label}{name !== 'email' && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${readOnly ? 'bg-[#f9f9f9] text-[#888]' : 'bg-white'} ${
          touched && error
            ? 'border-red-400 bg-red-50 focus:border-red-400'
            : 'border-[#eee] focus:border-[#8B1A2F]'
        }`}
      />
      {suffix && <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>}
    </div>
    {touched && error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useStore();
  const shipping = cartTotal >= 999 ? 0 : 79;
  const total = cartTotal + shipping;

  const [form, setForm] = useState<Form>({ name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [success, setSuccess] = useState<string | false>(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState('');

  const handleChange = (k: keyof Form, v: string) => {
    if (k === 'phone') v = v.replace(/\D/g, '').slice(0, 10);
    const updated = { ...form, [k]: v };
    setForm(updated);
    if (touched[k]) setErrors(validate(updated));
    if (k === 'pincode' && v.length === 6) fetchPincode(v, updated);
    if (k === 'pincode' && v.length < 6) { setPincodeError(''); }
  };

  const fetchPincode = async (pin: string, current: Form) => {
    setPincodeLoading(true);
    setPincodeError('');
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      if (data[0].Status === 'Success') {
        const post = data[0].PostOffice[0];
        const updated = { ...current, city: post.District, state: post.State };
        setForm(updated);
        setErrors(validate(updated));
      } else {
        setPincodeError('Invalid pincode');
      }
    } catch {
      setPincodeError('Could not fetch pincode data');
    }
    setPincodeLoading(false);
  };

  const handleBlur = (k: keyof Form) => {
    setTouched(t => ({ ...t, [k]: true }));
    setErrors(e => ({ ...e, ...validate(form) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((a, k) => ({ ...a, [k]: true }), {} as Record<keyof Form, boolean>);
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const now = new Date();
    const dateStr = now.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const items = cart.map((i, idx) =>
      `${idx + 1}. ${i.product.name} (${i.product.weight}) - Qty: ${i.quantity} - Rs.${i.product.price * i.quantity}`
    ).join('%0A');

    const msg =
      `*VARAAHA CASHEWS - New Order*%0A` +
      `Customer: ${form.name}%0A` +
      `Mobile: ${form.phone}%0A` +
      (form.email ? `Email: ${form.email}%0A` : '') +
      `%0A*Order Items*%0A${items}%0A%0A` +
      `Subtotal: Rs.${cartTotal}%0A` +
      `Shipping: ${shipping === 0 ? 'FREE' : 'Rs.' + shipping}%0A` +
      `*Total: Rs.${total}*%0A%0A` +
      `*Delivery Address*%0A` +
      `${form.address}, ${form.city}, ${form.state} - ${form.pincode}%0A%0A` +
      `Order Time: ${dateStr}`;

    const waUrl = `https://wa.me/${WHATSAPP}?text=${msg}`;
    setSuccess(waUrl);
    clearCart();
    window.open(waUrl, '_blank');
  };

  const isValid = Object.keys(validate(form)).length === 0;

  if (success) return (
    <div className="pt-16 min-h-screen bg-[#FDF8F9] flex items-center justify-center px-4">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={44} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#1C1014] mb-2">Order Confirmed!</h2>
        <p className="text-[#7A6A6E] text-sm mb-6">Click the button below to complete your order on WhatsApp.</p>
        <a
          href={success}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg text-sm font-semibold hover:bg-[#1ebe5d] transition-colors"
        >
          <MessageCircle size={16} /> Open WhatsApp to Confirm Order
        </a>
        <Link to="/" className="block mt-4 text-sm text-[#8B1A2F] hover:underline">← Back to Home</Link>
      </motion.div>
    </div>
  );

  return (
    <PageTransition>
      <div className="pt-16 min-h-screen bg-[#FDF8F9]">
        <div className="bg-white border-b border-[#eee]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-[#1C1014]">Checkout</h1>
            <p className="text-sm text-[#7A6A6E] mt-1">{cart.length} item{cart.length !== 1 ? 's' : ''} in your order</p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-semibold text-[#1C1014] mb-4">Your cart is empty</p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B1A2F] text-white rounded-lg text-sm font-semibold">
              Shop Now <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-[#eee] p-6">
                    <h2 className="font-bold text-[#1C1014] mb-5">Delivery Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field name="name"    label="Full Name"        placeholder="John Doe"         value={form.name}    error={errors.name}    touched={touched.name}    onChange={v => handleChange('name', v)}    onBlur={() => handleBlur('name')} />
                      <Field name="phone"   label="Mobile Number"    placeholder="9876543210"       value={form.phone}   error={errors.phone}   touched={touched.phone}   onChange={v => handleChange('phone', v)}   onBlur={() => handleBlur('phone')} />
                      <Field name="email"   label="Email (Optional)" placeholder="john@email.com"   value={form.email}   error={errors.email}   touched={touched.email}   onChange={v => handleChange('email', v)}   onBlur={() => handleBlur('email')} type="email" full />
                      <Field name="address" label="Full Address"     placeholder="House No, Street" value={form.address} error={errors.address} touched={touched.address} onChange={v => handleChange('address', v)} onBlur={() => handleBlur('address')} full />
                      <Field
                        name="pincode" label="Pincode" placeholder="500001"
                        value={form.pincode} error={pincodeError || errors.pincode} touched={touched.pincode}
                        onChange={v => handleChange('pincode', v)} onBlur={() => handleBlur('pincode')}
                        suffix={pincodeLoading ? <Loader size={14} className="animate-spin text-[#8B1A2F]" /> : null}
                      />
                      <Field name="city"  label="City"  placeholder="Auto-filled" value={form.city}  error={errors.city}  touched={touched.city}  onChange={v => handleChange('city', v)}  onBlur={() => handleBlur('city')}  readOnly={pincodeLoading} />
                      <Field name="state" label="State" placeholder="Auto-filled" value={form.state} error={errors.state} touched={touched.state} onChange={v => handleChange('state', v)} onBlur={() => handleBlur('state')} readOnly={pincodeLoading} full />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#eee] p-6 h-fit sticky top-20">
                  <h2 className="font-bold text-[#1C1014] mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4 pb-4 border-b border-[#eee]">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex justify-between text-xs text-[#5A3E20]">
                        <span className="truncate pr-2">{item.product.name} × {item.quantity}</span>
                        <span className="shrink-0 font-medium">₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 text-sm mb-4 pb-4 border-b border-[#eee]">
                    <div className="flex justify-between text-[#5A3E20]"><span>Subtotal</span><span>₹{cartTotal}</span></div>
                    <div className="flex justify-between text-[#5A3E20]">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                    </div>
                    {shipping > 0 && <p className="text-xs text-[#8B1A2F]">Add ₹{999 - cartTotal} more for free shipping</p>}
                  </div>
                  <div className="flex justify-between font-bold text-[#1C1014] text-base mb-5">
                    <span>Total</span><span>₹{total}</span>
                  </div>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all ${
                      isValid
                        ? 'bg-[#25D366] text-white hover:bg-[#1ebe5d]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <MessageCircle size={16} /> Place Order via WhatsApp
                  </button>
                  {!isValid && <p className="text-xs text-center text-[#7A6A6E] mt-2">Fill all required fields to continue</p>}
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
