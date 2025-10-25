'use client';

import LearnLayout from '@/components/learn/LearnLayout';
import {
  ArticleSpread,
  ArticleHeader,
  ArticleSection,
  ArticleText,
  CalloutBox,
  Checklist,
  DataTable,
  References,
  InlineCitation,
  PullQuote
} from '@/components/learn/ArticleComponents';
import Link from 'next/link';
import { Download, ArrowRight } from 'lucide-react';

const citations = [
  {
    id: 'mca-incorporation',
    number: 1,
    source: 'Ministry of Corporate Affairs - Company Incorporation Guide',
    url: 'https://www.mca.gov.in/content/mca/global/en/services/company-services/company-incorporation.html',
    date: 'October 2024'
  },
  {
    id: 'companies-act-2013',
    number: 2,
    source: 'The Companies Act, 2013 - Government of India',
    url: 'https://www.mca.gov.in/Ministry/pdf/CompaniesAct2013.pdf',
    date: 'September 2024'
  },
  {
    id: 'startup-india',
    number: 3,
    source: 'Startup India - Department for Promotion of Industry and Internal Trade',
    url: 'https://www.startupindia.gov.in/',
    date: 'October 2024'
  },
  {
    id: 'us-sba-structures',
    number: 4,
    source: 'U.S. Small Business Administration - Choose a Business Structure',
    url: 'https://www.sba.gov/business-guide/launch-your-business/choose-business-structure',
    date: 'October 2024'
  },
  {
    id: 'pwc-startup-costs',
    number: 5,
    source: 'PwC India - Startup Incorporation Cost Analysis 2024',
    url: 'https://www.pwc.in/services/entrepreneurial-and-private-business/start-up.html',
    date: 'August 2024'
  }
];

export default function IncorporationPage() {
  return (
    <LearnLayout>
      <ArticleSpread>
        <ArticleHeader
          category="Foundation"
          title="Incorporation & Legal Foundations"
          subtitle="Master company structures, formation processes, and compliance requirements for Indian and US startups."
          readTime={45}
          level="beginner"
        />

        {/* Introduction */}
        <ArticleSection>
          <ArticleText>
            Choosing the right legal structure is one of the most critical decisions you'll make as 
            a founder. Your incorporation choice affects taxation, liability, fundraising potential, 
            compliance burden, and even your ability to scale internationally.
          </ArticleText>

          <ArticleText>
            This comprehensive guide covers the five primary business structures in India and their 
            US equivalents, with data-backed recommendations for each stage of your startup journey.
          </ArticleText>

          <CalloutBox type="tip" title="Key Principle">
            <p>
              <strong>Start simple, but start right.</strong> Most tech startups begin as Private 
              Limited Companies (India) or Delaware C-Corps (USA) because they're optimized for 
              venture capital investment and equity distribution. However, your specific needs may vary.
            </p>
          </CalloutBox>
        </ArticleSection>

        {/* Private Limited Company */}
        <ArticleSection heading="1. Private Limited Company (Pvt Ltd)">
          <ArticleText>
            A Private Limited Company is the most popular structure for startups in India, accounting 
            for over 85% of VC-backed companies<InlineCitation number={3} id="startup-india" />. 
            It offers limited liability, easy transferability of shares, and is the preferred vehicle 
            for raising institutional capital.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Formation Requirements
            </h4>
            
            <Checklist items={[
              { text: 'Minimum 2 directors (maximum 15), at least one must be Indian resident' },
              { text: 'Minimum 2 shareholders (can be same as directors)' },
              { text: 'Minimum paid-up capital: ₹1 lakh (recommended: ₹10-25 lakh)' },
              { text: 'Registered office address in India with proof' },
              { text: 'Digital Signature Certificate (DSC) for all directors' },
              { text: 'Director Identification Number (DIN) for all directors' },
            ]} />
          </div>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Required Documents
            </h4>
            <ul className="space-y-2 text-lg text-graphite-800">
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span>PAN card and Aadhaar card of all directors and shareholders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span>Address proof of registered office (rental agreement + NOC, or property deed)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span>Memorandum of Association (MoA) and Articles of Association (AoA)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span>Board resolution and shareholder consent</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span>Declaration of compliance in Form INC-8</span>
              </li>
            </ul>
          </div>

          <CalloutBox type="info" title="Cost Breakdown (India, 2024)">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Government fees (MCA)</span>
                <span className="font-semibold">₹8,000 - ₹12,000</span>
              </div>
              <div className="flex justify-between">
                <span>Professional fees (CA/CS)</span>
                <span className="font-semibold">₹15,000 - ₹25,000</span>
              </div>
              <div className="flex justify-between">
                <span>Stamp duty (varies by state)</span>
                <span className="font-semibold">₹2,000 - ₹5,000</span>
              </div>
              <div className="flex justify-between border-t-2 border-graphite-300 pt-2 mt-2">
                <span className="font-bold">Total (approx)</span>
                <span className="font-bold">₹25,000 - ₹42,000</span>
              </div>
            </div>
            <p className="text-sm text-graphite-600 mt-4">
              Source: PwC India Startup Incorporation Cost Analysis 2024<InlineCitation number={5} id="pwc-startup-costs" />
            </p>
          </CalloutBox>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Pros & Cons
            </h4>
            
            <DataTable
              headers={['Advantages', 'Disadvantages']}
              rows={[
                ['Limited liability protection', 'More compliance than sole proprietorship'],
                ['Easy to raise VC/PE funding', 'Cannot have more than 200 shareholders'],
                ['Perpetual succession', 'Shares not freely transferable to public'],
                ['Tax benefits under Startup India', 'Annual audit mandatory'],
                ['Separate legal entity', 'Higher incorporation costs'],
                ['Professional credibility', 'Stringent disclosure norms'],
              ]}
              caption="Comparison based on Companies Act 2013 provisions"
            />
          </div>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Ideal For
            </h4>
            <ul className="space-y-2 text-lg text-graphite-800">
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>Tech startups planning to raise venture capital</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>Businesses with multiple co-founders needing equity distribution</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>Companies planning international expansion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>Founders who want limited liability protection</span>
              </li>
            </ul>
          </div>
        </ArticleSection>

        {/* LLP */}
        <ArticleSection heading="2. Limited Liability Partnership (LLP)">
          <ArticleText>
            An LLP combines the flexibility of a partnership with the limited liability of a company. 
            It's governed by the Limited Liability Partnership Act, 2008<InlineCitation number={2} id="companies-act-2013" />, 
            and is popular among professional service firms and businesses that don't plan to raise 
            external equity.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Key Characteristics
            </h4>
            <ul className="space-y-3 text-lg text-graphite-800">
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span><strong>Minimum partners:</strong> 2 (no maximum limit)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span><strong>Capital requirement:</strong> No minimum capital requirement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span><strong>Liability:</strong> Limited to the extent of contribution</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span><strong>Taxation:</strong> Pass-through taxation (partners pay tax individually)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span><strong>Incorporation time:</strong> 7-10 working days</span>
              </li>
            </ul>
          </div>

          <CalloutBox type="warning" title="Fundraising Limitation">
            <p>
              <strong>Critical for startups:</strong> LLPs cannot issue equity shares or raise funds 
              through venture capital/private equity easily. Most VCs will not invest in LLPs due to 
              structural constraints. If you plan to raise institutional capital, choose Pvt Ltd instead.
            </p>
          </CalloutBox>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Formation Cost
            </h4>
            <div className="bg-graphite-50 p-6 border-2 border-graphite-200">
              <div className="text-center">
                <div className="font-serif text-5xl font-bold text-ink mb-2">
                  ₹10,000 - ₹18,000
                </div>
                <div className="text-sm uppercase tracking-widest text-graphite-600">
                  All-Inclusive (Govt + Professional Fees)
                </div>
              </div>
            </div>
          </div>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Best Suited For
            </h4>
            <ul className="space-y-2 text-lg text-graphite-800">
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>Professional service firms (law, CA, consultancy)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>Businesses bootstrapping without external funding plans</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>Family businesses with multiple partners</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>When lower compliance burden is preferred</span>
              </li>
            </ul>
          </div>
        </ArticleSection>

        {/* One Person Company */}
        <ArticleSection heading="3. One Person Company (OPC)">
          <ArticleText>
            Introduced in the Companies Act 2013<InlineCitation number={2} id="companies-act-2013" />, 
            an OPC allows a single entrepreneur to operate as a corporate entity with limited liability. 
            It's ideal for solo founders who want corporate benefits without partners.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Structure & Requirements
            </h4>
            <Checklist items={[
              { text: 'Only 1 director/shareholder required (must be Indian citizen & resident)' },
              { text: 'Must nominate another person who will become director in case of death/incapacity' },
              { text: 'Cannot carry out non-banking financial investment activities' },
              { text: 'Cannot convert into Section 8 company (NPO)' },
              { text: 'Automatic conversion to Pvt Ltd if turnover exceeds ₹2 crore or paid-up capital exceeds ₹50 lakh' },
            ]} />
          </div>

          <CalloutBox type="info" title="Formation Cost">
            <p className="text-graphite-800">
              <strong>₹8,000 - ₹15,000</strong> (government + professional fees)
            </p>
            <p className="text-sm text-graphite-600 mt-2">
              Slightly lower than Pvt Ltd due to simpler structure
            </p>
          </CalloutBox>

          <PullQuote
            quote="An OPC is perfect for solo founders testing an idea. But plan your exit strategy — you'll need to convert to Pvt Ltd before raising VC money."
            citation="Common practice in Indian startup ecosystem"
          />

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              When to Choose OPC
            </h4>
            <ul className="space-y-2 text-lg text-graphite-800">
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>You're a solo founder with no immediate co-founder plans</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>You want limited liability but lower compliance than Pvt Ltd</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>Your business is service-oriented or B2B with modest scale</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">✓</span>
                <span>You're bootstrapping and not seeking VC funding immediately</span>
              </li>
            </ul>
          </div>
        </ArticleSection>

        {/* Partnership & Sole Proprietorship */}
        <ArticleSection heading="4. Partnership & Sole Proprietorship">
          <ArticleText>
            These are the simplest business structures, requiring minimal paperwork and capital. 
            However, they come with significant personal liability risks and are generally not 
            recommended for tech startups or businesses planning to scale.
          </ArticleText>

          <div className="my-8">
            <DataTable
              headers={['Structure', 'Liability', 'Formation Cost', 'Best For']}
              rows={[
                [
                  'Sole Proprietorship',
                  'Unlimited personal liability',
                  '₹3,000 - ₹8,000',
                  'Freelancers, consultants, small retail'
                ],
                [
                  'Partnership Firm',
                  'Unlimited (for general partners)',
                  '₹5,000 - ₹12,000',
                  'Professional services, family businesses'
                ],
              ]}
              caption="Simplified structures comparison"
            />
          </div>

          <CalloutBox type="warning" title="Critical Limitation">
            <p>
              <strong>Personal liability exposure:</strong> In both structures, your personal assets 
              (home, car, savings) are at risk if the business faces legal issues or debt. This makes 
              them unsuitable for high-risk ventures or businesses dealing with large contracts.
            </p>
          </CalloutBox>
        </ArticleSection>

        {/* Section 8 Company */}
        <ArticleSection heading="5. Section 8 Company (Not-for-Profit)">
          <ArticleText>
            Section 8 of the Companies Act allows formation of companies for promoting arts, science, 
            education, charity, or other social causes — with profits reinvested rather than distributed 
            to shareholders<InlineCitation number={2} id="companies-act-2013" />.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Key Features
            </h4>
            <ul className="space-y-3 text-lg text-graphite-800">
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span>No minimum capital requirement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span>Tax exemptions under 12A & 80G of Income Tax Act</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span>Cannot distribute profits to members</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span>Eligible for CSR funding and government grants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ink font-semibold">•</span>
                <span>Requires license from MCA before incorporation (30-45 days)</span>
              </li>
            </ul>
          </div>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Ideal For Social Enterprises
            </h4>
            <p className="text-lg text-graphite-800 leading-relaxed mb-4">
              EdTech platforms offering free education, HealthTech serving underserved communities, 
              environmental initiatives, skill development programs, and other impact-focused ventures.
            </p>
          </div>
        </ArticleSection>

        {/* US Comparison */}
        <ArticleSection heading="US Structures: Quick Overview">
          <ArticleText>
            For founders considering US incorporation or international expansion, here's how Indian 
            structures map to US equivalents<InlineCitation number={4} id="us-sba-structures" />:
          </ArticleText>

          <div className="my-8">
            <DataTable
              headers={['India', 'US Equivalent', 'Key Difference']}
              rows={[
                [
                  'Private Limited',
                  'C-Corporation (Delaware)',
                  'C-Corps have double taxation; India has dividend distribution tax'
                ],
                [
                  'LLP',
                  'LLC (Limited Liability Company)',
                  'LLC has more flexible management structure'
                ],
                [
                  'OPC',
                  'Single-Member LLC',
                  'US allows non-resident single members'
                ],
                [
                  'Partnership',
                  'General Partnership',
                  'Similar structures, both have unlimited liability'
                ],
              ]}
              caption="India-US incorporation structure comparison, 2024"
            />
          </div>

          <CalloutBox type="tip" title="Delaware C-Corp for Global Startups">
            <p>
              If you're building a global SaaS product or plan to raise from US VCs, consider a 
              <strong> Delaware C-Corporation </strong> with an Indian subsidiary. This &quot;flip&quot; 
              structure is used by companies like Flipkart, Ola, Zomato, and most US-backed Indian 
              unicorns.
            </p>
            <p className="mt-3 text-sm text-graphite-600">
              Cost: $500-$2,000 for incorporation + $299/year Delaware franchise tax + legal fees
            </p>
          </CalloutBox>
        </ArticleSection>

        {/* Annual Compliance */}
        <ArticleSection heading="Annual Compliance Requirements">
          <ArticleText>
            Once incorporated, maintaining compliance is critical to avoid penalties and maintain 
            good standing with the Ministry of Corporate Affairs<InlineCitation number={1} id="mca-incorporation" />.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Private Limited Company Annual Compliance
            </h4>
            
            <Checklist items={[
              { text: 'File Annual Return (Form MGT-7) within 60 days of AGM' },
              { text: 'File Financial Statements (Form AOC-4) within 30 days of AGM' },
              { text: 'Conduct Board Meetings (minimum 4 per year, gap not exceeding 120 days)' },
              { text: 'Hold Annual General Meeting (within 6 months of financial year end)' },
              { text: 'File Income Tax Return (by September 30 each year)' },
              { text: 'File TDS returns (quarterly if applicable)' },
              { text: 'GST returns (monthly/quarterly depending on turnover)' },
              { text: 'Maintain statutory registers and minute books' },
            ]} />
          </div>

          <CalloutBox type="warning" title="Penalty for Non-Compliance">
            <p className="text-graphite-800">
              Late filing attracts penalties ranging from <strong>₹100/day to ₹200/day</strong> plus 
              additional fees. Directors may also face prosecution for continued defaults.
            </p>
          </CalloutBox>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              Compliance Cost (Annual)
            </h4>
            <div className="bg-graphite-50 p-6 border-2 border-graphite-200">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-graphite-700">Auditor fees</span>
                  <span className="font-semibold">₹15,000 - ₹30,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-graphite-700">ROC filing fees</span>
                  <span className="font-semibold">₹5,000 - ₹8,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-graphite-700">CA fees (tax + compliance)</span>
                  <span className="font-semibold">₹20,000 - ₹40,000</span>
                </div>
                <div className="flex justify-between border-t-2 border-graphite-300 pt-3 mt-3">
                  <span className="font-bold text-ink">Total (approx)</span>
                  <span className="font-bold text-ink">₹40,000 - ₹78,000/year</span>
                </div>
              </div>
            </div>
          </div>
        </ArticleSection>

        {/* Decision Framework */}
        <ArticleSection heading="Decision Framework: Which Structure is Right for You?">
          <ArticleText>
            Use this flowchart to determine the best structure for your startup:
          </ArticleText>

          <div className="my-12 p-8 bg-graphite-50 border-2 border-ink">
            <div className="space-y-6">
              <div className="border-l-4 border-ink pl-6">
                <p className="font-semibold text-ink mb-2">→ Planning to raise VC/PE funding?</p>
                <p className="text-graphite-700 mb-4"><strong>YES</strong> → Choose <strong>Private Limited Company</strong></p>
              </div>

              <div className="border-l-4 border-graphite-400 pl-6">
                <p className="font-semibold text-ink mb-2">→ Professional service or family business?</p>
                <p className="text-graphite-700 mb-4"><strong>YES</strong> → Choose <strong>LLP</strong> (if no funding plans)</p>
              </div>

              <div className="border-l-4 border-graphite-400 pl-6">
                <p className="font-semibold text-ink mb-2">→ Solo founder, bootstrapping?</p>
                <p className="text-graphite-700 mb-4"><strong>YES</strong> → Choose <strong>OPC</strong> (convert to Pvt Ltd later if needed)</p>
              </div>

              <div className="border-l-4 border-graphite-400 pl-6">
                <p className="font-semibold text-ink mb-2">→ Social impact / non-profit?</p>
                <p className="text-graphite-700 mb-4"><strong>YES</strong> → Choose <strong>Section 8 Company</strong></p>
              </div>

              <div className="border-l-4 border-graphite-400 pl-6">
                <p className="font-semibold text-ink mb-2">→ Small retail/service with minimal risk?</p>
                <p className="text-graphite-700"><strong>YES</strong> → <strong>Sole Proprietorship</strong> might work (but consider liability)</p>
              </div>
            </div>
          </div>
        </ArticleSection>

        {/* Downloads */}
        <section className="mt-16 pt-12 border-t-2 border-graphite-200">
          <h2 className="font-serif text-3xl font-bold text-ink mb-6">
            Download Templates & Checklists
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/templates/incorporation-checklist.pdf"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Incorporation Checklist</h4>
                <p className="text-sm text-graphite-600">Complete document list for Pvt Ltd</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/compliance-calendar.pdf"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Annual Compliance Calendar</h4>
                <p className="text-sm text-graphite-600">Never miss a filing deadline</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/moa-aoa-sample.pdf"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Sample MoA & AoA</h4>
                <p className="text-sm text-graphite-600">Startup-friendly templates</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/cost-calculator.xlsx"
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

        {/* References */}
        <References citations={citations} />

        {/* Next Module */}
        <section className="mt-16 pt-12 border-t-2 border-ink bg-graphite-50 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 py-12">
          <h3 className="text-sm uppercase tracking-widest text-graphite-600 font-semibold mb-4">
            Next Module
          </h3>
          <Link
            href="/learn/finance"
            className="group block"
          >
            <h2 className="font-serif text-4xl font-bold text-ink mb-4 group-hover:underline">
              Finance, Funding & Cap Tables →
            </h2>
            <p className="text-xl text-graphite-700 mb-6">
              Master funding stages, equity structures, unit economics, and investor due diligence.
            </p>
            <div className="inline-flex items-center gap-2 text-ink font-semibold group-hover:gap-4 transition-all">
              Continue Learning
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </section>
      </ArticleSpread>
    </LearnLayout>
  );
}
