import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./ContactForm.module.css";
import SocialLinks from "../SocialLinks/SocialLinks";
import Guestbook from "../Guestbook/Guestbook";
import { useLanguage } from "../../i18n/LanguageContext";
function ContactForm({ guestbook, onEasterEgg, onEasterEggPhrase }) {
  const { t } = useLanguage();
  const contact = t("contact");
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [formClickCount, setFormClickCount] = useState(0);
  const containerRef = useRef(null);
  const sentinelRefs = useRef([]);
  const highestPhrase = useRef(-1);
  const reachedBottom = useRef(false);
  const returnIdx = useRef(0);
  const guestbookSentinelRef = useRef(null);

  const easterEgg = t("easterEgg");
  const phrases = easterEgg.phrases;
  const returnPhrases = easterEgg.returnPhrases;

  // IntersectionObserver for sentinel divs spread across the zone
  useEffect(() => {
    const sentinels = sentinelRefs.current.filter(Boolean);
    if (sentinels.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.dataset.idx);

          if (entry.isIntersecting) {
            if (!reachedBottom.current && idx > highestPhrase.current) {
              // Going DOWN — anxious phrases
              highestPhrase.current = idx;
              onEasterEggPhrase?.(phrases[idx]);

              // Last sentinel = enable return mode (+ "curioso" achievement)
              if (idx === phrases.length - 1) {
                reachedBottom.current = true;
                returnIdx.current = phrases.length;
                onEasterEgg?.("curioso");
              }
            } else if (reachedBottom.current && idx < returnIdx.current) {
              // Going UP — reconciliation phrases
              returnIdx.current = idx;
              onEasterEggPhrase?.(returnPhrases[idx]);
            }
          }

          // Reset when sentinel[0] goes BELOW viewport (scrolling UP past it)
          if (!entry.isIntersecting && idx === 0 && entry.boundingClientRect.top >= 0) {
            highestPhrase.current = -1;
            reachedBottom.current = false;
            returnIdx.current = phrases.length;
            onEasterEggPhrase?.(null);
          }
        });
      },
      { threshold: 0.5 }
    );

    sentinels.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onEasterEgg, onEasterEggPhrase, phrases, returnPhrases]);

  // Guestbook title change
  useEffect(() => {
    const el = guestbookSentinelRef.current;
    if (!el || !onEasterEggPhrase) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && highestPhrase.current < 0) {
          onEasterEggPhrase(easterEgg.guestbookTitle);
        } else if (!entry.isIntersecting && highestPhrase.current < 0) {
          // Only clear if scrolling UP (guestbook is below viewport)
          const isAboveViewport = entry.boundingClientRect.top < 0;
          if (!isAboveViewport) {
            onEasterEggPhrase(null);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onEasterEggPhrase, easterEgg.guestbookTitle]);

  const setSentinelRef = useCallback((idx) => (el) => {
    sentinelRefs.current[idx] = el;
  }, []);

  const [backToTopClicks, setBackToTopClicks] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Positions (% of zone): first at 10% (100vh), then increasingly spaced
  const sentinelPositions = [10, 20, 32, 45, 55, 65, 74, 82, 92];

  const easterEggSection = (
    <div className={styles.easterEggZone}>
      {/* Invisible sentinels with increasing gaps */}
      {phrases.map((_, i) => (
        <div
          key={i}
          ref={setSentinelRef(i)}
          data-idx={i}
          className={styles.easterEggSentinel}
          style={{ top: `${sentinelPositions[i] ?? 95}%` }}
        />
      ))}

      {/* Anchor at the bottom */}
      <div className={styles.easterEggMessage}>
        <button
          className={styles.easterEggAnchor}
          onClick={() => setBackToTopClicks((c) => {
            const next = c + 1;
            if (next === easterEgg.backToTopClicks.length + 1) {
              onEasterEgg?.("insistente");
            }
            return next;
          })}
        >
          {backToTopClicks === 0
            ? easterEgg.backToTop
            : easterEgg.backToTopClicks[(backToTopClicks - 1) % easterEgg.backToTopClicks.length]}
        </button>
      </div>
    </div>
  );

  const formClicks = contact.formClicks || [];
  const isLastClick = formClickCount >= formClicks.length;

  if (submitted) {
    return (
      <div className={styles.container} ref={containerRef}>
        <div className={styles.formEasterEgg}>
          <button
            className={styles.formEasterEggButton}
            onClick={() => setFormClickCount((c) => {
              const next = Math.min(c + 1, formClicks.length);
              if (next >= formClicks.length) {
                onEasterEgg?.("contactado");
              }
              return next;
            })}
            disabled={isLastClick}
          >
            {isLastClick
              ? formClicks[formClicks.length - 1]
              : formClicks[formClickCount]}
          </button>
        </div>

        <div className={styles.socialSection}>
          <SocialLinks />
        </div>

        {guestbook && (
          <div ref={guestbookSentinelRef}>
            <div className={styles.guestbookDivider} />
            <Guestbook
              entries={guestbook.entries}
              loading={guestbook.loading}
              hasMore={guestbook.hasMore}
              onLoadMore={guestbook.loadMore}
            />
          </div>
        )}
        {easterEggSection}
      </div>
    );
  }

  return (
    <div className={styles.container} ref={containerRef}>
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

      <div className={styles.socialSection}>
        <SocialLinks />
      </div>

      {guestbook && (
        <div ref={guestbookSentinelRef}>
          <div className={styles.guestbookDivider} />
          <Guestbook
            entries={guestbook.entries}
            loading={guestbook.loading}
            hasMore={guestbook.hasMore}
            onLoadMore={guestbook.loadMore}
          />
        </div>
      )}
      {easterEggSection}
    </div>
  );
}

export default ContactForm;
