import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  Award, Leaf, ShieldCheck, Truck, Factory, Users,
  MapPin, Zap, ArrowRight, CheckCircle2,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import heroBg from '../assets/cashew-bg.png';

const GREEN = '#0B5D3B';
const GOLD  = '#D4A017';

/* ── Animated counter ── */
const AnimCounter: React.FC<{ value: string; label: string; delay?: number }> = ({ value, label, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isNum = /^\d+/.test(value);
  const num = parseInt(value);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1400, bounce: 0 });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => { if (inView && isNum) mv.set(num); }, [inView]);
  React.useEffect(() => spring.on('change', v => setDisplay(Math.floor(v))), [spring]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: `0 16px 36px ${GREEN}15` }}
      className="relative p-6 rounded-3xl border text-center cursor-default overflow-hidden"
      style={{ background: '#fff', borderColor: '#EDE5D8' }}
    >
      <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-3xl"
        style={{ background: `linear-gradient(90deg, ${GREEN}, ${GOLD})` }} />
      <div className="text-3xl font-extrabold mb-1" style={{ color: GREEN }}>
        {isNum ? `${display}${value.replace(/^\d+/, '')}` : value}
      </div>
      <div className="text-xs text-[#888] font-medium uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

/* ── Scroll reveal ── */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; dir?: 'up' | 'left' | 'right' }> = ({
  children, delay = 0, dir = 'up',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: dir === 'up' ? 28 : 0, x: dir === 'left' ? -28 : dir === 'right' ? 28 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

/* ── Section label ── */
const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <p className="text-xs font-bold uppercase tracking-[0.22em] mb-2" style={{ color: GOLD }}>{text}</p>
);

const About: React.FC = () => (
  <PageTransition>
    <div className="pt-[68px]" style={{ background: '#FDFAF4' }}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'rgba(7,31,20,0.72)' }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: GOLD }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-8 blur-3xl" style={{ background: '#fff' }} />
          {/* Decorative lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px opacity-10"
              style={{ width: `${30 + i * 15}%`, top: `${15 + i * 16}%`, left: `${i * 8}%`, background: '#fff' }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(212,160,23,0.2)', color: GOLD, border: `1px solid ${GOLD}50` }}
          >
            <Award size={12} /> Est. — Narsipatnam, AP
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight"
          >
            Sri Varaaha<br />
            <span style={{ color: GOLD }}>Cashew Processing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="text-white/70 text-base max-w-xl mx-auto leading-relaxed"
          >
            A premier cashew processing unit from Andhra Pradesh — farm-fresh, hygienically processed, and trusted by businesses across India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26 }}
            className="mt-7 flex flex-wrap gap-3 justify-center"
          >
            <Link to="/shop">
              <motion.span
                whileHover={{ scale: 1.05, boxShadow: `0 8px 24px rgba(0,0,0,0.2)` }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white cursor-pointer"
                style={{ background: GOLD }}
              >
                Shop Now <ArrowRight size={14} />
              </motion.span>
            </Link>
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                Contact Us
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-10 bg-white border-b" style={{ borderColor: '#EDE5D8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: 'W180–W450', label: 'Premium Grades',    delay: 0    },
              { value: 'FSSAI',     label: 'Certified Facility', delay: 0.08 },
              { value: '10kg+',     label: 'Bulk Order Ready',  delay: 0.16 },
              { value: '100%',      label: 'Natural Process',   delay: 0.24 },
            ].map(s => <AnimCounter key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <Reveal>
                <SectionLabel text="Who We Are" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                  A Premier Cashew<br />Processing Unit
                </h2>
              </Reveal>
              <div className="space-y-4">
                {[
                  'Sri Varaaha Cashew Processing is a premier cashew processing unit based out of Narsipatnam, Visakhapatnam District, Andhra Pradesh — driven by a commitment to excellence in processing and supplying top-grade, natural cashew nuts.',
                  'Equipped with advanced boiling, cutting, and grading machinery, every cashew is processed under the highest hygienic standards — FSSAI compliant, without artificial preservatives.',
                  'We take pride in being a reliable, long-term B2B partner capable of fulfilling bulk requirements while maintaining consistent quality.',
                ].map((p, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <p className="text-[#555] text-sm leading-relaxed">{p}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.3}>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  {[
                    'FSSAI Certified', 'No Preservatives',
                    'Farm Direct', 'Bulk Ready',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={15} style={{ color: GREEN }} />
                      <span className="text-sm text-[#444] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal dir="right">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl overflow-hidden shadow-2xl"
                  style={{ boxShadow: `0 24px 64px ${GREEN}22` }}
                >
                  <video autoPlay muted loop playsInline className="w-full object-cover max-h-[440px]">
                    <source src="https://media.istockphoto.com/id/2236689844/video/rotating-ripe-cashew-apples-nuts-with-shell-attached-drupe-with-edible-seed.mp4?s=mp4-640x640-is&k=20&c=owtpU-WIRAIboanoFx41xSKhHSPXonmtR82YaLdVrko=" type="video/mp4" />
                  </video>
                </motion.div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.4, type: 'spring' }}
                  className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl shadow-xl border text-sm font-semibold"
                  style={{ background: '#fff', borderColor: '#EDE5D8', color: GREEN }}
                >
                  🏭 Narsipatnam, AP
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Product Range ── */}
      <section className="py-14" style={{ background: '#F8F4EE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Reveal><SectionLabel text="What We Offer" /></Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-3">Our Premium Product Range</h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-[#777] text-sm max-w-xl mx-auto">
                Meticulously sorted cashews in bulk packaging — standard 10kg buckets and tins.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { grade: 'W180', tag: 'King of Cashews',       desc: 'The largest, highest-grade premium cashews — perfect for luxury gifting and high-end retail.',                            color: '#f59e0b' },
              { grade: 'W240', tag: 'Jumbo Whole',           desc: 'Highly sought-after large wholes, widely preferred for premium sweets, bakeries, and festive packs.',                    color: GREEN    },
              { grade: 'W320', tag: 'Standard Whole',        desc: 'The most popular globally demanded standard-sized wholes, ideal for daily consumption and culinary use.',                 color: GOLD     },
              { grade: 'Pieces & Splits', tag: 'JH · K · LWP · SWP', desc: 'Carefully graded broken cashews tailored for commercial kitchens, sweet manufacturing, and catering.',         color: '#6366f1' },
            ].map(({ grade, tag, desc, color }, i) => (
              <Reveal key={grade} delay={i * 0.09} dir="up">
                <motion.div
                  whileHover={{ y: -6, boxShadow: `0 20px 48px ${color}18` }}
                  transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                  className="p-6 rounded-3xl bg-white border cursor-default relative overflow-hidden"
                  style={{ borderColor: `${color}28` }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 blur-xl" style={{ background: color }} />
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `${color}14` }}
                  >
                    <Award size={20} style={{ color }} />
                  </div>
                  <h3 className="font-bold text-[#1a1a1a] text-base mb-1">{grade}</h3>
                  <p className="text-xs font-bold mb-2" style={{ color }}>{tag}</p>
                  <p className="text-xs text-[#777] leading-relaxed">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Partner ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Reveal><SectionLabel text="Our Promise" /></Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a]">Why Partner With Us?</h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Leaf,        title: '100% Natural & Fresh',        desc: 'Processed to retain authentic flavor, creamy texture, and natural freshness.',                                  color: GREEN    },
              { icon: Factory,     title: 'State-of-the-Art Processing', desc: 'Modern machinery for precise cutting, peeling, and grading to minimize damage.',                               color: '#6366f1' },
              { icon: ShieldCheck, title: 'Strict Quality & Hygiene',    desc: 'Processed in a clean, monitored environment meeting all FSSAI regulatory standards.',                          color: '#10b981' },
              { icon: Truck,       title: 'Robust Supply Chain',         desc: 'Efficient bulk order processing, secure packaging, and reliable logistics for timely delivery.',                color: GOLD     },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <Reveal key={title} delay={i * 0.09}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: `0 20px 48px ${color}18` }}
                  transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                  className="p-6 rounded-3xl border cursor-default relative overflow-hidden"
                  style={{ background: `${color}07`, borderColor: `${color}20` }}
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </motion.div>
                  <h4 className="font-bold text-[#1a1a1a] text-sm mb-2">{title}</h4>
                  <p className="text-xs text-[#666] leading-relaxed">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Vision Values ── */}
      <section
        className="py-14 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #0a4a2e 100%)` }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-8 blur-3xl" style={{ background: GOLD }} />
          <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full opacity-8 blur-3xl" style={{ background: '#fff' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Reveal><SectionLabel text="Our Foundation" /></Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Mission, Vision & Values</h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Zap,   title: 'Our Mission', desc: 'To process and supply the finest quality cashews with uncompromising food safety — becoming the most trusted B2B cashew partner in India.' },
              { icon: Award, title: 'Our Vision',  desc: 'To be recognized as a globally trusted cashew processing brand from Andhra Pradesh, known for quality, transparency, and integrity.' },
              { icon: Users, title: 'Our Values',  desc: 'Uncompromising quality, food safety, hygienic processing, honest business practices, and long-term partnerships built on trust.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -5, background: 'rgba(255,255,255,0.1)' }}
                  transition={{ type: 'spring', stiffness: 260 }}
                  className="p-7 rounded-3xl text-center cursor-default"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.12 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${GOLD}25` }}
                  >
                    <Icon size={22} style={{ color: GOLD }} />
                  </motion.div>
                  <h3 className="font-bold text-white text-base mb-3">{title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="py-12" style={{ background: '#F8F4EE' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal><SectionLabel text="Find Us" /></Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Our Location</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-[#555] text-sm mb-5">
              Kusarlapudi Village, Narsipatnam, Visakhapatnam District, Andhra Pradesh, India.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://maps.app.goo.gl/96qryYepNJW9dXVT8"
                target="_blank" rel="noreferrer"
              >
                <motion.span
                  whileHover={{ scale: 1.05, boxShadow: `0 8px 24px ${GREEN}28` }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold text-white cursor-pointer"
                  style={{ background: GREEN }}
                >
                  <MapPin size={13} /> View on Google Maps
                </motion.span>
              </a>
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold border cursor-pointer"
                  style={{ color: GREEN, borderColor: GREEN + '50', background: GREEN + '08' }}
                >
                  Get In Touch <ArrowRight size={12} />
                </motion.span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  </PageTransition>
);

export default About;
