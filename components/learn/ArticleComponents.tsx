'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Quote } from 'lucide-react';

interface ArticleSpreadProps {
  children: ReactNode;
  className?: string;
}

export function ArticleSpread({ children, className }: ArticleSpreadProps) {
  return (
    <article className={cn("py-16 px-4 sm:px-8 lg:px-12", className)}>
      {children}
    </article>
  );
}

interface ArticleHeaderProps {
  category: string;
  title: string;
  subtitle?: string;
  readTime?: number;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export function ArticleHeader({ category, title, subtitle, readTime, level }: ArticleHeaderProps) {
  return (
    <header className="mb-16 pb-8 border-b-2 border-ink">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs uppercase tracking-widest text-graphite-600 font-semibold">
          {category}
        </span>
        {level && (
          <>
            <span className="text-graphite-300">•</span>
            <span className={cn(
              "text-xs uppercase tracking-widest font-semibold",
              level === 'beginner' && "text-graphite-600",
              level === 'intermediate' && "text-graphite-700",
              level === 'advanced' && "text-ink"
            )}>
              {level}
            </span>
          </>
        )}
        {readTime && (
          <>
            <span className="text-graphite-300">•</span>
            <span className="text-xs text-graphite-600">
              {readTime} min read
            </span>
          </>
        )}
      </div>
      
      <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-ink tracking-tight leading-none mb-6">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-xl sm:text-2xl text-graphite-700 leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </header>
  );
}

interface ArticleSectionProps {
  heading?: string;
  children: ReactNode;
  level?: 2 | 3;
}

export function ArticleSection({ heading, children, level = 2 }: ArticleSectionProps) {
  return (
    <section className="mb-12">
      {heading && level === 2 && (
        <h2 className="font-serif font-bold text-ink mb-6 text-3xl sm:text-4xl">
          {heading}
        </h2>
      )}
      {heading && level === 3 && (
        <h3 className="font-serif font-bold text-ink mb-6 text-2xl sm:text-3xl">
          {heading}
        </h3>
      )}
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </section>
  );
}

interface ArticleTextProps {
  children: ReactNode;
  className?: string;
}

export function ArticleText({ children, className }: ArticleTextProps) {
  return (
    <p className={cn(
      "text-lg text-graphite-800 leading-relaxed mb-6",
      className
    )}>
      {children}
    </p>
  );
}

interface PullQuoteProps {
  quote: string;
  citation?: string;
  author?: string;
}

export function PullQuote({ quote, citation, author }: PullQuoteProps) {
  return (
    <aside className="my-12 py-8 border-l-4 border-ink pl-8">
      <Quote className="h-8 w-8 text-graphite-300 mb-4" />
      <blockquote className="font-serif text-2xl sm:text-3xl text-ink leading-tight mb-4">
        &quot;{quote}&quot;
      </blockquote>
      {(author || citation) && (
        <p className="text-sm text-graphite-600">
          {author && <span className="font-semibold">{author}</span>}
          {author && citation && <span className="mx-2">•</span>}
          {citation && <span>{citation}</span>}
        </p>
      )}
    </aside>
  );
}

interface CalloutBoxProps {
  type?: 'info' | 'warning' | 'tip';
  title?: string;
  children: ReactNode;
}

export function CalloutBox({ type = 'info', title, children }: CalloutBoxProps) {
  return (
    <div className={cn(
      "my-8 p-6 border-2",
      type === 'info' && "border-graphite-300 bg-graphite-50",
      type === 'warning' && "border-graphite-700 bg-graphite-100",
      type === 'tip' && "border-ink bg-graphite-50"
    )}>
      {title && (
        <h4 className="font-serif text-xl font-bold text-ink mb-3">
          {title}
        </h4>
      )}
      <div className="text-graphite-800 space-y-2">
        {children}
      </div>
    </div>
  );
}

interface ChecklistProps {
  items: {
    text: string;
    completed?: boolean;
  }[];
}

export function Checklist({ items }: ChecklistProps) {
  return (
    <ul className="space-y-3 my-8">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className={cn(
            "flex-shrink-0 w-6 h-6 border-2 flex items-center justify-center mt-0.5",
            item.completed ? "bg-ink border-ink" : "border-graphite-400"
          )}>
            {item.completed && (
              <svg className="w-4 h-4 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <span className="text-lg text-graphite-800">
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

interface CitationProps {
  id: string;
  number: number;
  source: string;
  url: string;
  date?: string;
}

export function InlineCitation({ number, id }: { number: number; id: string }) {
  return (
    <sup className="text-ink">
      <a 
        href={`#ref-${id}`}
        className="hover:underline font-semibold"
      >
        [{number}]
      </a>
    </sup>
  );
}

export function Citation({ id, number, source, url, date }: CitationProps) {
  return (
    <li id={`ref-${id}`} className="text-sm text-graphite-700 mb-3">
      <span className="font-semibold text-ink">[{number}]</span>{' '}
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-ink transition-colors inline-flex items-center gap-1"
      >
        {source}
        <ExternalLink className="h-3 w-3" />
      </a>
      {date && <span className="text-graphite-500"> • Accessed {date}</span>}
    </li>
  );
}

interface ReferencesProps {
  citations: CitationProps[];
}

export function References({ citations }: ReferencesProps) {
  if (citations.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t-2 border-ink">
      <h2 className="font-serif text-3xl font-bold text-ink mb-8">
        References & Sources
      </h2>
      <ol className="space-y-2">
        {citations.map((citation) => (
          <Citation key={citation.id} {...citation} />
        ))}
      </ol>
    </section>
  );
}

interface DataTableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export function DataTable({ headers, rows, caption }: DataTableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      {caption && (
        <p className="text-sm text-graphite-600 mb-3 italic">
          {caption}
        </p>
      )}
      <table className="w-full border-2 border-ink">
        <thead>
          <tr className="bg-ink text-white">
            {headers.map((header, index) => (
              <th 
                key={index}
                className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wide border-r-2 border-white/30 last:border-r-0"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={cn(
                "border-b-2 border-graphite-200 last:border-b-0",
                rowIndex % 2 === 0 ? "bg-paper" : "bg-graphite-50"
              )}
            >
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex}
                  className="px-4 py-3 text-graphite-800 border-r-2 border-graphite-200 last:border-r-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
