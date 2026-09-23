import { useEffect, useRef } from "react";

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  shape: "rect" | "circle" | "ribbon";
};

const COLORS = ["#f6a8c0", "#f7c9d7", "#fde9ef", "#fff7ef", "#e9b7cd", "#ffd9c0"];
const CONFETTI_EVENT = "falak:confetti";

export function fireConfetti(strength = 1) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONFETTI_EVENT, { detail: { strength } }));
}

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let pieces: Piece[] = [];
    let frame = 0;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (strength: number) => {
      const count = Math.round(70 * strength);
      const w = window.innerWidth;
      for (let i = 0; i < count; i += 1) {
        pieces.push({
          x: Math.random() * w,
          y: -20 - Math.random() * window.innerHeight * 0.4,
          vx: (Math.random() - 0.5) * 1.6,
          vy: 1.4 + Math.random() * 2.2,
          size: 5 + Math.random() * 7,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.14,
          color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#f6a8c0",
          shape: Math.random() < 0.34 ? "circle" : Math.random() < 0.6 ? "ribbon" : "rect",
        });
      }
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const h = window.innerHeight;
      pieces = pieces.filter((p) => p.y < h + 40);
      pieces.forEach((p) => {
        p.x += p.vx + Math.sin((p.y + p.rot * 40) / 45) * 0.6;
        p.y += p.vy;
        p.vy += 0.008;
        p.rot += p.vr;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "ribbon") {
          ctx.fillRect(-p.size / 2, -p.size / 6, p.size, p.size / 3);
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        }
        ctx.restore();
      });

      if (pieces.length > 0) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const onFire = (event: Event) => {
      const strength = (event as CustomEvent<{ strength?: number }>).detail?.strength ?? 1;
      spawn(strength);
    };
    window.addEventListener(CONFETTI_EVENT, onFire);

    const opening = window.setTimeout(() => spawn(1.6), 350);

    return () => {
      window.clearTimeout(opening);
      window.removeEventListener("resize", resize);
      window.removeEventListener(CONFETTI_EVENT, onFire);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50" />;
}
