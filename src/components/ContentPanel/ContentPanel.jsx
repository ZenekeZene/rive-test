import styles from "./ContentPanel.module.css";
import StateToggles from "../StateToggles/StateToggles";
import TabbedSections from "../TabbedSections/TabbedSections";
import ColorfulTitle from "../ColorfulTitle/ColorfulTitle";
import { useLanguage } from "../../i18n/LanguageContext";

function ContentPanel({ toggleStates, onTabChange }) {
  const { t } = useLanguage();

  return (
    <section className={styles.contentPanel}>
      <header className={styles.header}>
        <h1 className={styles.heroTitle}>
          <ColorfulTitle text="Zeneke" />
        </h1>
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </header>

      <div className={styles.togglesSection}>
        <StateToggles states={toggleStates} />
      </div>

      <div className={styles.tabbedSection}>
        <TabbedSections onTabChange={onTabChange} />
      </div>
    </section>
  );
}

export default ContentPanel;
