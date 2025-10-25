import LearnLayout from '@/components/learn/LearnLayout';
import {
  ArticleSpread,
  ArticleHeader,
  ArticleSection,
  ArticleText,
  DataTable,
  InlineCitation,
  References
} from '@/components/learn/ArticleComponents';
import Link from 'next/link';
import { TrendingUp, Users, DollarSign, Zap, ArrowRight } from 'lucide-react';

export default function TrendsPage() {
  const citations = [
    {
      id: '1',
      number: 1,
      source: 'Inc42 - Indian Startup Ecosystem Report 2024',
      url: 'https://inc42.com/reports/indian-startup-ecosystem-report-2024/',
      date: '2024'
    },
    {
      id: '2',
      number: 2,
      source: 'NASSCOM - Indian Tech Industry Strategic Review 2024',
      url: 'https://nasscom.in/knowledge-center/publications/indian-tech-industry-strategic-review-2024',
      date: '2024'
    },
    {
      id: '3',
      number: 3,
      source: 'CB Insights - State of Fintech Report Q3 2024',
      url: 'https://www.cbinsights.com/research/report/fintech-trends-q3-2024/',
      date: '2024'
    },
    {
      id: '4',
      number: 4,
      source: 'Bain & Company - India Digital Consumer Report 2024',
      url: 'https://www.bain.com/insights/india-digital-consumer-report-2024/',
      date: '2024'
    },
    {
      id: '5',
      number: 5,
      source: 'YourStory - Indian SaaS Market Analysis 2024',
      url: 'https://yourstory.com/2024/saas-market-analysis',
      date: '2024'
    },
    {
      id: '6',
      number: 6,
      source: 'RedSeer Consulting - E-commerce in India 2024',
      url: 'https://redseer.com/reports/e-commerce-india-2024/',
      date: '2024'
    },
    {
      id: '7',
      number: 7,
      source: 'McKinsey - Healthcare in India: Vision 2025',
      url: 'https://www.mckinsey.com/industries/healthcare/our-insights/healthcare-india-vision-2025',
      date: '2024'
    },
    {
      id: '8',
      number: 8,
      source: 'Venture Intelligence - EdTech Investment Trends 2024',
      url: 'https://www.ventureintelligence.com/edtech-trends-2024',
      date: '2024'
    },
    {
      id: '9',
      number: 9,
      source: 'Tracxn - D2C Brands in India Report 2024',
      url: 'https://tracxn.com/d/reports/d2c-brands-india-2024',
      date: '2024'
    }
  ];

  return (
    <LearnLayout>
      <ArticleSpread>
        <ArticleHeader
          category="Building"
          title="Industry Trends & Market Insights"
          subtitle="9 high-growth industries in India and USA—market size, key players, opportunities, and founder playbooks for Tech, Fintech, SaaS, and beyond"
          readTime={40}
          level="intermediate"
        />

        {/* Introduction */}
        <ArticleSection heading="Why Industry Context Matters">
          <ArticleText>
            Building a startup without understanding your industry is like sailing without a map. 
            You need to know: Is the market growing or shrinking? Who are the dominant players? 
            What gaps exist? What's the regulatory landscape?
          </ArticleText>

          <ArticleText>
            This module provides snapshots of 9 high-growth industries in India and USA. For each, 
            you&apos;ll get market sizing, growth rates, key players, opportunities for founders, and 
            strategic considerations. Use this as a reference when choosing your industry or 
            positioning against competitors.
          </ArticleText>
        </ArticleSection>

        {/* 1. Technology & Software */}
        <ArticleSection heading="1. Technology & Software">
          <ArticleText>
            The backbone of the modern economy—from cloud infrastructure to enterprise software 
            to developer tools. India is now the third-largest startup ecosystem globally, behind 
            only the US and China.<InlineCitation number={1} id="1" />
          </ArticleText>

          <DataTable
            headers={['Metric', 'India', 'USA', 'Growth (YoY)']}
            rows={[
              ['Market Size (2024)', '$254B', '$1.8T', '12-15%'],
              ['Tech Workforce', '5.4M', '12.2M', '8%'],
              ['Unicorns (2024)', '108', '653', '—'],
              ['VC Funding (2023)', '$10.5B', '$170B', '-35% (correction)'],
              ['Average ARR (SaaS)', '$2-5M', '$10-50M', '20%']
            ]}
            caption="Sources: NASSCOM, CB Insights, Crunchbase (2024)"
          />

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Key Players (India)
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Infosys, TCS, Wipro</strong> (IT services giants)</li>
                <li>• <strong>Zoho, Freshworks</strong> (SaaS unicorns)</li>
                <li>• <strong>Postman, Browserstack</strong> (dev tools)</li>
                <li>• <strong>Chargebee, Clevertap</strong> (B2B SaaS)</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-ink bg-paper">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Opportunities for Founders
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Vertical SaaS</strong> for niche industries (manufacturing, healthcare)</li>
                <li>• <strong>AI-powered tools</strong> (workflow automation, analytics)</li>
                <li>• <strong>Developer infrastructure</strong> (observability, security)</li>
                <li>• <strong>India-to-Global SaaS</strong> (build in India, sell worldwide)</li>
              </ul>
            </div>
          </div>

          <ArticleText>
            <strong>Strategic Considerations:</strong> India has cost advantage (engineering talent 
            40-60% cheaper than US) but lower willingness to pay. Most successful Indian tech companies 
            target US/EU customers while keeping dev teams in India. Expect 18-24 month sales cycles 
            for enterprise software in India vs 6-12 months in US.
          </ArticleText>
        </ArticleSection>

        {/* 2. Fintech */}
        <ArticleSection heading="2. Fintech & Financial Services">
          <ArticleText>
            Digital payments, lending, investing, insurance—fintech is revolutionizing how money moves. 
            India's UPI processed 131B transactions worth $2.3T in 2023, making it the world's most 
            advanced real-time payments system.<InlineCitation number={3} id="3" />
          </ArticleText>

          <DataTable
            headers={['Metric', 'India', 'USA', 'Growth (YoY)']}
            rows={[
              ['Market Size (2024)', '$150B', '$460B', '25%'],
              ['Digital Payment Users', '400M', '230M', '30%'],
              ['Fintech Unicorns', '21', '87', '—'],
              ['UPI Transactions (annual)', '131B', 'N/A', '58%'],
              ['Avg Transaction Value', '$18', '$95', '—']
            ]}
            caption="Sources: Inc42, CB Insights, NPCI (2024)"
          />

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Key Players (India)
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Paytm, PhonePe, Google Pay</strong> (payments)</li>
                <li>• <strong>Razorpay, Cashfree</strong> (payment gateways)</li>
                <li>• <strong>Zerodha, Groww</strong> (investing platforms)</li>
                <li>• <strong>Cred, Slice</strong> (credit cards, rewards)</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-ink bg-paper">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Opportunities for Founders
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Embedded finance</strong> (payments in non-finance apps)</li>
                <li>• <strong>SME lending</strong> (invoice financing, working capital)</li>
                <li>• <strong>Wealth management</strong> (robo-advisors, mutual funds)</li>
                <li>• <strong>Insurance tech</strong> (claims automation, micro-insurance)</li>
              </ul>
            </div>
          </div>

          <ArticleText>
            <strong>Regulatory Landscape:</strong> RBI (Reserve Bank of India) heavily regulates fintech. 
            Requires NBFC license for lending, PPI license for wallets, and insurance license for 
            insurance products. Compliance costs high but creates moats. US has state-by-state licensing 
            (money transmitter licenses in 48+ states) which is expensive but necessary.
          </ArticleText>
        </ArticleSection>

        {/* 3. SaaS (B2B Software) */}
        <ArticleSection heading="3. SaaS (B2B Software)">
          <ArticleText>
            Software-as-a-Service is the fastest-growing segment of enterprise tech. India is becoming 
            a global SaaS hub with 1,000+ companies generating $12B+ in revenue—on track to reach 
            $50B by 2030.<InlineCitation number={5} id="5" />
          </ArticleText>

          <DataTable
            headers={['Metric', 'India', 'USA', 'Growth (YoY)']}
            rows={[
              ['SaaS Revenue (2024)', '$12B', '$197B', '30%'],
              ['SaaS Companies', '1,000+', '17,000+', '25%'],
              ['Avg ARR (early-stage)', '$1-3M', '$5-10M', '—'],
              ['CAC Payback Period', '18-24 mo', '12-18 mo', '—'],
              ['NRR Benchmark', '100-110%', '110-120%', '—']
            ]}
            caption="Sources: YourStory, SaaSBOOMi, OpenView Partners (2024)"
          />

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Key Players (India)
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Freshworks</strong> (customer engagement, $500M ARR)</li>
                <li>• <strong>Zoho</strong> (all-in-one suite, $1B+ revenue)</li>
                <li>• <strong>Chargebee</strong> (subscription billing, $100M ARR)</li>
                <li>• <strong>Postman</strong> (API development, $200M ARR)</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-ink bg-paper">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Opportunities for Founders
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Vertical SaaS</strong> (industry-specific tools: real estate, logistics)</li>
                <li>• <strong>AI-powered SaaS</strong> (sales automation, customer support)</li>
                <li>• <strong>Workflow automation</strong> (no-code tools, integrations)</li>
                <li>• <strong>Developer tools</strong> (CI/CD, observability, security)</li>
              </ul>
            </div>
          </div>

          <ArticleText>
            <strong>Playbook for Indian SaaS Founders:</strong> Build for global markets from day one 
            (US/EU have 10x higher willingness to pay). Keep product & engineering in India (cost advantage), 
            but hire sales/marketing in target market. Aim for $100K ARR before raising seed round. 
            Benchmark: 3x YoY growth, 80%+ gross margin, 12-18 month CAC payback.
          </ArticleText>
        </ArticleSection>

        {/* 4. E-commerce & Retail Tech */}
        <ArticleSection heading="4. E-commerce & Retail Tech">
          <ArticleText>
            Online retail is booming in India with 500M+ internet users and rising smartphone penetration. 
            The market is expected to reach $350B by 2030, growing at 25% annually.<InlineCitation number={6} id="6" />
          </ArticleText>

          <DataTable
            headers={['Metric', 'India', 'USA', 'Growth (YoY)']}
            rows={[
              ['E-commerce GMV (2024)', '$85B', '$1.1T', '25%'],
              ['Online Shoppers', '220M', '270M', '20%'],
              ['Avg Order Value', '$38', '$120', '8%'],
              ['Mobile Commerce %', '75%', '45%', '—'],
              ['Top Category', 'Fashion', 'Electronics', '—']
            ]}
            caption="Sources: RedSeer Consulting, eMarketer (2024)"
          />

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Key Players (India)
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Amazon India, Flipkart</strong> (horizontal marketplaces)</li>
                <li>• <strong>Nykaa</strong> (beauty, $2B market cap)</li>
                <li>• <strong>Meesho</strong> (social commerce, 150M users)</li>
                <li>• <strong>FirstCry</strong> (baby products, IPO 2024)</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-ink bg-paper">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Opportunities for Founders
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Vertical commerce</strong> (niche categories: pets, home decor)</li>
                <li>• <strong>B2B e-commerce</strong> (wholesale, procurement platforms)</li>
                <li>• <strong>Quick commerce</strong> (10-15 min delivery for groceries)</li>
                <li>• <strong>Enabling tech</strong> (logistics SaaS, payment solutions)</li>
              </ul>
            </div>
          </div>

          <ArticleText>
            <strong>Unit Economics Reality Check:</strong> Most e-commerce companies operate at negative 
            margins due to discounts and logistics costs. Focus on: (1) high repeat purchase rate (40%+), 
            (2) average order value &gt;$50, (3) contribution margin &gt;20% after CAC. Quick commerce 
            (Zepto, Blinkit) burns $5-10 per order but betting on scale + frequency to reach profitability.
          </ArticleText>
        </ArticleSection>

        {/* 5. HealthTech */}
        <ArticleSection heading="5. HealthTech & Digital Health">
          <ArticleText>
            Healthcare is India's next big opportunity—with poor doctor-to-patient ratio (1:1,400 vs 
            WHO standard of 1:1,000) and rising chronic diseases. Digital health market expected to 
            reach $50B by 2030.<InlineCitation number={7} id="7" />
          </ArticleText>

          <DataTable
            headers={['Metric', 'India', 'USA', 'Growth (YoY)']}
            rows={[
              ['HealthTech Market (2024)', '$10B', '$150B', '35%'],
              ['Telemedicine Users', '50M', '80M', '40%'],
              ['E-pharmacy GMV', '$2.5B', '$75B', '50%'],
              ['Doctor-Patient Ratio', '1:1,400', '1:350', '—'],
              ['Out-of-Pocket Expense %', '63%', '11%', '—']
            ]}
            caption="Sources: McKinsey, Rock Health, MoHFW (2024)"
          />

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Key Players (India)
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Practo, 1mg</strong> (doctor discovery, e-pharmacy)</li>
                <li>• <strong>PharmEasy, Netmeds</strong> (online pharmacies)</li>
                <li>• <strong>Pristyn Care</strong> (surgical procedures, $1.4B valuation)</li>
                <li>• <strong>Cult.fit, HealthifyMe</strong> (fitness, wellness)</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-ink bg-paper">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Opportunities for Founders
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Chronic disease management</strong> (diabetes, hypertension monitoring)</li>
                <li>• <strong>AI diagnostics</strong> (radiology, pathology automation)</li>
                <li>• <strong>Mental health</strong> (therapy platforms, meditation apps)</li>
                <li>• <strong>Hospital SaaS</strong> (EMR, appointment booking, billing)</li>
              </ul>
            </div>
          </div>

          <ArticleText>
            <strong>Regulatory Hurdles:</strong> Telemedicine is regulated by National Medical Commission 
            (requires licensed doctors, no prescriptions for controlled substances). E-pharmacies need 
            state-level licenses (expensive, slow). Medical devices regulated by CDSCO. In US, HIPAA 
            compliance mandatory for patient data—non-compliance can result in $50K+ fines per violation.
          </ArticleText>
        </ArticleSection>

        {/* 6. EdTech */}
        <ArticleSection heading="6. EdTech & Online Learning">
          <ArticleText>
            COVID accelerated digital education adoption. India has 250M+ school students and 40M+ 
            college students—massive addressable market. However, sector faced correction in 2022-23 
            after overfunding.<InlineCitation number={8} id="8" />
          </ArticleText>

          <DataTable
            headers={['Metric', 'India', 'USA', 'Growth (YoY)']}
            rows={[
              ['EdTech Market (2024)', '$7.5B', '$150B', '15% (post-correction)'],
              ['Online Learners', '45M', '80M', '10%'],
              ['Avg Subscription Price', '$100-300/yr', '$500-2,000/yr', '—'],
              ['K-12 Market Share', '60%', '30%', '—'],
              ['Test Prep Market', '$2.5B', '$8B', '20%']
            ]}
            caption="Sources: Venture Intelligence, HolonIQ (2024)"
          />

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Key Players (India)
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>BYJU&apos;S</strong> (K-12, peak $22B valuation, now struggling)</li>
                <li>• <strong>Unacademy, Vedantu</strong> (test prep, live classes)</li>
                <li>• <strong>upGrad</strong> (upskilling, higher ed, $1.2B valuation)</li>
                <li>• <strong>Physics Wallah</strong> (affordable test prep, profitable)</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-ink bg-paper">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Opportunities for Founders
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Skills training</strong> (coding, digital marketing, sales)</li>
                <li>• <strong>Corporate L&D</strong> (employee training platforms)</li>
                <li>• <strong>Exam prep</strong> (NEET, JEE, UPSC, GRE, GMAT)</li>
                <li>• <strong>AI tutoring</strong> (personalized learning paths)</li>
              </ul>
            </div>
          </div>

          <ArticleText>
            <strong>Lessons from EdTech Crash:</strong> BYJU'S went from $22B to near-bankruptcy due to 
            aggressive acquisitions, high CAC ($500-1,000 per student), and low retention (40% annual churn). 
            Winning playbook: Physics Wallah kept CAC low ($50), priced affordably ($150/year vs BYJU'S 
            $1,500), and achieved profitability. Focus on retention over growth.
          </ArticleText>
        </ArticleSection>

        {/* 7. Logistics & Supply Chain */}
        <ArticleSection heading="7. Logistics & Supply Chain Tech">
          <ArticleText>
            India's logistics sector is highly fragmented—with 12M+ trucks, mostly owned by individual 
            operators. Tech startups are digitizing freight, warehousing, and last-mile delivery. Market 
            size expected to reach $380B by 2025.
          </ArticleText>

          <DataTable
            headers={['Metric', 'India', 'USA', 'Growth (YoY)']}
            rows={[
              ['Logistics Market (2024)', '$280B', '$1.6T', '10%'],
              ['E-commerce Logistics', '$8B', '$150B', '30%'],
              ['Avg Delivery Cost', '$0.50-1', '$5-8', '—'],
              ['Warehouse Space (sq ft)', '250M', '1.2B', '15%'],
              ['Last-Mile % of Cost', '40-50%', '30-40%', '—']
            ]}
            caption="Sources: IBEF, Statista (2024)"
          />

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Key Players (India)
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Delhivery</strong> (third-party logistics, IPO 2022)</li>
                <li>• <strong>Rivigo, BlackBuck</strong> (freight marketplace)</li>
                <li>• <strong>Dunzo, Shadowfax</strong> (hyperlocal delivery)</li>
                <li>• <strong>ElasticRun</strong> (rural supply chain, $1.5B valuation)</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-ink bg-paper">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Opportunities for Founders
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>SaaS for logistics</strong> (TMS, route optimization, tracking)</li>
                <li>• <strong>Warehouse automation</strong> (robotics, inventory management)</li>
                <li>• <strong>Hyperlocal delivery</strong> (10-15 min fulfillment)</li>
                <li>• <strong>B2B freight</strong> (digitizing trucking, cold chain)</li>
              </ul>
            </div>
          </div>

          <ArticleText>
            <strong>Business Model Insights:</strong> Logistics is low-margin (5-10% EBITDA at scale). 
            Most companies operate at negative margins for 3-5 years while building density. Winning 
            strategy: Own assets (warehouses, trucks) for margin control OR pure-play SaaS (no asset 
            ownership). Hybrid models (asset-light marketplaces) struggle with unit economics.
          </ArticleText>
        </ArticleSection>

        {/* 8. AgriTech */}
        <ArticleSection heading="8. AgriTech & Rural Innovation">
          <ArticleText>
            Agriculture employs 42% of India's workforce but contributes only 15% to GDP—massive 
            inefficiency means massive opportunity. AgriTech startups are modernizing everything 
            from farm inputs to supply chain to credit.
          </ArticleText>

          <DataTable
            headers={['Metric', 'India', 'USA', 'Growth (YoY)']}
            rows={[
              ['AgriTech Market (2024)', '$24B', '$75B', '20%'],
              ['Farmers', '150M', '2M', '—'],
              ['Avg Farm Size', '1.1 hectares', '180 hectares', '—'],
              ['AgriTech Startups', '1,500+', '5,000+', '25%'],
              ['Farm Mechanization %', '40%', '95%', '5%']
            ]}
            caption="Sources: NABARD, USDA (2024)"
          />

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Key Players (India)
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>DeHaat, Ninjacart</strong> (farm-to-consumer supply chain)</li>
                <li>• <strong>AgroStar</strong> (agri-inputs marketplace)</li>
                <li>• <strong>EM3</strong> (farm equipment rental, $100M funding)</li>
                <li>• <strong>Gramophone</strong> (agri e-commerce, advisory)</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-ink bg-paper">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Opportunities for Founders
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Input marketplaces</strong> (seeds, fertilizers, pesticides)</li>
                <li>• <strong>Farm management SaaS</strong> (crop planning, IoT sensors)</li>
                <li>• <strong>Supply chain</strong> (reducing wastage from 30% to &lt;10%)</li>
                <li>• <strong>Credit & insurance</strong> (farmer financing, crop insurance)</li>
              </ul>
            </div>
          </div>

          <ArticleText>
            <strong>Go-to-Market Challenges:</strong> Farmers don&apos;t have smartphones (only 30% penetration 
            in rural India), prefer cash over digital, and are risk-averse. Winning GTM: Offline-first 
            (village entrepreneurs, retail touchpoints), vernacular languages, trust-building through 
            demos. CAC is high ($50-100 per farmer) but LTV can be $500+ over 3-5 years.
          </ArticleText>
        </ArticleSection>

        {/* 9. D2C (Direct-to-Consumer) */}
        <ArticleSection heading="9. D2C Brands & Consumer Tech">
          <ArticleText>
            Direct-to-Consumer brands bypass traditional retail to sell online. India has 900+ D2C 
            brands across fashion, beauty, home, food—growing at 40% annually. Instagram and 
            performance marketing enabling new category leaders.<InlineCitation number={9} id="9" />
          </ArticleText>

          <DataTable
            headers={['Metric', 'India', 'USA', 'Growth (YoY)']}
            rows={[
              ['D2C Market (2024)', '$18B', '$175B', '40%'],
              ['D2C Brands', '900+', '22,000+', '35%'],
              ['Avg CAC', '$15-30', '$50-100', '—'],
              ['Repeat Purchase Rate', '25-35%', '30-40%', '—'],
              ['Top Category', 'Fashion', 'Beauty', '—']
            ]}
            caption="Sources: Tracxn, eMarketer (2024)"
          />

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Key Players (India)
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Mamaearth</strong> (beauty, $3B market cap post-IPO)</li>
                <li>• <strong>boAt</strong> (audio, ₹2,000 crore revenue)</li>
                <li>• <strong>Sugar Cosmetics</strong> (makeup, ₹500 crore revenue)</li>
                <li>• <strong>Licious</strong> (meat delivery, $1.5B valuation)</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-ink bg-paper">
              <h4 className="font-semibold text-ink mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Opportunities for Founders
              </h4>
              <ul className="text-sm text-graphite-800 space-y-2">
                <li>• <strong>Niche categories</strong> (pet care, sustainable fashion, gourmet food)</li>
                <li>• <strong>Affordable luxury</strong> (premium quality, accessible price)</li>
                <li>• <strong>Community-led brands</strong> (influencer partnerships, UGC)</li>
                <li>• <strong>Enabling platforms</strong> (Shopify for India, logistics tech)</li>
              </ul>
            </div>
          </div>

          <ArticleText>
            <strong>Path to Profitability:</strong> Most D2C brands burn on customer acquisition (40-50% 
            of revenue goes to Facebook/Google ads). Winners focus on: (1) repeat purchase rate &gt;30%, 
            (2) LTV:CAC ratio &gt;3:1, (3) omnichannel (own website + Amazon/Flipkart + offline retail), 
            (4) contribution margin &gt;40% after CAC. Mamaearth reached profitability at ₹500 crore revenue.
          </ArticleText>
        </ArticleSection>

        {/* Summary */}
        <ArticleSection heading="Choosing Your Industry: 5 Questions">
          <ArticleText>
            Use these questions to evaluate whether an industry is right for you:
          </ArticleText>

          <div className="my-8 space-y-4">
            <div className="p-6 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">1. Is the market growing?</h4>
              <p className="text-sm text-graphite-800">
                Target industries with 15%+ annual growth. Avoid declining markets (no matter how 
                innovative your solution—you&apos;re swimming upstream).
              </p>
            </div>

            <div className="p-6 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">2. Is there room for a new player?</h4>
              <p className="text-sm text-graphite-800">
                Look for fragmented markets (top 3 players &lt;50% market share) or underserved 
                segments (small businesses, Tier 2/3 cities, verticals).
              </p>
            </div>

            <div className="p-6 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">3. Do you have domain expertise?</h4>
              <p className="text-sm text-graphite-800">
                Investors prefer founders who&apos;ve worked in the industry (or have a strong personal 
                connection). Expertise = faster product-market fit.
              </p>
            </div>

            <div className="p-6 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">4. What&apos;s the regulatory risk?</h4>
              <p className="text-sm text-graphite-800">
                High in fintech, healthcare, edtech. Low in SaaS, D2C. Regulatory moats protect you 
                but slow down go-to-market.
              </p>
            </div>

            <div className="p-6 border-l-4 border-ink bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">5. Can this be a $100M+ revenue business?</h4>
              <p className="text-sm text-graphite-800">
                Investors need venture-scale returns. Calculate: # of target customers × price × 
                realistic penetration. If &lt;$100M TAM, it&apos;s a lifestyle business (not venture-backable).
              </p>
            </div>
          </div>
        </ArticleSection>

        {/* References */}
        <References citations={citations} />

        {/* Next Module */}
        <div className="mt-16 p-8 bg-ink text-paper">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-graphite-400 mb-3">
                Next Module
              </div>
              <h3 className="font-serif text-3xl font-bold mb-3">
                Toolkits & Templates
              </h3>
              <p className="text-xl text-graphite-200 leading-relaxed max-w-3xl">
                Interactive calculators for cap tables, unit economics, burn rate, and valuation—plus 
                a library of downloadable templates to accelerate your startup journey.
              </p>
            </div>
            <Link
              href="/learn/toolkits"
              className="flex-shrink-0 p-4 border-2 border-paper hover:bg-paper hover:text-ink transition-all"
            >
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </ArticleSpread>
    </LearnLayout>
  );
}
