// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define your translations
const resources = {
    en: {
        translation: {
            "manageClasses": "Manage Classes",
            "manageClassroom":"Manage classroom",
            "manageEntity":"Manage Entity",
            "student":"Students",
            "teachers":"Teacher",
            "allEntity":"All Entities",
        }
    },
    hi: {
        translation: {
            "manageClasses": "कक्षाएं प्रबंधित करें",
            "manageClassroom":"कक्षा का प्रबंधन करें",
            "manageEntity":"इकाई प्रबंधित करें",
            "student":"छात्र",
            "teachers":"अध्यापक",
            "allEntity":"सभी संस्थाएँ",
        }
    },
    // Add more languages here
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // default language
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
