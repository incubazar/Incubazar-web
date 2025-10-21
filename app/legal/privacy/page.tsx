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
        <p className="text-gray-600 mb-8">
          <strong>Last Updated:</strong> October 19, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to Incubazar ("we," "our," or "us"). We are committed to protecting your personal information 
            and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
            your information when you use our platform at incubazar.in (the "Platform").
          </p>
          <p>
            By accessing or using the Platform, you agree to this Privacy Policy. If you do not agree with this 
            policy, please do not access or use the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Personal Information</h3>
          <p>We collect the following types of personal information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
            <li><strong>Profile Information:</strong> Professional details, company information, investment preferences</li>
            <li><strong>KYC Information:</strong> PAN card, Aadhaar card, bank account details, address proof</li>
            <li><strong>Financial Information:</strong> Investment amounts, transaction history, payment details</li>
            <li><strong>Documents:</strong> Pitch decks, financial statements, business plans, incorporation certificates</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Usage data and analytics</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Platform Operation:</strong> To provide, maintain, and improve our services</li>
            <li><strong>Account Management:</strong> To create and manage your account</li>
            <li><strong>Transaction Processing:</strong> To facilitate investments and payments</li>
            <li><strong>KYC Verification:</strong> To comply with legal and regulatory requirements</li>
            <li><strong>Communication:</strong> To send updates, notifications, and marketing materials</li>
            <li><strong>Security:</strong> To detect fraud, prevent abuse, and protect our Platform</li>
            <li><strong>Analytics:</strong> To understand usage patterns and improve user experience</li>
            <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 With Your Consent</h3>
          <p>
            We may share your information with third parties when you explicitly consent to such sharing.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Service Providers</h3>
          <p>We share information with trusted third-party service providers:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Payment Processing:</strong> Razorpay (for payment transactions)</li>
            <li><strong>Document Signing:</strong> DocuSign (for e-signature services)</li>
            <li><strong>Cloud Storage:</strong> Supabase (for data storage and authentication)</li>
            <li><strong>Analytics:</strong> Vercel Analytics (for usage statistics)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Legal Requirements</h3>
          <p>
            We may disclose your information if required by law, court order, or government request, or to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comply with legal obligations</li>
            <li>Protect our rights and property</li>
            <li>Prevent fraud or illegal activities</li>
            <li>Protect the safety of our users</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Business Transfers</h3>
          <p>
            In case of merger, acquisition, or sale of assets, your information may be transferred to the 
            acquiring entity.
          </p>
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
          <p>We use cookies and similar technologies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Remember your preferences</li>
            <li>Understand usage patterns</li>
            <li>Improve Platform performance</li>
            <li>Provide personalized content</li>
          </ul>
          <p className="mt-4">
            You can control cookie settings through your browser. However, disabling cookies may affect 
            Platform functionality.
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
            <li>Updating the "Last Updated" date</li>
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
          <div className="bg-gray-50 p-6 rounded-lg mt-4">
            <p><strong>Email:</strong> privacy@incubazar.in</p>
            <p><strong>Support:</strong> support@incubazar.in</p>
            <p><strong>Address:</strong> [Company Address - To Be Provided]</p>
            <p><strong>Phone:</strong> [Phone Number - To Be Provided]</p>
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
            <li>Companies Act, 2013 (Section 42 - Private Placement)</li>
            <li>SEBI regulations regarding investor protection</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> This Privacy Policy is a template and should be reviewed by legal counsel 
            before publication. Specific company details, contact information, and local jurisdiction requirements 
            must be added.
          </p>
        </div>
      </div>
    </div>
  )
}
