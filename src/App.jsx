import { useState, useRef, useCallback, useEffect, lazy, Suspense } from "react";
import "./App.css";
const PortraitHero = lazy(() => import("./components/PortraitHero/PortraitHero"));
import ContentPanel from "./components/ContentPanel/ContentPanel";
import Toast from "./components/Toast/Toast";
import AudioToggle from "./components/AudioToggle/AudioToggle";
import MaximizeToggle from "./components/MaximizeToggle/MaximizeToggle";
import CaptureButton from "./components/CaptureButton/CaptureButton";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";
import GuestbookModal from "./components/GuestbookModal/GuestbookModal";
import { captureRiveCanvas } from "./utils/captureCanvas";
import { loadAchievements, saveAchievements } from "./utils/achievementStore";
import { useGuestbook } from "./hooks/useGuestbook";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import { useLanguage } from "./i18n/LanguageContext";
import LipSyncBar from "./components/LipSyncBar/LipSyncBar";
import { useLipSync } from "./hooks/useLipSync";

const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

function App() {
  const { getAchievement, t } = useLanguage();
  const riveRef = useRef(null);
  const triggeredStates = useRef({
    rebotado: false,
    relajado: false,
    dibujado: false,
    muyEnfadado: false,
    neo: false,
    desnudo: false,
    libre: false,
    fotografo: false,
    curioso: false,
    pajaro: false,
    insistente: false,
    retro: false,
    indeciso: false,
    contactado: false,
    tinieblas: false,
    noctambulo: false,
    loryMoney: false,
    coleccionista: false,
  });
  const wasListening = useRef(false);
  const previousStates = useRef({});

  const [toggleStates, setToggleStates] = useState({
    rebotado: false,
    muyEnfadado: false,
    neo: false,
    dibujado: false,
    desnudo: false,
    relajado: false,
    libre: false,
    fotografo: false,
    curioso: false,
    pajaro: false,
    insistente: false,
    retro: false,
    indeciso: false,
    contactado: false,
    tinieblas: false,
    noctambulo: false,
    loryMoney: false,
    coleccionista: false,
  });

  const [achievementQueue, setAchievementQueue] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isHeroMaximized, setIsHeroMaximized] = useState(() => new URLSearchParams(window.location.search).has("minimal"));
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [activeTab, setActiveTab] = useState("experience");
  const [isHeroCollapsed, setIsHeroCollapsed] = useState(false);
  const rightPanelRef = useRef(null);
  const lastScrollTop = useRef(0);

  // Easter egg phrase (shown in main title)
  const [easterEggPhrase, setEasterEggPhrase] = useState(null);

  // Guestbook state
  const [capturedImage, setCapturedImage] = useState(null);
  const [showGuestbookModal, setShowGuestbookModal] = useState(false);
  const guestbook = useGuestbook();

  // Load persisted achievements on mount
  useEffect(() => {
    loadAchievements().then((saved) => {
      if (saved) {
        const merged = { ...toggleStates };
        Object.keys(saved).forEach((k) => {
          if (k in merged) merged[k] = saved[k];
        });
        Object.keys(merged).forEach((k) => {
          if (merged[k]) triggeredStates.current[k] = true;
        });
        previousStates.current = { ...merged };
        setToggleStates(merged);
      }
      setLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save achievements when they change
  useEffect(() => {
    if (loaded) {
      saveAchievements(toggleStates);
    }
  }, [toggleStates, loaded]);

  // Debug helpers (dev only) — use from browser console:
  //   __debug.unlockAll()   → triggers coleccionista celebration
  //   __debug.reset()       → clears all achievements
  //   __debug.unlock("neo") → unlock a single one
  //   __debug.status()      → log current states
  useEffect(() => {
    if (import.meta.env.PROD) return;
    const allKeys = Object.keys(triggeredStates.current);
    window.__debug = {
      unlockAll() {
        const all = {};
        allKeys.forEach((k) => { if (k !== "coleccionista") { all[k] = true; triggeredStates.current[k] = true; } });
        setToggleStates((prev) => ({ ...prev, ...all }));
        console.log("[debug] All achievements unlocked — coleccionista will trigger automatically");
      },
      reset() {
        const empty = {};
        allKeys.forEach((k) => { empty[k] = false; triggeredStates.current[k] = false; });
        setToggleStates(empty);
        console.log("[debug] All achievements reset");
      },
      unlock(id) {
        if (!allKeys.includes(id)) { console.warn(`[debug] Unknown achievement: ${id}`); return; }
        triggeredStates.current[id] = true;
        setToggleStates((prev) => ({ ...prev, [id]: true }));
        console.log(`[debug] Unlocked: ${id}`);
      },
      status() {
        console.table(toggleStates);
      },
    };
    return () => { delete window.__debug; };
  }, [toggleStates]);

  // Track changes and show toast
  useEffect(() => {
    const prev = previousStates.current;
    const newlyUnlocked = [];

    Object.keys(toggleStates).forEach((key) => {
      if (prev[key] === false && toggleStates[key] === true) {
        newlyUnlocked.push(key);
      }
    });

    if (newlyUnlocked.length > 0) {
      setAchievementQueue((q) => [...q, ...newlyUnlocked]);
    }

    previousStates.current = { ...toggleStates };
  }, [toggleStates]);

  // Night owl achievement (00:00–05:00) — wait for loaded to avoid race with loadAchievements
  useEffect(() => {
    if (!loaded) return;
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5 && !triggeredStates.current.noctambulo) {
      triggeredStates.current.noctambulo = true;
      setToggleStates((prev) => ({ ...prev, noctambulo: true }));
    }
  }, [loaded]);

  // Coleccionista meta-achievement: all others unlocked
  useEffect(() => {
    if (triggeredStates.current.coleccionista) return;
    const allOthers = Object.keys(toggleStates).filter((k) => k !== "coleccionista");
    const allUnlocked = allOthers.every((k) => toggleStates[k] === true);
    if (allUnlocked) {
      triggeredStates.current.coleccionista = true;
      setToggleStates((prev) => ({ ...prev, coleccionista: true }));
    }
  }, [toggleStates]);

  const handleRiveReady = useCallback((rive) => {
    riveRef.current = rive;
  }, []);

  const { speak, stop: stopLipSync, isPlaying: isLipSyncPlaying } = useLipSync(riveRef);

  // Watch Rive variables and trigger checkboxes
  useEffect(() => {
    const checkRiveVariables = () => {
      if (!riveRef.current) return;

      const vmInstance = riveRef.current.viewModelInstance;
      if (!vmInstance) return;

      // thresholdCount checks
      const thresholdProperty = vmInstance.number("thresholdCount");
      if (thresholdProperty) {
        const thresholdValue = thresholdProperty.value;

        // thresholdCount >= 7 → muyEnfadado
        if (!triggeredStates.current.muyEnfadado && thresholdValue >= 7) {
          triggeredStates.current.muyEnfadado = true;
          setToggleStates((prev) => ({ ...prev, muyEnfadado: true }));
        }
      }

      // isPressing → rebotado
      if (!triggeredStates.current.rebotado) {
        const isPressing = vmInstance.boolean("isPressing");
        if (isPressing && isPressing.value === true) {
          triggeredStates.current.rebotado = true;
          setToggleStates((prev) => ({ ...prev, rebotado: true }));
        }
      }

      // isListening → relajado + mute audio when portrait wakes up
      const isListening = vmInstance.boolean("isListening");
      if (isListening) {
        if (!triggeredStates.current.relajado && isListening.value === true) {
          triggeredStates.current.relajado = true;
          setToggleStates((prev) => ({ ...prev, relajado: true }));
        }

        // Portrait woke up (isListening went true→false): mute audio
        if (wasListening.current && !isListening.value) {
          setIsAudioActive(false);
        }

        wasListening.current = isListening.value;
      }

      // isDrawing → dibujado
      if (!triggeredStates.current.dibujado) {
        const isDrawing = vmInstance.boolean("isDrawing");
        if (isDrawing && isDrawing.value === true) {
          triggeredStates.current.dibujado = true;
          setToggleStates((prev) => ({ ...prev, dibujado: true }));
        }
      }

    };

    const interval = setInterval(checkRiveVariables, 500);
    return () => clearInterval(interval);
  }, []);

  // Rive trigger listeners: neo (clickMatrixTrigger), desnudo (resetPotato)
  useEffect(() => {
    let interval;

    const setup = () => {
      const vmi = riveRef.current?.viewModelInstance;
      if (!vmi) return false;

      const matrixTrigger = vmi.trigger("clickMatrixTrigger");
      if (matrixTrigger) {
        matrixTrigger.on(() => {
          if (!triggeredStates.current.neo) {
            triggeredStates.current.neo = true;
            setToggleStates((prev) => ({ ...prev, neo: true }));
          }
        });
      }

      const resetTrigger = vmi.trigger("resetPotato");
      if (resetTrigger) {
        resetTrigger.on(() => {
          if (!triggeredStates.current.desnudo) {
            triggeredStates.current.desnudo = true;
            setToggleStates((prev) => ({ ...prev, desnudo: true }));
          }
        });
      }

      return true;
    };

    interval = setInterval(() => {
      if (setup()) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const tabChangeTimestamps = useRef([]);

  const handleTabChange = useCallback((outfitValue, tabId) => {
    setActiveTab((prev) => {
      if (prev !== tabId) {
        if (prev === "art") window.dispatchEvent(new CustomEvent("leave-art-section"));
        if (prev === "code") window.dispatchEvent(new CustomEvent("leave-code-section"));
      }
      return tabId;
    });

    // Track rapid tab changes for "indeciso" achievement
    if (!triggeredStates.current.indeciso) {
      const now = Date.now();
      tabChangeTimestamps.current.push(now);
      // Keep only changes within the last 5 seconds
      tabChangeTimestamps.current = tabChangeTimestamps.current.filter((t) => now - t < 5000);
      if (tabChangeTimestamps.current.length >= 10) {
        triggeredStates.current.indeciso = true;
        setToggleStates((prev) => ({ ...prev, indeciso: true }));
      }
    }

    if (riveRef.current) {
      const vmInstance = riveRef.current.viewModelInstance;
      if (vmInstance) {
        const outfitProperty = vmInstance.number("outfit");
        if (outfitProperty) {
          outfitProperty.value = outfitValue;
        }

        // matrixEnabled: true when outfit === 1, false otherwise
        const matrixEnabled = vmInstance.boolean("matrixEnabled");
        if (matrixEnabled) {
          matrixEnabled.value = outfitValue === 1;
        }

        // canvasEnabled: true when outfit === 2, false otherwise
        const canvasEnabled = vmInstance.boolean("canvasEnabled");
        if (canvasEnabled) {
          canvasEnabled.value = outfitValue === 2;
        }
      }
    }
  }, []);

  const handleCloseToast = useCallback((id) => {
    setAchievementQueue((q) => q.filter((item) => item !== id));
  }, []);

  // Track if ramen is currently shown in the left panel overlay
  const [isRamenActive, setIsRamenActive] = useState(false);
  // Track if any overlay (code preview/embed or art project) covers the portrait
  const [isCodeOverlayActive, setIsCodeOverlayActive] = useState(false);
  const [isArtOverlayActive, setIsArtOverlayActive] = useState(false);

  useEffect(() => {
    const handleOverlayChange = (e) => {
      const src = e.detail?.embedSrc || "";
      setIsRamenActive(src.includes("parallax-ramen"));
    };
    const handleCodeOverlay = (e) => setIsCodeOverlayActive(!!e.detail?.active);
    const handleArtOverlay = (e) => setIsArtOverlayActive(!!e.detail?.active);
    window.addEventListener("overlay-embed-change", handleOverlayChange);
    window.addEventListener("code-overlay-change", handleCodeOverlay);
    window.addEventListener("art-overlay-change", handleArtOverlay);
    return () => {
      window.removeEventListener("overlay-embed-change", handleOverlayChange);
      window.removeEventListener("code-overlay-change", handleCodeOverlay);
      window.removeEventListener("art-overlay-change", handleArtOverlay);
    };
  }, []);

  const handleAudioToggle = useCallback((value) => {
    setIsAudioActive(value);
    if (riveRef.current) {
      const vmInstance = riveRef.current.viewModelInstance;
      if (vmInstance) {
        const isListeningProperty = vmInstance.boolean("isListening");
        if (isListeningProperty) {
          isListeningProperty.value = value;
        }
      }
    }
  }, []);

  const handleMaximizeToggle = useCallback(() => {
    setIsHeroMaximized((prev) => {
      const newValue = !prev;
      if (newValue && !triggeredStates.current.libre) {
        triggeredStates.current.libre = true;
        setToggleStates((s) => ({ ...s, libre: true }));
      }
      return newValue;
    });
  }, []);

  const handleCapture = useCallback(async () => {
    try {
      const blob = await captureRiveCanvas();
      setCapturedImage(blob);
      setShowGuestbookModal(true);
    } catch (err) {
      console.error("Canvas capture failed:", err);
    }
  }, []);

  const handleGuestbookSubmit = useCallback(async (name, message, imageBlob) => {
    await guestbook.submitEntry(name, message, imageBlob);
    if (!triggeredStates.current.fotografo) {
      triggeredStates.current.fotografo = true;
      setToggleStates((prev) => ({ ...prev, fotografo: true }));
    }
  }, [guestbook]);

  const handleCloseGuestbookModal = useCallback(() => {
    setShowGuestbookModal(false);
    setCapturedImage(null);
  }, []);

  const handleDarkModeToggle = useCallback((isDark) => {
    if (isDark && !triggeredStates.current.tinieblas) {
      triggeredStates.current.tinieblas = true;
      setToggleStates((prev) => ({ ...prev, tinieblas: true }));
    }
  }, []);

  const handleResetAchievements = useCallback(() => {
    const allKeys = Object.keys(triggeredStates.current);
    const empty = {};
    allKeys.forEach((k) => { empty[k] = false; triggeredStates.current[k] = false; });
    setToggleStates(empty);
  }, []);

  const handleEasterEgg = useCallback((achievementId) => {
    if (!triggeredStates.current[achievementId]) {
      triggeredStates.current[achievementId] = true;
      setToggleStates((prev) => ({ ...prev, [achievementId]: true }));
    }
  }, []);

  const handleEasterEggPhrase = useCallback((phrase) => {
    setEasterEggPhrase(phrase);
  }, []);

  // Konami Code
  const [konamiShake, setKonamiShake] = useState(false);
  const konamiIndex = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (triggeredStates.current.retro) return;

      const expected = KONAMI_SEQUENCE[konamiIndex.current];
      if (e.key === expected) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI_SEQUENCE.length) {
          // Konami completed!
          konamiIndex.current = 0;
          triggeredStates.current.retro = true;
          setToggleStates((prev) => ({ ...prev, retro: true }));
          setEasterEggPhrase(t("konamiPhrase"));
          setKonamiShake(true);
          setTimeout(() => setKonamiShake(false), 600);
          setTimeout(() => setEasterEggPhrase(null), 4000);
        }
      } else {
        konamiIndex.current = e.key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [t]);

  // Mobile touch behavior - hide/show hero on drag
  const touchStartY = useRef(0);

  useEffect(() => {
    const panel = rightPanelRef.current;
    if (!panel) return;

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      // Only on mobile
      if (window.innerWidth > 768) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;
      const scrollTop = panel.scrollTop;
      const threshold = 30;

      if (deltaY > threshold && scrollTop > 20) {
        // Dragging up (scroll down) - hide hero
        setIsHeroCollapsed(true);
      } else if (deltaY < -threshold && scrollTop < 20) {
        // Dragging down (scroll up) at top - show hero
        setIsHeroCollapsed(false);
      }
    };

    const handleScroll = () => {
      // Only on mobile
      if (window.innerWidth > 768) return;

      // Show hero when scrolled to top
      if (panel.scrollTop < 10) {
        setIsHeroCollapsed(false);
      }
    };

    panel.addEventListener("touchstart", handleTouchStart, { passive: true });
    panel.addEventListener("touchmove", handleTouchMove, { passive: true });
    panel.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      panel.removeEventListener("touchstart", handleTouchStart);
      panel.removeEventListener("touchmove", handleTouchMove);
      panel.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const achievements = achievementQueue.map((id) => ({ id, ...getAchievement(id) }));

  return (
    <div className={`app ${isHeroMaximized ? "heroMaximized" : ""} ${isHeroCollapsed ? "heroCollapsed" : ""} ${konamiShake ? "konamiShake" : ""}`}>
      <div className="leftPanel" id="leftPanel">
        <Suspense fallback={null}>
          <PortraitHero onRiveReady={handleRiveReady} isMaximized={isHeroMaximized} isAudioActive={isAudioActive} />
        </Suspense>
        <MaximizeToggle isMaximized={isHeroMaximized} onToggle={handleMaximizeToggle} isArtMode={activeTab === "art"} />
        <LanguageSelector hiddenOnMobile={isHeroMaximized} isArtMode={activeTab === "art"} />
        <DarkModeToggle onToggle={handleDarkModeToggle} isArtMode={activeTab === "art"} />
        <CaptureButton onCapture={handleCapture} isArtMode={activeTab === "art"} disabled={guestbook.cooldown} />
        <AudioToggle onToggle={handleAudioToggle} isArtMode={activeTab === "art"} isActive={isAudioActive} disabled={(isCodeOverlayActive || isArtOverlayActive) && !isAudioActive} />
        <LipSyncBar onSpeak={speak} onStop={stopLipSync} isPlaying={isLipSyncPlaying} />
      </div>
      <div className="rightPanel" ref={rightPanelRef}>
        <ContentPanel
          toggleStates={toggleStates}
          onTabChange={handleTabChange}
          activeTab={activeTab}
          isHeroMaximized={isHeroMaximized}
          guestbook={guestbook}
          onEasterEgg={handleEasterEgg}
          easterEggPhrase={easterEggPhrase}
          onEasterEggPhrase={handleEasterEggPhrase}
          onDarkModeToggle={handleDarkModeToggle}
          onCapture={handleCapture}
          onAudioToggle={handleAudioToggle}
          captureCooldown={guestbook.cooldown}
          onReset={handleResetAchievements}
          loaded={loaded}
          isRamenActive={isRamenActive}
          isAudioActive={isAudioActive}
          isCodeOverlayActive={isCodeOverlayActive}
          isArtOverlayActive={isArtOverlayActive}
        />
      </div>
      <Toast achievements={achievements} onClose={handleCloseToast} />
      {showGuestbookModal && capturedImage && (
        <GuestbookModal
          imageBlob={capturedImage}
          onSubmit={handleGuestbookSubmit}
          onClose={handleCloseGuestbookModal}
        />
      )}
    </div>
  );
}

export default App;
