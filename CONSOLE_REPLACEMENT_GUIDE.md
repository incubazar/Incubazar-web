# 📋 CONSOLE STATEMENTS REPLACEMENT GUIDE

## 🎯 Objective
Replace all 50+ `console.log`, `console.error`, `console.warn` statements with the new structured logging service.

## 📊 Summary
- **Total Console Statements Found:** 50+
- **API Routes:** 30+ statements
- **Components:** 20+ statements
- **Estimated Time:** 3 hours
- **Priority:** HIGH (must complete before production launch)

---

## 🔧 REPLACEMENT PATTERNS

### Pattern 1: Simple console.log → logger.info
```typescript
// ❌ OLD
console.log('User registered', { userId, email })

// ✅ NEW
import { logger } from '@/lib/logger'
logger.info('User registered', { userId, email, component: 'AUTH', action: 'REGISTER' })
```

### Pattern 2: console.error → logger.error
```typescript
// ❌ OLD
console.error('Failed to create deal:', error)

// ✅ NEW
import { logger } from '@/lib/logger'
logger.error('Failed to create deal', error as Error, { component: 'DEALS', action: 'CREATE' })
```

### Pattern 3: console.warn → logger.warn
```typescript
// ❌ OLD
console.warn('Rate limit approaching')

// ✅ NEW
import { logger } from '@/lib/logger'
logger.warn('Rate limit approaching', { component: 'RATE_LIMITER' })
```

### Pattern 4: Debug/Verbose logging → logger.debug
```typescript
// ❌ OLD
console.log('Database query:', query)

// ✅ NEW
import { logger } from '@/lib/logger'
logger.debug('Database query', { query: query.substring(0, 200) }) // Only in development
```

### Pattern 5: API Route logging → logger.apiRequest/apiResponse
```typescript
// ❌ OLD
console.log('POST /api/deals - 201')

// ✅ NEW
import { logger } from '@/lib/logger'
logger.apiResponse('POST', '/api/deals', 201, duration)
```

---

## 📂 FILES TO UPDATE (Priority Order)

### 🔴 CRITICAL - API Routes (30+ statements)

#### 1. app/api/auth/signup/route.ts
**Line 97:** Console.error statement
```typescript
// Current location: Line 97
// ❌ OLD
console.error('Signup error:', error)

// ✅ NEW
logger.error('Signup failed', error as Error, {
  component: 'AUTH',
  action: 'SIGNUP',
  email: body.email // Don't log sensitive data like passwords
})
```

#### 2. app/api/profile/founder/route.ts
**Lines 25, 84:** Console.error statements
```typescript
// Line 25
// ❌ OLD
console.error('Failed to fetch founder profile:', error)

// ✅ NEW
logger.error('Failed to fetch founder profile', error as Error, {
  component: 'PROFILE',
  action: 'GET_FOUNDER',
  userId: session.user.id
})

// Line 84
// ❌ OLD
console.error('Failed to update founder profile:', error)

// ✅ NEW
logger.error('Failed to update founder profile', error as Error, {
  component: 'PROFILE',
  action: 'UPDATE_FOUNDER',
  userId: session.user.id
})
```

#### 3. app/api/deals/route.ts
**Lines 77, 153:** Console.error statements
```typescript
// Line 77
// ❌ OLD
console.error('Failed to fetch deals:', error)

// ✅ NEW
logger.error('Failed to fetch deals', error as Error, {
  component: 'DEALS',
  action: 'FETCH_ALL'
})

// Line 153
// ❌ OLD
console.error('Failed to create deal:', error)

// ✅ NEW
logger.error('Failed to create deal', error as Error, {
  component: 'DEALS',
  action: 'CREATE',
  founderId: session.user.id
})
```

#### 4. app/api/profile/investor/route.ts
**Estimated 5+ statements**
```typescript
// Search for: console.(log|error|warn)
// Replace pattern:
logger.error('Failed to [action]', error as Error, {
  component: 'PROFILE',
  action: 'INVESTOR_[ACTION]',
  userId: session.user.id
})
```

#### 5. app/api/investor-interests/route.ts
**Estimated 5+ statements**
```typescript
// Replace with:
logger.info('Interest expressed', {
  component: 'INVESTOR_INTERESTS',
  action: 'CREATE',
  investorId: session.user.id,
  dealId: body.dealId
})
```

#### 6. app/api/payments/create-order/route.ts
**Estimated 3+ statements**
```typescript
// Replace with:
logger.info('Payment order created', {
  component: 'PAYMENTS',
  action: 'CREATE_ORDER',
  orderId: order.id,
  amount: body.amount
})

logger.error('Payment order creation failed', error as Error, {
  component: 'PAYMENTS',
  action: 'CREATE_ORDER',
  amount: body.amount
})
```

#### 7. app/api/payments/verify/route.ts
**Estimated 3+ statements**
```typescript
// Replace with:
logger.info('Payment verified', {
  component: 'PAYMENTS',
  action: 'VERIFY',
  orderId: body.razorpay_order_id,
  paymentId: body.razorpay_payment_id
})

logger.error('Payment verification failed', error as Error, {
  component: 'PAYMENTS',
  action: 'VERIFY',
  orderId: body.razorpay_order_id
})
```

#### 8. app/api/payments/webhook/route.ts
**Estimated 5+ statements**
```typescript
// Replace with:
logger.info('Webhook received', {
  component: 'PAYMENTS',
  action: 'WEBHOOK',
  event: body.event,
  orderId: body.payload.payment.entity.order_id
})

logger.warn('Invalid webhook signature', {
  component: 'PAYMENTS',
  action: 'WEBHOOK_VERIFY',
  signature: signature.substring(0, 20) + '...'
})
```

#### 9. app/api/documents/generate/route.ts
**Estimated 3+ statements**
```typescript
// Replace with:
logger.info('Document generated', {
  component: 'DOCUMENTS',
  action: 'GENERATE',
  type: body.documentType,
  dealId: body.dealId
})

logger.error('Document generation failed', error as Error, {
  component: 'DOCUMENTS',
  action: 'GENERATE',
  type: body.documentType
})
```

#### 10. app/api/ai/recommendations/route.ts
**Estimated 3+ statements**
```typescript
// Replace with:
logger.info('AI recommendations requested', {
  component: 'AI',
  action: 'RECOMMENDATIONS',
  userId: session.user.id
})

logger.error('AI recommendations failed', error as Error, {
  component: 'AI',
  action: 'RECOMMENDATIONS'
})
```

---

### 🟡 IMPORTANT - Component Files (20+ statements)

#### 11. app/(admin)/review/page.tsx
**Multiple console statements**
```typescript
// Search for: console.(log|error|warn)
// Replace with:
import { logger } from '@/lib/logger'

// For user actions:
logger.userAction('Approved deal', session.user.id, {
  component: 'ADMIN_REVIEW',
  dealId: deal.id
})

// For errors:
logger.error('Failed to approve deal', error as Error, {
  component: 'ADMIN_REVIEW',
  dealId: deal.id
})
```

#### 12. app/(investor)/deals/page.tsx
**Multiple console statements**
```typescript
// Replace with:
logger.info('Deals page loaded', {
  component: 'INVESTOR_DEALS',
  userId: session.user.id
})

logger.error('Failed to load deals', error as Error, {
  component: 'INVESTOR_DEALS'
})
```

#### 13. app/(founder)/deals/create/page.tsx
**Multiple console statements**
```typescript
// Replace with:
logger.info('Deal creation initiated', {
  component: 'FOUNDER_DEALS',
  action: 'CREATE_INITIATED',
  userId: session.user.id
})

logger.error('Deal creation failed', error as Error, {
  component: 'FOUNDER_DEALS',
  action: 'CREATE_FAILED'
})
```

#### 14. app/(investor)/kyc/page.tsx
**Multiple console statements**
```typescript
// Replace with:
logger.info('KYC submission', {
  component: 'INVESTOR_KYC',
  action: 'SUBMIT',
  userId: session.user.id
})

logger.warn('KYC validation error', {
  component: 'INVESTOR_KYC',
  action: 'VALIDATE',
  errors: validationErrors
})
```

#### 15. components/compliance/*.tsx
**Multiple console statements**
```typescript
// Replace with:
logger.warn('Investor limit approaching', {
  component: 'COMPLIANCE',
  action: 'LIMIT_CHECK',
  currentCount: count,
  limit: 200
})

logger.error('Compliance check failed', error as Error, {
  component: 'COMPLIANCE',
  action: 'CHECK_FAILED'
})
```

---

## 🛠️ STEP-BY-STEP IMPLEMENTATION

### Step 1: Preparation (15 minutes)
1. Open VS Code with search panel (`Cmd+Shift+F` on Mac, `Ctrl+Shift+F` on Windows)
2. Search for regex: `console\.(log|error|warn|debug)`
3. Review all 50+ matches to understand patterns
4. Have `lib/logger.ts` open for reference

### Step 2: API Routes First (90 minutes)
**Priority: CRITICAL - These run in production and affect logs**

For each API route file:
1. Add import at top: `import { logger } from '@/lib/logger'`
2. Find each console statement
3. Replace using patterns above
4. Add meaningful context (userId, dealId, etc.)
5. Test API route manually or with curl

**Files to update (in order):**
- `app/api/auth/signup/route.ts`
- `app/api/profile/founder/route.ts`
- `app/api/profile/investor/route.ts`
- `app/api/deals/route.ts`
- `app/api/investor-interests/route.ts`
- `app/api/payments/create-order/route.ts`
- `app/api/payments/verify/route.ts`
- `app/api/payments/webhook/route.ts`
- `app/api/documents/generate/route.ts`
- `app/api/ai/recommendations/route.ts`

### Step 3: Component Files (60 minutes)
**Priority: IMPORTANT - These affect client-side debugging**

For each component file:
1. Add import: `import { logger } from '@/lib/logger'`
2. Replace console statements
3. Test component in browser
4. Check browser console (should be empty in production)

**Files to update:**
- `app/(admin)/review/page.tsx`
- `app/(admin)/page.tsx`
- `app/(investor)/deals/page.tsx`
- `app/(investor)/kyc/page.tsx`
- `app/(investor)/portfolio/page.tsx`
- `app/(founder)/deals/create/page.tsx`
- `app/(founder)/deals/page.tsx`
- `app/(founder)/profile/page.tsx`
- `components/compliance/ComplianceMonitor.tsx`
- `components/compliance/InvestorLimitCounter.tsx`

### Step 4: Verification (15 minutes)
1. Search again for `console.` - should find 0 results in app/ folder
2. Run type check: `npm run type-check`
3. Check for any import errors
4. Test one API route manually
5. Check one component page in browser

---

## ✅ VERIFICATION CHECKLIST

After completing replacements, verify:

- [ ] Search for `console\.` returns 0 results in `app/` folder
- [ ] All files have `import { logger } from '@/lib/logger'` at top
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] Test API route returns proper responses
- [ ] Test component page loads without errors
- [ ] Browser console is clean (no logs in production)
- [ ] Check network tab - no console-related errors

---

## 🚀 TESTING STRATEGY

### Local Development Testing
```bash
# 1. Start development server
npm run dev

# 2. Test API routes
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# 3. Check terminal output
# Should see: [INFO] User signup attempt { component: 'AUTH', action: 'SIGNUP', ... }
# Should NOT see: console.log output

# 4. Test in browser
# Open: http://localhost:3000/login
# Open DevTools Console
# Should be empty (no console.log statements)
```

### Production Simulation
```bash
# 1. Build for production
npm run build

# 2. Start production server
npm start

# 3. Test same scenarios
# Logs should go to your logging service, not console
```

---

## 📊 PROGRESS TRACKING

Use this checklist while working:

### API Routes (30+ statements)
- [ ] app/api/auth/signup/route.ts (1 statement) ⏱️ 5min
- [ ] app/api/profile/founder/route.ts (2 statements) ⏱️ 10min
- [ ] app/api/profile/investor/route.ts (5 statements) ⏱️ 15min
- [ ] app/api/deals/route.ts (2 statements) ⏱️ 10min
- [ ] app/api/investor-interests/route.ts (5 statements) ⏱️ 15min
- [ ] app/api/payments/create-order/route.ts (3 statements) ⏱️ 10min
- [ ] app/api/payments/verify/route.ts (3 statements) ⏱️ 10min
- [ ] app/api/payments/webhook/route.ts (5 statements) ⏱️ 15min
- [ ] app/api/documents/generate/route.ts (3 statements) ⏱️ 10min
- [ ] app/api/ai/recommendations/route.ts (3 statements) ⏱️ 10min

**Subtotal:** 90 minutes

### Components (20+ statements)
- [ ] app/(admin)/review/page.tsx (3 statements) ⏱️ 10min
- [ ] app/(admin)/page.tsx (2 statements) ⏱️ 5min
- [ ] app/(investor)/deals/page.tsx (3 statements) ⏱️ 10min
- [ ] app/(investor)/kyc/page.tsx (3 statements) ⏱️ 10min
- [ ] app/(investor)/portfolio/page.tsx (2 statements) ⏱️ 5min
- [ ] app/(founder)/deals/create/page.tsx (3 statements) ⏱️ 10min
- [ ] app/(founder)/deals/page.tsx (2 statements) ⏱️ 5min
- [ ] app/(founder)/profile/page.tsx (2 statements) ⏱️ 5min
- [ ] components/compliance/ComplianceMonitor.tsx (2 statements) ⏱️ 5min
- [ ] components/compliance/InvestorLimitCounter.tsx (2 statements) ⏱️ 5min

**Subtotal:** 70 minutes

### Verification & Testing
- [ ] Search verification ⏱️ 5min
- [ ] Type check ⏱️ 5min
- [ ] Manual API testing ⏱️ 10min
- [ ] Manual component testing ⏱️ 10min

**Subtotal:** 30 minutes

**TOTAL ESTIMATED TIME:** 190 minutes (≈3 hours)

---

## 🎯 SUCCESS CRITERIA

Replacement is complete when:

1. ✅ Zero `console.` statements in `app/` folder
2. ✅ All API routes use `logger.*` methods
3. ✅ All components use `logger.*` methods
4. ✅ No TypeScript errors
5. ✅ Production build succeeds
6. ✅ Logs appear in correct format (JSON in production)
7. ✅ Browser console is clean

---

## 💡 PRO TIPS

1. **Use Find & Replace with Regex:**
   - Find: `console\.error\('([^']+)',\s*(\w+)\)`
   - Replace: `logger.error('$1', $2 as Error, { component: 'TODO' })`
   - Manually update component names

2. **Add Context Consistently:**
   ```typescript
   // Good: Includes useful debugging info
   logger.error('Deal creation failed', error, {
     component: 'DEALS',
     action: 'CREATE',
     userId: session.user.id,
     dealData: { title, amount }
   })
   
   // Bad: No context
   logger.error('Error', error)
   ```

3. **Don't Log Sensitive Data:**
   - ❌ DON'T: passwords, API keys, tokens, credit card numbers
   - ✅ DO: user IDs, email addresses, transaction IDs

4. **Use Appropriate Log Levels:**
   - `logger.debug()` - Verbose development info
   - `logger.info()` - General information (user actions)
   - `logger.warn()` - Potential issues (validation failures)
   - `logger.error()` - Errors that don't crash app
   - `logger.fatal()` - Critical errors that may crash app

---

## 📞 NEED HELP?

If you encounter issues:

1. **TypeScript Errors:** Check import statement format
2. **Logger Not Working:** Verify `lib/logger.ts` exists
3. **Still Seeing Console Logs:** Clear browser cache and rebuild
4. **Context Not Showing:** Check logger implementation in `lib/logger.ts`

Refer to `QA_AUDIT_REPORT.md` Section 8 for additional guidance.

---

**Document Version:** 1.0
**Estimated Completion Time:** 3 hours
**Priority:** HIGH - Must complete before production launch
