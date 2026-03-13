import styles from "./GuestbookCard.module.css";
import { useLanguage } from "../../i18n/LanguageContext";

function getTimeAgo(dateStr, timeAgo) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return timeAgo.now;
  if (minutes < 60) return timeAgo.minutes.replace("{n}", minutes);
  if (hours < 24) return timeAgo.hours.replace("{n}", hours);
  return timeAgo.days.replace("{n}", days);
}

function GuestbookCard({ entry, quip }) {
  const { t } = useLanguage();
  const timeAgo = t("guestbook").timeAgo;

  return (
    <article className={styles.card} data-guestbook-quip={quip}>
      <div className={styles.imageWrapper}>
        <img
          src={entry.image_url}
          alt={`Capture by ${entry.author_name}`}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.author}>{entry.author_name}</h3>
        <p className={styles.message}>{entry.message}</p>
        <time className={styles.time}>{getTimeAgo(entry.created_at, timeAgo)}</time>
      </div>
    </article>
  );
}

export default GuestbookCard;
