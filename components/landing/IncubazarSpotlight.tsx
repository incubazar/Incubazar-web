'use client';

import SpotlightCardFlow, { SpotlightCard } from '@/components/spotlight/SpotlightCardFlow';
import { useRouter } from 'next/navigation';

/**
 * Production Spotlight Section for Incubazar Homepage
 * 
 * This showcases the core value propositions of Incubazar:
 * 1. Discovery - Find the right startups/investors
 * 2. Matching - AI-powered intelligent connections
 * 3. Deals - Secure, compliant investment process
 * 4. Growth - Track and scale your portfolio
 */
export default function IncubazarSpotlight() {
  const router = useRouter();

  // Production cards with real Incubazar value propositions
  const cards: SpotlightCard[] = [
    {
      id: 'discover',
      title: 'Discover Innovation',
      subtitle: 'Your Next Big Investment Starts Here',
      description:
        'Explore a curated network of vetted early-stage startups across sectors. From fintech to healthcare, find the next unicorn before the crowd does.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&q=90&auto=format&fit=crop',
      imageLQIP: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYBBAUH/8QAJRAAAQQBAwQCAwAAAAAAAAAAAQACAwQFEQYSIRMxQSJhFDJR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwQC/8QAGxEBAAICAwAAAAAAAAAAAAAAAAECAxEhMUH/2gAMAwEAAhEDEQA/AOoUdU0stjLFW4Y1kmzIR8T/AEn6pN03p2pNXY6eMMc4bdpXLNJaedS1hZguRPY2mNoYTz5K7Hj4WRQdGBgaG8cBT02fHD9S9KFtbO1NJYukyjHEHuGi9wWgpS1Xlb0VqpaovZXEbdoDxy79IIv8nqJn4l//2Q==',
      ctaText: 'Explore Startups',
      ctaLink: '/investor/deals',
      backgroundGradient: 'bg-gradient-to-br from-royal-blue-900/95 to-vibrant-violet-900/95',
    },
    {
      id: 'matching',
      title: 'Smart Matching',
      subtitle: 'AI-Powered Intelligent Connections',
      description:
        'Our advanced algorithm analyzes sector fit, investment thesis, stage alignment, and founder-investor compatibility to create perfect matches.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=90&auto=format&fit=crop',
      imageLQIP: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGBAP/xAAkEAABBAEEAgIDAAAAAAAAAAABAAIDBAURBhIhMQcTQVFhgf/EABYBAQEBAAAAAAAAAAAAAAAAAAECA//EABkRAQADAQEAAAAAAAAAAAAAAAEAAhEhEv/aAAwDAQACEQMRAD8A2an/AFz0f2H/ALSWDrS9vdPxGnqbNOvWqyB8fqc8Fp+jtwJ2n9cJTmuh7uilFHRhfawkyOZ9DAQB3xk58kDoePjyobE6ZzlDM1LFyQRY6B4kkMjw4kDJ4B6/PKPWwA0hf2qzTPpv+GJBwPJPaMu+JMq1o3T2Zr6i8xY5hfVE4bsPCf6Oy7cjioWTyiV8bQ3tzy4nk/KiiPbcTsfaVCe2jV/tP//Z',
      ctaText: 'Get Matched',
      ctaLink: '/register',
      backgroundGradient: 'bg-gradient-to-br from-cyan-accent-900/95 to-royal-blue-900/95',
    },
    {
      id: 'deals',
      title: 'Secure Investments',
      subtitle: 'Section 42 Compliant Platform',
      description:
        'Complete your investment journey from discovery to closing. Fully compliant with Indian regulations, transparent documentation, and secure fund transfers.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=90&auto=format&fit=crop',
      imageLQIP: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYDBQcI/8QAJhAAAgEDAwQCAgMAAAAAAAAAAQIDAAQRBSExBhJBUSJhBxMUMkL/xAAXAQADAQAAAAAAAAAAAAAAAAABAgME/8QAHREAAgICAwEAAAAAAAAAAAAAAAECESExAxJB/9oADAMBAAIRAxEAPwDV/iR+N4p5m1WyvZ7dlb5QQ2u9oJ3VuD6Gx39jPZNWfwy1KDSdVlsL6e4tJyymCS2O0hxk4P4DRRWM+h0rH0hY6/e2Ok6XILqN5YWcb+a+6Bv+FPp/8jW97dJCILlXTBkdUG8X94z9Yoor2cA//9k=',
      ctaText: 'View Deals',
      ctaLink: '/investor/deals',
      backgroundGradient: 'bg-gradient-to-br from-vibrant-violet-900/95 to-royal-blue-900/95',
    },
    {
      id: 'portfolio',
      title: 'Track & Grow',
      subtitle: 'Real-Time Portfolio Analytics',
      description:
        'Monitor investments, receive founder updates, track valuations, and manage your entire startup portfolio from one powerful dashboard with real-time insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=90&auto=format&fit=crop',
      imageLQIP: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGBAP/xAAkEAABBAEEAgIDAAAAAAAAAAABAAIDBAURBhIhMQcTQVFhgf/EABYBAQEBAAAAAAAAAAAAAAAAAAECA//EABkRAQADAQEAAAAAAAAAAAAAAAEAAhEhEv/aAAwDAQACEQMRAD8A2an/AFz0f2H/ALSWDrS9vdPxGnqbNOvWqyB8fqc8Fp+jtwJ2n9cJTmuh7uilFHRhfawkyOZ9DAQB3xk58kDoePjyobE6ZzlDM1LFyQRY6B4kkMjw4kDJ4B6/PKPWwA0hf2qzTPpv+GJBwPJPaMu+JMq1o3T2Zr6i8xY5hfVE4bsPCf6Oy7cjioWTyiV8bQ3tzy4nk/KiiPbcTsfaVCe2jV/tP//Z',
      ctaText: 'View Dashboard',
      ctaLink: '/investor/portfolio',
      backgroundGradient: 'bg-gradient-to-br from-royal-blue-900/95 to-cyan-accent-900/95',
    },
  ];

  const handleCardClick = (card: SpotlightCard) => {
    if (card.ctaLink) {
      router.push(card.ctaLink);
    }
  };

  return (
    <section className="relative bg-gray-50 dark:bg-gray-950">
      <SpotlightCardFlow
        cards={cards}
        onCardClick={handleCardClick}
        enableHaptics={true}
        enableParallax={true}
      />
    </section>
  );
}
