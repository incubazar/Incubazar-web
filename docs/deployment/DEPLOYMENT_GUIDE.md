# Incubazar - Quick Deployment Guide

This guide will help you deploy the premium Incubazar platform to production.

## 📋 Prerequisites Checklist

- [ ] Supabase account and project created
- [ ] Vercel account (for frontend deployment)
- [ ] Razorpay account (for payments)
- [ ] DocuSign developer account (for e-signatures)
- [ ] Domain name (optional, recommended for production)

---

## 🗄️ Database Setup (Supabase)

### Step 1: Create Supabase Project
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose a name (e.g., "incubazar-prod")
4. Set a strong database password
5. Select a region close to your users
6. Wait for project to be ready (~2 minutes)

### Step 2: Run Database Migrations
Run migrations in **exact order**:

```bash
# Navigate to your project
cd incubazar

# Install Supabase CLI (if not installed)
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations in order
supabase db push
```

Or manually via SQL Editor in Supabase Dashboard:
1. Open SQL Editor
2. Run each migration file in order:
   - `001_initial_schema.sql`
   - `002_rls_policies.sql`
   - `003_fix_rls_policies.sql` (if exists)
   - `004_investor_limit_trigger.sql`

### Step 3: Create Storage Buckets
In Supabase Dashboard > Storage:

1. **documents** (Private)
   - For KYC docs, pitch decks
   - Enable RLS
   - Max file size: 10MB

2. **logos** (Public)
   - For startup logos
   - Enable RLS
   - Max file size: 2MB

3. **generated-docs** (Private)
   - For auto-generated legal documents
   - Enable RLS
   - Max file size: 5MB

### Step 4: Note Your Credentials
From Project Settings > API:
- Project URL: `https://xxxxx.supabase.co`
- Anon/Public Key: `eyJhbGc...`
- Service Role Key: `eyJhbGc...` (⚠️ Keep secret!)

---

## 🚀 Vercel Deployment

### Step 1: Push to GitHub
```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit - Premium Incubazar"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/incubazar.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables
In Vercel > Project Settings > Environment Variables, add:

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Config (REQUIRED)
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_generated_secret_here

# Razorpay (REQUIRED)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# DocuSign (REQUIRED)
DOCUSIGN_INTEGRATION_KEY=your_key
DOCUSIGN_USER_ID=your_user_id
DOCUSIGN_ACCOUNT_ID=your_account_id
DOCUSIGN_PRIVATE_KEY=your_base64_encoded_key
DOCUSIGN_OAUTH_BASE_URL=https://account.docusign.com
DOCUSIGN_API_BASE_URL=https://www.docusign.net/restapi

# AI Service (OPTIONAL)
NEXT_PUBLIC_AI_SERVICE_URL=your_ai_service_url
AI_SERVICE_API_KEY=your_api_key

# Compliance
NEXT_PUBLIC_MAX_INVESTORS_PER_DEAL=200
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (~3-5 minutes)
3. Verify deployment at provided URL

---

## 🔐 Security Checklist

### Supabase Security
- [ ] Enable Email Confirmations (Auth > Settings)
- [ ] Set Auth site URL to your production domain
- [ ] Add your domain to redirect URLs
- [ ] Enable RLS on all tables (already done via migrations)
- [ ] Review and test all RLS policies
- [ ] Enable 2FA on Supabase account

### Vercel Security
- [ ] Add custom domain with SSL
- [ ] Enable Vercel's DDoS protection
- [ ] Set up proper CORS headers
- [ ] Enable deployment protection
- [ ] Review environment variable scope

### Application Security
- [ ] Verify all API routes require authentication
- [ ] Test investor limit enforcement
- [ ] Test RLS policies with different user roles
- [ ] Review rate limiting configuration
- [ ] Enable error tracking (Sentry recommended)

---

## 🧪 Post-Deployment Testing

### Critical Tests
1. **Authentication Flow**
   ```
   - [ ] User registration (founder & investor)
   - [ ] Email verification
   - [ ] Login/logout
   - [ ] Password reset
   ```

2. **Compliance Tests**
   ```
   - [ ] Investor limit counter displays correctly
   - [ ] Cannot add 201st investor to a deal
   - [ ] Deal auto-closes at 200 investors
   - [ ] Private placement notices visible
   - [ ] No public deal pages accessible
   ```

3. **User Flows**
   ```
   - [ ] Founder can create startup profile
   - [ ] Founder can create deal
   - [ ] Investor can complete KYC
   - [ ] Investor can view deals
   - [ ] Investor can express interest
   - [ ] Quarterly updates work
   - [ ] Admin can approve startups
   ```

4. **Data Security**
   ```
   - [ ] Investors only see approved startups
   - [ ] Founders only see their own data
   - [ ] Admins can see all data
   - [ ] Document uploads work securely
   ```

---

## 📊 Monitoring Setup

### Recommended Tools
1. **Vercel Analytics** (Built-in)
   - Enable in Project Settings
   - Monitor Web Vitals

2. **Supabase Dashboard**
   - Monitor database performance
   - Check auth metrics
   - Review storage usage

3. **Sentry** (Optional but recommended)
   ```bash
   npm install @sentry/nextjs
   # Follow Sentry setup guide
   ```

4. **LogDNA / Datadog** (Optional)
   - For advanced log aggregation

---

## 🔄 Database Backup

### Automated Backups (Recommended)
Supabase Pro plan includes:
- Daily automatic backups
- Point-in-time recovery
- 7-day retention

### Manual Backup
```bash
# Using Supabase CLI
supabase db dump -f backup.sql

# Or using pg_dump directly
pg_dump -h db.xxxxx.supabase.co -U postgres -d postgres > backup.sql
```

---

## 📈 Scaling Considerations

### When to Scale

**Supabase:**
- Upgrade from Free to Pro when:
  - 500MB database size reached
  - 2GB bandwidth/month exceeded
  - Need daily backups
  - Need custom domains

**Vercel:**
- Upgrade from Hobby to Pro when:
  - Need team collaboration
  - Require advanced analytics
  - Need password protection
  - Exceed bandwidth limits

### Performance Optimization
1. Enable Vercel Edge Functions for API routes
2. Use Supabase Edge Functions for complex queries
3. Implement Redis for caching (Upstash recommended)
4. Add CDN for static assets
5. Optimize images with Next.js Image component

---

## 🚨 Emergency Procedures

### Database Issues
```bash
# Check database health
supabase db health

# Restore from backup
supabase db restore backup.sql
```

### Application Down
1. Check Vercel deployment status
2. Check Supabase status page
3. Review error logs in Vercel
4. Check Sentry for exceptions
5. Verify environment variables

### Rollback Deployment
```bash
# Via Vercel Dashboard
# Go to Deployments > Select previous version > Promote to Production

# Or redeploy specific commit
vercel --prod --yes
```

---

## 📞 Support Resources

- **Supabase:** [docs.supabase.com](https://docs.supabase.com)
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Razorpay:** [razorpay.com/docs](https://razorpay.com/docs)
- **DocuSign:** [developers.docusign.com](https://developers.docusign.com)

---

## ✅ Launch Checklist

Before going live:
- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] Storage buckets created with RLS
- [ ] Custom domain configured with SSL
- [ ] Authentication tested end-to-end
- [ ] Compliance features verified
- [ ] Payment integration tested (test mode)
- [ ] Email delivery working
- [ ] Error tracking enabled
- [ ] Backups configured
- [ ] Monitoring dashboards set up
- [ ] Legal pages updated (Terms, Privacy)
- [ ] Contact information updated
- [ ] Test with real users (beta group)
- [ ] Load testing completed
- [ ] Security audit performed

---

## 🎉 Post-Launch

1. **Monitor for 24 hours**
   - Watch error rates
   - Check performance metrics
   - Monitor database load

2. **User Feedback**
   - Set up feedback collection
   - Monitor support channels
   - Track user issues

3. **Marketing**
   - Announce launch
   - Update social media
   - Email existing users

---

**Deployment Status:** Ready for Production ✅  
**Estimated Setup Time:** 2-3 hours  
**Difficulty Level:** Intermediate

Need help? Create an issue on GitHub or contact support.

