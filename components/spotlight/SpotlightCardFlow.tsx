'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SpotlightCardFlow.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SpotlightCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageLQIP?: string; // Low Quality Image Placeholder
  ctaText?: string;
  ctaLink?: string;
  backgroundGradient?: string;
}

interface SpotlightCardFlowProps {
  cards: SpotlightCard[];
  onCardClick?: (card: SpotlightCard) => void;
  enableHaptics?: boolean;
  enableParallax?: boolean;
  className?: string;
}

const SpotlightCardFlow: React.FC<SpotlightCardFlowProps> = ({
  cards,
  onCardClick,
  enableHaptics = true,
  enableParallax = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState<{ [key: string]: boolean }>({});
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  // Detect mobile devices for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track user interaction for haptic feedback
  useEffect(() => {
    const handleInteraction = () => {
      setUserHasInteracted(true);
    };

    // Listen for any user interaction
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('mousedown', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Haptic feedback helper
  const triggerHaptic = (pattern: number[] = [8]) => {
    if (enableHaptics && userHasInteracted && 'vibrate' in navigator && !prefersReducedMotion) {
      navigator.vibrate(pattern);
    }
  };

  // GSAP ScrollTrigger Setup - Optimized
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Master timeline for all cards with optimized settings
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5, // Reduced from 0.7 for snappier response
          snap: {
            snapTo: 1 / cards.length,
            duration: { min: 0.15, max: 0.3 }, // Faster snapping
            delay: 0,
            ease: 'power2.inOut', // Smoother easing
          },
          onUpdate: (self) => {
            const newIndex = Math.round(self.progress * (cards.length - 1));
            if (newIndex !== activeCardIndex) {
              setActiveCardIndex(newIndex);
              triggerHaptic([8]);
            }
          },
        },
      });

      // Animate each card with GPU acceleration
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isLast = index === cards.length - 1;
        
        // Force GPU acceleration
        gsap.set(card, { force3D: true, willChange: 'transform, opacity' });
        
        // Entry animation - optimized
        masterTimeline.fromTo(
          card,
          {
            y: 30, // Reduced movement
            opacity: 0,
            scale: 0.99, // Less scaling for better performance
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8, // Faster animation
            ease: 'power2.out',
          },
          index
        );

        // Spotlight hold state - internal content stagger
        const contentElements = card.querySelectorAll('[data-stagger]');
        gsap.set(contentElements, { force3D: true });
        
        masterTimeline.fromTo(
          contentElements,
          {
            y: 8, // Reduced movement
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.3, // Faster
            stagger: 0.08, // Tighter stagger
            ease: 'power2.out',
          },
          index + 0.2
        );

        // Exit animation (except for last card)
        if (!isLast) {
          masterTimeline.to(
            card,
            {
              y: -30, // Reduced movement
              opacity: 0.6, // Less fade for smoother transition
              scale: 0.99,
              duration: 0.6, // Faster
              ease: 'power2.in',
            },
            index + 1.3
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      // Cleanup willChange
      cardsRef.current.forEach(card => {
        if (card) {
          card.style.willChange = 'auto';
        }
      });
    };
  }, [cards.length, activeCardIndex, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && activeCardIndex < cards.length - 1) {
        e.preventDefault();
        window.scrollTo({
          top: window.scrollY + window.innerHeight * 0.5,
          behavior: 'smooth',
        });
      } else if (e.key === 'ArrowUp' && activeCardIndex > 0) {
        e.preventDefault();
        window.scrollTo({
          top: window.scrollY - window.innerHeight * 0.5,
          behavior: 'smooth',
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIndex, cards.length]);

  // Handle image load
  const handleImageLoad = (cardId: string) => {
    setIsImageLoaded(prev => ({ ...prev, [cardId]: true }));
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      role="region"
      aria-label="Spotlight card carousel"
      aria-live="polite"
      style={{ height: `${cards.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center py-20">
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {cards.map((card, index) => (
            <SpotlightCardItem
              key={card.id}
              card={card}
              index={index}
              isActive={index === activeCardIndex}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              onClick={() => onCardClick?.(card)}
              onImageLoad={() => handleImageLoad(card.id)}
              isImageLoaded={isImageLoaded[card.id]}
              enableParallax={enableParallax && !prefersReducedMotion && !isMobile}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[60] flex gap-2 bg-black/30 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeCardIndex
                ? 'w-8 bg-gradient-to-r from-royal-blue-600 to-vibrant-violet-600'
                : 'w-4 bg-gray-400 dark:bg-gray-500'
            }`}
            aria-label={`Card ${index + 1} of ${cards.length}${
              index === activeCardIndex ? ' (active)' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Individual Card Component with Parallax
interface SpotlightCardItemProps {
  card: SpotlightCard;
  index: number;
  isActive: boolean;
  onClick?: () => void;
  onImageLoad?: () => void;
  isImageLoaded?: boolean;
  enableParallax?: boolean;
  prefersReducedMotion?: boolean;
}

const SpotlightCardItem = React.forwardRef<HTMLDivElement, SpotlightCardItemProps>(
  (
    {
      card,
      index,
      isActive,
      onClick,
      onImageLoad,
      isImageLoaded,
      enableParallax,
      prefersReducedMotion,
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Optimized smooth spring animation for parallax
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
      stiffness: 150, // Increased for snappier response
      damping: 20,    // Increased damping for stability
      mass: 0.5,      // Reduced mass for faster movement
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
      stiffness: 150,
      damping: 20,
      mass: 0.5,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableParallax || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseXPos = e.clientX - rect.left;
      const mouseYPos = e.clientY - rect.top;
      const xPct = (mouseXPos / width - 0.5) * 2;
      const yPct = (mouseYPos / height - 0.5) * 2;

      // Reduced intensity for smoother performance
      mouseX.set(xPct * 0.3);
      mouseY.set(yPct * 0.3);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          // @ts-ignore
          cardRef.current = node;
        }}
        className={`absolute inset-0 flex items-center justify-center ${
          index === 0 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: index }}
      >
        <motion.div
          className={`group relative w-full h-[500px] sm:h-[550px] md:h-[600px] max-w-5xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer
            ${prefersReducedMotion ? '' : styles.spotlightCard}
            ${
              card.backgroundGradient ||
              'bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'
            }
            shadow-premium-xl border border-white/20 dark:border-gray-700/50`}
          style={
            enableParallax && !prefersReducedMotion
              ? {
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }
              : {}
          }
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          whileHover={
            !prefersReducedMotion
              ? {
                  scale: 1.015, // Reduced from 1.02
                  transition: { duration: 0.25, ease: 'easeOut' }, // Faster
                }
              : {}
          }
          transition={{ duration: 0.25, ease: 'easeOut' }} // Faster base transition
        >
          {/* Background Image with Parallax */}
          <div className="absolute inset-0 overflow-hidden">
            {/* LQIP Placeholder */}
            {card.imageLQIP && !isImageLoaded && (
              <div
                className="absolute inset-0 bg-cover bg-center blur-xl scale-110 will-change-auto"
                style={{ backgroundImage: `url(${card.imageLQIP})` }}
              />
            )}
            
            {/* Main Image */}
            <motion.img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover"
              style={
                enableParallax && !prefersReducedMotion
                  ? { 
                      transform: 'translateZ(-10px) scale(1.05)', // Reduced parallax depth
                      willChange: 'transform',
                    }
                  : {}
              }
              loading={index === 0 ? 'eager' : 'lazy'}
              onLoad={onImageLoad}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 md:p-12 text-white z-10">
            {/* Title */}
            <h3
              data-stagger
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-3 md:mb-4 tracking-tight"
              style={
                enableParallax && !prefersReducedMotion
                  ? { transform: 'translateZ(20px)' } // Reduced from 40px
                  : {}
              }
            >
              {card.title}
            </h3>

            {/* Subtitle */}
            <p
              data-stagger
              className="text-lg sm:text-xl md:text-2xl font-medium mb-4 md:mb-6 text-cyan-accent-300"
              style={
                enableParallax && !prefersReducedMotion
                  ? { transform: 'translateZ(15px)' } // Reduced from 30px
                  : {}
              }
            >
              {card.subtitle}
            </p>

            {/* Description */}
            <p
              data-stagger
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl leading-relaxed"
              style={
                enableParallax && !prefersReducedMotion
                  ? { transform: 'translateZ(10px)' } // Reduced from 20px
                  : {}
              }
            >
              {card.description}
            </p>

            {/* CTA Button */}
            {card.ctaText && (
              <motion.button
                data-stagger
                className={`${styles.shimmerButton} w-fit px-6 sm:px-8 py-3 sm:py-4 rounded-lg md:rounded-xl font-semibold text-base md:text-lg
                  bg-gradient-to-r from-royal-blue-600 to-vibrant-violet-600
                  hover:from-royal-blue-500 hover:to-vibrant-violet-500
                  shadow-glow-purple transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-vibrant-violet-400 focus:ring-offset-2`}
                style={
                  enableParallax && !prefersReducedMotion
                    ? { transform: 'translateZ(25px)' } // Reduced from 50px
                    : {}
                }
                whileHover={{ scale: 1.03 }} // Reduced from 1.05
                whileTap={{ scale: 0.98 }}
              >
                {card.ctaText}
              </motion.button>
            )}
          </div>

          {/* Hover Glow Effect */}
          <div
            className={`${styles.cardGlow} pointer-events-none absolute inset-0 opacity-0 
              group-hover:opacity-100 transition-opacity duration-500`}
          />
        </motion.div>
      </div>
    );
  }
);

SpotlightCardItem.displayName = 'SpotlightCardItem';

export default SpotlightCardFlow;
