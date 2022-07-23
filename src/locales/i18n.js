import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//
import koLocales from './ko.json';
import enLocales from './en.json';
import deLocales from './de.json';
import frLocales from './fr.json';

// ----------------------------------------------------------------------

let lng = 'ko';

if (typeof localStorage !== 'undefined') {
  lng = localStorage.getItem('i18nextLng') || 'ko';
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translations: koLocales },
      de: { translations: deLocales },
      fr: { translations: frLocales },
    },
    lng,
    fallbackLng: 'ko',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
