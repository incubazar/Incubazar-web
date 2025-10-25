#!/bin/bash

# Logo Download Script for Incubazar Learning Platform
# This script downloads all Priority 1 logos from Wikimedia Commons

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🎨 Incubazar Logo Download Script${NC}"
echo -e "${YELLOW}Downloading Priority 1 logos (Apple, Nike, FedEx)...${NC}\n"

# Create base directory if it doesn't exist
mkdir -p public/brand/logos/{apple,nike,fedex,razorpay}

# ============================================================================
# APPLE LOGOS
# ============================================================================
echo -e "${YELLOW}📥 Downloading Apple logos...${NC}"

# Apple Black Logo
if [ ! -f "public/brand/logos/apple/logo-black.svg" ]; then
    echo "  → logo-black.svg"
    curl -L "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" \
         -o "public/brand/logos/apple/logo-black.svg" \
         --silent --show-error
    echo -e "${GREEN}  ✓ Downloaded${NC}"
else
    echo -e "${GREEN}  ✓ Already exists: logo-black.svg${NC}"
fi

# Apple Rainbow Logo
if [ ! -f "public/brand/logos/apple/logo-rainbow.svg" ]; then
    echo "  → logo-rainbow.svg"
    curl -L "https://upload.wikimedia.org/wikipedia/commons/8/84/Apple_Computer_Logo_rainbow.svg" \
         -o "public/brand/logos/apple/logo-rainbow.svg" \
         --silent --show-error
    echo -e "${GREEN}  ✓ Downloaded${NC}"
else
    echo -e "${GREEN}  ✓ Already exists: logo-rainbow.svg${NC}"
fi

# ============================================================================
# NIKE LOGOS
# ============================================================================
echo -e "\n${YELLOW}📥 Downloading Nike logos...${NC}"

# Nike Swoosh
if [ ! -f "public/brand/logos/nike/swoosh-black.svg" ]; then
    echo "  → swoosh-black.svg"
    curl -L "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" \
         -o "public/brand/logos/nike/swoosh-black.svg" \
         --silent --show-error
    echo -e "${GREEN}  ✓ Downloaded${NC}"
else
    echo -e "${GREEN}  ✓ Already exists: swoosh-black.svg${NC}"
fi

# Nike Jumpman
if [ ! -f "public/brand/logos/nike/jumpman-black.svg" ]; then
    echo "  → jumpman-black.svg"
    curl -L "https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg" \
         -o "public/brand/logos/nike/jumpman-black.svg" \
         --silent --show-error
    echo -e "${GREEN}  ✓ Downloaded${NC}"
else
    echo -e "${GREEN}  ✓ Already exists: jumpman-black.svg${NC}"
fi

# ============================================================================
# FEDEX LOGOS
# ============================================================================
echo -e "\n${YELLOW}📥 Downloading FedEx logos...${NC}"

# FedEx Express
if [ ! -f "public/brand/logos/fedex/fedex-express.svg" ]; then
    echo "  → fedex-express.svg"
    curl -L "https://upload.wikimedia.org/wikipedia/commons/9/9d/FedEx_Express.svg" \
         -o "public/brand/logos/fedex/fedex-express.svg" \
         --silent --show-error
    echo -e "${GREEN}  ✓ Downloaded${NC}"
else
    echo -e "${GREEN}  ✓ Already exists: fedex-express.svg${NC}"
fi

# FedEx Ground
if [ ! -f "public/brand/logos/fedex/fedex-ground.svg" ]; then
    echo "  → fedex-ground.svg"
    curl -L "https://upload.wikimedia.org/wikipedia/commons/a/a6/FedEx_Ground_logo.svg" \
         -o "public/brand/logos/fedex/fedex-ground.svg" \
         --silent --show-error
    echo -e "${GREEN}  ✓ Downloaded${NC}"
else
    echo -e "${GREEN}  ✓ Already exists: fedex-ground.svg${NC}"
fi

# ============================================================================
# SUMMARY
# ============================================================================
echo -e "\n${GREEN}✅ Download Complete!${NC}"
echo -e "\nDownloaded logos to:"
echo -e "  • ${YELLOW}public/brand/logos/apple/${NC} (2 files)"
echo -e "  • ${YELLOW}public/brand/logos/nike/${NC} (2 files)"
echo -e "  • ${YELLOW}public/brand/logos/fedex/${NC} (2 files)"

echo -e "\n${YELLOW}⚠️  Manual Steps Remaining:${NC}"
echo -e "  1. Create white versions (invert black logos)"
echo -e "     • apple/logo-white.svg"
echo -e "     • nike/swoosh-white.svg"
echo -e "\n  2. Download Razorpay logo manually:"
echo -e "     • Visit: https://razorpay.com"
echo -e "     • Open DevTools (F12) → Network tab"
echo -e "     • Search for 'logo.svg'"
echo -e "     • Save to: public/brand/logos/razorpay/logo-full-blue.svg"

echo -e "\n${GREEN}Next: Run update script to change code URLs${NC}"
echo -e "  ${YELLOW}bash scripts/update-logo-paths.sh${NC}"
