'use client';

interface EditorialDividerProps {
  thick?: boolean;
  className?: string;
  animate?: boolean;
}

export default function EditorialDivider({ thick = false, className = '', animate = true }: EditorialDividerProps) {
  return (
    <div className={`${thick ? 'editorial-divider-thick' : 'editorial-divider'} ${className} ${animate ? 'animate-draw-line' : ''}`} />
  );
}
