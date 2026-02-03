import { useEffect } from "react";
import styles from "./Toast.module.css";
import { useLanguage } from "../../i18n/LanguageContext";

function Toast({ achievement, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!achievement) return;

    const timer = setTimeout(() => {
      onClose();
    }, 12000);

    return () => clearTimeout(timer);
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className={styles.toast} onClick={onClose}>
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" className={styles.closeIcon}>
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        </svg>
      </button>
      <div className={styles.header}>
        <span className={styles.icon}>✓</span>
        <span className={styles.title}>{t("achievementUnlocked")}</span>
      </div>
      <div className={styles.content}>
        <span className={styles.name}>{achievement.name}</span>
        <span className={styles.phrase}>{achievement.phrase}</span>
      </div>
    </div>
  );
}

export default Toast;
