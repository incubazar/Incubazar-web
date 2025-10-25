'use client';

import { ReactNode } from 'react';

interface PageSpreadProps {
  children: ReactNode;
  className?: string;
}

export default function PageSpread({ children, className = '' }: PageSpreadProps) {
  return (
    <div className={`page-spread ${className}`}>
      {children}
    </div>
  );
}
