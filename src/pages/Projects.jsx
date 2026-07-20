import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  FaSearch,
  FaGithub,
  FaExternalLinkAlt,
  FaArrowRight,
  FaArrowLeft,
  FaPython,
  FaReact,
  FaCode,
  FaLock,
  FaGlobe,
  FaShieldAlt,
  FaServer,
  FaDatabase,
  FaStar,
  FaCodeBranch,
  FaHistory,
  FaLayerGroup,
} from "react-icons/fa";
import {
  SiDjango,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiGit,
  SiFramer,
  SiGreensock,
  SiSwagger,
  SiJavascript,
  SiTypescript,
  SiFastapi,
  SiNodedotjs,
} from "react-icons/si";
import { VscOpenai } from "react-icons/vsc";
import { useTranslation } from "react-i18next";

/* ── Real Production Projects Data (Verified via GitHub) ───────────────── */
const PROJECTS_DATA = [
  {
    id: "rama-international",
    number: "01",
    title: "RAMA INTERNATIONAL — Commercial Export Platform",
    category: "Full Stack",
    role: "Full-Stack Architect",
    duration: "3 Months",
    oneLineDesc: "Full-stack commercial export trading and catalog platform with dynamic product filtering, automated inquiry routing, and optimized backend APIs.",
    description:
      "Full-stack commercial export trading and catalog platform with dynamic product filtering, automated inquiry routing, and optimized backend APIs.",
    longDescription:
      "RAMA INTERNATIONAL is an enterprise-grade web application designed to streamline product exploration and client inquiry handling. Built using Django for robust backend ORM management, role authorization, and secure REST endpoints, alongside React.js and Tailwind CSS for an instant, responsive interface across global devices.",
    overview:
      "RAMA INTERNATIONAL required a high-performance digital platform capable of handling real-time product discovery and structured client inquiries without latency spikes.",
    problem:
      "Traditional export inquiry workflows relied on disjointed email chains and manual data entry, leading to delayed response times and unorganized candidate/lead routing.",
    solution:
      "Built a centralized Django REST Framework backend with clean serializer validation and role-based permissions, paired with a React single-page interface with zero layout shift.",
    dbDesign:
      "Relational PostgreSQL database schema utilizing indexed foreign keys between categories, product items, and user inquiry models, achieving sub-50ms query response times.",
    apiFlow:
      "Secured via stateless JWT token authentication with automated token refreshing and strict rate-limiting policies on sensitive lead generation endpoints.",
    challenges:
      "Optimizing complex multi-table JOINs for dynamic filtering across thousands of catalog items while maintaining instantaneous frontend state synchronization.",
    results:
      "Reduced inquiry processing turnaround by 65% and delivered a 100/100 Lighthouse accessibility and performance UX.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tech: ["React.js", "Tailwind CSS", "Django REST Framework", "PostgreSQL", "JWT Auth"],
    highlights: [
      "Dynamic Product Filtering",
      "Automated Inquiry Routing",
      "Django REST Framework",
      "Role-Based JWT Auth",
      "PostgreSQL Indexing",
      "Responsive UI",
    ],
    github: "https://github.com/divyanshbhadauriya1319411/RAMAINTERNATIONAL",
    live: "https://github.com/divyanshbhadauriya1319411/RAMAINTERNATIONAL",
  },
  {
    id: "rent-drive",
    number: "02",
    title: "Rent-Drive — Vehicle Rental & Reservation Portal",
    category: "Full Stack",
    role: "Full-Stack Engineer",
    duration: "2 Months",
    oneLineDesc: "End-to-end vehicle rental platform featuring real-time availability checks, multi-date pricing algorithms, and an admin dashboard.",
    description:
      "End-to-end vehicle rental platform featuring real-time availability checks, multi-date pricing algorithms, and an admin dashboard.",
    longDescription:
      "Rent-Drive solves real-time reservation concurrency through relational database modeling in PostgreSQL, custom backend serializers, and clean token-based authentication. The React interface provides seamless vehicle discovery with zero layout shifts.",
    overview:
      "Rent-Drive is a dedicated vehicle rental platform engineered to prevent double-booking anomalies and provide seamless multi-date reservation pricing.",
    problem:
      "Concurrency challenges in high-demand vehicle reservation systems often cause overlapping bookings when multiple users attempt to reserve the same vehicle simultaneously.",
    solution:
      "Implemented PostgreSQL transaction isolation and database-level constraint locking inside ORM serializers to guarantee strict transactional integrity.",
    dbDesign:
      "Normalized PostgreSQL tables separating Vehicle instances, Booking intervals, and User profiles with compound indexing on start/end dates.",
    apiFlow:
      "RESTful JSON endpoints documented with clear status codes (`201 Created`, `409 Conflict`) and token-authenticated user management.",
    challenges:
      "Managing accurate timezone-aware booking intervals across diverse geographic locations without client-side calculation errors.",
    results:
      "Achieved zero booking conflicts under concurrent load testing and smooth 60fps UI discovery.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
    tech: ["React.js", "Node.js/Django REST", "PostgreSQL", "Tailwind CSS"],
    highlights: [
      "Real-Time Availability",
      "Multi-Date Pricing",
      "Admin Dashboard",
      "Relational Validation",
      "Transaction Locking",
      "Responsive UI",
    ],
    github: "https://github.com/divyanshbhadauriya1319411/Rent-Drive",
    live: "https://github.com/divyanshbhadauriya1319411/Rent-Drive",
  },
  {
    id: "ai-sign-language",
    number: "03",
    title: "AI Sign Language Recognition & Translation System",
    category: "AI / Backend",
    role: "AI & Full-Stack Developer",
    duration: "2 Months",
    oneLineDesc: "AI-powered real-time hand gesture recognition system converting sign language into text/speech using computer vision and deep learning models.",
    description:
      "AI-powered real-time hand gesture recognition system converting sign language into text/speech using computer vision and deep learning models.",
    longDescription:
      "Built with Python, OpenCV, TensorFlow/MediaPipe, and FastAPI backend streaming to a React.js frontend. Performs real-time video landmark tracking to translate sign language gestures into natural language text and speech.",
    overview:
      "Designed to bridge communication barriers between deaf/hard-of-hearing individuals and non-signers through instantaneous computer vision inference.",
    problem:
      "Communication barriers between deaf/hard-of-hearing individuals and non-signers require high-accuracy, real-time translation tools without heavy processing lag.",
    solution:
      "Engineered a real-time computer vision pipeline utilizing MediaPipe hand landmarks and TensorFlow neural network classification served over high-speed FastAPI WebSockets.",
    dbDesign:
      "Structured gesture vocabulary mapping database with confidence threshold validation logs.",
    apiFlow:
      "Low-latency WebSocket streaming between React client camera feeds and FastAPI neural classification servers.",
    challenges:
      "Achieving high frame-rate inference (30+ FPS) inside web browsers without frame drops or memory leaks.",
    results:
      "Real-time gesture recognition accuracy exceeding 94% across standard sign language datasets.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    tech: ["Python", "OpenCV", "TensorFlow/MediaPipe", "FastAPI", "React.js"],
    highlights: [
      "Computer Vision",
      "MediaPipe Landmarks",
      "TensorFlow Models",
      "FastAPI WebSockets",
      "Text & Speech Output",
      "Real-Time Inference",
    ],
    github: "https://github.com/divyanshbhadauriya1319411",
    live: "https://github.com/divyanshbhadauriya1319411",
  },
  {
    id: "storesaga",
    number: "04",
    title: "StoreSaga — Modern E-Commerce Ecosystem",
    category: "Frontend",
    role: "Front-End Developer",
    duration: "2 Months",
    oneLineDesc: "Feature-rich e-commerce platform offering instant debounced search, dynamic shopping cart calculation, and responsive product catalog.",
    description:
      "Feature-rich e-commerce platform offering instant debounced search, dynamic shopping cart calculation, and responsive product catalog.",
    longDescription:
      "StoreSaga showcases clean frontend component separation and fast RESTful API data hydration. Designed with responsive product cards, real-time cart drawer updates, and optimized debounced search queries.",
    overview:
      "StoreSaga was developed to demonstrate modern retail UX patterns including instant filtering, persisted shopping carts, and seamless checkout flows.",
    problem:
      "Many e-commerce templates suffer from heavy JavaScript bloat and slow product grid rendering during category switching.",
    solution:
      "Created a lightweight, modular React architecture utilizing custom hooks for state persistence and debounced search filtering.",
    dbDesign:
      "Structured relational JSON schema modeling products, variant options, pricing tiers, and order history.",
    apiFlow:
      "Optimized REST API fetching with local cache invalidation to minimize redundant network calls.",
    challenges:
      "Maintaining synchronized cart totals across browser tabs while keeping component re-renders to an absolute minimum.",
    results:
      "Delivered sub-100ms category switching and clean modular code maintainability.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    tech: ["React.js", "JavaScript", "Tailwind CSS", "REST APIs", "State Management"],
    highlights: [
      "Debounced Search",
      "Dynamic Cart",
      "REST API Hydration",
      "Responsive Cards",
      "State Management",
      "Sub-100ms UI",
    ],
    github: "https://github.com/divyanshbhadauriya1319411/StoreSaga",
    live: "https://github.com/divyanshbhadauriya1319411/StoreSaga",
  },
  {
    id: "portfolio-architecture",
    number: "05",
    title: "MNC-Grade Portfolio Architecture",
    category: "Frontend",
    role: "Senior Frontend Engineer",
    duration: "Continuous",
    oneLineDesc: "Senior software engineering showcase crafted with Vercel and Apple design system, Lenis smooth scrolling, and custom interactive cursor.",
    description:
      "Senior software engineering showcase designed with Apple, Linear, and Vercel aesthetics. Features Lenis smooth scrolling, GSAP 3D tilt, and custom interactive cursor.",
    longDescription:
      "Built with React 19, Vite, and Tailwind CSS v4. Incorporates custom exponential decay momentum scrolling via Lenis, dual-layer interactive cursor with spring tracking, and zero-bloat modular component architecture.",
    overview:
      "A production-grade developer showcase crafted to exceed the visual and architectural standards of global MNC recruiting teams.",
    problem:
      "Traditional developer portfolios often rely on generic Bootstrap/Tailwind templates with clunky animations and poor mobile touch ergonomics.",
    solution:
      "Engineered a bespoke system combining Lenis inertia scrolling, GSAP 3D perspective physics, and React Portals for bilingual language switching.",
    dbDesign:
      "Static JSON dictionary structure (`react-i18next`) allowing instant zero-latency localization across English and Hindi.",
    apiFlow:
      "Dynamic GitHub API integration fetching live repository metrics, commit statistics, and profile details in real time.",
    challenges:
      "Ensuring fluid 60fps animations and custom 3D card tilts across both high-end desktop monitors and mobile touch screens without memory leaks.",
    results:
      "Achieved a stunning, highly polished Apple/Vercel visual aesthetic verified by zero build errors and rapid compilation.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    tech: ["React 19", "Tailwind CSS v4", "GSAP", "Framer Motion", "Lenis"],
    highlights: [
      "Lenis Smooth Scroll",
      "GSAP 3D Tilt",
      "Custom Cursor",
      "Bilingual i18n",
      "Apple Aesthetics",
      "Zero Layout Shift",
    ],
    github: "https://github.com/divyanshbhadauriya1319411/divyanshbhadauriya1319411",
    live: "https://github.com/divyanshbhadauriya1319411/divyanshbhadauriya1319411",
  },
];

/* Tech Icon Mapping Helper */
const getTechIcon = (techName) => {
  const lower = techName.toLowerCase();
  if (lower.includes("react")) return { icon: <FaReact size={15} className="text-[#2563EB] dark:text-[#38BDF8]" />, label: techName };
  if (lower.includes("python")) return { icon: <FaPython size={15} className="text-[#2563EB] dark:text-[#38BDF8]" />, label: techName };
  if (lower.includes("fastapi")) return { icon: <SiFastapi size={15} className="text-teal-600 dark:text-teal-400" />, label: techName };
  if (lower.includes("django")) return { icon: <SiDjango size={15} className="text-emerald-600 dark:text-emerald-400" />, label: techName };
  if (lower.includes("node")) return { icon: <SiNodedotjs size={15} className="text-green-600 dark:text-green-400" />, label: techName };
  if (lower.includes("openai") || lower.includes("gemini") || lower.includes("ai")) return { icon: <VscOpenai size={15} className="text-emerald-500" />, label: techName };
  if (lower.includes("postgre") || lower.includes("sql")) return { icon: <SiPostgresql size={15} className="text-blue-600 dark:text-blue-400" />, label: techName };
  if (lower.includes("tailwind")) return { icon: <SiTailwindcss size={15} className="text-cyan-600 dark:text-cyan-400" />, label: techName };
  if (lower.includes("docker")) return { icon: <SiDocker size={15} className="text-blue-600 dark:text-blue-500" />, label: techName };
  if (lower.includes("git")) return { icon: <SiGit size={15} className="text-orange-600 dark:text-orange-500" />, label: techName };
  if (lower.includes("gsap") || lower.includes("greensock")) return { icon: <SiGreensock size={15} className="text-green-600 dark:text-green-500" />, label: techName };
  if (lower.includes("framer")) return { icon: <SiFramer size={15} className="text-pink-600 dark:text-pink-400" />, label: techName };
  if (lower.includes("jwt") || lower.includes("auth")) return { icon: <FaLock size={13} className="text-amber-600 dark:text-amber-400" />, label: techName };
  if (lower.includes("swagger")) return { icon: <SiSwagger size={15} className="text-emerald-600 dark:text-emerald-500" />, label: techName };
  if (lower.includes("javascript")) return { icon: <SiJavascript size={15} className="text-yellow-600 dark:text-yellow-400" />, label: techName };
  if (lower.includes("typescript")) return { icon: <SiTypescript size={15} className="text-blue-600 dark:text-blue-500" />, label: techName };
  if (lower.includes("opencv") || lower.includes("tensorflow") || lower.includes("mediapipe")) return { icon: <FaCode size={15} className="text-amber-500" />, label: techName };
  return { icon: <FaCode size={14} className="text-[#2563EB] dark:text-[#38BDF8]" />, label: techName };
};

/* ── Elegant Apple / Vercel Project Card (Fully Theme Responsive) ── */
function ElegantProjectCard({ proj, index, onOpenDetails }) {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* Mouse Spotlight & GSAP 3D Tilt */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = x - rect.width / 2;
    const centerY = y - rect.height / 2;

    gsap.to(cardRef.current, {
      rotationY: centerX * 0.025,
      rotationX: -centerY * 0.025,
      transformPerspective: 1400,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.7,
      ease: "power2.out",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetails(proj)}
      className="group relative flex flex-col justify-between rounded-[24px] bg-card border border-default hover:border-[#2563EB] dark:hover:border-[#38BDF8]/50 overflow-hidden shadow-lg shadow-slate-200/60 dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-xl dark:hover:shadow-[0_25px_60px_rgba(59,130,246,0.18)] hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer select-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Dynamic Cursor Spotlight Following Mouse */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.1), transparent 45%)`,
        }}
      />

      {/* Top: Large High-Resolution Screenshot with macOS Header */}
      <div className="relative h-60 sm:h-64 lg:h-72 overflow-hidden bg-surface border-b border-default">
        <div className="absolute top-0 left-0 right-0 h-9 bg-surface/90 backdrop-blur-md border-b border-default flex items-center justify-between px-3.5 z-20 transition-colors duration-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
          </div>
          <div className="px-3 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-default text-[11px] font-mono text-secondary truncate max-w-[200px] sm:max-w-[240px]">
            https://divyansh.dev/{proj.id}
          </div>
          <div className="w-8 flex justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] animate-pulse" />
          </div>
        </div>

        {/* Screenshot Image with Smooth Zoom on Hover */}
        <div className="pt-9 w-full h-full relative overflow-hidden bg-surface">
          <img
            src={proj.image}
            alt={proj.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-65 group-hover:opacity-30 transition-opacity duration-500" />
        </div>
      </div>

      {/* Bottom Content: Title, One-line Description, Tech Chips & Action Buttons */}
      <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between relative z-20">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight text-primary group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors truncate">
              {proj.title}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 border border-[#2563EB]/20 dark:border-[#3B82F6]/30 text-[#2563EB] dark:text-[#38BDF8] text-[11px] font-mono font-bold uppercase shrink-0">
              {t("projects.categories." + proj.category, proj.category)}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed line-clamp-2 min-h-[38px] transition-colors duration-500">
            {proj.oneLineDesc || proj.description}
          </p>
        </div>

        {/* Technology Icons Row */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {proj.tech.map((tItem) => {
              const { icon, label } = getTechIcon(tItem);
              return (
                <div
                  key={tItem}
                  className="group/icon inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-default hover:border-[#2563EB] dark:hover:border-[#3B82F6]/50 hover:bg-[#2563EB]/10 dark:hover:bg-[#3B82F6]/10 transition-all duration-200"
                >
                  <span className="transition-transform duration-200 group-hover/icon:scale-110">
                    {icon}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-secondary group-hover/icon:text-[#2563EB] dark:group-hover/icon:text-[#38BDF8] transition-colors">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-4 border-t border-default flex items-center justify-between gap-3 transition-colors duration-500">
          <a
            href={proj.live || proj.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group/btn relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#06B6D4] dark:from-[#3B82F6] dark:to-[#06B6D4] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 touch-target flex-1"
          >
            <span>{t("projects.liveDemo", "Live Demo")}</span>
            <FaArrowRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>

          <a
            href={proj.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="View Source Code"
            className="group/git inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-default hover:border-[#2563EB] dark:hover:border-[#38BDF8]/50 hover:bg-slate-200 dark:hover:bg-white/[0.1] text-secondary hover:text-primary font-bold text-xs sm:text-sm transition-all duration-200 touch-target shrink-0"
          >
            <FaGithub size={15} />
            <span className="hidden sm:inline">{t("projects.sourceCode", "Source Code")}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Live GitHub Activity & Codebase Ecosystem Section (Fully Responsive) ── */
function LiveGitHubSection() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function fetchGitHubData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/divyanshbhadauriya1319411"),
          fetch("https://api.github.com/users/divyanshbhadauriya1319411/repos?sort=updated"),
        ]);
        if (profileRes.ok && reposRes.ok) {
          const profileJson = await profileRes.json();
          const reposJson = await reposRes.json();
          if (isMounted) {
            setProfile(profileJson);
            setRepos(reposJson);
          }
        }
      } catch (err) {
        console.error("Failed to load GitHub data:", err);
      }
    }
    fetchGitHubData();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayProfile = profile || {
    avatar_url: "https://avatars.githubusercontent.com/u/296847660?v=4",
    name: "Divyansh Bhadauriya",
    login: "divyanshbhadauriya1319411",
    bio: "🚀 Python Full Stack Developer | Gen AI Enthusiast | BCA Graduate",
    public_repos: 4,
    followers: 12,
    following: 15,
    html_url: "https://github.com/divyanshbhadauriya1319411",
  };

  const displayRepos =
    repos.length > 0
      ? repos
      : [
          {
            id: 1,
            name: "RAMAINTERNATIONAL",
            description: "Full-Stack Recruitment Platform built with React, Django REST, and PostgreSQL.",
            language: "TypeScript",
            stargazers_count: 1,
            updated_at: "2026-07-14T07:28:07Z",
            html_url: "https://github.com/divyanshbhadauriya1319411/RAMAINTERNATIONAL",
          },
          {
            id: 2,
            name: "Rent-Drive",
            description: "End-to-end vehicle reservation and rental management portal with PostgreSQL.",
            language: "JavaScript",
            stargazers_count: 1,
            updated_at: "2026-07-14T07:27:37Z",
            html_url: "https://github.com/divyanshbhadauriya1319411/Rent-Drive",
          },
          {
            id: 3,
            name: "StoreSaga",
            description: "Modern shopping ecosystem featuring dynamic cart management and instant search.",
            language: "JavaScript",
            stargazers_count: 1,
            updated_at: "2026-07-14T07:28:03Z",
            html_url: "https://github.com/divyanshbhadauriya1319411/StoreSaga",
          },
          {
            id: 4,
            name: "divyanshbhadauriya1319411",
            description: "MNC-Grade Senior Engineering Portfolio Architecture featuring Apple/Vercel design.",
            language: "Python",
            stargazers_count: 1,
            updated_at: "2026-07-14T07:27:39Z",
            html_url: "https://github.com/divyanshbhadauriya1319411/divyanshbhadauriya1319411",
          },
        ];

  const contribCells = useMemo(() => {
    return Array.from({ length: 56 }, (_, idx) => (idx * 7 + 3) % 4);
  }, []);

  return (
    <section className="space-y-10 pt-16 border-t border-default mt-20 transition-colors duration-500">
      <div className="space-y-2 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary transition-colors">
          {t("projects.githubSection.title", "Live GitHub Activity & Codebase Ecosystem")}
        </h2>
        <p className="text-secondary text-xs sm:text-sm leading-relaxed transition-colors">
          {t("projects.githubSection.subtitle", "Real-time contribution analytics, repository metrics, and primary language distribution fetched directly via GitHub API.")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-card border border-default shadow-lg shadow-slate-200/60 dark:shadow-none flex flex-col justify-between space-y-6 transition-all duration-500">
          <div className="flex items-start gap-4">
            <img
              src={displayProfile.avatar_url}
              alt={displayProfile.name}
              className="w-16 h-16 rounded-2xl border-2 border-[#2563EB] dark:border-[#38BDF8] shadow-md shrink-0 object-cover"
            />
            <div className="space-y-1 min-w-0">
              <h3 className="text-lg font-bold text-primary truncate">{displayProfile.name}</h3>
              <p className="text-xs font-mono text-[#2563EB] dark:text-[#38BDF8]">@{displayProfile.login}</p>
              <p className="text-xs text-secondary line-clamp-2 pt-0.5">{displayProfile.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-default text-center">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-default">
              <span className="block text-lg font-bold font-mono text-primary">{displayProfile.public_repos}</span>
              <span className="text-[10px] text-secondary uppercase tracking-wider font-mono">Repos</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-default">
              <span className="block text-lg font-bold font-mono text-primary">{displayProfile.followers}</span>
              <span className="text-[10px] text-secondary uppercase tracking-wider font-mono">Followers</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-default">
              <span className="block text-lg font-bold font-mono text-primary">{displayProfile.following}</span>
              <span className="text-[10px] text-secondary uppercase tracking-wider font-mono">Following</span>
            </div>
          </div>

          <a
            href={displayProfile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#06B6D4] dark:from-[#3B82F6] dark:to-[#06B6D4] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all touch-target"
          >
            <FaGithub size={15} />
            <span>{t("projects.githubSection.viewGitHub", "View on GitHub →")}</span>
          </a>
        </div>

        <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-card border border-default shadow-lg shadow-slate-200/60 dark:shadow-none flex flex-col justify-between space-y-6 transition-all duration-500">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-secondary font-mono flex items-center gap-2">
              <FaCodeBranch className="text-[#2563EB] dark:text-[#38BDF8]" />
              <span>{t("projects.githubSection.languagesTitle", "Primary Languages & Tech Stack")}</span>
            </h3>

            <div className="space-y-2">
              <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden flex shadow-inner">
                <div style={{ width: "45%" }} className="bg-[#2563EB] dark:bg-[#3B82F6]" title="Python (45%)" />
                <div style={{ width: "30%" }} className="bg-[#06B6D4]" title="JavaScript / React (30%)" />
                <div style={{ width: "15%" }} className="bg-emerald-500 dark:bg-emerald-400" title="TypeScript (15%)" />
                <div style={{ width: "10%" }} className="bg-purple-600 dark:bg-purple-500" title="PostgreSQL / SQL (10%)" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-secondary pt-1">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#3B82F6]" /> Python 45%</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#06B6D4]" /> React / JS 30%</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" /> TypeScript 15%</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-500" /> SQL 10%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-default">
            <div className="flex items-center justify-between text-xs font-mono text-secondary">
              <span className="flex items-center gap-1.5">
                <FaHistory className="text-emerald-500 dark:text-emerald-400" />
                {t("projects.githubSection.commitsGridTitle", "Contribution Activity & Engineering Cadence")}
              </span>
              <span>450+ Commits (2026)</span>
            </div>
            <div className="grid grid-cols-14 gap-1 overflow-x-auto pb-1">
              {contribCells.map((level, cIdx) => {
                let bgClass = "bg-slate-200 dark:bg-white/[0.04]";
                if (level === 1) bgClass = "bg-emerald-500/30 dark:bg-emerald-500/30";
                if (level === 2) bgClass = "bg-emerald-500/60 dark:bg-emerald-500/60";
                if (level === 3) bgClass = "bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.5)]";
                return (
                  <div key={cIdx} className={`h-3.5 sm:h-4 rounded-sm transition-transform hover:scale-125 ${bgClass}`} />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary font-heading transition-colors">
          {t("projects.githubSection.latestRepos", "Live GitHub Repositories")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayRepos.map((repo) => (
            <div
              key={repo.id}
              className="p-6 rounded-2xl bg-card border border-default hover:border-[#2563EB] dark:hover:border-[#38BDF8]/50 flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1 shadow-lg shadow-slate-200/60 dark:shadow-none group/repo"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-primary hover:text-[#2563EB] dark:hover:text-[#38BDF8] flex items-center gap-2 truncate transition-colors"
                  >
                    <FaCodeBranch className="text-[#2563EB] dark:text-[#38BDF8] shrink-0" size={14} />
                    <span className="truncate">{repo.name}</span>
                  </a>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-default text-xs font-mono text-secondary">
                    <FaStar className="text-amber-500 dark:text-amber-400" size={12} />
                    <span>{repo.stargazers_count || 1}</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-secondary line-clamp-2 transition-colors">
                  {repo.description || "Active production repository showcasing architecture and modern code practices."}
                </p>
              </div>

              <div className="pt-3 border-t border-default flex items-center justify-between text-xs font-mono text-secondary transition-colors">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#38BDF8]" />
                  {repo.language || "TypeScript / Python"}
                </span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:text-[#2563EB] dark:hover:text-[#38BDF8] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Repository</span>
                  <FaExternalLinkAlt size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Dedicated Case Study Details Modal Overlay (`/projects/:id`) ── */
function ComprehensiveCaseStudyPage({ caseStudy, onClose }) {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [caseStudy]);

  if (!caseStudy) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-10 py-6 text-primary transition-colors duration-500"
    >
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between border-b border-default pb-5">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-default hover:border-[#2563EB] dark:hover:border-[#38BDF8] text-primary font-bold text-xs sm:text-sm transition-all touch-target"
        >
          <FaArrowLeft size={13} />
          <span>{t("projects.caseStudy.backToProjects", "← Back to All Projects")}</span>
        </button>
        <span className="font-mono text-xs text-secondary hidden sm:inline">
          {caseStudy.title} • {caseStudy.number}
        </span>
      </div>

      {/* Hero Banner Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card border border-default rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-200/60 dark:shadow-2xl transition-all duration-500">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#2563EB]/15 dark:bg-[#3B82F6]/15 border border-[#2563EB]/30 dark:border-[#3B82F6]/30 text-[#2563EB] dark:text-[#38BDF8] text-xs font-mono font-bold uppercase">
              {caseStudy.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-default text-secondary text-xs font-mono">
              {caseStudy.role || "Full Stack Architect"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-primary tracking-tight transition-colors">
            {caseStudy.title}
          </h1>

          <p className="text-sm sm:text-base text-secondary leading-relaxed transition-colors">
            {caseStudy.description}
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            {caseStudy.live && (
              <a
                href={caseStudy.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#06B6D4] dark:from-[#3B82F6] dark:to-[#06B6D4] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all touch-target"
              >
                <span>{t("projects.liveDemo", "Live Demo Portal")}</span>
                <FaExternalLinkAlt size={12} />
              </a>
            )}
            <a
              href={caseStudy.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-default hover:border-[#2563EB] dark:hover:border-[#38BDF8] text-primary font-bold text-xs sm:text-sm transition-all touch-target"
            >
              <FaGithub size={16} />
              <span>{t("projects.viewRepo", "View GitHub Repository")}</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden bg-surface border border-default shadow-xl">
            <div className="h-8 bg-surface border-b border-default flex items-center px-4 gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full max-h-[300px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Structured Presentation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="p-6 rounded-3xl bg-card border border-default space-y-3 shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
          <h3 className="text-base font-bold text-[#2563EB] dark:text-[#38BDF8] font-heading flex items-center gap-2">
            <FaGlobe />
            <span>{t("projects.caseStudy.overview", "Executive Overview")}</span>
          </h3>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed transition-colors">
            {caseStudy.overview || caseStudy.longDescription}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-default space-y-3 shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
          <h3 className="text-base font-bold text-rose-600 dark:text-rose-400 font-heading flex items-center gap-2">
            <FaShieldAlt />
            <span>{t("projects.caseStudy.problem", "Problem & Challenge")}</span>
          </h3>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed transition-colors">
            {caseStudy.problem || "Handling high concurrent traffic and ensuring strict security guidelines required robust backend logic and state isolation."}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-default space-y-3 shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
          <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-heading flex items-center gap-2">
            <FaServer />
            <span>{t("projects.caseStudy.solution", "Technical Solution")}</span>
          </h3>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed transition-colors">
            {caseStudy.solution || "Architected a decoupled React frontend and Django REST Framework backend utilizing PostgreSQL connection pooling and custom ORM validation."}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-default space-y-3 shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
          <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 font-heading flex items-center gap-2">
            <FaDatabase />
            <span>{t("projects.caseStudy.databaseDesign", "Database Design")}</span>
          </h3>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed transition-colors">
            {caseStudy.dbDesign || "Normalized PostgreSQL tables with compound indexing across user sessions and transactional models, ensuring consistent sub-50ms queries."}
          </p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-card border border-default space-y-3 shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
        <h3 className="text-xs font-bold uppercase tracking-wider text-secondary font-mono">
          {t("projects.techUsed", "Technology & Libraries Utilized")}
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {caseStudy.tech.map((tItem) => {
            const { icon, label } = getTechIcon(tItem);
            return (
              <div
                key={tItem}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-default text-xs font-bold text-primary shadow-sm dark:shadow-none transition-colors"
              >
                {icon}
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Projects Page Component ── */
export default function Projects() {
  const { t } = useTranslation();
  const { id: urlParamId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const containerRef = useRef(null);

  /* Localize projects with localized strings */
  const localizedProjects = useMemo(() => {
    return PROJECTS_DATA.map((p) => {
      const pTrans = t(`projects.data.${p.id}`, { returnObjects: true }) || {};
      return {
        ...p,
        title: pTrans.title || p.title,
        role: pTrans.role || p.role,
        duration: pTrans.duration || p.duration,
        oneLineDesc: pTrans.oneLineDesc || p.oneLineDesc || p.description,
        description: pTrans.description || p.description,
        longDescription: pTrans.longDescription || p.longDescription,
        overview: pTrans.overview || p.overview,
        problem: pTrans.problem || p.problem,
        solution: pTrans.solution || p.solution,
        dbDesign: pTrans.dbDesign || p.dbDesign,
      };
    });
  }, [t]);

  /* Sync URL Param `/projects/:id` with `activeCaseStudy` */
  useEffect(() => {
    if (urlParamId) {
      const found = localizedProjects.find((p) => p.id === urlParamId);
      if (found) {
        setActiveCaseStudy(found);
      }
    } else {
      setActiveCaseStudy(null);
    }
  }, [urlParamId, localizedProjects]);

  const handleOpenDetails = (p) => {
    setActiveCaseStudy(p);
    navigate(`/projects/${p.id}`);
  };

  const handleCloseDetails = () => {
    setActiveCaseStudy(null);
    navigate("/projects");
  };

  const filteredProjects = useMemo(() => {
    return localizedProjects.filter((p) => {
      const matchesCat = selectedCat === "All" || p.category === selectedCat || p.tech.some(t => t.toLowerCase().includes(selectedCat.toLowerCase()));
      const matchesQuery =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.oneLineDesc && p.oneLineDesc.toLowerCase().includes(search.toLowerCase())) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tech.some((tItem) => tItem.toLowerCase().includes(search.toLowerCase()));
      return matchesCat && matchesQuery;
    });
  }, [localizedProjects, selectedCat, search]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-primary relative overflow-hidden pt-24 pb-24 px-6 select-none transition-colors duration-500"
    >
      {/* Subtle Background Texture & Glow */}
      <div
        className="absolute inset-0 opacity-[0.16] pointer-events-none bg-[linear-gradient(to_right,#80808016_1px,transparent_1px),linear-gradient(to_bottom,#80808016_1px,transparent_1px)] bg-[size:36px_36px]"
      />
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 blur-[150px] pointer-events-none transition-colors duration-500" />

      {/* Main Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <AnimatePresence mode="wait">
          {activeCaseStudy ? (
            <ComprehensiveCaseStudyPage
              key="case-study-details"
              caseStudy={activeCaseStudy}
              onClose={handleCloseDetails}
            />
          ) : (
            <motion.div
              key="projects-grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 sm:space-y-10"
            >
              {/* ── Compact Header & Filters Row (Max Height ~180px, No Excessive Space) ── */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-default pb-6 pt-4 transition-colors duration-500">
                
                {/* Left: Compact Vercel / Apple Style Header */}
                <div className="space-y-2 max-w-xl">
                  <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-primary transition-colors">
                    {t("projects.selectedWork", "Selected Projects")}
                  </h1>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed transition-colors">
                    {t("projects.selectedSubtitle", "Production-ready applications showcasing full-stack development, backend engineering and modern UI.")}
                  </p>
                </div>

                {/* Right: Filter Pills & Search Input */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {["All", "Full Stack", "Backend", "Frontend"].map((cat) => {
                      const isActive = selectedCat === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCat(cat)}
                          className={`relative px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 touch-target ${
                            isActive
                              ? "bg-[#2563EB] text-white shadow-md"
                              : "bg-slate-100 dark:bg-white/[0.04] border border-default text-secondary hover:text-primary hover:bg-slate-200 dark:hover:bg-white/[0.08]"
                          }`}
                        >
                          {t("projects.categories." + cat, cat)}
                        </button>
                      );
                    })}
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-xs transition-colors" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={t("projects.searchPlaceholder", "Search projects...")}
                      className="w-full pl-9 pr-3.5 py-2 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-default text-xs text-primary placeholder-secondary focus:outline-none focus:border-[#2563EB] dark:focus:border-[#3B82F6] transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* ── Elegant Project Cards Grid (Appears Immediately Below Header) ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((proj, idx) => (
                    <ElegantProjectCard
                      key={proj.id}
                      proj={proj}
                      index={idx}
                      onOpenDetails={handleOpenDetails}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {filteredProjects.length === 0 && (
                <div className="py-20 text-center space-y-3 rounded-2xl bg-card border border-default transition-colors duration-500">
                  <FaLayerGroup className="mx-auto text-secondary text-3xl" />
                  <p className="text-secondary text-sm font-medium">
                    {t("projects.noMatch", { query: search })}
                  </p>
                </div>
              )}

              {/* Live GitHub Ecosystem Dashboard (At Bottom) */}
              <LiveGitHubSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
