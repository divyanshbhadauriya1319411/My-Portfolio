import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  FaHome,
  FaUser,
  FaCode,
  FaLayerGroup,
  FaBriefcase,
  FaFileAlt,
  FaEnvelope,
  FaArrowRight,
  FaDownload,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import WhatsAppButton from "./WhatsAppButton";

const NAV_ITEMS = [
  { key: "home",       label: "Home",       path: "/",           icon: <FaHome size={14} /> },
  { key: "about",      label: "About",      path: "/about",      icon: <FaUser size={14} /> },
  { key: "skills",     label: "Skills",     path: "/skills",     icon: <FaCode size={14} /> },
  { key: "projects",   label: "Projects",   path: "/projects",   icon: <FaLayerGroup size={14} /> },
  { key: "experience", label: "Experience", path: "/experience", icon: <FaBriefcase size={14} /> },
  { key: "resume",     label: "Resume",     path: "/resume",     icon: <FaFileAlt size={14} /> },
  { key: "contact",    label: "Contact",    path: "/contact",    icon: <FaEnvelope size={14} /> },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navContainerRef = useRef(null);
  const lightRef = useRef(null);
  const hireBtnRef = useRef(null);
  const resumeBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Subtle 3D Tilt & Mouse Tracking Glow on Navbar
  const handleNavMouseMove = (e) => {
    if (!navContainerRef.current || !lightRef.current) return;
    const rect = navContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Follow-light inside navbar
    gsap.to(lightRef.current, {
      x,
      y,
      duration: 0.4,
      ease: "power2.out",
    });

    // Subtle 3D tilt (max 3 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;

    gsap.to(navContainerRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1200,
      duration: 0.5,
      ease: "power1.out",
    });
  };

  const handleNavMouseLeave = () => {
    if (!navContainerRef.current) return;
    gsap.to(navContainerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  // Magnetic button physics helper
  const handleMagneticMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" });
  };

  const handleMagneticLeave = (ref) => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 25, delay: 0.1 }}
        className="fixed inset-x-0 z-50 flex justify-center pointer-events-none px-4 select-none"
        style={{ top: scrolled ? "12px" : "20px" }}
      >
        <div
          ref={navContainerRef}
          onMouseMove={handleNavMouseMove}
          onMouseLeave={handleNavMouseLeave}
          style={{ width: "92%", maxWidth: "1400px", transformStyle: "preserve-3d" }}
          className={`pointer-events-auto relative flex items-center justify-between px-6 rounded-[18px] border transition-all duration-400 ease-out overflow-hidden ${
            scrolled
              ? "h-[60px] bg-white/80 dark:bg-[#111827]/85 backdrop-blur-[24px] border-zinc-300/80 dark:border-white/15 shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.55)] scale-[0.99]"
              : "h-[72px] bg-white/70 dark:bg-[#111827]/75 backdrop-blur-[18px] border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          }`}
        >
          {/* Mouse Following Glow Dot inside Navbar */}
          <div
            ref={lightRef}
            style={{ transform: "translate(-50%, -50%)" }}
            className="absolute top-0 left-0 w-44 h-44 rounded-full bg-[#2563EB]/15 dark:bg-[#38BDF8]/15 blur-2xl pointer-events-none"
          />

          {/* ── 1. Logo Section ───────────────────────────────────── */}
          <Link
            to="/"
            className="group flex items-center gap-3.5 transition-all duration-200 shrink-0"
          >
            <motion.div whileHover={{ scale: 1.04 }} className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors drop-shadow-xs group-hover:drop-shadow-[0_0_12px_rgba(37,99,235,0.4)]">
                  DIVYANSH
                </span>
                {/* Blue Pulsing Dot (every 2 seconds) */}
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2.5 h-2.5 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] shadow-[0_0_10px_#2563EB] dark:shadow-[0_0_10px_#38BDF8]"
                />
              </div>
              <span className="text-[9px] uppercase tracking-[0.22em] font-mono font-bold text-zinc-500 dark:text-zinc-400 -mt-0.5 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
                {t("navbar.brandSubtitle")}
              </span>
            </motion.div>
          </Link>

          {/* ── 2. Navigation Links (Center) ───────────────────────── */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const { key, path, icon } = item;
              const label = t("navbar." + key);
              const isActive =
                location.pathname === path ||
                (path !== "/" && location.pathname.startsWith(path));

              return (
                <NavLink
                  key={path}
                  to={path}
                  className={`group relative flex flex-col items-center justify-center gap-0.5 px-3 xl:px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 interactive-link ${
                    isActive
                      ? "text-white dark:text-zinc-900 font-bold"
                      : "text-zinc-600 dark:text-zinc-300 hover:text-[#2563EB] dark:hover:text-[#38BDF8] hover:-translate-y-0.5"
                  }`}
                >
                  {/* Sliding Pill Indicator for Active Page */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-[#2563EB] dark:bg-[#38BDF8] shadow-md shadow-blue-500/30"
                    />
                  )}

                  {/* Hover Background Pill for Inactive links */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-xl bg-zinc-100/80 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  )}

                  {/* Underline growing from center on hover */}
                  {!isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#2563EB] dark:bg-[#38BDF8] rounded-full group-hover:w-3/5 transition-all duration-300" />
                  )}

                  {/* Icon & Label */}
                  <span
                    className={`relative z-10 transition-transform duration-200 ${
                      isActive ? "" : "group-hover:rotate-12"
                    }`}
                  >
                    {icon}
                  </span>
                  <span className="relative z-10 tracking-tight">{label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* ── 3. Right Side Controls ─────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-3.5 shrink-0">
            <ThemeToggle />

            {/* Language Switcher Dropdown (Placed before Resume button) */}
            <LanguageSwitcher />

            {/* Resume Outline Download Button with Magnetic Hover */}
            <div
              ref={resumeBtnRef}
              onMouseMove={(e) => handleMagneticMove(e, resumeBtnRef)}
              onMouseLeave={() => handleMagneticLeave(resumeBtnRef)}
            >
              <a
                href="/resume.pdf"
                download="Divyansh_Bhadauriya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-xl border border-zinc-300 dark:border-white/20 text-zinc-700 dark:text-zinc-200 text-xs font-bold hover:bg-[#2563EB] hover:border-[#2563EB] hover:text-white dark:hover:bg-[#38BDF8] dark:hover:border-[#38BDF8] dark:hover:text-zinc-900 transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-blue-500/20 interactive-btn"
              >
                <FaFileAlt size={11} className="group-hover:-translate-y-0.5 transition-transform" />
                <span>{t("navbar.resume")}</span>
              </a>
            </div>

            {/* WhatsApp Contact Button */}
            <div>
              <WhatsAppButton variant="navbar" />
            </div>

            {/* Hire Me Gradient Pill Button with Magnetic & Arrow Slide */}
            <div
              ref={hireBtnRef}
              onMouseMove={(e) => handleMagneticMove(e, hireBtnRef)}
              onMouseLeave={() => handleMagneticLeave(hireBtnRef)}
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#38BDF8] text-white text-xs font-extrabold shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.7)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden interactive-btn"
              >
                <span className="relative z-10">{t("navbar.hireMe")}</span>
                <FaArrowRight
                  size={11}
                  className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
                />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
              </Link>
            </div>
          </div>

          {/* ── Mobile Controls Trigger ───────────────────────────── */}
          <div className="flex lg:hidden items-center gap-2.5">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-white/10 text-zinc-800 dark:text-white hover:bg-[#2563EB] hover:text-white transition-all shadow-xs"
              aria-label={t("navbar.openMenu", "Open Navigation Menu")}
            >
              <FaBars size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Premium Mobile Glass Panel Menu (Opens from right) ─────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-white/90 dark:bg-[#111827]/95 backdrop-blur-2xl border-l border-zinc-200 dark:border-white/10 rounded-l-3xl shadow-2xl z-50 flex flex-col justify-between overflow-hidden lg:hidden"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between px-7 py-6 border-b border-zinc-200 dark:border-white/10">
                <div>
                  <span className="font-heading font-extrabold tracking-wider text-base text-zinc-900 dark:text-white block">
                    DIVYANSH.
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#2563EB] dark:text-[#38BDF8] font-bold">
                    {t("navbar.navigationMenu")}
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 hover:text-white hover:bg-rose-600 transition-colors"
                  aria-label={t("navbar.closeMenu", "Close menu")}
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Staggered Navigation Items */}
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
                className="flex-1 px-5 py-6 flex flex-col gap-2 overflow-y-auto"
              >
                {NAV_ITEMS.map((item) => {
                  const { key, path, icon } = item;
                  const label = t("navbar." + key);
                  const isActive =
                    location.pathname === path ||
                    (path !== "/" && location.pathname.startsWith(path));

                  return (
                    <motion.div
                      key={path}
                      variants={{
                        hidden: { opacity: 0, x: 30 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
                      }}
                    >
                      <NavLink
                        to={path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3.5 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-[#2563EB] dark:hover:text-[#38BDF8]"
                        }`}
                      >
                        <span className="text-base">{icon}</span>
                        <span className="tracking-tight">{label}</span>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Bottom Mobile Actions */}
              <div className="p-7 border-t border-zinc-200 dark:border-white/10 space-y-3 bg-zinc-50/50 dark:bg-white/[0.02]">
                {/* Mobile Language Switcher */}
                <LanguageSwitcher isMobile={true} />

                <a
                  href="/resume.pdf"
                  download="Divyansh_Bhadauriya_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl border border-zinc-300 dark:border-white/20 text-zinc-800 dark:text-white font-bold text-sm hover:bg-zinc-100 dark:hover:bg-white/10 transition-all"
                >
                  <FaFileAlt size={14} />
                  <span>{t("navbar.resume")}</span>
                </a>

                <WhatsAppButton variant="navbar" isMobileNavbar={true} />

                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2.5 w-full py-3 rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white font-extrabold text-sm shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
                >
                  <span>{t("navbar.hireMeNow")}</span>
                  <FaArrowRight size={13} />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
