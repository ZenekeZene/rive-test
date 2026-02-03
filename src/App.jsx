import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";
import PortraitHero from "./components/PortraitHero/PortraitHero";
import ContentPanel from "./components/ContentPanel/ContentPanel";
import Toast from "./components/Toast/Toast";
import AudioToggle from "./components/AudioToggle/AudioToggle";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import { useLanguage } from "./i18n/LanguageContext";

function App() {
  const { getAchievement } = useLanguage();
  const riveRef = useRef(null);
  const triggeredStates = useRef({
    confuso: false,
    sospechoso: false,
    rebotado: false,
    relajado: false,
    dibujante: false,
    enfadado: false,
    muyEnfadado: false,
    matrix: false,
    desnudo: false,
  });
  const previousStates = useRef({});

  const [toggleStates, setToggleStates] = useState({
    rebotado: false,
    sospechoso: false,
    confuso: false,
    enfadado: false,
    muyEnfadado: false,
    matrix: false,
    dibujante: false,
    desnudo: false,
    relajado: false,
  });

  const [currentAchievementId, setCurrentAchievementId] = useState(null);

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

      // isListening → relajado
      if (!triggeredStates.current.relajado) {
        const isListening = vmInstance.boolean("isListening");
        if (isListening && isListening.value === true) {
          triggeredStates.current.relajado = true;
          setToggleStates((prev) => ({ ...prev, relajado: true }));
        }
      }

      // isDrawing → dibujante
      if (!triggeredStates.current.dibujante) {
        const isDrawing = vmInstance.boolean("isDrawing");
        if (isDrawing && isDrawing.value === true) {
          triggeredStates.current.dibujante = true;
          setToggleStates((prev) => ({ ...prev, dibujante: true }));
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

  const handleTabChange = useCallback((outfitValue) => {
    if (riveRef.current) {
      const vmInstance = riveRef.current.viewModelInstance;
      if (vmInstance) {
        const outfitProperty = vmInstance.number("outfit");
        if (outfitProperty) {
          outfitProperty.value = outfitValue;
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

  const currentAchievement = currentAchievementId ? getAchievement(currentAchievementId) : null;

  return (
    <div className="app">
      <div className="leftPanel">
        <PortraitHero onRiveReady={handleRiveReady} />
      </div>
      <div className="rightPanel">
        <ContentPanel
          toggleStates={toggleStates}
          onTabChange={handleTabChange}
        />
      </div>
      <Toast achievement={currentAchievement} onClose={handleCloseToast} />
      <AudioToggle onToggle={handleAudioToggle} />
      <LanguageSelector />
    </div>
  );
}

export default App;
