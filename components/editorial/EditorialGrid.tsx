'use client';

import { ReactNode } from 'react';

interface EditorialGridProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
}

export default function EditorialGrid({ children, className = '', columns = 12 }: EditorialGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  };

  return (
    <div className={`editorial-grid ${columnClasses[columns]} ${className}`}>
      {children}
    </div>
  );
}
