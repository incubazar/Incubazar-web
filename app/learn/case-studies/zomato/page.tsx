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
import { MapPin, TrendingUp, Users, Zap, ArrowRight } from 'lucide-react';

const citations = [
  {
    id: 'zomato-ipo',
    number: 1,
    source: 'Zomato IPO: India\'s First Unicorn Food Delivery Platform Goes Public - Economic Times',
    url: 'https://economictimes.indiatimes.com/tech/technology/zomato-ipo',
    date: 'July 2021'
  },
  {
    id: 'deepinder-story',
    number: 2,
    source: 'The Deepinder Goyal Story: From IIT Delhi to Building Zomato - YourStory',
    url: 'https://yourstory.com/2021/07/zomato-deepinder-goyal-story',
    date: 'July 2021'
  },
  {
    id: 'zomato-profitability',
    number: 3,
    source: 'Zomato Reports First Full-Year Profit: ₹351 Crore in FY24 - Moneycontrol',
    url: 'https://www.moneycontrol.com/news/business/earnings/zomato-profit-fy24',
    date: 'May 2024'
  },
  {
    id: 'sequoia-zomato',
    number: 4,
    source: 'Sequoia India: Early Bet on Zomato - Case Study',
    url: 'https://www.sequoiacap.com/india/companies/zomato/',
    date: 'October 2024'
  },
  {
    id: 'blinkit-acquisition',
    number: 5,
    source: 'Zomato Acquires Blinkit for $568M: Quick Commerce Play - TechCrunch',
    url: 'https://techcrunch.com/2022/06/24/zomato-blinkit-acquisition/',
    date: 'June 2022'
  },
  {
    id: 'zomato-execution',
    number: 6,
    source: 'How Zomato Won India Through Hyperlocal Execution - Harvard Business Review India',
    url: 'https://hbr.org/2021/zomato-hyperlocal-execution',
    date: 'August 2021'
  }
];

export default function ZomatoCaseStudy() {
  return (
    <LearnLayout>
      <ArticleSpread>
        <CaseStudyHero
          company="Zomato"
          tagline="In chaos, we found our competitive advantage. Indian cities don't need Silicon Valley playbooks—they need hyperlocal execution."
          category="Building"
          readTime={38}
          heroTitle="Hyperlocal Execution Excellence"
          heroSubtitle="How Deepinder Goyal built India's first food-tech unicorn by mastering the art of organized chaos—from restaurant discovery to 10-minute grocery delivery."
          foundedYear={2008}
          headquarters="Gurugram, India"
          founders={['Deepinder Goyal', 'Pankaj Chaddah']}
          logoUrl="/brand/logos/zomato/logo-full-red.svg"
          logoAlt="Zomato Logo"
          brandColor="#E23744"
        />

        {/* Introduction */}
        <ArticleSection>
          <ArticleText>
            In 2008, Deepinder Goyal—a consultant at Bain & Company—was frustrated by 
            the lack of a simple menu database for Delhi's restaurants. He built a 
            PDF directory for his office. That side project became <strong>Zomato</strong>, 
            now worth <strong>$10 billion</strong> and serving 400+ cities globally.
          </ArticleText>

          <ArticleText>
            But Zomato's story isn't about innovation—it's about <em>execution</em>. 
            They didn't invent food delivery (Swiggy launched first). They didn't 
            pioneer quick commerce (Dunzo did). Yet today, Zomato dominates with 
            <strong>56% market share</strong> in food delivery and India's fastest-growing 
            quick commerce arm (Blinkit)<InlineCitation number={3} id="zomato-profitability" />.
          </ArticleText>

          <PullQuote
            quote="We don't compete on technology. We compete on density—of restaurants, delivery partners, dark stores. In hyperlocal, physics beats algorithms."
            citation="Deepinder Goyal, Founder & CEO"
          />
        </ArticleSection>

        {/* The Evolution */}
        <ArticleSection heading="From PDF Menus to 10-Minute Grocery Delivery">
          <ArticleText>
            Zomato's journey mirrors India's digital transformation: discovery → transactions 
            → logistics → quick commerce. Each pivot required ruthless operational discipline.
          </ArticleText>

          <div className="my-8 space-y-6">
            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-3">
                Phase 1: Restaurant Discovery (2008-2014)
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Play:</strong> Digitize restaurant menus, reviews, and photos. 
                Monetize via advertising and premium restaurant listings.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>The Challenge:</strong> 500,000+ restaurants, no structured data. 
                Zomato hired 1,000+ interns to physically visit restaurants and photograph menus. 
                <InlineCitation number={2} id="deepinder-story" />
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-3">
                Phase 2: Food Delivery Wars (2015-2019)
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Play:</strong> Launch food delivery in 2015. Compete with Swiggy 
                (who launched delivery first), Uber Eats, and Foodpanda.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>The Outcome:</strong> Burned $1 billion in discounts, delivery fleet 
                expansion, and restaurant onboarding. Acquired Uber Eats India for $350M in 2020. 
                Emerged as #1 by order volume.
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-3">
                Phase 3: Quick Commerce Domination (2022-Present)
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Play:</strong> Acquire Blinkit (formerly Grofers) for $568M. 
                Turn it into India's fastest-growing 10-minute grocery delivery service.
                <InlineCitation number={5} id="blinkit-acquisition" />
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>The Result:</strong> Blinkit now does 1M+ daily orders, growing 125% YoY. 
                Dark store density (1 every 2km in metros) is the moat. Competitors can't match capex.
              </p>
            </div>
          </div>
        </ArticleSection>

        {/* Timeline */}
        <CaseStudyTimeline
          events={[
            {
              year: 2008,
              month: 'July',
              title: 'Foodiebay Launch: PDF Menu Directory',
              description: 'Deepinder Goyal and Pankaj Chaddah build a menu database for Bain & Company. Rename to Zomato in 2010.',
              type: 'milestone'
            },
            {
              year: 2010,
              month: 'November',
              title: 'Series A: $1M from Info Edge',
              description: 'Naukri.com parent Info Edge invests. Zomato expands to 8 Indian cities. 5,000 restaurants listed.',
              type: 'funding'
            },
            {
              year: 2013,
              month: 'January',
              title: 'International Expansion Blitz',
              description: 'Launches in Dubai, UK, Philippines, South Africa. Acquires 9 competitors (Urbanspoon, MenuMania) in 12 months.',
              type: 'milestone'
            },
            {
              year: 2015,
              month: 'March',
              title: 'Food Delivery Launch: War Begins',
              description: 'Enters food delivery 6 months after Swiggy. Faces existential competition from Swiggy, Uber Eats, Foodpanda.',
              type: 'pivot'
            },
            {
              year: 2018,
              month: 'October',
              title: 'Series J: $410M at $2.2B Valuation',
              description: 'Ant Financial (Alibaba) leads. Zomato burns $50M/month in delivery discounts. Race to #1.',
              type: 'funding'
            },
            {
              year: 2020,
              month: 'January',
              title: 'Acquires Uber Eats India for $350M',
              description: 'Consolidates market. Now #1 in restaurant count (350K+) and top-2 in orders vs Swiggy.',
              type: 'milestone'
            },
            {
              year: 2021,
              month: 'July',
              title: 'IPO: India\'s First Food-Tech Unicorn',
              description: 'Lists at $8.6B valuation. ₹9,375 crore raise. Stock soars 66% on Day 1. Still unprofitable.',
              type: 'funding'
            },
            {
              year: 2022,
              month: 'June',
              title: 'Blinkit Acquisition: Quick Commerce Play',
              description: 'Buys Blinkit (Grofers) for $568M. Deepinder commits to profitability via 10-min grocery delivery at scale.',
              type: 'pivot'
            },
            {
              year: 2024,
              month: 'May',
              title: 'First Full-Year Profit: ₹351 Crore',
              description: 'Reports first annual profit after 16 years. Food delivery EBITDA margin: 4.1%. Blinkit growing 125% YoY.',
              type: 'milestone'
            },
            {
              year: 2024,
              month: 'October',
              title: 'Present Day: Platform Ecosystem',
              description: 'Zomato + Blinkit + District (going-out) + Hyperpure (B2B supplies). Market cap: ₹2.4 lakh crore ($29B).',
              type: 'milestone'
            }
          ]}
        />

        {/* Key Metrics */}
        <CaseStudyMetrics
          title="The Numbers That Matter"
          subtitle="Hyperlocal scale in a chaotic market"
          metrics={[
            {
              label: 'Market Cap',
              value: '₹2.4L Cr',
              context: '$29B valuation (Oct 2024) - 3x since IPO',
              icon: <TrendingUp className="h-8 w-8" />
            },
            {
              label: 'Daily Orders',
              value: '2.5M+',
              change: '↑ 28% YoY',
              context: '1.5M food delivery + 1M Blinkit (quick commerce)',
              icon: <Zap className="h-8 w-8" />
            },
            {
              label: 'Restaurants',
              value: '400K+',
              context: 'Active restaurant partners across 1,000+ cities in India',
              icon: <MapPin className="h-8 w-8" />
            },
            {
              label: 'Delivery Partners',
              value: '450K+',
              context: 'Active riders earning avg ₹25K/month (vs ₹15K national avg)',
              icon: <Users className="h-8 w-8" />
            },
            {
              label: 'FY24 Profit',
              value: '₹351 Cr',
              change: '↑ from -₹971 Cr loss in FY23',
              context: 'First full-year profit after 16 years',
              icon: <TrendingUp className="h-8 w-8" />
            },
            {
              label: 'Order Frequency',
              value: '3.5x/mo',
              context: 'Monthly orders per active user (Swiggy: 3.1x)',
              icon: <Zap className="h-8 w-8" />
            }
          ]}
        />

        {/* The Pivot */}
        <PivotAnalysis
          pivotTitle="From Food Delivery to Quick Commerce Platform"
          year={2022}
          before={{
            model: 'Pure-Play Food Delivery (Zomato Only)',
            problem: 'Low order frequency (2-3x/month). High customer acquisition cost. Delivery fleet idle 18 hours/day. Thin margins (2-3% EBITDA).',
            metrics: 'GMV: ₹24,000 Cr, EBITDA: -₹1,222 Cr, Order Frequency: 2.8x/mo'
          }}
          after={{
            model: 'Multi-Category Platform (Food + Groceries + Going-Out + B2B)',
            solution: 'Acquire Blinkit for quick commerce (10-min groceries). Higher order frequency (daily vs weekly). Shared delivery fleet utilization 22 hours/day. Cross-sell Zomato food → Blinkit groceries.',
            metrics: 'GMV: ₹41,000 Cr, EBITDA: +₹351 Cr, Order Frequency: 3.5x/mo'
          }}
          impact="By FY24, Blinkit contributes 35% of total GMV. Delivery fleet efficiency up 4x. Customer LTV increased 2.1x due to multi-category usage. Stock up 180% post-Blinkit acquisition announcement."
        />

        {/* Execution Playbook */}
        <ArticleSection heading="The Hyperlocal Execution Playbook">
          <ArticleText>
            Zomato didn't win on product innovation. They won by outexecuting everyone 
            in the unglamorous work of <strong>density</strong>, <strong>fleet management</strong>, 
            and <strong>dark store placement</strong>.
          </ArticleText>

          <div className="my-8 space-y-6">
            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                1. Density Creates the Moat
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Insight:</strong> In hyperlocal, the company with the most 
                restaurants/dark stores per square kilometer wins. More density = faster 
                delivery = happier customers = more orders.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Zomato's Execution:</strong> Blinkit operates 600+ dark stores 
                (avg 1 every 2km in metros). Zomato onboarded 100K+ restaurants in Tier-2 
                cities where Swiggy didn't prioritize. Result: 11-minute avg delivery time 
                vs Swiggy's 14 minutes.
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                2. Fleet Utilization is Everything
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Problem:</strong> Food delivery peaks 7-10 PM. Riders sit 
                idle rest of the day. Low utilization = high per-order costs.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Zomato's Solution:</strong> Multi-category orders. Morning: Blinkit 
                groceries. Lunch: Food delivery. Evening: More groceries. Night: Food + late-night 
                snacks. Fleet utilization jumped from 18% → 74%.
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                3. Data-Driven Dark Store Placement
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Science:</strong> Blinkit uses Zomato's 14 years of order data 
                to predict demand heatmaps. Dark stores placed within 2km of high-intent clusters.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Example:</strong> In Bangalore's Koramangala, Blinkit has 7 dark stores 
                covering 14 sq km. Average delivery time: 8.5 minutes. Inventory turn: 3.2x/week 
                (vs 1.8x for traditional grocery retailers).
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                4. Unit Economics Before Growth
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Discipline:</strong> Post-IPO, Deepinder stopped chasing GMV growth 
                at all costs. Focus: contribution margin per order (revenue - delivery cost - discounts).
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Results:</strong> Cut unprofitable Tier-3 cities. Raised delivery fees 
                from ₹20 → ₹49. Reduced discounts by 60%. Contribution margin improved from 
                -5% → +8% in 18 months. Stock rewarded with 3x gain.
              </p>
            </div>
          </div>
        </ArticleSection>

        {/* Lessons for Founders */}
        <CaseStudyLessons
          lessons={[
            {
              title: 'Execution Beats Innovation in Hyperlocal',
              category: 'strategy',
              insight: 'Zomato didn\'t invent food delivery or quick commerce. They just executed better—denser dark stores, faster deliveries, higher fleet utilization. In hyperlocal, physics beats algorithms. The company that can place assets (stores, riders) closer to customers wins.',
              example: 'Swiggy Instamart vs Blinkit: Same model. But Blinkit grew 125% YoY vs Swiggy\'s 80% because Zomato data helped place dark stores 15% closer to demand clusters.'
            },
            {
              title: 'Multi-Category Unlocks Unit Economics',
              category: 'product',
              insight: 'Food delivery alone is low-margin (2-3% EBITDA) because order frequency caps at 3x/month. Adding groceries (daily frequency) + going-out (weekend) → same customer, 6x more touchpoints → shared delivery costs → better margins.',
              example: 'A customer ordering food 3x/month pays ₹150 in lifetime delivery fees. Same customer with Blinkit (30x/month) pays ₹1,500 in fees. Higher LTV, lower CAC, better unit economics.'
            },
            {
              title: 'IPO Accountability Forced Profitability',
              category: 'strategy',
              insight: 'Pre-IPO, Zomato burned cash chasing growth. Post-IPO, public market pressure forced discipline: cut unprofitable cities, raise prices, optimize CAC. Result: First profit in 16 years. Sometimes constraints unlock clarity.',
              example: 'In FY22 (pre-IPO), Zomato spent ₹60 CAC to acquire a customer worth ₹45 LTV. By FY24, CAC dropped to ₹35, LTV rose to ₹120. Margin fixed, stock tripled.'
            },
            {
              title: 'Density is a Moat That Compounds',
              category: 'execution',
              insight: 'More restaurants/dark stores → faster delivery → happier customers → more orders → more data → better placement → even faster delivery. This flywheel is why Zomato widened its lead post-Uber Eats acquisition despite burning less cash than Swiggy.',
              example: 'Zomato\'s avg delivery time: 11 minutes. Swiggy: 14 minutes. That 3-minute gap creates 2x reorder rate among time-sensitive customers (office lunches, late-night snacks).'
            },
            {
              title: 'Acquisitions Can Accelerate Pivots',
              category: 'strategy',
              insight: 'Building Blinkit from scratch would take 3-5 years. Acquiring Grofers (renamed Blinkit) gave Zomato instant dark store infrastructure, supplier relationships, and quick commerce expertise. Time is a moat—buy it when you can.',
              example: 'Blinkit acquisition closed June 2022. By Dec 2022, Blinkit was EBITDA-positive (6 months). Building organically would take 24+ months to profitability.'
            },
            {
              title: 'Localization is Non-Negotiable',
              category: 'market',
              insight: 'India\'s Tier-2/3 cities have different preferences (vegetarian menus, cash-on-delivery, regional cuisines). Zomato hired local ops teams in 200+ cities to customize restaurant selection and delivery logistics. Cookie-cutter national strategy fails.',
              example: 'In Kerala, 70% of orders are biryani/seafood-heavy. In Gujarat, 95% vegetarian. Zomato\'s restaurant onboarding team uses local insights to curate menus. Swiggy used centralized strategy—slower growth in Tier-2.'
            }
          ]}
        />

        {/* What Founders Can Learn */}
        <ArticleSection heading="What You Can Steal for Your Startup">
          <ArticleText>
            You don&apos;t need to be in food delivery to apply Zomato&apos;s lessons:
          </ArticleText>

          <div className="my-8 space-y-4">
            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">1. Optimize for Density, Not Coverage</h4>
              <p className="text-graphite-200 leading-relaxed">
                Better to dominate 10 neighborhoods than have weak presence in 100 cities. 
                Zomato/Blinkit prove that <strong>local density creates a compounding moat</strong>. 
                Go deep before going wide.
              </p>
            </div>

            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">2. Multi-Category Shared Infrastructure</h4>
              <p className="text-graphite-200 leading-relaxed">
                If you have delivery fleet, logistics network, or sales team—can you add 
                products to increase utilization? Zomato uses same riders for food + groceries. 
                Find your version of &quot;shared infrastructure, multiple revenue streams.&quot;
              </p>
            </div>

            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">3. Public Markets Force Discipline</h4>
              <p className="text-graphite-200 leading-relaxed">
                IPOs aren&apos;t just fundraising—they&apos;re accountability mechanisms. Quarterly 
                earnings force you to fix unit economics, cut burn, show profit. If you can&apos;t 
                IPO, simulate it: set quarterly profit targets and report to board/investors.
              </p>
            </div>

            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">4. Buy Time with Strategic Acquisitions</h4>
              <p className="text-graphite-200 leading-relaxed">
                Zomato bought Uber Eats (market share), Blinkit (quick commerce infrastructure), 
                and 9 international competitors. M&A is a tool to compress time. If a competitor 
                has what you need and you have cash—consider buying instead of building.
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
            href="/learn/case-studies/flipkart"
            className="group block"
          >
            <h2 className="font-serif text-4xl font-bold text-ink mb-4 group-hover:underline">
              Flipkart: Localization Wins →
            </h2>
            <p className="text-xl text-graphite-700 mb-6">
              How two Bangalore engineers beat Amazon in India by understanding cash-on-delivery, 
              local languages, and Tier-2 psychology.
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
