'use client';

import { useEffect, useState } from 'react';

interface PageIndicatorProps {
  sections: number;
}

export default function PageIndicator({ sections }: PageIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionHeight = (document.documentElement.scrollHeight - windowHeight) / sections;
      
      const current = Math.floor(scrollPosition / sectionHeight);
      setActiveSection(Math.min(current, sections - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="page-indicator hidden md:flex">
      {Array.from({ length: sections }).map((_, index) => (
        <div
          key={index}
          className={`page-indicator-dot ${activeSection === index ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}
