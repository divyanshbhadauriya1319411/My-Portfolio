import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCheckCircle,
  FaPhoneAlt,
  FaPaperPlane,
  FaSpinner,
  FaExclamationCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const API = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, "") : "";

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 6000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedSubject = form.subject.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      showToast("error", "Please fill all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      showToast("error", "Please enter a valid email address.");
      return;
    }

    if (!API) {
      showToast("error", "❌ Server unavailable. (VITE_API_URL environment variable is missing)");
      return;
    }

    setLoading(true);
    setToast({ show: false, type: "", message: "" });

    try {
      const requestUrl = `${API}/api/contact`;
      if (import.meta.env.DEV) {
        console.log("Request URL:", requestUrl);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      let response;
      try {
        response = await fetch(requestUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            subject: trimmedSubject,
            message: trimmedMessage,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (networkError) {
        clearTimeout(timeoutId);
        if (import.meta.env.DEV) {
          console.error("Network/Timeout failure during fetch:", networkError);
        }
        if (networkError.name === "AbortError") {
          showToast("error", "❌ Server is taking too long to respond.");
        } else {
          showToast("error", "❌ Unable to reach backend.");
        }
        setLoading(false);
        return;
      }

      if (import.meta.env.DEV) {
        console.log("Status Code:", response.status);
      }

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");

      if (!response.ok) {
        if (response.status === 404) {
          showToast("error", "❌ API endpoint not found.");
          setLoading(false);
          return;
        }

        if (response.status === 500) {
          if (isJson) {
            try {
              const errData = await response.json();
              const backendMsg = errData.message || "Internal server error.";
              showToast("error", backendMsg.startsWith("❌") ? backendMsg : `❌ ${backendMsg}`);
              setLoading(false);
              return;
            } catch (e) {
              // fallback below if parsing fails
            }
          }
          showToast("error", "❌ Internal server error.");
          setLoading(false);
          return;
        }

        if (response.status === 422) {
          if (isJson) {
            try {
              const errData = await response.json();
              const backendMsg = errData.message || "Validation failed.";
              showToast("error", backendMsg.startsWith("❌") ? backendMsg : `❌ ${backendMsg}`);
              setLoading(false);
              return;
            } catch (e) {
              // fallback below
            }
          }
          showToast("error", "❌ Validation failed.");
          setLoading(false);
          return;
        }

        if (isJson) {
          try {
            const errData = await response.json();
            const backendMsg = errData.message || `Error (${response.status})`;
            showToast("error", backendMsg.startsWith("❌") ? backendMsg : `❌ ${backendMsg}`);
          } catch (parseErr) {
            showToast("error", `❌ Error (${response.status})`);
          }
        } else {
          showToast("error", `❌ Server unavailable (${response.status}). Render instance may be waking up, please try again.`);
        }
        setLoading(false);
        return;
      }

      if (!isJson) {
        showToast("error", "❌ Server unavailable (unexpected HTML response).");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (import.meta.env.DEV) {
        console.log("Response:", data);
      }

      if (data.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        showToast("success", "✅ Message sent successfully.");
      } else {
        const backendMsg = data.message || "Unable to send email.";
        showToast("error", backendMsg.startsWith("❌") ? backendMsg : `❌ ${backendMsg}`);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Contact form submission error:", error);
      }
      showToast("error", "❌ Unable to reach backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-28 px-6 max-w-6xl mx-auto space-y-20 transition-colors duration-500">
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 right-6 z-50 max-w-md p-4 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-md ${
              toast.type === "success"
                ? "bg-emerald-500/90 border-emerald-400 text-white shadow-emerald-500/25"
                : "bg-red-500/90 border-red-400 text-white shadow-red-500/25"
            }`}
          >
            {toast.type === "success" ? (
              <FaCheckCircle className="shrink-0 text-xl" />
            ) : (
              <FaExclamationCircle className="shrink-0 text-xl" />
            )}
            <p className="text-sm font-bold leading-snug">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="space-y-3 sm:space-y-4 max-w-3xl">
        <h1 className="text-clamp-hero font-extrabold font-heading tracking-tight text-primary break-words transition-colors">
          {t("contact.title")}
        </h1>
        <p className="text-clamp-body text-secondary leading-relaxed transition-colors">
          {t("contact.subtitle")}
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Contact Details & Social Profiles */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Availability Status Card */}
          <div className="p-7 rounded-3xl bg-card border border-default space-y-3 shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              {t("contact.availImmediately")}
            </div>
            <h3 className="text-lg font-bold font-heading text-primary transition-colors">
              {t("contact.openForRoles")}
            </h3>
            <p className="text-sm text-secondary leading-relaxed transition-colors">
              {t("contact.availDesc")}
            </p>
          </div>

          {/* Contact Details List */}
          <div className="p-7 rounded-3xl bg-card border border-default space-y-6 shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
            
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#2563EB]/10 dark:bg-[#38BDF8]/15 flex items-center justify-center text-[#2563EB] dark:text-[#38BDF8] shrink-0">
                <FaEnvelope size={18} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary block transition-colors">
                  {t("contact.emailLabel")}
                </span>
                <a
                  href="mailto:divyanshbhadauriya888@gmail.com"
                  className="text-sm font-bold text-primary hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors interactive-link"
                >
                  divyanshbhadauriya888@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#2563EB]/10 dark:bg-[#38BDF8]/15 flex items-center justify-center text-[#2563EB] dark:text-[#38BDF8] shrink-0">
                <FaMapMarkerAlt size={18} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary block transition-colors">
                  {t("contact.locationLabel")}
                </span>
                <p className="text-sm font-bold text-primary transition-colors">
                  {t("contact.locationValue")}
                </p>
                <span className="text-xs text-secondary transition-colors">{t("contact.openToRemote")}</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#2563EB]/10 dark:bg-[#38BDF8]/15 flex items-center justify-center text-[#2563EB] dark:text-[#38BDF8] shrink-0">
                <FaPhoneAlt size={16} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary block transition-colors">
                  {t("contact.phoneLabel")}
                </span>
                <p className="text-sm font-bold text-primary transition-colors">
                  {t("contact.phoneValue")}
                </p>
              </div>
            </div>

          </div>

          {/* Social Connect Strip */}
          <div className="p-7 rounded-3xl bg-card border border-default space-y-4 shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary block transition-colors">
              {t("contact.profNetworks")}
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/divyanshbhadauriya1319411"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-[#2563EB] hover:text-white text-secondary hover:text-white text-xs font-bold transition-all interactive-link border border-default"
              >
                <FaGithub size={15} /> {t("contact.githubProfile")}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-[#2563EB] hover:text-white text-secondary hover:text-white text-xs font-bold transition-all interactive-link border border-default"
              >
                <FaLinkedin size={15} /> {t("contact.linkedinProfile")}
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Animated Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-card border border-default space-y-6 shadow-xl transition-all duration-500">
          <div>
            <h2 className="text-2xl font-bold font-heading text-primary transition-colors">
              {t("contact.formTitle")}
            </h2>
            <p className="text-sm text-secondary mt-1 transition-colors">
              {t("contact.formSubtitle")}
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-3"
            >
              <div className="flex items-center gap-2.5 font-extrabold text-lg">
                <FaCheckCircle className="text-emerald-500" size={22} />
                <span>{t("contact.successTitle")}</span>
              </div>
              <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">
                {t("contact.successDesc")}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setToast({ show: false, type: "", message: "" });
                }}
                className="mt-3 text-xs font-extrabold underline hover:opacity-80 interactive-btn"
              >
                {t("contact.sendAnother")}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Floating Label Input: Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder=" "
                    className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-slate-100 dark:bg-[#09090B] border border-default text-sm text-primary focus:outline-none focus:border-[#2563EB] dark:focus:border-[#38BDF8] transition-colors"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-2 text-[11px] font-bold uppercase tracking-wider text-secondary transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#2563EB] dark:peer-focus:text-[#38BDF8] pointer-events-none"
                  >
                    {t("contact.labelName")}
                  </label>
                </div>

                {/* Floating Label Input: Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder=" "
                    className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-slate-100 dark:bg-[#09090B] border border-default text-sm text-primary focus:outline-none focus:border-[#2563EB] dark:focus:border-[#38BDF8] transition-colors"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-2 text-[11px] font-bold uppercase tracking-wider text-secondary transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#2563EB] dark:peer-focus:text-[#38BDF8] pointer-events-none"
                  >
                    {t("contact.labelEmail")}
                  </label>
                </div>
              </div>

              {/* Floating Label Input: Subject */}
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder=" "
                  className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-slate-100 dark:bg-[#09090B] border border-default text-sm text-primary focus:outline-none focus:border-[#2563EB] dark:focus:border-[#38BDF8] transition-colors"
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 top-2 text-[11px] font-bold uppercase tracking-wider text-secondary transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#2563EB] dark:peer-focus:text-[#38BDF8] pointer-events-none"
                >
                  {t("contact.labelSubject")}
                </label>
              </div>

              {/* Floating Label Textarea: Message */}
              <div className="relative">
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder=" "
                  className="peer w-full px-4 pt-7 pb-2 rounded-xl bg-slate-100 dark:bg-[#09090B] border border-default text-sm text-primary focus:outline-none focus:border-[#2563EB] dark:focus:border-[#38BDF8] transition-colors resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-2.5 text-[11px] font-bold uppercase tracking-wider text-secondary transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-5 peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-[#2563EB] dark:peer-focus:text-[#38BDF8] pointer-events-none"
                >
                  {t("contact.labelMessage")}
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/45 hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-200 interactive-btn touch-target cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <FaSpinner size={14} className="animate-spin" />
                    <span>{t("contact.sending")}</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                    <span>{t("contact.sendBtn")}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Google Map Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-heading text-primary transition-colors">
          {t("contact.baseLocTitle")}
        </h2>
        <div className="rounded-3xl overflow-hidden border border-default h-72 sm:h-96 w-full bg-card shadow-xl transition-all duration-500">
          <iframe
            title="Delhi NCR & Agra Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.31295980644!2d77.9407384351322!3d27.176166164284167!2m3!1f0!2f0!3f0!3m2!1f1024!2f1024!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39740d857c2f41d9%3A0x784aef38a9523b42!2sAgra%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            className="w-full h-full border-none filter grayscale dark:invert contrast-125 opacity-90 transition-all"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
