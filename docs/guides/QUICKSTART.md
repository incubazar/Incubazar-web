# 🚀 Incubazar Quick Start Guide

Get Incubazar up and running in less than 15 minutes!

## Prerequisites

- Node.js 18+ installed
- Python 3.11+ installed
- Supabase account (free tier works)

## Step 1: Clone and Install (3 minutes)

```bash
# Clone the repository
git clone https://github.com/yourusername/incubazar.git
cd incubazar

# Install frontend dependencies
npm install

# Install AI service dependencies
cd ai-service
pip install -r requirements.txt
cd ..
```

## Step 2: Set Up Supabase (5 minutes)

1. **Create a new project** at [Supabase Dashboard](https://app.supabase.com/)

2. **Get your credentials:**
   - Go to Project Settings → API
   - Copy Project URL and API keys

3. **Run database migrations:**

```bash
# Install Supabase CLI
npm install -g supabase

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
supabase db push
```

4. **Create storage buckets:**
   - In Supabase Dashboard → Storage
   - Create buckets: `documents`, `logos`, `generated-docs`

## Step 3: Configure Environment (2 minutes)

```bash
# Copy environment template
cp env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000

# For MVP, you can skip Razorpay and DocuSign initially
```

## Step 4: Run the Application (2 minutes)

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - AI Service:**
```bash
cd ai-service
uvicorn app.main:app --reload
```

## Step 5: Access the Application (1 minute)

🎉 **You're all set!**

- **Frontend:** http://localhost:3000
- **AI Service:** http://localhost:8000/docs

## First-Time Setup

### Create Test Accounts

1. **Create a Founder Account:**
   - Go to http://localhost:3000/register
   - Select "Founder" role
   - Complete registration

2. **Create an Investor Account:**
   - Use a different email
   - Select "Investor" role
   - Complete registration

3. **Create Admin User (via SQL):**

In Supabase SQL Editor, run:

```sql
-- First, sign up normally at /register, then run this:
UPDATE public.users 
SET role = 'admin', verification_status = 'verified'
WHERE email = 'your-admin-email@example.com';
```

## Quick Feature Tour

### As a Founder:

1. **Complete Profile:**
   - Navigate to `/founder/profile`
   - Fill in startup details
   - Upload pitch deck (optional for testing)

2. **Create a Deal:**
   - Go to `/founder/deals/create`
   - Fill in deal details
   - Set fundraising goals

3. **Wait for Admin Approval:**
   - Your deal will be "pending" initially
   - Login as admin to approve

### As an Investor:

1. **Complete KYC:**
   - Go to `/investor/kyc`
   - Fill in details
   - Upload document (for testing, any PDF works)

2. **Browse Deals:**
   - Navigate to `/investor/deals`
   - View approved startups

3. **Express Interest:**
   - Click on a deal
   - Click "Express Interest"
   - Specify investment amount

### As Admin:

1. **Review Startups:**
   - Go to `/admin/review`
   - Approve or reject pending startups

2. **View Dashboard:**
   - Navigate to `/admin`
   - Monitor platform statistics

## Testing Payments (Optional)

To test Razorpay integration:

1. **Get Test Credentials:**
   - Sign up at [Razorpay](https://dashboard.razorpay.com/)
   - Go to Settings → API Keys
   - Generate test keys

2. **Add to Environment:**
```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

3. **Test Payment Flow:**
   - Use Razorpay test cards
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

## Using Docker (Alternative)

If you prefer Docker:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## Troubleshooting

### Database Connection Issues

```bash
# Check Supabase status
supabase status

# Restart if needed
supabase stop
supabase start
```

### Port Already in Use

```bash
# Frontend (3000)
lsof -ti:3000 | xargs kill

# AI Service (8000)
lsof -ti:8000 | xargs kill
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Python Issues

```bash
# Recreate virtual environment
cd ai-service
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Next Steps

- [ ] Read the full [README.md](./README.md) for detailed features
- [ ] Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- [ ] Review [API.md](./API.md) for API documentation
- [ ] Customize branding and content
- [ ] Add your domain
- [ ] Configure email templates
- [ ] Set up monitoring

## Need Help?

- 📖 [Full Documentation](./README.md)
- 🐛 [Report Issues](https://github.com/yourusername/incubazar/issues)
- 💬 [Join Discord](https://discord.gg/incubazar)
- 📧 Email: support@incubazar.com

---

**Happy Building! 🎉**
