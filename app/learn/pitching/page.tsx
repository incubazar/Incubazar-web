import LearnLayout from '@/components/learn/LearnLayout';
import {
  ArticleSpread,
  ArticleHeader,
  ArticleSection,
  ArticleText,
  PullQuote,
  CalloutBox,
  DataTable,
  Checklist,
  InlineCitation,
  References
} from '@/components/learn/ArticleComponents';
import { ProposalCover } from '@/components/learn/CaseStudyComponents';
import Link from 'next/link';
import { Download, ArrowRight, Target, Lightbulb, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function PitchingPage() {
  const citations = [
    {
      id: '1',
      number: 1,
      source: 'Sequoia Capital - Writing a Business Plan',
      url: 'https://www.sequoiacap.com/article/writing-a-business-plan/',
      date: '2023'
    },
    {
      id: '2',
      number: 2,
      source: 'Guy Kawasaki - The Only 10 Slides You Need in Your Pitch',
      url: 'https://guykawasaki.com/the-only-10-slides-you-need-in-your-pitch/',
      date: '2015'
    },
    {
      id: '3',
      number: 3,
      source: 'Pitch Deck Best Practices - Industry Standards',
      url: 'https://www.example.com/pitch-deck-guide',
      date: '2024'
    },
    {
      id: '4',
      number: 4,
      source: 'First Round Review - How to Tell a Story in Your Pitch',
      url: 'https://review.firstround.com/how-to-tell-your-companys-story',
      date: '2022'
    },
    {
      id: '5',
      number: 5,
      source: 'CB Insights - The Top 20 Reasons Startups Fail',
      url: 'https://www.cbinsights.com/research/startup-failure-reasons-top/',
      date: '2023'
    }
  ];

  return (
    <LearnLayout>
      <ArticleSpread>
        <ArticleHeader
          category="Foundation"
          title="Pitching & Pitch Decks"
          subtitle="How to craft a compelling investor pitch that gets funded—from the 10-slide blueprint to the 30-second elevator pitch"
          readTime={45}
          level="intermediate"
        />

        {/* Proposal-Style Cover */}
        <ProposalCover
          title="PITCH DECK PROPOSAL"
          subtitle="Mastering Investor Communication"
          client="Founders"
          date="October 2024"
          team={['Industry Experts', 'Startup Advisors', 'Investor Panel']}
          brief="In 2023, investors reviewed 200+ pitch decks per partner but funded fewer than 5. This module teaches the battle-tested 10-slide structure, elevator pitch formulas, and storytelling frameworks that turn a 'maybe later' into a term sheet. Includes templates, investor psychology insights, and real-world examples from successful founders."
          accentColor="#1a1a1a"
          introSection={{
            heading: 'INTRODUCTION',
            content: 'The average investor makes a gut decision in the first 3 minutes. Your pitch isn\'t about the idea—it\'s about the inevitability of the future you\'re building and your team\'s ability to execute. This module breaks down exactly how to structure that narrative.'
          }}
          aboutSection={{
            items: [
              { icon: <Target className="h-6 w-6" />, label: 'PJ', value: '10 Slides Blueprint' },
              { icon: <Lightbulb className="h-6 w-6" />, label: 'AV', value: '30s Elevator Pitch' },
              { icon: <Users className="h-6 w-6" />, label: 'SG', value: 'Investor Psychology' },
              { icon: <DollarSign className="h-6 w-6" />, label: 'ES', value: '4 Templates Included' }
            ]
          }}
        />

        {/* Introduction */}
        <ArticleSection heading="Why Most Pitches Fail">
          <ArticleText>
            The average investor sees 200+ pitch decks per year and says &quot;yes&quot; to fewer than 5. 
            Your pitch has ~3 minutes to capture attention before they mentally check out.<InlineCitation number={5} id="5" /> 
            The difference between funded and ignored isn&apos;t always the idea—it&apos;s how you tell the story.
          </ArticleText>

          <ArticleText>
            This module covers the proven pitch deck structure used by successful startups 
            and industry leaders. You'll learn the 10-slide blueprint, elevator pitch formulas, storytelling frameworks, 
            and investor psychology—everything to turn a &quot;maybe later&quot; into a term sheet.
          </ArticleText>

          <PullQuote
            quote="You're not pitching a product. You're pitching a future where the problem no longer exists—and you&apos;re the team that makes it happen."
            author="Industry Expert"
          />
        </ArticleSection>

        {/* 10-Slide Pitch Deck Blueprint */}
        <ArticleSection heading="The 10-Slide Pitch Deck Blueprint">
          <ArticleText>
            The gold standard pitch deck structure, refined by industry experts and adopted across successful startups.<InlineCitation number={1} id="1" /> 
            These 10 slides answer every question an investor has—in the order they think about them.
          </ArticleText>

          <DataTable
            headers={['Slide #', 'Title', 'Purpose', 'Key Content', 'Time (seconds)']}
            rows={[
              ['1', 'Cover', 'First impression', 'Company name, tagline, logo, contact', '10-15'],
              ['2', 'Problem', 'Why this matters', 'Customer pain point (specific, urgent, expensive)', '30-45'],
              ['3', 'Solution', 'How you solve it', 'Your product in 1 sentence + visual demo', '45-60'],
              ['4', 'Product Demo', 'Show, don\'t tell', 'Screenshots, video, or live demo (if short)', '30-45'],
              ['5', 'Market Size', 'Is this big enough?', 'TAM/SAM/SOM with bottoms-up calculation', '30-45'],
              ['6', 'Business Model', 'How you make money', 'Revenue streams, pricing, unit economics', '30-45'],
              ['7', 'Traction', 'Proof it works', 'Revenue, users, growth rate, partnerships', '45-60'],
              ['8', 'Competition', 'Why you win', 'Market positioning (2x2 matrix)', '30-45'],
              ['9', 'Team', 'Why you?', 'Founders + advisors with relevant credentials', '30-45'],
              ['10', 'Ask', 'What you need', 'Fundraising amount, use of funds, milestones', '30-45']
            ]}
            caption="Total pitch time: 6-8 minutes (leave 2-4 minutes for Q&A in a 10-minute slot)"
          />

          <CalloutBox type="warning">
            <strong>Common Mistake:</strong> Don't save the &quot;ask&quot; for the end of your verbal pitch. 
            State it upfront: "We're raising $2M to achieve X milestone." Investors want to know 
            the price of admission immediately.
          </CalloutBox>

          <ArticleText>
            <strong>Slide 1: Cover</strong><br />
            Your first impression. Keep it minimal—company name, one-line tagline (what you do), 
            logo, and your email. Example: "Stripe — Payments infrastructure for the internet | founders@stripe.com"
          </ArticleText>

          <ArticleText>
            <strong>Slide 2: Problem</strong><br />
            The most important slide. Describe a customer pain point that is: (1) <em>specific</em> 
            (not &quot;email is broken&quot; but &quot;sales teams waste 4 hours/day on manual follow-ups&quot;), 
            (2) <em>urgent</em> (happens daily, not once a year), and (3) <em>expensive</em> 
            (costs real money or time). Use a customer quote or statistic to make it visceral.
          </ArticleText>

          <ArticleText>
            <strong>Slide 3: Solution</strong><br />
            Your product in 1 sentence. Format: "We help [target customer] [solve problem] by [unique approach]." 
            Example: "We help sales teams close deals 40% faster by automating follow-up emails with AI." 
            Add a visual (product screenshot or diagram).
          </ArticleText>

          <ArticleText>
            <strong>Slide 4: Product Demo</strong><br />
            Show your product in action. For software, use annotated screenshots highlighting 3 key features. 
            For hardware, show the prototype. If you can demo live in under 30 seconds, do it—but have a 
            backup slide in case Wi-Fi fails.
          </ArticleText>

          <ArticleText>
            <strong>Slide 5: Market Size</strong><br />
            Investors need $1B+ TAM (total addressable market) to justify venture returns. Calculate 
            bottoms-up: "10M businesses × $100/month = $12B TAM." Then show SAM (serviceable addressable 
            market, your realistic target) and SOM (serviceable obtainable market, what you&apos;ll capture in 3-5 years).
          </ArticleText>

          <CalloutBox type="tip">
            <strong>Bottoms-Up vs Top-Down:</strong> Saying &quot;We'll capture 1% of the $500B payments market&quot; 
            is lazy. Instead: &quot;There are 2M e-commerce stores in India. If 10% adopt our checkout solution 
            at $50/month, that&apos;s $120M ARR potential.&quot;
          </CalloutBox>

          <ArticleText>
            <strong>Slide 6: Business Model</strong><br />
            How you make money. State your pricing model (SaaS subscription, transaction fee, marketplace take rate) 
            and show unit economics: CAC, LTV, payback period, gross margin. If pre-revenue, explain your 
            pricing strategy and comparable benchmarks.
          </ArticleText>

          <ArticleText>
            <strong>Slide 7: Traction</strong><br />
            Proof your solution works. Best traction metrics (in order): revenue growth, user growth, 
            engagement metrics (DAU/MAU), partnerships with recognizable brands. Show a hockey stick 
            graph if you have one. If pre-launch, show LOIs (letters of intent) or pilot signups.
          </ArticleText>

          <ArticleText>
            <strong>Slide 8: Competition</strong><br />
            Never say &quot;we have no competitors&quot; (means you don&apos;t understand the market). Use a 2×2 matrix 
            with your product in the top-right corner. Example axes: "Ease of Use" vs &quot;Customization.&quot; 
            Show why alternatives (incumbents, substitutes, DIY solutions) fall short.
          </ArticleText>

          <ArticleText>
            <strong>Slide 9: Team</strong><br />
            Why you? Highlight domain expertise, technical chops, or previous startup success. Format: 
            &quot;Jane Doe, CEO — Ex-Google Payments, built $50M revenue product.&quot; Include 1-2 key advisors 
            if they&apos;re well-known investors or industry leaders.
          </ArticleText>

          <ArticleText>
            <strong>Slide 10: Ask</strong><br />
            Be specific. State: (1) how much you&apos;re raising ("$2M seed round"), (2) what you&apos;ll use it 
            for ("60% product, 30% sales, 10% operations"), and (3) the milestone you&apos;ll hit ("$1M ARR 
            in 18 months"). This shows you&apos;ve thought through capital efficiency.
          </ArticleText>
        </ArticleSection>

        {/* Elevator Pitch Formula */}
        <ArticleSection heading="The 30-Second Elevator Pitch">
          <ArticleText>
            You have 30 seconds in an elevator with an investor. What do you say? Use this 4-part formula 
            to craft a pitch that&apos;s memorable, clear, and creates urgency.
          </ArticleText>

          <div className="my-12 p-8 border-l-4 border-ink bg-graphite-50">
            <h4 className="font-serif text-2xl font-bold text-ink mb-6">The 4-Part Formula</h4>
            
            <div className="space-y-6">
              <div>
                <div className="font-semibold text-ink mb-2">1. Hook (5 seconds)</div>
                <p className="text-graphite-800 mb-2">
                  Start with a surprising stat or bold claim that makes them lean in.
                </p>
                <p className="text-sm text-graphite-600 italic">
                  Example: "Sales teams waste $50B annually on manual follow-ups."
                </p>
              </div>

              <div>
                <div className="font-semibold text-ink mb-2">2. What You Do (10 seconds)</div>
                <p className="text-graphite-800 mb-2">
                  Explain your solution in 1 sentence using the format: &quot;We help [customer] [solve problem] 
                  by [unique approach].&quot;
                </p>
                <p className="text-sm text-graphite-600 italic">
                  Example: "We help B2B sales teams close deals 40% faster by automating follow-ups with AI."
                </p>
              </div>

              <div>
                <div className="font-semibold text-ink mb-2">3. Proof (10 seconds)</div>
                <p className="text-graphite-800 mb-2">
                  Share 1 traction metric or customer validation point.
                </p>
                <p className="text-sm text-graphite-600 italic">
                  Example: &quot;We've grown from 0 to $500K ARR in 8 months, with 200+ customers including Salesforce.&quot;
                </p>
              </div>

              <div>
                <div className="font-semibold text-ink mb-2">4. Ask (5 seconds)</div>
                <p className="text-graphite-800 mb-2">
                  End with a clear call-to-action.
                </p>
                <p className="text-sm text-graphite-600 italic">
                  Example: "We're raising a $2M seed round—I'd love to send you our deck."
                </p>
              </div>
            </div>
          </div>

          <CalloutBox type="info">
            <strong>Full Elevator Pitch (Airbnb, 2009):</strong><br />
            &quot;Hotels charge $200/night for a room you sleep in for 8 hours. We let you rent someone's 
            spare room for $50/night—and you get a local experience, not a sterile hotel. We've done 
            $2M in bookings in 6 months across 200 cities. We're raising $500K to expand to Europe. 
            Can I send you our deck?&quot;
          </CalloutBox>
        </ArticleSection>

        {/* 3-Minute Pitch Script */}
        <ArticleSection heading="The 3-Minute Pitch Script">
          <ArticleText>
            Most pitch meetings start with &quot;Tell me about your company&quot; and give you 3-5 minutes before 
            interruptions. Here's a verbal script structure that covers the essentials—memorize this, 
            then adapt to your story.
          </ArticleText>

          <div className="my-12 p-8 bg-ink text-paper">
            <h4 className="font-serif text-2xl font-bold mb-6 text-white">The 3-Minute Script Structure</h4>
            
            <div className="space-y-6 text-white">
              <div>
                <div className="font-semibold text-white mb-2">[0:00-0:30] Problem + Personal Connection</div>
                <p className="mb-2 text-white/90">
                  &quot;My co-founder and I were sales managers at [Company]. We spent 4 hours a day manually 
                  writing follow-up emails—and still lost deals because we forgot to follow up. We talked 
                  to 50 other sales leaders, and they all had the same problem: follow-up is critical, 
                  but it&apos;s manual, repetitive, and easy to forget.&quot;
                </p>
              </div>

              <div>
                <div className="font-semibold text-white mb-2">[0:30-1:00] Solution + Product Demo</div>
                <p className="mb-2 text-white/90">
                  &quot;So we built [Product Name]—an AI that writes personalized follow-up emails automatically 
                  based on the context of your sales call. You just click 'Send.' [Show 15-second demo or 
                  screenshot]. It integrates with your CRM, learns your writing style, and sends emails at 
                  the optimal time.&quot;
                </p>
              </div>

              <div>
                <div className="font-semibold text-white mb-2">[1:00-1:30] Traction + Market</div>
                <p className="mb-2 text-white/90">
                  &quot;We launched 8 months ago. We're at $500K ARR, growing 20% month-over-month, with 200 
                  customers including Salesforce and HubSpot. We're targeting the 2 million B2B sales teams 
                  globally—a $12B market. If we capture just 1% at $200/month, that&apos;s $240M ARR potential.&quot;
                </p>
              </div>

              <div>
                <div className="font-semibold text-white mb-2">[1:30-2:00] Business Model + Unit Economics</div>
                <p className="mb-2 text-white/90">
                  &quot;We charge $200 per user per month. Our CAC is $600, LTV is $4,800, so we have an 8:1 
                  LTV:CAC ratio and a 3-month payback period. Gross margin is 80% because we&apos;re SaaS.&quot;
                </p>
              </div>

              <div>
                <div className="font-semibold text-white mb-2">[2:00-2:30] Competition + Why You Win</div>
                <p className="mb-2 text-white/90">
                  &quot;The alternatives are manual follow-ups (slow, error-prone), generic email automation 
                  tools (not personalized), or hiring more SDRs (expensive, doesn&apos;t scale). We're the only 
                  AI-powered solution built specifically for follow-ups, and our NPS is 72.&quot;
                </p>
              </div>

              <div>
                <div className="font-semibold text-white mb-2">[2:30-3:00] Team + Ask</div>
                <p className="mb-2 text-white/90">
                  &quot;I was Head of Sales at [Company], my co-founder built the AI team at Google. We're 
                  raising a $2M seed round to scale from $500K to $5M ARR in 18 months—hiring 3 engineers 
                  and 2 salespeople. We'd love your feedback on our deck and to explore investing.&quot;
                </p>
              </div>
            </div>
          </div>

          <ArticleText>
            <strong>Key Principles:</strong> Start with the problem (not &quot;We're an AI company&quot;). Use 
            specific numbers (not &quot;we&apos;re growing fast&quot;). End with an ask. Practice until you can deliver 
            this in exactly 3 minutes without looking at notes.
          </ArticleText>
        </ArticleSection>

        {/* Storytelling Frameworks */}
        <ArticleSection heading="Storytelling: The Hero's Journey for Startups">
          <ArticleText>
            Investors remember stories, not features. The most compelling pitches follow the &quot;Hero's Journey&quot; 
            narrative structure—where the customer is the hero, the problem is the villain, and your 
            product is the magic sword.<InlineCitation number={4} id="4" />
          </ArticleText>

          <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-ink">
              <div className="text-xs uppercase tracking-widest text-graphite-600 mb-3">Act 1: The Ordinary World</div>
              <h4 className="font-serif text-xl font-bold text-ink mb-3">Before (Problem)</h4>
              <p className="text-sm text-graphite-800">
                Paint a picture of life before your solution. What&apos;s broken? What&apos;s painful? 
                Make the investor feel the frustration.
              </p>
              <p className="text-xs text-graphite-600 mt-3 italic">
                Example: "Sales reps spend 4 hours/day on admin work instead of selling."
              </p>
            </div>

            <div className="p-6 border-2 border-ink bg-graphite-50">
              <div className="text-xs uppercase tracking-widest text-graphite-600 mb-3">Act 2: The Journey</div>
              <h4 className="font-serif text-xl font-bold text-ink mb-3">During (Solution)</h4>
              <p className="text-sm text-graphite-800">
                Introduce your product as the &quot;guide&quot; that helps the hero (customer) overcome the villain 
                (problem). Show the transformation.
              </p>
              <p className="text-xs text-graphite-600 mt-3 italic">
                Example: &quot;Our AI automates admin tasks, giving reps 4 hours back per day.&quot;
              </p>
            </div>

            <div className="p-6 border-2 border-ink bg-ink text-white">
              <div className="text-xs uppercase tracking-widest text-white/70 mb-3">Act 3: The New World</div>
              <h4 className="font-serif text-xl font-bold mb-3 text-white">After (Outcome)</h4>
              <p className="text-sm text-white/90">
                Describe the future where the problem is solved. Use customer outcomes (not features) 
                to show the impact.
              </p>
              <p className="text-xs text-white/70 mt-3 italic">
                Example: "Our customers close 40% more deals and hit quota 3 months faster."
              </p>
            </div>
          </div>

          <PullQuote
            quote="The best pitches don&apos;t sell a product. They sell a vision of a better future—and position your startup as the only way to get there."
            author="First Round Review"
          />
        </ArticleSection>

        {/* Investor Psychology */}
        <ArticleSection heading="What Investors Actually Evaluate">
          <ArticleText>
            Investors don&apos;t just evaluate your business—they evaluate whether you&apos;ll deliver venture-scale 
            returns. Here&apos;s what they&apos;re really thinking during your pitch (and how to address it).<InlineCitation number={5} id="5" />
          </ArticleText>

          <DataTable
            headers={['Investor Question', 'What They\'re Thinking', 'How to Address It']}
            rows={[
              ['Can this be a $1B company?', 'Is the market big enough for 100x returns?', 'Show $1B+ TAM with bottoms-up calculation'],
              ['Why now?', 'Why didn\'t this exist 5 years ago?', 'Explain recent technology/regulatory/behavior shift'],
              ['Why you?', 'Are you the best team to build this?', 'Domain expertise, technical ability, or previous success'],
              ['What\'s the moat?', 'Can Google copy this in 6 months?', 'Network effects, data advantage, or 10x better product'],
              ['What could go wrong?', 'What keeps you up at night?', 'Acknowledge 1-2 risks, then explain mitigation strategy'],
              ['How do you make money?', 'Can this generate $100M+ revenue?', 'Clear pricing model with proven unit economics']
            ]}
            caption="Address these questions proactively in your pitch—don&apos;t wait for them to ask"
          />

          <CalloutBox type="warning">
            <strong>Red Flags Investors Screen For:</strong> Vague market sizing ("huge market"), 
            no clear competitive advantage ("first mover"), overly complex business model (multiple 
            revenue streams), weak traction explanation ("we just launched"), or team gaps (solo 
            technical founder with no business co-founder).
          </CalloutBox>
        </ArticleSection>

        {/* Design Principles */}
        <ArticleSection heading="Deck Design: Less Is More">
          <ArticleText>
            Your deck design should amplify your message, not distract from it. Follow these principles 
            from Y Combinator's analysis of 5,000+ pitch decks.<InlineCitation number={3} id="3" />
          </ArticleText>

          <Checklist
            items={[
              { text: 'One idea per slide (if you need 2 bullet points, you need 2 slides)' },
              { text: 'Use 24pt+ font size (readable from 10 feet away in a conference room)' },
              { text: 'Limit text to 10 words per slide (use speaker notes for details)' },
              { text: 'High-contrast colors (dark text on light background, avoid gradients)' },
              { text: 'Consistent font family (use 2 fonts max: one serif, one sans-serif)' },
              { text: 'Charts/graphs over tables (visualize data, don\'t make investors squint)' },
              { text: 'Professional (not clip art) icons and images' },
              { text: 'White space is good (don\'t cram slides—break into multiple slides)' },
              { text: 'No animations or transitions (they fail during screen sharing)' },
              { text: 'Save as PDF (ensures fonts/layout look identical on any device)' }
            ]}
          />

          <CalloutBox type="info">
            <strong>Before vs After:</strong><br />
            <strong>Bad Slide:</strong> &quot;Our AI-powered platform leverages machine learning algorithms 
            to optimize customer engagement through predictive analytics and real-time personalization.&quot;<br /><br />
            <strong>Good Slide:</strong> &quot;Our AI predicts which customers will churn—so you can save them.&quot; 
            [Include 1 visual showing prediction accuracy]
          </CalloutBox>
        </ArticleSection>

        {/* Common Mistakes */}
        <ArticleSection heading="7 Mistakes That Kill Pitches">
          <div className="my-12 space-y-6">
            <div className="p-6 border-l-4 border-graphite-600 bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">1. Starting with &quot;We're an AI company&quot;</h4>
              <p className="text-sm text-graphite-800">
                Investors don&apos;t invest in technology—they invest in solutions to real problems. 
                Start with the customer pain point, not your tech stack.
              </p>
            </div>

            <div className="p-6 border-l-4 border-graphite-600 bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">2. Using top-down market sizing</h4>
              <p className="text-sm text-graphite-800">
                &quot;We'll capture 1% of the $500B market&quot; is lazy. Calculate bottoms-up: # of target 
                customers × price × adoption rate = realistic TAM.
              </p>
            </div>

            <div className="p-6 border-l-4 border-graphite-600 bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">3. Saying &quot;we have no competitors&quot;</h4>
              <p className="text-sm text-graphite-800">
                Every problem has a solution today (even if it&apos;s manual). Acknowledge alternatives, 
                then explain why yours is 10x better.
              </p>
            </div>

            <div className="p-6 border-l-4 border-graphite-600 bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">4. Hiding weak traction</h4>
              <p className="text-sm text-graphite-800">
                If you have no revenue, show user growth. If no users, show LOIs or pilot signups. 
                If nothing, explain why (e.g., &quot;We're pre-launch, beta starts next month&quot;).
              </p>
            </div>

            <div className="p-6 border-l-4 border-graphite-600 bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">5. Overcomplicating the business model</h4>
              <p className="text-sm text-graphite-800">
                &quot;We have SaaS, marketplace, ads, and hardware revenue&quot; is a red flag. Pick one 
                primary revenue stream and nail it.
              </p>
            </div>

            <div className="p-6 border-l-4 border-graphite-600 bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">6. Using jargon or buzzwords</h4>
              <p className="text-sm text-graphite-800">
                &quot;Synergistic blockchain-enabled metaverse platform&quot; means nothing. Use plain English 
                that a 12-year-old could understand.
              </p>
            </div>

            <div className="p-6 border-l-4 border-graphite-600 bg-graphite-50">
              <h4 className="font-semibold text-ink mb-2">7. Not practicing out loud</h4>
              <p className="text-sm text-graphite-800">
                Reading your pitch in your head ≠ delivering it. Practice in front of a mirror, 
                record yourself, or pitch to friends. Aim for 10+ reps before the real meeting.
              </p>
            </div>
          </div>
        </ArticleSection>

        {/* Downloadable Templates */}
        <ArticleSection heading="Templates & Resources">
          <ArticleText>
            Use these templates to build your pitch deck and scripts. All formats are designed for 
            quick customization—replace placeholders with your content.
          </ArticleText>

          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </ArticleSection>

        {/* References */}
        <References citations={citations} />

        {/* Next Module */}
        <div className="mt-16 p-8 bg-ink text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/70 mb-3">
                Next Module
              </div>
              <h3 className="font-serif text-3xl font-bold mb-3 text-white">
                Industry Trends & Market Insights
              </h3>
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
                Explore 9 high-growth industries in India and USA—market size, key players, 
                opportunities, and founder playbooks for Tech, Fintech, SaaS, and more.
              </p>
            </div>
            <Link
              href="/learn/trends"
              className="flex-shrink-0 p-4 border-2 border-white hover:bg-white hover:text-ink transition-all"
            >
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </ArticleSpread>
    </LearnLayout>
  );
}
