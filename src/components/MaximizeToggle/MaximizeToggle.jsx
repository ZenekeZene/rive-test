import styles from "./MaximizeToggle.module.css";

function MaximizeToggle({ isMaximized, onToggle, isArtMode }) {
  return (
    <button
      className={`${styles.button} ${isArtMode ? styles.artMode : ""}`}
      onClick={onToggle}
      aria-label={isMaximized ? "Minimize" : "Maximize"}
    >
      {isMaximized ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path
            d="M8 3V5H4V9H2V3H8Z"
            fill="currentColor"
          />
          <path
            d="M2 21V15H4V19H8V21H2Z"
            fill="currentColor"
          />
          <path
            d="M22 21H16V19H20V15H22V21Z"
            fill="currentColor"
          />
          <path
            d="M22 3V9H20V5H16V3H22Z"
            fill="currentColor"
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
            d="M21 3L15 3L15 5L19 5L19 9L21 9L21 3Z"
            fill="currentColor"
          />
          <path
            d="M21 21L21 15L19 15L19 19L15 19L15 21L21 21Z"
            fill="currentColor"
          />
          <path
            d="M3 21L9 21L9 19L5 19L5 15L3 15L3 21Z"
            fill="currentColor"
          />
          <path
            d="M3 3L3 9L5 9L5 5L9 5L9 3L3 3Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}

export default MaximizeToggle;
