import { useState } from "react";
import styles from "./ProjectShowcase.module.css";
import { useLanguage } from "../../i18n/LanguageContext";

function ProjectShowcase() {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState(0);
  const projects = t("projects") || [];

  if (projects.length === 0) {
    return null;
  }

  const currentProject = projects[activeProject];

  return (
    <div className={styles.container}>
      <div className={styles.projectNav}>
        {projects.map((project, index) => (
          <button
            key={project.id}
            className={`${styles.navButton} ${activeProject === index ? styles.navButtonActive : ""}`}
            onClick={() => setActiveProject(index)}
          >
            {project.name}
          </button>
        ))}
      </div>

      <div className={styles.projectContent}>
        <div className={styles.projectInfo}>
          <h3 className={styles.projectName}>{currentProject.name}</h3>
          <p className={styles.projectDescription}>{currentProject.description}</p>
          <div className={styles.projectTech}>
            {currentProject.tech?.map((tech) => (
              <span key={tech} className={styles.techTag}>{tech}</span>
            ))}
          </div>
          <div className={styles.projectLinks}>
            {currentProject.github && (
              <a
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                GitHub →
              </a>
            )}
            {currentProject.demo && (
              <a
                href={currentProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                Demo →
              </a>
            )}
          </div>
        </div>

        <div className={styles.projectPreview}>
          {currentProject.embed ? (
            <iframe
              src={currentProject.embed}
              title={currentProject.name}
              className={styles.projectEmbed}
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <img
              src={currentProject.image || `https://picsum.photos/seed/project${currentProject.id}/600/400`}
              alt={currentProject.name}
              className={styles.projectImage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectShowcase;
