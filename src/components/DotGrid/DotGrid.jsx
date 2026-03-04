import { useRef, useEffect, useCallback } from "react";
import styles from "./DotGrid.module.css";

const DOT_SPACING = 30;
const DOT_RADIUS = 1;
const MOUSE_RADIUS = 100;
const REPULSE_STRENGTH = 20;
const RETURN_SPEED = 0.08;

function DotGrid({ sectionColor = "0, 0, 0" }) {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(null);
  const parentScrollRef = useRef(0);

  const initDots = useCallback((width, height) => {
    const dots = [];
    const cols = Math.ceil(width / DOT_SPACING) + 1;
    const rows = Math.ceil(height / DOT_SPACING) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          originX: col * DOT_SPACING,
          originY: row * DOT_SPACING,
          x: col * DOT_SPACING,
          y: row * DOT_SPACING,
        });
      }
    }
    dotsRef.current = dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.scrollHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.scrollHeight}px`;
      ctx.scale(dpr, dpr);
      initDots(parent.clientWidth, parent.scrollHeight);
    };

    resize();

    const handleMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top + parent.scrollTop,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleScroll = () => {
      parentScrollRef.current = parent.scrollTop;
    };

    const animate = () => {
      const w = parent.clientWidth;
      const h = parent.scrollHeight;
      ctx.clearRect(0, 0, w, h);

      const [r, g, b] = sectionColor.split(",").map(Number);
      const mouse = mouseRef.current;

      for (const dot of dotsRef.current) {
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * REPULSE_STRENGTH;
          const angle = Math.atan2(dy, dx);
          dot.x += Math.cos(angle) * force * 0.3;
          dot.y += Math.sin(angle) * force * 0.3;
        }

        dot.x += (dot.originX - dot.x) * RETURN_SPEED;
        dot.y += (dot.originY - dot.y) * RETURN_SPEED;

        const distFromOrigin = Math.sqrt(
          (dot.x - dot.originX) ** 2 + (dot.y - dot.originY) ** 2
        );
        const opacity = 0.08 + Math.min(distFromOrigin / 15, 0.3);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);
    parent.addEventListener("scroll", handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      parent.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [sectionColor, initDots]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}

export default DotGrid;
