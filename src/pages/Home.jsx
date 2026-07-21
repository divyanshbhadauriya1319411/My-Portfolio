import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaArrowRight,
  FaExternalLinkAlt,
  FaCode,
  FaServer,
  FaDatabase,
  FaMapMarkerAlt,
  FaChevronDown,
  FaCheckCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import profileImg from "../assets/profile.webp";

const HERO_ROLES = [
  "React Developer",
  "Full Stack Developer",
  "MERN Developer",
  "Python Developer",
];

const TARGET_COMPANIES = [
  "Google",
  "Microsoft",
  "Meta",
  "Apple",
  "OpenAI",
  "Stripe",
  "Vercel",
  "Linear",
  "Framer",
];

const TECH_STACK = [
  "Python",
  "Django",
  "Django REST Framework",
  "React 19",
  "PostgreSQL",
  "JavaScript ES6+",
  "Tailwind CSS v4",
  "Docker Basics",
  "GSAP & Framer",
  "REST APIs",
];

const WHY_HIRE_ME = [
  {
    icon: <FaServer className="text-[#2563EB] dark:text-[#38BDF8] text-2xl" />,
    title: "Scalable Backend Systems",
    description:
      "Expertise architecting modular Python & Django REST Framework backends optimized for clean data flow, low query latency, and high resilience.",
  },
  {
    icon: <FaCode className="text-[#2563EB] dark:text-[#38BDF8] text-2xl" />,
    title: "Modern Frontend Delivery",
    description:
      "Crafting responsive, zero-layout-shift single-page applications utilizing React 19, Tailwind CSS, and buttery GSAP/Framer Motion animations.",
  },
  {
    icon: <FaDatabase className="text-[#2563EB] dark:text-[#38BDF8] text-2xl" />,
    title: "Database Modeling & Security",
    description:
      "Proficient in PostgreSQL schema modeling, relational indexing, query optimization, and secure industry authentication standards (JWT, OAuth).",
  },
];

const PREVIEW_PROJECTS = [
  {
    title: "RAMA INTERNATIONAL Platform",
    description:
      "Commercial trading & catalog platform featuring dynamic product search, automated client inquiries, and optimized backend querying.",
    tech: ["React 19", "Django", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/divyanshbhadauriya1319411",
  },
  {
    title: "Rent-Drive Vehicle Portal",
    description:
      "End-to-end rental booking management system complete with multi-state reservations, availability validation, and RESTful API endpoints.",
    tech: ["Python", "Django REST Framework", "React", "SQL"],
    github: "https://github.com/divyanshbhadauriya1319411",
  },
  {
    title: "MNC-Grade Portfolio Architecture",
    description:
      "Multi-page software engineering showcase engineered with Apple & Vercel aesthetics, Lenis smooth scrolling, and custom interactive cursor.",
    tech: ["React 19", "Tailwind CSS v4", "GSAP", "Framer Motion"],
    github: "https://github.com/divyanshbhadauriya1319411",
  },
];

/* 15 Floating Particles for Hero Background */
const HERO_PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  top: `${(i * 19) % 85 + 5}%`,
  left: `${(i * 23) % 90 + 5}%`,
  size: 3 + (i % 4),
  duration: 6 + (i % 5),
  delay: (i % 4) * 0.7,
}));

export default function Home() {
  const { t } = useTranslation();
  const [roleIdx, setRoleIdx] = useState(0);

  const HERO_ROLES = t("home.roles", { returnObjects: true }) || [
    "React Developer",
    "Full Stack Developer",
    "MERN Developer",
    "Python Developer",
  ];

  const WHY_HIRE_ME_DATA = t("home.whyHireMe", { returnObjects: true }) || [];
  const WHY_HIRE_ICONS = [
    <FaServer className="text-[#2563EB] dark:text-[#38BDF8] text-2xl" />,
    <FaCode className="text-[#2563EB] dark:text-[#38BDF8] text-2xl" />,
    <FaDatabase className="text-[#2563EB] dark:text-[#38BDF8] text-2xl" />,
  ];

  const PREVIEW_KEYS = ["rama-international", "rent-drive", "ai-sign-language"];
  const PREVIEW_TECH = [
    ["React.js", "Django REST", "PostgreSQL", "Tailwind CSS"],
    ["React.js", "Node.js/Django", "PostgreSQL", "Tailwind CSS"],
    ["Python", "OpenCV", "TensorFlow", "FastAPI"],
  ];
  const PREVIEW_GITHUB = [
    "https://github.com/divyanshbhadauriya1319411/RAMAINTERNATIONAL",
    "https://github.com/divyanshbhadauriya1319411/Rent-Drive",
    "https://github.com/divyanshbhadauriya1319411",
  ];

  const heroSectionRef = useRef(null);
  const heroLightRef = useRef(null);
  const photoCardRef = useRef(null);
  const photoGlowRef = useRef(null);

  // Cycle role switcher every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % HERO_ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [HERO_ROLES.length]);

  // Mouse tracking radial glow across entire Hero section
  const handleHeroMouseMove = (e) => {
    if (typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    if (!heroSectionRef.current || !heroLightRef.current) return;
    const rect = heroSectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(heroLightRef.current, {
      x,
      y,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  // 3D Mouse Tilt and local depth glow for Profile Photo Card
  const handlePhotoMouseMove = (e) => {
    if (typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    if (!photoCardRef.current || !photoGlowRef.current) return;
    const rect = photoCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(photoCardRef.current, {
      rotationY: x * 0.06,
      rotationX: -y * 0.06,
      transformPerspective: 1100,
      ease: "power2.out",
      duration: 0.4,
    });

    gsap.to(photoGlowRef.current, {
      x: x * 0.4,
      y: y * 0.4,
      opacity: 0.9,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handlePhotoMouseLeave = () => {
    if (!photoCardRef.current || !photoGlowRef.current) return;
    gsap.to(photoCardRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "elastic.out(1, 0.4)",
      duration: 0.8,
    });
    gsap.to(photoGlowRef.current, {
      x: 0,
      y: 0,
      opacity: 0.5,
      duration: 0.6,
    });
  };

  // Magnetic Button Helper
  const handleMagneticMove = (e, ref) => {
    if (typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    gsap.to(ref.current, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  const scrollToNextSection = () => {
    const el = document.getElementById("target-benchmarks");
    if (el && window.lenis) {
      window.lenis.scrollTo(el, { duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-28 pb-28">
      {/* ── 1. ASYMMETRICAL PRODUCT LANDING HERO SECTION ──────────────── */}
      <section
        ref={heroSectionRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-[92vh] pt-32 lg:pt-40 pb-16 px-6 overflow-hidden flex flex-col justify-between bg-gradient-to-b from-zinc-50 via-white to-zinc-50/80 dark:from-[#09090B] dark:via-[#0B1120]/40 dark:to-[#09090B] transition-colors duration-300"
      >
        {/* ── Background Effects Suite ───────────────────────────── */}
        {/* Subtle Grid Mask Background */}
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:36px_36px]"
          style={{
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, #000 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, #000 40%, transparent 100%)",
          }}
        />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-noise opacity-60 pointer-events-none" />

        {/* Floating Blurred Orbs */}
        <div className="absolute top-16 left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#2563EB]/15 via-[#38BDF8]/10 to-indigo-500/15 blur-[90px] pointer-events-none will-change-transform" />
        <div className="absolute bottom-10 right-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#38BDF8]/12 to-indigo-600/12 blur-[80px] pointer-events-none will-change-transform" />

        {/* Mouse-following light dot */}
        <div
          ref={heroLightRef}
          style={{ transform: "translate(-50%, -50%)" }}
          className="absolute top-0 left-0 w-[460px] h-[460px] rounded-full bg-[#38BDF8]/15 blur-[140px] pointer-events-none transition-opacity duration-300"
        />

        {/* 15 Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {HERO_PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.25, 0.8, 0.25],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
            />
          ))}
        </div>

        {/* ── Two-Column Asymmetrical Grid (Max Width 1280px) ───── */}
        <div className="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-10 items-center my-auto">
          
          {/* RIGHT COLUMN (Image First on Mobile: order-1 lg:order-2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            {/* Ambient Animated Gradient Orbs behind card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-88 h-72 sm:h-88 rounded-full bg-gradient-to-tr from-[#2563EB]/35 via-[#38BDF8]/30 to-indigo-600/35 blur-3xl pointer-events-none -z-10 animate-pulse" />

            <div
              ref={photoCardRef}
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={handlePhotoMouseLeave}
              style={{ transformStyle: "preserve-3d" }}
              className="relative p-4 sm:p-6 rounded-3xl bg-card/85 backdrop-blur-2xl border border-default shadow-lg shadow-slate-200/60 dark:shadow-2xl transition-all duration-500 animate-float w-full max-w-[340px] sm:max-w-[420px] select-none group gpu-accelerated"
            >
              {/* Local Depth Glow layer inside card */}
              <div
                ref={photoGlowRef}
                style={{ transform: "translate(-50%, -50%)" }}
                className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-[#2563EB]/30 to-[#38BDF8]/30 blur-2xl opacity-50 pointer-events-none transition-opacity duration-300"
              />

              {/* Glowing Frame Border */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-[#2563EB]/50 via-transparent to-[#38BDF8]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xs" />

              {/* Image Framing */}
              <div className="relative rounded-2xl overflow-hidden border border-default shadow-inner bg-surface">
                <img
                  src={profileImg}
                  alt="Divyansh Bhadauriya"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto max-h-[360px] sm:max-h-[420px] object-cover object-top block transition-transform duration-700 group-hover:scale-105 img-responsive"
                />
              </div>

              {/* Card Meta Content Area */}
              <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-left">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-xl font-extrabold font-heading text-primary transition-colors">
                      {t("home.name")}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#38BDF8]">
                      {HERO_ROLES[0]}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {t("home.statusBadge")}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-default text-xs text-secondary transition-colors">
                  <span className="flex items-center gap-1.5 font-medium">
                    <FaMapMarkerAlt className="text-[#38BDF8]" />
                    {t("home.location")}
                  </span>
                  <span className="font-mono font-bold text-secondary">
                    {t("home.degreeExp")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* LEFT COLUMN (Text Below on Mobile: order-2 lg:order-1) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            
            {/* Sequence 1: Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#2563EB]/10 dark:bg-[#38BDF8]/15 border border-[#2563EB]/30 dark:border-[#38BDF8]/30 text-[#2563EB] dark:text-[#38BDF8] text-xs sm:text-sm font-bold tracking-wide shadow-xs backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] animate-pulse shrink-0" />
                {t("home.badge")}
              </span>
            </motion.div>

            {/* Sequence 2 & 3: Large Heading + Animated Role Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 sm:space-y-5 w-full"
            >
              <div className="space-y-1">
                <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-zinc-600 dark:text-zinc-400">
                  {t("home.greeting")}
                </h2>
                <h1 className="text-clamp-hero font-extrabold font-heading tracking-tight text-zinc-900 dark:text-white break-words">
                  {t("home.name")}
                </h1>
                <p className="text-lg sm:text-2xl font-bold font-heading text-secondary pt-1">
                  {t("home.roleSubtitle", "Front-End & Full-Stack Developer")}
                </p>
              </div>

              {/* Animated Role Switcher */}
              <div className="h-10 sm:h-16 flex items-center justify-center lg:justify-start overflow-hidden pt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIdx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-clamp-heading font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-indigo-500"
                  >
                    {HERO_ROLES[roleIdx]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Sequence 4: Professional Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-clamp-body text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-sans"
            >
              {t("home.introduction")}
            </motion.p>

            {/* Sequence 5: Three Modern CTA Buttons (Stacked vertically on mobile, row on tablet/desktop) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.45 } },
              }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2 w-full max-w-xs sm:max-w-none"
            >
              {/* Button 1: View Projects */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/projects"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  className="group relative flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#38BDF8] text-white font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.75)] transition-all duration-200 overflow-hidden interactive-btn touch-target w-full sm:w-auto"
                >
                  <span className="relative z-10">{t("home.viewProjects")}</span>
                  <FaArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Link>
              </motion.div>

              {/* Button 2: Download Resume */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="w-full sm:w-auto"
              >
                <a
                  href="/resume.pdf"
                  download="Divyansh_Bhadauriya_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl border border-default bg-card/80 hover:bg-slate-100 dark:hover:bg-white/10 text-primary font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all interactive-btn backdrop-blur-md touch-target w-full sm:w-auto"
                >
                  <FaDownload size={14} className="text-[#2563EB] dark:text-[#38BDF8] group-hover:-translate-y-0.5 transition-transform" />
                  <span>{t("home.downloadResume")}</span>
                </a>
              </motion.div>

              {/* Button 3: Hire Me */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/contact"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-default hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#38BDF8] dark:hover:text-zinc-900 text-secondary hover:border-transparent font-bold text-sm sm:text-base transition-all interactive-btn touch-target w-full sm:w-auto"
                >
                  <FaEnvelope size={14} className="text-[#2563EB] dark:text-[#38BDF8] group-hover:text-current transition-colors" />
                  <span>{t("home.hireMe", "Hire Me")}</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Sequence 6: Social Icons inside Premium Glass Circles */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
              }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6 border-t border-zinc-200 dark:border-white/10 w-full"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono mr-1">
                {t("home.connectLabel")}
              </span>

              {[
                { href: "https://github.com/divyanshbhadauriya1319411", icon: <FaGithub size={18} />, label: "GitHub" },
                { href: "https://linkedin.com/in/divyanshbhadauriya", icon: <FaLinkedin size={18} />, label: "LinkedIn" },
                { href: "mailto:divyanshbhadauriya899@gmail.com", icon: <FaEnvelope size={18} />, label: "Email" },
              ].map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 450, damping: 25 } },
                  }}
                  whileHover={{ scale: 1.15, rotate: 12 }}
                  whileTap={{ scale: 0.9 }}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-full bg-card/70 dark:bg-white/5 border border-default backdrop-blur-md flex items-center justify-center text-secondary hover:text-white hover:bg-[#2563EB] dark:hover:bg-[#38BDF8] dark:hover:text-zinc-900 shadow-sm hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-200 interactive-link touch-target"
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>

          </div>

        </div>

        {/* ── Scroll Indicator at Bottom Center ──────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 pt-12 pb-2 flex flex-col items-center justify-center gap-2 cursor-pointer group"
          onClick={scrollToNextSection}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-mono group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
            {t("home.scrollToExplore")}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-9 h-9 rounded-full bg-card dark:bg-white/5 border border-default flex items-center justify-center text-[#2563EB] dark:text-[#38BDF8] shadow-sm group-hover:border-[#38BDF8]/50 transition-colors"
          >
            <FaChevronDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. Target Companies & Inspiration Benchmarks ──────────── */}
      <section id="target-benchmarks" className="px-6 max-w-6xl mx-auto pt-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-card/90 backdrop-blur-xl border border-default flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg shadow-slate-200/60 dark:shadow-xl transition-all duration-500">
          <div className="space-y-1 max-w-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8]">
              {t("home.targetStandardsTitle")}
            </h3>
            <p className="text-base sm:text-lg font-bold font-heading text-primary transition-colors">
              {t("home.targetStandardsDesc")}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:text-base font-bold text-secondary">
            {TARGET_COMPANIES.map((comp) => (
              <span key={comp} className="hover:text-primary transition-colors cursor-default">
                {comp}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Core Tech Stack Pill Strip ──────────────────────────── */}
      <section className="px-6 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary transition-colors">
              {t("home.primaryTechTitle")}
            </h2>
            <p className="text-sm text-secondary mt-1 transition-colors">
              {t("home.primaryTechDesc")}
            </p>
          </div>
          <Link to="/skills" className="text-xs font-bold text-[#2563EB] dark:text-[#38BDF8] hover:underline flex items-center gap-1">
            {t("home.seeAllSkills")} <FaArrowRight size={10} />
          </Link>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2.5 rounded-xl bg-card border border-default text-xs sm:text-sm font-semibold text-secondary hover:text-primary shadow-sm transition-all hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:-translate-y-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ── 4. Why Hire Me Breakdown ───────────────────────────────── */}
      <section className="px-6 max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary transition-colors">
            {t("home.engValueTitle")}
          </h2>
          <p className="text-sm text-secondary mt-1 transition-colors">
            {t("home.engValueDesc")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_HIRE_ME_DATA.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-card border border-default space-y-4 transition-all duration-500 hover:border-[#2563EB] dark:hover:border-white/20 hover:-translate-y-1 shadow-lg shadow-slate-200/60 dark:shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 dark:bg-[#38BDF8]/15 flex items-center justify-center">
                {WHY_HIRE_ICONS[idx] || WHY_HIRE_ICONS[0]}
              </div>
              <h3 className="text-lg font-bold font-heading text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-secondary leading-relaxed transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Featured Projects Preview ────────────────────────────── */}
      <section className="px-6 max-w-6xl mx-auto space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary transition-colors">
              {t("home.featuredCaseStudiesTitle")}
            </h2>
            <p className="text-sm text-secondary mt-1 transition-colors">
              {t("home.featuredCaseStudiesDesc")}
            </p>
          </div>
          <Link
            to="/projects"
            className="text-sm font-bold text-[#2563EB] dark:text-[#38BDF8] hover:underline inline-flex items-center gap-1.5"
          >
            {t("home.allRepositories")} <FaArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {PREVIEW_KEYS.map((key, idx) => (
            <div
              key={key}
              className="flex flex-col justify-between p-7 rounded-3xl bg-card border border-default transition-all duration-500 hover:border-[#2563EB] dark:hover:border-white/20 hover:-translate-y-1 shadow-lg shadow-slate-200/60 dark:shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-heading text-primary transition-colors">
                    {t("projects.data." + key + ".title")}
                  </h3>
                  <a
                    href={PREVIEW_GITHUB[idx]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    <FaExternalLinkAlt size={14} />
                  </a>
                </div>
                <p className="text-sm text-secondary leading-relaxed transition-colors">
                  {t("projects.data." + key + ".description")}
                </p>
              </div>
              <div className="pt-6 flex flex-wrap gap-1.5">
                {PREVIEW_TECH[idx].map((tItem) => (
                  <span
                    key={tItem}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-white/5 text-secondary border border-default"
                  >
                    {tItem}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Experience & Academic Highlights ─────────────────────── */}
      <section className="px-6 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary transition-colors">
              {t("home.backgroundHighlightsTitle")}
            </h2>
            <p className="text-sm text-secondary mt-1 transition-colors">
              {t("home.backgroundHighlightsDesc")}
            </p>
          </div>
          <Link to="/experience" className="text-xs font-bold text-[#2563EB] dark:text-[#38BDF8] hover:underline flex items-center gap-1">
            {t("home.seeFullTimeline")} <FaArrowRight size={10} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div className="p-8 rounded-3xl bg-card border border-default space-y-3 shadow-lg shadow-slate-200/60 dark:shadow-xl transition-all duration-500">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8]">
              {t("home.eduHighlightLabel")}
            </span>
            <h3 className="text-xl font-bold font-heading text-primary transition-colors">
              {t("home.eduHighlightTitle")}
            </h3>
            <p className="text-sm text-secondary leading-relaxed transition-colors">
              {t("home.eduHighlightDesc")}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-card border border-default space-y-3 shadow-lg shadow-slate-200/60 dark:shadow-xl transition-all duration-500">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {t("home.commHighlightLabel")}
            </span>
            <h3 className="text-xl font-bold font-heading text-primary transition-colors">
              {t("home.commHighlightTitle")}
            </h3>
            <p className="text-sm text-secondary leading-relaxed transition-colors">
              {t("home.commHighlightDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Call To Action Banner ───────────────────────────────── */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#38BDF8] text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight">
            {t("home.ctaBannerTitle")}
          </h2>
          <p className="text-blue-100 max-w-xl mx-auto text-base sm:text-lg">
            {t("home.ctaBannerDesc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-2 w-full max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-2xl bg-white text-[#2563EB] font-extrabold text-sm sm:text-base hover:bg-blue-50 transition-all shadow-lg hover:scale-105 touch-target w-full sm:w-auto"
            >
              {t("home.getInTouchToday")}
            </Link>
            <a
              href="/resume.pdf"
              download="Divyansh_Bhadauriya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-blue-900/40 hover:bg-blue-900/60 text-white font-extrabold text-sm sm:text-base border border-white/25 transition-all hover:scale-105 touch-target w-full sm:w-auto"
            >
              {t("home.downloadResume")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
