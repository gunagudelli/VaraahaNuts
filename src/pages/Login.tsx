import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <PageTransition>
      <div className="pt-16 min-h-screen bg-[#FDFAF4] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#C9A84C] flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <h1 className="text-2xl font-bold text-[#2C2416]">Welcome Back</h1>
            <p className="text-sm text-[#7A6A56] mt-1">Sign in to your Varaaha account</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#F0E6D3] p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-[#5C3D1E] mb-1.5">Email Address</label>
                <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-[#E8D5B0] text-sm text-[#2C2416] focus:outline-none focus:border-[#C9A84C]" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5C3D1E] mb-1.5">Password</label>
                <div className="relative">
                  <input type={show ? 'text' : 'password'} required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="w-full px-4 py-3 pr-11 rounded-xl border border-[#E8D5B0] text-sm text-[#2C2416] focus:outline-none focus:border-[#C9A84C]" placeholder="••••••••" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A6A56]">
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-[#5C3D1E] cursor-pointer">
                  <input type="checkbox" className="accent-[#C9A84C]" /> Remember me
                </label>
                <a href="#" className="text-xs text-[#C9A84C] hover:underline">Forgot password?</a>
              </div>
              <button type="submit" className="w-full py-3 bg-[#5C3D1E] text-white font-semibold rounded-full hover:bg-[#C9A84C] transition-colors text-sm">
                Sign In
              </button>
            </form>
            <p className="text-center text-xs text-[#7A6A56] mt-5">
              Don't have an account? <Link to="/register" className="text-[#C9A84C] font-semibold hover:underline">Create one</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Login;
