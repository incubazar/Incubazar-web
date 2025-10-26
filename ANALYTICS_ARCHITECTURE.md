# 📊 Analytics System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     INCUBAZAR ANALYTICS SYSTEM                  │
│                      Production-Ready v1.0                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        USER ACTIVITY FLOW                        │
└─────────────────────────────────────────────────────────────────┘

    User Actions                   Tracking Layer               Database
    ────────────                   ──────────────              ──────────
    
    🧑 Login                    ──▶  trackLogin()        ──▶  user_activity_events
    👁  View Deal               ──▶  trackDealView()     ──▶  user_activity_events
    ✏️  Create Deal             ──▶  trackDealCreate()   ──▶  user_activity_events
    💬 Send Message             ──▶  trackMessage()      ──▶  user_activity_events
    💰 Express Interest         ──▶  trackInterest()     ──▶  user_activity_events
    📚 View Learning Module     ──▶  trackLearningView() ──▶  user_activity_events

┌─────────────────────────────────────────────────────────────────┐
│                     METRICS CALCULATION FLOW                     │
└─────────────────────────────────────────────────────────────────┘

    Raw Events                  Aggregation                 Metrics Output
    ──────────                  ───────────                ───────────────
    
    user_activity_events
         │
         ├──▶ calculate_dau()  ──▶  DAU (Daily Active Users)
         │
         ├──▶ calculate_wau()  ──▶  WAU (Weekly Active Users)
         │
         ├──▶ calculate_mau()  ──▶  MAU (Monthly Active Users)
         │
         └──▶ update_daily_metrics()  ──▶  platform_metrics table
                                            │
                                            ├──▶ DAU/MAU Ratio (Stickiness)
                                            ├──▶ Growth Rate
                                            ├──▶ Engagement Levels
                                            └──▶ Business KPIs

┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE SCHEMA OVERVIEW                    │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────────────┐
    │ user_activity_events│  ◀── Every user action stored here
    ├─────────────────────┤
    │ • user_id           │
    │ • event_type        │  (login, deal_view, message_sent, etc.)
    │ • event_category    │  (engagement, transaction, content)
    │ • metadata          │  (additional context)
    │ • created_at        │
    └─────────────────────┘
              │
              │ Aggregated Daily via
              │ update_daily_metrics()
              ▼
    ┌─────────────────────┐
    │  platform_metrics   │  ◀── Daily snapshot of all metrics
    ├─────────────────────┤
    │ • date              │  (unique per day)
    │ • dau, wau, mau     │  (engagement metrics)
    │ • new_signups       │  (growth)
    │ • deals_created     │  (activity)
    │ • investments_made  │  (transactions)
    │ • retention_rate    │  (health)
    └─────────────────────┘
              │
              │ Powers
              ▼
    ┌─────────────────────┐
    │  Admin Dashboard    │  ◀── /admin/analytics
    ├─────────────────────┤
    │ • Charts & Graphs   │
    │ • Real-time Stats   │
    │ • Export to CSV     │
    │ • Insights          │
    └─────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     KEY METRICS EXPLAINED                        │
└─────────────────────────────────────────────────────────────────┘

    Metric              Formula                     Meaning
    ──────              ───────                     ───────
    
    DAU                 Unique users / 24hrs        Daily engagement
    WAU                 Unique users / 7 days       Weekly engagement  
    MAU                 Unique users / 30 days      Monthly engagement
    
    DAU/MAU Ratio       (DAU ÷ MAU) × 100          Stickiness (how often users return)
                        
                        📊 Benchmarks:
                        • 10-15%  = Okay
                        • 20-30%  = Good (marketplace target)
                        • 40%+    = Excellent
                        • 60%+    = World-class
    
    DAU/WAU Ratio       (DAU ÷ WAU) × 100          Daily engagement rate
                        Target: 60%+

┌─────────────────────────────────────────────────────────────────┐
│                      ANALYTICS DASHBOARD TABS                    │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────────┐
    │  ENGAGEMENT TAB │
    ├─────────────────┤
    │ • DAU/WAU/MAU Trend (Line Chart)
    │ • Engagement Distribution (Pie Chart)
    │ • Stickiness Ratio (Area Chart)
    └─────────────────┘

    ┌─────────────────┐
    │   GROWTH TAB    │
    ├─────────────────┤
    │ • New Signups (Bar Chart)
    │ • Month-over-Month Growth (%)
    │ • User Acquisition Trends
    └─────────────────┘

    ┌─────────────────┐
    │  ACTIVITY TAB   │
    ├─────────────────┤
    │ • Deals Created vs Investments
    │ • Messages Sent
    │ • Content Views
    └─────────────────┘

    ┌─────────────────┐
    │   TRENDS TAB    │
    ├─────────────────┤
    │ • Weekly Trends
    │ • Week-over-Week Comparison
    │ • Seasonal Patterns
    └─────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     AUTOMATION & SCHEDULING                      │
└─────────────────────────────────────────────────────────────────┘

    Daily (Midnight UTC)
    ────────────────────
    
    Supabase pg_cron
         │
         ├──▶ Run: update_daily_metrics()
         │         │
         │         ├──▶ Calculate DAU, WAU, MAU
         │         ├──▶ Aggregate activity counts
         │         ├──▶ Calculate retention rates
         │         └──▶ Update platform_metrics table
         │
         └──▶ Result: Fresh metrics available every morning

    Setup Command:
    ──────────────
    SELECT cron.schedule(
      'update-daily-metrics',
      '0 0 * * *',
      $$ SELECT update_daily_metrics(); $$
    );

┌─────────────────────────────────────────────────────────────────┐
│                        INTEGRATION POINTS                        │
└─────────────────────────────────────────────────────────────────┘

    Where to Add Tracking:
    ──────────────────────
    
    ✅ Auth Callback                 ──▶  trackLogin(userId)
    ✅ Deal Detail Page              ──▶  trackDealView(userId, dealId)
    ✅ Create Deal Success           ──▶  trackDealCreate(userId, dealId)
    ✅ Message Send Handler          ──▶  trackMessage(userId, recipientId)
    ✅ Interest Express Handler      ──▶  trackInterest(userId, dealId, amount)
    ✅ Learning Module Page          ──▶  trackLearningView(userId, path)

    Example Code:
    ─────────────
    
    import { trackDealView } from '@/lib/analytics'
    
    useEffect(() => {
      if (userId && dealId) {
        trackDealView(userId, dealId)
      }
    }, [userId, dealId])

┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY & PRIVACY                          │
└─────────────────────────────────────────────────────────────────┘

    RLS Policies:
    ─────────────
    
    • user_activity_events       ──▶  Users: INSERT own | Admins: SELECT all
    • platform_metrics           ──▶  Admins only
    • user_engagement_scores     ──▶  Users: SELECT own | Admins: SELECT all
    • daily_active_users         ──▶  Admins only
    • user_sessions              ──▶  Users: SELECT own | Admins: SELECT all

    Data Retention:
    ───────────────
    
    • Raw events: 90 days (configurable)
    • Aggregated metrics: Forever
    • Personal data: Anonymized after 30 days of inactivity

┌─────────────────────────────────────────────────────────────────┐
│                        SUCCESS CRITERIA                          │
└─────────────────────────────────────────────────────────────────┘

    Month 1 Targets:
    ────────────────
    ✓ MAU: 100+ users
    ✓ DAU/MAU: 15%+
    ✓ Active Deals: 20+
    
    Month 3 Targets:
    ────────────────
    ✓ MAU: 500+ users
    ✓ DAU/MAU: 20%+
    ✓ Active Deals: 100+
    
    Month 6 Targets:
    ────────────────
    ✓ MAU: 1,500+ users
    ✓ DAU/MAU: 25%+
    ✓ Total Raised: ₹5 Cr+

    Month 12 Targets:
    ─────────────────
    ✓ MAU: 5,000+ users
    ✓ DAU/MAU: 30%+
    ✓ Total Raised: ₹25 Cr+

┌─────────────────────────────────────────────────────────────────┐
│                      EXPORT & REPORTING                          │
└─────────────────────────────────────────────────────────────────┘

    CSV Export includes:
    ────────────────────
    
    • Date
    • DAU, WAU, MAU
    • DAU/MAU Ratio (%)
    • Total Users
    • New Signups
    • Deals Created
    • Investments Made
    • Total Invested (₹)
    • Retention Rate (%)
    
    Usage:
    ──────
    
    Click "Export CSV" button in /admin/analytics
    ├─▶ Download: incubazar-metrics-YYYY-MM-DD.csv
    └─▶ Use in: Excel, Google Sheets, Business Intelligence tools

┌─────────────────────────────────────────────────────────────────┐
│                         NEXT STEPS                               │
└─────────────────────────────────────────────────────────────────┘

    Phase 2 (Recommended):
    ──────────────────────
    
    □ Cohort Analysis (retention by signup month)
    □ Funnel Analytics (signup → deal → investment)
    □ A/B Testing Framework
    □ Predictive Analytics (churn prediction)
    □ Custom Alerts (DAU drops, growth spikes)
    
    Phase 3 (Advanced):
    ───────────────────
    
    □ Real-time Dashboard (WebSocket updates)
    □ ML-based Recommendations
    □ Revenue Forecasting
    □ User Segmentation (RFM Analysis)
    □ Automated Weekly Reports via Email

═══════════════════════════════════════════════════════════════════

                    🎉 ANALYTICS SYSTEM READY! 🎉
                    
                Your admin panel is now equipped with
                world-class analytics capabilities!

═══════════════════════════════════════════════════════════════════
```

## Quick Reference

**Access:** `/admin/analytics`

**Track Event:**
```typescript
import { trackLogin } from '@/lib/analytics'
await trackLogin(userId)
```

**Update Metrics:**
```sql
SELECT update_daily_metrics();
```

**Export Data:** Click "Export CSV" button

**Documentation:** See `ADMIN_ANALYTICS_SYSTEM.md`
