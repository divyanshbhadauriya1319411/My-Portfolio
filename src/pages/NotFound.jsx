import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden transition-colors duration-500">
      
      {/* Background Floating Glow Orbs */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-[#2563EB]/15 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#38BDF8]/15 blur-3xl pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="space-y-6 max-w-lg mx-auto p-10 rounded-3xl bg-card backdrop-blur-xl border border-default shadow-2xl transition-all duration-500"
      >
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mx-auto">
          <FaExclamationTriangle size={28} />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl sm:text-7xl font-extrabold font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#38BDF8]">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary transition-colors">
            {t("notfound.title")}
          </h2>
          <p className="text-sm sm:text-base text-secondary leading-relaxed pt-1 transition-colors">
            {t("notfound.description")}
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 touch-target w-full sm:w-auto"
          >
            <FaArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{t("notfound.returnHome")}</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
