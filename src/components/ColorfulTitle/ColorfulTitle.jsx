import { useRef, useState, useEffect } from "react";
import styles from "./ColorfulTitle.module.css";

// Color palettes for different tabs
const COLOR_PALETTES = {
  default: [
    { r: 230, g: 57, b: 70 },   // Swiss red
    { r: 200, g: 50, b: 60 },   // Dark red
    { r: 230, g: 57, b: 70 },   // Swiss red
    { r: 180, g: 45, b: 55 },   // Deeper red
    { r: 230, g: 57, b: 70 },   // Swiss red
    { r: 210, g: 52, b: 65 },   // Mid red
  ],
  code: [
    { r: 19, g: 84, b: 51 },    // Matrix green #135433
    { r: 25, g: 100, b: 60 },   // Lighter green
    { r: 19, g: 84, b: 51 },    // Matrix green
    { r: 15, g: 70, b: 42 },    // Darker green
    { r: 19, g: 84, b: 51 },    // Matrix green
    { r: 22, g: 92, b: 55 },    // Mid green
  ],
  art: [
    { r: 235, g: 235, b: 235 }, // Light gray #ebebeb
    { r: 220, g: 220, b: 220 }, // Slightly darker
    { r: 235, g: 235, b: 235 }, // Light gray
    { r: 245, g: 245, b: 245 }, // Lighter
    { r: 235, g: 235, b: 235 }, // Light gray
    { r: 228, g: 228, b: 228 }, // Mid gray
  ],
  others: [
    { r: 142, g: 85, b: 147 },  // Purple #8e5593
    { r: 160, g: 100, b: 165 }, // Lighter purple
    { r: 142, g: 85, b: 147 },  // Purple
    { r: 120, g: 70, b: 125 },  // Darker purple
    { r: 142, g: 85, b: 147 },  // Purple
    { r: 150, g: 92, b: 155 },  // Mid purple
  ],
};

const BRUSH_RADIUS = 100;

function ColorfulTitle({ text = "Zeneke", activeTab = "experience", paintLevels, onPaintChange }) {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const [localPaintLevels, setLocalPaintLevels] = useState(
    text.split("").map(() => 0)
  );

  // Use external state if provided, otherwise use local state
  const currentPaintLevels = paintLevels || localPaintLevels;
  const setPaintLevels = onPaintChange || setLocalPaintLevels;

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
  }, [text, setPaintLevels]);

  const resetColors = () => {
    setPaintLevels(text.split("").map(() => 0));
  };

  const getColor = (index, paintLevel) => {
    const palette = COLOR_PALETTES[activeTab] || COLOR_PALETTES.default;
    const targetColor = palette[index % palette.length];
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
            color: getColor(index, currentPaintLevels[index]),
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export default ColorfulTitle;
