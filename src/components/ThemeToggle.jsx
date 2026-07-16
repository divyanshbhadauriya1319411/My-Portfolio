import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const isLight = theme === "light";
  const tooltipText = isLight ? t("theme.lightMode", "Light Mode") : t("theme.darkMode", "Dark Mode");

  return (
    <button
      onClick={toggleTheme}
      title={tooltipText}
      className="relative p-2.5 rounded-xl border border-default bg-card text-primary hover:text-[#2563EB] dark:hover:text-[#38BDF8] hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 dark:focus:ring-[#38BDF8]/50 transition-all duration-300 select-none cursor-pointer touch-target shrink-0 overflow-hidden"
      aria-label={tooltipText}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -180, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 180, scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.15, rotate: 15 }}
          whileTap={{ scale: 0.9, rotate: -15 }}
          className="flex items-center justify-center relative z-10"
        >
          {isLight ? <FaSun size={16} className="text-amber-500" /> : <FaMoon size={16} className="text-[#38BDF8]" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
