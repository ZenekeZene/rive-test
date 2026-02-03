import { useState, useEffect } from "react";
import styles from "./InteractionHint.module.css";
import { useLanguage } from "../../i18n/LanguageContext";

function InteractionHint({ onDismiss }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleInteraction = () => {
      setVisible(false);
      if (onDismiss) onDismiss();
    };

    // Dismiss on any interaction
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDismiss) onDismiss();
    }, 5000);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      clearTimeout(timer);
    };
  }, [onDismiss]);

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.hintContainer}>
        <div className={styles.hand}>
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.handIcon}>
            <path d="M9.5 3.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v7.5h-3V3.5zm4 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v7.5h-3V3.5zm-8 4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5.5h-3V7.5zm12 1c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v4.5h-3V8.5zM4 14.5v3c0 3.31 2.69 6 6 6h4c3.31 0 6-2.69 6-6v-6.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v3h-1v-7c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v7h-1v-8c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v8h-1v-6c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v6.5z"/>
          </svg>
          <div className={styles.ripple}></div>
          <div className={styles.ripple2}></div>
        </div>
        <span className={styles.hintText}>{t("touchToInteract")}</span>
      </div>
    </div>
  );
}

export default InteractionHint;
