import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Code of Conduct | Incubazar',
  description: 'Community guidelines and code of conduct for Incubazar platform users - Standards for professional behavior and ethical conduct'
}

export default function CodeOfConductPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Code of Conduct</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-gray-600 mb-8">
          <strong>Last Updated:</strong> October 26, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Our Commitment</h2>
          <p>
            Incubazar is committed to providing a professional, respectful, and inclusive environment for all users—founders, 
            investors, and administrators. This Code of Conduct outlines our community values and expected behavior on the Platform.
          </p>
          <p className="mt-4">
            By using Incubazar, you agree to uphold these standards and contribute to a positive, trustworthy ecosystem.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Core Values</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Integrity</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Be honest and transparent in all communications and transactions</li>
            <li>Provide accurate information in profiles, pitches, and financial data</li>
            <li>Honor commitments and agreements made through the Platform</li>
            <li>Disclose conflicts of interest and material information</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Respect</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Treat all users with courtesy and professionalism</li>
            <li>Value diverse perspectives, backgrounds, and experiences</li>
            <li>Respect others' time, privacy, and intellectual property</li>
            <li>Engage in constructive, solution-oriented discussions</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Trust</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Build relationships based on mutual respect and credibility</li>
            <li>Maintain confidentiality when required</li>
            <li>Follow through on promises and obligations</li>
            <li>Report violations and unethical behavior</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.4 Collaboration</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Foster a spirit of cooperation and knowledge sharing</li>
            <li>Support fellow founders and investors where appropriate</li>
            <li>Provide constructive feedback when requested</li>
            <li>Contribute to a thriving startup ecosystem</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Expected Behavior</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">3.1 For All Users</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Honesty:</strong> Provide truthful, accurate information in all Platform interactions</li>
            <li><strong>Professionalism:</strong> Communicate in a business-appropriate manner</li>
            <li><strong>Compliance:</strong> Follow all Platform policies, Terms of Service, and applicable laws</li>
            <li><strong>Security:</strong> Protect your account credentials and report suspicious activity</li>
            <li><strong>Privacy:</strong> Respect the confidentiality of sensitive information</li>
            <li><strong>Fairness:</strong> Engage in ethical business practices without manipulation or coercion</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 For Founders</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide complete and accurate startup information (team, product, financials, risks)</li>
            <li>Disclose all material facts and potential conflicts to investors</li>
            <li>Respond to investor inquiries promptly and professionally</li>
            <li>Maintain realistic projections and avoid exaggerated claims</li>
            <li>Update investors on material developments (positive or negative)</li>
            <li>Honor term sheets and commitments made to investors</li>
            <li>Comply with Section 42 private placement requirements</li>
            <li>Respect the 200-investor limit per company per year</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.3 For Investors</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Conduct thorough due diligence before expressing interest</li>
            <li>Communicate investment criteria and expectations clearly</li>
            <li>Provide timely responses to founders you've connected with</li>
            <li>Honor commitments made during the investment process</li>
            <li>Complete KYC verification accurately and promptly</li>
            <li>Respect confidentiality of proprietary information</li>
            <li>Provide constructive feedback when declining opportunities</li>
            <li>Avoid soliciting deals outside the Platform (no bypassing)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.4 Communication Standards</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use professional language and tone in all messages</li>
            <li>Respond to messages within a reasonable timeframe (2-3 business days)</li>
            <li>Be clear, concise, and respectful in written communication</li>
            <li>Avoid excessive or unsolicited outreach</li>
            <li>Use the messaging system only for investment-related discussions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Prohibited Behavior</h2>
          
          <div className="bg-red-50 border border-red-300 p-6 rounded-lg mb-6">
            <p className="font-semibold text-red-800 mb-3">
              ⚠️ The following behaviors are strictly prohibited and may result in immediate account suspension:
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Fraud and Misrepresentation</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing false or misleading information</li>
            <li>Impersonating another person or entity</li>
            <li>Creating fake profiles or companies</li>
            <li>Manipulating financial data, metrics, or traction</li>
            <li>Making false claims about team credentials or achievements</li>
            <li>Hiding material risks or negative information</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Harassment and Abuse</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Harassing, threatening, or intimidating other users</li>
            <li>Discriminatory behavior based on race, gender, religion, nationality, disability, age, or sexual orientation</li>
            <li>Bullying, stalking, or unwanted contact</li>
            <li>Sexual harassment or inappropriate advances</li>
            <li>Abusive, defamatory, or hateful language</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Platform Abuse</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Spamming users with unsolicited messages or deals</li>
            <li>Creating multiple accounts to bypass restrictions</li>
            <li>Manipulating Platform algorithms or matching systems</li>
            <li>Scraping data or using automated bots</li>
            <li>Attempting to hack, exploit, or disrupt Platform services</li>
            <li>Sharing account credentials or allowing unauthorized access</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Legal and Regulatory Violations</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Money laundering or terrorist financing</li>
            <li>Securities fraud or insider trading</li>
            <li>Tax evasion or financial crimes</li>
            <li>Violation of Section 42 private placement rules</li>
            <li>Non-compliance with SEBI, RBI, or MCA regulations</li>
            <li>Conducting public solicitation for private placements</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.5 Conflicts of Interest</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Failing to disclose material conflicts of interest</li>
            <li>Self-dealing or insider arrangements without disclosure</li>
            <li>Competing with companies you've invested in (without disclosure)</li>
            <li>Using Platform connections for personal gain outside agreed terms</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.6 Intellectual Property Violations</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Using copyrighted materials without permission</li>
            <li>Trademark infringement or brand misrepresentation</li>
            <li>Stealing or misappropriating trade secrets</li>
            <li>Plagiarizing content, pitch decks, or business plans</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Enforcement</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Reporting Violations</h3>
          <p>If you witness or experience a Code of Conduct violation, please report it immediately:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Email:</strong> compliance@incubazar.in</li>
            <li><strong>Subject Line:</strong> "Code of Conduct Violation Report"</li>
            <li><strong>Include:</strong> User details, incident description, evidence (screenshots, emails), date/time</li>
          </ul>
          <p className="mt-4">
            All reports are treated confidentially and investigated promptly. We protect whistleblowers from retaliation.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Investigation Process</h3>
          <p>Upon receiving a report, we will:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acknowledge receipt within 24-48 hours</li>
            <li>Conduct a thorough, impartial investigation</li>
            <li>Gather evidence and interview relevant parties</li>
            <li>Make a determination based on facts and Platform policies</li>
            <li>Communicate the outcome to the reporter (confidentially)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Consequences</h3>
          <p>Violations may result in one or more of the following actions:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Warning:</strong> Formal notice for minor first-time violations</li>
            <li><strong>Temporary Suspension:</strong> Account access restricted for 7-30 days</li>
            <li><strong>Feature Restriction:</strong> Limited access to messaging, deals, or matching</li>
            <li><strong>Permanent Ban:</strong> Account termination for serious or repeated violations</li>
            <li><strong>Legal Action:</strong> Referral to law enforcement for illegal activities</li>
            <li><strong>Regulatory Reporting:</strong> Notification to SEBI, RBI, or other authorities as required</li>
          </ul>
          <p className="mt-4">
            The severity of the consequence depends on the nature, intent, and frequency of the violation.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.4 Appeals Process</h3>
          <p>
            If you believe enforcement action was taken in error, you may appeal by emailing <strong>legal@incubazar.in</strong> within 
            14 days of the decision. Include your account details, the decision being appealed, and reasons for reconsideration. 
            We will review appeals and respond within 7-10 business days.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. User Safety and Well-being</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Protecting Your Privacy</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Never share passwords or sensitive personal information via Platform messaging</li>
            <li>Use the data room for confidential documents (do not email directly)</li>
            <li>Be cautious of phishing attempts or suspicious requests</li>
            <li>Report any suspicious activity immediately</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Financial Safety</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Never transfer funds outside of documented legal agreements</li>
            <li>Verify investor identity before sharing sensitive financial data</li>
            <li>Consult legal and financial advisors before signing agreements</li>
            <li>Report requests for kickbacks, bribes, or irregular payments</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Mental Health and Burnout</h3>
          <p>
            Fundraising and investing can be stressful. We encourage:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Taking breaks and managing expectations</li>
            <li>Seeking support from mentors, peers, or professionals</li>
            <li>Maintaining work-life balance</li>
            <li>Being patient and resilient in the face of rejections</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Amendments to This Code</h2>
          <p>
            We may update this Code of Conduct periodically to reflect evolving community standards, legal requirements, 
            or Platform features. Changes will be communicated via:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email notification to all users</li>
            <li>Prominent notice on the Platform</li>
            <li>Updated "Last Updated" date at the top of this page</li>
          </ul>
          <p className="mt-4">
            Continued use of the Platform after changes constitutes acceptance of the updated Code of Conduct.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
          <p>
            For questions about this Code of Conduct or to report violations, contact:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mt-4">
            <p className="font-semibold mb-4">Incubazar (Sole Proprietorship)</p>
            <p><strong>Business Address:</strong> Mohali, Punjab, India</p>
            <p><strong>Compliance Team:</strong> compliance@incubazar.in</p>
            <p><strong>Appeals:</strong> appeal@incubazar.in</p>
            <p><strong>General Support:</strong> support@incubazar.in</p>
            <p><strong>Website:</strong> https://incubazar.in</p>
          </div>
        </section>

        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-300 rounded-lg">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>✅ Building a Better Community:</strong> This Code of Conduct reflects our commitment to creating 
            a professional, ethical, and inclusive platform for India's startup ecosystem. By upholding these standards, 
            you contribute to a trustworthy environment where founders and investors can connect, collaborate, and thrive. 
            Thank you for being part of the Incubazar community.
          </p>
        </div>
      </div>
    </div>
  )
}
