'use client';

import { ReactNode } from 'react';

interface RevealTextProps {
  children: ReactNode;
  className?: string;
}

export default function RevealText({ children, className = '' }: RevealTextProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
