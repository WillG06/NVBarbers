import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.4 });
  const rx = useSpring(x, { stiffness: 80, damping: 18, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 80, damping: 18, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setHover(!!t.closest("a, button, [data-cursor='hover'], input, textarea, label, select, details"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* outer ring — soft brass, always visible via difference blend */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
          borderRadius: 9999,
          border: "1px solid #ffffff",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 10000,
        }}
        animate={{ scale: hover ? 2.2 : 1, opacity: hover ? 0.6 : 0.9 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      {/* inner dot — bright, also via difference blend so it never disappears */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          borderRadius: 9999,
          background: "#ffffff",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 10001,
        }}
        animate={{ scale: hover ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
      />
    </>
  );
}
