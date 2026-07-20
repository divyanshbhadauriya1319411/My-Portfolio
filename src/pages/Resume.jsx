import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaDownload,
  FaFilePdf,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaExpand,
  FaCompress,
  FaExclamationTriangle,
  FaGraduationCap,
  FaLaptopCode,
  FaAward,
  FaCheckCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Resume() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pdfError, setPdfError] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const pdfUrl = "/resume/Divyansh_Bhadauriya_Resume.pdf";

  // ── SEO & Title management ──────────────────────────────────────────────
  useEffect(() => {
    document.title = "Resume | Divyansh Bhadauriya";
  }, []);

  // ── Full screen tracking ────────────────────────────────────────────────
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  const handleToggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  // Summary data from existing resume setup
  const skillsSummary = t("resume.skillsSummaryItems", { returnObjects: true }) || [
    "Python, Django, Django REST Framework, and secure RESTful API architectures.",
    "PostgreSQL schema modeling, complex query optimization, and transaction management.",
    "React 19, Tailwind CSS v4, GSAP/Framer Motion animations, and responsive UI delivery.",
    "Git collaborative workflows, Docker containerization basics, and Linux server commands.",
  ];
  const certSummary = t("resume.certSummaryItems", { returnObjects: true }) || [
    "Verified Full Stack Application Deployment — RAMA INTERNATIONAL & Rent-Drive repositories.",
    "Relational Database & Query Optimization Mastery — PostgreSQL / SQL benchmarks.",
    "Modern Frontend Component Engineering — React 19 & Tailwind CSS v4.",
  ];
  const skillsList = Array.isArray(skillsSummary) ? skillsSummary : [];
  const certsList = Array.isArray(certSummary) ? certSummary : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -35 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pt-28 pb-28 px-4 sm:px-6 max-w-6xl mx-auto space-y-14 sm:space-y-16 relative transition-colors duration-500"
    >
      {/* ── 1. Beautiful Hero Section ─────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="flex flex-col items-center text-center space-y-6 sm:space-y-8 border-b border-zinc-200/80 dark:border-white/10 pb-12"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-[#2563EB] dark:text-[#38BDF8] text-xs sm:text-sm font-extrabold tracking-wide uppercase"
        >
          <FaFilePdf size={14} className="text-rose-500" />
          <span>Professional Curriculum Vitae</span>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="space-y-3 max-w-4xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight text-zinc-900 dark:text-white break-words transition-colors">
            Resume
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#38BDF8] bg-clip-text text-transparent leading-relaxed flex flex-wrap items-center justify-center gap-2">
            <span>Divyansh Bhadauriya</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>Software Engineer</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>Frontend Developer</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>Python Developer</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>Full Stack Developer</span>
          </p>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto pt-1 transition-colors">
            Download or preview my latest professional resume.
          </p>
        </motion.div>

        {/* Hero Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-2"
        >
          {/* Download Resume */}
          <a
            href={pdfUrl}
            download="Divyansh_Bhadauriya_Resume.pdf"
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#38BDF8] text-white font-extrabold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 interactive-btn touch-target w-full sm:w-auto"
          >
            <FaDownload size={14} className="group-hover:animate-bounce" />
            <span>Download Resume</span>
          </a>

          {/* Open in New Tab */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-zinc-300 dark:border-white/20 bg-white/80 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-800 dark:text-white font-bold text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 touch-target w-full sm:w-auto"
          >
            <FaExternalLinkAlt size={13} />
            <span>Open in New Tab</span>
          </a>

          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-zinc-300 dark:border-white/20 bg-white/80 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-800 dark:text-white font-bold text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 touch-target w-full sm:w-auto"
          >
            <FaArrowLeft size={13} />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* ── 2. Glassmorphism Card around the PDF Viewer ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* Ambient Blue Glow */}
        <div className="absolute -inset-1.5 sm:-inset-2 rounded-[32px] bg-gradient-to-r from-[#2563EB]/25 via-blue-500/15 to-[#38BDF8]/25 blur-2xl pointer-events-none -z-10 animate-pulse" />

        {/* Glassmorphism Container */}
        <div
          ref={containerRef}
          className="relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-white/75 dark:bg-[#111827]/80 border border-zinc-300/80 dark:border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-[#2563EB]/20 dark:ring-[#38BDF8]/20 transition-all duration-500"
        >
          {/* Sticky Top Toolbar */}
          <div className="sticky top-0 sm:top-20 z-30 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-xl border-b border-zinc-200/80 dark:border-white/10 px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-4 transition-colors">
            {/* Left: Indicator */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0">
                <FaFilePdf className="text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white leading-tight">
                  Resume
                </h3>
                <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate max-w-[200px] sm:max-w-xs">
                  Divyansh_Bhadauriya_Resume.pdf
                </p>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
              <a
                href={pdfUrl}
                download="Divyansh_Bhadauriya_Resume.pdf"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-zinc-100 dark:bg-white/10 hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#38BDF8] dark:hover:text-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-bold transition-all shadow-xs"
              >
                <FaDownload size={12} />
                <span>Download</span>
              </a>

              <button
                onClick={handleToggleFullScreen}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-zinc-100 dark:bg-white/10 hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#38BDF8] dark:hover:text-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-bold transition-all shadow-xs"
                title={isFullScreen ? "Exit Full Screen" : "Open Full Screen"}
              >
                {isFullScreen ? <FaCompress size={12} /> : <FaExpand size={12} />}
                <span className="hidden xs:inline">
                  {isFullScreen ? "Exit Full Screen" : "Open Full Screen"}
                </span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border border-zinc-300 dark:border-white/15 hover:bg-zinc-200 dark:hover:bg-white/15 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-bold transition-all"
              >
                <FaArrowLeft size={12} />
                <span>Back</span>
              </button>
            </div>
          </div>

          {/* Embedded PDF Viewer area */}
          <div className="relative w-full h-[80vh] sm:h-[700px] lg:h-[900px] bg-zinc-100 dark:bg-[#09090B] flex items-center justify-center overflow-hidden transition-all duration-500">
            {/* Loading Spinner overlay */}
            {pdfLoading && !pdfError && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-100/90 dark:bg-[#09090B]/90 backdrop-blur-sm space-y-3">
                <div className="w-10 h-10 rounded-full border-3 border-blue-500/20 border-t-[#2563EB] dark:border-t-[#38BDF8] animate-spin" />
                <span className="text-xs font-bold font-mono text-zinc-600 dark:text-zinc-400">
                  Loading Resume PDF...
                </span>
              </div>
            )}

            {/* Error / Fallback UI */}
            {pdfError ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-5 bg-zinc-50 dark:bg-[#09090B]">
                <div className="p-4 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  <FaExclamationTriangle size={36} />
                </div>
                <div className="space-y-1 max-w-md">
                  <h4 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                    Unable to preview resume.
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Your browser may not support inline PDF viewing or the viewer encountered an issue loading the file.
                  </p>
                </div>
                <a
                  href={pdfUrl}
                  download="Divyansh_Bhadauriya_Resume.pdf"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#38BDF8] text-white font-extrabold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-95"
                >
                  <FaDownload size={14} />
                  <span>Download Resume</span>
                </a>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={pdfUrl}
                title="Resume"
                width="100%"
                height="100%"
                className="w-full h-full border-none block"
                onLoad={() => setPdfLoading(false)}
                onError={() => {
                  setPdfLoading(false);
                  setPdfError(true);
                }}
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* ── 3. Floating Download Resume Button on Desktop ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 25 }}
        className="hidden md:flex fixed bottom-8 right-8 z-40"
      >
        <a
          href={pdfUrl}
          download="Divyansh_Bhadauriya_Resume.pdf"
          className="group flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#38BDF8] text-white font-extrabold text-sm shadow-[0_8px_30px_rgba(37,99,235,0.45)] hover:shadow-[0_8px_35px_rgba(56,189,248,0.75)] hover:-translate-y-1 active:scale-95 transition-all duration-300 border border-white/20 backdrop-blur-md"
        >
          <FaDownload className="text-base group-hover:animate-bounce" />
          <span>Download Resume</span>
        </a>
      </motion.div>

      {/* ── 4. Summary Dashboard Grid ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6"
      >
        {/* Education Summary */}
        <div className="p-7 rounded-3xl bg-white/70 dark:bg-[#111827]/75 border border-zinc-200/80 dark:border-white/10 space-y-4 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all duration-500">
          <div className="flex items-center gap-3 text-[#2563EB] dark:text-[#38BDF8]">
            <FaGraduationCap size={22} />
            <h3 className="text-lg font-bold font-heading text-zinc-900 dark:text-white transition-colors">
              {t("resume.eduSummaryTitle", "Education")}
            </h3>
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-zinc-900 dark:text-white transition-colors">
              Bachelor of Computer Applications (BCA)
            </h4>
            <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 transition-colors">
              Dr. Bhim Rao Ambedkar University, Agra
            </p>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 pt-2 leading-relaxed transition-colors">
              Relational Database Systems (PostgreSQL/SQL), Object-Oriented Programming (Python/C++), Operating Systems, and Networking.
            </p>
          </div>
        </div>

        {/* Skills Summary */}
        <div className="p-7 rounded-3xl bg-white/70 dark:bg-[#111827]/75 border border-zinc-200/80 dark:border-white/10 space-y-4 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all duration-500">
          <div className="flex items-center gap-3 text-emerald-500">
            <FaLaptopCode size={22} />
            <h3 className="text-lg font-bold font-heading text-zinc-900 dark:text-white transition-colors">
              {t("resume.skillsSummaryTitle", "Key Competencies")}
            </h3>
          </div>
          <ul className="space-y-2">
            {skillsList.map((s, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 transition-colors">
                <FaCheckCircle className="text-emerald-500 shrink-0 mt-1 text-xs" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Certificates & Verified Work */}
        <div className="p-7 rounded-3xl bg-white/70 dark:bg-[#111827]/75 border border-zinc-200/80 dark:border-white/10 space-y-4 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all duration-500">
          <div className="flex items-center gap-3 text-amber-500">
            <FaAward size={22} />
            <h3 className="text-lg font-bold font-heading text-zinc-900 dark:text-white transition-colors">
              {t("resume.certSummaryTitle", "Verified Benchmarks")}
            </h3>
          </div>
          <ul className="space-y-2.5">
            {certsList.map((c, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 transition-colors">
                <FaCheckCircle className="text-amber-500 shrink-0 mt-1 text-xs" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
