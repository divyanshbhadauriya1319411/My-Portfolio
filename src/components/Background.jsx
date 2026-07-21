import { useEffect, useRef, memo } from "react";
import gsap from "gsap";

function Background() {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const lightRef = useRef(null);

  // Floating parallax animation for blurred gradient circles
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(orb1Ref.current, {
        x: "15vw",
        y: "12vh",
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2Ref.current, {
        x: "-18vw",
        y: "-15vh",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb3Ref.current, {
        x: "12vw",
        y: "-18vh",
        duration: 24,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    const handleVisibility = () => {
      if (document.hidden) {
        ctx.pause();
      } else {
        ctx.resume();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      ctx.revert();
    };
  }, []);

  // Mouse movement tracking radial glow (skipped on touch devices and low performance)
  useEffect(() => {
    if (typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;

    const handleMouseMove = (e) => {
      if (!lightRef.current) return;
      gsap.to(lightRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background transition-colors duration-300">
      {/* 1. Animated Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)",
        }}
      />

      {/* 2. Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-80" />

      {/* 3. Floating Blurred Circles / Orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#2563EB]/15 to-[#38BDF8]/15 dark:from-[#2563EB]/18 dark:to-[#38BDF8]/18 blur-[70px] will-change-transform"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/3 right-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#38BDF8]/12 to-[#818CF8]/12 dark:from-[#38BDF8]/15 dark:to-[#818CF8]/15 blur-[80px] will-change-transform"
      />
      <div
        ref={orb3Ref}
        className="absolute top-2/3 left-1/3 w-[360px] h-[360px] rounded-full bg-gradient-to-br from-[#2563EB]/10 to-indigo-500/10 dark:from-[#2563EB]/14 dark:to-indigo-500/14 blur-[65px] will-change-transform"
      />

      {/* 4. Mouse Movement Tracking Light Glow */}
      <div
        ref={lightRef}
        style={{ transform: "translate(-50%, -50%)" }}
        className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full bg-[#2563EB]/10 dark:bg-[#38BDF8]/12 blur-[80px] opacity-70 transition-opacity will-change-transform"
      />
    </div>
  );
}

export default memo(Background);
