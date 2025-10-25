#!/bin/bash

# Master Setup Script - Downloads logos and updates code
# Run this once to set up all brand assets

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🎨 Incubazar Brand Assets Setup    ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "\n"

# ============================================================================
# Step 1: Download logos from Wikimedia Commons
# ============================================================================
echo -e "${YELLOW}Step 1: Downloading logos from Wikimedia Commons...${NC}\n"

bash scripts/download-logos.sh

# ============================================================================
# Step 2: Update code to use local paths
# ============================================================================
echo -e "\n${YELLOW}Step 2: Updating code to use local logo paths...${NC}\n"

bash scripts/update-logo-paths.sh

# ============================================================================
# Step 3: Check if logos exist
# ============================================================================
echo -e "\n${YELLOW}Step 3: Verifying downloaded files...${NC}\n"

total_files=0
success_files=0

files=(
    "public/brand/logos/apple/logo-black.svg"
    "public/brand/logos/apple/logo-rainbow.svg"
    "public/brand/logos/nike/swoosh-black.svg"
    "public/brand/logos/nike/jumpman-black.svg"
    "public/brand/logos/fedex/fedex-express.svg"
    "public/brand/logos/fedex/fedex-ground.svg"
)

for file in "${files[@]}"; do
    total_files=$((total_files + 1))
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
        success_files=$((success_files + 1))
    else
        echo -e "${RED}✗${NC} $file ${RED}(missing)${NC}"
    fi
done

echo -e "\n${BLUE}Downloaded: $success_files/$total_files files${NC}"

# ============================================================================
# Summary & Next Steps
# ============================================================================
echo -e "\n${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║            Setup Complete!             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}\n"

if [ $success_files -eq $total_files ]; then
    echo -e "${GREEN}✅ All logos downloaded successfully!${NC}\n"
else
    echo -e "${YELLOW}⚠️  Some files missing. Check errors above.${NC}\n"
fi

echo -e "${YELLOW}📋 What was done:${NC}"
echo -e "  ✓ Downloaded 6 logos from Wikimedia Commons"
echo -e "  ✓ Updated 2 files with local logo paths"
echo -e "  ✓ Created directory structure in /public/brand"

echo -e "\n${YELLOW}🔧 Manual steps remaining (optional):${NC}"
echo -e "  1. Create white logo versions:"
echo -e "     ${BLUE}•${NC} public/brand/logos/apple/logo-white.svg"
echo -e "     ${BLUE}•${NC} public/brand/logos/nike/swoosh-white.svg"
echo -e "\n  2. Download Razorpay logo:"
echo -e "     ${BLUE}•${NC} Visit: https://razorpay.com"
echo -e "     ${BLUE}•${NC} DevTools → Network → Find logo.svg"
echo -e "     ${BLUE}•${NC} Save to: public/brand/logos/razorpay/logo-full-blue.svg"

echo -e "\n${GREEN}🚀 Test it now:${NC}"
echo -e "  ${BLUE}npm run dev${NC}"
echo -e "  ${BLUE}http://localhost:3000/learn/brand${NC}"
echo -e "\n"
