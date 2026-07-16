import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroSequence({ onComplete }) {
  const canvasRef = useRef(null);
  const [stage, setStage] = useState(0); // 0: init/bg, 1: logo letters, 2: light sweep, 3: tagline lines, 4: exit

  /* ── 1. Accessibility & Session Storage Check ── */
  useEffect(() => {
    // Check if user prefers reduced motion or if intro already played in this session
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

    if (reducedMotion || hasSeenIntro === "true") {
      onComplete();
      return;
    }

    // Set session storage flag immediately so refreshes skip intro
    sessionStorage.setItem("hasSeenIntro", "true");

    // Choreographed timeline (Target total ~2.8s - 3s)
    const t1 = setTimeout(() => setStage(1), 200);  // Step 2: Logo stagger & blur enter
    const t2 = setTimeout(() => setStage(2), 1000); // Step 3: Light sweep & glow
    const t3 = setTimeout(() => setStage(3), 1350); // Step 4: Tagline lines enter
    const t4 = setTimeout(() => setStage(4), 2350); // Step 5: Exit transition initiation
    const t5 = setTimeout(() => {
      onComplete();
    }, 2950); // Final complete unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  /* ── 2. High-Performance 60fps Canvas Particle Engine (rAF) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create 45 ambient glowing particles
    const particleCount = width < 768 ? 25 : 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      angle: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isExiting = stage === 4;
      const centerX = width / 2;
      const centerY = height / 2;

      particles.forEach((p) => {
        // Update angle for pulsing alpha
        p.angle += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.angle) * 0.15;

        // In step 5 (stage 4), particles accelerate outward from center
        if (isExiting) {
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          p.x += (dx / dist) * 12;
          p.y += (dy / dist) * 12;
        } else {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around screen boundaries
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        // Draw particle with soft glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${Math.max(0, Math.min(1, currentAlpha))})`;
        ctx.shadowColor = "#3B82F6";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stage]);

  /* ── 3. Animation Variants with Custom Cubic-Bezier Easing ── */
  const customEase = [0.16, 1, 0.3, 1]; // Apple / Linear crisp cubic-bezier

  const containerVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.4, ease: customEase } },
    exit: {
      opacity: 0,
      scale: 1.12,
      transition: { duration: 0.65, ease: customEase },
    },
  };

  const logoStaggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.035, delayChildren: 0.05 },
    },
    exit: {
      scale: 0.85,
      opacity: 0,
      filter: "blur(8px)",
      transition: { duration: 0.5, ease: customEase },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: customEase },
    },
  };

  const subtitleVariant = {
    hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: customEase, delay: 0.65 },
    },
  };

  const taglineLines = [
    "Building scalable backend systems,",
    "modern web applications,",
    "and exceptional digital experiences.",
  ];

  const nameLetters = "DIVYANSH BHADAURIYA".split("");

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate={stage === 4 ? "exit" : "enter"}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#04070D] overflow-hidden select-none cursor-wait"
      style={{ willChange: "transform, opacity" }}
    >
      {/* ── Background Mesh & Faint Grid Texture (Step 1) ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Faint subtle grid texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />

        {/* Subtle animated blue gradient radial mesh */}
        <motion.div
          animate={
            stage >= 2
              ? { scale: [1, 1.15, 1.08], rotate: [0, 4, -2] }
              : { scale: 1 }
          }
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-gradient-radial from-[#3B82F6]/20 via-[#06B6D4]/10 to-transparent rounded-full blur-[110px]"
        />

        {/* Soft vignette edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04070D] via-transparent to-[#04070D] opacity-80" />
      </div>

      {/* ── 60fps GPU Canvas Particles ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* ── Center Content Area ── */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
        
        {/* Step 2 & 3: Logo Reveal with Letter Blur & Light Sweep */}
        <motion.div
          variants={logoStaggerContainer}
          initial="hidden"
          animate={stage >= 1 ? (stage === 4 ? "exit" : "visible") : "hidden"}
          className="relative flex flex-col items-center"
        >
          {/* Luminous Light Sweep Beam across Logo (Step 3) */}
          <AnimatePresence>
            {stage === 2 && (
              <motion.div
                initial={{ x: "-150%", opacity: 0 }}
                animate={{ x: "150%", opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 blur-sm pointer-events-none z-30"
              />
            )}
          </AnimatePresence>

          {/* Main Logo Text: DIVYANSH BHADAURIYA + Glowing Blue Dot */}
          <div className="flex items-center justify-center flex-wrap gap-[1px] sm:gap-1 text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight text-white drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]">
            {nameLetters.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariant}
                className={char === " " ? "w-2 sm:w-4" : "inline-block"}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              variants={letterVariant}
              className="inline-block w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full bg-[#3B82F6] ml-1.5 sm:ml-2.5 self-end mb-1 sm:mb-2 shadow-[0_0_20px_#3B82F6]"
            />
          </div>

          {/* Subtitle below Logo: SOFTWARE ENGINEER */}
          <motion.div
            variants={subtitleVariant}
            className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm md:text-base font-extrabold font-mono tracking-[0.35em] sm:tracking-[0.4em] text-[#3B82F6] uppercase drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]"
          >
            SOFTWARE ENGINEER
          </motion.div>
        </motion.div>

        {/* Step 4: Three-line Tagline Reveal below Logo */}
        <div className="mt-8 sm:mt-12 min-h-[4rem] sm:min-h-[5rem] flex flex-col items-center justify-center space-y-1 sm:space-y-1.5">
          {taglineLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              animate={
                stage >= 3
                  ? stage === 4
                    ? { opacity: 0, y: -10, filter: "blur(6px)" }
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 15, filter: "blur(6px)" }
              }
              transition={{
                duration: 0.5,
                ease: customEase,
                delay: idx * 0.16 + (stage === 4 ? 0 : 0.1),
              }}
              className="text-sm sm:text-base md:text-lg font-medium text-slate-300 dark:text-slate-200 tracking-wide leading-relaxed max-w-xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
