import { useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./LanguageSelector.module.css";

function LanguageSelector({ hiddenOnMobile, isArtMode }) {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handler = (e) => setLanguage(e.detail.language);
    window.addEventListener("avatar-switch-language", handler);
    return () => window.removeEventListener("avatar-switch-language", handler);
  }, [setLanguage]);

  return (
    <div className={`${styles.selector} ${hiddenOnMobile ? styles.hiddenOnMobile : ""} ${isArtMode ? styles.artMode : ""}`}>
      <button
        className={`${styles.option} ${language === "en" ? styles.active : ""}`}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
      <span className={styles.divider}>/</span>
      <button
        className={`${styles.option} ${language === "es" ? styles.active : ""}`}
        onClick={() => setLanguage("es")}
      >
        ES
      </button>
    </div>
  );
}

export default LanguageSelector;
