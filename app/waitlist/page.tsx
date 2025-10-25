'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditorialNavbar from '@/components/editorial/EditorialNavbar';
import EditorialFooter from '@/components/editorial/EditorialFooter';
import RevealText from '@/components/editorial/RevealText';
import EditorialDivider from '@/components/editorial/EditorialDivider';

export default function WaitlistPageEditorial() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'founder' | 'investor'>('founder');
  
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone_number: '',
    startup_name: '',
    business_idea: '',
    startup_stage: '',
    industry: '',
    funding_target: '',
    team_size: '',
    website_url: '',
    investor_type: '',
    investment_range_min: '',
    investment_range_max: '',
    sectors_of_interest: [] as string[],
    investment_experience: '',
    linkedin_url: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          user_type: userType,
          funding_target: formData.funding_target ? parseFloat(formData.funding_target) : null,
          team_size: formData.team_size ? parseInt(formData.team_size) : null,
          investment_range_min: formData.investment_range_min ? parseFloat(formData.investment_range_min) : null,
          investment_range_max: formData.investment_range_max ? parseFloat(formData.investment_range_max) : null,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Failed to join waitlist');
        return;
      }

      toast.success('Successfully joined the waitlist! Check your email for confirmation.');
      
      setFormData({
        email: '',
        full_name: '',
        phone_number: '',
        startup_name: '',
        business_idea: '',
        startup_stage: '',
        industry: '',
        funding_target: '',
        team_size: '',
        website_url: '',
        investor_type: '',
        investment_range_min: '',
        investment_range_max: '',
        sectors_of_interest: [],
        investment_experience: '',
        linkedin_url: ''
      });

      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EditorialNavbar />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <RevealText>
            <div className="mb-16">
              <p className="overline mb-4">Application</p>
              <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6">
                Join the Waitlist
              </h1>
              <p className="lead max-w-2xl">
                Become part of an exclusive community where innovation meets capital. 
                Limited access, curated connections.
              </p>
            </div>
          </RevealText>

          <EditorialDivider className="mb-16" />

          {/* User Type Selection */}
          <RevealText>
            <div className="mb-16">
              <p className="text-sm font-semibold uppercase tracking-wide mb-6">I am a</p>
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  type="button"
                  onClick={() => setUserType('founder')}
                  className={`p-8 border-2 transition-all text-left ${
                    userType === 'founder'
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  <h3 className="font-serif text-2xl font-semibold mb-2">Founder</h3>
                  <p className={userType === 'founder' ? 'text-background/80' : 'text-foreground/70'}>
                    Looking to raise capital and connect with investors
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setUserType('investor')}
                  className={`p-8 border-2 transition-all text-left ${
                    userType === 'investor'
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  <h3 className="font-serif text-2xl font-semibold mb-2">Investor</h3>
                  <p className={userType === 'investor' ? 'text-background/80' : 'text-foreground/70'}>
                    Seeking curated startup investment opportunities
                  </p>
                </button>
              </div>
            </div>
          </RevealText>

          {/* Form */}
          <RevealText>
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Basic Information */}
              <div>
                <h3 className="font-serif text-2xl font-semibold mb-8">Basic Information</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      required
                      className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              </div>

              <EditorialDivider animate={false} />

              {/* Founder-specific fields */}
              {userType === 'founder' && (
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-8">Startup Details</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Startup Name *</label>
                      <input
                        type="text"
                        name="startup_name"
                        value={formData.startup_name}
                        onChange={handleInputChange}
                        required={userType === 'founder'}
                        className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Business Idea *</label>
                      <textarea
                        name="business_idea"
                        value={formData.business_idea}
                        onChange={handleInputChange}
                        required={userType === 'founder'}
                        rows={4}
                        className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors resize-none"
                        placeholder="Describe your business in a few sentences"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Startup Stage *</label>
                        <select
                          name="startup_stage"
                          value={formData.startup_stage}
                          onChange={handleInputChange}
                          required={userType === 'founder'}
                          className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                        >
                          <option value="">Select stage</option>
                          <option value="Ideation">Ideation</option>
                          <option value="MVP">MVP</option>
                          <option value="Early Traction">Early Traction</option>
                          <option value="Growth">Growth</option>
                          <option value="Scaling">Scaling</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Industry *</label>
                        <input
                          type="text"
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          required={userType === 'founder'}
                          className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Funding Target (₹)</label>
                        <input
                          type="number"
                          name="funding_target"
                          value={formData.funding_target}
                          onChange={handleInputChange}
                          className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Team Size</label>
                        <input
                          type="number"
                          name="team_size"
                          value={formData.team_size}
                          onChange={handleInputChange}
                          className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Website URL</label>
                      <input
                        type="url"
                        name="website_url"
                        value={formData.website_url}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                        placeholder="https://"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Investor-specific fields */}
              {userType === 'investor' && (
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-8">Investment Profile</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Investor Type *</label>
                      <select
                        name="investor_type"
                        value={formData.investor_type}
                        onChange={handleInputChange}
                        required={userType === 'investor'}
                        className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                      >
                        <option value="">Select type</option>
                        <option value="Angel Investor">Angel Investor</option>
                        <option value="Venture Capitalist">Venture Capitalist</option>
                        <option value="Family Office">Family Office</option>
                        <option value="Corporate Investor">Corporate Investor</option>
                        <option value="HNI">HNI</option>
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Min Investment (₹)</label>
                        <input
                          type="number"
                          name="investment_range_min"
                          value={formData.investment_range_min}
                          onChange={handleInputChange}
                          className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Max Investment (₹)</label>
                        <input
                          type="number"
                          name="investment_range_max"
                          value={formData.investment_range_max}
                          onChange={handleInputChange}
                          className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Investment Experience *</label>
                      <select
                        name="investment_experience"
                        value={formData.investment_experience}
                        onChange={handleInputChange}
                        required={userType === 'investor'}
                        className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                      >
                        <option value="">Select experience</option>
                        <option value="First Time Investor">First Time Investor</option>
                        <option value="1-5 Investments">1-5 Investments</option>
                        <option value="6-10 Investments">6-10 Investments</option>
                        <option value="10+ Investments">10+ Investments</option>
                        <option value="Professional Investor">Professional Investor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                      <input
                        type="url"
                        name="linkedin_url"
                        value={formData.linkedin_url}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-b-2 border-border focus:border-foreground bg-transparent outline-none transition-colors"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-foreground text-background font-medium text-lg transition-all hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
                <p className="text-sm text-foreground/60 text-center mt-4">
                  By submitting, you agree to our terms and privacy policy
                </p>
              </div>
            </form>
          </RevealText>
        </div>
      </div>
      <EditorialFooter />
    </>
  );
}
