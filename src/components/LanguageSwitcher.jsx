import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaCheck, FaGlobe, FaTimes } from "react-icons/fa";
import { SUPPORTED_LANGUAGES } from "../i18n";

export default function LanguageSwitcher({ isMobile = false }) {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0, left: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const optionRefs = useRef([]);

  // Normalize current language code (e.g. 'en-US' -> 'en')
  const currentCode = (i18n.language || "en").split("-")[0];
  const currentLang =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === currentCode) ||
    SUPPORTED_LANGUAGES[0];

  // Calculate dropdown coordinates relative to the fixed button right before opening
  const updateCoords = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  const handleToggle = () => {
    if (!isOpen) {
      updateCoords();
    }
    setIsOpen(!isOpen);
  };

  // Close when clicking outside button or portal menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleResizeOrScroll = () => {
      if (isOpen) {
        updateCoords();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResizeOrScroll);
      window.addEventListener("scroll", handleResizeOrScroll, { passive: true });
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, updateCoords]);

  const handleSelectLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Keyboard arrow navigation inside dropdown/bottom sheet
  const handleMenuKeyDown = (e, idx) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (idx + 1) % SUPPORTED_LANGUAGES.length;
      optionRefs.current[nextIdx]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = (idx - 1 + SUPPORTED_LANGUAGES.length) % SUPPORTED_LANGUAGES.length;
      optionRefs.current[prevIdx]?.focus();
    }
  };

  /* ── Desktop & Tablet Floating Portal Menu ─────────────────────── */
  const desktopMenuPortal =
    typeof document !== "undefined" && isOpen && !isMobile
      ? createPortal(
          <AnimatePresence>
            <motion.div
              ref={dropdownRef}
              role="listbox"
              aria-label={t("langSwitcher.selectLanguage", "Select Language")}
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                top: `${coords.top}px`,
                right: `${coords.right}px`,
              }}
              className="fixed z-[99999] w-52 rounded-2xl bg-white/95 dark:bg-[#111827]/95 backdrop-blur-2xl border border-zinc-200/80 dark:border-white/15 shadow-2xl overflow-hidden py-1.5"
            >
              <div className="px-3.5 py-1.5 border-b border-zinc-100 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                <FaGlobe size={11} className="text-[#2563EB] dark:text-[#38BDF8]" />
                <span>Select Language</span>
              </div>

              <div className="p-1 space-y-1">
                {SUPPORTED_LANGUAGES.map((lang, idx) => {
                  const isSelected = currentCode === lang.code;
                  return (
                    <button
                      key={lang.code}
                      ref={(el) => (optionRefs.current[idx] = el)}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectLanguage(lang.code)}
                      onKeyDown={(e) => handleMenuKeyDown(e, idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 text-left interactive-btn ${
                        isSelected
                          ? "bg-[#2563EB]/15 dark:bg-[#38BDF8]/20 text-[#2563EB] dark:text-[#38BDF8] font-bold shadow-xs"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base leading-none">{lang.flag}</span>
                        <div className="flex flex-col">
                          <span className="leading-tight">{lang.label}</span>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">
                            {lang.nativeLabel}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <FaCheck
                          size={12}
                          className="text-[#2563EB] dark:text-[#38BDF8] shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )
      : null;

  /* ── Mobile Responsive Bottom Sheet Portal ─────────────────────── */
  const mobileSheetPortal =
    typeof document !== "undefined" && isOpen && isMobile
      ? createPortal(
          <AnimatePresence>
            <motion.div
              key="mobile-lang-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-md z-[100000] lg:hidden"
            />
            <motion.div
              key="mobile-lang-sheet"
              ref={dropdownRef}
              role="listbox"
              aria-label={t("langSwitcher.selectLanguage", "Select Language")}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[100001] bg-white dark:bg-[#111827] rounded-t-3xl border-t border-zinc-200 dark:border-white/15 p-6 shadow-2xl space-y-5 lg:hidden max-h-[85vh] overflow-y-auto"
            >
              {/* Top Drag Bar & Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/10">
                <div className="flex items-center gap-2 text-sm font-extrabold text-zinc-900 dark:text-white">
                  <FaGlobe className="text-[#2563EB] dark:text-[#38BDF8]" size={16} />
                  <span>{t("langSwitcher.mobileTitle", "Select Language / भाषा चुनें")}</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 hover:text-white hover:bg-rose-600 transition-colors"
                  aria-label={t("langSwitcher.close", "Close language selector")}
                >
                  <FaTimes size={14} />
                </button>
              </div>

              {/* Language Options List */}
              <div className="space-y-2.5">
                {SUPPORTED_LANGUAGES.map((lang, idx) => {
                  const isSelected = currentCode === lang.code;
                  return (
                    <button
                      key={lang.code}
                      ref={(el) => (optionRefs.current[idx] = el)}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectLanguage(lang.code)}
                      onKeyDown={(e) => handleMenuKeyDown(e, idx)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl text-base font-bold transition-all text-left interactive-btn ${
                        isSelected
                          ? "bg-gradient-to-r from-[#2563EB]/15 to-[#38BDF8]/15 dark:from-[#2563EB]/25 dark:to-[#38BDF8]/25 border-2 border-[#2563EB] dark:border-[#38BDF8] text-[#2563EB] dark:text-[#38BDF8] shadow-md"
                          : "bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-2xl">{lang.flag}</span>
                        <div className="flex flex-col">
                          <span className="font-extrabold text-base leading-snug">
                            {lang.label}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
                            {lang.nativeLabel}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-7 h-7 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] text-white dark:text-zinc-900 flex items-center justify-center shadow-md shrink-0">
                          <FaCheck size={13} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <div className={`relative ${isMobile ? "w-full" : ""}`}>
      {/* Trigger Button */}
      <motion.button
        ref={buttonRef}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleToggle}
        aria-label={t("langSwitcher.changeLanguage", "Change Language")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`group flex items-center justify-between gap-2 px-3 xl:px-3.5 py-2 rounded-xl border transition-all duration-200 interactive-btn ${
          isMobile
            ? "w-full bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 py-3.5 text-sm font-bold text-zinc-800 dark:text-zinc-200 shadow-xs"
            : "bg-zinc-100/80 dark:bg-white/5 hover:bg-[#2563EB] hover:border-[#2563EB] hover:text-white dark:hover:bg-[#38BDF8] dark:hover:border-[#38BDF8] dark:hover:text-zinc-900 border-zinc-300/80 dark:border-white/15 text-zinc-700 dark:text-zinc-200 text-xs font-bold shadow-xs hover:shadow-md hover:shadow-blue-500/20"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm leading-none">{currentLang.flag}</span>
          <span className="font-extrabold tracking-tight">
            {currentLang.code.toUpperCase()}
          </span>
          {isMobile && (
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              ({currentLang.nativeLabel})
            </span>
          )}
        </div>
        <FaChevronDown
          size={10}
          className={`transition-transform duration-200 opacity-70 group-hover:opacity-100 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      {/* Render Portal Menus */}
      {desktopMenuPortal}
      {mobileSheetPortal}
    </div>
  );
}
