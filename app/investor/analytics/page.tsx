"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, DollarSign, PieChart, BarChart3, Activity } from 'lucide-react'

export default function InvestorAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Analytics</h1>
        <p className="text-lg text-gray-600 mt-2">Track your investment performance and portfolio insights</p>
      </div>

      {/* Coming Soon Banner */}
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
              <TrendingUp className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard Coming Soon</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            We're building comprehensive analytics to help you track your portfolio performance, 
            investment trends, and get insights into your startup investments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">ROI Tracking</p>
              <p className="text-sm text-gray-600">Monitor returns on investments</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <PieChart className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">Portfolio Breakdown</p>
              <p className="text-sm text-gray-600">Analyze sector distribution</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <Activity className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">Performance Metrics</p>
              <p className="text-sm text-gray-600">Track startup growth</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Total Investments
            </CardTitle>
            <CardDescription>Your lifetime investment value</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">₹0</p>
            <p className="text-sm text-gray-600 mt-2">Across 0 deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Portfolio Growth
            </CardTitle>
            <CardDescription>Month-over-month change</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">+0%</p>
            <p className="text-sm text-gray-600 mt-2">No data yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-500" />
              Active Deals
            </CardTitle>
            <CardDescription>Currently tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-600 mt-2">Start investing to see analytics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

