'use client';

interface PullQuoteProps {
  text: string;
  author?: string;
  className?: string;
}

export default function PullQuote({ text, author, className = '' }: PullQuoteProps) {
  return (
    <blockquote className={`pull-quote ${className}`}>
      <p className="mb-4">{text}</p>
      {author && (
        <footer className="text-sm font-sans font-normal tracking-wide uppercase text-foreground/60">
          — {author}
        </footer>
      )}
    </blockquote>
  );
}
