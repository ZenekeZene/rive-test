import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./ProjectShowcase.module.css";
import ColorfulTitle from "../ColorfulTitle/ColorfulTitle";
import { useLanguage } from "../../i18n/LanguageContext";
import { useIsMobile } from "../../hooks/useIsMobile";

function LeftPanelOverlay({ videoSrc, embedSrc, embedTitle, hidden }) {
  const videoRef = useRef(null);
  const [showEmbed, setShowEmbed] = useState(false);
  const container = document.getElementById("leftPanel");

  useEffect(() => {
    if (videoRef.current && !hidden) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc, hidden]);

  useEffect(() => {
    if (!container) return;
    const handleEnter = () => setShowEmbed(true);
    const handleLeave = () => setShowEmbed(false);
    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [container]);

  if (!container) return null;

  const alwaysShowEmbed = !videoSrc && embedSrc;

  return createPortal(
    <div className={styles.videoOverlay} data-video-overlay style={hidden ? { visibility: "hidden", pointerEvents: "none" } : undefined}>
      {videoSrc ? (
        <video
          ref={videoRef}
          className={styles.videoOverlayPlayer}
          src={videoSrc}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : !alwaysShowEmbed ? (
        <div className={styles.videoOverlayPlaceholder} />
      ) : null}
      {(alwaysShowEmbed || (showEmbed && embedSrc)) && (
        <iframe
          src={embedSrc}
          title={embedTitle}
          className={styles.embedOverlayIframe}
        />
      )}
    </div>,
    container
  );
}


function EmbedCarousel({ embeds, projectName, onActiveEmbedChange, placeholder }) {
  const [activeEmbed, setActiveEmbed] = useState(0);

  const handleEmbedChange = (index) => {
    setActiveEmbed(index);
    onActiveEmbedChange?.(embeds[index]);
  };

  // Notify parent of initial active embed
  useEffect(() => {
    onActiveEmbedChange?.(embeds[activeEmbed]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const activeEmbedData = embeds[activeEmbed];

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselHeader}>
        <div className={styles.carouselNav}>
          {embeds.map((embed, index) => (
            <button
              key={index}
              className={`${styles.carouselDot} ${activeEmbed === index ? styles.carouselDotActive : ""}`}
              onClick={() => handleEmbedChange(index)}
              title={embed.label}
            >
              {embed.label}
            </button>
          ))}
        </div>
      </div>
      {placeholder ? (
        <div className={styles.projectEmbed} />
      ) : (
        <iframe
          key={activeEmbedData.src}
          src={activeEmbedData.src}
          title={`${projectName} - ${activeEmbedData.label}`}
          className={styles.projectEmbed}
        />
      )}
    </div>
  );
}

function ProjectShowcase() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [cardScrollStates, setCardScrollStates] = useState({});
  const [activeCarouselEmbed, setActiveCarouselEmbed] = useState({});
  const cardRefs = useRef({});
  const projects = t("projects") || [];

  // Track scroll visibility for each project card (for lazy iframe loading)
  useEffect(() => {
    if (isMobile) return;

    const refs = cardRefs.current;
    const cardIds = Object.keys(refs).filter((id) => refs[id]);
    if (cardIds.length === 0) return;

    const firstCard = refs[cardIds[0]];
    if (!firstCard) return;

    const scrollParent = firstCard.closest("[class*='contentPanel']");
    if (!scrollParent) return;

    const PRELOAD_MARGIN = 200;

    const check = () => {
      const viewportHeight = window.innerHeight;

      setCardScrollStates((prev) => {
        const next = { ...prev };
        let changed = false;

        for (const id of cardIds) {
          // Once visible, stay visible (don't unmount loaded iframes)
          if (next[id] === true) continue;
          const card = refs[id];
          if (!card) continue;
          const cardRect = card.getBoundingClientRect();
          const inRange = cardRect.bottom >= -PRELOAD_MARGIN && cardRect.top <= viewportHeight + PRELOAD_MARGIN;
          if (inRange) {
            next[id] = true;
            changed = true;
          }
        }

        return changed ? next : prev;
      });
    };

    scrollParent.addEventListener("scroll", check, { passive: true });
    check();
    return () => scrollParent.removeEventListener("scroll", check);
  }, [isMobile, projects]);

  // Clear left panel overlay when leaving Code section
  useEffect(() => {
    const handleLeaveCode = () => setHoveredCardId(null);
    window.addEventListener("leave-code-section", handleLeaveCode);
    return () => window.removeEventListener("leave-code-section", handleLeaveCode);
  }, []);

  if (projects.length === 0) {
    return null;
  }

  // Determine which overlay to show (if any)
  // Priority: hovered card > visible card with overlay data
  const getOverlayForProject = (project) => {
    if (project.embeds?.length > 0) {
      const embed = activeCarouselEmbed[project.id] || project.embeds[0];
      if (embed.hoverVideo || embed.hoverVideo === null) {
        return { videoSrc: embed.hoverVideo, embedSrc: embed.src, title: `${project.name} - ${embed.label}` };
      }
      return null;
    }
    if (project.hoverVideo !== undefined && (project.embed || project.hoverVideo)) {
      return { videoSrc: project.hoverVideo, embedSrc: project.embed || null, title: project.name };
    }
    return null;
  };

  // Find the active overlay project — only show on explicit hover
  let overlayData = null;
  const hoveredProject = hoveredCardId != null ? projects.find((p) => p.id === hoveredCardId) : null;

  if (hoveredProject) {
    overlayData = getOverlayForProject(hoveredProject);
  }

  // Track last embed-only overlay so it stays alive (hidden) when un-hovered
  // This preserves interactive state like mic/particles across hover cycles
  const lastEmbedOverlayRef = useRef(null);
  if (overlayData && !overlayData.videoSrc && overlayData.embedSrc) {
    lastEmbedOverlayRef.current = overlayData;
  } else if (overlayData) {
    // Hovering a video project — clear persisted embed overlay
    lastEmbedOverlayRef.current = null;
  }
  const persistedOverlay = lastEmbedOverlayRef.current;
  const overlayHidden = !overlayData && persistedOverlay;

  // Notify the app which embed is in the left panel overlay
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("overlay-embed-change", {
      detail: { embedSrc: overlayData?.embedSrc || null },
    }));
  }, [overlayData?.embedSrc]);

  // Notify the app when a code overlay is visible in the left panel
  const isCodeOverlayVisible = !!(overlayData && !overlayHidden);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("code-overlay-change", {
      detail: { active: isCodeOverlayVisible },
    }));
  }, [isCodeOverlayVisible]);

  const handleCarouselEmbedChange = (projectId) => (embed) => {
    setActiveCarouselEmbed((prev) => ({ ...prev, [projectId]: embed }));
  };

  const renderPreview = (project) => {
    // Default to visible if scroll state hasn't been computed yet (avoids flicker on tab switch)
    const isVisible = isMobile || cardScrollStates[project.id] !== false;

    // Don't mount iframes when card is not visible
    if (!isVisible) {
      if (project.embeds?.length > 0) {
        return (
          <EmbedCarousel
            embeds={project.embeds}
            projectName={project.name}
            onActiveEmbedChange={handleCarouselEmbedChange(project.id)}
            placeholder
          />
        );
      }
      return <div className={styles.projectEmbed} />;
    }

    if (project.embeds?.length > 0) {
      return (
        <EmbedCarousel
          embeds={project.embeds}
          projectName={project.name}
          onActiveEmbedChange={handleCarouselEmbedChange(project.id)}
        />
      );
    }
    if (project.embed) {
      const previewSrc = project.embed + (project.embed.includes("?") ? "&minimal" : "?minimal");
      return (
        <iframe
          src={previewSrc}
          title={project.name}
          className={styles.projectEmbed}
        />
      );
    }
    if (project.hoverVideo) {
      return (
        <video
          src={project.hoverVideo}
          muted
          loop
          playsInline
          autoPlay
          className={styles.projectEmbed}
        />
      );
    }
    return (
      <img
        src={project.image || `https://picsum.photos/seed/project${project.id}/600/400`}
        alt={project.name}
        className={styles.projectImage}
        width={600}
        height={400}
      />
    );
  };

  const renderProject = (project) => (
    <div className={styles.projectContent}>
      <div className={styles.projectInfo}>
        <h2 className={styles.projectName}>
          <ColorfulTitle
            key={project.id}
            text={project.name}
            activeTab="code"
          />
        </h2>
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
        {renderPreview(project)}
      </div>
    </div>
  );

  // Desktop: all projects stacked vertically
  if (!isMobile) {
    return (
      <div className={styles.container}>
        <div className={styles.projectList}>
          {projects.map((project) => (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[project.id] = el)}
              className={styles.projectCard}
              onMouseEnter={() => {
                setHoveredCardId(project.id);
                window.dispatchEvent(new CustomEvent("code-project-hover"));
              }}
            >
              {renderProject(project)}
            </div>
          ))}
        </div>
        {(overlayData || overlayHidden) && (
          <LeftPanelOverlay
            videoSrc={(overlayData || persistedOverlay).videoSrc}
            embedSrc={(overlayData || persistedOverlay).embedSrc}
            embedTitle={(overlayData || persistedOverlay).title}
            hidden={overlayHidden}
          />
        )}
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
