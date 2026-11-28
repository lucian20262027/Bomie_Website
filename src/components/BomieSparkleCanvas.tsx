'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
  driftRadius: number;
}

const PALETTE = [
  '254, 240, 138', // warm gold (#fef08a)
  '251, 191, 36',  // amber gold (#fbbf24)
  '232, 121, 249', // fuchsia (#e879f9)
  '167, 139, 250', // violet (#a78bfa)
  '248, 250, 252', // starlight white
];

/**
 * Lightweight 60fps HTML5 Canvas particle constellation shaped like Bomie's 4-point ✦ spark.
 */
export default function BomieSparkleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let rafId = 0;
    const pointer = { x: 0, y: 0, active: false };

    const buildParticles = () => {
      const count = width < 640 ? 520 : 1050;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxSpan = Math.min(width, height) * 0.48;
      const next: Particle[] = [];

      for (let i = 0; i < count; i++) {
        // Concentrate particles along a 4-point ✦ star-flare + ambient orbital field
        const mode = Math.random();
        let px = cx;
        let py = cy;

        if (mode < 0.72) {
          // 4-point star flare / hourglass light cone geometry
          const t = (Math.random() - 0.5) * 2; // -1 .. 1
          const axis = Math.random() < 0.58 ? 'vertical' : 'horizontal';
          const dist = Math.pow(Math.abs(t), 0.85) * maxSpan * (axis === 'vertical' ? 1.15 : 0.95);
          const sign = t >= 0 ? 1 : -1;
          const spread = (0.04 + Math.pow(Math.abs(t), 1.55) * 0.52) * maxSpan;
          const offset = (Math.random() - 0.5) * spread;

          if (axis === 'vertical') {
            px = cx + offset;
            py = cy + sign * dist;
          } else {
            px = cx + sign * dist;
            py = cy + offset * 0.65;
          }
        } else {
          // Ambient cosmic halo around center
          const angle = Math.random() * Math.PI * 2;
          const r = Math.pow(Math.random(), 0.7) * maxSpan * 1.35;
          px = cx + Math.cos(angle) * r * 1.25;
          py = cy + Math.sin(angle) * r * 0.9;
        }

        const distFromCenter = Math.hypot(px - cx, py - cy) / (maxSpan || 1);
        const colorIdx =
          distFromCenter < 0.25
            ? Math.random() < 0.65
              ? 0
              : 4
            : Math.floor(Math.random() * PALETTE.length);

        next.push({
          baseX: px,
          baseY: py,
          x: px,
          y: py,
          size: distFromCenter < 0.22 ? 1.1 + Math.random() * 1.7 : 0.75 + Math.random() * 1.4,
          alpha: Math.max(0.18, 0.95 - distFromCenter * 0.58) * (0.55 + Math.random() * 0.45),
          twinkleSpeed: 0.8 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          color: PALETTE[colorIdx],
          driftRadius: 2 + Math.random() * 6,
        });
      }

      particles = next;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const drawFrame = (timeMs: number) => {
      const t = timeMs * 0.001;
      ctx.clearRect(0, 0, width, height);

      // Soft central radial aura behind the ✦ constellation
      const cx = width * 0.5;
      const cy = height * 0.5;
      const auraRadius = Math.min(width, height) * 0.46;
      const aura = ctx.createRadialGradient(cx, cy, 4, cx, cy, auraRadius);
      aura.addColorStop(0, 'rgba(254, 240, 138, 0.20)');
      aura.addColorStop(0.28, 'rgba(217, 70, 239, 0.14)');
      aura.addColorStop(0.65, 'rgba(91, 33, 182, 0.08)');
      aura.addColorStop(1, 'rgba(11, 7, 23, 0)');
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        const driftX = prefersReducedMotion ? 0 : Math.cos(t * 0.45 + pt.phase) * pt.driftRadius;
        const driftY = prefersReducedMotion ? 0 : Math.sin(t * 0.38 + pt.phase * 1.3) * pt.driftRadius;

        let targetX = pt.baseX + driftX;
        let targetY = pt.baseY + driftY;

        if (pointer.active && !prefersReducedMotion) {
          const dx = pointer.x - targetX;
          const dy = pointer.y - targetY;
          const dist = Math.hypot(dx, dy);
          if (dist < 140 && dist > 1) {
            const pull = (1 - dist / 140) * 14;
            targetX += (dx / dist) * pull;
            targetY += (dy / dist) * pull;
          }
        }

        pt.x += (targetX - pt.x) * 0.08;
        pt.y += (targetY - pt.y) * 0.08;

        const twinkle = prefersReducedMotion
          ? 1
          : 0.65 + 0.35 * Math.sin(t * pt.twinkleSpeed + pt.phase);
        const a = pt.alpha * twinkle;

        ctx.fillStyle = `rgba(${pt.color}, ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(drawFrame);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    rafId = window.requestAnimationFrame(drawFrame);

    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-auto"
    />
  );
}
