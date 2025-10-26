import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Incubazar',
  description: 'Privacy Policy for Incubazar platform - How we collect, use, and protect your personal information'
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-foreground/60 mb-8">
          <strong>Last Updated:</strong> October 26, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Incubazar (<strong>"Incubazar"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>), 
            a sole proprietorship business, operates the Incubazar platform, a digital incubator connecting founders with investors. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your personal information when you use our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Personal Information You Provide</h3>
          <p>We collect the following types of personal information that you voluntarily provide:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Full name, email address, phone number, password (encrypted)</li>
            <li><strong>Profile Information:</strong> Professional details, company information, startup information, investment preferences, sector interests</li>
            <li><strong>KYC Information (Investors):</strong> PAN card number and document, Aadhaar card number and document, bank account details (account number, IFSC code), address proof</li>
            <li><strong>Business Information (Founders):</strong> Company name, CIN, incorporation date, business model, pitch deck, financial projections</li>
            <li><strong>Financial Information:</strong> Investment amounts, transaction history, subscription plan details</li>
            <li><strong>Documents:</strong> Pitch decks, financial statements, business plans, incorporation certificates, SAFE agreements, PAS-4 forms</li>
            <li><strong>Communication Data:</strong> Messages sent through our messaging system (post-investment only)</li>
            <li><strong>Payment Information:</strong> Billing information processed through Razorpay (we do not store complete card details)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Information Collected Automatically</h3>
          <p>When you use the Platform, we automatically collect certain information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Device Information:</strong> IP address, device type, operating system, browser type and version</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, search queries, features used</li>
            <li><strong>Analytics Data:</strong> Learning module views, calculator usage, deal views, document downloads</li>
            <li><strong>Cookies and Tracking:</strong> Session cookies, preference cookies, analytics cookies (see Cookie Policy)</li>
            <li><strong>Location Data:</strong> Approximate location based on IP address</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Information from Third-Party Services</h3>
          <p>We receive information from integrated third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Razorpay:</strong> Payment transaction details, payment status, subscription status</li>
            <li><strong>DocuSign:</strong> Document signing status, envelope IDs, signer information</li>
            <li><strong>Supabase:</strong> Authentication data, database queries, file storage metadata</li>
            <li><strong>Vercel Analytics:</strong> Web vitals, performance metrics, page views</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.4 AI and Matching Data</h3>
          <p>To provide our AI-powered matching service, we collect and analyze:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Startup sector, stage, funding needs, team composition</li>
            <li>Investor preferences, ticket size, sector expertise, past investments</li>
            <li>Compatibility scores, matching rationale, recommendation data</li>
            <li>User feedback on matches (accepted, declined, reasons)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Platform Operation and Services</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Management:</strong> Create and manage your account, authenticate access, verify identity</li>
            <li><strong>Matching Services:</strong> AI-powered matching between founders and investors based on compatibility</li>
            <li><strong>Transaction Processing:</strong> Facilitate deal discovery, interest expressions, document generation, and e-signatures</li>
            <li><strong>Messaging:</strong> Enable post-investment communication between verified parties</li>
            <li><strong>Subscription Management:</strong> Process premium subscriptions, manage billing, handle renewals</li>
            <li><strong>Learning Platform:</strong> Provide access to educational content, track module views (optional analytics)</li>
            <li><strong>Venture Calculator:</strong> Store calculation inputs and outputs for your reference</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Legal and Compliance</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>KYC Verification:</strong> Comply with Know Your Customer and Anti-Money Laundering regulations</li>
            <li><strong>Section 42 Compliance:</strong> Ensure private placement compliance under Companies Act 2013</li>
            <li><strong>Record Keeping:</strong> Maintain transaction records as required by law (7-10 years)</li>
            <li><strong>Regulatory Reporting:</strong> Comply with SEBI, RBI, and other regulatory requirements</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Communication</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Service Updates:</strong> Send notifications about platform changes, new features, policy updates</li>
            <li><strong>Marketing:</strong> Send newsletters, promotional content, educational resources (with opt-out option)</li>
            <li><strong>Support:</strong> Respond to inquiries, provide customer support, resolve disputes</li>
            <li><strong>Transactional Emails:</strong> Send subscription confirmations, payment receipts, password resets</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.4 Security and Fraud Prevention</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Detect and prevent fraud, abuse, and security incidents</li>
            <li>Monitor for suspicious activities and unauthorized access</li>
            <li>Protect the integrity of the Platform and user data</li>
            <li>Enforce our Terms of Service and legal rights</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.5 Analytics and Improvement</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usage Analytics:</strong> Understand how users interact with the Platform</li>
            <li><strong>Performance Monitoring:</strong> Track page load times, error rates, system health</li>
            <li><strong>Feature Development:</strong> Identify popular features, plan improvements</li>
            <li><strong>A/B Testing:</strong> Test new features and user interfaces (anonymized data only)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 With Your Consent</h3>
          <p>
            We share your information with third parties when you explicitly consent, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sharing your startup profile with matched investors</li>
            <li>Sharing your investor profile with founders you've expressed interest in</li>
            <li>Connecting you with other users through the messaging system post-investment</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Service Providers and Partners</h3>
          <p>We share information with trusted third-party service providers who assist in operating our Platform:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Supabase (Database & Auth):</strong> User data storage, authentication, file storage (data stored in secure cloud infrastructure)</li>
            <li><strong>Razorpay (Payments):</strong> Payment processing, subscription management, transaction details</li>
            <li><strong>DocuSign (E-Signatures):</strong> Document signing services, signature verification, envelope management</li>
            <li><strong>Vercel (Hosting & Analytics):</strong> Application hosting, web analytics, performance monitoring</li>
            <li><strong>AI/ML Service (Matching):</strong> Investor-founder matching algorithms (anonymized data processing)</li>
          </ul>
          <p className="mt-4">
            All service providers are contractually bound to maintain data confidentiality and security, 
            and may only use your information to perform services on our behalf.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Legal Requirements and Protection</h3>
          <p>
            We may disclose your information if required by law, court order, government request, or to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comply with legal obligations, subpoenas, or regulatory requests</li>
            <li>Protect our rights, property, and safety, or that of our users</li>
            <li>Prevent fraud, illegal activities, or violations of our Terms of Service</li>
            <li>Respond to SEBI, RBI, or other regulatory inquiries</li>
            <li>Cooperate with law enforcement investigations</li>
            <li>Enforce our agreements and policies</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Business Transfers</h3>
          <p>
            In case of merger, acquisition, reorganization, bankruptcy, or sale of assets, your information 
            may be transferred to the acquiring entity. We will notify you via email and/or prominent notice 
            on our Platform before your information is transferred and becomes subject to a different privacy policy.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.5 Aggregated and Anonymized Data</h3>
          <p>
            We may share aggregated, anonymized, or de-identified data that cannot reasonably be used to identify 
            you, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Industry trends and market statistics</li>
            <li>Platform usage metrics and analytics</li>
            <li>Research and reports on startup funding landscape</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p>We implement industry-standard security measures to protect your information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Encryption:</strong> Data is encrypted in transit (HTTPS) and at rest</li>
            <li><strong>Access Controls:</strong> Role-based access with strict permissions</li>
            <li><strong>Authentication:</strong> Secure login with password hashing</li>
            <li><strong>Monitoring:</strong> Continuous security monitoring and audits</li>
            <li><strong>Data Isolation:</strong> Row Level Security (RLS) policies in database</li>
          </ul>
          <p className="mt-4">
            However, no method of transmission over the internet is 100% secure. While we strive to protect 
            your information, we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide our services to you</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Resolve disputes and enforce agreements</li>
            <li>Maintain transaction records as required by law (typically 7-10 years)</li>
          </ul>
          <p className="mt-4">
            When your information is no longer needed, we will securely delete or anonymize it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p>You have the following rights regarding your personal information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
            <li><strong>Portability:</strong> Request export of your data in machine-readable format</li>
            <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, contact us at privacy@incubazar.in
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">8.1 Types of Cookies We Use</h3>
          <p>We use cookies and similar tracking technologies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential Cookies:</strong> Authentication, session management, security (cannot be disabled)</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences, language settings, saved filters</li>
            <li><strong>Analytics Cookies:</strong> Understand usage patterns, page views, feature adoption (Google Analytics, Vercel Analytics)</li>
            <li><strong>Performance Cookies:</strong> Monitor platform performance, load times, error rates</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.2 Managing Cookies</h3>
          <p>
            You can control cookie settings through your browser preferences. However, disabling certain cookies 
            may affect Platform functionality, such as staying logged in or remembering your preferences.
          </p>
          <p className="mt-4">
            For more information, please refer to our <a href="/legal/cookies" className="text-foreground hover:text-ink hover:underline">Cookie Policy</a>.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">8.3 Do Not Track (DNT)</h3>
          <p>
            We currently do not respond to Do Not Track (DNT) browser signals, as there is no universal standard 
            for DNT compliance. We will update this policy if industry standards change.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links</h2>
          <p>
            Our Platform may contain links to third-party websites. We are not responsible for the privacy 
            practices of these external sites. Please review their privacy policies before providing any 
            personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
          <p>
            Our Platform is not intended for users under 18 years of age. We do not knowingly collect 
            personal information from children. If you believe we have collected information from a minor, 
            please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries outside India. We ensure 
            appropriate safeguards are in place to protect your data in accordance with applicable laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you of significant changes by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Posting the updated policy on our Platform</li>
            <li>Updating the &quot;Last Updated&quot; date</li>
            <li>Sending email notifications for material changes</li>
          </ul>
          <p className="mt-4">
            Continued use of the Platform after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
          <p>
            For questions, concerns, or to exercise your privacy rights, contact us:
          </p>
          <div className="bg-graphite-50 p-6 rounded-lg mt-4">
            <p className="font-semibold mb-4">Incubazar (Sole Proprietorship)</p>
            <p><strong>Business Address:</strong> Mohali, Punjab, India</p>
            <p><strong>Data Protection Officer:</strong> privacy@incubazar.in</p>
            <p><strong>Support:</strong> support@incubazar.in</p>
            <p><strong>Compliance:</strong> compliance@incubazar.in</p>
            <p><strong>Website:</strong> https://incubazar.in</p>
          </div>
          <div className="mt-4 p-4 bg-graphite-100/50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">
              <strong>Additional Services:</strong> For branding and design inquiries, contact{' '}
              <a href="mailto:founder@incubazar.com" className="text-foreground/70 hover:underline">
                founder@incubazar.com
              </a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Compliance</h2>
          <p>
            This Privacy Policy complies with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Information Technology Act, 2000 (India)</li>
            <li>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
            <li>Digital Personal Data Protection Act, 2023 (India)</li>
            <li>Companies Act, 2013 (Section 42 - Private Placement)</li>
            <li>SEBI regulations regarding investor protection and data privacy</li>
            <li>Reserve Bank of India (RBI) guidelines for payment data</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-ink rounded-lg">
          <p className="text-sm text-foreground/70 leading-relaxed">
            <strong>⚖️ Legal Review Required:</strong> This Privacy Policy has been comprehensively updated to reflect 
            all platform services including AI matching, messaging, venture calculator, learning analytics, subscription 
            management, and third-party integrations (Razorpay, DocuSign, Supabase, Vercel). It complies with Indian 
            data protection laws including the Digital Personal Data Protection Act, 2023. However, it must be reviewed 
            and finalized by qualified legal counsel before being made legally binding. Please update placeholder information 
            (business address, DPO contact) with actual details.
          </p>
        </div>
      </div>
    </div>
  )
}
