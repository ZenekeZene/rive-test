import { useRef, useState, useEffect } from "react";
import styles from "./ColorfulTitle.module.css";

// Swiss design palette - red accent with variations
const LETTER_COLORS = [
  { r: 230, g: 57, b: 70 },   // Swiss red
  { r: 200, g: 50, b: 60 },   // Dark red
  { r: 230, g: 57, b: 70 },   // Swiss red
  { r: 180, g: 45, b: 55 },   // Deeper red
  { r: 230, g: 57, b: 70 },   // Swiss red
  { r: 210, g: 52, b: 65 },   // Mid red
];

const BRUSH_RADIUS = 100;

function ColorfulTitle({ text = "Zeneke" }) {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const [paintLevels, setPaintLevels] = useState(
    text.split("").map(() => 0)
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      setPaintLevels((prev) =>
        prev.map((level, index) => {
          const letterEl = lettersRef.current[index];
          if (!letterEl) return level;

          const letterRect = letterEl.getBoundingClientRect();
          const letterCenterX = letterRect.left - containerRect.left + letterRect.width / 2;
          const letterCenterY = letterRect.top - containerRect.top + letterRect.height / 2;

          const distance = Math.sqrt(
            Math.pow(mouseX - letterCenterX, 2) + Math.pow(mouseY - letterCenterY, 2)
          );

          if (distance < BRUSH_RADIUS) {
            const intensity = 1 - distance / BRUSH_RADIUS;
            return Math.min(1, level + intensity * 0.08);
          }

          return level;
        })
      );
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [text]);

  const resetColors = () => {
    setPaintLevels(text.split("").map(() => 0));
  };

  const getColor = (index, paintLevel) => {
    const targetColor = LETTER_COLORS[index % LETTER_COLORS.length];
    const baseColor = { r: 0, g: 0, b: 0 }; // Black

    const r = Math.round(baseColor.r + (targetColor.r - baseColor.r) * paintLevel);
    const g = Math.round(baseColor.g + (targetColor.g - baseColor.g) * paintLevel);
    const b = Math.round(baseColor.b + (targetColor.b - baseColor.b) * paintLevel);

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <span
      ref={containerRef}
      className={styles.container}
      onDoubleClick={resetColors}
      title="Move mouse to paint • Double-click to reset"
    >
      {text.split("").map((letter, index) => (
        <span
          key={index}
          ref={(el) => (lettersRef.current[index] = el)}
          className={styles.letter}
          style={{
            color: getColor(index, paintLevels[index]),
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export default ColorfulTitle;
