import i18n from 'i18next';
import en from './en/translation.json';
import ua from './ua/translation.json';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import english_flag from "../assets/images/flags/united-kingdom.svg";
import ua_flag from "../assets/images/flags/ukraine.svg"; // ⬅️ new

export const resources = {
    en: {ns1: en,},
    ua: {ns1: ua,}
} as const;

export const SUPPORTED_LANGUAGES = ['en', 'ua'];

export function getLanguageFlagPairFromLocale(locale: string) {
    switch (locale) {
        case 'uk':
        case 'ua':
            return [ua_flag, 'українська'];
        case 'en':
            return [english_flag, 'english'];
        default:
            return [english_flag, 'english'];
    }
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: ['en', 'ua'],
        debug: true,
        interpolation: {
            escapeValue: false,
        }, resources
    });
export default i18n;
