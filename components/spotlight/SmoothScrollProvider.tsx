'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  smoothTouch?: boolean;
}

/**
 * SmoothScrollProvider
 * 
 * Wraps your application with Lenis smooth scrolling and syncs with GSAP ScrollTrigger
 * 
 * @param enabled - Enable/disable smooth scrolling (default: true, respects prefers-reduced-motion)
 * @param duration - Scroll animation duration in seconds (default: 1.2)
 * @param easing - Easing function (default: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)))
 * @param smoothWheel - Enable smooth wheel scrolling (default: true)
 * @param smoothTouch - Enable smooth touch scrolling on mobile (default: false for better performance)
 */
export default function SmoothScrollProvider({
  children,
  enabled = true,
  duration = 1.2,
  easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel = true,
  smoothTouch = false,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!enabled || prefersReducedMotion) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration,
      easing,
      smoothWheel,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled, duration, easing, smoothWheel, smoothTouch]);

  return <>{children}</>;
}

/**
 * Hook to access Lenis instance programmatically
 * Useful for scrollTo, stop, start operations
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Access Lenis from window if available
    const checkLenis = setInterval(() => {
      if (window.lenis) {
        lenisRef.current = window.lenis;
        clearInterval(checkLenis);
      }
    }, 100);

    return () => clearInterval(checkLenis);
  }, []);

  return lenisRef.current;
}

// Extend window type for TypeScript
declare global {
  interface Window {
    lenis?: Lenis;
  }
}
