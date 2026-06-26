import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import newLogo from '../assets/Jun 19, 2026, 03_55_08 PM.png';
import footerBg from '../assets/cashew-bg.png';

const GREEN = '#0B5D3B';
const GOLD  = '#D4A017';

const socialLinks = [
  { label: 'IG', href: '#', title: 'Instagram' },
  { label: 'FB', href: '#', title: 'Facebook'  },
  { label: 'YT', href: '#', title: 'YouTube'   },
  {
    label: (
      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.428a.75.75 0 00.916.916l5.569-1.476A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.696 9.696 0 01-4.964-1.365l-.356-.211-3.684.976.976-3.587-.232-.371A9.696 9.696 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
      </svg>
    ),
    href: 'https://wa.me/919704671552',
    title: 'WhatsApp',
  },
];

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <li>
    <Link to={to}
      className="group flex items-center gap-1 text-xs text-[#9AB49A] transition-colors duration-200 hover:text-[#D4A017]">
      <motion.span
        className="inline-block"
        whileHover={{ x: 3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {children}
      </motion.span>
    </Link>
  </li>
);

const Footer: React.FC = () => (
  <footer className="relative overflow-hidden" style={{ background: '#071F14', backgroundImage: `url(${footerBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(7,31,20,0.88)' }} />
    {/* Subtle top gradient */}
    <div
      className="absolute inset-x-0 top-0 h-px"
      style={{ background: `linear-gradient(90deg, transparent, ${GREEN}80, ${GOLD}60, ${GREEN}80, transparent)` }}
    />
    {/* Decorative blobs */}
    <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: GREEN }} />
    <div className="absolute -bottom-16 right-0 w-48 h-48 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: GOLD }} />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* ── Brand ── */}
        <div>
          <Link to="/" className="inline-block mb-5">
            <motion.img
              src={newLogo} alt="Varaaha Cashews"
              className="h-20 w-auto object-contain"
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 280 }}
            />
          </Link>
          <p className="text-xs text-[#7A9A7A] leading-relaxed mb-5">
            Farm-fresh premium cashews, hygienically processed and delivered directly from our facility in Andhra Pradesh.
          </p>
          {/* Social icons */}
          <div className="flex gap-2">
            {socialLinks.map(({ label, href, title }, i) => (
              <motion.a
                key={i} href={href} title={title}
                target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.18, backgroundColor: GOLD, color: '#fff' }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold transition-colors"
                style={{ background: `${GREEN}80`, color: GOLD }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-[0.18em]">Quick Links</h4>
          <ul className="space-y-2.5">
            {[['Home', '/'], ['Shop', '/shop'], ['About Us', '/about'], ['Contact Us', '/contact'], ['FAQ', '/faq']].map(([label, to]) => (
              <FooterLink key={label} to={to}>{label}</FooterLink>
            ))}
          </ul>
        </div>

        {/* ── Products ── */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-[0.18em]">Our Products</h4>
          <ul className="space-y-2.5">
            {[
              'W180 King Cashews',
              'W240 Jumbo Whole',
              'W320 Standard',
              'Pieces & Splits',
              'Gift Packs',
            ].map(label => (
              <li key={label}>
                <Link
                  to="/shop"
                  className="text-xs text-[#9AB49A] hover:text-[#D4A017] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-[0.18em]">Contact</h4>
          <ul className="space-y-3.5">
            <li className="flex gap-2.5 items-start">
              <MapPin size={13} className="shrink-0 mt-0.5" style={{ color: GOLD }} />
              <span className="text-xs text-[#9AB49A] leading-relaxed">
                Kusarlapudi Village, Narsipatnam,<br />Visakhapatnam, AP
              </span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Phone size={13} className="shrink-0" style={{ color: GOLD }} />
              <a href="tel:+919704671552" className="text-xs text-[#9AB49A] hover:text-[#D4A017] transition-colors">
                +91 97046 71552
              </a>
            </li>
            <li className="flex gap-2.5 items-center">
              <Mail size={13} className="shrink-0" style={{ color: GOLD }} />
              <a href="mailto:hello@varaahacashews.com" className="text-xs text-[#9AB49A] hover:text-[#D4A017] transition-colors">
                hello@varaahacashews.com
              </a>
            </li>
          </ul>

          {/* WhatsApp pill */}
          <motion.a
            href="https://wa.me/919704671552"
            target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 6px 20px rgba(37,211,102,0.28)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-white text-xs font-semibold"
            style={{ background: '#25D366' }}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.428a.75.75 0 00.916.916l5.569-1.476A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.696 9.696 0 01-4.964-1.365l-.356-.211-3.684.976.976-3.587-.232-.371A9.696 9.696 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            Chat on WhatsApp
          </motion.a>
        </div>

      </div>
    </div>

    {/* Bottom bar */}
    <div className="relative border-t" style={{ borderColor: `${GREEN}50` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs" style={{ color: '#4A6A4A' }}>
          © {new Date().getFullYear()} Varaaha Cashew Processing. All rights reserved.
        </p>
        <p className="text-xs" style={{ color: '#4A6A4A' }}>
          Developed by{' '}
          <a href="tel:+918978455447" className="font-semibold hover:opacity-80 transition-opacity" style={{ color: GOLD }}>
            Guna · +91 89784 55447
          </a>
        </p>
        <div className="flex items-center gap-4">
          {[['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms']].map(([label, to]) => (
            <Link
              key={to} to={to}
              className="text-xs transition-colors hover:text-[#D4A017] flex items-center gap-1"
              style={{ color: '#4A6A4A' }}
            >
              {label} <ArrowUpRight size={10} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
