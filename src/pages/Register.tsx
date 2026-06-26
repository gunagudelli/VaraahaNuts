import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Register: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <PageTransition>
      <div className="pt-16 min-h-screen bg-[#FDFAF4] flex items-center justify-center px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#C9A84C] flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <h1 className="text-2xl font-bold text-[#2C2416]">Create Account</h1>
            <p className="text-sm text-[#7A6A56] mt-1">Join the Varaaha Cashews family</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#F0E6D3] p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {[['name', 'Full Name', 'text', 'John Doe'], ['email', 'Email Address', 'email', 'you@email.com'], ['phone', 'Phone Number', 'tel', '+91 99999 99999']].map(([key, label, type, ph]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-[#5C3D1E] mb-1.5">{label}</label>
                  <input type={type} required value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph} className="w-full px-4 py-3 rounded-xl border border-[#E8D5B0] text-sm text-[#2C2416] focus:outline-none focus:border-[#C9A84C]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-[#5C3D1E] mb-1.5">Password</label>
                <div className="relative">
                  <input type={show ? 'text' : 'password'} required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="w-full px-4 py-3 pr-11 rounded-xl border border-[#E8D5B0] text-sm text-[#2C2416] focus:outline-none focus:border-[#C9A84C]" placeholder="Min. 8 characters" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A6A56]">
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#7A6A56]">By registering, you agree to our <Link to="/terms" className="text-[#C9A84C]">Terms</Link> and <Link to="/privacy" className="text-[#C9A84C]">Privacy Policy</Link>.</p>
              <button type="submit" className="w-full py-3 bg-[#5C3D1E] text-white font-semibold rounded-full hover:bg-[#C9A84C] transition-colors text-sm">
                Create Account
              </button>
            </form>
            <p className="text-center text-xs text-[#7A6A56] mt-5">
              Already have an account? <Link to="/login" className="text-[#C9A84C] font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Register;
