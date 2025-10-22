# Email Setup Guide for Production

## Current Status
✅ Emails are **working** but only logging to console (development mode)
✅ Code is ready - just needs email service integration

## For Testing (Right Now)

**Where to see OTP:**
- Check your **terminal** where `npm run dev` is running
- After admin approval, you'll see:
  ```
  ============================================================
  📧 OTP EMAIL
  ============================================================
  To: user@example.com
  Name: John Doe
  User Type: founder
  OTP: 123456
  ============================================================
  ```
- Copy the OTP and use it during registration

## Email Service Options for Production

### Option 1: Resend (⭐ RECOMMENDED)

**Why?**
- ✅ Easiest to set up
- ✅ Free: 100 emails/day, 3,000/month
- ✅ Built for developers
- ✅ Great deliverability
- ✅ Beautiful email templates

**Setup (5 minutes):**

1. **Install:**
   ```bash
   npm install resend
   ```

2. **Get API Key:**
   - Go to https://resend.com
   - Sign up (free)
   - Get API key
   - Verify your domain (or use onboarding.resend.dev for testing)

3. **Add to environment:**
   ```env
   # .env.local
   RESEND_API_KEY=re_xxxxxxxxxxxx
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ADMIN_EMAIL=your-admin@email.com
   ```

4. **Replace sendOTP.ts:**
   - Copy contents from: `lib/email/sendOTP-RESEND-EXAMPLE.ts`
   - To: `lib/email/sendOTP.ts`

5. **Test:**
   - Approve a waitlist entry
   - Check the user's email inbox!

**Cost:**
- Free: 3,000 emails/month
- Paid: $20/month for 50,000 emails

---

### Option 2: SendGrid

**Why?**
- ✅ Reliable & trusted
- ✅ Free: 100 emails/day
- ✅ Good analytics

**Setup:**

1. **Install:**
   ```bash
   npm install @sendgrid/mail
   ```

2. **Get API Key:**
   - https://sendgrid.com
   - Create account
   - API Keys → Create API Key

3. **Environment:**
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   ```

4. **Update `lib/email/sendOTP.ts`:**
   ```typescript
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   export async function sendOTPEmail({ to, otp, name }: SendOTPEmailParams) {
     const msg = {
       to,
       from: 'noreply@incubazar.com', // verified sender
       subject: 'Your Incubazar Verification Code',
       html: `
         <h2>Welcome to Incubazar!</h2>
         <p>Hello ${name},</p>
         <p>Your verification code is:</p>
         <div style="font-size: 32px; font-weight: bold; padding: 20px; background: #f4f4f4; text-align: center;">
           ${otp}
         </div>
         <p>This code expires in 30 minutes.</p>
       `
     };
     
     await sgMail.send(msg);
     return true;
   }
   ```

**Cost:**
- Free: 100 emails/day
- Essentials: $19.95/month for 50,000 emails

---

### Option 3: AWS SES (Cheapest for Scale)

**Why?**
- ✅ Super cheap ($0.10 per 1,000 emails)
- ✅ Highly scalable
- ❌ More complex setup

**Setup:**

1. **Install:**
   ```bash
   npm install @aws-sdk/client-ses
   ```

2. **Configure AWS:**
   - Create AWS account
   - Verify your domain in SES
   - Get access keys

3. **Environment:**
   ```env
   AWS_SES_REGION=us-east-1
   AWS_ACCESS_KEY_ID=AKIAxxxxxx
   AWS_SECRET_ACCESS_KEY=xxxxxx
   ```

4. **Update code:**
   ```typescript
   import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
   
   const ses = new SESClient({ region: process.env.AWS_SES_REGION });
   
   export async function sendOTPEmail({ to, otp, name }: SendOTPEmailParams) {
     const command = new SendEmailCommand({
       Source: 'noreply@incubazar.com',
       Destination: { ToAddresses: [to] },
       Message: {
         Subject: { Data: 'Your Incubazar Verification Code' },
         Body: {
           Html: {
             Data: `<h2>Your OTP: ${otp}</h2>`
           }
         }
       }
     });
     
     await ses.send(command);
     return true;
   }
   ```

**Cost:**
- $0.10 per 1,000 emails
- Free tier: 62,000 emails/month (first 12 months)

---

### Option 4: Mailgun

**Setup:**
```bash
npm install mailgun.js
```

**Code:**
```typescript
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY!
});

export async function sendOTPEmail({ to, otp, name }: SendOTPEmailParams) {
  await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: 'Incubazar <noreply@incubazar.com>',
    to: [to],
    subject: 'Your Verification Code',
    html: `<h2>Your OTP: ${otp}</h2>`
  });
  return true;
}
```

**Cost:**
- Free: 5,000 emails/month (first 3 months)
- Flex: $35/month for 50,000 emails

---

## Quick Comparison

| Provider | Free Tier | Setup Difficulty | Best For |
|----------|-----------|------------------|----------|
| **Resend** | 3,000/month | ⭐ Easy | Developers, Startups |
| SendGrid | 100/day | Medium | Established apps |
| AWS SES | 62k/month* | Hard | High volume |
| Mailgun | 5k/month† | Medium | Medium volume |

*First 12 months
†First 3 months

## My Recommendation for You

**Start with Resend:**
1. Takes 5 minutes to set up
2. Beautiful email templates
3. Great free tier (3,000/month is plenty for MVP)
4. Easy to upgrade later

**Later (at scale):**
- Move to AWS SES when you hit 10,000+ emails/month

---

## Testing Email Locally

### Use Resend's Test Mode:
```env
RESEND_API_KEY=re_test_xxxxx  # Test key
```
Emails won't actually send, but you'll see them in Resend dashboard.

### Or use MailHog (local SMTP):
```bash
# Run MailHog
docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog

# View emails at http://localhost:8025
```

---

## Current Code Location

**Files that send emails:**
- `app/api/admin/waitlist/route.ts` (line 136) - Sends OTP on approval
- `app/api/waitlist/route.ts` (line 102) - Admin notification
- `lib/email/sendOTP.ts` - Email utility functions

**What happens now:**
1. Admin approves waitlist entry
2. Database trigger generates OTP
3. API calls `sendOTPEmail()`
4. Console logs the OTP (development)
5. In production → sends real email

---

## Next Steps

1. **Choose email provider** (I recommend Resend)
2. **Sign up & get API key**
3. **Add to `.env.local`**
4. **Update `lib/email/sendOTP.ts`** with real implementation
5. **Test with real email address**
6. **Verify emails arrive in inbox**

Need help with setup? Check `lib/email/sendOTP-RESEND-EXAMPLE.ts` for complete working code!

