import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";
import PortraitHero from "./components/PortraitHero/PortraitHero";
import ContentPanel from "./components/ContentPanel/ContentPanel";
import Toast from "./components/Toast/Toast";
import AudioToggle from "./components/AudioToggle/AudioToggle";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import MaximizeToggle from "./components/MaximizeToggle/MaximizeToggle";
import SocialLinks from "./components/SocialLinks/SocialLinks";
import { useLanguage } from "./i18n/LanguageContext";

function App() {
  const { getAchievement } = useLanguage();
  const riveRef = useRef(null);
  const triggeredStates = useRef({
    confuso: false,
    sospechoso: false,
    rebotado: false,
    relajado: false,
    dibujado: false,
    artista: false,
    enfadado: false,
    muyEnfadado: false,
    matrix: false,
    neo: false,
    desnudo: false,
    despertado: false,
  });
  const wasListening = useRef(false);
  const previousStates = useRef({});

  const [toggleStates, setToggleStates] = useState({
    rebotado: false,
    sospechoso: false,
    confuso: false,
    enfadado: false,
    muyEnfadado: false,
    matrix: false,
    neo: false,
    dibujado: false,
    artista: false,
    desnudo: false,
    relajado: false,
    despertado: false,
  });

  const [currentAchievementId, setCurrentAchievementId] = useState(null);
  const [isHeroMaximized, setIsHeroMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState("experience");
  const [isHeroCollapsed, setIsHeroCollapsed] = useState(false);
  const rightPanelRef = useRef(null);
  const lastScrollTop = useRef(0);

  // Track changes and show toast
  useEffect(() => {
    const prev = previousStates.current;

    Object.keys(toggleStates).forEach((key) => {
      if (prev[key] === false && toggleStates[key] === true) {
        setCurrentAchievementId(key);
      }
    });

    previousStates.current = { ...toggleStates };
  }, [toggleStates]);

  const handleRiveReady = useCallback((rive) => {
    riveRef.current = rive;
  }, []);

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

        // thresholdCount > 1 → confuso
        if (!triggeredStates.current.confuso && thresholdValue > 1) {
          triggeredStates.current.confuso = true;
          setToggleStates((prev) => ({ ...prev, confuso: true }));
        }

        // thresholdCount >= 5 → enfadado
        if (!triggeredStates.current.enfadado && thresholdValue >= 5) {
          triggeredStates.current.enfadado = true;
          setToggleStates((prev) => ({ ...prev, enfadado: true }));
        }

        // thresholdCount >= 7 → muyEnfadado
        if (!triggeredStates.current.muyEnfadado && thresholdValue >= 7) {
          triggeredStates.current.muyEnfadado = true;
          setToggleStates((prev) => ({ ...prev, muyEnfadado: true }));
        }
      }

      // isSuspecting → sospechoso
      if (!triggeredStates.current.sospechoso) {
        const isSuspecting = vmInstance.boolean("isSuspecting");
        if (isSuspecting && isSuspecting.value === true) {
          triggeredStates.current.sospechoso = true;
          setToggleStates((prev) => ({ ...prev, sospechoso: true }));
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

      // isListening → relajado + despertado (when goes back to false)
      const isListening = vmInstance.boolean("isListening");
      if (isListening) {
        if (!triggeredStates.current.relajado && isListening.value === true) {
          triggeredStates.current.relajado = true;
          setToggleStates((prev) => ({ ...prev, relajado: true }));
        }

        // despertado: was listening, now not listening
        if (!triggeredStates.current.despertado && wasListening.current && isListening.value === false) {
          triggeredStates.current.despertado = true;
          setToggleStates((prev) => ({ ...prev, despertado: true }));
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

      // outfit === 2 → artista
      if (!triggeredStates.current.artista) {
        const outfitProperty = vmInstance.number("outfit");
        if (outfitProperty && outfitProperty.value === 2) {
          triggeredStates.current.artista = true;
          setToggleStates((prev) => ({ ...prev, artista: true }));
        }
      }

      // outfit === 1 → matrix
      if (!triggeredStates.current.matrix) {
        const outfitProperty = vmInstance.number("outfit");
        if (outfitProperty && outfitProperty.value === 1) {
          triggeredStates.current.matrix = true;
          setToggleStates((prev) => ({ ...prev, matrix: true }));
        }
      }

      // cry → desnudo
      if (!triggeredStates.current.desnudo) {
        const cryProperty = vmInstance.boolean("cry");
        if (cryProperty && cryProperty.value === true) {
          triggeredStates.current.desnudo = true;
          setToggleStates((prev) => ({ ...prev, desnudo: true }));
        }
      }
    };

    const interval = setInterval(checkRiveVariables, 100);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = useCallback((outfitValue, tabId) => {
    setActiveTab(tabId);

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

  const handleCloseToast = useCallback(() => {
    setCurrentAchievementId(null);
  }, []);

  const handleAudioToggle = useCallback((value) => {
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
    setIsHeroMaximized((prev) => !prev);
  }, []);

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

  const currentAchievement = currentAchievementId ? getAchievement(currentAchievementId) : null;

  return (
    <div className={`app ${isHeroMaximized ? "heroMaximized" : ""} ${isHeroCollapsed ? "heroCollapsed" : ""}`}>
      <div className="leftPanel">
        <PortraitHero onRiveReady={handleRiveReady} isMaximized={isHeroMaximized} />
        <MaximizeToggle isMaximized={isHeroMaximized} onToggle={handleMaximizeToggle} />
        <AudioToggle onToggle={handleAudioToggle} />
      </div>
      <div className="rightPanel" ref={rightPanelRef}>
        <ContentPanel
          toggleStates={toggleStates}
          onTabChange={handleTabChange}
        />
      </div>
      <Toast achievement={currentAchievement} onClose={handleCloseToast} />
      <LanguageSelector />
      <SocialLinks activeTab={activeTab} />
    </div>
  );
}

export default App;
