import { useState, useRef, useEffect } from "react";
import styles from "./Skeleton.module.css";

function LazyVideo({ src, className, style, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`${styles.wrapper} ${!isLoaded ? styles.skeleton : ""}`}>
      <video
        src={isVisible ? src : undefined}
        className={className}
        style={style}
        muted
        playsInline
        loop
        autoPlay
        onLoadedData={() => setIsLoaded(true)}
        {...props}
      />
    </span>
  );
}

export default LazyVideo;
