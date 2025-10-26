import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Incubazar',
  description: 'Cookie Policy for Incubazar platform - How we use cookies and tracking technologies'
}

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-foreground/60 mb-8">
          <strong>Last Updated:</strong> October 26, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Cookie Policy explains how Incubazar Technologies Private Limited (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) 
            uses cookies and similar tracking technologies on our platform at incubazar.in (the &quot;Platform&quot;).
          </p>
          <p className="mt-4">
            By using the Platform, you consent to the use of cookies as described in this policy. If you do not 
            agree to our use of cookies, please adjust your browser settings or refrain from using the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device (computer, smartphone, tablet) by websites you visit. 
            They are widely used to make websites work more efficiently, remember your preferences, and provide 
            information to website owners about user behavior.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 How Cookies Work</h3>
          <p>
            When you visit the Platform, our server sends a cookie to your browser, which stores it on your device. 
            The next time you visit, your browser sends the cookie back to our server, allowing us to recognize you 
            and remember your preferences.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.2 First-Party vs Third-Party Cookies</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>First-Party Cookies:</strong> Set by Incubazar directly and used to provide Platform functionality</li>
            <li><strong>Third-Party Cookies:</strong> Set by external services (e.g., analytics providers, payment processors)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Session vs Persistent Cookies</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Session Cookies:</strong> Temporary cookies deleted when you close your browser</li>
            <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until manually deleted</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Strictly Necessary Cookies</h3>
          <p>
            <strong>Purpose:</strong> These cookies are essential for the Platform to function properly. Without them, 
            core features like authentication and security would not work.
          </p>
          <div className="bg-ink border border-ink p-4 rounded mt-3">
            <p className="text-sm text-paper">
              ⓘ <strong>Note:</strong> These cookies cannot be disabled as they are critical to Platform operation.
            </p>
          </div>
          
          <table className="min-w-full mt-4 border border-ink/20">
            <thead className="bg-graphite-100">
              <tr>
                <th className="border border-ink/20 px-4 py-2 text-left">Cookie Name</th>
                <th className="border border-ink/20 px-4 py-2 text-left">Purpose</th>
                <th className="border border-ink/20 px-4 py-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-ink/20 px-4 py-2">sb-access-token</td>
                <td className="border border-ink/20 px-4 py-2">Authentication and session management (Supabase)</td>
                <td className="border border-ink/20 px-4 py-2">Session</td>
              </tr>
              <tr>
                <td className="border border-ink/20 px-4 py-2">sb-refresh-token</td>
                <td className="border border-ink/20 px-4 py-2">Session renewal and authentication persistence</td>
                <td className="border border-ink/20 px-4 py-2">7 days</td>
              </tr>
              <tr>
                <td className="border border-ink/20 px-4 py-2">next-auth.session-token</td>
                <td className="border border-ink/20 px-4 py-2">User authentication state (Next.js)</td>
                <td className="border border-ink/20 px-4 py-2">30 days</td>
              </tr>
              <tr>
                <td className="border border-ink/20 px-4 py-2">__Secure-next-auth.callback-url</td>
                <td className="border border-ink/20 px-4 py-2">Redirect destination after login</td>
                <td className="border border-ink/20 px-4 py-2">Session</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Functional Cookies</h3>
          <p>
            <strong>Purpose:</strong> These cookies enhance your experience by remembering your preferences and settings.
          </p>
          
          <table className="min-w-full mt-4 border border-ink/20">
            <thead className="bg-graphite-100">
              <tr>
                <th className="border border-ink/20 px-4 py-2 text-left">Cookie Name</th>
                <th className="border border-ink/20 px-4 py-2 text-left">Purpose</th>
                <th className="border border-ink/20 px-4 py-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-ink/20 px-4 py-2">user-preferences</td>
                <td className="border border-ink/20 px-4 py-2">Remember your language, timezone, and display settings</td>
                <td className="border border-ink/20 px-4 py-2">1 year</td>
              </tr>
              <tr>
                <td className="border border-ink/20 px-4 py-2">calculator-state</td>
                <td className="border border-ink/20 px-4 py-2">Save Venture Calculator inputs for convenience</td>
                <td className="border border-ink/20 px-4 py-2">30 days</td>
              </tr>
              <tr>
                <td className="border border-ink/20 px-4 py-2">deal-filters</td>
                <td className="border border-ink/20 px-4 py-2">Remember your saved search filters and preferences</td>
                <td className="border border-ink/20 px-4 py-2">90 days</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Analytics and Performance Cookies</h3>
          <p>
            <strong>Purpose:</strong> These cookies help us understand how users interact with the Platform, allowing 
            us to improve functionality and user experience.
          </p>
          
          <table className="min-w-full mt-4 border border-ink/20">
            <thead className="bg-graphite-100">
              <tr>
                <th className="border border-ink/20 px-4 py-2 text-left">Service</th>
                <th className="border border-ink/20 px-4 py-2 text-left">Purpose</th>
                <th className="border border-ink/20 px-4 py-2 text-left">Provider</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-ink/20 px-4 py-2">Vercel Analytics</td>
                <td className="border border-ink/20 px-4 py-2">Page views, performance metrics, Core Web Vitals</td>
                <td className="border border-ink/20 px-4 py-2">Vercel Inc.</td>
              </tr>
              <tr>
                <td className="border border-ink/20 px-4 py-2">Supabase Analytics</td>
                <td className="border border-ink/20 px-4 py-2">Database query performance, API usage statistics</td>
                <td className="border border-ink/20 px-4 py-2">Supabase Inc.</td>
              </tr>
              <tr>
                <td className="border border-ink/20 px-4 py-2">Learning Analytics</td>
                <td className="border border-ink/20 px-4 py-2">Module views, popular content, engagement metrics (optional)</td>
                <td className="border border-ink/20 px-4 py-2">Incubazar (First-party)</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.4 Advertising and Marketing Cookies</h3>
          <p>
            <strong>Current Status:</strong> We do NOT currently use advertising or marketing cookies.
          </p>
          <p className="mt-4 text-foreground/70">
            If we implement such cookies in the future, we will update this policy and obtain your explicit consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
          <p>
            We integrate with third-party services that may set their own cookies. These services have their own 
            privacy and cookie policies:
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Payment Processing (Razorpay)</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Purpose:</strong> Process subscription payments securely</li>
            <li><strong>Cookies:</strong> Session cookies for payment gateway security</li>
            <li><strong>Policy:</strong> <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-ink hover:underline">Razorpay Privacy Policy</a></li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Document Signing (DocuSign)</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Purpose:</strong> Facilitate electronic signatures on legal documents</li>
            <li><strong>Cookies:</strong> Session and authentication cookies</li>
            <li><strong>Policy:</strong> <a href="https://www.docusign.com/company/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-ink hover:underline">DocuSign Privacy Policy</a></li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Infrastructure (Vercel, Supabase)</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Vercel:</strong> Hosting and performance analytics - <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-ink hover:underline">Privacy Policy</a></li>
            <li><strong>Supabase:</strong> Database, authentication, storage - <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-ink hover:underline">Privacy Policy</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Browser Controls</h3>
          <p>
            You can control and manage cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>View and delete cookies</li>
            <li>Block third-party cookies</li>
            <li>Block cookies from specific websites</li>
            <li>Block all cookies (not recommended)</li>
            <li>Delete all cookies when you close the browser</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Browser-Specific Instructions</h3>
          <div className="bg-graphite-50 p-6 rounded-lg mt-4">
            <ul className="space-y-2">
              <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Impact of Disabling Cookies</h3>
          <div className="bg-graphite-100 border border-ink/30 p-6 rounded-lg mt-4">
            <p className="font-semibold text-yellow-900 mb-2">
              ⚠️ Warning: Disabling cookies may affect Platform functionality:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-yellow-800">
              <li>You may not be able to log in or stay logged in</li>
              <li>Your preferences and settings may not be saved</li>
              <li>Some features (calculator, saved filters) may not work properly</li>
              <li>You may need to re-enter information repeatedly</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.4 Opt-Out Tools</h3>
          <p>
            For analytics cookies, you can opt out using these tools:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Network Advertising Initiative:</strong> <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-ink hover:underline">NAI Opt-Out</a></li>
            <li><strong>Digital Advertising Alliance:</strong> <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-ink hover:underline">DAA Opt-Out</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Do Not Track (DNT)</h2>
          <p>
            Some browsers have a &quot;Do Not Track&quot; (DNT) feature that signals websites that you do not want 
            your online activity tracked. Currently, there is no universal standard for how DNT signals should be 
            interpreted.
          </p>
          <p className="mt-4">
            At present, <strong>we do not respond to DNT signals</strong>. If industry standards are established, 
            we will update this policy accordingly and honor DNT preferences.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, 
            or Platform features. Updates will be communicated via:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Updated &quot;Last Updated&quot; date at the top of this page</li>
            <li>Email notification for significant changes</li>
            <li>Platform announcement for material changes</li>
          </ul>
          <p className="mt-4">
            We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
          <p>
            For questions about our use of cookies or to exercise your rights, contact us at:
          </p>
          <div className="bg-graphite-50 p-6 rounded-lg mt-4">
            <p className="font-semibold mb-4">Incubazar (Sole Proprietorship)</p>
            <p><strong>Business Address:</strong> Mohali, Punjab, India</p>
            <p><strong>Privacy Officer:</strong> privacy@incubazar.in</p>
            <p><strong>General Support:</strong> support@incubazar.in</p>
            <p><strong>Website:</strong> https://incubazar.in</p>
          </div>
        </section>

        <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg">
          <p className="text-sm text-foreground/70 leading-relaxed">
            <strong>🍪 Cookie Transparency:</strong> This Cookie Policy provides comprehensive information about how 
            we use cookies on the Incubazar platform. We are committed to transparency and giving you control over 
            your data. By using the Platform, you consent to the use of cookies as described in this policy. You can 
            withdraw consent at any time by adjusting your browser settings or contacting us at privacy@incubazar.in.
          </p>
        </div>
      </div>
    </div>
  )
}
