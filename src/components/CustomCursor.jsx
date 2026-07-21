import { useEffect, useState, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // High precision instant spring for center dot
  const dotX = useSpring(cursorX, { stiffness: 1200, damping: 60 });
  const dotY = useSpring(cursorY, { stiffness: 1200, damping: 60 });

  // Smoothed trailing spring for outer ring
  const ringX = useSpring(cursorX, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const isFine = mediaQuery.matches && !window.matchMedia("(pointer: coarse)").matches;
    setIsDesktop(isFine);

    const handleMediaChange = (e) => setIsDesktop(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    if (!isFine) {
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", handleMediaChange);
        } else {
          mediaQuery.removeListener(handleMediaChange);
        }
      };
    }

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible((prev) => (prev ? prev : true));
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const isBtn = target.closest("button") || target.closest("[role='button']") || target.closest(".interactive-btn");
      const isLnk = target.closest("a") || target.closest(".interactive-link");
      const isInput = target.closest("input") || target.closest("textarea");

      if (isBtn || isInput) {
        setIsHovered(true);
        setIsLinkHovered(false);
      } else if (isLnk) {
        setIsHovered(true);
        setIsLinkHovered(true);
      } else {
        setIsHovered(false);
        setIsLinkHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isDesktop || !isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] z-[10000] pointer-events-none transition-colors duration-150"
      />

      {/* Large Animated Ring — expands over buttons, changes color over links */}
      <motion.div
        animate={{
          scale: isHovered ? (isLinkHovered ? 1.7 : 1.9) : 1,
          backgroundColor: isHovered
            ? isLinkHovered
              ? "rgba(56, 189, 248, 0.12)"
              : "rgba(37, 99, 235, 0.12)"
            : "transparent",
          borderColor: isHovered
            ? isLinkHovered
              ? "rgba(56, 189, 248, 0.8)"
              : "rgba(37, 99, 235, 0.8)"
            : "rgba(37, 99, 235, 0.35)",
          width: 32,
          height: 32,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 rounded-full border border-solid z-[9999] pointer-events-none"
      />
    </>
  );
}

export default memo(CustomCursor);
