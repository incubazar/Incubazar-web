/**
 * Analytics Module Index
 * Central export point for all analytics functionality
 */

// Core metrics and tracking
export {
  trackActivity,
  trackLogin,
  trackDealView,
  trackDealCreate,
  trackMessage,
  trackInterest,
  trackLearningView,
  getCurrentMetrics,
  getMetricsRange,
  calculateEngagementMetrics,
  getEngagementBreakdown,
  getGrowthMetrics,
  getRealTimeStats,
  updateTodayMetrics,
  exportMetricsToCSV,
} from './metrics'

// Types
export type {
  PlatformMetrics,
  UserActivityEvent,
  EngagementMetrics,
  CohortAnalysis,
  GrowthMetrics,
} from './metrics'
