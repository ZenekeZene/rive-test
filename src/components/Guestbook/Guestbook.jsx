import styles from "./Guestbook.module.css";
import GuestbookCard from "../GuestbookCard/GuestbookCard";
import { useLanguage } from "../../i18n/LanguageContext";

function Guestbook({ entries, loading, hasMore, onLoadMore }) {
  const { t } = useLanguage();
  const gb = t("guestbook");
  const quips = gb.hoverQuips || [];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{gb.sectionTitle}</h2>

      {entries.length === 0 && !loading ? (
        <p className={styles.empty}>{gb.empty}</p>
      ) : (
        <div className={styles.grid}>
          {entries.map((entry, i) => (
            <GuestbookCard
              key={entry.id}
              entry={entry}
              quip={quips[i % quips.length]}
            />
          ))}
        </div>
      )}

      {loading && entries.length === 0 && (
        <div className={styles.loading}>...</div>
      )}

      {hasMore && entries.length > 0 && (
        <button className={styles.loadMore} onClick={onLoadMore}>
          {gb.loadMore}
        </button>
      )}
    </section>
  );
}

export default Guestbook;
