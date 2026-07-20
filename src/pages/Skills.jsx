import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaPython,
  FaReact,
  FaDatabase,
  FaGithub,
  FaGitAlt,
  FaServer,
  FaCode,
  FaDownload,
  FaCheckCircle,
  FaUsers,
  FaLightbulb,
  FaComments,
  FaClock,
  FaBug,
  FaNetworkWired,
  FaShieldAlt,
  FaHtml5,
  FaCss3Alt,
  FaLayerGroup,
} from "react-icons/fa";
import {
  SiDjango,
  SiPostgresql,
  SiTailwindcss,
  SiJavascript,
  SiDocker,
  SiBootstrap,
  SiFramer,
  SiMysql,
  SiSqlite,
  SiPostman,
  SiRender,
  SiVercel,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiRedux,
} from "react-icons/si";
import { VscOpenai } from "react-icons/vsc";

export default function Skills() {
  const { t } = useTranslation();

  /* ── 3D Tilt Helper for Category Cards ── */
  const [cardTilts, setCardTilts] = useState({});
  const handleMouseMove = (e, id, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 4; // Max 4 deg tilt
    const rotateX = -(y / (rect.height / 2)) * 4;
    setCardTilts((prev) => ({ ...prev, [id]: { rotateX, rotateY } }));
  };
  const handleMouseLeave = (id) => {
    setCardTilts((prev) => ({ ...prev, [id]: { rotateX: 0, rotateY: 0 } }));
  };

  /* ── Skills & Categories Configuration ── */
  const CATEGORIES = [
    {
      id: "Frontend",
      emoji: "⚛",
      icon: <FaReact className="text-[#38BDF8] text-2xl animate-spin-slow" />,
      skills: [
        { name: "React.js", percentage: 92, icon: <FaReact className="text-[#38BDF8] text-lg" /> },
        { name: "Redux", percentage: 86, icon: <SiRedux className="text-purple-500 text-lg" /> },
        { name: "JavaScript (ES6+)", percentage: 90, icon: <SiJavascript className="text-yellow-400 text-lg" /> },
        { name: "HTML5", percentage: 95, icon: <FaHtml5 className="text-orange-500 text-lg" /> },
        { name: "CSS3", percentage: 92, icon: <FaCss3Alt className="text-blue-400 text-lg" /> },
        { name: "Tailwind CSS", percentage: 94, icon: <SiTailwindcss className="text-cyan-400 text-lg" /> },
        { name: "Bootstrap", percentage: 85, icon: <SiBootstrap className="text-purple-400 text-lg" /> },
      ],
    },
    {
      id: "Backend",
      emoji: "⚙",
      icon: <FaServer className="text-emerald-500 text-2xl" />,
      skills: [
        { name: "Node.js", percentage: 88, icon: <SiNodedotjs className="text-green-500 text-lg" /> },
        { name: "Express.js", percentage: 86, icon: <SiExpress className="text-primary text-lg" /> },
        { name: "FastAPI", percentage: 88, icon: <SiFastapi className="text-teal-400 text-lg" /> },
        { name: "REST APIs", percentage: 92, icon: <FaServer className="text-cyan-400 text-lg" /> },
        { name: "JWT Authentication", percentage: 90, icon: <FaShieldAlt className="text-purple-400 text-lg" /> },
      ],
    },
    {
      id: "Database",
      emoji: "🗄",
      icon: <FaDatabase className="text-blue-500 text-2xl" />,
      skills: [
        { name: "MongoDB", percentage: 88, icon: <SiMongodb className="text-green-500 text-lg" /> },
        { name: "PostgreSQL", percentage: 88, icon: <SiPostgresql className="text-blue-400 text-lg" /> },
        { name: "SQL", percentage: 90, icon: <FaDatabase className="text-blue-500 text-lg" /> },
        { name: "Query Optimization", percentage: 85, icon: <FaCheckCircle className="text-emerald-400 text-lg" /> },
      ],
    },
    {
      id: "Tools",
      emoji: "🛠",
      icon: <FaLightbulb className="text-amber-500 text-2xl" />,
      skills: [
        { name: "Gemini API", percentage: 88, icon: <FaLightbulb className="text-[#38BDF8] text-lg" /> },
        { name: "OpenAI API", percentage: 88, icon: <VscOpenai className="text-emerald-500 text-lg" /> },
        { name: "Git", percentage: 92, icon: <FaGitAlt className="text-orange-500 text-lg" /> },
        { name: "GitHub", percentage: 94, icon: <FaGithub className="text-primary text-lg" /> },
        { name: "Postman", percentage: 90, icon: <SiPostman className="text-orange-400 text-lg" /> },
        { name: "VS Code", percentage: 95, icon: <FaCode className="text-blue-500 text-lg" /> },
        { name: "Render", percentage: 88, icon: <SiRender className="text-primary text-lg" /> },
        { name: "Vercel", percentage: 90, icon: <SiVercel className="text-primary text-lg" /> },
      ],
    },
    {
      id: "SoftSkills",
      emoji: "🤝",
      icon: <FaUsers className="text-purple-500 text-2xl" />,
      skills: [
        { name: "Problem Solving", percentage: 95, icon: <FaLightbulb className="text-amber-400 text-lg" /> },
        { name: "Communication", percentage: 90, icon: <FaComments className="text-cyan-400 text-lg" /> },
        { name: "Leadership", percentage: 85, icon: <FaUsers className="text-purple-400 text-lg" /> },
        { name: "Debugging", percentage: 92, icon: <FaBug className="text-rose-400 text-lg" /> },
        { name: "Team Collaboration", percentage: 90, icon: <FaUsers className="text-blue-400 text-lg" /> },
        { name: "Time Management", percentage: 92, icon: <FaClock className="text-emerald-400 text-lg" /> },
        { name: "Quick Learning", percentage: 95, icon: <FaCheckCircle className="text-[#38BDF8] text-lg" /> },
      ],
    },
  ];

  const checklistItems = t("skills.checklist", { returnObjects: true }) || [
    "12+ Technologies",
    "Backend Specialist",
    "REST API Development",
    "SQL & PostgreSQL",
    "React Frontend",
    "Deployment & Git",
  ];

  return (
    <div className="relative pt-28 pb-32 px-6 max-w-7xl mx-auto transition-colors duration-500 overflow-hidden">
      {/* ── Background Atmosphere & Ambient Overlays ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Soft animated grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] dark:opacity-[0.08]" />

        {/* Radial gradient glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[50rem] h-[50rem] bg-gradient-radial from-[#2563EB]/12 via-transparent to-transparent blur-[110px]" />

        {/* Floating blurred blue circles */}
        <motion.div
          animate={{ x: [0, 35, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-96 h-96 bg-[#2563EB]/12 dark:bg-[#3B82F6]/15 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -35, 0], y: [0, 35, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 w-[30rem] h-[30rem] bg-cyan-500/10 dark:bg-[#06B6D4]/12 rounded-full blur-[130px]"
        />

        {/* Tiny floating particles */}
        <motion.div
          animate={{ y: [0, -45, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-[#3B82F6]/50 blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, 55, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-cyan-400/50 blur-[1px]"
        />
      </div>

      {/* ── Main Responsive Two-Column Layout (MNC / Apple / Vercel Inspired) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
        {/* Left Column (Sticky on Desktop -> 4 cols): Narrative & Core Strengths Checklist */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:h-fit space-y-6 sm:space-y-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* TECH STACK Badge */}
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-500/10 dark:bg-[#38BDF8]/10 text-[#2563EB] dark:text-[#38BDF8] border border-[#2563EB]/20 dark:border-[#38BDF8]/20 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] animate-pulse" />
                {t("skills.badge", "TECH STACK")}
              </span>
            </div>

            {/* Large Heading (56px target) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold font-heading tracking-tight text-primary leading-[1.1] break-words">
              {t("skills.title", "Skills & Technologies")}
            </h1>

            {/* Professional Description */}
            <p className="text-base sm:text-lg text-secondary leading-relaxed font-normal pt-1">
              {t(
                "skills.description",
                "I build scalable backend systems, modern web applications, secure REST APIs, and responsive user interfaces using production-ready technologies."
              )}
            </p>
          </motion.div>

          {/* Core Strengths Checklist */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 pt-2"
          >
            {Array.isArray(checklistItems) &&
              checklistItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-card/80 backdrop-blur-md border border-default shadow-sm hover:border-[#2563EB]/50 dark:hover:border-[#38BDF8]/50 transition-colors"
                >
                  <FaCheckCircle className="text-[#2563EB] dark:text-[#38BDF8] shrink-0 text-base sm:text-lg" />
                  <span className="text-sm sm:text-base font-bold text-primary">{item}</span>
                </div>
              ))}
          </motion.div>

          {/* Download Resume Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="pt-2"
          >
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="/resume.pdf"
              download
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] transition-all duration-300 w-full sm:w-auto touch-target overflow-hidden block text-center"
            >
              <span className="relative z-10">{t("skills.downloadResume", "Download Resume")}</span>
              <FaDownload className="relative z-10 group-hover:translate-y-0.5 transition-transform duration-300 text-sm" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column (Scrollable on Desktop -> 8 cols): Grouped Category Cards */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-10 w-full">
          {CATEGORIES.map((category, catIdx) => {
            const catTrans = t(`skills.categories.${category.id}`, { returnObjects: true }) || {};
            const catTitle = catTrans.title || category.id;
            const catDesc = catTrans.description || "";
            const catLevel = catTrans.level || "";
            const catExperience = catTrans.experience || "2+ Years";

            return (
              <CategoryCard
                key={category.id}
                category={category}
                catTitle={catTitle}
                catDesc={catDesc}
                catLevel={catLevel}
                catExperience={catExperience}
                catIdx={catIdx}
                t={t}
                cardTilts={cardTilts}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Category Glass Card Sub-Component with Tilt & Hover Physics ── */
function CategoryCard({
  category,
  catTitle,
  catDesc,
  catLevel,
  catExperience,
  catIdx,
  t,
  cardTilts,
  handleMouseMove,
  handleMouseLeave,
}) {
  const cardRef = useRef(null);
  const tilt = cardTilts[category.id] || { rotateX: 0, rotateY: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: catIdx * 0.1 }}
      ref={cardRef}
      onMouseMove={(e) => handleMouseMove(e, category.id, cardRef)}
      onMouseLeave={() => handleMouseLeave(category.id)}
      style={{
        transformPerspective: 1000,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      className="p-6 sm:p-8 rounded-[24px] bg-card/95 backdrop-blur-xl border border-default shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1.5 hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:shadow-[0_0_40px_rgba(37,99,235,0.2)] dark:hover:shadow-[0_0_45px_rgba(56,189,248,0.2)] transition-all duration-300 group/card relative overflow-hidden"
    >
      {/* Gradient border animation ring */}
      <div className="absolute inset-0 rounded-[24px] p-[1.5px] bg-gradient-to-br from-[#2563EB]/40 via-transparent to-[#06B6D4]/40 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

      {/* Card Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-default flex items-center justify-center text-2xl shrink-0 shadow-inner group-hover/card:scale-110 group-hover/card:bg-[#2563EB]/15 dark:group-hover/card:bg-[#38BDF8]/15 transition-all duration-300">
            {category.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">{category.emoji}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-primary group-hover/card:text-[#2563EB] dark:group-hover/card:text-[#38BDF8] transition-colors">
                {catTitle}
              </h2>
            </div>
            {catDesc && (
              <p className="text-xs sm:text-sm text-secondary pt-1 leading-relaxed max-w-xl">
                {catDesc}
              </p>
            )}
          </div>
        </div>

        {/* Level Tag & Years of Experience */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-default">
          {catLevel && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#2563EB]/10 dark:bg-[#38BDF8]/10 text-[#2563EB] dark:text-[#38BDF8] border border-[#2563EB]/20 dark:border-[#38BDF8]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] animate-pulse" />
              {catLevel}
            </span>
          )}
          <span className="text-xs font-semibold text-secondary sm:pr-1 font-mono">
            {catExperience}
          </span>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="my-6 border-t border-default/80" />

      {/* Skills Visualization Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {category.skills.map((skill, sIdx) => {
          const itemTrans = t(`skills.items.${skill.name}`, { returnObjects: true }) || {};
          const displayName = itemTrans.name || skill.name;

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: sIdx * 0.05 }}
              className="group/tech p-4 sm:p-4.5 rounded-2xl bg-surface/60 dark:bg-black/40 border border-default/70 hover:border-[#2563EB]/60 dark:hover:border-[#38BDF8]/60 hover:bg-card hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 relative overflow-hidden cursor-default"
            >
              {/* Top Row: Icon + Name + Percentage */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-card border border-default flex items-center justify-center text-lg shrink-0 group-hover/tech:rotate-12 group-hover/tech:scale-110 group-hover/tech:border-[#2563EB]/40 transition-all duration-300">
                    {skill.icon}
                  </div>
                  <span className="text-sm sm:text-base font-bold font-heading text-primary truncate group-hover/tech:text-[#2563EB] dark:group-hover/tech:text-[#38BDF8] transition-colors">
                    {displayName}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-extrabold font-mono text-[#2563EB] dark:text-[#38BDF8] shrink-0">
                  {skill.percentage}%
                </span>
              </div>

              {/* Animated Progress Bar Row */}
              <div className="pt-3">
                <div className="w-full h-2 sm:h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden relative shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
                    className="h-full bg-gradient-to-r from-[#2563EB] via-cyan-500 to-[#38BDF8] rounded-full relative group-hover/tech:brightness-110 transition-all shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                  />
                </div>
              </div>

              {/* Subtle background glow on hover */}
              <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-[#2563EB]/10 blur-xl opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
