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
    <div className={styles.toast}>
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
