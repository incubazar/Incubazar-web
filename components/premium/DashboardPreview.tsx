import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, DollarSign, Target, MoreVertical } from 'lucide-react'

export default function DashboardPreview() {
  const analytics = [
    {
      title: 'Total Raised',
      value: '₹12.5 Cr',
      change: '+24%',
      trend: 'up',
      icon: DollarSign,
      color: 'mint',
    },
    {
      title: 'Active Deals',
      value: '18',
      change: '+6',
      trend: 'up',
      icon: Target,
      color: 'lavender',
    },
    {
      title: 'Investors',
      value: '245',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'mint',
    },
    {
      title: 'Avg. Ticket',
      value: '₹50 L',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'lavender',
    },
  ]

  const recentActivity = [
    {
      startup: 'EduTech Solutions',
      investor: 'Priya Sharma',
      amount: '₹2.5 Cr',
      status: 'Completed',
      time: '2 hours ago',
    },
    {
      startup: 'HealthSync AI',
      investor: 'Rajesh Kumar',
      amount: '₹5 Cr',
      status: 'In Progress',
      time: '5 hours ago',
    },
    {
      startup: 'AgriGrow Tech',
      investor: 'Anita Desai',
      amount: '₹3 Cr',
      status: 'Under Review',
      time: '1 day ago',
    },
    {
      startup: 'FinTrack Pro',
      investor: 'Vikram Singh',
      amount: '₹1.5 Cr',
      status: 'Completed',
      time: '2 days ago',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-mint-100 text-mint-700 dark:bg-mint-900/30 dark:text-mint-400'
      case 'In Progress':
        return 'bg-lavender-100 text-lavender-700 dark:bg-lavender-900/30 dark:text-lavender-400'
      case 'Under Review':
        return 'bg-navy-100 text-navy-700 dark:bg-navy-700/30 dark:text-navy-300'
      default:
        return 'bg-cream-200 text-navy-700 dark:bg-navy-700 dark:text-cream-200'
    }
  }

  return (
    <section className="py-24 lg:py-32 bg-cream-50 dark:bg-navy-950">
      <div className="container-premium">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 dark:text-white">
            Powerful{' '}
            <span className="text-gradient-premium">Dashboard</span>
          </h2>
          <p className="text-lg md:text-xl text-navy-600 dark:text-cream-200 font-light">
            Track your investments, manage deals, and monitor growth — all in one place
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {analytics.map((item, index) => (
            <Card
              key={item.title}
              className="p-6 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-2xl shadow-soft hover:shadow-medium transition-premium"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  item.color === 'mint' 
                    ? 'bg-mint-100 dark:bg-mint-900/30' 
                    : 'bg-lavender-100 dark:bg-lavender-900/30'
                }`}>
                  <item.icon className={`w-5 h-5 ${
                    item.color === 'mint' 
                      ? 'text-mint-600 dark:text-mint-400' 
                      : 'text-lavender-600 dark:text-lavender-400'
                  }`} strokeWidth={2} />
                </div>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-display font-bold text-navy-900 dark:text-white mb-1">
                  {item.value}
                </p>
                <p className="text-sm text-navy-500 dark:text-cream-400 mb-2">
                  {item.title}
                </p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-mint-600 dark:text-mint-400" />
                  <span className="text-xs font-semibold text-mint-600 dark:text-mint-400">
                    {item.change}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Activity List */}
        <Card className="p-8 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-3xl shadow-medium">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-semibold text-navy-900 dark:text-white">
              Recent Activity
            </h3>
            <button className="text-sm font-medium text-lavender-600 dark:text-lavender-400 hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-cream-50 dark:hover:bg-navy-900 transition-smooth border border-transparent hover:border-navy-200 dark:hover:border-navy-700"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="font-semibold text-navy-900 dark:text-white text-sm">
                      {activity.startup}
                    </p>
                    <p className="text-xs text-navy-500 dark:text-cream-400 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm text-navy-600 dark:text-cream-200">
                      {activity.investor}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <p className="font-semibold text-navy-900 dark:text-white text-sm">
                      {activity.amount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between md:justify-end space-x-3">
                    <Badge className={`${getStatusColor(activity.status)} border-0 px-3 py-1 text-xs font-medium`}>
                      {activity.status}
                    </Badge>
                    <button className="p-1 hover:bg-navy-100 dark:hover:bg-navy-700 rounded-lg transition-smooth">
                      <MoreVertical className="w-4 h-4 text-navy-400 dark:text-cream-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
