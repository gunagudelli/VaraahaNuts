import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, Award, Truck, Star, ShieldCheck, Zap, Leaf, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, testimonials } from '../data/products';
import PageTransition from '../components/PageTransition';
import { WHATSAPP_URL } from '../config';
import heroImg   from '../assets/ChatGPT Image Jun 17, 2026, 04_18_18 PM.png';
import bulkVideo from '../assets/WhatsApp Video 2026-06-16 at 1.37.27 PM.mp4';
import bgVideo   from '../assets/14666827_1080_1920_30fps.mp4';
import bsBg      from '../assets/ChatGPT Image Jun 26, 2026, 05_48_04 PM.png';

const GREEN = '#0B5D3B';
const GOLD  = '#D4A017';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15 } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'backOut' } },
};

const TestimonialsCarousel: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const CARD_WIDTH = 340;
  const GAP = 20;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(a => (a + 1) % total);
    }, 3000);
    return () => clearInterval(interval);
  }, [total]);

  useEffect(() => {
    if (!trackRef.current) return;
    const offset = active * (CARD_WIDTH + GAP);
    trackRef.current.style.transform = `translateX(-${offset}px)`;
  }, [active]);

  return (
    <div className="relative overflow-hidden px-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #EDE0C8, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #EDE0C8, transparent)' }} />

      <div
        ref={trackRef}
        className="flex"
        style={{ gap: GAP, transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' }}
      >
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            className="shrink-0 p-6 rounded-2xl border border-[#D4B896] bg-[#FBF5EC] transition-all duration-300"
            style={{
              width: CARD_WIDTH,
              opacity: i === active ? 1 : 0.5,
              transform: i === active ? 'scale(1)' : 'scale(0.95)',
              boxShadow: i === active ? '0 12px 32px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <div className="flex mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={13} style={{ fill: j < t.rating ? GOLD : '#ddd', color: j < t.rating ? GOLD : '#ddd' }} />
              ))}
            </div>
            <p className="text-sm text-[#555] leading-relaxed mb-5">"{t.comment}"</p>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs font-bold text-[#1a1a1a]">{t.name}</p>
                <p className="text-[11px] text-[#888]">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? GREEN : '#D4C4A8',
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const featuredProducts = products.filter(p => p.isFeatured);
  const bestSellers = products.filter(p =>
    ['wmix-cashews-1kg', 'wmix-cashews-500g', 'wmix-cashews-250g'].includes(p.slug)
  ).sort((a, b) => b.price - a.price);

  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 400], [0, 40]);

  return (
    <PageTransition>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="grid lg:grid-cols-2 min-h-[580px] pt-[68px] overflow-hidden">

        {/* Left */}
        <motion.div
          className="flex items-center px-5 sm:px-12 lg:px-16 py-10 lg:py-16"
          style={{ background: '#F5EBDD' }}
          initial="hidden" animate="show" variants={stagger}
        >
          <div className="max-w-lg">
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full"
              style={{ background: GOLD + '25', border: `1px solid ${GOLD}60` }}>
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GREEN }}>
                Premium Quality Cashews
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl font-bold leading-tight mb-4 text-[#1a1a1a]">
              Pure.{' '}
              <motion.span
                style={{ color: GREEN }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}>
                Natural.
              </motion.span>{' '}
              <motion.span
                style={{ color: GOLD }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}>
                Delicious.
              </motion.span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[#555] text-sm sm:text-base leading-relaxed mb-8">
              Handpicked premium cashews sourced directly from trusted farms — hygienically packed and delivered fresh to your door.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link to="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3 text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
                  style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}40` }}>
                  Shop Now <ArrowRight size={15} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link to="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-full border-2 hover:opacity-80 transition-opacity"
                  style={{ borderColor: GOLD, color: GOLD }}>
                  View All Products
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right — parallax image */}
        <div className="relative min-h-[260px] lg:min-h-[580px] overflow-hidden">
          <motion.img
            src={heroImg} alt="Varaaha Premium Cashews"
            className="absolute inset-0 w-full h-full object-contain object-center"
            style={{ background: '#F5EBDD', y: heroImgY }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </section>

      {/* ── Features Strip ───────────────────────────────────── */}
      <section className="py-6 bg-white border-y border-[#e8e2d6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: Leaf,  title: '100% Natural',    desc: 'No artificial additives' },
              { icon: Award, title: 'Premium Quality', desc: 'W180 to W450 grades' },
              { icon: Truck, title: 'Fast Delivery',   desc: '3–5 business days' },
              { icon: Leaf,  title: 'Farm Fresh',      desc: 'Directly from AP farms' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3, boxShadow: `0 8px 20px ${GREEN}15` }}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#F8F5EF] border border-[#ece6db] cursor-default transition-shadow">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: GREEN + '15' }}>
                  <Icon size={18} style={{ color: GREEN }} />
                </motion.div>
                <div>
                  <p className="font-semibold text-[#1a1a1a] text-xs">{title}</p>
                  <p className="text-[11px] text-[#888]">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Sellers ─────────────────────────────────────── */}
      <section className="py-12 sm:py-20 relative overflow-hidden" style={{ background: `linear-gradient(160deg, #FDFAF4 0%, #F5EBDD 60%, #FDFAF4 100%)`, backgroundImage: `url(${bsBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        {/* Overlay for readability */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(253,250,244,0.82)' }} />
        {/* Animated background blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.12, 0.07] }}
          transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fb923c 0%, transparent 70%)', filter: 'blur(70px)' }}
        />
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.06, 0.10, 0.06] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)', filter: 'blur(55px)' }}
        />
        {/* Floating cashew shapes */}
        {[
          { top: '8%',  left: '6%',   scale: 1,    dur: 4,   delay: 0,   rotate: 20  },
          { top: '65%', left: '4%',   scale: 0.7,  dur: 5,   delay: 1,   rotate: -15 },
          { top: '15%', right: '5%',  scale: 0.85, dur: 4.5, delay: 0.5, rotate: 140 },
          { top: '70%', right: '6%',  scale: 1.1,  dur: 6,   delay: 1.5, rotate: -40 },
          { top: '40%', left: '2%',   scale: 0.6,  dur: 3.5, delay: 2,   rotate: 80  },
          { top: '35%', right: '3%',  scale: 0.75, dur: 5.5, delay: 0.8, rotate: 200 },
        ].map((d, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none hidden sm:block"
            style={{ top: d.top, left: (d as {left?:string}).left, right: (d as {right?:string}).right, opacity: 0.18 }}
            animate={{ y: [0, -16, 0], rotate: [d.rotate, d.rotate + 12, d.rotate] }}
            transition={{ repeat: Infinity, duration: d.dur, ease: 'easeInOut', delay: d.delay }}
          >
            <svg width={48 * d.scale} height={48 * d.scale} viewBox="0 0 64 64" fill="none">
              <path
                d="M12 48 C8 36, 6 24, 14 16 C22 8, 36 8, 46 16 C56 24, 58 38, 50 48 C44 55, 32 58, 22 54 C14 51, 10 52, 12 48 Z"
                fill={i % 2 === 0 ? GREEN : GOLD}
                opacity="0.9"
              />
              <path
                d="M20 44 C18 36, 17 26, 22 20 C28 13, 38 13, 44 20 C50 27, 50 38, 44 44"
                stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"
              />
            </svg>
          </motion.div>
        ))}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="flex items-end justify-between mb-12">
            <div>
              <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: GOLD }}>Top Picks</motion.p>
              <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight">
                Best Seller <span style={{ color: GREEN }}>Products</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="mt-3 flex items-center gap-2">
                <div className="h-1 w-10 rounded-full" style={{ background: GREEN }} />
                <div className="h-1 w-4 rounded-full" style={{ background: GOLD }} />
                <div className="h-1 w-2 rounded-full" style={{ background: GREEN, opacity: 0.4 }} />
              </motion.div>
            </div>
            <motion.div variants={fadeUp}>
              <Link
                to="/shop"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 hover:opacity-80 transition-all"
                style={{ borderColor: GREEN, color: GREEN }}
              >
                View All <ChevronRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-3 gap-5 sm:gap-8 max-w-3xl mx-auto">
            {(bestSellers.length ? bestSellers : featuredProducts).map((p, i) =>
              <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>



      {/* ── Why Choose Us ────────────────────────────────────── */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Our Promise</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]">Why Choose Varaaha?</motion.h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="grid grid-cols-2 gap-5">
              {[
                { icon: Leaf,        title: 'Farm Fresh',          desc: 'Directly sourced from certified AP farms ensuring peak freshness.' },
                { icon: Award,       title: 'Export Quality',      desc: 'W180–W450 premium grades meeting international standards.' },
                { icon: ShieldCheck, title: 'Hygienically Packed', desc: 'ISO-standard facility, zero artificial additives or preservatives.' },
                { icon: Zap,         title: 'Rich in Nutrition',   desc: 'Packed with protein, healthy fats, and essential minerals.' },
              ].map(({ icon: Icon, title, desc }) => (
                <motion.div key={title} variants={scaleIn}
                  whileHover={{ y: -5, boxShadow: `0 12px 30px ${GREEN}18` }}
                  className="p-5 rounded-2xl border border-[#e8e2d6] transition-all bg-[#F8F5EF] cursor-default">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: GREEN + '15' }}>
                    <Icon size={18} style={{ color: GREEN }} />
                  </motion.div>
                  <h4 className="font-bold text-[#1a1a1a] text-sm mb-1">{title}</h4>
                  <p className="text-xs text-[#777] leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ boxShadow: `0 20px 50px ${GREEN}25` }}>
              <video autoPlay muted loop playsInline className="w-full h-full object-cover max-h-[480px]">
                <source src={bgVideo} type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Bulk Orders Banner ───────────────────────────────── */}
      <section className="py-14 bg-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden relative"
            style={{ background: GREEN }}>
            <motion.div
              animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute right-0 top-0 w-72 h-72 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3"
              style={{ background: GOLD }} />
            <div className="relative z-10 grid lg:grid-cols-2">
              <motion.div
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
                className="p-10 lg:p-14">
                <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: GOLD }}>For Businesses</motion.p>
                <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-white mb-4">Bulk Orders &<br />Corporate Gifts</motion.h2>
                <motion.p variants={fadeUp} className="text-white/60 text-sm leading-relaxed mb-6">
                  Custom-branded premium cashew gift boxes for Diwali, Christmas & corporate events. Special pricing for orders above 10kg.
                </motion.p>
                <motion.ul variants={stagger} className="space-y-2 mb-8">
                  {['Custom branding & packaging', 'Pan-India delivery', 'Minimum 10kg order', 'Festival & event specials'].map(item => (
                    <motion.li key={item} variants={fadeUp} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD }} />{item}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-full text-sm"
                    style={{ background: GOLD, boxShadow: `0 8px 20px ${GOLD}50` }}>
                    Get a Quote <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </motion.div>
              <div className="relative overflow-hidden rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
                <video src={bulkVideo} autoPlay muted loop playsInline className="w-full h-48 sm:h-64 lg:h-full object-cover lg:min-h-[320px]" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0B5D3B]/30" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials carousel ───────────────────────────── */}
      <section className="py-16 overflow-hidden" style={{ background: '#EDE0C8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="text-center mb-10">
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Reviews</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]">What Customers Say</motion.h2>
          </motion.div>
        </div>
        <TestimonialsCarousel />
      </section>



      {/* ── WhatsApp Float ───────────────────────────────────── */}
      <motion.a
        href={`${WHATSAPP_URL}?text=Hello Sri Varaaha Cashews! I would like to know more about your products.`}
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}>
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.428a.75.75 0 00.916.916l5.569-1.476A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.696 9.696 0 01-4.964-1.365l-.356-.211-3.684.976.976-3.587-.232-.371A9.696 9.696 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
      </motion.a>

    </PageTransition>
  );
};

export default Home;
