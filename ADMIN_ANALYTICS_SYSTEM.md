# 📊 Production-Ready Admin Analytics System

## Overview

The admin panel now includes a comprehensive analytics system with industry-standard metrics for digital platforms, including **DAU**, **WAU**, **MAU**, and advanced engagement tracking.

---

## 🎯 Key Metrics Implemented

### 1. **Core Engagement Metrics**

#### DAU (Daily Active Users)
- Number of unique users active in the last 24 hours
- Tracked via `user_activity_events` table
- Real-time calculation available

#### WAU (Weekly Active Users)
- Unique users active in the last 7 days
- Rolling 7-day window
- Industry benchmark: 40-60% of MAU

#### MAU (Monthly Active Users)
- Unique users active in the last 30 days
- Rolling 30-day window
- Primary growth metric

#### DAU/MAU Ratio (Stickiness)
- Percentage of monthly users who return daily
- **Formula:** `(DAU / MAU) × 100`
- **Industry Benchmark:** 20-30% for marketplace platforms
- **World-class:** 50%+ (like WhatsApp, Instagram)

#### DAU/WAU Ratio
- Daily engagement rate
- **Formula:** `(DAU / WAU) × 100`
- **Target:** 60%+

---

### 2. **User Metrics**

- **Total Users:** All registered users
- **New Signups:** Daily new user registrations
- **Active Founders:** Approved founders with recent activity
- **Active Investors:** Verified investors with engagement
- **Retention Rate:** Percentage of users returning after X days
- **Churn Rate:** Percentage of users becoming inactive

---

### 3. **Activity Metrics**

- **Deals Created:** New deals posted
- **Deals Viewed:** Deal page views
- **Messages Sent:** Platform messaging activity
- **Interests Expressed:** Investment interests
- **Profile Updates:** User profile modifications
- **Learning Modules Viewed:** Educational content engagement

---

### 4. **Transaction Metrics**

- **Investments Made:** Completed investments
- **Total Invested:** Total investment amount (₹)
- **Average Investment:** Mean investment size
- **Deal Conversion Rate:** Deals that get funded

---

### 5. **Real-Time Metrics**

- **Active Now:** Users active in last hour
- **Events (Last Hour):** All activity events
- **Live Sessions:** Current active sessions

---

## 🗄️ Database Structure

### Tables Created

#### 1. `user_activity_events`
Tracks all user actions for analytics:
```sql
- id: UUID
- user_id: UUID
- event_type: TEXT (login, deal_view, deal_create, etc.)
- event_category: TEXT (engagement, transaction, content, social)
- metadata: JSONB
- session_id: TEXT
- created_at: TIMESTAMPTZ
```

**Indexes:**
- `idx_activity_events_user` (user_id)
- `idx_activity_events_type` (event_type)
- `idx_activity_events_created` (created_at DESC)
- `idx_activity_events_category` (event_category)

#### 2. `daily_active_users`
Daily DAU snapshots:
```sql
- date: DATE (unique)
- total_dau: INTEGER
- founder_dau: INTEGER
- investor_dau: INTEGER
- new_users: INTEGER
- returning_users: INTEGER
```

#### 3. `platform_metrics`
Comprehensive daily metrics:
```sql
- date: DATE (unique)
- total_users: INTEGER
- dau, wau, mau: INTEGER
- deals_created, deals_viewed: INTEGER
- messages_sent: INTEGER
- investments_made: INTEGER
- total_invested: BIGINT (in paise)
- retention_rate, churn_rate: DECIMAL
```

#### 4. `user_engagement_scores`
Individual user engagement tracking:
```sql
- user_id: UUID
- date: DATE
- logins: INTEGER
- actions: INTEGER
- time_spent_minutes: INTEGER
- engagement_score: INTEGER (0-100)
- engagement_level: TEXT (high, medium, low, inactive)
```

#### 5. `user_sessions`
Session-based analytics:
```sql
- user_id: UUID
- session_id: TEXT
- started_at, ended_at: TIMESTAMPTZ
- duration_minutes: INTEGER
- pages_viewed: INTEGER
- actions_taken: INTEGER
```

---

## 📈 Analytics Dashboard Features

### Location
`/admin/analytics`

### Tabs

#### 1. **Engagement Tab**
- DAU/WAU/MAU trend line chart
- User engagement distribution (pie chart)
- Stickiness ratio (DAU/MAU) area chart

#### 2. **Growth Tab**
- New user signups (bar chart)
- Month-over-month growth rate
- User acquisition trends

#### 3. **Activity Tab**
- Platform activity metrics
- Deals created vs investments made
- Content engagement

#### 4. **Trends Tab**
- Weekly trends comparison
- Week-over-week analysis
- Seasonal patterns

### Real-Time Section
- Active users right now
- Events in the last hour
- Live platform pulse

### Export Functionality
- Export all metrics to CSV
- Date range filtering
- Automated reports

---

## 🚀 How to Use

### 1. **Access the Dashboard**
```
Navigate to: /admin/analytics
Requires: Admin role
```

### 2. **View Metrics**
- Select time range: 7 days, 30 days, or 90 days
- Switch between tabs for different insights
- Hover over charts for detailed data points

### 3. **Track Events**
Use the analytics library in your code:

```typescript
import { 
  trackLogin, 
  trackDealView, 
  trackDealCreate,
  trackMessage,
  trackInterest 
} from '@/lib/analytics/metrics'

// Track user login
await trackLogin(userId, sessionId)

// Track deal view
await trackDealView(userId, dealId)

// Track deal creation
await trackDealCreate(userId, dealId)

// Track message
await trackMessage(userId, recipientId)

// Track interest
await trackInterest(userId, dealId, amount)
```

### 4. **Update Daily Metrics**
The database includes a function to calculate and update daily metrics:

```sql
-- Run this daily via cron job
SELECT update_daily_metrics();
```

**Setup Cron Job (Supabase):**
```sql
-- Runs daily at midnight UTC
SELECT cron.schedule(
  'update-daily-metrics',
  '0 0 * * *',
  $$ SELECT update_daily_metrics(); $$
);
```

---

## 📊 Analytics Library

### Location
`/lib/analytics/metrics.ts`

### Key Functions

#### Activity Tracking
- `trackActivity(event)` - Generic event tracking
- `trackLogin(userId, sessionId)` - User login
- `trackDealView(userId, dealId)` - Deal view
- `trackDealCreate(userId, dealId)` - Deal creation
- `trackMessage(userId, recipientId)` - Message sent
- `trackInterest(userId, dealId, amount)` - Interest expressed
- `trackLearningView(userId, modulePath)` - Learning content view

#### Metrics Calculation
- `getCurrentMetrics()` - Get today's metrics
- `getMetricsRange(startDate, endDate)` - Get historical data
- `calculateEngagementMetrics()` - Real-time DAU/WAU/MAU
- `getEngagementBreakdown()` - User engagement levels
- `getGrowthMetrics(months)` - Growth trends
- `getRealTimeStats()` - Last hour activity

#### Admin Helpers
- `updateTodayMetrics()` - Manually trigger metric update
- `exportMetricsToCSV(metrics)` - Export to CSV format

---

## 🎯 Success Benchmarks

### Industry Standards (Marketplace Platforms)

| Metric | Good | Excellent | World-Class |
|--------|------|-----------|-------------|
| **DAU/MAU** | 15-20% | 25-35% | 40%+ |
| **DAU/WAU** | 50-60% | 65-75% | 80%+ |
| **Retention (Day 1)** | 40% | 60% | 80% |
| **Retention (Day 7)** | 20% | 35% | 50% |
| **Retention (Day 30)** | 10% | 20% | 30% |
| **Monthly Growth** | 5-10% | 15-25% | 30%+ |
| **Churn Rate** | <5% | <3% | <1% |

### Incubazar Targets (Year 1)

**Month 1:**
- MAU: 100 users
- DAU/MAU: 15%
- New signups: 20-30/week

**Month 3:**
- MAU: 500 users
- DAU/MAU: 20%
- Active deals: 50

**Month 6:**
- MAU: 1,500 users
- DAU/MAU: 25%
- Active deals: 150
- Investments: ₹5Cr+

**Month 12:**
- MAU: 5,000 users
- DAU/MAU: 30%
- Active deals: 500
- Investments: ₹25Cr+

---

## 🔧 Implementation Details

### Event Categories

1. **Engagement:** login, page_view, session_start
2. **Transaction:** deal_create, interest_expressed, investment_made
3. **Content:** learning_view, document_upload, profile_update
4. **Social:** message_sent, connection_made, comment_posted

### Engagement Levels

Users are automatically classified based on activity:

- **High Engagement:** Score 70-100 (daily users, power users)
- **Medium Engagement:** Score 40-69 (weekly users)
- **Low Engagement:** Score 20-39 (monthly users)
- **Inactive:** Score 0-19 (no recent activity)

**Score Calculation:**
```
Score = (logins × 10) + (actions × 2) + min(time_spent_minutes, 60)
```

---

## 📱 Responsive Design

All analytics pages are fully responsive:
- ✅ Desktop: Full charts and tables
- ✅ Tablet: Optimized layouts
- ✅ Mobile: Touch-friendly, scrollable charts

---

## 🔒 Security & Privacy

- **RLS Policies:** All analytics tables protected
- **Admin Only:** Only users with role='admin' can view metrics
- **No PII:** Activity events don't store sensitive data
- **Anonymized:** Can be aggregated without user identification
- **GDPR Compliant:** User data retention policies applied

---

## 🚀 Next Steps

### Phase 1 (Current) ✅
- ✅ Database schema
- ✅ Analytics library
- ✅ Admin dashboard
- ✅ Basic tracking

### Phase 2 (Recommended)
- [ ] Set up daily cron job for metric updates
- [ ] Implement automated email reports (weekly digest)
- [ ] Add cohort analysis (retention cohorts)
- [ ] Create funnel analytics (signup → deal → investment)
- [ ] Add A/B testing framework

### Phase 3 (Advanced)
- [ ] Predictive analytics (churn prediction)
- [ ] User segmentation (RFM analysis)
- [ ] Revenue forecasting
- [ ] Custom dashboard builder for admins
- [ ] Real-time alerts (unusual activity, growth spikes)

---

## 🧪 Testing

### Manual Testing

1. **Create test activity:**
```typescript
// In your app
await trackLogin(userId)
await trackDealView(userId, 'deal-123')
```

2. **Check analytics dashboard:**
```
Visit: /admin/analytics
Verify: Events appear in real-time stats
```

3. **Run metric calculation:**
```sql
-- In Supabase SQL editor
SELECT * FROM calculate_dau(CURRENT_DATE);
SELECT * FROM calculate_wau(CURRENT_DATE);
SELECT * FROM calculate_mau(CURRENT_DATE);
```

### Automated Testing
```bash
# Run the daily metrics update
psql -c "SELECT update_daily_metrics();"
```

---

## 📚 Additional Resources

- [Metrics That Matter for Digital Platforms](https://www.lennysnewsletter.com/p/what-is-good-retention)
- [Understanding DAU/MAU Ratio](https://www.reforge.com/blog/dau-mau-ratio)
- [Growth Metrics Framework](https://www.sequoiacap.com/article/business-metrics/)

---

## 🆘 Troubleshooting

### Issue: No data showing in charts
**Solution:** 
1. Check if migration has run: `SELECT * FROM platform_metrics LIMIT 1;`
2. Manually trigger update: `SELECT update_daily_metrics();`
3. Add test events via tracking functions

### Issue: DAU/WAU/MAU all showing 0
**Solution:**
1. Verify `user_activity_events` has data: `SELECT COUNT(*) FROM user_activity_events;`
2. Track some test events
3. Re-run metric calculation

### Issue: Slow dashboard loading
**Solution:**
1. Check database indexes are created
2. Add date range filtering
3. Consider caching for historical data

---

## 📞 Support

For questions or issues:
- Check `/docs/database/ADMIN_APPROVAL_SYSTEM.md`
- Review Supabase logs
- Contact: admin@incubazar.com

---

**Built with ❤️ for Incubazar Platform**
