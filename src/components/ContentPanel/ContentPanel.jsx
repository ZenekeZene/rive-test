import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import styles from "./ContentPanel.module.css";
import StateToggles from "../StateToggles/StateToggles";
import TabbedSections from "../TabbedSections/TabbedSections";
import ColorfulTitle from "../ColorfulTitle/ColorfulTitle";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import CaptureButton from "../CaptureButton/CaptureButton";
import AudioToggle from "../AudioToggle/AudioToggle";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import DotGrid from "../DotGrid/DotGrid";
import Confetti from "../Confetti/Confetti";
import { useLanguage } from "../../i18n/LanguageContext";
import { useIsMobile } from "../../hooks/useIsMobile";

function ContentPanel({ toggleStates, onTabChange, activeTab, isHeroMaximized, guestbook, onEasterEgg, easterEggPhrase, onEasterEggPhrase, onDarkModeToggle, onCapture, onAudioToggle, captureCooldown, onReset, loaded, isRamenActive, isAudioActive, isCodeOverlayActive, isArtOverlayActive }) {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const isCollector = toggleStates.coleccionista === true;

  // Reset achievements: two-click confirmation
  const [resetConfirming, setResetConfirming] = useState(false);
  const resetTimer = useRef(null);
  const hasAnyUnlocked = useMemo(() => Object.values(toggleStates).some(Boolean), [toggleStates]);

  const handleResetClick = useCallback(() => {
    if (resetConfirming) {
      clearTimeout(resetTimer.current);
      setResetConfirming(false);
      onReset?.();
    } else {
      setResetConfirming(true);
      resetTimer.current = setTimeout(() => setResetConfirming(false), 3000);
    }
  }, [resetConfirming, onReset]);

  // Celebration: only on false → true transition (not on page reload)
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCollectorTitle, setShowCollectorTitle] = useState(false);
  const prevColeccionista = useRef(toggleStates.coleccionista);
  const wasLoadedBefore = useRef(false);

  useEffect(() => {
    if (wasLoadedBefore.current && prevColeccionista.current === false && toggleStates.coleccionista === true) {
      setShowConfetti(true);
      setShowCollectorTitle(true);
    }
    prevColeccionista.current = toggleStates.coleccionista;
    wasLoadedBefore.current = loaded;
  }, [toggleStates.coleccionista, loaded]);

  const TITLE_KEYS = {
    experience: null,
    code: "sectionCode",
    art: "sectionArt",
    others: "sectionContact",
  };

  const baseTitleText = isMobile
    ? "Zeneke"
    : showCollectorTitle && !easterEggPhrase
      ? t("collectorTitle")
      : TITLE_KEYS[activeTab]
        ? t(TITLE_KEYS[activeTab])
        : t("about").greeting;

  const titleText = easterEggPhrase || baseTitleText;

  const SECTION_COLORS = {
    experience: "230, 57, 70",
    code: "19, 84, 51",
    art: "180, 180, 180",
    others: "142, 85, 147",
  };

  // Fade transition for title changes
  const [displayedTitle, setDisplayedTitle] = useState(titleText);
  const [titleFading, setTitleFading] = useState(false);
  const fadeTimer = useRef(null);
  const [titleCoolingDown, setTitleCoolingDown] = useState(false);
  const cooldownTimer = useRef(null);

  useEffect(() => {
    if (titleText === displayedTitle) return;

    setTitleFading(true);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setDisplayedTitle(titleText);
      setTitleFading(false);
    }, 300);

    return () => clearTimeout(fadeTimer.current);
  }, [titleText, displayedTitle]);

  // 3s cooldown after title settles — prevents guestbook hovers from overriding too soon
  useEffect(() => {
    setTitleCoolingDown(true);
    clearTimeout(cooldownTimer.current);
    cooldownTimer.current = setTimeout(() => setTitleCoolingDown(false), 3000);
    return () => clearTimeout(cooldownTimer.current);
  }, [displayedTitle]);

  // Hover phrase from guestbook cards (instant, bypasses fade)
  const [hoverPhrase, setHoverPhrase] = useState(null);

  const effectiveTitle = (!titleCoolingDown && hoverPhrase) || displayedTitle;

  const [paintLevels, setPaintLevels] = useState(effectiveTitle.split("").map(() => 0));
  const panelRef = useRef(null);

  // Reset paint levels when effective title changes
  useEffect(() => {
    setPaintLevels(effectiveTitle.split("").map(() => 0));
  }, [effectiveTitle]);

  // Event delegation for guestbook card hover
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || isMobile) return;

    const handleOver = (e) => {
      const card = e.target.closest("[data-guestbook-quip]");
      if (card) setHoverPhrase(card.dataset.guestbookQuip);
    };

    const handleOut = (e) => {
      const card = e.target.closest("[data-guestbook-quip]");
      if (card && !card.contains(e.relatedTarget)) {
        setHoverPhrase(null);
      }
    };

    panel.addEventListener("mouseover", handleOver);
    panel.addEventListener("mouseout", handleOut);
    return () => {
      panel.removeEventListener("mouseover", handleOver);
      panel.removeEventListener("mouseout", handleOut);
    };
  }, [isMobile]);

  const handleMouseMove = useCallback((e) => {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    panel.style.setProperty("--mouse-y", `${e.clientY - rect.top + panel.scrollTop}px`);
  }, []);

  // --- Top easter egg zone (scroll UP from About, only after Curioso) ---
  const topZoneRef = useRef(null);
  const topSentinelRefs = useRef([]);
  const topHighestPhrase = useRef(-1);
  const topZoneScrolled = useRef(false);

  const topEasterEgg = t("topEasterEgg");
  const topPhrases = topEasterEgg?.phrases || [];
  const topSentinelPositions = [90, 80, 68, 55, 45, 35, 26, 18, 8];

  const setTopSentinelRef = useCallback((idx) => (el) => {
    topSentinelRefs.current[idx] = el;
  }, []);

  // Auto-scroll to compensate when zone first appears
  useLayoutEffect(() => {
    if (toggleStates.curioso && !topZoneScrolled.current && topZoneRef.current && panelRef.current) {
      topZoneScrolled.current = true;
      panelRef.current.scrollTop += topZoneRef.current.offsetHeight;
    }
  }, [toggleStates.curioso]);

  // IntersectionObserver for top zone sentinels
  useEffect(() => {
    if (isMobile || !toggleStates.curioso) return;

    const sentinels = topSentinelRefs.current.filter(Boolean);
    if (sentinels.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.dataset.idx);

          if (entry.isIntersecting && idx > topHighestPhrase.current) {
            topHighestPhrase.current = idx;
            onEasterEggPhrase?.(topPhrases[idx]);

            if (idx === topPhrases.length - 1) {
              onEasterEgg?.("pajaro");
            }
          }

          // Reset when sentinel[0] goes ABOVE viewport (user scrolled down, leaving zone)
          if (!entry.isIntersecting && idx === 0 && topHighestPhrase.current >= 0) {
            if (entry.boundingClientRect.top < 0) {
              topHighestPhrase.current = -1;
              onEasterEggPhrase?.(null);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sentinels.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile, toggleStates.curioso, onEasterEgg, onEasterEggPhrase, topPhrases]);

  return (
    <main
      ref={panelRef}
      className={styles.contentPanel}
      style={{
        "--section-glow": `rgba(${SECTION_COLORS[activeTab] || SECTION_COLORS.experience}, 0.15)`,
        "--section-tint": `rgba(${SECTION_COLORS[activeTab] || SECTION_COLORS.experience}, 0.08)`,
      }}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
    >
      {/* DotGrid disabled — canvas sized to scrollHeight causes poor performance with long scroll zones */}
      {/* {!isMobile && <DotGrid sectionColor={SECTION_COLORS[activeTab] || SECTION_COLORS.experience} />} */}
      {/* LanguageSelector moved: desktop → sidebar, mobile → App.jsx leftPanel */}

      <div className={isMobile ? undefined : styles.stickyTop}>
        <header className={styles.header}>
          <h1 className={`${styles.heroTitle} ${titleFading && !hoverPhrase ? styles.titleFading : ''}`}>
            <ColorfulTitle
              text={effectiveTitle}
              activeTab={activeTab}
              paintLevels={paintLevels}
              onPaintChange={setPaintLevels}
            />
          </h1>
        </header>

        {isMobile && (
          <div className={styles.togglesSection}>
            <StateToggles states={toggleStates} />
          </div>
        )}

      </div>

      {!isMobile && (
        <div className={`${styles.togglesSidebar} ${isCollector ? styles.sidebarGold : ""}`}>
          <LanguageSelector />
          <div className={styles.sidebarActions}>
            <DarkModeToggle onToggle={onDarkModeToggle} />
            <CaptureButton onCapture={onCapture} disabled={captureCooldown} />
            <AudioToggle onToggle={onAudioToggle} isActive={isAudioActive} disabled={isCodeOverlayActive || isArtOverlayActive} />
            {hasAnyUnlocked && (
              <button
                className={`${styles.resetAction} ${resetConfirming ? styles.resetConfirming : ""}`}
                onClick={handleResetClick}
                title={resetConfirming ? t("resetConfirm") : t("resetAchievements")}
              >
                {resetConfirming ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 4v6h6" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                )}
              </button>
            )}
          </div>
          <div className={styles.sidebarScrollable}>
            <p className={styles.sidebarCta}>
              {isCollector ? (
                <a href="https://www.youtube.com/watch?v=n4AOlN-cUVg" target="_blank" rel="noopener noreferrer" className={styles.sidebarCtaLink}>
                  {t("sidebarCtaCollector")}
                </a>
              ) : t("sidebarCta")}
            </p>
            <StateToggles states={toggleStates} vertical allUnlocked={isCollector} />
          </div>
        </div>
      )}

      {!isMobile && toggleStates.curioso && (
        <div ref={topZoneRef} className={styles.topEasterEggZone}>
          {topPhrases.map((_, i) => (
            <div
              key={i}
              ref={setTopSentinelRef(i)}
              data-idx={i}
              className={styles.topEasterEggSentinel}
              style={{ top: `${topSentinelPositions[i] ?? 5}%` }}
            />
          ))}
        </div>
      )}

      <div className={styles.tabbedSection}>
        <TabbedSections onTabChange={onTabChange} guestbook={guestbook} onEasterEgg={onEasterEgg} onEasterEggPhrase={onEasterEggPhrase} />
      </div>

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </main>
  );
}

export default ContentPanel;
