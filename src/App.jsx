import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./i18n";

/* ── Lazy Loaded Components & Route Pages ────────────────────── */
const IntroSequence = lazy(() => import("./components/IntroSequence"));
const Home        = lazy(() => import("./pages/Home"));
const About       = lazy(() => import("./pages/About"));
const Skills      = lazy(() => import("./pages/Skills"));
const Projects    = lazy(() => import("./pages/Projects"));
const Experience  = lazy(() => import("./pages/Experience"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Resume      = lazy(() => import("./pages/Resume"));
const Contact     = lazy(() => import("./pages/Contact"));
const NotFound    = lazy(() => import("./pages/NotFound"));

/* ── Minimal Page Loading Spinner ───────────────────────────── */
function PageSpinner() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-[#2563EB] dark:border-t-[#38BDF8] animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-[#2563EB]/20 dark:bg-[#38BDF8]/20 blur-md animate-pulse" />
      </div>
    </div>
  );
}

/* ── Layout Wrapper with Animated Page Transitions ───────────── */
function PageLayoutWrapper() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Suspense fallback={<PageSpinner />}>
              <Routes location={location}>
                <Route path="/"             element={<Home />} />
                <Route path="/about"        element={<About />} />
                <Route path="/skills"       element={<Skills />} />
                <Route path="/projects"     element={<Projects />} />
                <Route path="/projects/:id" element={<Projects />} />
                <Route path="/experience"   element={<Experience />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/resume"       element={<Resume />} />
                <Route path="/contact"      element={<Contact />} />
                <Route path="/404"          element={<NotFound />} />
                <Route path="*"             element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    const hasSeen = sessionStorage.getItem("hasSeenIntro");
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return hasSeen !== "true" && !reducedMotion;
  });

  return (
    <ThemeProvider>
      <SmoothScroll>
        <Router>
          <div className="relative min-h-screen font-sans antialiased bg-background text-foreground transition-colors duration-300">
            {/* Fullscreen Intro Sequence Overlay (Plays only once per session) */}
            <AnimatePresence>
              {showIntro && (
                <Suspense fallback={null}>
                  <IntroSequence onComplete={() => setShowIntro(false)} />
                </Suspense>
              )}
            </AnimatePresence>

            {/* Global Overlays & Visual Feedback */}
            <CustomCursor />
            <ScrollProgressBar />
            <Background />

            {/* Application Tree */}
            <PageLayoutWrapper />
          </div>
        </Router>
      </SmoothScroll>
    </ThemeProvider>
  );
}
