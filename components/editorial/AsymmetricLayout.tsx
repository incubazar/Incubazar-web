'use client';

import { ReactNode } from 'react';

interface AsymmetricLayoutProps {
  left: ReactNode;
  right: ReactNode;
  ratio?: '1:2' | '1:3' | '2:1' | '3:1';
  className?: string;
}

export default function AsymmetricLayout({ left, right, ratio = '1:2', className = '' }: AsymmetricLayoutProps) {
  const ratioClasses = {
    '1:2': 'grid-cols-1 lg:grid-cols-[1fr_2fr]',
    '1:3': 'grid-cols-1 lg:grid-cols-[1fr_3fr]',
    '2:1': 'grid-cols-1 lg:grid-cols-[2fr_1fr]',
    '3:1': 'grid-cols-1 lg:grid-cols-[3fr_1fr]',
  };

  return (
    <div className={`asymmetric-layout grid ${ratioClasses[ratio]} gap-6 sm:gap-10 lg:gap-16 items-start ${className}`}>
      <div className="asymmetric-left">
        {left}
      </div>
      <div className="asymmetric-right">
        {right}
      </div>
    </div>
  );
}
