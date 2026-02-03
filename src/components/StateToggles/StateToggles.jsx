import { useRef, useEffect, useState } from "react";
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
  const itemRefs = useRef({});
  const gridRef = useRef(null);
  const previousStates = useRef({});
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  // Auto-scroll to newly unlocked achievement
  useEffect(() => {
    const prev = previousStates.current;

    TOGGLE_IDS.forEach((id) => {
      if (prev[id] === false && states[id] === true) {
        const element = itemRefs.current[id];
        if (element && window.innerWidth <= 768) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
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
    <div className={`${styles.togglesContainer} ${scrolledToEnd ? styles.scrolledToEnd : ""}`}>
      <div className={styles.togglesGrid} ref={gridRef}>
        {TOGGLE_IDS.map((id) => (
          <div
            key={id}
            ref={(el) => (itemRefs.current[id] = el)}
            className={`${styles.toggleItem} ${states[id] ? styles.unlocked : ""}`}
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
    </div>
  );
}

export default StateToggles;
