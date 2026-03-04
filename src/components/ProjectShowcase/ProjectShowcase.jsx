import { useState } from "react";
import styles from "./ProjectShowcase.module.css";
import ColorfulTitle from "../ColorfulTitle/ColorfulTitle";
import { useLanguage } from "../../i18n/LanguageContext";
import { useIsMobile } from "../../hooks/useIsMobile";

function ProjectShowcase() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState(0);
  const projects = t("projects") || [];

  if (projects.length === 0) {
    return null;
  }

  const renderProject = (project) => (
    <div className={styles.projectContent}>
      <div className={styles.projectInfo}>
        <h3 className={styles.projectName}>
          <ColorfulTitle
            key={project.id}
            text={project.name}
            activeTab="code"
          />
        </h3>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.projectTech}>
          {project.tech?.map((tech) => (
            <span key={tech} className={styles.techTag}>{tech}</span>
          ))}
        </div>
        <div className={styles.projectLinks}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              GitHub →
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
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
        {project.embed ? (
          <iframe
            src={project.embed}
            title={project.name}
            className={styles.projectEmbed}
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <img
            src={project.image || `https://picsum.photos/seed/project${project.id}/600/400`}
            alt={project.name}
            className={styles.projectImage}
          />
        )}
      </div>
    </div>
  );

  // Desktop: all projects stacked vertically
  if (!isMobile) {
    return (
      <div className={styles.container}>
        <div className={styles.projectList}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              {renderProject(project)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Mobile: tab navigation
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
      {renderProject(currentProject)}
    </div>
  );
}

export default ProjectShowcase;
