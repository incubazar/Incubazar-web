'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, TrendingUp, TrendingDown, Target, Lightbulb, Users, DollarSign, Zap } from 'lucide-react';

// ============================================================================
// CASE STUDY HERO - NYT Sunday Review Style with Logo/Image Support
// ============================================================================
interface CaseStudyHeroProps {
  company: string;
  tagline: string;
  category: string;
  readTime: number;
  heroTitle: string;
  heroSubtitle: string;
  foundedYear: number;
  headquarters: string;
  founders: string[];
  logoUrl?: string; // Optional logo image
  logoAlt?: string;
  brandColor?: string; // Optional brand accent color
}

export function CaseStudyHero({
  company,
  tagline,
  category,
  readTime,
  heroTitle,
  heroSubtitle,
  foundedYear,
  headquarters,
  founders,
  logoUrl,
  logoAlt,
  brandColor
}: CaseStudyHeroProps) {
  return (
    <div className="relative mb-16">
      {/* Metadata Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-graphite-200">
        <div className="flex items-center gap-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-graphite-600">
            {category}
          </span>
          <span className="text-xs text-graphite-500">•</span>
          <span className="text-xs uppercase tracking-widest text-graphite-600">
            Case Study
          </span>
        </div>
        <div className="text-xs text-graphite-500">
          {readTime} min read
        </div>
      </div>

      {/* Logo + Company Badge - Layered Design */}
      <div className="relative mb-8">
        {logoUrl ? (
          <div className="inline-flex items-center gap-6">
            {/* Logo with layered shadow effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-graphite-200 translate-x-2 translate-y-2" />
              <div className="absolute inset-0 bg-graphite-300 translate-x-1 translate-y-1" />
              <div className="relative bg-paper p-6 border-2 border-ink">
                <Image 
                  src={logoUrl} 
                  alt={logoAlt || `${company} logo`}
                  width={128}
                  height={64}
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
            {/* Company Name Badge */}
            <div className="px-6 py-3 bg-ink text-paper">
              <div className="text-sm uppercase tracking-widest font-semibold">{company}</div>
            </div>
          </div>
        ) : (
          <div className="inline-block px-4 py-2 bg-ink text-paper">
            <div className="text-xs uppercase tracking-widest font-semibold">{company}</div>
          </div>
        )}
      </div>

      {/* Hero Title - NYT Style */}
      <div className="mb-8">
        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-ink mb-6 leading-none">
          {heroTitle}
        </h1>
        <p className="font-serif text-2xl md:text-3xl text-graphite-700 leading-tight max-w-4xl">
          {heroSubtitle}
        </p>
      </div>

      {/* Company Details Grid with optional brand accent */}
      <div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t-2"
        style={{ borderColor: brandColor || '#e5e5e5' }}
      >
        <div>
          <div className="text-xs uppercase tracking-widest text-graphite-500 mb-2">Founded</div>
          <div className="font-semibold text-ink text-lg">{foundedYear}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-graphite-500 mb-2">Headquarters</div>
          <div className="font-semibold text-ink text-lg">{headquarters}</div>
        </div>
        <div className="col-span-2">
          <div className="text-xs uppercase tracking-widest text-graphite-500 mb-2">Founders</div>
          <div className="font-semibold text-ink text-lg">{founders.join(', ')}</div>
        </div>
      </div>

      {/* Tagline - Editorial Style with optional brand color */}
      <div 
        className="mt-12 p-8 border-l-4 bg-graphite-50"
        style={{ borderColor: brandColor || '#000000' }}
      >
        <p className="font-serif text-xl md:text-2xl italic text-graphite-800 leading-relaxed">
          "{tagline}&quot;
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// LAYERED VISUAL SECTION - Paper Cut Aesthetic
// ============================================================================
interface LayeredVisualProps {
  title: string;
  description: string;
  layers: {
    color: 'ink' | 'graphite-900' | 'graphite-700' | 'graphite-500' | 'graphite-300' | 'graphite-100';
    content: string;
    size: 'sm' | 'md' | 'lg';
  }[];
}

export function LayeredVisual({ title, description, layers }: LayeredVisualProps) {
  const sizeClasses = {
    sm: 'p-6 text-sm',
    md: 'p-8 text-base',
    lg: 'p-12 text-lg'
  };

  const colorClasses = {
    'ink': 'bg-ink text-paper',
    'graphite-900': 'bg-graphite-900 text-paper',
    'graphite-700': 'bg-graphite-700 text-paper',
    'graphite-500': 'bg-graphite-500 text-paper',
    'graphite-300': 'bg-graphite-300 text-ink',
    'graphite-100': 'bg-graphite-100 text-ink'
  };

  return (
    <div className="my-16">
      <div className="mb-8">
        <h3 className="font-serif text-3xl font-bold text-ink mb-3">{title}</h3>
        <p className="text-lg text-graphite-700">{description}</p>
      </div>

      <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-graphite-50">
        {layers.map((layer, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-500 hover:scale-105 ${colorClasses[layer.color]} ${sizeClasses[layer.size]}`}
            style={{
              transform: `translateY(${index * -20}px) translateX(${index * 10}px)`,
              zIndex: layers.length - index,
              boxShadow: `${index * 4}px ${index * 4}px 0px rgba(0,0,0,${0.1 + index * 0.05})`
            }}
          >
            <div className="font-semibold">{layer.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// TIMELINE - Journey & Pivots
// ============================================================================
interface TimelineEvent {
  year: number;
  month?: string;
  title: string;
  description: string;
  type: 'milestone' | 'pivot' | 'crisis' | 'funding' | 'launch';
  impact?: 'positive' | 'negative' | 'neutral';
}

interface CaseStudyTimelineProps {
  events: TimelineEvent[];
}

export function CaseStudyTimeline({ events }: CaseStudyTimelineProps) {
  const typeIcons = {
    milestone: <Target className="h-5 w-5" />,
    pivot: <Zap className="h-5 w-5" />,
    crisis: <TrendingDown className="h-5 w-5" />,
    funding: <DollarSign className="h-5 w-5" />,
    launch: <TrendingUp className="h-5 w-5" />
  };

  const typeColors = {
    milestone: 'bg-ink text-paper',
    pivot: 'bg-graphite-800 text-paper',
    crisis: 'bg-graphite-600 text-paper',
    funding: 'bg-graphite-900 text-paper',
    launch: 'bg-ink text-paper'
  };

  return (
    <div className="my-16">
      <h3 className="font-serif text-4xl font-bold text-ink mb-12">
        The Journey: Timeline & Pivots
      </h3>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-24 top-0 bottom-0 w-0.5 bg-graphite-300" />

        <div className="space-y-12">
          {events.map((event, index) => (
            <div key={index} className="relative pl-8 md:pl-40">
              {/* Year Badge */}
              <div className="absolute left-0 md:left-0 top-0 w-20 md:w-32">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-graphite-500" />
                  <div>
                    <div className="font-serif text-2xl font-bold text-ink">{event.year}</div>
                    {event.month && (
                      <div className="text-xs uppercase tracking-widest text-graphite-500">
                        {event.month}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-[-4px] md:left-[92px] top-2 w-3 h-3 rounded-full bg-ink border-4 border-paper" />

              {/* Event Card */}
              <div className="border-2 border-ink bg-paper hover:bg-graphite-50 transition-colors">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`p-2 ${typeColors[event.type]}`}>
                      {typeIcons[event.type]}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-widest text-graphite-500 mb-2">
                        {event.type}
                      </div>
                      <h4 className="font-serif text-2xl font-bold text-ink mb-2">
                        {event.title}
                      </h4>
                      <p className="text-graphite-700 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// METRICS SHOWCASE - Key Numbers
// ============================================================================
interface Metric {
  label: string;
  value: string;
  change?: string;
  context?: string;
  icon?: React.ReactNode;
}

interface CaseStudyMetricsProps {
  title: string;
  subtitle?: string;
  metrics: Metric[];
}

export function CaseStudyMetrics({ title, subtitle, metrics }: CaseStudyMetricsProps) {
  return (
    <div className="my-16">
      <div className="mb-8">
        <h3 className="font-serif text-4xl font-bold text-ink mb-3">{title}</h3>
        {subtitle && <p className="text-lg text-graphite-700">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="border-2 border-ink bg-paper p-6 hover:bg-ink hover:text-paper transition-all group">
            {metric.icon && (
              <div className="mb-4 text-ink group-hover:text-paper transition-colors">
                {metric.icon}
              </div>
            )}
            <div className="text-xs uppercase tracking-widest text-graphite-500 group-hover:text-graphite-300 mb-2">
              {metric.label}
            </div>
            <div className="font-serif text-4xl md:text-5xl font-bold text-ink group-hover:text-paper mb-2">
              {metric.value}
            </div>
            {metric.change && (
              <div className="text-sm font-semibold text-graphite-600 group-hover:text-graphite-300 mb-2">
                {metric.change}
              </div>
            )}
            {metric.context && (
              <div className="text-sm text-graphite-600 group-hover:text-graphite-300 leading-relaxed">
                {metric.context}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// LESSONS LEARNED - Editorial Insights
// ============================================================================
interface Lesson {
  title: string;
  insight: string;
  example?: string;
  category: 'strategy' | 'execution' | 'culture' | 'product' | 'market';
}

interface CaseStudyLessonsProps {
  lessons: Lesson[];
}

export function CaseStudyLessons({ lessons }: CaseStudyLessonsProps) {
  const categoryColors = {
    strategy: 'border-ink bg-ink text-paper',
    execution: 'border-graphite-900 bg-graphite-900 text-paper',
    culture: 'border-graphite-700 bg-graphite-700 text-paper',
    product: 'border-graphite-600 bg-graphite-600 text-paper',
    market: 'border-graphite-800 bg-graphite-800 text-paper'
  };

  return (
    <div className="my-16">
      <div className="mb-12">
        <h3 className="font-serif text-4xl font-bold text-ink mb-4">
          Lessons for Founders
        </h3>
        <p className="text-xl text-graphite-700">
          Strategic insights you can apply to your own startup journey.
        </p>
      </div>

      <div className="space-y-8">
        {lessons.map((lesson, index) => (
          <div key={index} className="border-l-4 border-ink pl-8 py-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <Lightbulb className="h-8 w-8 text-ink" />
              </div>
              <div className="flex-1">
                <div className={`inline-block px-3 py-1 mb-3 text-xs uppercase tracking-widest font-semibold ${categoryColors[lesson.category]}`}>
                  {lesson.category}
                </div>
                <h4 className="font-serif text-2xl font-bold text-ink mb-3">
                  {lesson.title}
                </h4>
                <p className="text-lg text-graphite-800 leading-relaxed mb-4">
                  {lesson.insight}
                </p>
                {lesson.example && (
                  <div className="p-4 bg-graphite-50 border-l-2 border-graphite-400">
                    <div className="text-xs uppercase tracking-widest text-graphite-500 mb-2">
                      Real-World Example
                    </div>
                    <p className="text-sm text-graphite-700 italic leading-relaxed">
                      {lesson.example}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PIVOT ANALYSIS - Before/After Comparison
// ============================================================================
interface PivotAnalysisProps {
  pivotTitle: string;
  year: number;
  before: {
    model: string;
    problem: string;
    metrics?: string;
  };
  after: {
    model: string;
    solution: string;
    metrics?: string;
  };
  impact: string;
}

export function PivotAnalysis({ pivotTitle, year, before, after, impact }: PivotAnalysisProps) {
  return (
    <div className="my-16">
      <div className="mb-8">
        <div className="inline-block px-4 py-2 bg-graphite-900 text-paper mb-4">
          <div className="text-xs uppercase tracking-widest font-semibold">Pivot Analysis</div>
        </div>
        <h3 className="font-serif text-4xl font-bold text-ink mb-2">{pivotTitle}</h3>
        <div className="flex items-center gap-2 text-graphite-600">
          <Calendar className="h-4 w-4" />
          <span className="font-semibold">{year}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Before */}
        <div className="border-2 border-graphite-400 bg-graphite-50 p-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingDown className="h-6 w-6 text-graphite-700" />
            <h4 className="font-serif text-2xl font-bold text-ink">Before</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">
                Business Model
              </div>
              <p className="text-graphite-900 font-semibold">{before.model}</p>
            </div>
            
            <div>
              <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">
                The Problem
              </div>
              <p className="text-graphite-800 leading-relaxed">{before.problem}</p>
            </div>

            {before.metrics && (
              <div>
                <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">
                  Metrics
                </div>
                <p className="text-sm text-graphite-700 font-mono">{before.metrics}</p>
              </div>
            )}
          </div>
        </div>

        {/* After */}
        <div className="border-2 border-ink bg-ink text-paper p-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6" />
            <h4 className="font-serif text-2xl font-bold">After</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-graphite-300 mb-2">
                New Business Model
              </div>
              <p className="font-semibold">{after.model}</p>
            </div>
            
            <div>
              <div className="text-xs uppercase tracking-widest text-graphite-300 mb-2">
                The Solution
              </div>
              <p className="text-graphite-200 leading-relaxed">{after.solution}</p>
            </div>

            {after.metrics && (
              <div>
                <div className="text-xs uppercase tracking-widest text-graphite-300 mb-2">
                  New Metrics
                </div>
                <p className="text-sm text-graphite-200 font-mono">{after.metrics}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Impact Statement */}
      <div className="mt-8 p-8 border-l-4 border-ink bg-graphite-50">
        <div className="text-xs uppercase tracking-widest text-graphite-600 mb-3">
          Impact on Business
        </div>
        <p className="font-serif text-xl italic text-ink leading-relaxed">
          {impact}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// TEAM & CULTURE SPOTLIGHT
// ============================================================================
interface TeamSpotlightProps {
  quote: string;
  attribution: string;
  role: string;
  culturePrinciples: string[];
}

export function TeamSpotlight({ quote, attribution, role, culturePrinciples }: TeamSpotlightProps) {
  return (
    <div className="my-16">
      <h3 className="font-serif text-4xl font-bold text-ink mb-8">
        Team & Culture
      </h3>

      {/* Founder Quote */}
      <div className="mb-12 p-12 bg-ink text-paper">
        <div className="flex items-start gap-4 mb-6">
          <Users className="h-8 w-8 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-serif text-3xl italic leading-relaxed mb-6">
              "{quote}&quot;
            </p>
            <div>
              <div className="font-semibold text-lg">{attribution}</div>
              <div className="text-sm text-graphite-300">{role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Culture Principles */}
      <div>
        <h4 className="font-serif text-2xl font-bold text-ink mb-6">
          Core Cultural Principles
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {culturePrinciples.map((principle, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 border-2 border-graphite-300 bg-paper hover:border-ink transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-ink text-paper flex items-center justify-center font-serif font-bold">
                {index + 1}
              </div>
              <p className="text-graphite-800 leading-relaxed pt-1">{principle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PROPOSAL-STYLE COVER - Inspired by Video/Document Proposals
// ============================================================================
interface ProposalCoverProps {
  title: string;
  subtitle?: string;
  client?: string;
  date?: string;
  team?: string[];
  brief: string;
  accentColor?: string;
  introSection?: {
    heading: string;
    content: string;
  };
  aboutSection?: {
    items: { icon: React.ReactNode; label: string; value: string }[];
  };
}

export function ProposalCover({
  title,
  subtitle,
  client,
  date,
  team,
  brief,
  accentColor = '#E07856',
  introSection,
  aboutSection
}: ProposalCoverProps) {
  return (
    <div className="grid md:grid-cols-2 gap-0 min-h-[600px] my-16 border-2 border-ink">
      {/* Left Panel - Proposal Info */}
      <div 
        className="p-12 text-ink flex flex-col justify-between"
        style={{ backgroundColor: accentColor }}
      >
        {/* Header Section */}
        <div>
          {client && (
            <div className="mb-8">
              <div className="text-xs uppercase tracking-widest font-semibold mb-2">CLIENT</div>
              <div className="font-semibold text-lg">{client}</div>
            </div>
          )}

          {date && (
            <div className="mb-8">
              <div className="text-xs uppercase tracking-widest font-semibold mb-2">DATE</div>
              <div className="font-semibold">{date}</div>
            </div>
          )}

          {team && team.length > 0 && (
            <div className="mb-8">
              <div className="text-xs uppercase tracking-widest font-semibold mb-2">TEAM</div>
              <div className="font-semibold leading-relaxed">{team.join(', ')}</div>
            </div>
          )}

          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest font-semibold mb-3">BRIEF</div>
            <p className="text-sm leading-relaxed font-mono">{brief}</p>
          </div>
        </div>

        {/* Footer - Contact/Branding */}
        <div className="mt-8 pt-8 border-t-2 border-ink">
          <div className="text-xs uppercase tracking-widest font-semibold">INCUBAZAR LEARNING</div>
        </div>
      </div>

      {/* Right Panel - Main Title & Content */}
      <div className="bg-paper p-12 flex flex-col justify-between border-l-2 border-ink">
        {/* Vertical Title - Inspired by Proposal Design */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-serif text-6xl md:text-7xl font-bold text-ink mb-4 leading-none tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-graphite-700 font-semibold">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Introduction Section */}
        {introSection && (
          <div className="mt-8 border-t-2 border-ink pt-8">
            <div className="mb-4">
              <div 
                className="inline-block px-3 py-1 text-xs uppercase tracking-widest font-semibold rotate-90 origin-left"
                style={{ 
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed'
                }}
              >
                {introSection.heading}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-graphite-800 font-mono">
              {introSection.content}
            </p>
          </div>
        )}

        {/* About Section with Icons */}
        {aboutSection && (
          <div className="mt-8 grid grid-cols-2 gap-4">
            {aboutSection.items.map((item, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center justify-center p-4 bg-ink text-paper aspect-square"
              >
                <div className="mb-2">{item.icon}</div>
                <div className="text-xs uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-sm font-semibold text-center">{item.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// BRAND SHOWCASE - For Logo/Visual Design Case Studies
// ============================================================================
interface BrandShowcaseProps {
  title: string;
  description: string;
  logos: {
    src: string;
    alt: string;
    caption?: string;
    year?: string;
  }[];
  brandColors?: string[];
  gridLayout?: '2' | '3' | '4';
}

export function BrandShowcase({
  title,
  description,
  logos,
  brandColors,
  gridLayout = '3'
}: BrandShowcaseProps) {
  const gridCols = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-2 md:grid-cols-3',
    '4': 'grid-cols-2 md:grid-cols-4'
  };

  return (
    <div className="my-16">
      <div className="mb-12">
        <h3 className="font-serif text-4xl font-bold text-ink mb-4">{title}</h3>
        <p className="text-lg text-graphite-700 leading-relaxed max-w-3xl">{description}</p>
      </div>

      {/* Brand Colors */}
      {brandColors && brandColors.length > 0 && (
        <div className="mb-8 flex gap-2">
          {brandColors.map((color, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div 
                className="w-20 h-20 border-2 border-ink"
                style={{ backgroundColor: color }}
              />
              <div className="mt-2 text-xs font-mono text-graphite-600">{color}</div>
            </div>
          ))}
        </div>
      )}

      {/* Logo Grid with Layered Effect */}
      <div className={`grid ${gridCols[gridLayout]} gap-8`}>
        {logos.map((logo, idx) => (
          <div key={idx} className="relative group">
            {/* Layered Shadow Effect */}
            <div className="absolute inset-0 bg-graphite-200 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
            <div className="absolute inset-0 bg-graphite-300 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
            
            {/* Logo Container */}
            <div className="relative bg-paper border-2 border-ink p-8 aspect-square flex flex-col items-center justify-center">
              <Image 
                src={logo.src} 
                alt={logo.alt}
                width={200}
                height={200}
                className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105"
              />
            </div>

            {/* Caption */}
            {(logo.caption || logo.year) && (
              <div className="mt-4">
                {logo.year && (
                  <div className="text-xs uppercase tracking-widest text-graphite-500 mb-1">
                    {logo.year}
                  </div>
                )}
                {logo.caption && (
                  <div className="text-sm text-graphite-800 font-semibold">
                    {logo.caption}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================