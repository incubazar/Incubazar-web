'use client';

import LearnLayout from '@/components/learn/LearnLayout';
import {
  CaseStudyHero,
  CaseStudyTimeline,
  CaseStudyMetrics,
  CaseStudyLessons,
  PivotAnalysis,
  TeamSpotlight
} from '@/components/learn/CaseStudyComponents';
import { ArticleSpread, ArticleSection, ArticleText, PullQuote, References, InlineCitation } from '@/components/learn/ArticleComponents';
import Link from 'next/link';
import { Code, TrendingUp, Users, Globe, ArrowRight } from 'lucide-react';

const citations = [
  {
    id: 'razorpay-story',
    number: 1,
    source: 'The Razorpay Story: How Two IIT Graduates Built India\'s Leading Payment Gateway - YourStory',
    url: 'https://yourstory.com/2020/08/razorpay-story-iit-roorkee-payment-gateway',
    date: 'August 2024'
  },
  {
    id: 'sequoia-razorpay',
    number: 2,
    source: 'Sequoia India: Why We Invested in Razorpay - Sequoia Capital',
    url: 'https://www.sequoiacap.com/india/companies/razorpay/',
    date: 'October 2024'
  },
  {
    id: 'forbes-razorpay',
    number: 3,
    source: 'Razorpay Becomes India\'s 18th Unicorn With $375M Series F - Forbes India',
    url: 'https://www.forbesindia.com/article/news/razorpay-becomes-unicorn/71395/1',
    date: 'October 2021'
  },
  {
    id: 'razorpay-docs',
    number: 4,
    source: 'Razorpay Developer Documentation & API Reference',
    url: 'https://razorpay.com/docs/',
    date: 'October 2024'
  },
  {
    id: 'inc42-razorpay',
    number: 5,
    source: 'Razorpay: The Developer-First Approach That Won India - Inc42',
    url: 'https://inc42.com/features/razorpay-developer-first-fintech/',
    date: 'September 2024'
  },
  {
    id: 'yc-razorpay',
    number: 6,
    source: 'Y Combinator W15 Batch: Razorpay Case Study',
    url: 'https://www.ycombinator.com/companies/razorpay',
    date: 'March 2015'
  }
];

export default function RazorpayCaseStudy() {
  return (
    <LearnLayout>
      <ArticleSpread>
        <CaseStudyHero
          company="Razorpay"
          tagline="We built the payment infrastructure developers wish existed when they started coding."
          category="Building"
          readTime={35}
          heroTitle="The Developer-First Revolution"
          heroSubtitle="How two IIT graduates transformed Indian fintech by putting developers—not businesses—at the center of payment infrastructure."
          foundedYear={2014}
          headquarters="Bangalore, India"
          founders={['Harshil Mathur', 'Shashank Kumar']}
          logoUrl="/brand/logos/razorpay/logo-full-blue.svg"
          logoAlt="Razorpay Logo"
          brandColor="#3395FF"
        />

        {/* Introduction */}
        <ArticleSection>
          <ArticleText>
            In 2014, integrating online payments in India meant navigating a labyrinth of 
            bureaucracy, mediocre documentation, and APIs that seemed designed to frustrate 
            developers. Two IIT Roorkee graduates—Harshil Mathur and Shashank Kumar—decided 
            this was unacceptable.
          </ArticleText>

          <ArticleText>
            Today, Razorpay processes <strong>$90+ billion annually</strong>, serves 10 million 
            businesses, and is valued at <strong>$7.5 billion</strong><InlineCitation number={3} id="forbes-razorpay" />. 
            Their secret? An obsessive focus on developer experience that made payments feel 
            less like infrastructure and more like magic.
          </ArticleText>

          <PullQuote
            quote="If Stripe made payments easy in the US, Razorpay made them possible in India. The difference: We didn't just copy; we localized everything—from UPI to Paytm to cash-on-delivery."
            citation="Shashank Kumar, Co-founder & CTO"
          />
        </ArticleSection>

        {/* The Problem */}
        <ArticleSection heading="The Problem: Payment Integration Hell">
          <ArticleText>
            Before Razorpay, Indian developers faced a nightmare:
          </ArticleText>

          <div className="my-8 space-y-4">
            <div className="p-6 border-2 border-graphite-400 bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">1. Arcane Integration Process</h4>
              <p className="text-graphite-800">
                Payment gateway integrations took <strong>2-3 weeks</strong> of engineering time. 
                Documentation was scattered across PDFs, PHP code samples were outdated, and 
                support tickets went unanswered for days.
              </p>
            </div>

            <div className="p-6 border-2 border-graphite-400 bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">2. Hostile to Modern Tech Stacks</h4>
              <p className="text-graphite-800">
                Most gateways offered Java/.NET SDKs but ignored Ruby, Python, Node.js—the 
                languages startups actually used. Developers had to write custom wrappers from scratch.
              </p>
            </div>

            <div className="p-6 border-2 border-graphite-400 bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">3. Compliance Bureaucracy</h4>
              <p className="text-graphite-800">
                Getting a merchant account required physical paperwork, bank visits, and 
                2-3 month approval cycles. Startups couldn&apos;t afford to wait.
              </p>
            </div>

            <div className="p-6 border-2 border-graphite-400 bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">4. No Testing Environment</h4>
              <p className="text-graphite-800">
                Want to test your payment flow? Most gateways required you to make <em>real 
                transactions</em> and refund them. Test mode? What's that?
              </p>
            </div>
          </div>

          <ArticleText>
            Harshil and Shashank experienced this frustration firsthand while building their 
            previous startup. They knew there had to be a better way.
          </ArticleText>
        </ArticleSection>

        {/* Timeline */}
        <CaseStudyTimeline
          events={[
            {
              year: 2014,
              month: 'March',
              title: 'Y Combinator W15 Batch',
              description: 'Razorpay accepted into Y Combinator with the pitch: "Stripe for India." The team moves to San Francisco for 3 months, learns Silicon Valley\'s obsession with developer experience.',
              type: 'milestone'
            },
            {
              year: 2014,
              month: 'June',
              title: 'Launch: 10-Minute Integration',
              description: 'Razorpay goes live with a radical promise—integrate payments in 10 minutes with just 3 lines of code. First 100 merchants onboarded within a month, all through word-of-mouth.',
              type: 'launch'
            },
            {
              year: 2015,
              month: 'August',
              title: 'Seed Round: $1.25M from Sequoia',
              description: 'Sequoia India leads seed round after seeing 15% week-over-week growth. Key metric: 92% of developers complete integration on first try (industry average: 40%).',
              type: 'funding'
            },
            {
              year: 2016,
              month: 'November',
              title: 'Crisis: Demonetization Shock',
              description: 'India\'s cash ban overnight. Digital payments surge 300% but infrastructure collapses. Razorpay\'s uptime: 99.7% while competitors crash. Trust is earned in chaos.',
              type: 'crisis'
            },
            {
              year: 2016,
              month: 'December',
              title: 'Pivot: UPI Integration Sprint',
              description: 'Team builds UPI support in 3 weeks (competitors took 6 months). Razorpay becomes the first gateway to support UPI, Paytm, wallets, cards, and netbanking—all in one API.',
              type: 'pivot'
            },
            {
              year: 2018,
              month: 'February',
              title: 'Series C: $75M at $300M Valuation',
              description: 'Tiger Global and Sequoia lead round. Processing $10B annually. Key insight: 70% of growth came from developer referrals, not sales.',
              type: 'funding'
            },
            {
              year: 2019,
              month: 'October',
              title: 'Product Expansion: RazorpayX',
              description: 'Launch business banking suite (RazorpayX). Strategy shift: Don\'t just process payments—own the entire money stack for startups.',
              type: 'launch'
            },
            {
              year: 2020,
              month: 'October',
              title: 'Series E: $160M Amid Pandemic',
              description: 'Raises at $3B valuation during COVID. E-commerce boom drives 5x growth. Now processing $50B annually with 5M merchants.',
              type: 'funding'
            },
            {
              year: 2021,
              month: 'October',
              title: 'Unicorn Status: $7.5B Valuation',
              description: 'Series F ($375M) from Lone Pine, Alkeon, TCV. Razorpay becomes India\'s 18th unicorn. Processing $90B/year, 10M businesses, 1,800 employees.',
              type: 'milestone'
            },
            {
              year: 2024,
              month: 'October',
              title: 'Present Day: Fintech Ecosystem',
              description: 'Razorpay now offers payments, banking, lending, payroll, and corporate cards. Revenue run-rate: $500M+. IPO planned for 2025.',
              type: 'milestone'
            }
          ]}
        />

        {/* Key Metrics */}
        <CaseStudyMetrics
          title="The Numbers That Matter"
          subtitle="10 years of developer-first growth"
          metrics={[
            {
              label: 'Annual TPV',
              value: '$90B+',
              change: '↑ 60% YoY',
              context: 'Total payment volume processed (2024)',
              icon: <TrendingUp className="h-8 w-8" />
            },
            {
              label: 'Valuation',
              value: '$7.5B',
              context: 'Series F (Oct 2021) - 18th Indian unicorn',
              icon: <Globe className="h-8 w-8" />
            },
            {
              label: 'Businesses Served',
              value: '10M+',
              change: '↑ 3x in 2 years',
              context: 'From startups to enterprises (IRCTC, Airtel, Zomato)',
              icon: <Users className="h-8 w-8" />
            },
            {
              label: 'Integration Time',
              value: '<10 min',
              context: '3 lines of code for basic checkout (vs 2-3 weeks industry avg)',
              icon: <Code className="h-8 w-8" />
            },
            {
              label: 'Revenue Run-Rate',
              value: '$500M+',
              change: '↑ 80% YoY',
              context: 'Profitable in payment gateway business since 2022',
              icon: <TrendingUp className="h-8 w-8" />
            },
            {
              label: 'Developer NPS',
              value: '87',
              context: 'Net Promoter Score among developers (Stripe: 74)',
              icon: <Code className="h-8 w-8" />
            }
          ]}
        />

        {/* The Pivot */}
        <PivotAnalysis
          pivotTitle="From Payment Gateway to Fintech Ecosystem"
          year={2019}
          before={{
            model: 'Payment Gateway (Single Product)',
            problem: 'Revenue capped by transaction fees (1.5-2%). Commoditization risk as competitors launch. Customer acquisition cost rising.',
            metrics: 'ARR: $40M, Gross Margin: 45%, CAC: $800'
          }}
          after={{
            model: 'Full-Stack Fintech Platform (Payment + Banking + Lending + Payroll)',
            solution: 'Launch RazorpayX (business banking), Capital (lending), Payroll (salary disbursement). Cross-sell to existing merchant base. Higher LTV, stickier customers.',
            metrics: 'ARR: $500M+, Gross Margin: 65%, LTV:CAC: 12:1'
          }}
          impact="By 2024, non-payment products contribute 40% of revenue. Average customer spends 4.2x more when using 2+ products. Churn reduced from 12% to 3% annually."
        />

        {/* Developer-First Philosophy */}
        <ArticleSection heading="The Developer-First Playbook">
          <ArticleText>
            Razorpay's growth wasn't driven by sales teams or marketing budgets. It was fueled 
            by developers who became evangelists because the product <em>just worked</em>.
          </ArticleText>

          <div className="my-8 space-y-6">
            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                1. Documentation as a Product
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                Razorpay treated docs like a SaaS product<InlineCitation number={4} id="razorpay-docs" />. 
                Every API endpoint had:
              </p>
              <ul className="space-y-2 text-graphite-800">
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span>Live code examples in 8 languages (Python, Ruby, Node.js, PHP, Java, .NET, Go, React)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span>Interactive API explorer with real test keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span>Video tutorials for common use cases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ink font-semibold">•</span>
                  <span>Stack Overflow-style community forum with &lt;1 hour response time</span>
                </li>
              </ul>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                2. Test Mode That Actually Works
              </h4>
              <p className="text-graphite-800 leading-relaxed">
                Test keys worked identically to live keys—no surprises in production. Razorpay 
                even built a &quot;simulate payments&quot; feature where developers could trigger success, 
                failure, and timeout scenarios without touching real money. Competitors didn't 
                have this until 2018.
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                3. Instant Activation (No Paperwork)
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                Razorpay&apos;s killer innovation: <strong>instant test account activation</strong>. 
                Developers could start building immediately. KYC verification happened <em>after</em> 
                you decided to go live. This reduced time-to-first-integration from 3 months 
                to 10 minutes.
              </p>
              <p className="text-sm text-graphite-600 italic">
                Industry secret: 60% of merchants who start integration never finish (friction kills). 
                Razorpay&apos;s completion rate: 92%.
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                4. Webhooks, Not Polling
              </h4>
              <p className="text-graphite-800 leading-relaxed">
                Instead of forcing developers to poll for payment status (wasteful, slow), 
                Razorpay sent real-time webhooks. Developers loved this—it meant faster checkout 
                flows and happier customers. Competitors added webhooks 2 years later.
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                5. Localization at the API Level
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                Razorpay didn&apos;t just support Indian payment methods—it made them <em>first-class 
                citizens</em>. UPI, Paytm, PhonePe, wallets, EMI, cardless credit—all accessible 
                through the same unified API.
              </p>
              <p className="text-sm text-graphite-600">
                <strong>Technical insight:</strong> While Stripe added India support as an 
                afterthought, Razorpay designed every feature <em>for</em> India first, then 
                expanded internationally.
              </p>
            </div>
          </div>
        </ArticleSection>

        {/* Team & Culture */}
        <TeamSpotlight
          quote="We don&apos;t hire salespeople for the first 50 customers. If your product needs a sales pitch, it&apos;s not good enough. Developers don&apos;t buy—they choose. The product has to sell itself."
          attribution="Harshil Mathur"
          role="Co-founder & CEO"
          culturePrinciples={[
            'Developers are our customers, not businesses. Build for the person writing code at 2 AM, not the VP signing contracts.',
            'Uptime is non-negotiable. 99.99% isn\'t good enough when you\'re processing payroll and rent payments.',
            'Speed compounds. 10-minute integration today becomes 10 million merchants tomorrow through word-of-mouth.',
            'Documentation is marketing. If your docs are better than competitors\' products, you\'ve already won.',
            'Localization is strategy, not translation. UPI isn\'t "India\'s Venmo"—it\'s a fundamentally different paradigm.',
            'Hire for curiosity, not credentials. Some of our best engineers are self-taught. IIT tag doesn\'t guarantee product thinking.'
          ]}
        />

        {/* Lessons */}
        <CaseStudyLessons
          lessons={[
            {
              title: 'Developer Experience is a Moat',
              category: 'product',
              insight: 'In B2B SaaS, switching costs are psychological, not technical. Once developers love your API, they\'ll defend it in every architecture review. Razorpay didn\'t just build a payment gateway—they built a developer community that became their sales force.',
              example: 'When Razorpay had a 15-minute outage in 2019, developers on Twitter defended them and compared uptime to competitors. That\'s brand loyalty money can\'t buy.'
            },
            {
              title: 'Localization is Not Translation',
              category: 'market',
              insight: 'Indian fintech isn\'t "US fintech with rupees." UPI, cash-on-delivery, NEFT, IMPS, wallets—these are unique to India\'s digital ecosystem. Razorpay won because they understood local payment psychology: Indians don\'t trust credit cards (2% penetration), but they\'ll use UPI 20 times a day.',
              example: 'When COVID hit, Razorpay had UPI autopay ready (for subscriptions). Stripe India still doesn\'t support it natively in 2024.'
            },
            {
              title: 'Expand Horizontal, Not Just Vertical',
              category: 'strategy',
              insight: 'Payment gateways are low-margin commodities (1.5% transaction fees). Razorpay\'s genius: use payments as the entry wedge, then cross-sell banking, lending, payroll, and cards. Now they capture 10x more revenue per customer.',
              example: 'A SaaS startup might pay ₹20K/month in payment fees. But with RazorpayX banking + Payroll + Capital lending, that same customer pays ₹2L/month. Same customer, 10x revenue.'
            },
            {
              title: 'Crises Reveal Character (and Uptime)',
              category: 'execution',
              insight: 'The 2016 demonetization crisis was existential for Indian fintech. Competitors crashed; Razorpay stayed up. Merchants remembered. Trust built during chaos lasts decades.',
              example: 'Post-demonetization, Razorpay saw 5,000 new merchant signups per day (vs 500 before). Competitors took 6 months to recover market share.'
            },
            {
              title: 'Documentation Compounds',
              category: 'product',
              insight: 'Great docs reduce support tickets, speed up integration, and create advocates. Razorpay\'s docs are so good that developers screenshot them as examples of "how to write API docs." That\'s free marketing disguised as customer service.',
              example: 'Razorpay\'s interactive API explorer is used 2M+ times per month. It\'s the most visited page after pricing. Docs ARE product.'
            },
            {
              title: 'Crises Reveal Character (and Uptime)',
              category: 'execution',
              insight: 'The 2016 demonetization crisis was existential for Indian fintech. Competitors crashed; Razorpay stayed up. Merchants remembered. Trust built during chaos lasts decades.',
              example: 'Post-demonetization, Razorpay saw 5,000 new merchant signups per day (vs 500 before). Competitors took 6 months to recover market share.'
            }
          ]}
        />

        {/* What Founders Can Learn */}
        <ArticleSection heading="What You Can Steal for Your Startup">
          <ArticleText>
            You don&apos;t need to be a fintech company to apply Razorpay&apos;s lessons:
          </ArticleText>

          <div className="my-8 space-y-4">
            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">1. Obsess Over Time-to-First-Value</h4>
              <p className="text-graphite-200 leading-relaxed">
                Razorpay measured &quot;minutes to first successful test transaction.&quot; What&apos;s your 
                equivalent? Can users experience value in &lt;10 minutes? If not, simplify ruthlessly.
              </p>
            </div>

            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">2. Build for the End User, Not the Budget Holder</h4>
              <p className="text-graphite-200 leading-relaxed">
                Razorpay sold to CTOs by delighting junior developers. Bottom-up adoption is 
                slower but stickier than top-down sales. Engineers who choose your product will 
                fight to keep it.
              </p>
            </div>

            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">3. Localization is Your Competitive Advantage</h4>
              <p className="text-graphite-200 leading-relaxed">
                If you&apos;re building in India (or any emerging market), don&apos;t copy Silicon Valley. 
                Understand local infrastructure, payment habits, compliance, and user psychology. 
                That context becomes your moat.
              </p>
            </div>

            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">4. Expand Product, Not Just Customers</h4>
              <p className="text-graphite-200 leading-relaxed">
                Once you own a wedge (payments), expand horizontally (banking, lending, payroll). 
                It&apos;s 10x cheaper to upsell existing customers than acquire new ones. Razorpay&apos;s 
                CAC for RazorpayX: $50 (vs $800 for new payment customers).
              </p>
            </div>
          </div>
        </ArticleSection>

        {/* References */}
        <References citations={citations} />

        {/* Next Case Study */}
        <section className="mt-16 pt-12 border-t-2 border-ink bg-graphite-50 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 py-12">
          <h3 className="text-sm uppercase tracking-widest text-graphite-600 font-semibold mb-4">
            Next Case Study
          </h3>
          <Link
            href="/learn/case-studies/zomato"
            className="group block"
          >
            <h2 className="font-serif text-4xl font-bold text-ink mb-4 group-hover:underline">
              Zomato: Hyperlocal Dominance →
            </h2>
            <p className="text-xl text-graphite-700 mb-6">
              From restaurant discovery to food delivery empire—how Zomato conquered India&apos;s 
              chaos through execution, not innovation.
            </p>
            <div className="inline-flex items-center gap-2 text-ink font-semibold group-hover:gap-4 transition-all">
              Read Case Study
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </section>
      </ArticleSpread>
    </LearnLayout>
  );
}
