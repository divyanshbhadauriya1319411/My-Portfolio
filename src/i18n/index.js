import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../../public/locales/en/common.json";
import translationHI from "../../public/locales/hi/common.json";

const resources = {
  en: {
    common: translationEN
  },
  hi: {
    common: translationHI
  }
};

const savedLng = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLng,
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false // React already escapes values from XSS
    }
  });

export default i18n;
