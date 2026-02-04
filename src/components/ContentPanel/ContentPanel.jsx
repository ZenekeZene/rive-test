import { useState, useEffect } from "react";
import styles from "./ContentPanel.module.css";
import StateToggles from "../StateToggles/StateToggles";
import TabbedSections from "../TabbedSections/TabbedSections";
import ColorfulTitle from "../ColorfulTitle/ColorfulTitle";
import SocialLinks from "../SocialLinks/SocialLinks";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useLanguage } from "../../i18n/LanguageContext";

function ContentPanel({ toggleStates, onTabChange, activeTab, isHeroMaximized }) {
  const { t } = useLanguage();
  const [paintLevels, setPaintLevels] = useState("Zeneke".split("").map(() => 0));

  // Reset paint levels when tab changes
  useEffect(() => {
    setPaintLevels("Zeneke".split("").map(() => 0));
  }, [activeTab]);

  return (
    <section className={styles.contentPanel}>
      <LanguageSelector hiddenOnMobile={isHeroMaximized} isArtMode={activeTab === "art"} />

      <header className={styles.header}>
        <h1 className={styles.heroTitle}>
          <ColorfulTitle
            text="Zeneke"
            activeTab={activeTab}
            paintLevels={paintLevels}
            onPaintChange={setPaintLevels}
          />
        </h1>
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </header>

      <div className={styles.togglesSection}>
        <StateToggles states={toggleStates} />
      </div>

      <div className={styles.tabbedSection}>
        <TabbedSections onTabChange={onTabChange} />
      </div>

      <SocialLinks activeTab={activeTab} />
    </section>
  );
}

export default ContentPanel;
