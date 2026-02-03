import styles from "./Timeline.module.css";

function Timeline({ entries }) {
  return (
    <div className={styles.timeline}>
      {entries.map((entry) => (
        <article key={entry.id} className={styles.entry}>
          <div className={styles.marker}></div>
          <div className={styles.content}>
            <h3 className={styles.role}>{entry.role}</h3>
            <div className={styles.meta}>
              <span className={styles.company}>{entry.company}</span>
              <span className={styles.separator}>|</span>
              <span className={styles.dates}>{entry.dates}</span>
            </div>
            <p className={styles.description}>{entry.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Timeline;
