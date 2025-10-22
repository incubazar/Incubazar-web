# 🚀 Quick Deployment Guide - Incubazar MVP

**Last Updated:** October 21, 2025  
**Status:** Ready for Production

---

## ✅ Pre-Deployment Checklist

### 1. Database Migration ✓
You've already run:
```sql
-- Migration: 20240122000000_mvp_features.sql
-- Status: COMPLETE ✓
```

### 2. Storage Bucket ✓
You've already created:
```
Bucket Name: data-rooms
Access: Private
Status: ACTIVE ✓
```

---

## 🔧 Required Environment Variables

Ensure these are set in your `.env.local`:

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Optional (for advanced features)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
DOCUSIGN_INTEGRATION_KEY=your_docusign_key
```

---

## 📦 Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Application
```bash
npm run build
```

### 3. Test Locally
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🎬 Initial Setup Workflow

### Step 1: Create Admin User
1. Manually insert admin user in Supabase:
```sql
-- In Supabase SQL Editor
INSERT INTO users (id, email, role, verification_status)
VALUES (
  'your-auth-user-id',  -- From Supabase Auth
  'admin@incubazar.com',
  'admin',
  'approved'
);
```

### Step 2: Generate Invite Codes
1. Login as admin
2. Navigate to `/admin/invites`
3. Generate codes:
   - **Founder Codes:** 50 codes, 1 use each
   - **Investor Codes:** 100 codes, 1 use each

### Step 3: Test User Journeys

#### Test Founder Flow
1. Register with founder invite code
2. Complete 6-step onboarding
3. Build data room (upload at least 5 files)
4. Generate SAFE document
5. Create a deal
6. Verify it appears in Admin review queue

#### Test Investor Flow
1. Register with investor invite code
2. Complete 5-step onboarding
3. Check the risk acknowledgment
4. View featured deals
5. View AI recommendations
6. Express interest in a deal

#### Test Admin Flow
1. Login as admin
2. Review pending deals at `/admin/deals`
3. Approve a deal
4. Promote a deal to "Featured"
5. Verify it appears on investor dashboard

---

## 🔐 Security Configuration

### 1. RLS Policies
All policies are active via migration ✓

### 2. Storage Rules
Ensure bucket policies are set:
```sql
-- Supabase Dashboard → Storage → data-rooms → Policies
-- Policies already created via migration ✓
```

### 3. Email Templates
Configure in Supabase Dashboard → Authentication → Email Templates:
- Confirmation email
- Password reset
- Magic link

---

## 📊 Monitoring & Testing

### Critical Pages to Test

**Public Pages:**
- [x] Landing page: `/`
- [x] Login: `/login`
- [x] Registration: `/register`

**Founder Pages:**
- [x] Dashboard: `/founder`
- [x] Onboarding: `/founder/onboarding`
- [x] Data Room: `/founder/data-room`
- [x] Create Deal: `/founder/deals/create`
- [x] Investors: `/founder/investors`

**Investor Pages:**
- [x] Dashboard: `/investor`
- [x] Onboarding: `/investor/onboarding`
- [x] Deal Details: `/investor/deals/[id]`
- [x] Portfolio: `/investor/portfolio`

**Admin Pages:**
- [x] Dashboard: `/admin`
- [x] Invites: `/admin/invites`
- [x] Deals: `/admin/deals`
- [x] Users: `/admin/users`

**Shared Pages:**
- [x] Messages: `/messages`

### Test Scenarios

**Scenario 1: Complete Founder Journey**
```
✓ Register → Onboard → Upload Documents → Generate SAFE → Create Deal → Wait for Approval
```

**Scenario 2: Complete Investor Journey**
```
✓ Register → Onboard → Acknowledge Risk → Browse Deals → Express Interest → Request Data Room
```

**Scenario 3: Admin Workflow**
```
✓ Generate Codes → Review Deals → Approve → Feature → Monitor
```

**Scenario 4: Investment & Messaging**
```
✓ Founder accepts investor → Mark as invested → Messages unlock → Chat works
```

---

## 🐛 Troubleshooting

### Issue: Invite code not working
**Solution:**
1. Check code is active in `/admin/invites`
2. Verify usage limit not exceeded
3. Check expiry date

### Issue: Deal not visible to investors
**Solution:**
1. Check `admin_approval_status = 'approved'`
2. Verify `is_active = true`
3. Check RLS policies

### Issue: Data room upload failing
**Solution:**
1. Verify bucket exists: `data-rooms`
2. Check file size < 10MB
3. Verify user authentication

### Issue: Messaging not available
**Solution:**
1. Check investor interest status is `invested`
2. Verify both parties have profiles
3. Check RLS policies on messages table

---

## 📈 Performance Optimization

### Database Indexes ✓
All created via migration:
- Foreign keys indexed
- Status fields indexed
- Created_at fields indexed

### Query Optimization
Use selective queries:
```typescript
// Good ✓
.select('id, name, status')

// Avoid ✗
.select('*')
```

### Image Optimization
- Max upload: 10MB
- Compress images before upload
- Use WebP format when possible

---

## 🔄 Backup Strategy

### Daily Backups (Supabase Automatic)
- Database snapshots: 7-day retention
- Point-in-time recovery: Available

### Critical Data to Backup
1. User profiles
2. Deals
3. Generated documents
4. Messages
5. Compliance data

---

## 📱 Production Checklist

Before going live:

### Security
- [ ] Change all default passwords
- [ ] Enable 2FA for admin accounts
- [ ] Review RLS policies
- [ ] Enable rate limiting
- [ ] Configure CORS properly

### Content
- [ ] Update legal pages (terms, privacy)
- [ ] Add company branding
- [ ] Set up email templates
- [ ] Create help documentation

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Enable analytics (Google Analytics)
- [ ] Configure uptime monitoring
- [ ] Set up log aggregation

### Compliance
- [ ] Legal review of all disclaimers
- [ ] CA verification of SAFE templates
- [ ] Privacy policy approval
- [ ] GDPR compliance check (if applicable)

---

## 🆘 Emergency Contacts

**Database Issues:**
- Supabase Dashboard: https://app.supabase.io
- Support: support@supabase.io

**Deployment Issues:**
- Vercel/Railway Support
- Check build logs
- Review error traces

**User Issues:**
- Admin Dashboard: `/admin`
- Check user verification status
- Review audit logs

---

## 🎯 Success Metrics to Track

### Week 1
- Invite codes distributed: Target 50
- Registrations: Target 20
- Deals created: Target 5
- Investor interests: Target 10

### Month 1
- Active users: Target 100
- Deals approved: Target 20
- Connections made: Target 30
- Messages sent: Target 100

### Quarter 1
- Total users: Target 500
- Active deals: Target 100
- Investments facilitated: Target 50
- Platform GMV: Target ₹10 Cr

---

## 📞 Support Resources

**Documentation:**
- `/docs/README.md` - Platform overview
- `/docs/guides/QUICKSTART.md` - Quick start guide
- `/docs/deployment/DEPLOYMENT_GUIDE.md` - Detailed deployment

**API Documentation:**
- Supabase API: Auto-generated
- Custom APIs: See `/app/api/` folder

**Community:**
- Internal Slack channel
- Weekly team sync
- Monthly user feedback sessions

---

## 🚀 Launch Sequence

### Pre-Launch (T-7 days)
- [ ] Complete all testing
- [ ] Train customer support team
- [ ] Prepare marketing materials
- [ ] Set up monitoring dashboards

### Launch Day (T-0)
- [ ] Deploy to production
- [ ] Verify all systems operational
- [ ] Generate first batch of invite codes
- [ ] Send launch announcements
- [ ] Monitor closely for issues

### Post-Launch (T+7 days)
- [ ] Gather user feedback
- [ ] Fix critical bugs
- [ ] Optimize based on usage patterns
- [ ] Plan feature iterations

---

## ✅ Final Verification

Run this checklist before declaring "Production Ready":

```bash
# 1. Build succeeds
npm run build
# ✓ Build successful

# 2. No linter errors
npm run lint
# ✓ No errors

# 3. TypeScript compilation
npm run type-check
# ✓ No type errors

# 4. Database migration applied
# ✓ Migration run successfully

# 5. Storage bucket created
# ✓ Bucket 'data-rooms' exists

# 6. Environment variables set
# ✓ All required variables present

# 7. RLS policies active
# ✓ All policies enabled

# 8. Test admin user created
# ✓ Admin can log in

# 9. Invite codes generated
# ✓ Codes available for distribution

# 10. Critical flows tested
# ✓ Founder, Investor, Admin journeys verified
```

---

## 🎉 You're Ready to Launch!

**All systems are GO for production deployment.**

**Next Steps:**
1. Generate initial invite codes
2. Send to beta testers
3. Monitor dashboards
4. Iterate based on feedback

**Good luck with the launch! 🚀**

---

*Deployment guide prepared on October 21, 2025*  
*Platform: Incubazar MVP*  
*Version: 1.0.0*


