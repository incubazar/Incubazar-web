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
      color: 'electric',
    },
    {
      type: 'Workshop',
      title: 'Fundraising Masterclass',
      date: 'February 28, 2025',
      participants: '100+ Founders',
      status: 'Registration Open',
      color: 'golden',
    },
    {
      type: 'Networking',
      title: 'Investor Meetup Delhi',
      date: 'February 20, 2025',
      participants: '50+ Investors',
      status: 'Limited Seats',
      color: 'green',
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
    <section id="community" className="py-24 lg:py-32 bg-white dark:bg-graphite-900">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-graphite-700 dark:text-white">
            Community & Events
          </h2>
          <p className="text-lg md:text-xl text-graphite-600 dark:text-gray-300">
            Connect, learn, and grow with India's most active startup community
          </p>
        </div>

        {/* Events Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-poppins font-bold text-graphite-700 dark:text-white mb-8">
            Upcoming Events
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.title} className="p-6 bg-white dark:bg-graphite-800 border-0 rounded-xl shadow-soft hover:shadow-strong transition-smooth group">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={`${
                    event.color === 'electric' ? 'bg-electric-100 text-electric-700' :
                    event.color === 'golden' ? 'bg-golden-100 text-golden-700' :
                    'bg-green-100 text-green-700'
                  } border-0`}>
                    {event.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {event.status}
                  </Badge>
                </div>
                
                <h4 className="text-xl font-poppins font-semibold text-graphite-700 dark:text-white mb-3 group-hover:text-electric transition-smooth">
                  {event.title}
                </h4>
                
                <div className="space-y-2 text-sm text-graphite-600 dark:text-gray-300 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{event.participants}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full group-hover:bg-electric group-hover:text-white group-hover:border-electric transition-smooth">
                  Register Now
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Startups */}
        <div className="mb-20">
          <h3 className="text-2xl font-poppins font-bold text-graphite-700 dark:text-white mb-8">
            Success Stories
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredStartups.map((startup) => (
              <Card key={startup.name} className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-graphite-800 dark:to-graphite-900 border-0 rounded-xl shadow-soft hover:shadow-strong transition-smooth">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl">{startup.logo}</div>
                  <div>
                    <h4 className="font-poppins font-semibold text-graphite-700 dark:text-white">
                      {startup.name}
                    </h4>
                    <p className="text-sm text-graphite-500 dark:text-gray-400">
                      {startup.sector}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-golden" />
                  <span className="font-semibold text-golden">{startup.funding}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnerships */}
        <div>
          <h3 className="text-2xl font-poppins font-bold text-graphite-700 dark:text-white mb-8 text-center">
            Our Partners
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {partnerships.map((partner) => (
              <Card key={partner.name} className="p-6 text-center bg-white dark:bg-graphite-800 border-0 rounded-xl shadow-soft hover:shadow-medium transition-smooth">
                <div className="text-5xl mb-3">{partner.icon}</div>
                <h4 className="font-poppins font-semibold text-graphite-700 dark:text-white mb-1">
                  {partner.name}
                </h4>
                <p className="text-sm text-graphite-500 dark:text-gray-400">
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
