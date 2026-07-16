import { FaDownload, FaFilePdf, FaCheckCircle, FaPrint, FaGraduationCap, FaLaptopCode, FaAward } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const EDUCATION_SUMMARY = {
  degree: "Bachelor of Computer Applications (BCA)",
  institution: "Dr. Bhim Rao Ambedkar University, Agra",
  period: "2023 – Present",
  focus: "Relational Database Systems (PostgreSQL/SQL), Object-Oriented Programming (Python/C++), Operating Systems, and Networking.",
};

const SKILLS_SUMMARY = [
  "Python, Django, Django REST Framework, and secure RESTful API architectures.",
  "PostgreSQL schema modeling, complex query optimization, and transaction management.",
  "React 19, Tailwind CSS v4, GSAP/Framer Motion animations, and responsive UI delivery.",
  "Git collaborative workflows, Docker containerization basics, and Linux server commands.",
];

const CERTIFICATES_SUMMARY = [
  "Verified Full Stack Application Deployment — RAMA INTERNATIONAL & Rent-Drive repositories.",
  "Relational Database & Query Optimization Mastery — PostgreSQL / SQL benchmarks.",
  "Modern Frontend Component Engineering — React 19 & Tailwind CSS v4.",
];

export default function Resume() {
  const { t } = useTranslation();

  const skillsSummary = t("resume.skillsSummaryItems", { returnObjects: true }) || [];
  const certSummary = t("resume.certSummaryItems", { returnObjects: true }) || [];

  return (
    <div className="pt-28 pb-28 px-6 max-w-6xl mx-auto space-y-16 transition-colors duration-500">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-default pb-8 transition-colors">
        <div className="space-y-3 sm:space-y-4 max-w-3xl">
          <h1 className="text-clamp-hero font-extrabold font-heading tracking-tight text-primary break-words transition-colors">
            {t("resume.title")}
          </h1>
          <p className="text-clamp-body text-secondary max-w-xl leading-relaxed transition-colors">
            {t("resume.subtitle")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-default bg-card hover:bg-slate-100 dark:hover:bg-white/10 text-primary font-bold text-sm transition-all shadow-sm interactive-btn touch-target w-full sm:w-auto"
          >
            <FaPrint size={14} />
            <span>{t("resume.printCv")}</span>
          </button>

          <a
            href="/resume.pdf"
            download
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/45 hover:-translate-y-0.5 transition-all duration-200 interactive-btn touch-target w-full sm:w-auto"
          >
            <FaDownload size={14} />
            <span>{t("resume.downloadPdf")}</span>
          </a>
        </div>
      </div>

      {/* Summary Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Education Summary */}
        <div className="p-7 rounded-3xl bg-card border border-default space-y-4 shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
          <div className="flex items-center gap-3 text-[#2563EB] dark:text-[#38BDF8]">
            <FaGraduationCap size={22} />
            <h3 className="text-lg font-bold font-heading text-primary transition-colors">
              {t("resume.eduSummaryTitle")}
            </h3>
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-primary transition-colors">
              {t("resume.eduSummaryDegree")}
            </h4>
            <p className="text-xs font-semibold text-secondary transition-colors">
              {t("resume.eduSummaryInstitution")}
            </p>
            <p className="text-xs sm:text-sm text-secondary pt-2 leading-relaxed transition-colors">
              {t("resume.eduSummaryFocus")}
            </p>
          </div>
        </div>

        {/* Skills Summary */}
        <div className="p-7 rounded-3xl bg-card border border-default space-y-4 shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
          <div className="flex items-center gap-3 text-emerald-500">
            <FaLaptopCode size={22} />
            <h3 className="text-lg font-bold font-heading text-primary transition-colors">
              {t("resume.skillsSummaryTitle")}
            </h3>
          </div>
          <ul className="space-y-2">
            {skillsSummary.map((s, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-secondary transition-colors">
                <FaCheckCircle className="text-emerald-500 shrink-0 mt-1 text-xs" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Certificates & Verified Work */}
        <div className="p-7 rounded-3xl bg-card border border-default space-y-4 shadow-lg shadow-slate-200/60 dark:shadow-none transition-all duration-500">
          <div className="flex items-center gap-3 text-amber-500">
            <FaAward size={22} />
            <h3 className="text-lg font-bold font-heading text-primary transition-colors">
              {t("resume.certSummaryTitle")}
            </h3>
          </div>
          <ul className="space-y-2.5">
            {certSummary.map((c, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-secondary transition-colors">
                <FaCheckCircle className="text-amber-500 shrink-0 mt-1 text-xs" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Embedded PDF Viewer Container */}
      <div className="rounded-3xl border border-default bg-card overflow-hidden shadow-2xl transition-all duration-500">
        <div className="p-5 bg-card border-b border-default flex items-center justify-between text-xs sm:text-sm font-bold text-secondary transition-colors">
          <div className="flex items-center gap-2.5">
            <FaFilePdf className="text-rose-500 text-lg" />
            <span>{t("resume.docPreviewTitle")}</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs text-secondary border border-default">
            {t("resume.a4Format")}
          </span>
        </div>
        <div className="w-full h-[800px] sm:h-[1050px] flex items-center justify-center bg-slate-100 dark:bg-[#09090B]">
          <iframe
            src="/resume.pdf#toolbar=0"
            title="Divyansh Bhadauriya Curriculum Vitae"
            className="w-full h-full border-none"
          />
        </div>
      </div>

      {/* Direct Download Note */}
      <div className="text-center text-xs sm:text-sm text-secondary transition-colors">
        {t("resume.troubleText")}{" "}
        <a
          href="/resume.pdf"
          download
          className="text-[#2563EB] dark:text-[#38BDF8] hover:underline font-bold"
        >
          {t("resume.clickHere")}
        </a>
      </div>
    </div>
  );
}
