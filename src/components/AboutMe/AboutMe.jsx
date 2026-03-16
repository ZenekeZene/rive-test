import styles from "./AboutMe.module.css";
import { useLanguage } from "../../i18n/LanguageContext";

function AboutMe() {
  const { t } = useLanguage();
  const about = t("about");

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h2 className={styles.greeting}>{about.greeting}</h2>
      </div>

      <p className={styles.bio}>{about.bio}</p>
      <p className={styles.bioMobile}>{about.bioMobile}</p>

      {about.now && (
        <div className={styles.now}>
          <h3 className={styles.nowLabel}>{about.now.label}</h3>
          <ul className={styles.nowList}>
            {about.now.items.map((item, index) => (
              <li key={index} className={styles.nowItem}>
                <span className={styles.nowIcon}>{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.stats}>
        {about.stats.map((stat, index) => (
          <div key={index} className={`${styles.stat} ${stat.tooltip ? styles.hasTooltip : ""}`}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
            {stat.tooltip && <span className={styles.tooltip}>{stat.tooltip}</span>}
          </div>
        ))}
      </div>

      <div className={styles.skills}>
        {about.skills.map((skill, index) => (
          <span key={index} className={styles.skill}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

export default AboutMe;
