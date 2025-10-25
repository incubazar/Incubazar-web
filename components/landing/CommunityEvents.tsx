import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Award, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function CommunityEvents() {
  const events = [
    {
      type: 'Demo Day',
      title: 'Startup Showcase Q1 2025',
      date: 'March 15, 2025',
      participants: '20+ Startups',
      status: 'Upcoming',
      shade: 'dark',
    },
    {
      type: 'Workshop',
      title: 'Fundraising Masterclass',
      date: 'February 28, 2025',
      participants: '100+ Founders',
      status: 'Registration Open',
      shade: 'medium',
    },
    {
      type: 'Networking',
      title: 'Investor Meetup Delhi',
      date: 'February 20, 2025',
      participants: '50+ Investors',
      status: 'Limited Seats',
      shade: 'light',
    },
  ]

  const featuredStartups = [
    {
      name: 'EduTech Pro',
      sector: 'EdTech',
      funding: '₹2.5 Cr Raised',
      logo: '🎓',
    },
    {
      name: 'HealthSync',
      sector: 'HealthTech',
      funding: '₹5 Cr Raised',
      logo: '🏥',
    },
    {
      name: 'AgriGrow',
      sector: 'AgriTech',
      funding: '₹3 Cr Raised',
      logo: '🌾',
    },
  ]

  const partnerships = [
    {
      name: 'Microsoft for Startups',
      benefit: 'Azure Credits',
      icon: '☁️',
    },
    {
      name: 'AWS Activate',
      benefit: 'Cloud Services',
      icon: '🚀',
    },
    {
      name: 'Google Cloud',
      benefit: 'Startup Support',
      icon: '💡',
    },
  ]

  return (
    <section id="community" className="py-24 lg:py-32 bg-paper">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header - Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-ink">
            Community & Events
          </h2>
          <p className="text-lg md:text-xl text-graphite-600 font-body">
            Connect, learn, and grow with India's most active startup community
          </p>
        </div>

        {/* Events Grid - Monochrome */}
        <div className="mb-20">
          <h3 className="text-2xl font-serif font-bold text-ink mb-8">
            Upcoming Events
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.title} className="p-6 bg-paper border-2 border-graphite-200 hover:border-ink transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={`${
                    event.shade === 'dark' ? 'bg-graphite-900 text-paper' :
                    event.shade === 'medium' ? 'bg-graphite-700 text-paper' :
                    'bg-graphite-500 text-paper'
                  } border-0`}>
                    {event.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-graphite-400 text-graphite-700">
                    {event.status}
                  </Badge>
                </div>
                
                <h4 className="text-xl font-serif font-semibold text-ink mb-3 group-hover:text-graphite-800 transition-all">
                  {event.title}
                </h4>
                
                <div className="space-y-2 text-sm text-graphite-600 mb-4 font-body">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{event.participants}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full group-hover:bg-ink group-hover:text-paper transition-all">
                  Register Now
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Startups - Monochrome */}
        <div className="mb-20">
          <h3 className="text-2xl font-serif font-bold text-ink mb-8">
            Success Stories
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredStartups.map((startup) => (
              <Card key={startup.name} className="p-6 bg-gradient-to-br from-paper to-graphite-50 border-2 border-graphite-200 hover:border-ink transition-all">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl">{startup.logo}</div>
                  <div>
                    <h4 className="font-serif font-semibold text-ink">
                      {startup.name}
                    </h4>
                    <p className="text-sm text-graphite-600 font-body">
                      {startup.sector}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-graphite-700" />
                  <span className="font-semibold text-ink">{startup.funding}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnerships - Monochrome */}
        <div>
          <h3 className="text-2xl font-serif font-bold text-ink mb-8 text-center">
            Our Partners
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {partnerships.map((partner) => (
              <Card key={partner.name} className="p-6 text-center bg-paper border-2 border-graphite-200 hover:border-ink transition-all">
                <div className="text-5xl mb-3">{partner.icon}</div>
                <h4 className="font-serif font-semibold text-ink mb-1">
                  {partner.name}
                </h4>
                <p className="text-sm text-graphite-600 font-body">
                  {partner.benefit}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
