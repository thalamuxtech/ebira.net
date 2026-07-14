"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient hero texture: a slow, low-opacity field of woven triangles,
 * echoing Ebira cloth-weaving and brasswork. Drawn on Canvas so it is
 * cheap; paused when off-screen, when the tab is hidden, and under
 * prefers-reduced-motion (a static frame is drawn instead).
 */
export function MotifCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let visible = true;
    let running = true;
    let t = 0;

    const CELL = 72;
    let cols = 0;
    let rows = 0;
    let seeds: number[] = [];

    function isDark() {
      return document.documentElement.classList.contains("dark");
    }

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      // deterministic pseudo-random per cell so resize doesn't shimmer
      seeds = Array.from({ length: cols * rows }, (_, i) => {
        const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
        return x - Math.floor(x);
      });
    }

    function draw(time: number) {
      if (!canvas || !ctx) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const dark = isDark();
      const palette = dark
        ? ["#e0694a", "#e3b341", "#93ab94", "#4a5578"]
        : ["#b8482e", "#d4a017", "#55684f", "#141b2e"];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const seed = seeds[r * cols + c] ?? 0.5;
          const phase = seed * Math.PI * 2;
          // very slow breathing, staggered per cell
          const breathe = 0.5 + 0.5 * Math.sin(time * 0.00018 + phase);
          // whisper-quiet: many cells stay invisible, the rest barely surface
          const alpha = seed > 0.55 ? 0 : (dark ? 0.02 : 0.025) + breathe * 0.03;
          if (alpha === 0) continue;
          const color = palette[Math.floor(seed * palette.length)];
          const x = c * CELL;
          const y = r * CELL;
          const up = (r + c) % 2 === 0;
          const inset = 10 + seed * 6;

          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          ctx.beginPath();
          if (up) {
            ctx.moveTo(x + inset, y + CELL - inset);
            ctx.lineTo(x + CELL / 2, y + inset);
            ctx.lineTo(x + CELL - inset, y + CELL - inset);
          } else {
            ctx.moveTo(x + inset, y + inset);
            ctx.lineTo(x + CELL - inset, y + inset);
            ctx.lineTo(x + CELL / 2, y + CELL - inset);
          }
          ctx.closePath();
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function loop(time: number) {
      if (!running || !visible) return;
      t = time;
      draw(time);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(raf);
      if (reduced.matches) {
        draw(0); // static frame
        return;
      }
      raf = requestAnimationFrame(loop);
    }

    resize();
    start();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running && visible) start();
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced.matches) draw(t);
    });
    ro.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      if (reduced.matches) draw(t);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onMotionChange = () => start();
    reduced.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      reduced.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
