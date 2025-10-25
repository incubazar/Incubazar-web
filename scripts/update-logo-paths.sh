#!/bin/bash

# Update Logo Paths Script
# Automatically updates code to use local logo paths instead of CDN URLs

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🔧 Updating logo paths in code...${NC}\n"

# ============================================================================
# Update Brand Module (app/learn/brand/page.tsx)
# ============================================================================
echo -e "${YELLOW}1. Updating /app/learn/brand/page.tsx${NC}"

# Apple logos
sed -i '' 's|https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg|/brand/logos/apple/logo-black.svg|g' \
    app/learn/brand/page.tsx

sed -i '' 's|https://upload.wikimedia.org/wikipedia/commons/8/84/Apple_Computer_Logo_rainbow.svg|/brand/logos/apple/logo-rainbow.svg|g' \
    app/learn/brand/page.tsx

# Nike logos
sed -i '' 's|https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg|/brand/logos/nike/swoosh-black.svg|g' \
    app/learn/brand/page.tsx

sed -i '' 's|https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg|/brand/logos/nike/jumpman-black.svg|g' \
    app/learn/brand/page.tsx

# FedEx logos
sed -i '' 's|https://upload.wikimedia.org/wikipedia/commons/9/9d/FedEx_Express.svg|/brand/logos/fedex/fedex-express.svg|g' \
    app/learn/brand/page.tsx

sed -i '' 's|https://upload.wikimedia.org/wikipedia/commons/a/a6/FedEx_Ground_logo.svg|/brand/logos/fedex/fedex-ground.svg|g' \
    app/learn/brand/page.tsx

echo -e "${GREEN}  ✓ Updated 6 logo paths${NC}"

# ============================================================================
# Update Razorpay Case Study (app/learn/case-studies/razorpay/page.tsx)
# ============================================================================
echo -e "\n${YELLOW}2. Updating /app/learn/case-studies/razorpay/page.tsx${NC}"

sed -i '' 's|https://razorpay.com/build/_next/static/media/logo.55c7e7f7.svg|/brand/logos/razorpay/logo-full-blue.svg|g' \
    app/learn/case-studies/razorpay/page.tsx

echo -e "${GREEN}  ✓ Updated 1 logo path${NC}"

# ============================================================================
# Summary
# ============================================================================
echo -e "\n${GREEN}✅ All paths updated!${NC}"
echo -e "\nUpdated files:"
echo -e "  • ${YELLOW}app/learn/brand/page.tsx${NC} (6 logos)"
echo -e "  • ${YELLOW}app/learn/case-studies/razorpay/page.tsx${NC} (1 logo)"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "  1. Test: ${GREEN}npm run dev${NC}"
echo -e "  2. Visit: ${GREEN}http://localhost:3000/learn/brand${NC}"
echo -e "  3. Verify logos display with layered shadow effect"
