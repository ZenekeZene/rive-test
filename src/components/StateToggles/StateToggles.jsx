import { useRef, useEffect, useState, useCallback } from "react";
import styles from "./StateToggles.module.css";
import { useLanguage } from "../../i18n/LanguageContext";

const TOGGLE_IDS = [
  "rebotado",
  "muyEnfadado",
  "neo",
  "dibujado",
  "desnudo",
  "relajado",
  "libre",
  "fotografo",
  "curioso",
  "pajaro",
  "insistente",
  "retro",
  "indeciso",
  "contactado",
  "tinieblas",
  "noctambulo",
  "coleccionista",
];

function StateToggles({ states, vertical, allUnlocked }) {
  const { t } = useLanguage();
  const itemRefs = useRef({});
  const gridRef = useRef(null);
  const containerRef = useRef(null);
  const previousStates = useRef({});
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [hoverHint, setHoverHint] = useState(null);

  // Holographic mousemove effect (vertical + allUnlocked only)
  const handleHoloMove = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--holo-x", `${x}%`);
    el.style.setProperty("--holo-y", `${y}%`);
  }, []);

  // Auto-scroll to newly unlocked achievement
  useEffect(() => {
    const prev = previousStates.current;
    const grid = gridRef.current;

    TOGGLE_IDS.forEach((id) => {
      if (prev[id] === false && states[id] === true) {
        const element = itemRefs.current[id];
        if (element && grid && window.innerWidth <= 768) {
          // Calculate scroll position to center the element
          const elementRect = element.getBoundingClientRect();
          const gridRect = grid.getBoundingClientRect();
          const elementCenter = element.offsetLeft + elementRect.width / 2;
          const gridCenter = gridRect.width / 2;
          const scrollTarget = elementCenter - gridCenter;

          grid.scrollTo({
            left: scrollTarget,
            behavior: "smooth",
          });
        }
      }
    });

    previousStates.current = { ...states };
  }, [states]);

  // Track scroll position to hide gradient at end
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleScroll = () => {
      const isAtEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10;
      setScrolledToEnd(isAtEnd);
    };

    grid.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => grid.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.togglesContainer} ${scrolledToEnd ? styles.scrolledToEnd : ""} ${vertical ? styles.vertical : ""} ${vertical && allUnlocked ? styles.allUnlocked : ""}`}
      onMouseMove={vertical && allUnlocked ? handleHoloMove : undefined}
    >
      <div className={styles.togglesGrid} ref={gridRef}>
        {TOGGLE_IDS.map((id) => (
          <div
            key={id}
            ref={(el) => (itemRefs.current[id] = el)}
            className={`${styles.toggleItem} ${states[id] ? styles.unlocked : styles.locked}`}
            onMouseEnter={vertical && !states[id] ? (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoverHint({ text: t("hints")?.[id], top: rect.top + rect.height / 2 });
            } : undefined}
            onMouseLeave={vertical && !states[id] ? () => setHoverHint(null) : undefined}
          >
            <span
              className={`${styles.statusDot} ${states[id] ? styles.unlocked : ""}`}
            />
            <span className={`${styles.labelText} ${states[id] ? styles.completed : ""}`}>
              {t(id)}
            </span>
          </div>
        ))}
      </div>
      {vertical && hoverHint && (
        <div
          className={styles.hintTooltip}
          style={{ top: hoverHint.top }}
        >
          {hoverHint.text}
        </div>
      )}
    </div>
  );
}

export default StateToggles;
