import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaDownload,
  FaArrowRight,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaLayerGroup,
  FaCode,
  FaGithub,
  FaClock,
  FaPython,
  FaReact,
  FaGitAlt,
  FaDatabase,
  FaServer,
  FaGraduationCap,
  FaBolt,
  FaRocket,
  FaBriefcase,
  FaBullseye,
} from "react-icons/fa";
import {
  SiDjango,
  SiJavascript,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiRender,
} from "react-icons/si";
import { useTranslation } from "react-i18next";
import profileImg from "../assets/profile.webp";

/* ── Animated Number Counter Component ───────────────────────────── */
function CountUpStatistic({ target, suffix = "", label, icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    let startTimestamp = null;
    const duration = 1800; // 1.8 seconds
    let animationFrameId;

    const step = (timestamp) => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(step);
        return;
      }
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 25, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      className="relative p-5 sm:p-6 rounded-[20px] bg-card backdrop-blur-xl border border-default shadow-lg shadow-slate-200/50 dark:shadow-none hover:-translate-y-1.5 hover:border-[#2563EB] dark:hover:border-[#38BDF8]/60 hover:shadow-xl hover:shadow-blue-500/15 transition-all duration-300 group overflow-hidden"
    >
      {/* Top row with glowing icon */}
      <div className="flex items-center justify-between mb-3">
        <div className="w-11 h-11 rounded-xl bg-blue-500/10 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2563EB]/15 dark:group-hover:bg-[#38BDF8]/15 transition-all duration-300">
          {icon}
        </div>
        <div className="w-2 h-2 rounded-full bg-[#2563EB]/40 dark:bg-[#38BDF8]/40 group-hover:scale-150 group-hover:bg-[#2563EB] dark:group-hover:bg-[#38BDF8] transition-all duration-300" />
      </div>

      {/* Number Display */}
      <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors tracking-tight">
        {count}
        {suffix}
      </h3>

      {/* Label */}
      <p className="text-xs sm:text-sm font-semibold text-secondary pt-1 block">
        {label}
      </p>

      {/* Subtle corner glow line */}
      <div className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full bg-gradient-to-br from-[#2563EB]/10 to-transparent blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
    </motion.div>
  );
}

export default function About() {
  const { t } = useTranslation();

  /* ── 3D Parallax Tilt State for Profile Card ── */
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 6; // Max 6 deg
    const rotateX = -(y / (rect.height / 2)) * 6;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  /* ── Core Technologies Configuration ── */
  const CORE_TECH_PILLS = [
    { name: "Python", icon: <FaPython className="text-amber-500 text-base" /> },
    { name: "Django", icon: <SiDjango className="text-emerald-600 dark:text-emerald-400 text-base" /> },
    { name: "React", icon: <FaReact className="text-[#38BDF8] text-base animate-spin-slow" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-base" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500 text-base" /> },
    { name: "SQL", icon: <FaDatabase className="text-cyan-500 text-base" /> },
    { name: "Git", icon: <FaGitAlt className="text-orange-500 text-base" /> },
    { name: "GitHub", icon: <FaGithub className="text-primary text-base" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400 text-base" /> },
    { name: "REST API", icon: <FaServer className="text-violet-500 text-base" /> },
    { name: "Docker", icon: <SiDocker className="text-blue-400 text-base" /> },
    { name: "Render", icon: <SiRender className="text-primary text-base" /> },
  ];

  /* ── Journey Timeline Configuration ── */
  const TIMELINE_ICONS = [
    <FaGraduationCap className="text-[#2563EB] dark:text-[#38BDF8] text-sm" />,
    <FaBolt className="text-amber-500 text-sm" />,
    <FaRocket className="text-cyan-500 text-sm" />,
    <FaBriefcase className="text-emerald-500 text-sm" />,
    <FaBullseye className="text-[#2563EB] dark:text-[#38BDF8] text-sm" />,
  ];

  const timelineItems = t("about.timelineItems", { returnObjects: true }) || [];
  const statsConfig = {
    projects: {
      target: 10,
      suffix: "+",
      label: t("about.stats.projects", "Projects Completed"),
      icon: <FaLayerGroup className="text-[#2563EB] dark:text-[#38BDF8] text-xl" />,
    },
    technologies: {
      target: 12,
      suffix: "+",
      label: t("about.stats.technologies", "Technologies"),
      icon: <FaCode className="text-[#2563EB] dark:text-[#38BDF8] text-xl" />,
    },
    repos: {
      target: 20,
      suffix: "+",
      label: t("about.stats.repos", "GitHub Repositories"),
      icon: <FaGithub className="text-[#2563EB] dark:text-[#38BDF8] text-xl" />,
    },
    experience: {
      target: 2,
      suffix: "+ Years",
      label: t("about.stats.experience", "Learning Experience"),
      icon: <FaClock className="text-[#2563EB] dark:text-[#38BDF8] text-xl" />,
    },
  };

  return (
    <div className="relative pt-28 pb-32 px-6 max-w-6xl mx-auto transition-colors duration-500 overflow-hidden">
      {/* ── Background Atmosphere & Ambient Overlays ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Soft animated grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] dark:opacity-[0.08]" />

        {/* Radial gradient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[45rem] h-[45rem] bg-gradient-radial from-[#2563EB]/10 via-transparent to-transparent blur-[100px]" />

        {/* Floating blurred blue circles */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-4 w-80 h-80 bg-[#2563EB]/12 dark:bg-[#3B82F6]/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -35, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-4 w-96 h-96 bg-cyan-500/10 dark:bg-[#06B6D4]/12 rounded-full blur-[120px]"
        />

        {/* Tiny floating particles */}
        <motion.div
          animate={{ y: [0, -40, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#3B82F6]/40 blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, 50, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-cyan-400/40 blur-[1px]"
        />
      </div>

      {/* ── Main Two-Column Layout (Apple / Vercel / Linear Inspired) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
        {/* Left Column (40% -> 5 cols): Professional Portrait with Floating Glass Card */}
        <div className="lg:col-span-5 w-full">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transformPerspective: 1000,
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
            }}
            className="relative p-3 sm:p-4 rounded-[24px] bg-card/90 backdrop-blur-xl border border-default shadow-xl group hover:shadow-[0_0_45px_rgba(37,99,235,0.3)] transition-all duration-300"
          >
            {/* Gradient border animation ring */}
            <div className="absolute inset-0 rounded-[24px] p-[1.5px] bg-gradient-to-br from-[#2563EB]/50 via-transparent to-[#06B6D4]/50 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Inner Image Container */}
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/5] bg-slate-900 shadow-inner">
              <img
                src={profileImg}
                alt="Divyansh Bhadauriya"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Subtle dark gradient overlay for badge legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

              {/* Status Badge: Available for Full-Time */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 dark:bg-[#090E18]/80 backdrop-blur-md border border-white/15 text-xs font-bold text-white shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t("about.statusAvailable", "Available for Full-Time")}
                </span>
              </div>

              {/* Floating Tech Badge: Python Developer */}
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2563EB]/90 dark:bg-[#38BDF8]/20 backdrop-blur-md border border-blue-400/30 text-xs font-bold text-white dark:text-[#38BDF8] shadow-lg animate-bounce-subtle">
                  <FaPython className="text-amber-300 text-sm" />
                  {t("about.techBadge", "Python Developer")}
                </span>
              </div>

              {/* Location Badge: Delhi, India */}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 dark:bg-[#090E18]/80 backdrop-blur-md border border-white/15 text-xs font-bold text-slate-200 shadow-lg">
                  <FaMapMarkerAlt className="text-red-400 text-xs" />
                  {t("about.locationBadge", "Delhi, India")}
                </span>
              </div>
            </div>

            {/* Profile Info Summary Inside Glass Card */}
            <div className="p-4 sm:p-5 space-y-3">
              <div>
                <h3 className="text-xl font-bold font-heading text-primary transition-colors">
                  Divyansh Bhadauriya
                </h3>
                <p className="text-xs font-semibold text-[#2563EB] dark:text-[#38BDF8] transition-colors">
                  {t("about.roleTag", "Python & Django Developer · Full Stack Engineer")}
                </p>
              </div>
              <div className="pt-3 border-t border-default flex items-center justify-between transition-colors">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <FaCheckCircle size={11} /> {t("about.openToWork", "Open to Work")}
                </span>
                <a
                  href="/resume.pdf"
                  download="Divyansh_Bhadauriya_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] dark:text-[#38BDF8] hover:underline"
                >
                  <FaDownload size={11} /> {t("about.resumePdf", "Resume PDF")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (60% -> 7 cols): Premium Narrative & Achievement Cards Grid */}
        <div className="lg:col-span-7 space-y-8 w-full">
          {/* Header Area */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-500/10 dark:bg-[#38BDF8]/10 text-[#2563EB] dark:text-[#38BDF8] border border-[#2563EB]/20 dark:border-[#38BDF8]/20 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] animate-pulse" />
                {t("about.badge", "ABOUT ME")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-clamp-heading font-extrabold font-heading tracking-tight text-primary leading-tight break-words"
            >
              {t("about.heading", "Building Scalable Software That Solves Real Problems")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-secondary leading-relaxed font-normal pt-1"
            >
              {t(
                "about.description",
                "I'm a Full Stack Developer specializing in Python, Django REST Framework, React, PostgreSQL, and modern backend architecture. I enjoy building scalable APIs, responsive web applications, and clean user experiences with production-ready code."
              )}
            </motion.p>
          </div>

          {/* Achievement Cards (2×2 Grid) below the description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-2 gap-4 sm:gap-6 pt-2"
          >
            <CountUpStatistic
              target={statsConfig.projects.target}
              suffix={statsConfig.projects.suffix}
              label={statsConfig.projects.label}
              icon={statsConfig.projects.icon}
            />
            <CountUpStatistic
              target={statsConfig.technologies.target}
              suffix={statsConfig.technologies.suffix}
              label={statsConfig.technologies.label}
              icon={statsConfig.technologies.icon}
            />
            <CountUpStatistic
              target={statsConfig.repos.target}
              suffix={statsConfig.repos.suffix}
              label={statsConfig.repos.label}
              icon={statsConfig.repos.icon}
            />
            <CountUpStatistic
              target={statsConfig.experience.target}
              suffix={statsConfig.experience.suffix}
              label={statsConfig.experience.label}
              icon={statsConfig.experience.icon}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Core Technologies (Animated Pills with Scale & Glow) ── */}
      <div className="pt-20 space-y-6 relative z-10">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-primary flex items-center gap-3">
            <span className="w-2.5 h-7 rounded-full bg-gradient-to-b from-[#2563EB] to-[#06B6D4] block" />
            {t("about.coreTechTitle", "Core Technologies")}
          </h3>
          <p className="text-sm text-secondary">
            {t("about.coreTechSubtitle", "Production tools, relational databases, and frameworks used in daily development.")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
          {CORE_TECH_PILLS.map((pill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="group flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-card backdrop-blur-md border border-default text-sm font-bold text-primary shadow-sm hover:scale-105 hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-all duration-200 cursor-default select-none"
            >
              <span className="group-hover:scale-125 transition-transform duration-200">
                {pill.icon}
              </span>
              <span>{pill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Journey Timeline (Vertical Timeline) ── */}
      <div className="pt-20 space-y-8 relative z-10">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-primary flex items-center gap-3">
            <span className="w-2.5 h-7 rounded-full bg-gradient-to-b from-[#2563EB] to-[#06B6D4] block" />
            {t("about.journeyTitle", "Engineering Journey")}
          </h3>
          <p className="text-sm text-secondary">
            {t("about.journeySubtitle", "From core programming foundations to architecting production full-stack systems.")}
          </p>
        </div>

        <div className="relative pl-8 sm:pl-10 space-y-8 border-l-2 border-[#2563EB]/30 dark:border-[#38BDF8]/30 ml-4 pt-2">
          {timelineItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-6 sm:p-7 rounded-[20px] bg-card border border-default shadow-lg shadow-slate-200/50 dark:shadow-none hover:border-[#2563EB]/60 dark:hover:border-[#38BDF8]/60 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[41px] sm:-left-[49px] top-6 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-card border-2 border-[#2563EB] dark:border-[#38BDF8] flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:scale-125 group-hover:bg-[#2563EB] transition-all duration-300">
                <span className="group-hover:text-white transition-colors duration-300">
                  {TIMELINE_ICONS[idx] || TIMELINE_ICONS[0]}
                </span>
              </div>

              {/* Timeline Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-lg sm:text-xl font-bold font-heading text-primary group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                  {item.title}
                </h4>
                <span className="inline-flex items-center self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase bg-blue-500/10 dark:bg-[#38BDF8]/10 text-[#2563EB] dark:text-[#38BDF8] border border-[#2563EB]/20 dark:border-[#38BDF8]/20">
                  {item.year}
                </span>
              </div>

              {/* Timeline Card Description */}
              <p className="text-sm sm:text-base text-secondary leading-relaxed pt-2.5">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Download CV & Contact CTA Buttons ── */}
      <div className="pt-20 flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-6 relative z-10">
        {/* Primary Action: Download Resume */}
        <motion.a
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          href="/resume.pdf"
          download="Divyansh_Bhadauriya_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] transition-all duration-300 w-full sm:w-auto touch-target overflow-hidden"
        >
          <span className="relative z-10">{t("about.downloadResume", "Download Resume")}</span>
          <FaDownload className="relative z-10 group-hover:translate-y-0.5 transition-transform duration-300 text-sm" />
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>

        {/* Secondary Action: Let's Connect */}
        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Link
            to="/contact"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-2xl bg-card hover:bg-surface border border-default hover:border-[#2563EB] dark:hover:border-[#38BDF8] text-primary hover:text-[#2563EB] dark:hover:text-[#38BDF8] font-bold text-base shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 w-full sm:w-auto touch-target block text-center"
          >
            <span>{t("about.letsConnect", "Let's Connect")}</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 text-sm" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
