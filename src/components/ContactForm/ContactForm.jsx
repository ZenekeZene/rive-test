import { useState } from "react";
import styles from "./ContactForm.module.css";
import { useLanguage } from "../../i18n/LanguageContext";

function ContactForm() {
  const { t } = useLanguage();
  const contact = t("contact");
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.success}>
          <span className={styles.successIcon}>*</span>
          <h3 className={styles.successTitle}>{contact.successTitle}</h3>
          <p className={styles.successMessage}>{contact.successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.intro}>{contact.intro}</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>{contact.nameLabel}</label>
          <input
            type="text"
            name="name"
            className={styles.input}
            placeholder={contact.namePlaceholder}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{contact.messageLabel}</label>
          <textarea
            name="message"
            className={styles.textarea}
            placeholder={contact.messagePlaceholder}
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          {contact.sendButton}
        </button>
      </form>

      <div className={styles.alternatives}>
        <p className={styles.altText}>{contact.altText}</p>
        <div className={styles.links}>
          <a href="mailto:hello@zeneke.dev" className={styles.link}>hello@zeneke.dev</a>
          <span className={styles.separator}>/</span>
          <a href="https://twitter.com/zenekezene" target="_blank" rel="noopener noreferrer" className={styles.link}>@zenekezene</a>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
