import i18 from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector"

i18
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
  lng: 'ru', // for development
  // debug: true,
});

export default i18;