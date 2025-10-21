import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Incubazar',
  description: 'Terms of Service for Incubazar platform - Rules and guidelines for using our services'
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-gray-600 mb-8">
          <strong>Last Updated:</strong> October 19, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            Welcome to Incubazar. These Terms of Service ("Terms") govern your use of the Incubazar platform 
            ("Platform") operated by [Company Name] ("we," "our," or "us"). By accessing or using the Platform, 
            you agree to be bound by these Terms.
          </p>
          <p>
            <strong>IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE THE PLATFORM.</strong>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>"Platform"</strong> means the Incubazar website, mobile application, and related services</li>
            <li><strong>"User"</strong> means any person who accesses or uses the Platform</li>
            <li><strong>"Founder"</strong> means a User seeking investment for their startup</li>
            <li><strong>"Investor"</strong> means a User looking to invest in startups</li>
            <li><strong>"Deal"</strong> means an investment opportunity listed on the Platform</li>
            <li><strong>"Content"</strong> means text, images, documents, and other materials uploaded to the Platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Eligibility</h2>
          <p>To use the Platform, you must:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Be at least 18 years of age</li>
            <li>Have the legal capacity to enter into binding contracts</li>
            <li>Not be prohibited from using the Platform under applicable laws</li>
            <li>Provide accurate and complete registration information</li>
            <li>Maintain the security of your account credentials</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Accounts</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Account Registration</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must create an account to use certain Platform features</li>
            <li>You agree to provide accurate, current, and complete information</li>
            <li>You are responsible for maintaining account confidentiality</li>
            <li>You are liable for all activities under your account</li>
            <li>You must notify us immediately of any unauthorized access</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Account Types</h3>
          <p><strong>Founder Accounts:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Must provide company and incorporation details</li>
            <li>Subject to admin verification and approval</li>
            <li>Required to submit accurate business information</li>
            <li>Responsible for all content uploaded to their deals</li>
          </ul>

          <p className="mt-4"><strong>Investor Accounts:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Must complete KYC verification (PAN, Aadhaar, bank details)</li>
            <li>Subject to eligibility and regulatory requirements</li>
            <li>Must be an Indian resident or entity</li>
            <li>Acknowledge investment risks and compliance requirements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Platform Usage</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Permitted Use</h3>
          <p>You may use the Platform to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browse investment opportunities (if you're an Investor)</li>
            <li>List fundraising deals (if you're a Founder)</li>
            <li>Communicate with other Users through the Platform</li>
            <li>Access educational and informational content</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Prohibited Activities</h3>
          <p>You agree NOT to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Provide false, misleading, or fraudulent information</li>
            <li>Impersonate any person or entity</li>
            <li>Upload malicious code, viruses, or harmful content</li>
            <li>Attempt to gain unauthorized access to the Platform</li>
            <li>Scrape, copy, or download Platform data without permission</li>
            <li>Solicit investments outside the Platform (bypass)</li>
            <li>Manipulate or artificially inflate deal metrics</li>
            <li>Harass, threaten, or abuse other Users</li>
            <li>Use the Platform for money laundering or illegal activities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Investment Transactions</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Platform Role</h3>
          <p>
            <strong>IMPORTANT:</strong> Incubazar is a <strong>facilitator and connector</strong> only. We do NOT:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pool funds or act as an investment advisor</li>
            <li>Guarantee returns or success of any startup</li>
            <li>Conduct due diligence on your behalf</li>
            <li>Hold custody of investor funds</li>
            <li>Make investment recommendations</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Private Placement Compliance</h3>
          <p>
            All deals are conducted as <strong>private placements</strong> under Section 42 of the Companies Act, 2013:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maximum 200 investors per deal</li>
            <li>No public solicitation or advertising</li>
            <li>Access limited to registered Users only</li>
            <li>Cooling-off period of 3 days after expression of interest</li>
            <li>All transactions subject to legal documentation</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Investor Responsibilities</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Conduct your own due diligence before investing</li>
            <li>Understand and accept all investment risks</li>
            <li>Ensure you meet investor eligibility criteria</li>
            <li>Comply with KYC and AML requirements</li>
            <li>Report suspicious activities to authorities</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.4 Founder Responsibilities</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete business information</li>
            <li>Disclose all material facts and risks</li>
            <li>Maintain compliance with securities regulations</li>
            <li>Update investors on company progress</li>
            <li>Execute proper legal documentation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Payments and Fees</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">7.1 Platform Fees</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Subscription Fees:</strong> Monthly or annual fees for premium features</li>
            <li><strong>Success Fees:</strong> Charged upon successful deal closure (if applicable)</li>
            <li><strong>Payment Processing:</strong> Handled by Razorpay (subject to their fees)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Payment Terms</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>All fees are in Indian Rupees (INR)</li>
            <li>Payments are non-refundable unless otherwise stated</li>
            <li>We reserve the right to change fees with 30 days notice</li>
            <li>Unpaid fees may result in account suspension</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.3 Investment Payments</h3>
          <p>
            Investment transactions are between Investors and Founders. We facilitate document 
            execution but do NOT handle fund transfers directly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">8.1 Platform IP</h3>
          <p>
            All Platform content, features, and functionality (including but not limited to software, text, 
            graphics, logos, and trademarks) are owned by us and protected by copyright, trademark, and 
            other intellectual property laws.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.2 User Content</h3>
          <p>
            You retain ownership of content you upload. By uploading content, you grant us a 
            worldwide, royalty-free license to use, display, and distribute your content on the Platform.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.3 Restrictions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>You may not copy, modify, or distribute Platform content without permission</li>
            <li>You may not reverse engineer or decompile the Platform</li>
            <li>You may not create derivative works from the Platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Disclaimers and Limitations</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">9.1 No Warranty</h3>
          <p>
            THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, 
            EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">9.2 Investment Risks</h3>
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <p className="font-semibold text-yellow-800 mb-2">⚠️ INVESTMENT RISK DISCLAIMER:</p>
            <ul className="list-disc pl-6 space-y-2 text-yellow-800">
              <li>Startup investments are highly risky</li>
              <li>You may lose your entire investment</li>
              <li>Returns are not guaranteed</li>
              <li>Investments may be illiquid and difficult to exit</li>
              <li>Past performance does not indicate future results</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">9.3 Limitation of Liability</h3>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
            SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR INVESTMENTS.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">10.1 Termination by You</h3>
          <p>
            You may terminate your account at any time by contacting support@incubazar.in
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">10.2 Termination by Us</h3>
          <p>We may suspend or terminate your account if:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You violate these Terms</li>
            <li>You engage in fraudulent or illegal activities</li>
            <li>Required by law or regulatory authority</li>
            <li>Your account is inactive for an extended period</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">10.3 Effect of Termination</h3>
          <p>
            Upon termination:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your access to the Platform will be revoked</li>
            <li>Your data may be deleted (subject to legal requirements)</li>
            <li>Outstanding obligations remain enforceable</li>
            <li>Certain provisions survive termination (e.g., liability, indemnification)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Incubazar, its officers, directors, employees, 
            and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) 
            arising from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your use of the Platform</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any laws or third-party rights</li>
            <li>Content you upload or transactions you conduct</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Governing Law and Dispute Resolution</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">12.1 Governing Law</h3>
          <p>
            These Terms are governed by the laws of India. You submit to the exclusive jurisdiction of 
            courts in [City/State - To Be Provided].
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">12.2 Dispute Resolution</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Negotiation:</strong> First attempt to resolve disputes through good-faith negotiation</li>
            <li><strong>Arbitration:</strong> Unresolved disputes shall be settled by arbitration under Indian Arbitration and Conciliation Act, 1996</li>
            <li><strong>Venue:</strong> Arbitration proceedings in [City - To Be Provided]</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective upon posting 
            to the Platform. Continued use after changes constitutes acceptance.
          </p>
          <p className="mt-4">
            We will notify you of material changes via:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email notification</li>
            <li>Platform announcement</li>
            <li>Updated "Last Updated" date</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. General Provisions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Severability:</strong> Invalid provisions do not affect the validity of remaining Terms</li>
            <li><strong>Waiver:</strong> Failure to enforce a provision does not constitute a waiver</li>
            <li><strong>Assignment:</strong> You may not assign these Terms without our consent</li>
            <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and us</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
          <div className="bg-gray-50 p-6 rounded-lg mt-4">
            <p><strong>Email:</strong> support@incubazar.in</p>
            <p><strong>Legal:</strong> legal@incubazar.in</p>
            <p><strong>Address:</strong> [Company Address - To Be Provided]</p>
            <p><strong>Phone:</strong> [Phone Number - To Be Provided]</p>
          </div>
        </section>

        <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>⚠️ LEGAL NOTICE:</strong> This Terms of Service document is a template and MUST be 
            reviewed and approved by qualified legal counsel before use. Company-specific details, contact 
            information, arbitration venue, and jurisdiction must be specified. Consult with a lawyer 
            specializing in securities law, fintech regulations, and the Companies Act, 2013.
          </p>
        </div>
      </div>
    </div>
  )
}
