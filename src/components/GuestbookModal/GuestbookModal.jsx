import { useState, useEffect, useRef, useMemo } from "react";
import styles from "./GuestbookModal.module.css";
import { useLanguage } from "../../i18n/LanguageContext";

const MAX_MESSAGE = 280;
const MAX_NAME = 60;

function GuestbookModal({ imageBlob, onSubmit, onClose }) {
  const { t } = useLanguage();
  const gb = t("guestbook");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const nameInputRef = useRef(null);
  const imageUrl = useMemo(
    () => (imageBlob ? URL.createObjectURL(imageBlob) : null),
    [imageBlob]
  );

  // Focus name input on mount
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && status !== "submitting") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, status]);

  // Auto-close on success
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || status === "submitting") return;

    setStatus("submitting");
    try {
      await onSubmit(name.trim(), message.trim(), imageBlob);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && status !== "submitting") {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          disabled={status === "submitting"}
          aria-label="Close"
        >
          &times;
        </button>

        <div className={styles.content}>
          <div className={styles.imageSection}>
            {imageUrl && (
              <img src={imageUrl} alt="Captured" className={styles.preview} width={600} height={600} />
            )}
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.title}>{gb.modalTitle}</h2>

            {status === "success" ? (
              <div className={styles.successState}>
                <span className={styles.successIcon}>*</span>
                <p className={styles.successText}>{gb.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label className={styles.label}>{gb.nameLabel}</label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    className={styles.input}
                    placeholder={gb.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, MAX_NAME))}
                    maxLength={MAX_NAME}
                    required
                    disabled={status === "submitting"}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    {gb.messageLabel}
                    <span className={styles.charCount}>
                      {gb.charCount.replace("{count}", MAX_MESSAGE - message.length)}
                    </span>
                  </label>
                  <textarea
                    className={styles.textarea}
                    placeholder={gb.messagePlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
                    maxLength={MAX_MESSAGE}
                    rows={4}
                    required
                    disabled={status === "submitting"}
                  />
                </div>

                {status === "error" && (
                  <p className={styles.errorText}>{gb.errorMessage}</p>
                )}

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={status === "submitting" || !name.trim() || !message.trim()}
                >
                  {status === "submitting" ? gb.submitting : gb.submitButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestbookModal;
