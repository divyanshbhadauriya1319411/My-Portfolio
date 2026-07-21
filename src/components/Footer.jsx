import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaRocket,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import WhatsAppButton from "./WhatsAppButton";

const FOOTER_NAV = [
  { key: "home",       label: "Home",       path: "/" },
  { key: "about",      label: "About",      path: "/about" },
  { key: "skills",     label: "Skills",     path: "/skills" },
  { key: "projects",   label: "Projects",   path: "/projects" },
  { key: "experience", label: "Experience", path: "/experience" },
  { key: "resume",     label: "Resume",     path: "/resume" },
  { key: "contact",    label: "Contact",    path: "/contact" },
];

const SOCIAL_LINKS = [
  { href: "https://github.com/divyanshbhadauriya1319411", icon: <FaGithub size={20} />, label: "GitHub" },
  { href: "https://linkedin.com/in/divyanshbhadauriya", icon: <FaLinkedin size={20} />, label: "LinkedIn" },
  { href: "mailto:divyanshbhadauriya899@gmail.com", icon: <FaEnvelope size={20} />, label: "Email" },
];

const TECH_BADGES = ["React", "Vite", "Tailwind CSS", "Framer Motion", "GSAP"];

/* Tiny Floating Particles Array */
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  top: `${(i * 17) % 90}%`,
  left: `${(i * 23) % 95}%`,
  size: 2 + (i % 3),
  duration: 8 + (i % 6),
  delay: (i % 5) * 0.8,
}));

export default function Footer() {
  const { t } = useTranslation();
  const [isLaunching, setIsLaunching] = useState(false);
  const footerRef = useRef(null);
  const lightRef = useRef(null);
  const ctaBtnRef = useRef(null);

  // Mouse-reactive radial light effect
  const handleMouseMove = (e) => {
    if (!footerRef.current || !lightRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(lightRef.current, {
      x,
      y,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  // Magnetic button physics for CTA button
  const handleBtnMouseMove = (e) => {
    if (!ctaBtnRef.current) return;
    const rect = ctaBtnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(ctaBtnRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleBtnMouseLeave = () => {
    if (!ctaBtnRef.current) return;
    gsap.to(ctaBtnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  // Rocket Launch Back-To-Top Trigger
  const handleBackToTop = () => {
    if (isLaunching) return;
    setIsLaunching(true);

    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setTimeout(() => {
      setIsLaunching(false);
    }, 1600);
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-surface text-primary overflow-hidden pt-[100px] pb-[50px] mt-28 border-t border-default select-none transition-colors duration-500"
    >
      {/* ── Background Effects Suite ─────────────────────────────── */}
      {/* 1. Smooth Top Gradient Blending into Page */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none -translate-y-full transition-colors duration-500" />

      {/* 2. Subtle Grid Mask Background */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.12] pointer-events-none bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:32px_32px]"
        style={{
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />

      {/* 3. Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-30 dark:opacity-70 pointer-events-none" />

      {/* 4. Blurred Blue Glow & Animated Gradient Orbs */}
      <div className="absolute -top-32 left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#2563EB]/10 dark:from-[#2563EB]/20 via-[#38BDF8]/10 dark:via-[#38BDF8]/15 to-indigo-500/10 dark:to-indigo-500/20 blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#38BDF8]/10 dark:from-[#38BDF8]/15 to-indigo-600/10 dark:to-indigo-600/15 blur-[140px] pointer-events-none" />

      {/* 5. Mouse-Reactive Light Effect */}
      <div
        ref={lightRef}
        style={{ transform: "translate(-50%, -50%)" }}
        className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full bg-[#2563EB]/10 dark:bg-[#38BDF8]/12 blur-[130px] pointer-events-none transition-opacity duration-500"
      />

      {/* 6. Tiny Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-[#2563EB] dark:bg-[#38BDF8] shadow-[0_0_8px_rgba(37,99,235,0.3)] dark:shadow-[0_0_8px_#38BDF8] opacity-30 dark:opacity-80"
          />
        ))}
      </div>

      {/* ── Main Container (Max Width 1280px) ────────────────────── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 space-y-20">
        
        {/* Top Section: CTA Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 sm:p-12 rounded-3xl bg-card border border-default backdrop-blur-2xl overflow-hidden shadow-lg shadow-slate-200/60 dark:shadow-2xl group hover:border-[#2563EB] dark:hover:border-white/20 transition-all duration-500"
        >
          {/* Subtle Corner Glow inside card */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-[#2563EB]/20 dark:from-[#2563EB]/30 to-[#38BDF8]/20 dark:to-[#38BDF8]/30 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#38BDF8]/10 border border-[#2563EB]/20 dark:border-[#38BDF8]/25 text-[#2563EB] dark:text-[#38BDF8] text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] animate-pulse" />
                {t("footer.nextStep")}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-primary transition-colors">
                {t("footer.interestedTitle")}
              </h2>
              <p className="text-secondary text-sm sm:text-base leading-relaxed">
                {t("footer.interestedDesc")}
              </p>
            </div>

            {/* Gradient Hire Me CTA with Magnetic Effect & Ripple */}
            <div
              ref={ctaBtnRef}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              className="w-full sm:w-auto shrink-0"
            >
              <Link
                to="/contact"
                className="group/btn relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#38BDF8] text-white font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 overflow-hidden interactive-btn"
              >
                <span className="relative z-10">{t("navbar.hireMe")}</span>
                <FaArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Middle Columns Grid (Brand, Navigation, Connect) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-10 items-start">
          
          {/* Section 1 — Personal Brand (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 space-y-5"
          >
            <Link to="/" className="inline-flex items-center gap-1 text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-primary group transition-colors">
              <span>DIVYANSH</span>
              <span className="text-[#2563EB] dark:text-[#38BDF8] drop-shadow-[0_0_10px_rgba(37,99,235,0.4)] dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.8)] group-hover:scale-125 transition-transform duration-200">.</span>
            </Link>

            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#2563EB] dark:text-[#38BDF8] font-mono uppercase bg-[#2563EB]/10 dark:bg-[#38BDF8]/10 border border-[#2563EB]/20 dark:border-[#38BDF8]/20 px-3 py-1.5 rounded-xl inline-block">
              {t("footer.brandSubtitle")}
            </p>

            <p className="text-secondary text-sm sm:text-base max-w-md leading-relaxed pt-1">
              {t("footer.brandQuote")}
            </p>
          </motion.div>

          {/* Section 2 — Quick Navigation (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 space-y-4"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary font-mono">
              {t("footer.quickNav")}
            </h3>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {FOOTER_NAV.map(({ key, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="group relative inline-flex items-center text-sm font-medium text-secondary hover:text-[#2563EB] dark:hover:text-[#38BDF8] hover:translate-x-1.5 transition-all duration-200 py-1"
                >
                  <span>{t("navbar." + key)}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#38BDF8] rounded-full transition-all duration-300 group-hover:w-full shadow-[0_0_6px_#38BDF8]" />
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Section 3 — Let's Connect (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-4 space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold font-heading text-primary transition-colors">
                {t("footer.connectTitle")}
              </h3>
              <p className="text-xs text-secondary">{t("footer.connectSubtitle")}</p>
            </div>

            {/* Circular Glass Social Buttons */}
            <div className="flex items-center gap-3.5">
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 border border-default backdrop-blur-md flex items-center justify-center text-secondary hover:text-primary hover:bg-[#2563EB]/15 dark:hover:bg-[#2563EB]/25 hover:border-[#2563EB] dark:hover:border-[#38BDF8]/50 hover:-translate-y-1.5 transition-all duration-300 interactive-link shadow-sm dark:shadow-none"
                >
                  <span className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    {icon}
                  </span>
                </a>
              ))}
            </div>

            {/* Location & Email Details */}
            <div className="space-y-2.5 pt-1 text-sm text-secondary">
              <div className="flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-[#2563EB] dark:text-[#38BDF8] shrink-0" />
                <span>{t("footer.location")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-[#2563EB] dark:text-[#38BDF8] shrink-0" />
                <a
                  href="mailto:divyanshbhadauriya899@gmail.com"
                  className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors underline-offset-4 hover:underline"
                >
                  divyanshbhadauriya899@gmail.com
                </a>
              </div>
            </div>

            {/* Status Badge */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t("footer.statusBadge")}
              </span>
            </div>
          </motion.div>

        </div>

        {/* ── Footer Bottom Divider & Badges ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-default pt-8 mt-12 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-secondary transition-colors"
        >
          {/* Left */}
          <p className="font-medium">{t("footer.copyright")}</p>

          {/* Center */}
          <p className="font-semibold text-primary">{t("footer.credit")}</p>

          {/* Right: Animated Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-secondary mr-1">{t("footer.builtWith")}</span>
            {TECH_BADGES.map((badge) => (
              <motion.span
                key={badge}
                whileHover={{ y: -2, scale: 1.05 }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-default font-mono text-[11px] text-secondary hover:border-[#2563EB] dark:hover:border-[#38BDF8]/50 hover:bg-[#2563EB]/15 dark:hover:bg-[#38BDF8]/15 hover:text-primary transition-all cursor-default shadow-sm dark:shadow-none"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Floating WhatsApp Contact Button (Bottom Right, Above Rocket) ──────── */}
      <WhatsAppButton variant="floating" />

      {/* ── Floating Rocket Back-To-Top Button (Bottom Right) ──────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleBackToTop}
          disabled={isLaunching}
          aria-label={t("footer.scrollToTop", "Scroll back to top of page")}
          className="group relative w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(56,189,248,0.8)] hover:scale-110 active:scale-95 transition-all duration-300 interactive-btn touch-target overflow-hidden border border-white/20"
        >
          <motion.div
            animate={
              isLaunching
                ? { y: -60, scale: 1.4, rotate: 0, opacity: 0 }
                : { y: 0, scale: 1, rotate: 0, opacity: 1 }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-12"
          >
            <FaRocket size={18} />
          </motion.div>

          {/* Launching Trail effect inside button */}
          {isLaunching && (
            <motion.div
              initial={{ y: 30, opacity: 1 }}
              animate={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute w-1.5 h-8 rounded-full bg-white blur-[1px]"
            />
          )}
        </button>
      </div>
    </footer>
  );
}
