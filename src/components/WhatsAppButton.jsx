import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function WhatsAppButton({ variant = "floating", className = "", isMobileNavbar = false }) {
  const { t } = useTranslation();
  const [ripple, setRipple] = useState(false);

  // Exact WhatsApp number and pre-filled message URL
  const WHATSAPP_URL =
    "https://wa.me/917897350468?text=Hi%20Divyansh%2C%20I%20visited%20your%20portfolio%20and%20I%27m%20interested%20in%20discussing%20an%20opportunity%20with%20you.";

  const handleClick = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 500);
  };

  const commonProps = {
    href: WHATSAPP_URL,
    target: "_blank",
    rel: "noopener noreferrer",
    onClick: handleClick,
    "aria-label": "Chat with Divyansh on WhatsApp",
    title: "Chat on WhatsApp",
  };

  // ── 1. Floating Action Button (Bottom-Right, Above Rocket Button) ──────────
  if (variant === "floating") {
    return (
      <div className={`fixed bottom-[92px] right-6 z-50 ${className}`}>
        <motion.a
          {...commonProps}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_30px_rgba(37,211,102,0.85)] transition-all duration-300 interactive-btn touch-target overflow-hidden border border-white/25 backdrop-blur-md"
        >
          {/* Tooltip on Hover */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-zinc-900/95 dark:bg-white/95 text-white dark:text-zinc-900 text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            Chat on WhatsApp
          </span>

          {/* WhatsApp Icon */}
          <FaWhatsapp size={24} className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

          {/* Click Ripple Animation */}
          {ripple && (
            <motion.span
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-full bg-white pointer-events-none"
            />
          )}
        </motion.a>
      </div>
    );
  }

  // ── 2. Navbar Button (Desktop next to "Hire Me" & Mobile Drawer) ──────────
  if (variant === "navbar") {
    if (isMobileNavbar) {
      return (
        <motion.a
          {...commonProps}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm shadow-md shadow-green-500/20 active:scale-95 transition-all overflow-hidden relative ${className}`}
        >
          <FaWhatsapp size={16} />
          <span>{t("navbar.whatsapp", "WhatsApp")}</span>
          {ripple && (
            <motion.span
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-full bg-white pointer-events-none"
            />
          )}
        </motion.a>
      );
    }

    return (
      <motion.a
        {...commonProps}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative inline-flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-bold shadow-sm hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] transition-all duration-200 border border-white/20 backdrop-blur-md interactive-btn overflow-hidden ${className}`}
      >
        <FaWhatsapp size={14} className="group-hover:rotate-12 transition-transform duration-200" />
        <span>{t("navbar.whatsapp", "WhatsApp")}</span>
        {ripple && (
          <motion.span
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-full bg-white pointer-events-none"
          />
        )}
      </motion.a>
    );
  }

  // ── 3. Contact Page Button (Alongside Email, LinkedIn, and GitHub) ────────
  if (variant === "contact" || variant === "contact-social") {
    return (
      <motion.a
        {...commonProps}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-bold shadow-md shadow-green-500/20 hover:shadow-[0_0_25px_rgba(37,211,102,0.7)] transition-all duration-300 border border-white/25 backdrop-blur-md interactive-link overflow-hidden ${className}`}
      >
        <FaWhatsapp size={16} className="group-hover:rotate-12 transition-transform duration-200" />
        <span>WhatsApp</span>
        {ripple && (
          <motion.span
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-full bg-white pointer-events-none"
          />
        )}
      </motion.a>
    );
  }

  return null;
}
