import { createContext, useContext, useState } from "react";
import { translations, getDefaultLanguage } from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getDefaultLanguage);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const getAchievement = (id) => {
    return translations[language].achievements[id];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getAchievement }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
