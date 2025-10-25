'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Building2, TrendingUp, Rocket, Users } from 'lucide-react';

export default function WaitlistPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'founder' | 'investor'>('founder');
  
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone_number: '',
    // Founder fields
    startup_name: '',
    business_idea: '',
    startup_stage: '',
    industry: '',
    funding_target: '',
    team_size: '',
    website_url: '',
    // Investor fields
    investor_type: '',
    investment_range_min: '',
    investment_range_max: '',
    sectors_of_interest: [] as string[],
    investment_experience: '',
    linkedin_url: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
      
      // Reset form
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

      // Redirect to login page after 2 seconds
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Join Incubazar Waitlist</h1>
          <p className="text-lg text-gray-600">
            Be part of India's premier private placement platform for startups and investors
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Rocket className="w-8 h-8 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">For Founders</h3>
                  <p className="text-sm text-gray-600">
                    Raise capital from verified investors with compliant private placements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-8 h-8 text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">For Investors</h3>
                  <p className="text-sm text-gray-600">
                    Access curated startup deals with proper due diligence and data rooms
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
            <CardDescription>
              Fill out the form below and we'll review your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label>I am a:</Label>
                <RadioGroup
                  value={userType}
                  onValueChange={(value) => setUserType(value as 'founder' | 'investor')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="founder" id="founder" />
                    <Label htmlFor="founder" className="cursor-pointer">Founder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="investor" id="investor" />
                    <Label htmlFor="investor" className="cursor-pointer">Investor</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Common Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              {/* Founder Specific Fields */}
              {userType === 'founder' && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Startup Details
                  </h3>

                  <div>
                    <Label htmlFor="startup_name">Startup Name *</Label>
                    <Input
                      id="startup_name"
                      name="startup_name"
                      value={formData.startup_name}
                      onChange={handleInputChange}
                      required={userType === 'founder'}
                      placeholder="Your startup name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="business_idea">Business Idea / Description *</Label>
                    <Textarea
                      id="business_idea"
                      name="business_idea"
                      value={formData.business_idea}
                      onChange={handleInputChange}
                      required={userType === 'founder'}
                      placeholder="Describe your startup and what problem you're solving..."
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startup_stage">Startup Stage</Label>
                      <Select
                        value={formData.startup_stage}
                        onValueChange={(value) => handleSelectChange('startup_stage', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="idea">Idea Stage</SelectItem>
                          <SelectItem value="mvp">MVP</SelectItem>
                          <SelectItem value="early_revenue">Early Revenue</SelectItem>
                          <SelectItem value="growth">Growth</SelectItem>
                          <SelectItem value="scaling">Scaling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        placeholder="e.g., FinTech, HealthTech"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="funding_target">Funding Target (₹)</Label>
                      <Input
                        id="funding_target"
                        name="funding_target"
                        type="number"
                        value={formData.funding_target}
                        onChange={handleInputChange}
                        placeholder="e.g., 50,00,000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="team_size">Team Size</Label>
                      <Input
                        id="team_size"
                        name="team_size"
                        type="number"
                        value={formData.team_size}
                        onChange={handleInputChange}
                        placeholder="e.g., 5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website_url">Website URL</Label>
                    <Input
                      id="website_url"
                      name="website_url"
                      type="url"
                      value={formData.website_url}
                      onChange={handleInputChange}
                      placeholder="https://yourstartup.com"
                    />
                  </div>
                </div>
              )}

              {/* Investor Specific Fields */}
              {userType === 'investor' && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Investor Profile
                  </h3>

                  <div>
                    <Label htmlFor="investor_type">Investor Type</Label>
                    <Select
                      value={formData.investor_type}
                      onValueChange={(value) => handleSelectChange('investor_type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="angel">Angel Investor</SelectItem>
                        <SelectItem value="hni">High Net-Worth Individual</SelectItem>
                        <SelectItem value="family_office">Family Office</SelectItem>
                        <SelectItem value="vc">Venture Capital</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="investment_range_min">Min Investment (₹)</Label>
                      <Input
                        id="investment_range_min"
                        name="investment_range_min"
                        type="number"
                        value={formData.investment_range_min}
                        onChange={handleInputChange}
                        placeholder="e.g., 5,00,000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="investment_range_max">Max Investment (₹)</Label>
                      <Input
                        id="investment_range_max"
                        name="investment_range_max"
                        type="number"
                        value={formData.investment_range_max}
                        onChange={handleInputChange}
                        placeholder="e.g., 50,00,000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="investment_experience">Investment Experience</Label>
                    <Select
                      value={formData.investment_experience}
                      onValueChange={(value) => handleSelectChange('investment_experience', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (0-2 investments)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (3-10 investments)</SelectItem>
                        <SelectItem value="experienced">Experienced (10+ investments)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
                    <Input
                      id="linkedin_url"
                      name="linkedin_url"
                      type="url"
                      value={formData.linkedin_url}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Join Waitlist'}
              </Button>

              <p className="text-sm text-gray-500 text-center">
                Already have an account?{' '}
                <a href="/auth/login" className="text-blue-600 hover:underline">
                  Sign in
                </a>
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            We review all applications carefully. Upon approval, you&apos;ll receive an OTP via email
            to complete your registration.
          </p>
        </div>
      </div>
    </div>
  );
}

