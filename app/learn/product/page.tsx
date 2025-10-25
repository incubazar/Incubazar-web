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
import { Download, ArrowRight, Target, TrendingUp, Users } from 'lucide-react';

const citations = [
  {
    id: 'ries-lean-startup',
    number: 1,
    source: 'The Lean Startup: How Today\'s Entrepreneurs Use Continuous Innovation - Eric Ries',
    url: 'https://theleanstartup.com/',
    date: 'September 2011'
  },
  {
    id: 'andreessen-pmf',
    number: 2,
    source: 'The Only Thing That Matters - Marc Andreessen',
    url: 'https://pmarchive.com/guide_to_startups_part4.html',
    date: 'June 2007'
  },
  {
    id: 'sequoia-writing-plan',
    number: 3,
    source: 'Writing a Business Plan - Sequoia Capital',
    url: 'https://www.sequoiacap.com/article/writing-a-business-plan/',
    date: 'October 2024'
  },
  {
    id: 'ycombinator-mvp',
    number: 4,
    source: 'How to Build an MVP - Y Combinator Startup School',
    url: 'https://www.ycombinator.com/library/4Q-how-to-build-an-mvp',
    date: 'October 2024'
  },
  {
    id: 'saastr-metrics',
    number: 5,
    source: 'SaaS Metrics 2.0 - A Guide to Measuring and Improving What Matters',
    url: 'https://www.saastr.com/saastr-saas-metrics-2-0/',
    date: 'August 2024'
  },
  {
    id: 'reforge-pricing',
    number: 6,
    source: 'Pricing Strategy Framework - Reforge',
    url: 'https://www.reforge.com/blog/pricing-strategy',
    date: 'September 2024'
  }
];

export default function ProductPage() {
  return (
    <LearnLayout>
      <ArticleSpread>
        <ArticleHeader
          category="Building"
          title="Product & Go-To-Market Strategy"
          subtitle="Build products users love, find product-market fit, master SaaS metrics, and choose the right GTM playbook for sustainable growth."
          readTime={50}
          level="intermediate"
        />

        {/* Introduction */}
        <ArticleSection>
          <ArticleText>
            Most startups don&apos;t fail because they build the wrong product. They fail because 
            they build a product nobody wants, launch it to the wrong audience, or scale before 
            achieving product-market fit. The graveyard of failed startups is filled with 
            &quot;great ideas&quot; that never found their market.
          </ArticleText>

          <ArticleText>
            This guide covers everything from MVP strategy to pricing models, activation metrics 
            to conversion funnels, and B2B vs B2C go-to-market playbooks. By the end, you&apos;ll 
            know exactly how to validate, build, launch, and scale a product that matters.
          </ArticleText>

          <PullQuote
            quote="You can have a great team, great technology, and great execution—but if you don&apos;t have product-market fit, none of it matters. PMF is the moment when a startup finally finds a widespread set of customers that resonate with what they&apos;re building."
            citation="Marc Andreessen, Andreessen Horowitz"
          />
        </ArticleSection>

        {/* MVP Strategy */}
        <ArticleSection heading="1. MVP Strategy: Build Less, Learn More">
          <ArticleText>
            The Minimum Viable Product (MVP) isn&apos;t about building a &quot;bad&quot; version of your 
            product—it&apos;s about building the <em>smallest</em> version that lets you learn 
            whether you&apos;re solving a real problem<InlineCitation number={1} id="ries-lean-startup" />.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              The MVP Spectrum: From Smoke Test to Working Product
            </h4>

            <DataTable
              headers={['MVP Type', 'Time to Build', 'Learning Value', 'Best For', 'Example']}
              rows={[
                [
                  'Landing Page (Smoke Test)',
                  '1-2 days',
                  'High',
                  'Testing demand before building',
                  'Dropbox video demo (2008) got 75K signups overnight'
                ],
                [
                  'Concierge MVP',
                  '1 week',
                  'Very High',
                  'Understanding user workflow',
                  'Food on the Table: Founder manually created meal plans for first 100 users'
                ],
                [
                  'Wizard of Oz MVP',
                  '1-2 weeks',
                  'High',
                  'Testing UX without building backend',
                  'Zappos: Founder bought shoes from stores, shipped manually (no inventory)'
                ],
                [
                  'Single-Feature MVP',
                  '2-4 weeks',
                  'Medium-High',
                  'Core feature validation',
                  'Instagram: Just photo filters + sharing (no stories, reels, DMs)'
                ],
                [
                  'Working Prototype',
                  '6-12 weeks',
                  'Medium',
                  'Technical feasibility proof',
                  'Tesla Roadster: Proved electric cars could be fast + desirable'
                ],
              ]}
              caption="MVP approaches by build time and learning value (Y Combinator Startup School)"
            />
          </div>

          <CalloutBox type="warning" title="The MVP Trap: Building vs Learning">
            <p className="mb-3">
              <strong>Most founders build too much.</strong> If your MVP takes more than 3 months 
              to launch, you&apos;re not building an MVP—you&apos;re building a full product without 
              validation.
            </p>
            <p className="text-sm text-graphite-600">
              Rule of thumb: Your MVP should make you slightly embarrassed when you launch it. 
              If you&apos;re proud of V1, you waited too long.
            </p>
          </CalloutBox>

          <div className="my-12">
            <h4 className="font-serif text-2xl font-bold text-ink mb-6">
              MVP Decision Framework
            </h4>

            <div className="space-y-4">
              <div className="p-6 border-l-4 border-ink bg-graphite-50">
                <h5 className="font-semibold text-ink text-lg mb-2">
                  Ask: What&apos;s the riskiest assumption?
                </h5>
                <p className="text-graphite-800 mb-3">
                  Don&apos;t build features. Test assumptions. What&apos;s the one thing that, if wrong, 
                  kills your business?
                </p>
                <div className="text-sm text-graphite-700">
                  <strong>Example:</strong> Airbnb&apos;s riskiest assumption wasn&apos;t &quot;Can we build 
                  a booking platform?&quot; It was &quot;Will strangers trust each other enough to sleep 
                  in each other&apos;s homes?&quot; Their MVP tested trust, not technology.
                </div>
              </div>

              <div className="p-6 border-l-4 border-graphite-600 bg-graphite-50">
                <h5 className="font-semibold text-ink text-lg mb-2">
                  Ask: Can I fake it before I build it?
                </h5>
                <p className="text-graphite-800 mb-3">
                  Manual work scales to ~10-50 users. Use it to learn before automating.
                </p>
                <div className="text-sm text-graphite-700">
                  <strong>Example:</strong> DoorDash founders personally delivered food for the 
                  first 6 months. No app, no drivers—just a Google Form and two Stanford students 
                  on bikes. This validated demand before building logistics software.
                </div>
              </div>

              <div className="p-6 border-l-4 border-graphite-600 bg-graphite-50">
                <h5 className="font-semibold text-ink text-lg mb-2">
                  Ask: What can I cut without losing the core value?
                </h5>
                <p className="text-graphite-800 mb-3">
                  Your MVP should have ONE killer feature that solves ONE painful problem for 
                  ONE specific user.
                </p>
                <div className="text-sm text-graphite-700">
                  <strong>Example:</strong> Stripe&apos;s MVP had no dashboard, no analytics, no fraud 
                  detection. Just 7 lines of code to accept payments. Everything else came after 
                  PMF.
                </div>
              </div>
            </div>
          </div>
        </ArticleSection>

        {/* Product-Market Fit */}
        <ArticleSection heading="2. Product-Market Fit: The Only Thing That Matters">
          <ArticleText>
            Product-market fit (PMF) is the moment when your product resonates so deeply with 
            users that they <em>pull it out of your hands</em><InlineCitation number={2} id="andreessen-pmf" />. 
            Before PMF, nothing else matters. After PMF, everything is easier.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              How to Measure Product-Market Fit
            </h4>

            <DataTable
              headers={['Signal', 'Good', 'Great', 'Red Flag']}
              rows={[
                [
                  'Sean Ellis Test',
                  '40%+ say "very disappointed"',
                  '50%+ say "very disappointed"',
                  '<30% would be disappointed'
                ],
                [
                  'Retention (Month 1)',
                  '40% of users return',
                  '60%+ of users return',
                  '<20% return after first use'
                ],
                [
                  'NPS (Net Promoter Score)',
                  '30-50 (good)',
                  '50-70 (excellent)',
                  '<20 (poor fit)'
                ],
                [
                  'Organic Growth Rate',
                  '10-15% WoW',
                  '20%+ WoW',
                  '<5% WoW (paid only)'
                ],
                [
                  'Word-of-Mouth',
                  '30% from referrals',
                  '50%+ from referrals',
                  '<10% organic signups'
                ],
                [
                  'Usage Intensity',
                  '3x/week',
                  'Daily active users',
                  'Monthly or less'
                ],
              ]}
              caption="PMF metrics benchmarks (Sequoia Capital & Andreessen Horowitz)"
            />
          </div>

          <div className="my-12 p-8 bg-ink text-paper">
            <h4 className="font-serif text-3xl font-bold mb-6">
              The Sean Ellis Test (40% Rule)
            </h4>
            <p className="text-xl text-graphite-200 leading-relaxed mb-6">
              Survey your users with one question: <strong>&quot;How would you feel if you could 
              no longer use this product?&quot;</strong>
            </p>
            <div className="space-y-3 text-graphite-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-paper text-ink flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <p>Very disappointed</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-graphite-700 text-paper flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <p>Somewhat disappointed</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-graphite-700 text-paper flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <p>Not disappointed</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-graphite-900 border-2 border-graphite-700">
              <p className="text-sm text-graphite-300">
                <strong>If 40%+ choose &quot;very disappointed,&quot; you have PMF.</strong> If 
                not, keep iterating. This is the single best leading indicator of startup success.
              </p>
            </div>
          </div>

          <CalloutBox type="tip" title="Before PMF vs After PMF: What Changes">
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-ink mb-1">Before PMF</h5>
                <ul className="space-y-1 text-sm">
                  <li>• Focus: Product iteration based on user feedback</li>
                  <li>• Team: Small (3-10 people), all hands-on</li>
                  <li>• Growth: Slow, effortful, mostly founder-driven</li>
                  <li>• Metrics: Qualitative (user interviews, retention cohorts)</li>
                  <li>• Fundraising: Hard (angels, pre-seed, seed)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-ink mb-1">After PMF</h5>
                <ul className="space-y-1 text-sm">
                  <li>• Focus: Scaling distribution + hiring</li>
                  <li>• Team: Growing fast (10-50+ people)</li>
                  <li>• Growth: Accelerating, word-of-mouth kicking in</li>
                  <li>• Metrics: Quantitative (CAC, LTV, churn, NRR)</li>
                  <li>• Fundraising: Easy (Series A, B, C)</li>
                </ul>
              </div>
            </div>
          </CalloutBox>
        </ArticleSection>

        {/* SaaS Metrics */}
        <ArticleSection heading="3. SaaS Metrics: The Numbers That Matter">
          <ArticleText>
            If you&apos;re building a SaaS product, these 10 metrics tell the complete story of 
            your business health<InlineCitation number={5} id="saastr-metrics" />. Master them, 
            and you&apos;ll know exactly where to focus.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-6">
              The SaaS Dashboard: 10 Essential Metrics
            </h4>

            <div className="space-y-6">
              {/* MRR & ARR */}
              <div className="p-6 border-2 border-ink">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-ink" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-serif text-xl font-bold text-ink mb-2">
                      1. MRR (Monthly Recurring Revenue) & ARR (Annual Recurring Revenue)
                    </h5>
                    <p className="text-graphite-800 mb-3">
                      The foundation of SaaS valuation. ARR = MRR × 12.
                    </p>
                    <div className="p-4 bg-graphite-50 border-l-2 border-graphite-400">
                      <div className="text-xs uppercase tracking-widest text-graphite-500 mb-2">
                        Benchmark
                      </div>
                      <ul className="text-sm text-graphite-700 space-y-1">
                        <li>• Seed stage: $50K-$500K ARR</li>
                        <li>• Series A: $1M-$3M ARR (SaaS)</li>
                        <li>• Series B: $5M-$10M ARR</li>
                        <li>• IPO-ready: $100M+ ARR</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Rate */}
              <div className="p-6 border-2 border-graphite-400">
                <h5 className="font-serif text-xl font-bold text-ink mb-2">
                  2. Growth Rate (MoM & YoY)
                </h5>
                <p className="text-graphite-800 mb-3">
                  How fast is revenue growing? VCs want to see 3x YoY (tripling) for early-stage.
                </p>
                <div className="font-mono text-sm bg-paper p-3 border border-graphite-300">
                  MoM Growth = ((This Month MRR - Last Month MRR) / Last Month MRR) × 100
                </div>
                <div className="mt-3 text-sm text-graphite-700">
                  <strong>Benchmark:</strong> 10-15% MoM (pre-PMF), 15-25% MoM (post-PMF), 
                  5-10% MoM (mature stage)
                </div>
              </div>

              {/* Churn */}
              <div className="p-6 border-2 border-graphite-400">
                <h5 className="font-serif text-xl font-bold text-ink mb-2">
                  3. Churn Rate (Customer & Revenue)
                </h5>
                <p className="text-graphite-800 mb-3">
                  Percentage of customers or revenue lost each month. The silent killer of SaaS.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-mono text-sm bg-paper p-3 border border-graphite-300 mb-2">
                      Customer Churn = Lost Customers / Total Customers
                    </div>
                    <p className="text-xs text-graphite-600">
                      <strong>SMB SaaS:</strong> 3-7% monthly is acceptable<br />
                      <strong>Enterprise SaaS:</strong> &lt;1% monthly (very sticky)
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-sm bg-paper p-3 border border-graphite-300 mb-2">
                      Revenue Churn = Lost MRR / Starting MRR
                    </div>
                    <p className="text-xs text-graphite-600">
                      <strong>Target:</strong> &lt;5% monthly (SMB), &lt;2% monthly (enterprise)<br />
                      <strong>Danger zone:</strong> &gt;10% monthly
                    </p>
                  </div>
                </div>
              </div>

              {/* NRR */}
              <div className="p-6 border-2 border-ink bg-ink text-paper">
                <h5 className="font-serif text-xl font-bold mb-2">
                  4. Net Revenue Retention (NRR) — The Best SaaS Metric
                </h5>
                <p className="text-graphite-200 mb-3">
                  Revenue from existing customers after accounting for churn + expansion. 
                  <strong> If &gt;100%, you&apos;re growing even without new customers.</strong>
                </p>
                <div className="font-mono text-sm bg-graphite-900 p-3 border border-graphite-700 mb-3">
                  NRR = ((Starting MRR + Expansion - Churn) / Starting MRR) × 100
                </div>
                <div className="p-4 bg-graphite-900 border-2 border-graphite-700">
                  <div className="text-xs uppercase tracking-widest text-graphite-400 mb-2">
                    Benchmark
                  </div>
                  <ul className="text-sm text-graphite-200 space-y-1">
                    <li>• <strong>100%+:</strong> Good (covering churn with upsells)</li>
                    <li>• <strong>110-120%:</strong> Great (expanding revenue from existing customers)</li>
                    <li>• <strong>120%+:</strong> Best-in-class (Snowflake: 158%, Datadog: 130%)</li>
                  </ul>
                </div>
              </div>

              {/* CAC & LTV */}
              <div className="p-6 border-2 border-graphite-400">
                <h5 className="font-serif text-xl font-bold text-ink mb-2">
                  5. CAC (Customer Acquisition Cost) & 6. LTV (Lifetime Value)
                </h5>
                <p className="text-graphite-800 mb-3">
                  See Finance & Funding module for deep dive. Key ratio: <strong>LTV:CAC should 
                  be &gt;3:1</strong>.
                </p>
                <div className="text-sm text-graphite-700">
                  Quick check: If you spend $500 to acquire a customer who pays $50/month with 
                  80% gross margin and 3% monthly churn, your LTV is $1,333. LTV:CAC = 2.7:1 
                  (borderline—optimize!)
                </div>
              </div>

              {/* Activation Rate */}
              <div className="p-6 border-2 border-graphite-400">
                <h5 className="font-serif text-xl font-bold text-ink mb-2">
                  7. Activation Rate (Aha Moment)
                </h5>
                <p className="text-graphite-800 mb-3">
                  Percentage of signups who experience the core value of your product. The most 
                  underrated metric.
                </p>
                <div className="p-4 bg-graphite-50">
                  <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">
                    Examples of &quot;Aha Moments&quot;
                  </div>
                  <ul className="text-sm text-graphite-800 space-y-1">
                    <li>• <strong>Slack:</strong> Team sends 2,000 messages (71% retention after)</li>
                    <li>• <strong>Dropbox:</strong> User uploads 1 file (multiple devices)</li>
                    <li>• <strong>Facebook:</strong> Add 7 friends in 10 days</li>
                    <li>• <strong>Twitter:</strong> Follow 30 accounts</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-graphite-700">
                  <strong>Your job:</strong> Identify YOUR aha moment, then ruthlessly optimize 
                  onboarding to get users there faster.
                </p>
              </div>

              {/* Conversion Funnel */}
              <div className="p-6 border-2 border-graphite-400">
                <h5 className="font-serif text-xl font-bold text-ink mb-2">
                  8. Conversion Funnel (Visitor → Paid Customer)
                </h5>
                <p className="text-graphite-800 mb-3">
                  Track drop-offs at every stage. Small improvements compound.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-graphite-50 border-l-4 border-ink">
                    <span className="font-semibold">1. Landing Page Visit</span>
                    <span className="text-sm text-graphite-600">Baseline: 100%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-graphite-100 border-l-4 border-graphite-500">
                    <span className="font-semibold">2. Signup Started</span>
                    <span className="text-sm text-graphite-600">Benchmark: 10-20%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-graphite-100 border-l-4 border-graphite-500">
                    <span className="font-semibold">3. Signup Completed</span>
                    <span className="text-sm text-graphite-600">Benchmark: 60-80% of starts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-graphite-100 border-l-4 border-graphite-500">
                    <span className="font-semibold">4. Activation (Aha Moment)</span>
                    <span className="text-sm text-graphite-600">Benchmark: 30-60%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-ink text-paper border-l-4 border-paper">
                    <span className="font-semibold">5. Paid Conversion</span>
                    <span className="text-sm text-graphite-300">Benchmark: 2-5% (freemium), 10-25% (free trial)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ArticleSection>

        {/* Pricing Models */}
        <ArticleSection heading="4. Pricing Strategy: How to Charge">
          <ArticleText>
            Pricing is a positioning statement disguised as a number. Get it wrong, and you&apos;ll 
            either leave money on the table or scare away your best customers<InlineCitation number={6} id="reforge-pricing" />.
          </ArticleText>

          <div className="my-8">
            <DataTable
              headers={['Model', 'How It Works', 'Pros', 'Cons', 'Best For']}
              rows={[
                [
                  'Freemium',
                  'Free forever tier + paid upgrades',
                  'Viral growth, low barrier to entry',
                  'Low conversion (2-5%), high support costs',
                  'PLG products with network effects (Slack, Zoom, Notion)'
                ],
                [
                  'Free Trial',
                  '14-30 day trial → paywall',
                  'Higher conversion (10-25%), qualified leads',
                  'Requires fast time-to-value',
                  'B2B SaaS with clear ROI (HubSpot, Salesforce)'
                ],
                [
                  'Usage-Based',
                  'Pay per API call, GB, user, etc.',
                  'Aligns cost with value, scales naturally',
                  'Unpredictable revenue, billing complexity',
                  'Infrastructure tools (AWS, Twilio, Stripe)'
                ],
                [
                  'Flat-Rate',
                  'One price, all features',
                  'Simple messaging, easy to sell',
                  'Leaves money on table (whales pay same as SMBs)',
                  'Small teams, simple products (Basecamp)'
                ],
                [
                  'Tiered',
                  'Good/Better/Best packages',
                  'Captures different customer segments',
                  'Analysis paralysis, needs clear differentiation',
                  'Most SaaS (Mailchimp, Dropbox, Intercom)'
                ],
                [
                  'Per-Seat',
                  'Price × number of users',
                  'Predictable, scales with team growth',
                  'Incentivizes sharing logins',
                  'Collaboration tools (Slack, Figma, Asana)'
                ],
              ]}
              caption="Pricing model comparison (Reforge Pricing Strategy Framework)"
            />
          </div>

          <div className="my-12 p-8 border-l-4 border-ink bg-graphite-50">
            <h4 className="font-serif text-2xl font-bold text-ink mb-4">
              The Pricing Psychology Playbook
            </h4>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-semibold text-ink mb-2">1. Anchor High, Discount Strategically</h5>
                <p className="text-graphite-800 leading-relaxed">
                  Show your highest tier first. This anchors perception of value. Then offer a 
                  &quot;middle&quot; tier that seems reasonable by comparison. Most customers choose the 
                  middle option (decoy effect).
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-ink mb-2">2. Charge 10x More Than You Think</h5>
                <p className="text-graphite-800 leading-relaxed mb-2">
                  Most founders underprice. If less than 10% of prospects complain about price, 
                  you&apos;re too cheap. Ideal rejection rate: 30-40% say &quot;too expensive.&quot;
                </p>
                <p className="text-sm text-graphite-600 italic">
                  Example: Superhuman launched at $30/month (email client). Customers said &quot;too 
                  expensive.&quot; They raised it to $30/user/month. Revenue tripled, churn dropped 
                  (self-selection of serious users).
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-ink mb-2">3. Value-Based, Not Cost-Plus</h5>
                <p className="text-graphite-800 leading-relaxed">
                  Don&apos;t price based on your costs. Price based on customer value. If your product 
                  saves a company $100K/year, charging $30K is a steal.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-ink mb-2">4. Annual Discounts (But Not Too Much)</h5>
                <p className="text-graphite-800 leading-relaxed">
                  Offer 15-20% off for annual prepayment. Higher discounts (30%+) signal 
                  desperation. Benefits: Upfront cash, lower churn (sunk cost), better LTV.
                </p>
              </div>
            </div>
          </div>
        </ArticleSection>

        {/* GTM Playbooks */}
        <ArticleSection heading="5. Go-To-Market Playbooks: B2B vs B2C">
          <ArticleText>
            Your GTM strategy depends entirely on who you&apos;re selling to, how much they pay, 
            and how they buy. B2B enterprise requires a completely different playbook than B2C 
            consumer products.
          </ArticleText>

          <div className="my-8">
            <h4 className="font-serif text-2xl font-bold text-ink mb-6">
              B2B SaaS GTM Playbook
            </h4>

            <div className="space-y-6">
              <div className="p-6 border-2 border-ink">
                <h5 className="font-serif text-xl font-bold text-ink mb-3">
                  1. Product-Led Growth (PLG) — Bottom-Up Adoption
                </h5>
                <p className="text-graphite-800 mb-4">
                  Users discover, try, and buy your product without talking to sales. Self-serve 
                  onboarding, freemium or free trial, viral loops.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">
                      Best For
                    </div>
                    <ul className="text-sm text-graphite-800 space-y-1">
                      <li>• Developer tools (Stripe, GitHub, Vercel)</li>
                      <li>• Collaboration software (Slack, Figma, Notion)</li>
                      <li>• SMB SaaS with &lt;$500/month ACV</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">
                      Key Metrics
                    </div>
                    <ul className="text-sm text-graphite-800 space-y-1">
                      <li>• Time-to-value: &lt;5 minutes</li>
                      <li>• Activation rate: &gt;40%</li>
                      <li>• Viral coefficient: &gt;0.5</li>
                      <li>• Free-to-paid: 2-5%</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 border-2 border-graphite-400">
                <h5 className="font-serif text-xl font-bold text-ink mb-3">
                  2. Sales-Led Growth — Top-Down Selling
                </h5>
                <p className="text-graphite-800 mb-4">
                  Outbound sales team cold-calling, demoing, and closing enterprise deals. Long 
                  sales cycles (3-12 months), high ACV ($50K-$500K+).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">
                      Best For
                    </div>
                    <ul className="text-sm text-graphite-800 space-y-1">
                      <li>• Enterprise software (Salesforce, SAP)</li>
                      <li>• Complex security/compliance products</li>
                      <li>• B2B with &gt;$50K ACV</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">
                      Key Metrics
                    </div>
                    <ul className="text-sm text-graphite-800 space-y-1">
                      <li>• Sales cycle: 90-180 days</li>
                      <li>• Win rate: 20-30%</li>
                      <li>• CAC payback: 12-18 months</li>
                      <li>• ACV: $50K-$500K+</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 border-2 border-graphite-400">
                <h5 className="font-serif text-xl font-bold text-ink mb-3">
                  3. Hybrid (PLG + Sales) — Land and Expand
                </h5>
                <p className="text-graphite-800 mb-4">
                  Start with product-led bottom-up adoption, layer sales for expansion into 
                  enterprise accounts. Best of both worlds.
                </p>
                <div className="p-4 bg-graphite-50">
                  <div className="text-xs uppercase tracking-widest text-graphite-600 mb-2">
                    The Playbook
                  </div>
                  <ol className="text-sm text-graphite-800 space-y-2">
                    <li>1. <strong>Land:</strong> Individual teams adopt via freemium/trial (PLG)</li>
                    <li>2. <strong>Trigger:</strong> Usage hits threshold (10+ users, $500 MRR)</li>
                    <li>3. <strong>Expand:</strong> Sales team reaches out with enterprise offer</li>
                    <li>4. <strong>Close:</strong> Upgrade to company-wide contract ($50K-$500K)</li>
                  </ol>
                  <p className="mt-3 text-xs text-graphite-600">
                    <strong>Examples:</strong> Atlassian, Dropbox, Zoom, Calendly
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="my-12">
            <h4 className="font-serif text-2xl font-bold text-ink mb-6">
              B2C Consumer GTM Playbook
            </h4>

            <div className="space-y-6">
              <div className="p-6 bg-ink text-paper">
                <h5 className="font-serif text-xl font-bold mb-3">
                  Channel Strategy: Where to Find Your First 1,000 Users
                </h5>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold mb-2">1. Organic Social (Twitter, LinkedIn, TikTok)</div>
                    <p className="text-sm text-graphite-200">
                      <strong>Cost:</strong> Free (time investment)<br />
                      <strong>Timeline:</strong> 3-6 months to build audience<br />
                      <strong>Best for:</strong> Thought leadership, developer tools, niche communities
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">2. Content Marketing (Blog, SEO, YouTube)</div>
                    <p className="text-sm text-graphite-200">
                      <strong>Cost:</strong> $2K-$10K/month (writers, SEO tools)<br />
                      <strong>Timeline:</strong> 6-12 months to rank<br />
                      <strong>Best for:</strong> Long-tail keywords, evergreen content, education
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">3. Paid Ads (Google, Facebook, Instagram)</div>
                    <p className="text-sm text-graphite-200">
                      <strong>Cost:</strong> $5K-$50K/month minimum<br />
                      <strong>Timeline:</strong> Immediate (but requires optimization)<br />
                      <strong>Best for:</strong> High LTV products (&gt;$100), clear ROI, retargeting
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">4. Community Building (Discord, Slack, Reddit)</div>
                    <p className="text-sm text-graphite-200">
                      <strong>Cost:</strong> Free (time investment)<br />
                      <strong>Timeline:</strong> 6-18 months to scale<br />
                      <strong>Best for:</strong> Passionate niches, B2B communities, retention plays
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ArticleSection>

        {/* Downloads */}
        <section className="mt-16 pt-12 border-t-2 border-graphite-200">
          <h2 className="font-serif text-3xl font-bold text-ink mb-6">
            Download Templates & Worksheets
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/templates/mvp-validation-checklist.pdf"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">MVP Validation Checklist</h4>
                <p className="text-sm text-graphite-600">Step-by-step guide to test assumptions before building</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/pmf-survey-template.pdf"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">Product-Market Fit Survey</h4>
                <p className="text-sm text-graphite-600">Sean Ellis test + NPS + retention analysis</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/saas-metrics-dashboard.xlsx"
              className="flex items-center justify-between p-6 border-2 border-ink hover:bg-graphite-50 transition-colors group"
            >
              <div>
                <h4 className="font-semibold text-ink mb-1">SaaS Metrics Dashboard (Excel)</h4>
                <p className="text-sm text-graphite-600">Track MRR, churn, NRR, CAC, LTV, activation</p>
              </div>
              <Download className="h-5 w-5 text-ink group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="/templates/pricing-strategy-worksheet.pdf"
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

        {/* References */}
        <References citations={citations} />

        {/* Next Module */}
        <section className="mt-16 pt-12 border-t-2 border-ink bg-graphite-50 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 py-12">
          <h3 className="text-sm uppercase tracking-widest text-graphite-600 font-semibold mb-4">
            Next Module
          </h3>
          <Link
            href="/learn/pitching"
            className="group block"
          >
            <h2 className="font-serif text-4xl font-bold text-ink mb-4 group-hover:underline">
              Pitching & Pitch Decks →
            </h2>
            <p className="text-xl text-graphite-700 mb-6">
              Master the 10-slide blueprint, craft magnetic elevator pitches, and understand 
              investor psychology to raise your next round.
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
