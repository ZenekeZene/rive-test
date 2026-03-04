import { useEffect, useRef, useCallback } from "react";
import styles from "./Toast.module.css";
import { useLanguage } from "../../i18n/LanguageContext";

function ToastItem({ id, achievement, onClose }) {
  const { t } = useLanguage();
  const timerRef = useRef(null);

  const handleClose = useCallback(() => {
    onClose(id);
  }, [onClose, id]);

  useEffect(() => {
    timerRef.current = setTimeout(handleClose, 12000);
    return () => clearTimeout(timerRef.current);
  }, [handleClose]);

  return (
    <div className={styles.toast} onClick={handleClose}>
      <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
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
      <div className={styles.progressBar}>
        <div className={styles.progressFill} />
      </div>
    </div>
  );
}

function Toast({ achievements, onClose }) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <div className={styles.toastStack}>
      {achievements.map((achievement) => (
        <ToastItem
          key={achievement.id}
          id={achievement.id}
          achievement={achievement}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

export default Toast;
