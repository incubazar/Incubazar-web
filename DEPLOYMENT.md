# Incubazar Setup & Deployment Guide

This guide provides step-by-step instructions to set up and deploy the Incubazar platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Setup](#database-setup)
4. [Third-Party Integrations](#third-party-integrations)
5. [Running the Application](#running-the-application)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm/yarn
- **Python** 3.11+
- **Docker** and Docker Compose (optional, for containerized deployment)
- **Git** for version control
- **Supabase CLI** for database management

### Account Requirements

You'll also need accounts for these services:

- [Supabase](https://supabase.com/) - Backend infrastructure
- [Razorpay](https://razorpay.com/) - Payment processing
- [DocuSign](https://www.docusign.com/) - E-signatures (optional for MVP)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/incubazar.git
cd incubazar
```

### 2. Install Dependencies

#### Frontend (Next.js)

```bash
npm install
```

#### AI Service (Python)

```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 3. Environment Configuration

Copy the environment example file:

```bash
cp env.example .env.local
```

Edit `.env.local` with your actual credentials (see [Third-Party Integrations](#third-party-integrations) section).

Create AI service environment file:

```bash
cd ai-service
cp .env.example .env
# Edit .env with your Supabase credentials
cd ..
```

## Database Setup

### Option 1: Using Supabase Cloud (Recommended)

1. **Create a Supabase Project**
   - Go to [Supabase Dashboard](https://app.supabase.com/)
   - Click "New Project"
   - Fill in project details and create

2. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy:
     - Project URL (NEXT_PUBLIC_SUPABASE_URL)
     - Anon/Public Key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
     - Service Role Key (SUPABASE_SERVICE_ROLE_KEY)
   - Add these to your `.env.local` file

3. **Link Local Project to Supabase**

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref
```

4. **Run Database Migrations**

```bash
# Push migrations to Supabase
supabase db push

# Or reset database (careful: this deletes all data)
supabase db reset
```

5. **Create Storage Buckets**

In Supabase Dashboard → Storage, create these buckets:

- `documents` (for KYC documents, pitch decks)
  - Make it private
  - Set max file size to 10MB

- `logos` (for startup logos)
  - Can be public
  - Set max file size to 5MB

- `generated-docs` (for auto-generated legal documents)
  - Make it private
  - Set max file size to 5MB

### Option 2: Using Local Supabase

```bash
# Start local Supabase
supabase start

# This will output local credentials
# Use these in your .env.local
```

## Third-Party Integrations

### Razorpay Setup

1. **Create Account**
   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Sign up and verify your business

2. **Get API Keys**
   - Go to Settings → API Keys
   - Generate Test/Live keys
   - Add to `.env.local`:
     ```
     NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
     RAZORPAY_KEY_SECRET=...
     ```

3. **Set Up Webhook**
   - Go to Settings → Webhooks
   - Add webhook URL: `https://yourdomain.com/api/payments/webhook`
   - Select events: `payment.captured`, `payment.failed`
   - Copy webhook secret to `.env.local`

### DocuSign Setup (Optional)

1. **Create Developer Account**
   - Go to [DocuSign Developer Center](https://developers.docusign.com/)
   - Create a demo account

2. **Create Integration Key**
   - Go to Apps & Keys
   - Create new App
   - Copy Integration Key
   - Generate RSA Key Pair

3. **Add to Environment**
   ```
   DOCUSIGN_INTEGRATION_KEY=your_integration_key
   DOCUSIGN_USER_ID=your_user_id
   DOCUSIGN_ACCOUNT_ID=your_account_id
   DOCUSIGN_PRIVATE_KEY=your_private_key
   ```

## Running the Application

### Development Mode

1. **Start the Frontend**

```bash
npm run dev
```

Access at: http://localhost:3000

2. **Start the AI Service** (in a new terminal)

```bash
cd ai-service
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Access API docs at: http://localhost:8000/docs

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access:
- Frontend: http://localhost:3000
- AI Service: http://localhost:8000

## Production Deployment

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Deploy**

```bash
vercel --prod
```

3. **Set Environment Variables**

In Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Redeploy

### AI Service Deployment (Railway)

1. **Install Railway CLI**

```bash
npm install -g @railway/cli
```

2. **Login and Deploy**

```bash
cd ai-service
railway login
railway init
railway up
```

3. **Set Environment Variables**

In Railway Dashboard:
- Add Supabase credentials
- Add any AI-specific variables

4. **Update Frontend Environment**

Update `NEXT_PUBLIC_AI_SERVICE_URL` in Vercel with your Railway URL.

### Alternative: Docker Deployment

1. **Build Production Images**

```bash
docker-compose -f docker-compose.prod.yml build
```

2. **Deploy to Your Server**

```bash
# On your server
docker-compose -f docker-compose.prod.yml up -d
```

3. **Set Up Reverse Proxy (Nginx)**

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ai {
        proxy_pass http://localhost:8000;
    }
}
```

### Database Migrations in Production

```bash
# Connect to production database
supabase link --project-ref your-prod-project-ref

# Push migrations
supabase db push

# Or run specific migration
supabase db push --file supabase/migrations/001_initial_schema.sql
```

## Post-Deployment Tasks

### 1. Create Admin User

Run this SQL in Supabase SQL Editor:

```sql
-- Create admin user account
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
VALUES (
    gen_random_uuid(),
    'admin@incubazar.com',
    crypt('secure_password', gen_salt('bf')),
    now(),
    'authenticated'
);

-- Create admin profile
INSERT INTO public.users (id, email, role, full_name, verification_status)
SELECT id, 'admin@incubazar.com', 'admin', 'Admin User', 'verified'
FROM auth.users
WHERE email = 'admin@incubazar.com';
```

### 2. Verify Integrations

- Test Razorpay payments in test mode
- Verify email sending works
- Check file uploads to storage buckets
- Test AI recommendations endpoint

### 3. Set Up Monitoring

- Enable Supabase Logs
- Set up error tracking (Sentry)
- Configure uptime monitoring
- Set up database backups

## Troubleshooting

### Common Issues

#### Database Connection Errors

```bash
# Check Supabase status
supabase status

# Restart local Supabase
supabase stop
supabase start
```

#### AI Service Not Connecting

```bash
# Check if service is running
curl http://localhost:8000/health

# Check logs
docker-compose logs ai-service
```

#### Payment Integration Issues

- Verify Razorpay keys are correct
- Check webhook URL is accessible
- Test with Razorpay test cards

#### File Upload Problems

- Verify storage buckets exist
- Check RLS policies on storage
- Ensure file size limits are set

### Getting Help

- Check [GitHub Issues](https://github.com/yourusername/incubazar/issues)
- Review [Supabase Docs](https://supabase.com/docs)
- Join our [Discord Community](https://discord.gg/incubazar)

## Security Checklist

Before going live:

- [ ] Change all default passwords
- [ ] Use production API keys (not test keys)
- [ ] Enable HTTPS with SSL certificates
- [ ] Set up CORS properly
- [ ] Enable rate limiting
- [ ] Review RLS policies
- [ ] Set up database backups
- [ ] Enable audit logging
- [ ] Review and test error handling
- [ ] Set up monitoring and alerts

## Performance Optimization

- Enable Vercel Edge caching
- Use CDN for static assets
- Optimize images (use Next.js Image)
- Enable Supabase connection pooling
- Set up Redis for caching (optional)
- Monitor and optimize slow queries

## Compliance Checklist

- [ ] Privacy Policy published
- [ ] Terms of Service published
- [ ] Cookie consent implemented
- [ ] GDPR compliance reviewed
- [ ] Data retention policy set
- [ ] User data export functionality
- [ ] Account deletion functionality
- [ ] Legal disclaimers on all pages

---

**Need more help?** Contact us at support@incubazar.com
