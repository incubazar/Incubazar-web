# PostgREST Relationship Ambiguity Fix

## Problem
You were getting this error:
```
PGRST201: Could not embed because more than one relationship was found for 'founder_profiles' and 'users'
```

## Root Cause
In migration `006_admin_approval_system.sql`, we added multiple foreign key relationships from `founder_profiles` and `investor_profiles` to the `users` table:

### founder_profiles → users (3 relationships)
1. `user_id` → the founder's user account (original)
2. `approved_by` → the admin who approved (new)
3. `rejected_by` → the admin who rejected (new)

### investor_profiles → users (3 relationships)
1. `user_id` → the investor's user account (original)
2. `verified_by` → the admin who verified (new)
3. `rejected_by` → the admin who rejected (new)

When using:
```javascript
.select(`
  *,
  users (...)  // ❌ Ambiguous!
`)
```

PostgREST doesn't know which foreign key to use for the join.

## Solution
Use the explicit foreign key syntax with `!<column_name>`:

```javascript
.select(`
  *,
  users!user_id (...)  // ✅ Explicit!
`)
```

## Files Fixed (6 total)

### Admin Pages
1. ✅ `app/admin/startups/page.tsx` - line 115
2. ✅ `app/admin/review/page.tsx` - line 101
3. ✅ `app/admin/investors/page.tsx` - line 103
4. ✅ `app/admin/users/page.tsx` - line 84

### Founder Pages
5. ✅ `app/founder/investors/page.tsx` - line 104

### API Routes
6. ✅ `app/api/documents/generate/route.ts` - lines 32 and 52

## Before & After

### ❌ Before (Ambiguous)
```javascript
const { data } = await supabase
  .from('founder_profiles')
  .select(`
    *,
    users (
      full_name,
      email
    )
  `)
```

### ✅ After (Explicit)
```javascript
const { data } = await supabase
  .from('founder_profiles')
  .select(`
    *,
    users!user_id (
      full_name,
      email
    )
  `)
```

## Future Reference
Whenever you query `founder_profiles` or `investor_profiles` and need to embed user data, **always use**:
- `users!user_id (...)` - to get the founder/investor's user info
- `users!approved_by (...)` - to get the approver's info (if needed)
- `users!rejected_by (...)` - to get the rejecter's info (if needed)
- `users!verified_by (...)` - to get the verifier's info (for investors)

## Testing
After this fix, the admin dashboard should load startups and investors without any PGRST201 errors.

Try refreshing your admin pages:
- `/admin/startups`
- `/admin/review`
- `/admin/investors`
- `/admin/users`

All should now work correctly! ✨

