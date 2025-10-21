# Incubazar API Documentation

This document provides comprehensive documentation for all API endpoints in the Incubazar platform.

## Base URLs

- **Development**: `http://localhost:3000/api`
- **Production**: `https://yourdomain.com/api`
- **AI Service**: `http://localhost:8000` (development) / `https://ai.yourdomain.com` (production)

## Authentication

All API requests (except public endpoints) require authentication using Supabase Auth.

### Headers

```
Authorization: Bearer <your_supabase_jwt_token>
Content-Type: application/json
```

### Getting Auth Token

```javascript
const { data: { session } } = await supabase.auth.getSession()
const token = session?.access_token
```

## API Endpoints

### Authentication

#### POST /api/auth/signup

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "role": "founder" | "investor",
  "fullName": "John Doe",
  "phone": "+919876543210"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "founder"
  }
}
```

---

### Profiles

#### GET /api/profile/founder

Get founder profile for authenticated user.

**Response:**
```json
{
  "profile": {
    "id": "uuid",
    "user_id": "uuid",
    "startup_name": "TechStartup",
    "incorporation_status": "incorporated",
    "industry_sector": "fintech",
    "stage": "mvp",
    "profile_completion_percentage": 85,
    "admin_approval_status": "approved"
  }
}
```

#### PUT /api/profile/founder

Update founder profile.

**Request Body:**
```json
{
  "startup_name": "TechStartup",
  "incorporation_status": "incorporated",
  "incorporation_number": "U12345AB2023PTC123456",
  "industry_sector": "fintech",
  "stage": "mvp",
  "pitch_deck_url": "https://...",
  "logo_url": "https://..."
}
```

#### GET /api/profile/investor

Get investor profile for authenticated user.

#### PUT /api/profile/investor

Update investor profile.

**Request Body:**
```json
{
  "investor_type": "individual" | "hni" | "experienced_professional",
  "linkedin_url": "https://linkedin.com/in/...",
  "kyc_document_url": "https://...",
  "investment_preferences": {
    "sectors": ["fintech", "healthtech"],
    "stages": ["mvp", "early_revenue"],
    "min_ticket": 50000,
    "max_ticket": 500000
  }
}
```

---

### Deals

#### GET /api/deals

Get list of deals with pagination and filters.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `sector` (string, optional)
- `stage` (string, optional)
- `instrument` (string, optional)

**Response:**
```json
{
  "deals": [
    {
      "id": "uuid",
      "deal_title": "Series A Funding",
      "fundraising_goal": 5000000,
      "min_investment": 100000,
      "max_investment": 500000,
      "instrument_type": "safe",
      "investor_count": 15,
      "investor_limit": 200,
      "is_active": true,
      "founder_profiles": {
        "startup_name": "TechStartup",
        "industry_sector": "fintech"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### POST /api/deals

Create a new deal (founders only).

**Request Body:**
```json
{
  "founder_profile_id": "uuid",
  "deal_title": "Series A Funding",
  "problem_statement": "...",
  "solution": "...",
  "market_size": "...",
  "business_model": "...",
  "traction_metrics": {
    "users": 10000,
    "revenue": 500000,
    "mrr": 50000
  },
  "fundraising_goal": 5000000,
  "min_investment": 100000,
  "max_investment": 500000,
  "instrument_type": "safe" | "ccd" | "equity"
}
```

#### GET /api/deals/[id]

Get deal details by ID.

#### PUT /api/deals/[id]

Update deal (founder only, own deals).

---

### Investor Interests

#### GET /api/investor-interests

Get investor interests.

**Query Parameters:**
- `investor_id` (uuid, optional)
- `deal_id` (uuid, optional)
- `status` (string, optional)

**Response:**
```json
{
  "interests": [
    {
      "id": "uuid",
      "investor_profile_id": "uuid",
      "startup_deal_id": "uuid",
      "interest_status": "interested" | "viewed" | "documents_requested" | "invested",
      "investment_amount": 200000,
      "notes": "Interested in the product",
      "startup_deals": {
        "deal_title": "Series A",
        "founder_profiles": {
          "startup_name": "TechStartup"
        }
      }
    }
  ]
}
```

#### POST /api/investor-interests

Express interest in a deal.

**Request Body:**
```json
{
  "investor_profile_id": "uuid",
  "startup_deal_id": "uuid",
  "interest_status": "interested",
  "investment_amount": 200000,
  "notes": "Would like to learn more"
}
```

#### PUT /api/investor-interests

Update interest status.

**Request Body:**
```json
{
  "id": "uuid",
  "interest_status": "invested",
  "investment_amount": 200000,
  "notes": "Investment completed"
}
```

---

### Documents

#### POST /api/documents/generate

Generate legal documents.

**Request Body:**
```json
{
  "document_type": "safe" | "pas4" | "ccd",
  "startup_deal_id": "uuid",
  "data": {
    // Document-specific data
    "companyName": "TechStartup",
    "founderName": "John Doe",
    "investorName": "Jane Smith",
    "investmentAmount": 500000,
    "valuationCap": 10000000,
    "discountRate": 20
  }
}
```

**Response:**
```json
{
  "document": {
    "id": "uuid",
    "document_type": "safe",
    "document_url": "https://...",
    "signature_status": "draft",
    "created_at": "2023-10-01T00:00:00Z"
  }
}
```

#### GET /api/documents

Get documents for a deal.

**Query Parameters:**
- `deal_id` (uuid, required)

---

### Payments

#### POST /api/payments/create-order

Create a payment order for subscription.

**Request Body:**
```json
{
  "plan_id": "founder_basic" | "founder_pro" | "investor_pro",
  "user_id": "uuid"
}
```

**Response:**
```json
{
  "order": {
    "id": "order_xyz",
    "amount": 5000,
    "currency": "INR",
    "receipt": "subscription_..."
  }
}
```

#### POST /api/payments/verify

Verify payment completion.

**Request Body:**
```json
{
  "razorpay_order_id": "order_xyz",
  "razorpay_payment_id": "pay_abc",
  "razorpay_signature": "signature_hash"
}
```

#### POST /api/payments/webhook

Razorpay webhook endpoint for payment events.

---

### AI Recommendations

#### POST /api/ai/recommendations

Get AI-powered deal recommendations for an investor.

**Request Body:**
```json
{
  "investor_id": "uuid",
  "limit": 10,
  "filters": {
    "sector": "fintech",
    "stage": "mvp",
    "min_investment": 100000,
    "max_investment": 500000
  }
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "startup_id": "uuid",
      "deal_id": "uuid",
      "startup_name": "TechStartup",
      "match_score": 0.95,
      "reasoning": "High match based on sector preference and investment range"
    }
  ],
  "total_matches": 15
}
```

---

## AI Service Endpoints

### POST /recommendations

Get personalized recommendations.

### POST /match

Match investor with startups.

### POST /analyze-deal

Analyze a deal and provide insights.

### POST /generate-scorecard

Generate platform scorecard for a deal.

### GET /health

Health check endpoint.

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Rate Limiting

API requests are rate-limited to:
- **Anonymous**: 10 requests per minute
- **Authenticated**: 100 requests per minute
- **Admin**: 1000 requests per minute

---

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Response Format:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

## Webhooks

### Razorpay Webhook Events

**Endpoint**: `/api/payments/webhook`

**Events:**
- `payment.captured`: Payment successful
- `payment.failed`: Payment failed

**Webhook Payload:**
```json
{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_xyz",
        "order_id": "order_abc",
        "amount": 500000,
        "status": "captured"
      }
    }
  }
}
```

---

## Code Examples

### JavaScript/TypeScript

```typescript
// Get deals
const response = await fetch('/api/deals?page=1&limit=10', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
const { deals, pagination } = await response.json()

// Create deal
const newDeal = await fetch('/api/deals', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    founder_profile_id: 'uuid',
    deal_title: 'Series A',
    // ... other fields
  })
})
```

### Python

```python
import requests

# Get recommendations
response = requests.post(
    'http://localhost:8000/recommendations',
    json={
        'investor_id': 'uuid',
        'limit': 10
    }
)
recommendations = response.json()
```

### cURL

```bash
# Get deals
curl -X GET "http://localhost:3000/api/deals?page=1&limit=10" \
  -H "Authorization: Bearer <token>"

# Create interest
curl -X POST "http://localhost:3000/api/investor-interests" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "investor_profile_id": "uuid",
    "startup_deal_id": "uuid",
    "interest_status": "interested",
    "investment_amount": 200000
  }'
```

---

## Testing

### Postman Collection

Import the Postman collection from `/postman/incubazar-api.json` for easy testing.

### Test Data

Use these test credentials:

**Founder:**
- Email: `founder@test.com`
- Password: `Test@123`

**Investor:**
- Email: `investor@test.com`
- Password: `Test@123`

**Admin:**
- Email: `admin@test.com`
- Password: `Admin@123`

---

## Support

For API support:
- Email: api-support@incubazar.com
- GitHub Issues: https://github.com/yourusername/incubazar/issues
- Documentation: https://docs.incubazar.com
