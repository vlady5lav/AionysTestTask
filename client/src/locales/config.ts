import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import appEn from './en/app.json';
import headerEn from './en/header.json';
import notesEn from './en/notes.json';
import appRu from './ru/app.json';
import headerRu from './ru/header.json';
import notesRu from './ru/notes.json';

export const resources = {
  en: {
    app: appEn,
    header: headerEn,
    notes: notesEn,
  },
  ru: {
    app: appRu,
    header: headerRu,
    notes: notesRu,
  },
} as const;

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  ns: ['app', 'header', 'notes'],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});

export default i18n;
