import { useState, useEffect } from "react";
import styles from "./DarkModeToggle.module.css";

function DarkModeToggle({ onToggle, isArtMode }) {
  const [isDark, setIsDark] = useState(false);

  const handleClick = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    document.documentElement.classList.toggle("darkMode", newValue);
    onToggle(newValue);
  };

  useEffect(() => {
    const handler = () => {
      setIsDark((prev) => {
        const newValue = !prev;
        document.documentElement.classList.toggle("darkMode", newValue);
        onToggle(newValue);
        return newValue;
      });
    };
    window.addEventListener("avatar-toggle-darkmode", handler);
    return () => window.removeEventListener("avatar-toggle-darkmode", handler);
  }, [onToggle]);

  return (
    <button
      className={`${styles.button} ${isDark ? styles.active : ""} ${isArtMode ? styles.artMode : ""}`}
      onClick={handleClick}
      aria-label={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
          <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default DarkModeToggle;
