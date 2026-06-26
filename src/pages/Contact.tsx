import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const GREEN = '#0B5D3B';
const GOLD  = '#D4A017';
const WA    = '#25D366';

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.428a.75.75 0 00.916.916l5.569-1.476A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.696 9.696 0 01-4.964-1.365l-.356-.211-3.684.976.976-3.587-.232-.371A9.696 9.696 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
);

/* ── Reveal wrapper ── */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; dir?: 'up' | 'left' | 'right' }> = ({
  children, delay = 0, dir = 'up',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-32px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: dir === 'up' ? 24 : 0, x: dir === 'left' ? -24 : dir === 'right' ? 24 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

/* ── Info card ── */
const InfoCard: React.FC<{
  icon: React.ElementType; label: string; color: string; delay?: number;
  children: React.ReactNode;
}> = ({ icon: Icon, label, color, delay = 0, children }) => (
  <Reveal delay={delay}>
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 16px 36px ${color}14` }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="p-5 bg-white rounded-3xl border flex gap-4 items-start cursor-default"
      style={{ borderColor: `${color}25` }}
    >
      <motion.div
        whileHover={{ rotate: 10, scale: 1.12 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
        style={{ background: `${color}14` }}
      >
        <Icon size={18} style={{ color }} />
      </motion.div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: GOLD }}>{label}</p>
        {children}
      </div>
    </motion.div>
  </Reveal>
);

/* ── Form input ── */
const Field: React.FC<{
  label: string; id: string; type?: string; rows?: number;
  value: string; onChange: (v: string) => void; placeholder?: string;
}> = ({ label, id, type = 'text', rows, value, onChange, placeholder }) => {
  const [focused, setFocused] = useState(false);
  const base = "w-full px-4 py-3 rounded-2xl border bg-[#F8F4EE] text-sm text-[#1a1a1a] focus:outline-none transition-all resize-none";
  const style: React.CSSProperties = {
    borderColor: focused ? GREEN : '#EDE5D8',
    boxShadow: focused ? `0 0 0 3px ${GREEN}18` : 'none',
  };
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold mb-1.5" style={{ color: focused ? GREEN : '#555' }}>
        {label}
      </label>
      {rows ? (
        <textarea id={id} rows={rows} value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={base} style={style}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
      ) : (
        <input id={id} type={type} value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder} required
          className={base} style={style}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
};

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      const text = `Hello Sri Varaaha Cashew Processing!%0AName: ${encodeURIComponent(form.name)}%0ASubject: ${encodeURIComponent(form.subject)}%0AMessage: ${encodeURIComponent(form.message)}`;
      window.open(`https://wa.me/918978455447?text=${text}`, '_blank');
      setForm({ name: '', subject: '', message: '' });
      setSending(false);
      setSent(true);
    }, 600);
  };

  return (
    <PageTransition>
      <div className="pt-[68px] min-h-screen" style={{ background: '#FDFAF4' }}>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden py-14 sm:py-18"
          style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #0d7a4e 60%, #1a9160 100%)` }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full opacity-8 blur-3xl" style={{ background: '#fff' }} />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ color: GOLD }}
            >
              Get In Touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.55 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.55 }}
              className="text-white/70 text-base max-w-lg mx-auto"
            >
              Reach out for bulk orders, product enquiries, or partnership opportunities. We'd love to hear from you.
            </motion.p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* ── Left — Info ── */}
            <div className="space-y-3">
              <InfoCard icon={MapPin} label="Address" color={GREEN} delay={0}>
                <p className="text-sm font-semibold text-[#1a1a1a]">Sri Varaaha Cashew Processing</p>
                <p className="text-xs text-[#777] mt-0.5 leading-relaxed">
                  Kusarlapudi Village, Narsipatnam<br />
                  Visakhapatnam District, Andhra Pradesh
                </p>
                <a
                  href="https://maps.app.goo.gl/96qryYepNJW9dXVT8"
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: GREEN }}
                >
                  <MapPin size={11} /> View on Maps
                </a>
              </InfoCard>

              <InfoCard icon={Phone} label="Phone" color="#6366f1" delay={0.07}>
                <a href="tel:+918978455447" className="text-sm font-bold text-[#1a1a1a] hover:text-[#6366f1] transition-colors">
                  +91 89784 55447
                </a>
                <p className="text-xs text-[#999] mt-0.5">Mon–Sat · 9:00 AM – 6:00 PM</p>
              </InfoCard>

              <InfoCard icon={Mail} label="Email" color={GOLD} delay={0.14}>
                <a href="mailto:hello@varaahacashews.com"
                  className="text-sm font-bold text-[#1a1a1a] hover:text-[#D4A017] transition-colors">
                  hello@varaahacashews.com
                </a>
                <p className="text-xs text-[#999] mt-0.5">We reply within 24 hours</p>
              </InfoCard>

              <InfoCard icon={Clock} label="Business Hours" color="#10b981" delay={0.21}>
                <p className="text-sm font-semibold text-[#1a1a1a]">Mon – Sat: 9:00 AM – 6:00 PM</p>
                <p className="text-xs text-[#999] mt-0.5">Sunday: Closed</p>
              </InfoCard>

              {/* WhatsApp CTA */}
              <Reveal delay={0.28}>
                <motion.a
                  href="https://wa.me/918978455447?text=Hello%20Sri%20Varaaha%20Cashew%20Processing!%20I%20would%20like%20to%20enquire%20about%20your%20products."
                  target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.03, boxShadow: `0 12px 32px ${WA}30` }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-3xl text-white font-semibold text-sm"
                  style={{ background: `linear-gradient(135deg, #25D366, #1da851)` }}
                >
                  <WaIcon /> Chat on WhatsApp
                </motion.a>
              </Reveal>
            </div>

            {/* ── Right — Form + Map ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Contact Form */}
              <Reveal dir="right">
                <div
                  className="bg-white rounded-3xl border p-6 sm:p-8"
                  style={{ borderColor: '#EDE5D8', boxShadow: '0 4px 24px rgba(11,93,59,0.06)' }}
                >
                  <div className="mb-7">
                    <h2 className="text-xl font-bold text-[#1a1a1a] mb-1">Send a Message</h2>
                    <p className="text-sm text-[#777]">We'll get back to you via WhatsApp within a few hours.</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        className="flex flex-col items-center py-12 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ delay: 0.15, type: 'spring', stiffness: 280 }}
                          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                          style={{ background: `${GREEN}14` }}
                        >
                          <CheckCircle2 size={32} style={{ color: GREEN }} />
                        </motion.div>
                        <p className="text-lg font-bold text-[#1a1a1a] mb-1">Message Sent!</p>
                        <p className="text-sm text-[#777] mb-6">Opening WhatsApp — we'll reply shortly.</p>
                        <motion.button
                          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                          onClick={() => setSent(false)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold border transition-colors"
                          style={{ color: GREEN, borderColor: `${GREEN}40`, background: `${GREEN}08` }}
                        >
                          <Send size={14} /> Send Another
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <Field
                          id="name" label="Full Name"
                          value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))}
                          placeholder="Your full name"
                        />
                        <Field
                          id="subject" label="Subject"
                          value={form.subject} onChange={v => setForm(f => ({ ...f, subject: v }))}
                          placeholder="How can we help?"
                        />
                        <div className="sm:col-span-2">
                          <Field
                            id="message" label="Message" rows={5}
                            value={form.message} onChange={v => setForm(f => ({ ...f, message: v }))}
                            placeholder="Tell us about your requirements, quantity, delivery location..."
                          />
                        </div>
                        <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 items-start">
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.04, boxShadow: `0 8px 28px ${WA}35` }}
                            whileTap={{ scale: 0.97 }}
                            disabled={sending}
                            className="flex items-center gap-2.5 px-7 py-3 text-white font-semibold rounded-2xl text-sm disabled:opacity-70"
                            style={{ background: `linear-gradient(135deg, #25D366, #1da851)` }}
                          >
                            {sending ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white"
                              />
                            ) : <WaIcon />}
                            {sending ? 'Sending…' : 'Send via WhatsApp'}
                          </motion.button>
                          <p className="text-xs text-[#aaa] mt-2 sm:mt-3">
                            Your message will open in WhatsApp
                          </p>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>

              {/* Map */}
              <Reveal delay={0.1} dir="right">
                <motion.div
                  whileHover={{ boxShadow: `0 16px 40px ${GREEN}14` }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl overflow-hidden border"
                  style={{ borderColor: '#EDE5D8', height: 260 }}
                >
                  <iframe
                    src="https://maps.google.com/maps?q=Kusarlapudi+Village+Narsipatnam+Visakhapatnam&output=embed"
                    width="100%" height="100%"
                    style={{ border: 0 }}
                    allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sri Varaaha Cashew Processing Location"
                  />
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default Contact;
