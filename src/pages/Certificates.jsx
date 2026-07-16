import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPython,
  FaReact,
  FaDatabase,
  FaGithub,
  FaCloud,
  FaCheckCircle,
  FaHourglassHalf,
  FaAward,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { SiDjango, SiDocker } from "react-icons/si";
import { useTranslation } from "react-i18next";

const ROADMAP_ITEMS = [
  {
    title: "Python Advanced Architecture & RDBMS",
    category: "Core Engineering",
    icon: <FaPython className="text-[#38BDF8] text-3xl" />,
    status: "Completed",
    level: "Verified Proficiency",
    description:
      "Deep practical domain mastery across object-oriented design, multi-threading basics, decorators, and high-performance backend pipelines.",
    evidence: "RAMA INTERNATIONAL & Rent-Drive Production Backends",
  },
  {
    title: "Django & Django REST Framework",
    category: "API & Backend Ecosystem",
    icon: <SiDjango className="text-emerald-500 text-3xl" />,
    status: "Completed",
    level: "Verified Proficiency",
    description:
      "Advanced ORM query optimization, schema relationship modeling, custom serializer structures, viewsets, and secure JWT/OAuth authentication standards.",
    evidence: "Full RESTful API Endpoints across all commercial repositories",
  },
  {
    title: "PostgreSQL & RDBMS Relational Modeling",
    category: "Database Engineering",
    icon: <FaDatabase className="text-blue-500 text-3xl" />,
    status: "Completed",
    level: "Verified Proficiency",
    description:
      "Architecting normalized relational schemas, transaction indexing strategies, complex query joins, and high-load connection management.",
    evidence: "PostgreSQL Production Schema Deployments",
  },
  {
    title: "React 19 & Modern UI Ecosystem",
    category: "Frontend Architecture",
    icon: <FaReact className="text-[#38BDF8] text-3xl" />,
    status: "Completed",
    level: "Verified Proficiency",
    description:
      "Zero-layout-shift component delivery, custom React hooks, lazy loading, state management, and responsive styling with Tailwind CSS v4.",
    evidence: "MNC-Grade Portfolio & Client Application Interfaces",
  },
  {
    title: "Git & GitHub Version Control Workflow",
    category: "Collaborative Standards",
    icon: <FaGithub className="text-zinc-800 dark:text-white text-3xl" />,
    status: "Completed",
    level: "Verified Proficiency",
    description:
      "Clean branching strategies, collaborative pull requests, semantic commit structuring, and multi-developer code review practices.",
    evidence: "Verified Public & Private GitHub Codebases",
  },
  {
    title: "Docker Containerization & Environments",
    category: "DevOps Infrastructure",
    icon: <SiDocker className="text-sky-500 text-3xl" />,
    status: "In Progress",
    level: "Current Exploration",
    description:
      "Engineering reproducible development environments using multi-stage Dockerfiles and docker-compose orchestration.",
    evidence: "Active development roadmap benchmark",
  },
  {
    title: "AWS Cloud Infrastructure Basics",
    category: "Cloud Deployment",
    icon: <FaCloud className="text-amber-500 text-3xl" />,
    status: "In Progress",
    level: "Current Exploration",
    description:
      "Understanding core cloud storage models (S3), compute instances (EC2), and relational RDS configurations for production scaling.",
    evidence: "Active development roadmap benchmark",
  },
];

export default function Certificates() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");

  const localizedItems = ROADMAP_ITEMS.map((item, idx) => {
    const transList = t("certificates.items", { returnObjects: true }) || [];
    const itemTrans = transList[idx] || {};
    return {
      ...item,
      title: itemTrans.title || item.title,
      category: itemTrans.category || item.category,
      level: itemTrans.level || item.level,
      description: itemTrans.description || item.description,
      evidence: itemTrans.evidence || item.evidence,
    };
  });

  const filteredItems =
    filter === "All"
      ? localizedItems
      : localizedItems.filter((i) => i.status === filter);

  return (
    <div className="pt-28 pb-28 px-6 max-w-6xl mx-auto space-y-16 transition-colors duration-500">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-primary transition-colors">
          {t("certificates.title")}
        </h1>
        <p className="text-base sm:text-lg text-secondary leading-relaxed transition-colors">
          {t("certificates.subtitle")}
        </p>
      </div>

      {/* Philosophy Dashboard Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-card border border-default shadow-lg shadow-slate-200/60 dark:shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-500">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8]">
            <FaAward size={16} />
            <span>{t("certificates.engStandard")}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-primary transition-colors">
            {t("certificates.execBackedTitle")}
          </h3>
          <p className="text-sm text-secondary leading-relaxed transition-colors">
            {t("certificates.execBackedDesc")}
          </p>
        </div>

        {/* Status Counts */}
        <div className="flex sm:flex-col gap-4 sm:gap-3 shrink-0 border-t sm:border-t-0 sm:border-l border-default pt-4 sm:pt-0 sm:pl-8 transition-colors">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
            <FaCheckCircle size={16} />
            <span>{t("certificates.verifiedCount")}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-400">
            <FaHourglassHalf size={16} />
            <span>{t("certificates.advancingCount")}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-default pb-5 transition-colors">
        {["All", "Completed", "In Progress"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all interactive-btn ${
              filter === tab
                ? "bg-[#2563EB] dark:bg-[#38BDF8] text-white dark:text-zinc-900 shadow-md shadow-blue-500/25"
                : "text-secondary hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary"
            }`}
          >
            {t("certificates.tabs." + tab, tab)}
          </button>
        ))}
      </div>

      {/* Competency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="p-7 rounded-3xl bg-card border border-default flex flex-col justify-between space-y-6 shadow-lg shadow-slate-200/60 dark:shadow-none hover:shadow-xl hover:border-[#2563EB] dark:hover:border-white/20 transition-all duration-500"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary transition-colors">
                  {item.category}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === "Completed"
                      ? "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30"
                      : "bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30"
                  }`}
                >
                  {item.status === "Completed" ? <FaCheckCircle size={11} /> : <FaHourglassHalf size={11} />}
                  {t("certificates.tabs." + item.status, item.status)}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#09090B] border border-default flex items-center justify-center shrink-0 shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-primary leading-snug transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#2563EB] dark:text-[#38BDF8]">
                    {item.level}
                  </span>
                </div>
              </div>

              <p className="text-sm text-secondary leading-relaxed pt-1 transition-colors">
                {item.description}
              </p>
            </div>

            {/* Evidence Footer */}
            <div className="pt-4 border-t border-default flex items-center justify-between text-xs transition-colors">
              <span className="text-secondary font-semibold transition-colors">
                {t("certificates.evidenceLabel")}
              </span>
              <span className="font-bold text-primary flex items-center gap-1.5 transition-colors">
                {item.evidence}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
