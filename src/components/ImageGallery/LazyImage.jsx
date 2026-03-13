import { useState, useRef, useEffect } from "react";
import styles from "./Skeleton.module.css";

function LazyImage({ src, alt, className, style, ...props }) {
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
      <img
        src={isVisible ? src : undefined}
        alt={alt}
        className={className}
        style={style}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </span>
  );
}

export default LazyImage;
