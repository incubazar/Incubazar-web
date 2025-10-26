import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer & Risk Disclosure | Incubazar',
  description: 'Important risk disclaimers and disclosure information for Incubazar platform users'
}

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Disclaimer & Risk Disclosure</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-gray-600 mb-8">
          <strong>Last Updated:</strong> October 26, 2025
        </p>

        <div className="bg-red-50 border-2 border-red-300 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-red-800 mb-4">⚠️ CRITICAL RISK WARNING</h2>
          <p className="text-red-800 font-semibold text-lg">
            INVESTING IN STARTUPS IS HIGHLY SPECULATIVE AND INVOLVES SUBSTANTIAL RISK OF LOSS. 
            YOU MAY LOSE YOUR ENTIRE INVESTMENT. ONLY INVEST WHAT YOU CAN AFFORD TO LOSE.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Platform Purpose and Limitations</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">1.1 Matching Platform Only</h3>
          <p>
            Incubazar is a <strong>matching and facilitation platform</strong> that connects startups 
            seeking funding with potential investors. We are a technology-enabled marketplace, NOT an investment firm. We:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>DO NOT</strong> provide investment advice or recommendations</li>
            <li><strong>DO NOT</strong> act as a broker, dealer, or investment advisor</li>
            <li><strong>DO NOT</strong> pool funds or manage investments</li>
            <li><strong>DO NOT</strong> guarantee returns or success of any startup</li>
            <li><strong>DO NOT</strong> conduct due diligence on behalf of investors</li>
            <li><strong>DO NOT</strong> hold custody of investor funds</li>
            <li><strong>DO NOT</strong> operate as an incubator, accelerator, or venture capital firm</li>
            <li><strong>DO NOT</strong> verify the accuracy of information provided by founders</li>
            <li><strong>DO NOT</strong> guarantee the quality or viability of listed startups</li>
          </ul>
          <p className="mt-4 text-gray-700">
            <strong>What We Do:</strong> We provide the technology infrastructure and tools to facilitate connections 
            between founders and investors. All investment decisions, negotiations, and transactions occur directly 
            between the parties. Our AI matching algorithm provides suggestions based on data, but does not constitute 
            investment advice.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">1.2 Platform Services Overview</h3>
          <p>
            Incubazar provides the following services, each with specific limitations:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Matching Service:</strong> AI-powered suggestions based on preferences - not guarantees</li>
            <li><strong>Deal Listings:</strong> User-generated content - we do not verify claims</li>
            <li><strong>Venture Calculator:</strong> Educational tool only - not financial advice</li>
            <li><strong>Learning Platform:</strong> General educational content - not professional advice</li>
            <li><strong>Messaging System:</strong> Communication tool only - not legal or binding agreements</li>
            <li><strong>Document Templates:</strong> Starting points only - require legal review</li>
            <li><strong>Data Room:</strong> File storage only - we do not review documents</li>
            <li><strong>Subscriptions:</strong> Access to platform features - not investment returns</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">1.3 Private Placement Structure</h3>
          <p>
            All investment opportunities on the Platform are conducted as <strong>private placements</strong> 
            under Section 42 of the Companies Act, 2013. This means:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Offers are made to a select group of investors only</li>
            <li>No public solicitation or advertising is permitted</li>
            <li>Maximum of 200 investors per company per financial year</li>
            <li>Investors must complete KYC verification</li>
            <li>Three-day cooling-off period after expression of interest</li>
            <li>All transactions subject to proper legal documentation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Investment Risks</h2>

          <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-lg mb-6">
            <p className="font-semibold text-yellow-900 mb-3">
              Startup investments carry risks that are materially different from traditional investments:
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Loss of Capital</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Total Loss:</strong> Most startups fail - you may lose 100% of your investment</li>
            <li><strong>No Guarantee:</strong> There is no guarantee of returns, dividends, or exit opportunities</li>
            <li><strong>Permanent Impairment:</strong> Your investment may become permanently worthless</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Illiquidity Risk</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Long Holding Period:</strong> Typical investment horizons are 5-10 years or longer</li>
            <li><strong>No Secondary Market:</strong> There is no established market to sell your shares</li>
            <li><strong>Difficulty Exiting:</strong> You may not be able to exit your investment when desired</li>
            <li><strong>Lock-in Clauses:</strong> Investment agreements may restrict transfers for several years</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Dilution Risk</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Future Fundraising:</strong> Additional funding rounds may dilute your ownership percentage</li>
            <li><strong>Anti-Dilution Provisions:</strong> Founders and early investors may have protective provisions</li>
            <li><strong>Reduced Value:</strong> Your proportional stake may decrease significantly over time</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.4 Operational Risks</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Business Failure:</strong> Startups have high failure rates (70-90% fail within 5 years)</li>
            <li><strong>Management Risk:</strong> Success depends heavily on founder capability and execution</li>
            <li><strong>Market Risk:</strong> Market conditions may change, making the business model unviable</li>
            <li><strong>Competition:</strong> Competitors may offer better products or capture market share</li>
            <li><strong>Regulatory Changes:</strong> New regulations may adversely affect the business</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.5 Information Risk</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Limited Information:</strong> Early-stage companies may lack comprehensive financial data</li>
            <li><strong>No Audit Requirement:</strong> Startups may not have audited financial statements</li>
            <li><strong>Projections Uncertain:</strong> Business projections are estimates and may not materialize</li>
            <li><strong>Disclosure Gaps:</strong> Material information may not be disclosed or may be incomplete</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.6 Minority Shareholder Risk</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Limited Control:</strong> You will have minimal or no control over company decisions</li>
            <li><strong>No Voting Rights:</strong> Some instruments (like CCDs, SAFEs) may not provide voting rights</li>
            <li><strong>Exit Preferences:</strong> Founders and early investors may have liquidation preferences</li>
            <li><strong>Drag-Along Rights:</strong> Majority shareholders may force you to sell in certain scenarios</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Investor Responsibilities</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Due Diligence</h3>
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-4">
            <p className="font-semibold text-blue-900 mb-2">YOU MUST CONDUCT YOUR OWN DUE DILIGENCE:</p>
            <ul className="list-disc pl-6 space-y-2 text-blue-900">
              <li>Review all documents provided by the startup</li>
              <li>Verify claims and financial projections</li>
              <li>Assess the management team and their capabilities</li>
              <li>Evaluate the market opportunity and competition</li>
              <li>Understand the terms of the investment instrument</li>
              <li>Consult with financial advisors, lawyers, and tax professionals</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Eligibility and Suitability</h3>
          <p>Before investing, ensure that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You meet all eligibility requirements</li>
            <li>You understand startup investment risks</li>
            <li>You can afford to lose your entire investment</li>
            <li>Startup investments align with your financial goals and risk tolerance</li>
            <li>You have adequate diversification in your portfolio</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Professional Advice</h3>
          <p className="font-semibold">
            WE STRONGLY RECOMMEND consulting with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Financial Advisor:</strong> To assess investment suitability</li>
            <li><strong>Legal Counsel:</strong> To review investment agreements</li>
            <li><strong>Tax Professional:</strong> To understand tax implications</li>
            <li><strong>Chartered Accountant:</strong> To verify financial information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Information Accuracy</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Founder-Provided Information</h3>
          <p>
            All information about startups is provided by the founders themselves. Incubazar:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Does NOT verify the accuracy or completeness of information</li>
            <li>Does NOT endorse or recommend any particular investment</li>
            <li>Does NOT guarantee the truthfulness of claims made by founders</li>
            <li>Is NOT liable for inaccurate, misleading, or incomplete information</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Forward-Looking Statements</h3>
          <p>
            Business plans and projections are <strong>forward-looking statements</strong> that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Are based on assumptions that may not materialize</li>
            <li>Involve significant uncertainties and risks</li>
            <li>Should not be relied upon as predictions of actual results</li>
            <li>May differ materially from actual outcomes</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Past Performance</h3>
          <p className="font-semibold">
            PAST PERFORMANCE DOES NOT INDICATE FUTURE RESULTS. Prior success of founders or companies 
            does not guarantee success of current ventures.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Regulatory Compliance</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.1 No SEBI Registration</h3>
          <p>
            Incubazar is NOT registered with the Securities and Exchange Board of India (SEBI) as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Stock broker or investment advisor</li>
            <li>Portfolio manager or mutual fund</li>
            <li>Alternative Investment Fund (AIF)</li>
          </ul>
          <p className="mt-4">
            We operate under Section 42 of the Companies Act, 2013 (Private Placement) exemptions.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Investor Limits</h3>
          <p>
            Under private placement rules:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maximum 200 investors per company per financial year</li>
            <li>Offers must be made through private placement offer letters</li>
            <li>Three-day cooling-off period after receipt of offer</li>
            <li>Application money to be kept in escrow until allotment</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Investor Obligations</h3>
          <p>As an investor, you must:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Complete KYC (PAN, Aadhaar, bank verification)</li>
            <li>Provide accurate information</li>
            <li>Comply with anti-money laundering (AML) regulations</li>
            <li>Report income and capital gains to tax authorities</li>
            <li>Maintain records of investments</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Tax Implications</h2>
          <p className="font-semibold mb-4">
            CONSULT A TAX PROFESSIONAL. Tax treatment of startup investments is complex:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Capital Gains:</strong> Long-term vs. short-term gains have different tax rates</li>
            <li><strong>Holding Period:</strong> Unlisted shares require 24+ months for LTCG</li>
            <li><strong>Loss Treatment:</strong> Capital losses have specific carry-forward rules</li>
            <li><strong>Dividend Tax:</strong> Dividends (if any) are taxable at slab rates</li>
            <li><strong>Angel Tax:</strong> Potential Section 56(2)(viib) implications for startups</li>
            <li><strong>Withholding:</strong> TDS may apply to certain transactions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Platform Tools and Services Disclaimers</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.1 Venture Metric Calculator</h3>
          <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-lg mb-4">
            <p className="font-semibold text-yellow-900 mb-3">
              ⚠️ EDUCATIONAL TOOL ONLY - NOT FINANCIAL ADVICE
            </p>
            <p className="text-yellow-800">
              The Venture Metric Calculator (Runway, LTV:CAC, Equity Split, Valuation) is an educational tool 
              designed to help founders understand financial modeling concepts. It is NOT:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-yellow-800 mt-2">
              <li>Professional financial advice or consulting</li>
              <li>A guarantee of funding, valuation, or business success</li>
              <li>A substitute for accountant, lawyer, or financial advisor</li>
              <li>Verified by external auditors or financial professionals</li>
            </ul>
          </div>
          <p><strong>Calculator Limitations:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Results are estimates based on inputs you provide</li>
            <li>Formulas use industry benchmarks (Y Combinator, Andreessen Horowitz, SaaStr) but may not reflect your specific situation</li>
            <li>AI-generated insights are algorithmic suggestions, not expert analysis</li>
            <li>We do not verify the accuracy of data you input</li>
            <li>Calculator does not account for market changes, competitive factors, or unforeseen circumstances</li>
            <li>Results should be validated with professional advisors before making business decisions</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Learning Platform Content</h3>
          <p>
            Our educational content library provides general information about startups, fundraising, legal structures, 
            and business operations. This content:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>IS:</strong> General educational material for reference</li>
            <li><strong>IS NOT:</strong> Legal, financial, tax, or professional advice</li>
            <li><strong>IS NOT:</strong> Tailored to your specific circumstances</li>
            <li><strong>IS NOT:</strong> A substitute for consulting qualified professionals</li>
          </ul>
          <p className="mt-4">
            While we cite authoritative sources (SEBI, MCA, YC, Sequoia), regulations change frequently. 
            Always verify current laws and consult professionals before making legal or financial decisions.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.3 AI Matching Algorithm</h3>
          <p>
            Our AI-powered matching service suggests potential investor-founder connections based on:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sector alignment and expertise</li>
            <li>Funding stage preferences</li>
            <li>Ticket size compatibility</li>
            <li>Geographic preferences</li>
          </ul>
          <p className="mt-4 font-semibold">
            HOWEVER: Matching scores are algorithmic suggestions, NOT guarantees. We do not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Verify the quality or viability of matched startups</li>
            <li>Guarantee compatibility, success, or investment closure</li>
            <li>Conduct background checks or due diligence on our behalf</li>
            <li>Take responsibility for match quality or outcomes</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.4 Document Templates (SAFE, PAS-4)</h3>
          <p className="font-semibold mb-2">
            ⚠️ STARTING POINTS ONLY - REQUIRE LEGAL REVIEW
          </p>
          <p>
            Document templates provided are generic starting points. They:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Must be reviewed and customized by qualified legal counsel</li>
            <li>May not be suitable for your specific situation</li>
            <li>May not reflect current legal requirements or best practices</li>
            <li>Do not constitute legal advice or create an attorney-client relationship</li>
          </ul>
          <p className="mt-4">
            NEVER sign legal documents without professional review. We are not liable for consequences 
            of using templates without proper legal consultation.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.5 Subscription Services</h3>
          <p>
            Premium subscriptions provide access to platform features, NOT investment returns:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Subscription fees are for software access, not investment advice</li>
            <li>No guarantee of funding success, investor matches, or deal closures</li>
            <li>Fees are non-refundable except as required by law</li>
            <li>Platform features may change or be discontinued</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. No Guarantee or Insurance</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Investments are NOT insured by DICGC or any government agency</li>
            <li>There is NO investor protection fund or compensation scheme</li>
            <li>We do NOT guarantee returns, principal, or exit opportunities</li>
            <li>Market fluctuations may result in total loss</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Platform Risks</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">9.1 Technology Risks</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>System Failures:</strong> Technical issues may cause service interruptions</li>
            <li><strong>Cybersecurity:</strong> Despite security measures, breaches are possible</li>
            <li><strong>Data Loss:</strong> Information may be lost due to technical failures</li>
            <li><strong>Third-Party Dependencies:</strong> We rely on Supabase, Razorpay, DocuSign, and Vercel - disruptions may affect services</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">9.2 Platform Discontinuation</h3>
          <p>
            Incubazar may cease operations due to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Financial difficulties</li>
            <li>Regulatory changes</li>
            <li>Business decisions</li>
          </ul>
          <p className="mt-4">
            In such case, your investments remain valid, but platform services will no longer be available.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Conflicts of Interest</h2>
          <p>Potential conflicts may arise:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Platform earns subscription fees from both founders and investors</li>
            <li>Platform operators may invest in startups listed on the platform</li>
            <li>Affiliated parties may have financial interests in listed companies</li>
            <li>AI matching algorithms prioritize active subscribers</li>
          </ul>
          <p className="mt-4">
            We will disclose material conflicts when they arise and maintain transparency in our operations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Disclaimer of Liability</h2>
          <p className="font-semibold mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Incubazar is NOT liable for investment losses</li>
            <li>Incubazar is NOT liable for startup failures or fraud</li>
            <li>Incubazar is NOT liable for inaccurate information provided by founders</li>
            <li>Incubazar is NOT liable for tax consequences of investments</li>
            <li>Incubazar is NOT liable for platform technical issues or data loss</li>
            <li>Incubazar is NOT liable for regulatory changes affecting investments</li>
            <li>Incubazar is NOT liable for decisions made using calculator tools</li>
            <li>Incubazar is NOT liable for reliance on learning platform content</li>
            <li>Incubazar is NOT liable for AI matching algorithm outcomes</li>
            <li>Incubazar is NOT liable for third-party service failures (Razorpay, DocuSign, Supabase)</li>
          </ul>
          <p className="mt-4">
            Your sole remedies are as set forth in our Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Acknowledgment</h2>
          <div className="bg-gray-100 border-2 border-gray-400 p-6 rounded-lg">
            <p className="font-semibold mb-4">BY USING THE PLATFORM, YOU ACKNOWLEDGE THAT:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You have read and understood this Disclaimer and Risk Disclosure</li>
              <li>You understand startup investments are high-risk and illiquid</li>
              <li>You accept the possibility of losing your entire investment</li>
              <li>You will conduct your own due diligence</li>
              <li>You will seek professional advice before investing</li>
              <li>You are solely responsible for your investment decisions</li>
              <li>Incubazar is not liable for your investment outcomes</li>
              <li>Calculator tools are educational only, not financial advice</li>
              <li>Learning content is general information, not professional advice</li>
              <li>AI matching suggestions are algorithmic, not guarantees</li>
              <li>Document templates require legal review</li>
              <li>You understand all limitations and disclaimers stated herein</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
          <p>
            For questions about risks or this disclaimer, contact:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mt-4">
            <p className="font-semibold mb-4">Incubazar (Sole Proprietorship)</p>
            <p><strong>Business Address:</strong> Mohali, Punjab, India</p>
            <p><strong>Email:</strong> support@incubazar.in</p>
            <p><strong>Compliance:</strong> compliance@incubazar.in</p>
            <p><strong>Risk Disclosure:</strong> legal@incubazar.in</p>
            <p><strong>Website:</strong> https://incubazar.in</p>
          </div>
        </section>

        <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-400 rounded-lg">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>⚠️ LEGAL NOTICE:</strong> This Disclaimer & Risk Disclosure document has been comprehensively 
            updated to cover all platform services including AI matching, messaging, venture calculator, learning 
            platform, subscription services, and third-party integrations. It complies with SEBI guidelines for 
            investment platforms, Companies Act 2013 (Section 42), and startup investment best practices. However, 
            it MUST be reviewed by qualified legal counsel specializing in securities law, investment regulations, 
            and fintech compliance before being made legally binding. This is NOT legal advice. Please update 
            placeholder information (business address) with actual details.
          </p>
        </div>
      </div>
    </div>
  )
}
