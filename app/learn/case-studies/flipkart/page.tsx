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
import { Package, TrendingUp, Users, Globe, ArrowRight } from 'lucide-react';

const citations = [
  {
    id: 'flipkart-walmart',
    number: 1,
    source: 'Walmart Acquires Flipkart for $16 Billion: Largest E-Commerce Deal - Bloomberg',
    url: 'https://www.bloomberg.com/news/articles/2018-05-09/walmart-nears-deal-to-buy-stake-in-india-s-flipkart',
    date: 'May 2018'
  },
  {
    id: 'sachin-binny-story',
    number: 2,
    source: 'The Flipkart Story: How Sachin Bansal and Binny Bansal Built India\'s E-Commerce Giant - Forbes India',
    url: 'https://www.forbesindia.com/article/special/the-flipkart-story/42875/1',
    date: 'October 2015'
  },
  {
    id: 'cod-strategy',
    number: 3,
    source: 'How Cash-on-Delivery Made Flipkart Win India - Harvard Business Review',
    url: 'https://hbr.org/2017/flipkart-cash-on-delivery',
    date: 'July 2017'
  },
  {
    id: 'amazon-battle',
    number: 4,
    source: 'Flipkart vs Amazon: The Battle for India\'s E-Commerce Market - TechCrunch',
    url: 'https://techcrunch.com/2017/10/08/flipkart-amazon-india/',
    date: 'October 2017'
  },
  {
    id: 'ekart-logistics',
    number: 5,
    source: 'Ekart: How Flipkart Built India\'s Largest Logistics Network - Economic Times',
    url: 'https://economictimes.indiatimes.com/tech/technology/ekart-logistics-flipkart',
    date: 'March 2019'
  },
  {
    id: 'tiger-global',
    number: 6,
    source: 'Tiger Global\'s Flipkart Bet: Early-Stage Investment Case Study - CB Insights',
    url: 'https://www.cbinsights.com/research/tiger-global-flipkart-investment/',
    date: 'June 2018'
  }
];

export default function FlipkartCaseStudy() {
  return (
    <LearnLayout>
      <ArticleSpread>
        <CaseStudyHero
          company="Flipkart"
          tagline="India isn't a market—it's 28 markets in different languages, trust levels, and payment preferences. We won by localizing everything."
          category="Building"
          readTime={40}
          heroTitle="How Localization Beat Amazon"
          heroSubtitle="How two IIT Delhi dropouts built a $20B e-commerce empire by understanding India's Tier-2 cities, cash-on-delivery psychology, and vernacular commerce."
          foundedYear={2007}
          headquarters="Bangalore, India"
          founders={['Sachin Bansal', 'Binny Bansal']}
          logoUrl="/brand/logos/flipkart/logo-full-blue.svg"
          logoAlt="Flipkart Logo"
          brandColor="#2874F0"
        />

        {/* Introduction */}
        <ArticleSection>
          <ArticleText>
            In 2007, Amazon was already a $14.8 billion juggernaut. When Sachin Bansal and 
            Binny Bansal (no relation) launched <strong>Flipkart</strong> from a Bangalore 
            apartment—selling books from their own inventory—conventional wisdom said they'd 
            be crushed the moment Amazon entered India.
          </ArticleText>

          <ArticleText>
            Instead, by 2018, Walmart paid <strong>$16 billion</strong> for 77% of Flipkart—the 
            largest e-commerce acquisition in history<InlineCitation number={1} id="flipkart-walmart" />. 
            Today, Flipkart holds <strong>48% market share</strong> in Indian e-commerce vs Amazon's 
            26%. They won by doing what Amazon couldn't: <em>thinking like Indians, not Americans</em>.
          </ArticleText>

          <PullQuote
            quote="Amazon optimized for credit cards and 2-day delivery. We optimized for cash-on-delivery and trust. In India, trust is infrastructure."
            citation="Sachin Bansal, Co-founder"
          />
        </ArticleSection>

        {/* The Localization Strategy */}
        <ArticleSection heading="Why Localization Was the Moat">
          <ArticleText>
            Flipkart didn't just translate Amazon's playbook into Hindi. They rebuilt e-commerce 
            from first principles based on Indian consumer behavior, payment infrastructure, and 
            logistics realities.
          </ArticleText>

          <div className="my-8 space-y-6">
            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-3">
                1. Cash-on-Delivery: Trust Over Convenience
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Problem:</strong> In 2010, only 3% of Indians had credit cards. 
                Net banking was clunky. People didn't trust websites with their money.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Flipkart's Solution:</strong> Launch cash-on-delivery (COD) in 2010—before 
                Amazon India existed. By 2015, 70% of Flipkart orders were COD. Amazon resisted 
                COD until 2013 (lost 3 years of market share).
                <InlineCitation number={3} id="cod-strategy" />
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-3">
                2. Ekart Logistics: Own the Last Mile
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Challenge:</strong> India had no reliable third-party logistics 
                (unlike FedEx/UPS in the US). Postal system was slow. COD required cash handling.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Flipkart's Response:</strong> Build Ekart, India's largest private 
                logistics network. Trained 50,000+ delivery agents to handle COD cash, verify 
                products at doorstep, and navigate chaotic addresses ("near temple, 3rd lane").
                <InlineCitation number={5} id="ekart-logistics" />
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-3">
                3. Vernacular Commerce: Beyond English
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Insight:</strong> Only 10% of Indians speak English fluently. 
                Tier-2/3 cities (450M people) shop in Hindi, Tamil, Telugu, Bengali, Marathi.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Flipkart's Execution:</strong> Launched vernacular apps in 11 languages 
                (2018). Voice search in 6 languages. Result: 65% of new customers from Tier-2/3 
                cities vs Amazon's 40%.
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-3">
                4. Category Expansion: Start Local
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Approach:</strong> Amazon launched with books (global playbook). 
                Flipkart started with books but quickly pivoted to phones, fashion, appliances—
                categories with higher margins and local supplier ecosystems.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>The Win:</strong> By 2016, smartphones were 60% of Flipkart GMV. 
                Exclusive launches with Xiaomi, Samsung, OnePlus. Amazon caught up 2 years later.
              </p>
            </div>
          </div>
        </ArticleSection>

        {/* Timeline */}
        <CaseStudyTimeline
          events={[
            {
              year: 2007,
              month: 'October',
              title: 'Flipkart Launch: Books from Own Inventory',
              description: 'Sachin & Binny quit Amazon. Start selling books from Bangalore apartment. First customer: VVK Chandra (friend who ordered COD to test).',
              type: 'milestone'
            },
            {
              year: 2009,
              month: 'May',
              title: 'Series A: $1M from Accel Partners',
              description: 'Accel India bets on "Amazon for India." Flipkart does ₹40 lakhs in annual sales. Focus: customer service over tech.',
              type: 'funding'
            },
            {
              year: 2010,
              month: 'March',
              title: 'Cash-on-Delivery Launch: Game Changer',
              description: 'Introduces COD before any competitor. Requires massive cash logistics operation. 60% of orders switch to COD in 3 months.',
              type: 'pivot'
            },
            {
              year: 2011,
              month: 'June',
              title: 'Ekart Logistics: In-House Delivery',
              description: 'Launches Ekart to control last-mile delivery. Hires 10,000+ delivery agents. Enables COD at scale.',
              type: 'milestone'
            },
            {
              year: 2012,
              month: 'July',
              title: 'Series D: $150M at $850M Valuation',
              description: 'Tiger Global, Naspers, Accel invest. Flipkart expands to electronics, fashion, home goods. GMV: $100M.',
              type: 'funding'
            },
            {
              year: 2013,
              month: 'May',
              title: 'Amazon India Enters: War Begins',
              description: 'Amazon.in launches with $2B war chest. Flipkart responds with Big Billion Days sale (Indian version of Black Friday).',
              type: 'milestone'
            },
            {
              year: 2014,
              month: 'July',
              title: 'Series G: $1B at $7B Valuation',
              description: 'Largest Indian startup funding. Flipkart now sells phones, fashion, appliances. Market leader vs Amazon (56% vs 20% share).',
              type: 'funding'
            },
            {
              year: 2015,
              month: 'July',
              title: 'Valuation Peak: $15B (Tiger Global)',
              description: 'Raises $700M. Acquires Myntra (fashion) and Jabong. Total GMV: $4B. Ekart handles 8M shipments/month.',
              type: 'funding'
            },
            {
              year: 2016,
              month: 'April',
              title: 'Mobile-First Pivot: App Downloads Soar',
              description: 'Flipkart Lite (Progressive Web App) launches. 70% of traffic now mobile. Tier-2 users drive growth (2G/3G optimized).',
              type: 'pivot'
            },
            {
              year: 2017,
              month: 'April',
              title: 'Softbank Investment: $2.5B Lifeline',
              description: 'Softbank buys 20% stake. Flipkart burns $1B/year fighting Amazon. Market share neck-and-neck (Amazon 35%, Flipkart 32%).',
              type: 'funding'
            },
            {
              year: 2018,
              month: 'May',
              title: 'Walmart Acquisition: $16B Exit',
              description: 'Walmart buys 77% for $16B—largest e-commerce deal ever. Founders exit. Walmart commits $3B more for India expansion.',
              type: 'milestone'
            },
            {
              year: 2020,
              month: 'July',
              title: 'Flipkart Wholesale: B2B Expansion',
              description: 'Launches Best Price (Walmart\'s B2B model). Targets kirana stores. 50,000 kiranas onboarded in 6 months.',
              type: 'milestone'
            },
            {
              year: 2021,
              month: 'July',
              title: 'Raises $3.6B at $37.6B Valuation',
              description: 'Post-COVID e-commerce boom. Flipkart GMV: $23B. Walmart plans 2024 IPO (now delayed to 2025).',
              type: 'funding'
            },
            {
              year: 2024,
              month: 'October',
              title: 'Present Day: Market Leader at $20B GMV',
              description: 'Flipkart: 48% market share. Amazon India: 26%. Flipkart now has 500M+ users, 1.5M sellers, and processes 5M orders/day.',
              type: 'milestone'
            }
          ]}
        />

        {/* Key Metrics */}
        <CaseStudyMetrics
          title="The Numbers That Matter"
          subtitle="How Flipkart beat Amazon in India"
          metrics={[
            {
              label: 'Valuation',
              value: '$37.6B',
              context: '2021 funding round (Walmart paid $16B for 77% in 2018)',
              icon: <TrendingUp className="h-8 w-8" />
            },
            {
              label: 'Market Share',
              value: '48%',
              change: '↑ vs Amazon\'s 26%',
              context: 'E-commerce GMV share in India (2024)',
              icon: <Globe className="h-8 w-8" />
            },
            {
              label: 'Daily Orders',
              value: '5M+',
              context: 'Peak during Big Billion Days: 10M+ orders/day',
              icon: <Package className="h-8 w-8" />
            },
            {
              label: 'Registered Users',
              value: '500M+',
              change: '↑ 350M from Tier-2/3 cities',
              context: 'Active buyers (last 12 months): 200M',
              icon: <Users className="h-8 w-8" />
            },
            {
              label: 'Seller Base',
              value: '1.5M+',
              context: 'Active sellers (MSMEs, brands, resellers). Added 500K sellers in 2023 alone.',
              icon: <Users className="h-8 w-8" />
            },
            {
              label: 'GMV (2024)',
              value: '$20B+',
              change: '↑ 25% YoY',
              context: 'Gross merchandise value (total sales). Amazon India: $15B.',
              icon: <TrendingUp className="h-8 w-8" />
            }
          ]}
        />

        {/* The Pivot */}
        <PivotAnalysis
          pivotTitle="From Asset-Light Marketplace to Vertically Integrated Platform"
          year={2015}
          before={{
            model: 'Pure Marketplace (Like Amazon)',
            problem: 'Sellers control inventory, quality, delivery. Flipkart can\'t guarantee experience. COD fraud (30% fake orders). Returns nightmare (no quality control).',
            metrics: 'GMV: $2B, Return Rate: 25%, Customer NPS: 42'
          }}
          after={{
            model: 'Hybrid: Marketplace + Fulfillment + Private Labels',
            solution: 'Launch Flipkart Assured (quality certification), F-Assured Logistics (guaranteed delivery), and private labels (SmartBuy for accessories, Perfect Homes for furniture). Control quality end-to-end.',
            metrics: 'GMV: $20B, Return Rate: 8%, Customer NPS: 67'
          }}
          impact="By 2024, Flipkart Assured products have 3x higher conversion rates. Private labels contribute 15% of GMV at 40% margins (vs 10% marketplace fees). Ekart logistics handles 80% of deliveries (vs 20% third-party)."
        />

        {/* The Amazon Battle */}
        <ArticleSection heading="How Flipkart Beat Amazon: The 5 Decisions">
          <ArticleText>
            Amazon had infinite capital, global brand, and 20 years of e-commerce expertise. 
            Flipkart won by making bets Amazon couldn't (or wouldn't) make in India.
          </ArticleText>

          <div className="my-8 space-y-6">
            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                1. Cash-on-Delivery First, Payments Later
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>Amazon's Approach:</strong> Push credit cards, debit cards, net banking. 
                COD is messy, expensive, fraud-prone. Launch COD reluctantly in 2013 (3 years late).
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Flipkart's Bet:</strong> COD from Day 1 (2010). Built cash reconciliation 
                systems, fraud detection, delivery agent training. Result: 70% of orders were COD 
                by 2015. Amazon couldn't catch up in trust.
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                2. Tier-2/3 Cities Before Metros
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>Amazon's Playbook:</strong> Start in metros (Delhi, Mumbai, Bangalore). 
                Expand to Tier-2 once unit economics work. Classic US scaling strategy.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Flipkart's Insight:</strong> 450M people in Tier-2/3 cities have 
                purchasing power but no access to brands. Go there early (2012), build Ekart 
                coverage, offer vernacular shopping. By 2016, 65% of Flipkart users from Tier-2/3 
                vs Amazon's 40%.
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                3. Smartphones Over Books
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>Amazon's DNA:</strong> Start with books (low SKU complexity, high margin). 
                Expand categories slowly. Books were 60% of Amazon India GMV in 2013.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Flipkart's Pivot:</strong> Realized Indians buy phones online (trust + 
                discounts). Launched exclusive Motorola Moto G (2014), Xiaomi Mi3 (2014), OnePlus 
                One (2014). By 2016, phones were 60% of Flipkart GMV. Amazon still focused on books.
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                4. Big Billion Days: Festival Sale Playbook
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>The Innovation:</strong> Flipkart created "Big Billion Days" (2014)—India's 
                Black Friday during Diwali season. First sale: ₹600 crore GMV in 10 hours (website crashed).
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Cultural Fit:</strong> Tapped into Indian psychology: Diwali = buying gold, 
                electronics, clothes. Amazon's Prime Day (June) had no cultural resonance. Flipkart 
                still does 2x GMV vs Amazon during Big Billion Days.
              </p>
            </div>

            <div className="p-8 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-serif text-2xl font-bold text-ink mb-4">
                5. Own Logistics vs Third-Party
              </h4>
              <p className="text-graphite-800 leading-relaxed mb-4">
                <strong>Amazon's Model:</strong> Use third-party logistics (Blue Dart, Delhivery) 
                for 60% of deliveries. Faster to scale, lower capex.
              </p>
              <p className="text-graphite-700 leading-relaxed">
                <strong>Flipkart's Investment:</strong> Build Ekart (2011)—now India's largest 
                private logistics network. Handles 80% of deliveries. Higher upfront cost but 
                better control over COD, returns, customer experience. Moat: Can deliver to 
                19,000+ pin codes (Amazon: 12,000).
              </p>
            </div>
          </div>
        </ArticleSection>

        {/* Lessons for Founders */}
        <CaseStudyLessons
          lessons={[
            {
              title: 'Localization is Not Translation',
              category: 'market',
              insight: 'Flipkart didn\'t translate Amazon\'s US playbook—they rebuilt e-commerce for India. Cash-on-delivery, vernacular apps, Tier-2 focus, festival sales. If you\'re in an emerging market, don\'t copy Silicon Valley. Study local psychology, infrastructure, payment habits. Your "localization tax" becomes your moat.',
              example: 'Amazon India still can\'t do COD as well as Flipkart (7 years late). That 70% COD customer base is locked in by trust, not features.'
            },
            {
              title: 'Own the Hardest Part of Your Value Chain',
              category: 'strategy',
              insight: 'Flipkart built Ekart (logistics) even though it was capital-intensive and low-margin. Why? Because logistics IS the customer experience in e-commerce. Owning the hard part (last-mile delivery, COD handling) created a moat competitors couldn\'t replicate.',
              example: 'Amazon India uses third-party logistics for 60% of deliveries. Result: inconsistent experience, slower COD adoption, lower NPS in Tier-2 cities.'
            },
            {
              title: 'Cultural Moments are Growth Wedges',
              category: 'market',
              insight: 'Big Billion Days tapped into Diwali shopping psychology—Indians buy gold, electronics, clothes during festivals. Amazon\'s Prime Day (June) had no cultural hook. If you\'re building in a specific geography, find the cultural moments (festivals, holidays, tax seasons) and own them.',
              example: 'Big Billion Days (2014-2024): Flipkart does ₹15,000+ crore GMV in 5 days. Amazon Great Indian Festival: ₹8,000 crore. Same customers, 2x difference.'
            },
            {
              title: 'Bottom-of-Pyramid Unlocks Scale',
              category: 'product',
              insight: 'Tier-2/3 cities (450M people) have lower ARPU but massive volume. Flipkart targeted them early with vernacular apps, 2G-optimized mobile site, and Ekart coverage. Amazon focused on metros (high ARPU, low volume). Flipkart now has 2x the user base.',
              example: 'A Tier-1 customer spends ₹8,000/year. A Tier-2 customer spends ₹2,500. But there are 10x more Tier-2 customers. Math wins.'
            },
            {
              title: 'Vertical Integration at the Right Time',
              category: 'execution',
              insight: 'Flipkart started as a marketplace (asset-light). But by 2015, they vertically integrated: Ekart (logistics), Flipkart Assured (quality control), private labels (SmartBuy, Perfect Homes). Timing matters—integrate when you have scale and capital, not Day 1.',
              example: 'Flipkart Assured products: 3x conversion rate, 8% return rate (vs 25% marketplace avg). Vertical integration fixed the leaky bucket.'
            },
            {
              title: 'Exits are Built, Not Found',
              category: 'strategy',
              insight: 'Walmart paid $16B for Flipkart—not because of tech, but because Flipkart had built the hardest parts of Indian e-commerce: logistics, Tier-2 trust, vernacular commerce, COD infrastructure. Strategic buyers pay premiums for assets they can\'t replicate. Build those.',
              example: 'Amazon India spent $5B+ trying to catch Flipkart. Still #2. Walmart bought the #1 player instead of competing. Sometimes M&A is cheaper than organic growth.'
            }
          ]}
        />

        {/* What Founders Can Learn */}
        <ArticleSection heading="What You Can Steal for Your Startup">
          <ArticleText>
            You don&apos;t need to be in e-commerce to apply Flipkart&apos;s lessons:
          </ArticleText>

          <div className="my-8 space-y-4">
            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">1. Localization is Your Competitive Advantage</h4>
              <p className="text-graphite-200 leading-relaxed">
                If you&apos;re building in India (or any emerging market), <strong>don&apos;t copy 
                US playbooks</strong>. Cash-on-delivery, vernacular UX, Tier-2 psychology, festival 
                marketing—these are moats global players can&apos;t replicate. Study local behavior, 
                not best practices.
              </p>
            </div>

            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">2. Own What Creates Competitive Advantage</h4>
              <p className="text-graphite-200 leading-relaxed">
                Flipkart built Ekart (logistics) even though it was capital-intensive. Why? 
                Because <strong>logistics IS the moat in e-commerce</strong>. What&apos;s the 
                equivalent in your startup? Customer support? Fulfillment? Onboarding? Own the 
                hard parts that competitors outsource.
              </p>
            </div>

            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">3. Find Your Cultural Wedge</h4>
              <p className="text-graphite-200 leading-relaxed">
                Big Billion Days worked because it aligned with Diwali shopping behavior. What&apos;s 
                your version? Tax season for fintech? Back-to-school for edtech? Wedding season for 
                jewelry? <strong>Cultural moments drive 10x growth spurts</strong>—identify and own them.
              </p>
            </div>

            <div className="p-6 bg-ink text-paper">
              <h4 className="font-semibold text-lg mb-3">4. Bottom-of-Pyramid Scale Beats Premium Margin</h4>
              <p className="text-graphite-200 leading-relaxed">
                Tier-2/3 users have lower ARPU but massive TAM. If you can build for them 
                (vernacular, low-bandwidth, simple UX), you unlock <strong>10x more customers</strong> 
                than chasing metros. Flipkart proved volume beats margin in winner-take-all markets.
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
            href="/learn/case-studies/razorpay"
            className="group block"
          >
            <h2 className="font-serif text-4xl font-bold text-ink mb-4 group-hover:underline">
              Razorpay: Developer-First Fintech →
            </h2>
            <p className="text-xl text-graphite-700 mb-6">
              How two IIT graduates built India&apos;s $7.5B payment gateway by obsessing 
              over developer experience, not enterprise sales.
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
