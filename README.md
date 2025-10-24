# Incubazar - Matching Platform for Founders & Investors

**We connect visionaries — and help them turn ideas into investments.**

An intelligent matching platform connecting early-stage startup founders with angel investors in India. We facilitate compliant private placements under Section 42 of the Companies Act 2013, providing the technology infrastructure for founders and investors to discover and connect with each other.

## 🎯 What We Are

**A Matching Platform** - We use AI-powered algorithms to connect founders with compatible investors based on:
- Sector alignment and expertise
- Investment stage preferences  
- Ticket size compatibility
- Geographic preferences
- Investment thesis matching

**What We're NOT:**
- ❌ Not an incubator or accelerator
- ❌ Not a venture capital firm
- ❌ Not an investment advisor
- ❌ We don't pool funds or manage investments
- ❌ We don't provide direct mentorship programs

**What We DO:**
- ✅ Facilitate connections between verified founders and investors
- ✅ Provide technology infrastructure for deal flow
- ✅ Enable compliant private placements (Section 42)
- ✅ Automate legal documentation and compliance
- ✅ Offer transparent deal tracking and analytics

## 🚀 Features

### For Founders
- **Smart Matching**: Get matched with investors who align with your sector, stage, and funding needs
- **Profile Showcase**: Create compelling startup profiles visible to compatible investors
- **Deal Facilitation**: List funding opportunities and manage investor connections
- **Document Automation**: Auto-generate term sheets, PAS-4 forms, and compliance documents
- **Network Access**: Connect with 200+ verified angel investors

### For Investors
- **Intelligent Recommendations**: AI-powered deal flow matched to your investment preferences
- **Founder Discovery**: Browse and filter curated startups by sector, stage, and metrics
- **Portfolio Tracking**: Monitor your connections and investment pipeline
- **Due Diligence Tools**: Access standardized reports and platform scorecards
- **Compliance Support**: Section 42 compliant deal structures built-in

### For Admins
- **Quality Curation**: Review and approve profiles to maintain network quality
- **Matching Oversight**: Monitor and optimize matching algorithms
- **Analytics Dashboard**: Track platform connections, deal flow, and success metrics
- **Compliance Monitoring**: Ensure all activities meet regulatory requirements

## 🛠 Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **AI/ML**: Python FastAPI microservice with scikit-learn
- **Document Generation**: PDF-lib, React-PDF, DocuSign API
- **Payments**: Razorpay integration
- **Deployment**: Vercel (Frontend) + Railway (AI Service)

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Supabase account
- DocuSign developer account
- Razorpay account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/incubazar.git
cd incubazar
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install AI service dependencies
cd ai-service
pip install -r requirements.txt
cd ..
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# DocuSign Configuration
DOCUSIGN_CLIENT_ID=your_docusign_client_id
DOCUSIGN_CLIENT_SECRET=your_docusign_client_secret
DOCUSIGN_ACCOUNT_ID=your_docusign_account_id
DOCUSIGN_BASE_URL=https://demo.docusign.net/restapi

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret

# AI Service Configuration
AI_SERVICE_URL=http://localhost:8000
AI_SERVICE_API_KEY=your_ai_service_api_key

# App Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
NODE_ENV=development
```

### 4. Database Setup

1. Create a new Supabase project
2. Run the database migrations:

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase
supabase init

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 5. Start Development Servers

```bash
# Start the frontend (Terminal 1)
npm run dev

# Start the AI service (Terminal 2)
cd ai-service
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Visit `http://localhost:3000` to see the application.

## 🏗 Project Structure

```
incubazar/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (founder)/                # Founder dashboard
│   ├── (investor)/               # Investor dashboard
│   ├── (admin)/                  # Admin panel
│   └── api/                      # API routes
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── founder/                  # Founder-specific components
│   ├── investor/                 # Investor-specific components
│   └── shared/                   # Shared components
├── lib/                          # Utilities and configurations
│   ├── supabase/                 # Supabase client and types
│   ├── utils/                    # Helper functions
│   └── constants/                # App constants
├── supabase/                     # Database migrations
│   └── migrations/               # SQL migration files
├── ai-service/                   # Python AI microservice
│   ├── app/
│   │   ├── models/               # ML models
│   │   ├── services/             # Recommendation engine
│   │   └── main.py               # FastAPI application
│   └── requirements.txt
└── docs/                         # Documentation
```

## 🔒 Compliance & Security

### Regulatory Compliance
- **Section 42 Compliance**: Automatic enforcement of 200-investor limit per deal
- **Private Placement**: All deal information behind secure authentication
- **No Public Advertising**: No publicly accessible deal pages
- **Registered Users Only**: Verified users only can access deals

### Security Features
- **Row Level Security (RLS)**: Database-level access control
- **Authentication**: Supabase Auth with email verification
- **Data Encryption**: All sensitive data encrypted at rest and in transit
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: API rate limiting for security

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### AI Service (Railway)

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy the `ai-service` directory

### Database (Supabase)

1. Create a production Supabase project
2. Run migrations in production
3. Configure RLS policies
4. Set up backup and monitoring

## 📊 Monitoring & Analytics

- **Application Monitoring**: Built-in error tracking and performance monitoring
- **Database Monitoring**: Supabase dashboard for database metrics
- **User Analytics**: Track user engagement and conversion metrics
- **Compliance Monitoring**: Automated compliance checks and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@incubazar.com or join our Slack channel.

## 🔮 Roadmap

### Phase 2: Mentorship Module
- Connect founders with experienced mentors
- Structured mentorship programs
- Progress tracking and feedback

### Phase 3: AIF Registration
- Transition to SEBI Category I AIF (Angel Fund)
- Fund pooling capabilities
- Syndicated investment management

### Phase 4: Secondary Market
- Liquidity solutions for investors
- Secondary market transactions
- Portfolio management tools

---

**Built with ❤️ for India's startup ecosystem**
