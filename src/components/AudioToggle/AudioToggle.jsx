import { useState } from "react";
import styles from "./AudioToggle.module.css";

function AudioToggle({ onToggle, isArtMode }) {
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    const newValue = !isListening;
    setIsListening(newValue);
    onToggle(newValue);
  };

  return (
    <button
      className={`${styles.button} ${isListening ? styles.active : ""} ${isArtMode ? styles.artMode : ""}`}
      onClick={handleClick}
      aria-label={isListening ? "Sound on" : "Sound off"}
    >
      {isListening ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path
            d="M11 5L6 9H2V15H6L11 19V5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path
            d="M11 5L6 9H2V15H6L11 19V5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 9L17 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 9L23 15"
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

export default AudioToggle;
