import styles from "./StateToggles.module.css";
import { useLanguage } from "../../i18n/LanguageContext";

const TOGGLE_IDS = [
  "rebotado",
  "sospechoso",
  "confuso",
  "enfadado",
  "muyEnfadado",
  "matrix",
  "neo",
  "dibujado",
  "artista",
  "desnudo",
  "relajado",
  "despertado",
];

function StateToggles({ states }) {
  const { t } = useLanguage();

  return (
    <div className={styles.togglesContainer}>
      <div className={styles.togglesGrid}>
        {TOGGLE_IDS.map((id) => (
          <div key={id} className={styles.toggleItem}>
            <span
              className={`${styles.statusDot} ${states[id] ? styles.unlocked : ""}`}
            />
            <span className={`${styles.labelText} ${states[id] ? styles.completed : ""}`}>
              {t(id)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StateToggles;
