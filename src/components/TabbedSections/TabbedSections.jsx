import { useState, useRef, useEffect, lazy, Suspense } from "react";
import styles from "./TabbedSections.module.css";
import AboutMe from "../AboutMe/AboutMe";
const ImageGallery = lazy(() => import("../ImageGallery/ImageGallery"));
const ProjectShowcase = lazy(() => import("../ProjectShowcase/ProjectShowcase"));
const ContactForm = lazy(() => import("../ContactForm/ContactForm"));
import { useLanguage } from "../../i18n/LanguageContext";
import { useIsMobile } from "../../hooks/useIsMobile";

const TABS = [
  { id: "experience", labelKey: "tabExperience", outfitValue: 0 },
  { id: "code", labelKey: "tabCode", outfitValue: 1 },
  { id: "art", labelKey: "tabArt", outfitValue: 2 },
  { id: "others", labelKey: "tabOthers", outfitValue: 3 },
];

const SECTION_COMPONENTS = {
  experience: AboutMe,
  code: ProjectShowcase,
  art: ImageGallery,
  others: ContactForm,
};

function TabbedSections({ onTabChange, guestbook, onEasterEgg, onEasterEggPhrase }) {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("experience");
  const sectionRefs = useRef({});

  // Scroll spy: detect active section on every scroll frame
  useEffect(() => {
    if (isMobile) return;

    const firstEl = sectionRefs.current[TABS[0]?.id];
    if (!firstEl) return;

    // Walk up to find the scrollable ancestor
    let scrollParent = firstEl.parentElement;
    while (scrollParent) {
      const { overflowY } = getComputedStyle(scrollParent);
      if (overflowY === "auto" || overflowY === "scroll") break;
      scrollParent = scrollParent.parentElement;
    }
    if (!scrollParent) return;

    let rafId;
    let lastActiveId = null;

    const detectActiveSection = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.4;
        let active = TABS[0];

        for (const tab of TABS) {
          const el = sectionRefs.current[tab.id];
          if (!el) continue;
          if (el.getBoundingClientRect().top <= threshold) {
            active = tab;
          }
        }

        if (active.id !== lastActiveId) {
          lastActiveId = active.id;
          onTabChange?.(active.outfitValue, active.id);
        }
      });
    };

    scrollParent.addEventListener("scroll", detectActiveSection, { passive: true });
    detectActiveSection();

    return () => {
      scrollParent.removeEventListener("scroll", detectActiveSection);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile, onTabChange]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    if (onTabChange) {
      onTabChange(tab.outfitValue, tab.id);
    }
  };

  // Mobile: tabs + single active section
  if (isMobile) {
    const ActiveComponent = SECTION_COMPONENTS[activeTab];
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
          {ActiveComponent && (
            <Suspense fallback={null}>
              <ActiveComponent {...(activeTab === "others" ? { guestbook, onEasterEgg, onEasterEggPhrase } : {})} />
            </Suspense>
          )}
        </div>
      </div>
    );
  }

  // Desktop: all sections stacked vertically
  return (
    <div className={styles.scrollContainer}>
      {TABS.map((tab) => {
        const Component = SECTION_COMPONENTS[tab.id];
        return (
          <section
            key={tab.id}
            ref={(el) => (sectionRefs.current[tab.id] = el)}
            data-section={tab.id}
            className={styles.scrollSection}
          >
            <Suspense fallback={null}>
              <Component {...(tab.id === "others" ? { guestbook, onEasterEgg, onEasterEggPhrase } : {})} />
            </Suspense>
          </section>
        );
      })}
    </div>
  );
}

export default TabbedSections;
