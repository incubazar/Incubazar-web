// Founder Learning & Growth - Content Type Definitions

export type ModuleCategory = 
  | 'incorporation'
  | 'finance'
  | 'product'
  | 'pitching'
  | 'brand'
  | 'legal'
  | 'operations'
  | 'trends'
  | 'case-studies'
  | 'toolkits';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type CitationType = 'government' | 'report' | 'publication' | 'company' | 'database';

export interface Citation {
  id: string;
  text: string; // Brief inline citation text
  source: string; // Full source name
  url: string;
  type: CitationType;
  date: string; // Publication/access date
  relevance: string; // Why this source is relevant
  excerpt?: string; // Optional short quote from source
}

export interface ModuleContent {
  id: string;
  slug: string;
  category: ModuleCategory;
  title: string;
  subtitle?: string;
  description: string;
  level: DifficultyLevel;
  estimatedTime: number; // in minutes
  order: number; // for sequencing modules
  
  // Content sections
  sections: ContentSection[];
  
  // References
  citations: Citation[];
  bibliography: BibliographyEntry[];
  
  // Related content
  relatedModules?: string[]; // IDs of related modules
  prerequisites?: string[]; // IDs of prerequisite modules
  
  // Templates & downloads
  templates?: Template[];
  
  // Metadata
  author?: string;
  publishedDate: string;
  updatedDate: string;
  tags: string[];
  featured: boolean;
}

export interface ContentSection {
  id: string;
  type: 'text' | 'list' | 'table' | 'quote' | 'callout' | 'checklist' | 'calculator';
  heading?: string;
  content: string; // Markdown or rich text
  citations?: string[]; // Array of citation IDs
  metadata?: Record<string, any>; // For specialized sections
}

export interface BibliographyEntry {
  id: string;
  authors?: string[];
  title: string;
  publication?: string;
  date: string;
  url: string;
  type: CitationType;
  accessDate: string;
  notes?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  type: 'pdf' | 'csv' | 'docx' | 'xlsx' | 'md';
  fileUrl: string;
  previewUrl?: string;
  category: string;
}

// Industry Trends Structure
export interface IndustrySnapshot {
  id: string;
  slug: string;
  industry: string;
  region: 'india' | 'usa' | 'global';
  
  // Market data
  marketSize: {
    value: number;
    currency: string;
    year: number;
    citation: string; // Citation ID
  };
  
  growthRate: {
    value: number; // percentage
    period: string; // e.g., "2024-2029"
    citation: string;
  };
  
  // Key information
  overview: string;
  majorPlayers: {
    name: string;
    description: string;
    founded?: number;
  }[];
  
  opportunities: string[];
  regulatoryNotes: string[];
  
  emergingTrends: {
    title: string;
    description: string;
  }[];
  
  playbook: {
    title: string;
    description: string;
    actionableSteps: string[];
  }[];
  
  citations: Citation[];
  bibliography: BibliographyEntry[];
  
  publishedDate: string;
  updatedDate: string;
}

// Case Studies Structure
export interface CaseStudy {
  id: string;
  slug: string;
  companyName: string;
  industry: string;
  region: string;
  founded: number;
  
  // Story structure
  coverImage?: string; // Greyscale image URL
  tagline: string;
  overview: string;
  
  timeline: TimelineEvent[];
  
  keyDecisions: {
    year: number;
    decision: string;
    rationale: string;
    outcome: string;
    citation?: string;
  }[];
  
  pivotMoments: {
    year: number;
    from: string;
    to: string;
    reason: string;
    result: string;
  }[];
  
  metrics: {
    label: string;
    value: string;
    year: number;
    citation?: string;
  }[];
  
  lessonsLearned: {
    category: string;
    lesson: string;
    application: string;
  }[];
  
  citations: Citation[];
  bibliography: BibliographyEntry[];
  
  publishedDate: string;
  updatedDate: string;
}

export interface TimelineEvent {
  year: number;
  month?: number;
  title: string;
  description: string;
  type: 'founding' | 'funding' | 'product' | 'pivot' | 'acquisition' | 'ipo' | 'milestone';
  citation?: string;
}

// User Progress Tracking
export interface UserProgress {
  userId: string;
  completedModules: string[]; // Module IDs
  completedCaseStudies: string[]; // Case study IDs
  bookmarkedContent: string[]; // Content IDs
  quizScores: {
    moduleId: string;
    score: number;
    completedAt: string;
  }[];
  lastAccessedModule?: string;
  progressPercentage: number;
  createdAt: string;
  updatedAt: string;
}

// Learning Path
export interface LearningPath {
  id: string;
  name: string;
  description: string;
  targetAudience: string; // e.g., "Pre-seed founders", "First-time entrepreneurs"
  estimatedDuration: number; // total minutes
  modules: {
    moduleId: string;
    order: number;
    required: boolean;
  }[];
  completionCriteria: string[];
}

// Calculator Types
export interface CalculatorConfig {
  id: string;
  type: 'runway' | 'burn-rate' | 'cac-ltv' | 'valuation' | 'equity';
  title: string;
  description: string;
  inputs: CalculatorInput[];
  formula: string; // Description of calculation
  resultLabel: string;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'currency' | 'percentage';
  placeholder?: string;
  defaultValue?: number;
  required: boolean;
  helpText?: string;
}
