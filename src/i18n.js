import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

// We eagerly bundle English as initial/fallback dictionary to prevent zero-state flash
import enTranslation from './locales/en/translation.json';

export const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇬🇧',
  },
  {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    flag: '🇮🇳',
  },
];

i18n
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
    },
    supportedLngs: ['en', 'hi'],
    nonExplicitSupportedLngs: true, // e.g. 'en-US' -> 'en', 'hi-IN' -> 'hi'
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values safely
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      checkWhitelist: true,
    },
    parseMissingKeyHandler: (key) => {
      // If a key is missing in both active language and English fallback, return clean human readable text
      const parts = key.split('.');
      const lastPart = parts[parts.length - 1];
      return lastPart
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
    },
  });

// Ensure HTML lang attribute and localStorage stay synchronized whenever language changes
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    const cleanCode = (lng || 'en').split('-')[0];
    document.documentElement.lang = cleanCode;
    try {
      localStorage.setItem('i18nextLng', cleanCode);
    } catch (e) {
      // localStorage might be unavailable in private browsing / sandboxed iframes
    }
  }
});

export default i18n;
