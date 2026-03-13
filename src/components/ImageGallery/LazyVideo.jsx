import { useState, useRef, useEffect } from "react";

function LazyVideo({ src, className, style, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
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
    <video
      ref={ref}
      src={isVisible ? src : undefined}
      className={className}
      style={style}
      muted
      playsInline
      loop
      autoPlay
      {...props}
    />
  );
}

export default LazyVideo;
