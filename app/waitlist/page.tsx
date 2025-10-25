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
import { Building2, TrendingUp, Rocket, Users, Sparkles, CheckCircle2, ArrowRight, Shield, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join Early Access</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
            Join the{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Incubazar Waitlist
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Be among the first to access India's premier private placement platform connecting startups with verified investors
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">For Founders</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Access verified investors, raise compliant capital, and grow your startup with AI-powered matching
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">For Investors</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Discover curated deals, conduct automated due diligence, and build your portfolio with confidence
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Secure & Compliant</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Section 42 compliant, built-in verification, legal documentation, and secure data rooms
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Form */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Why Join */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Why Join Now?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Early Access</p>
                    <p className="text-xs text-muted-foreground">Be first to explore platform features</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Premium Benefits</p>
                    <p className="text-xs text-muted-foreground">Exclusive perks for early adopters</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Priority Review</p>
                    <p className="text-xs text-muted-foreground">Fast-track verification process</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Network Access</p>
                    <p className="text-xs text-muted-foreground">Connect with verified ecosystem</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-muted-foreground">Users on the Waitlist</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form */}
          <Card className="lg:col-span-2 border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Application Form</CardTitle>
              <CardDescription className="text-base">
                Fill out the details below to join our exclusive waitlist
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">I am a:</Label>
                  <RadioGroup
                  value={userType}
                  onValueChange={(value) => setUserType(value as 'founder' | 'investor')}
                  className="grid grid-cols-2 gap-4"
                >
                  <Label
                    htmlFor="founder"
                    className={`flex flex-col items-center justify-center rounded-xl border-2 p-6 cursor-pointer transition-all hover:border-primary/50 ${
                      userType === 'founder' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <RadioGroupItem value="founder" id="founder" className="sr-only" />
                    <Building2 className={`w-8 h-8 mb-3 ${userType === 'founder' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-semibold">Founder</span>
                    <span className="text-xs text-muted-foreground text-center mt-1">Raise capital for your startup</span>
                  </Label>
                  
                  <Label
                    htmlFor="investor"
                    className={`flex flex-col items-center justify-center rounded-xl border-2 p-6 cursor-pointer transition-all hover:border-primary/50 ${
                      userType === 'investor' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <RadioGroupItem value="investor" id="investor" className="sr-only" />
                    <Users className={`w-8 h-8 mb-3 ${userType === 'investor' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-semibold">Investor</span>
                    <span className="text-xs text-muted-foreground text-center mt-1">Invest in promising startups</span>
                  </Label>
                </RadioGroup>
              </div>

              {/* Common Fields */}
              <div className="space-y-4 pt-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name" className="text-sm font-medium">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone_number" className="text-sm font-medium">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="mt-1.5"
                  />
                </div>
              </div>

              {/* Founder Specific Fields */}
              {userType === 'founder' && (
                <div className="space-y-4 border-t-2 pt-6 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Startup Details</h3>
                  </div>

                  <div>
                    <Label htmlFor="startup_name" className="text-sm font-medium">
                      Startup Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="startup_name"
                      name="startup_name"
                      value={formData.startup_name}
                      onChange={handleInputChange}
                      required={userType === 'founder'}
                      placeholder="Your startup name"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="business_idea" className="text-sm font-medium">
                      Business Idea / Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="business_idea"
                      name="business_idea"
                      value={formData.business_idea}
                      onChange={handleInputChange}
                      required={userType === 'founder'}
                      placeholder="Describe your startup, the problem you're solving, and your solution..."
                      rows={4}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startup_stage" className="text-sm font-medium">Startup Stage</Label>
                      <Select
                        value={formData.startup_stage}
                        onValueChange={(value) => handleSelectChange('startup_stage', value)}
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="idea">💡 Idea Stage</SelectItem>
                          <SelectItem value="mvp">🚀 MVP</SelectItem>
                          <SelectItem value="early_revenue">💰 Early Revenue</SelectItem>
                          <SelectItem value="growth">📈 Growth</SelectItem>
                          <SelectItem value="scaling">🌟 Scaling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
                      <Input
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        placeholder="e.g., FinTech, HealthTech, EdTech"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="funding_target" className="text-sm font-medium">Funding Target (₹)</Label>
                      <Input
                        id="funding_target"
                        name="funding_target"
                        type="number"
                        value={formData.funding_target}
                        onChange={handleInputChange}
                        placeholder="50,00,000"
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="team_size" className="text-sm font-medium">Team Size</Label>
                      <Input
                        id="team_size"
                        name="team_size"
                        type="number"
                        value={formData.team_size}
                        onChange={handleInputChange}
                        placeholder="5"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website_url" className="text-sm font-medium">Website URL</Label>
                    <Input
                      id="website_url"
                      name="website_url"
                      type="url"
                      value={formData.website_url}
                      onChange={handleInputChange}
                      placeholder="https://yourstartup.com"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              {/* Investor Specific Fields */}
              {userType === 'investor' && (
                <div className="space-y-4 border-t-2 pt-6 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Investor Profile</h3>
                  </div>

                  <div>
                    <Label htmlFor="investor_type" className="text-sm font-medium">Investor Type</Label>
                    <Select
                      value={formData.investor_type}
                      onValueChange={(value) => handleSelectChange('investor_type', value)}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="angel">👼 Angel Investor</SelectItem>
                        <SelectItem value="hni">💎 High Net-Worth Individual</SelectItem>
                        <SelectItem value="family_office">🏛️ Family Office</SelectItem>
                        <SelectItem value="vc">🚀 Venture Capital</SelectItem>
                        <SelectItem value="other">🔹 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="investment_range_min" className="text-sm font-medium">Min Investment (₹)</Label>
                      <Input
                        id="investment_range_min"
                        name="investment_range_min"
                        type="number"
                        value={formData.investment_range_min}
                        onChange={handleInputChange}
                        placeholder="5,00,000"
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="investment_range_max" className="text-sm font-medium">Max Investment (₹)</Label>
                      <Input
                        id="investment_range_max"
                        name="investment_range_max"
                        type="number"
                        value={formData.investment_range_max}
                        onChange={handleInputChange}
                        placeholder="50,00,000"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="investment_experience" className="text-sm font-medium">Investment Experience</Label>
                    <Select
                      value={formData.investment_experience}
                      onValueChange={(value) => handleSelectChange('investment_experience', value)}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">🌱 Beginner (0-2 investments)</SelectItem>
                        <SelectItem value="intermediate">📊 Intermediate (3-10 investments)</SelectItem>
                        <SelectItem value="experienced">🏆 Experienced (10+ investments)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="linkedin_url" className="text-sm font-medium">LinkedIn Profile</Label>
                    <Input
                      id="linkedin_url"
                      name="linkedin_url"
                      type="url"
                      value={formData.linkedin_url}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              <div className="pt-6 space-y-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold group"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <>
                      <span className="animate-pulse">Submitting...</span>
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Already have an account?{' '}
                  <a href="/auth/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center">
        <Card className="max-w-3xl mx-auto border-2 bg-muted/30 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">What happens next?</span>
                  <br />
                  We'll review your application within 24-48 hours. Upon approval, you'll receive an OTP via email to complete your registration and get access to the platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}

