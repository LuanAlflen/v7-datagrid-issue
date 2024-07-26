import { initReactI18next } from "react-i18next";
import i18n from "i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            expense: "Expense",
            price: "Price",
            english: "English",
            french: "French",
            german: "German",
            language: "Language",
            "car insurance": "Car insurance",
            rent: "rent",
        },
    },
    fr: {
        translation: {
            expense: "Dépense",
            price: "Prix",
            english: "Anglais",
            french: "Français",
            german: "Allemand",
            language: "Langue",
            "car insurance": "Assurance voiture",
            rent: "Loyer",
        },
    },
    de: {
        translation: {
            expense: "Ausgabe",
            price: "Preis",
            english: "Englisch",
            french: "Französisch",
            german: "Deutsch",
            language: "Sprache",
            "car insurance": "Autoversicherung",
            rent: "Miete",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
