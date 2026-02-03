import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./LanguageSelector.module.css";

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.selector}>
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
