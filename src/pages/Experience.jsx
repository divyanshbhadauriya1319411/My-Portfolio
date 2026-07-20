import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaBuilding,
  FaLaptopCode,
  FaGraduationCap,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCode,
  FaGithub,
  FaRocket,
  FaLayerGroup,
  FaServer,
} from "react-icons/fa";

export default function Experience() {
  const { t } = useTranslation();

  /* ── Mouse Spotlight Tracking for Cards ── */
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  /* ── Default Fallbacks if translations load partially ── */
  const defaultTimeline = [
    {
      role: "Full-Stack Developer Intern",
      company: "Ducat India, Noida",
      duration: "Jan 2026 – Present",
      location: "Noida, Uttar Pradesh, India",
      status: "🟢 Current",
      description:
        "Gaining intensive practical training and hands-on experience in full-stack web development using MERN stack (MongoDB, Express.js, React.js, Node.js) and Python backend architectures. Developing scalable RESTful APIs, optimizing database schemas, and building modern responsive frontends.",
      achievements: [
        "Developing full-stack web applications with MERN & Python ecosystems",
        "Architecting secure REST APIs with JWT authentication & role authorization",
        "Optimizing query performance across MongoDB and PostgreSQL databases",
        "Collaborating on interactive, responsive UI delivery using React 19 & Tailwind CSS v4",
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Python", "PostgreSQL", "REST API", "Tailwind CSS", "Git"],
      icon: <FaLaptopCode className="text-2xl text-[#3B82F6]" />,
    },
    {
      role: "Freelance & Open Source Developer",
      company: "Independent Clients & Self-Employed",
      duration: "Sept 2024 – Present",
      location: "Remote",
      status: "🟢 Current",
      description:
        "Architecting premium end-to-end web applications for clients and contributing to open-source software. Lead developer on RAMA INTERNATIONAL commercial export trading platform and Rent-Drive vehicle reservation portal.",
      achievements: [
        "Built custom responsive React frontends with Framer Motion and GSAP",
        "Optimized Django REST Framework backend endpoints, reducing latency by 35%",
        "Integrated AI capabilities using Gemini and OpenAI APIs",
        "Deployed production apps to Vercel and Render with full CI/CD pipelines",
      ],
      tech: ["React.js", "FastAPI", "Python", "Django", "Node.js", "OpenAI API", "Gemini API", "PostgreSQL", "Git"],
      icon: <FaServer className="text-2xl text-cyan-400" />,
    },
    {
      role: "Full-Stack Developer Intern",
      company: "TechsyHub",
      duration: "June 2024 – Sept 2024",
      location: "Noida, India",
      status: "Completed",
      description:
        "Built and maintained frontend components with React.js and Tailwind CSS while developing robust backend REST APIs using Node.js and Express.js.",
      achievements: [
        "Developed full-stack features with React & Node.js",
        "Engineered REST APIs and JWT Authentication",
        "Optimized PostgreSQL & MongoDB data models",
        "Integrated third-party APIs & improved UX",
      ],
      tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Tailwind CSS", "JWT", "REST API"],
      icon: <FaCode className="text-2xl text-emerald-400" />,
    },
    {
      role: "BCA Student",
      company: "Dr. Bhim Rao Ambedkar University",
      duration: "2023 – 2026",
      location: "Agra, India",
      status: "🎓 In Progress",
      description:
        "Specialized in Software Engineering, Full Stack Web Development, Relational Database Management Systems (RDBMS), and Object-Oriented Programming (Python/C++).",
      achievements: [
        "Core Computer Science & Data Structures",
        "Relational Database Systems (SQL & PostgreSQL)",
        "Object-Oriented Programming (Python & C++)",
        "Web Applications & Systems Architecture",
      ],
      tech: ["Python", "SQL", "Data Structures", "DBMS", "Operating Systems", "C/C++", "Git", "Linux"],
      icon: <FaGraduationCap className="text-2xl text-purple-400" />,
    },
  ];

  const translatedList = t("experience.timeline", { returnObjects: true }) || [];
  const localizedTimeline = defaultTimeline.map((item, idx) => {
    const itemTrans = translatedList[idx] || {};
    return {
      ...item,
      role: itemTrans.role || itemTrans.title || item.role,
      company: itemTrans.company || item.company,
      duration: itemTrans.duration || itemTrans.year || item.duration,
      location: itemTrans.location || item.location,
      status: itemTrans.status || item.status,
      description: itemTrans.description || item.description,
      achievements: itemTrans.achievements || item.achievements,
      tech: itemTrans.tech || item.tech,
    };
  });

  const stats = t("experience.stats", { returnObjects: true }) || {
    title: "Engineering Profile",
    projectsLabel: "Projects",
    projectsValue: "10+",
    reposLabel: "GitHub Repositories",
    reposValue: "20+",
    techLabel: "Technologies",
    techValue: "15+",
    focusLabel: "Current Focus",
    focusValue: "Full-Stack & AI Solutions",
    expLabel: "Experience",
    expValue: "2+ Years",
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative pt-28 pb-32 px-6 max-w-7xl mx-auto transition-colors duration-500 overflow-hidden"
    >
      {/* ── Background Atmosphere & Ambient Overlays ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Soft grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] dark:opacity-[0.08]" />

        {/* Ambient radial glows */}
        <div className="absolute top-1/4 left-1/4 w-[45rem] h-[45rem] bg-gradient-radial from-[#3B82F6]/14 via-transparent to-transparent blur-[120px]" />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-cyan-500/12 dark:bg-[#06B6D4]/14 rounded-full blur-[130px]"
        />

        {/* Soft glowing blue guide lines */}
        <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#3B82F6]/15 to-transparent opacity-60" />
        <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent opacity-50 hidden lg:block" />

        {/* Tiny animated floating particles */}
        <motion.div
          animate={{ y: [0, -40, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-1/3 w-2 h-2 rounded-full bg-[#3B82F6]/60 blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, 50, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-40 left-1/4 w-2.5 h-2.5 rounded-full bg-cyan-400/50 blur-[1px]"
        />
      </div>

      {/* ── Section Header (Compact, Left Aligned, max width ~700px) ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[700px] space-y-4 pt-2 mb-10 sm:mb-14 text-left"
      >
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            {t("experience.badge", "💼 PROFESSIONAL JOURNEY")}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold font-heading tracking-tight text-primary leading-[1.1] break-words">
          {t("experience.title", "Experience")}
        </h1>

        <p className="text-base sm:text-lg text-secondary leading-relaxed font-normal pt-1">
          {t(
            "experience.subtitle",
            "Building production-ready applications, backend systems and modern web experiences through continuous learning and real-world projects."
          )}
        </p>
      </motion.div>

      {/* ── Main Layout: Horizontal Stacked Cards (Left) + Sticky Stats Panel (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start relative z-10">
        
        {/* Left Column (8 cols): Horizontal Premium Glass Cards Stacked Vertically */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8 w-full">
          {localizedTimeline.map((item, idx) => (
            <ExperienceCard
              key={idx}
              item={item}
              idx={idx}
              t={t}
            />
          ))}
        </div>

        {/* Right Column (4 cols): Sticky Floating Statistics Panel on Desktop */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:h-fit w-full">
          <FloatingStatsPanel stats={stats} />
        </div>
      </div>
    </div>
  );
}

/* ── Horizontal Premium Glass Card Sub-Component ── */
function ExperienceCard({ item, idx, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      className="p-6 sm:p-8 rounded-[24px] bg-card/90 dark:bg-[#090E18]/85 backdrop-blur-xl border border-default hover:border-[#3B82F6] shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-[0_0_40px_rgba(59,130,246,0.22)] transition-all duration-300 hover:-translate-y-2 group/card relative overflow-hidden text-left"
    >
      {/* Gradient border animation ring */}
      <div className="absolute inset-0 rounded-[24px] p-[1px] bg-gradient-to-br from-[#3B82F6]/40 via-transparent to-cyan-500/40 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

      {/* Top Row: Logo/Icon + Role & Company + Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Company Logo/Icon inside glowing box */}
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-default flex items-center justify-center text-2xl shrink-0 shadow-inner group-hover/card:scale-110 group-hover/card:rotate-6 group-hover/card:bg-[#3B82F6]/15 group-hover/card:border-[#3B82F6]/30 transition-all duration-300">
            {item.icon}
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-primary group-hover/card:text-[#3B82F6] transition-colors">
              {item.role}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold text-secondary">
              <FaBuilding className="text-[#3B82F6] text-xs sm:text-sm shrink-0" />
              <span>{item.company}</span>
            </div>

            {/* Duration and Location Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-surface dark:bg-white/5 text-secondary border border-default/70">
                <FaCalendarAlt className="text-[#3B82F6] text-xs shrink-0" />
                {item.duration}
              </span>
              {item.location && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-surface dark:bg-white/5 text-secondary border border-default/70">
                  <FaMapMarkerAlt className="text-cyan-400 text-xs shrink-0" />
                  {item.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status Badge (Current / In Progress etc.) */}
        <div className="shrink-0 self-start sm:self-auto pt-2 sm:pt-0">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 shadow-sm">
            {item.status}
          </span>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="my-5 border-t border-default/80" />

      {/* Description */}
      <p className="text-sm sm:text-base text-secondary leading-relaxed transition-colors">
        {item.description}
      </p>

      {/* Achievements List */}
      {Array.isArray(item.achievements) && item.achievements.length > 0 && (
        <div className="space-y-2.5 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] font-mono">
            {t("experience.keyAchievements", "Key Achievements")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
            {item.achievements.map((ach, aIdx) => (
              <div
                key={aIdx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-secondary group-hover/card:text-primary transition-colors"
              >
                <FaCheckCircle className="text-[#3B82F6] shrink-0 mt-0.5 text-xs sm:text-sm" />
                <span>{ach}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack Pills (Animate slightly on card hover) */}
      {Array.isArray(item.tech) && item.tech.length > 0 && (
        <div className="pt-5 mt-5 border-t border-default/80 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary font-mono">
            {t("experience.techStack", "Tech Stack")}
          </h4>
          <div className="flex flex-wrap gap-2 pt-1">
            {item.tech.map((techItem) => (
              <span
                key={techItem}
                className="px-3 py-1 rounded-lg text-xs font-bold font-mono bg-surface dark:bg-white/5 text-secondary border border-default group-hover/card:border-[#3B82F6]/40 group-hover/card:bg-[#3B82F6]/10 group-hover/card:text-[#3B82F6] transition-all duration-300 transform group-hover/card:-translate-y-0.5"
              >
                {techItem}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ── Sticky Floating Statistics Panel Sub-Component ── */
function FloatingStatsPanel({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-6 sm:p-8 rounded-[24px] bg-card/95 dark:bg-[#090E18]/90 backdrop-blur-xl border border-default shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-[#3B82F6]/60 transition-all duration-300 relative overflow-hidden space-y-6 text-left"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 border-b border-default pb-4">
        <div className="flex items-center gap-2.5">
          <FaRocket className="text-[#3B82F6] text-lg animate-bounce" />
          <h3 className="text-lg sm:text-xl font-extrabold font-heading text-primary">
            {stats.title || "Engineering Profile"}
          </h3>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
      </div>

      {/* Metrics Stack */}
      <div className="space-y-3.5">
        {/* Projects */}
        <div className="p-4 rounded-2xl bg-surface/80 dark:bg-black/40 border border-default/70 flex items-center justify-between hover:border-[#3B82F6]/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-card border border-default flex items-center justify-center text-[#3B82F6] text-base shrink-0">
              <FaLayerGroup />
            </div>
            <span className="text-sm sm:text-base font-bold text-secondary">
              {stats.projectsLabel || "Projects"}
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#3B82F6]">
            {stats.projectsValue || "10+"}
          </span>
        </div>

        {/* GitHub Repositories */}
        <div className="p-4 rounded-2xl bg-surface/80 dark:bg-black/40 border border-default/70 flex items-center justify-between hover:border-[#3B82F6]/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-card border border-default flex items-center justify-center text-primary text-base shrink-0">
              <FaGithub />
            </div>
            <span className="text-sm sm:text-base font-bold text-secondary">
              {stats.reposLabel || "GitHub Repositories"}
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold font-mono text-primary">
            {stats.reposValue || "20+"}
          </span>
        </div>

        {/* Technologies */}
        <div className="p-4 rounded-2xl bg-surface/80 dark:bg-black/40 border border-default/70 flex items-center justify-between hover:border-[#3B82F6]/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-card border border-default flex items-center justify-center text-cyan-400 text-base shrink-0">
              <FaCode />
            </div>
            <span className="text-sm sm:text-base font-bold text-secondary">
              {stats.techLabel || "Technologies"}
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold font-mono text-cyan-400">
            {stats.techValue || "15+"}
          </span>
        </div>

        {/* Experience Years */}
        <div className="p-4 rounded-2xl bg-surface/80 dark:bg-black/40 border border-default/70 flex items-center justify-between hover:border-[#3B82F6]/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-card border border-default flex items-center justify-center text-purple-400 text-base shrink-0">
              <FaCalendarAlt />
            </div>
            <span className="text-sm sm:text-base font-bold text-secondary">
              {stats.expLabel || "Experience"}
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold font-mono text-purple-400">
            {stats.expValue || "2+ Years"}
          </span>
        </div>

        {/* Current Focus Highlight Card */}
        <div className="p-4.5 rounded-2xl bg-gradient-to-br from-[#3B82F6]/15 via-[#3B82F6]/5 to-transparent border border-[#3B82F6]/30 flex flex-col items-start gap-1.5 shadow-inner">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] font-mono">
            {stats.focusLabel || "Current Focus"}
          </span>
          <span className="text-base sm:text-lg font-extrabold font-heading text-primary flex items-center gap-2">
            <FaServer className="text-[#3B82F6] text-sm shrink-0" />
            {stats.focusValue || "Backend Engineering"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
