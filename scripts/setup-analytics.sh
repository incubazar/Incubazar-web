#!/bin/bash

# Admin Analytics System - Quick Setup Script
# This script helps set up the production-ready analytics system

echo "=========================================="
echo "📊 Incubazar Analytics System Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if Supabase CLI is available
echo -e "${BLUE}Step 1: Checking prerequisites...${NC}"
if command -v supabase &> /dev/null; then
    echo -e "${GREEN}✓ Supabase CLI found${NC}"
else
    echo -e "${YELLOW}⚠ Supabase CLI not found. Install it for easier migration management.${NC}"
    echo "  Install: https://supabase.com/docs/guides/cli"
fi
echo ""

# Step 2: Migration info
echo -e "${BLUE}Step 2: Database Migration${NC}"
echo "Migration file: supabase/migrations/20241026_platform_analytics.sql"
echo ""
echo "To apply the migration:"
echo "1. Via Supabase Dashboard:"
echo "   - Go to https://app.supabase.io"
echo "   - Select your project"
echo "   - Go to SQL Editor"
echo "   - Copy contents of: supabase/migrations/20241026_platform_analytics.sql"
echo "   - Run the SQL"
echo ""
echo "2. Via Supabase CLI (if installed):"
echo "   supabase db push"
echo ""
read -p "Press Enter when migration is complete..."

# Step 3: Verify migration
echo ""
echo -e "${BLUE}Step 3: Verify Database Setup${NC}"
echo "Run this query in Supabase SQL Editor to verify:"
echo ""
echo "SELECT table_name FROM information_schema.tables"
echo "WHERE table_schema = 'public'"
echo "AND table_name IN ("
echo "  'user_activity_events',"
echo "  'daily_active_users',"
echo "  'platform_metrics',"
echo "  'user_engagement_scores',"
echo "  'user_sessions'"
echo ");"
echo ""
echo "You should see all 5 tables listed."
echo ""
read -p "Press Enter when verification is complete..."

# Step 4: Set up cron job
echo ""
echo -e "${BLUE}Step 4: Set Up Daily Metrics Update (Optional)${NC}"
echo "For production, set up a cron job to update metrics daily."
echo ""
echo "Option A - Supabase pg_cron (Recommended):"
echo "Run this in Supabase SQL Editor:"
echo ""
echo "SELECT cron.schedule("
echo "  'update-daily-metrics',"
echo "  '0 0 * * *',"  # Midnight UTC
echo "  \$\$ SELECT update_daily_metrics(); \$\$"
echo ");"
echo ""
echo "Option B - External Cron Job:"
echo "Set up a cron job to call an API endpoint that triggers metric updates."
echo ""
read -p "Press Enter to continue..."

# Step 5: Test the system
echo ""
echo -e "${BLUE}Step 5: Test the Analytics System${NC}"
echo "1. Start your development server:"
echo "   npm run dev"
echo ""
echo "2. Access the admin panel:"
echo "   http://localhost:3000/admin"
echo ""
echo "3. Navigate to Analytics:"
echo "   http://localhost:3000/admin/analytics"
echo ""
echo "4. Generate test data:"
echo "   - Log in as different users"
echo "   - View some deals"
echo "   - Create a deal"
echo "   - Send messages"
echo ""
echo "5. Manually update metrics:"
echo "   Run in Supabase SQL Editor: SELECT update_daily_metrics();"
echo ""
read -p "Press Enter to continue..."

# Step 6: Integration guide
echo ""
echo -e "${BLUE}Step 6: Integrate Analytics Tracking${NC}"
echo "Add tracking to your application code:"
echo ""
echo "Import the analytics library:"
echo "  import { trackLogin, trackDealView } from '@/lib/analytics/metrics'"
echo ""
echo "Track user login (in auth callback):"
echo "  await trackLogin(userId, sessionId)"
echo ""
echo "Track deal views (in deal page):"
echo "  await trackDealView(userId, dealId)"
echo ""
echo "Track deal creation (in create deal):"
echo "  await trackDealCreate(userId, dealId)"
echo ""
echo "See ADMIN_ANALYTICS_SYSTEM.md for full integration guide."
echo ""

# Step 7: Final checklist
echo ""
echo -e "${BLUE}Step 7: Final Checklist${NC}"
echo ""
echo "✓ Migration applied successfully"
echo "✓ All 5 tables created"
echo "✓ RLS policies enabled"
echo "✓ Helper functions created"
echo "✓ Cron job scheduled (optional)"
echo "✓ Analytics dashboard accessible at /admin/analytics"
echo "✓ Tracking integrated in application code"
echo ""

# Success message
echo ""
echo -e "${GREEN}=========================================="
echo "✓ Setup Complete!"
echo "==========================================${NC}"
echo ""
echo "Next Steps:"
echo "1. Access analytics: http://localhost:3000/admin/analytics"
echo "2. Read documentation: ADMIN_ANALYTICS_SYSTEM.md"
echo "3. Integrate tracking in your codebase"
echo "4. Monitor your metrics!"
echo ""
echo "Need help? Check the troubleshooting section in:"
echo "ADMIN_ANALYTICS_SYSTEM.md"
echo ""
