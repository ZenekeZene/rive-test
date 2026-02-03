import { useState } from "react";
import styles from "./TabbedSections.module.css";
import Timeline from "../Timeline/Timeline";
import InstagramWidget from "../InstagramWidget/InstagramWidget";
import { useLanguage } from "../../i18n/LanguageContext";

const TABS = [
  { id: "experience", labelKey: "tabExperience", outfitValue: 0 },
  { id: "code", labelKey: "tabCode", outfitValue: 1 },
  { id: "art", labelKey: "tabArt", outfitValue: 2 },
  { id: "others", labelKey: "tabOthers", outfitValue: 3 },
];

function TabbedSections({ onTabChange }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("experience");

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    if (onTabChange) {
      onTabChange(tab.outfitValue);
    }
  };

  const getData = () => {
    switch (activeTab) {
      case "experience":
        return t("experience");
      case "code":
        return t("code");
      case "art":
        return t("art");
      case "others":
        return t("others");
      default:
        return t("experience");
    }
  };

  const currentData = getData();

  return (
    <div className={styles.tabbedContainer}>
      <div className={styles.tabsHeader}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            <span className={styles.tabSquare}></span>
            {t(tab.labelKey)}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {activeTab === "art" ? (
          <InstagramWidget username="zenekezene" />
        ) : (
          <Timeline entries={currentData} />
        )}
      </div>
    </div>
  );
}

export default TabbedSections;
