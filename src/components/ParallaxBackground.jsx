import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BACKGROUND_FRAMES } from '../lib/backgroundFrames';

/**
 * ParallaxBackground Component
 * 100% Scroll & Mouse-Wheel Driven Character Animation (NO video / NO auto-looping).
 *
 * Behavior:
 * - Rolling mouse wheel down advances the character's motion, turns head, waves scarf, and floats position.
 * - Rolling mouse wheel up rewinds the animation frame-by-frame and moves character back.
 * - Stopping mouse wheel freezes character immediately at the exact frame.
 * - Character physically travels and shifts with depth parallax (X drift, Y float, scale, velocity tilt).
 * - Mouse cursor still provides 3D gaze perspective without playing any animation.
 */
export const ParallaxBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Frame assets
  const imagesRef = useRef([]);
  const framesLoadedRef = useRef(0);
  const totalFrames = BACKGROUND_FRAMES.length; // 120 total frames
  const activeFrameLimit = 94; // frames 0 to 94 are active character frames (95-119 fade to black)

  const [loadProgress, setLoadProgress] = useState(0);
  const [activeFrameDisplay, setActiveFrameDisplay] = useState(0);

  // Physics & smoothing refs
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0, velocity: 0, lastY: 0 });
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafIdRef = useRef(null);

  // Preload all frames progressively
  useEffect(() => {
    let isCancelled = false;
    const images = [];

    // Preload first frame immediately
    const firstImg = new Image();
    firstImg.src = BACKGROUND_FRAMES[0];
    firstImg.onload = () => {
      if (!isCancelled) {
        images[0] = firstImg;
        framesLoadedRef.current = 1;
        setLoadProgress(1);
      }
    };

    let loadedCount = 0;
    BACKGROUND_FRAMES.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (isCancelled) return;
        images[idx] = img;
        loadedCount++;
        framesLoadedRef.current = loadedCount;
        if (loadedCount % 15 === 0 || loadedCount === totalFrames) {
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        }
      };
      img.onerror = () => {
        if (!isCancelled) loadedCount++;
      };
    });

    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, [totalFrames]);

  // Handle Mouse movement & Wheel events
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        mouseRef.current.targetX = (touch.clientX / innerWidth) * 2 - 1;
        mouseRef.current.targetY = (touch.clientY / innerHeight) * 2 - 1;
      }
    };

    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      scrollRef.current.targetY = y;
    };

    // Wheel listener for direct tactile response
    const handleWheel = (e) => {
      // Add slight velocity impulse on wheel turn for instantaneous responsiveness
      scrollRef.current.velocity += e.deltaY * 0.08;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Main Render Loop: 100% Scroll & Mouse Wheel Driven
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Smooth Lerp for Mouse
    const m = mouseRef.current;
    m.x += (m.targetX - m.x) * 0.08;
    m.y += (m.targetY - m.y) * 0.08;

    // Smooth Lerp for Scroll & Wheel Velocity
    const s = scrollRef.current;
    const scrollDelta = s.targetY - s.lastY;
    s.velocity = s.velocity * 0.85 + scrollDelta * 0.15;
    s.lastY = s.targetY;
    s.y += (s.targetY - s.y) * 0.1;

    // Calculate Scroll Progress across page (0 to 1)
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    const scrollProgress = Math.min(Math.max(s.y / maxScroll, 0), 1);

    // ── WHEEL & SCROLL FRAME SCRUBBING ──────────────────────────────────────────
    // NO video timer! Target frame is purely driven by scroll/wheel position.
    // We map 2 smooth ping-pong waves across the full page (0 -> 94 -> 0 -> 94)
    // so scrolling down smoothly animates forward and back, with zero abrupt cuts.
    const cycles = 2; // 2 complete motion cycles across entire site
    const cyclePos = (scrollProgress * cycles * 2) % 2;
    const wave = cyclePos > 1 ? 2 - cyclePos : cyclePos; // Continuous 0 -> 1 -> 0 -> 1
    targetFrameRef.current = wave * activeFrameLimit;

    // Spring/lerp to target frame for silky Apple-style inertia
    currentFrameRef.current +=
      (targetFrameRef.current - currentFrameRef.current) * 0.14;

    const frameIdx = Math.round(
      Math.max(0, Math.min(activeFrameLimit, currentFrameRef.current))
    );

    // ── PHYSICAL CHARACTER PARALLAX & SPATIAL MOVEMENT ──────────────────────────
    // Not just frame changes: The character physically moves through space on scroll!
    if (containerRef.current) {
      // 1. Perspective tilt from mouse gaze
      const rotY = m.x * 5;
      // 2. Leans into scroll wheel motion (momentum tilt)
      const velocityTilt = Math.max(-12, Math.min(12, s.velocity * 0.18));
      const rotX = -m.y * 5 + velocityTilt;

      // 3. Physical translation across screen as user scrolls
      // - Parallax vertical float (drifts upwards at 22% scroll speed)
      const transY = m.y * 12 - s.y * 0.22;
      // - Horizontal gentle sway tracking section progression
      const transX = m.x * 16 + Math.sin(scrollProgress * Math.PI * 2) * 35;
      // - Dynamic scale depth
      const scale = 1 + Math.sin(scrollProgress * Math.PI) * 0.05;

      containerRef.current.style.transform = `perspective(1100px) rotateX(${rotX.toFixed(
        2
      )}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(
        1
      )}px, ${transY.toFixed(1)}px, 0px) scale(${scale.toFixed(3)})`;
    }

    // ── CANVAS DRAWING ──────────────────────────────────────────────────────────
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const img = imagesRef.current[frameIdx] || imagesRef.current[0];
    if (img && img.complete && img.naturalWidth > 0) {
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgRatio = imgW / imgH;
      const canvasRatio = width / height;

      let drawW, drawH, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawW = width;
        drawH = width / imgRatio;
        drawX = 0;
        drawY = (height - drawH) / 2;
      } else {
        drawH = height;
        drawW = height * imgRatio;
        drawX = (width - drawW) / 2;
        drawY = 0;
      }

      // Perfectly centered positioning for symmetrical harmony with centered Hero layout
      // Slightly anchor vertically so character's face and scarf balance with headline
      const verticalOffset = height * 0.04;
      drawY += verticalOffset;

      // 1.08x immersion zoom
      const zoom = 1.08;
      const scaledW = drawW * zoom;
      const scaledH = drawH * zoom;
      const scaledX = drawX - (scaledW - drawW) / 2;
      const scaledY = drawY - (scaledH - drawH) / 2;

      ctx.drawImage(img, scaledX, scaledY, scaledW, scaledH);
    }

    ctx.restore();

    // Update frame counter for UI indicator
    if (Math.abs(currentFrameRef.current - targetFrameRef.current) > 0.1) {
      setActiveFrameDisplay(frameIdx);
    }

    rafIdRef.current = requestAnimationFrame(renderFrame);
  }, [activeFrameLimit]);

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(renderFrame);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderFrame]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Parallax Container with 3D perspective and physical scroll translation */}
      <div
        ref={containerRef}
        className="relative w-full h-full will-change-transform transition-transform ease-out duration-75"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Layer 1: Ambient Purple Aura behind character */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] opacity-45 mix-blend-screen pointer-events-none"
          style={{
            background:
              'radial-gradient(circle 700px at 62% 42%, rgba(168, 85, 247, 0.25), transparent 70%), radial-gradient(circle 500px at 28% 68%, rgba(126, 34, 206, 0.18), transparent 70%)',
          }}
        />

        {/* Layer 2: Subtle Cyber Grid */}
        <div
          className="absolute inset-0 architectural-grid opacity-25 pointer-events-none"
          style={{
            maskImage:
              'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.85) 0%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.85) 0%, transparent 80%)',
          }}
        />

        {/* Layer 3: High Performance Scroll-Driven Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block opacity-90"
          style={{
            filter: 'contrast(1.08) brightness(0.98)',
          }}
        />

        {/* Layer 4: Cinematic Vignette blending into #09090b */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 52% 45%, transparent 35%, rgba(9, 9, 11, 0.45) 60%, rgba(9, 9, 11, 0.95) 90%), linear-gradient(to bottom, rgba(9, 9, 11, 0.3) 0%, transparent 20%, transparent 70%, #09090b 100%)',
          }}
        />
      </div>

      {/* Discreet Live Indicator: shows scroll wheel control & current frame */}
      <aside
        aria-label="Scroll animation status"
        className="pointer-events-none absolute bottom-6 right-6 hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md text-[11px] font-mono text-zinc-400 shadow-xl z-20"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>

        <span className="text-zinc-300 font-heading tracking-wide">
          SCROLL TO ANIMATE
        </span>

        <span className="text-zinc-600">•</span>

        <span className="text-purple-300 font-mono">
          FRAME {String(activeFrameDisplay).padStart(2, '0')}/{activeFrameLimit}
        </span>

        {loadProgress < 100 && (
          <span className="text-zinc-500 text-[10px]">
            ({loadProgress}%)
          </span>
        )}
      </aside>
    </div>
  );
};
