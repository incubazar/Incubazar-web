'use client';

import LearnLayout from '@/components/learn/LearnLayout';
import {
  ArticleSpread,
  ArticleHeader,
  ArticleSection,
  ArticleText,
} from '@/components/learn/ArticleComponents';
import { 
  Download,
  Calculator
} from 'lucide-react';

export default function ToolkitsPage() {
  return (
    <LearnLayout>
      <ArticleSpread>
        <ArticleHeader
          category="Resources"
          title="Toolkits & Templates"
          subtitle="Ready-to-use business plans, pitch decks, cap tables, calculators, and checklists to accelerate your startup journey."
          readTime={10}
          level="beginner"
        />

        {/* Overview */}
        <ArticleSection heading="What You'll Find Here">
          <ArticleText>
            Every template is production-ready, used by real startups, and fully customizable. 
            All formats support Google Docs, Excel, PowerPoint, Figma, and Notion. Download what 
            you need, when you need it.
          </ArticleText>
        </ArticleSection>

        {/* Incorporation Templates */}
        <section className="mt-16 pt-12 border-t-2 border-graphite-200">
          <h2 className="font-serif text-3xl font-bold text-ink mb-6">
            Download Templates & Checklists
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/templates/incorporation-checklist.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Incorporation Checklist</h4>
                <p className="text-sm text-graphite-600">Complete document list for Pvt Ltd</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Annual Compliance Calendar</h4>
                <p className="text-sm text-graphite-600">Never miss a filing deadline</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Sample MoA & AoA</h4>
                <p className="text-sm text-graphite-600">Startup-friendly templates</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Incorporation Cost Calculator</h4>
                <p className="text-sm text-graphite-600">Excel sheet with all fees</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* Finance & Calculators */}
        <section className="mt-16 pt-12 border-t-2 border-graphite-200">
          <h2 className="font-serif text-3xl font-bold text-ink mb-6">
            Download Templates & Calculators
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Cap Table Template (Excel)</h4>
                <p className="text-sm text-graphite-600">Track equity, dilution, and vesting schedules</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Unit Economics Calculator</h4>
                <p className="text-sm text-graphite-600">CAC, LTV, payback period, runway calculator</p>
              </div>
              <Calculator className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Due Diligence Checklist</h4>
                <p className="text-sm text-graphite-600">Complete data room preparation guide</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">3-Year Financial Model</h4>
                <p className="text-sm text-graphite-600">Startup financial projections template</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* Product & GTM */}
        <section className="mt-16 pt-12 border-t-2 border-graphite-200">
          <h2 className="font-serif text-3xl font-bold text-ink mb-6">
            Download Templates & Worksheets
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/templates/mvp-validation-checklist.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">MVP Validation Checklist</h4>
                <p className="text-sm text-graphite-600">Step-by-step guide to test assumptions before building</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Product-Market Fit Survey</h4>
                <p className="text-sm text-graphite-600">Sean Ellis test + NPS + retention analysis</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">SaaS Metrics Dashboard (Excel)</h4>
                <p className="text-sm text-graphite-600">Track MRR, churn, NRR, CAC, LTV, activation</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Pricing Strategy Worksheet</h4>
                <p className="text-sm text-graphite-600">Value-based pricing calculator + tier builder</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* Pitching */}
        <section className="mt-16 pt-12 border-t-2 border-graphite-200">
          <h2 className="font-serif text-3xl font-bold text-ink mb-6">
            Templates & Resources
          </h2>
          
          <ArticleText>
            Use these templates to build your pitch deck and scripts. All formats are designed for 
            quick customization—replace placeholders with your content.
          </ArticleText>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-ink hover:bg-graphite-50 transition-colors">
              <Download className="h-6 w-6 text-ink mb-4" />
              <h4 className="font-semibold text-ink mb-2">10-Slide Pitch Deck Template</h4>
              <p className="text-sm text-graphite-800 mb-4">
                PowerPoint/Keynote template with all 10 slides pre-formatted. Includes speaker notes 
                with tips for each slide. (~2 MB PPTX file)
              </p>
              <div className="text-xs text-graphite-600">
                Coming soon: Download link
              </div>
            </div>

            <div className="p-6 border-2 border-ink hover:bg-graphite-50 transition-colors">
              <Download className="h-6 w-6 text-ink mb-4" />
              <h4 className="font-semibold text-ink mb-2">Elevator Pitch Worksheet</h4>
              <p className="text-sm text-graphite-800 mb-4">
                Fill-in-the-blank template for crafting your 30-second pitch using the 4-part formula. 
                PDF with examples. (~500 KB PDF)
              </p>
              <div className="text-xs text-graphite-600">
                Coming soon: Download link
              </div>
            </div>

            <div className="p-6 border-2 border-ink hover:bg-graphite-50 transition-colors">
              <Download className="h-6 w-6 text-ink mb-4" />
              <h4 className="font-semibold text-ink mb-2">3-Minute Pitch Script</h4>
              <p className="text-sm text-graphite-800 mb-4">
                Word doc with the full 3-minute script structure. Includes timing markers and 
                example scripts from 3 successful startups. (~1 MB DOCX)
              </p>
              <div className="text-xs text-graphite-600">
                Coming soon: Download link
              </div>
            </div>

            <div className="p-6 border-2 border-ink hover:bg-graphite-50 transition-colors">
              <Download className="h-6 w-6 text-ink mb-4" />
              <h4 className="font-semibold text-ink mb-2">Investor Q&A Prep Sheet</h4>
              <p className="text-sm text-graphite-800 mb-4">
                50 common investor questions with frameworks for answering. Covers objections, 
                competitive questions, and due diligence. (~2 MB PDF)
              </p>
              <div className="text-xs text-graphite-600">
                Coming soon: Download link
              </div>
            </div>
          </div>
        </section>

        {/* Brand & Design */}
        <section className="mt-16 pt-12 border-t-2 border-graphite-200">
          <h2 className="font-serif text-3xl font-bold text-ink mb-6">
            Download Templates & Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Brand Strategy Brief</h4>
                <p className="text-sm text-graphite-600">One-page framework for brand foundations</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Logo Grid Template</h4>
                <p className="text-sm text-graphite-600">Geometric grid for precise logo design</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Typography Scale Calculator</h4>
                <p className="text-sm text-graphite-600">Build your type system with ratios</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/coming-soon.html"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Brand Guidelines Template</h4>
                <p className="text-sm text-graphite-600">40-page template for complete brand docs</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </section>
      </ArticleSpread>
    </LearnLayout>
  );
}
