#!/bin/bash

# Logo Download Script for Incubazar Learning Platform
# This script downloads ALL logos from Wikimedia Commons and other sources

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🎨 Incubazar Comprehensive Logo Download Script${NC}"
echo -e "${YELLOW}Downloading all brand logos for learning platform...${NC}\n"

# Create all directories if they don't exist
mkdir -p public/brand/logos/{apple,nike,fedex,razorpay,zomato,flipkart,airbnb}

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
# ZOMATO LOGOS
# ============================================================================
echo -e "\n${YELLOW}📥 Downloading Zomato logos...${NC}"

# Zomato Red Logo
if [ ! -f "public/brand/logos/zomato/logo-red.svg" ]; then
    echo "  → logo-red.svg"
    curl -L "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png" \
         -o "public/brand/logos/zomato/logo-red.png" \
         --silent --show-error
    echo -e "${GREEN}  ✓ Downloaded (PNG)${NC}"
    echo -e "${YELLOW}  ⚠  Manual: Convert to SVG if needed${NC}"
else
    echo -e "${GREEN}  ✓ Already exists: logo-red.svg/png${NC}"
fi

# ============================================================================
# FLIPKART LOGOS
# ============================================================================
echo -e "\n${YELLOW}📥 Downloading Flipkart logos...${NC}"

# Flipkart Current Logo
if [ ! -f "public/brand/logos/flipkart/logo-full.svg" ]; then
    echo "  → logo-full.svg"
    curl -L "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Flipkart_logo.svg/500px-Flipkart_logo.svg.png" \
         -o "public/brand/logos/flipkart/logo-full.png" \
         --silent --show-error
    echo -e "${GREEN}  ✓ Downloaded (PNG)${NC}"
    echo -e "${YELLOW}  ⚠  Manual: Get SVG from Flipkart brand assets${NC}"
else
    echo -e "${GREEN}  ✓ Already exists: logo-full${NC}"
fi

# ============================================================================
# AIRBNB LOGOS
# ============================================================================
echo -e "\n${YELLOW}📥 Downloading Airbnb logos...${NC}"

# Airbnb Bélo Logo
if [ ! -f "public/brand/logos/airbnb/logo-belo.svg" ]; then
    echo "  → logo-belo.svg"
    curl -L "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" \
         -o "public/brand/logos/airbnb/logo-belo.svg" \
         --silent --show-error
    echo -e "${GREEN}  ✓ Downloaded${NC}"
else
    echo -e "${GREEN}  ✓ Already exists: logo-belo.svg${NC}"
fi

# Airbnb Full Logo
if [ ! -f "public/brand/logos/airbnb/logo-full.svg" ]; then
    echo "  → logo-full.svg"
    curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/500px-Airbnb_Logo_B%C3%A9lo.svg.png" \
         -o "public/brand/logos/airbnb/logo-with-text.png" \
         --silent --show-error
    echo -e "${GREEN}  ✓ Downloaded (PNG version)${NC}"
    echo -e "${YELLOW}  ⚠  Manual: Get full logo with text from Airbnb Press Kit${NC}"
else
    echo -e "${GREEN}  ✓ Already exists: logo-full${NC}"
fi

# ============================================================================
# RAZORPAY LOGOS
# ============================================================================
echo -e "\n${YELLOW}📥 Downloading Razorpay logos...${NC}"

# Razorpay logo needs manual download
echo -e "${YELLOW}  ⚠  Razorpay logos require manual download:${NC}"
echo -e "     1. Visit: ${BLUE}https://razorpay.com${NC}"
echo -e "     2. Open DevTools (Cmd+Opt+I)"
echo -e "     3. Network tab → Filter 'logo'"
echo -e "     4. Save SVG to: ${BLUE}public/brand/logos/razorpay/${NC}"
echo -e ""
echo -e "     Alternative: Visit ${BLUE}https://razorpay.com/newsroom/${NC}"
echo -e "     and download brand assets"

# ============================================================================
# CREATE WHITE VERSIONS (using ImageMagick if available)
# ============================================================================
echo -e "\n${YELLOW}📥 Creating white logo versions...${NC}"

if command -v convert &> /dev/null; then
    echo -e "${GREEN}  ImageMagick found! Creating inverted versions...${NC}"
    
    # Apple white
    if [ -f "public/brand/logos/apple/logo-black.svg" ] && [ ! -f "public/brand/logos/apple/logo-white.svg" ]; then
        echo "  → apple/logo-white.svg"
        convert public/brand/logos/apple/logo-black.svg -negate public/brand/logos/apple/logo-white.svg 2>/dev/null || \
        echo -e "${YELLOW}    ⚠  Manual creation needed${NC}"
    fi
    
    # Nike white
    if [ -f "public/brand/logos/nike/swoosh-black.svg" ] && [ ! -f "public/brand/logos/nike/swoosh-white.svg" ]; then
        echo "  → nike/swoosh-white.svg"
        convert public/brand/logos/nike/swoosh-black.svg -negate public/brand/logos/nike/swoosh-white.svg 2>/dev/null || \
        echo -e "${YELLOW}    ⚠  Manual creation needed${NC}"
    fi
else
    echo -e "${YELLOW}  ⚠  ImageMagick not found. Install with: ${BLUE}brew install imagemagick${NC}"
    echo -e "${YELLOW}  ⚠  Or create white versions manually in Figma/Inkscape${NC}"
fi


# ============================================================================
# SUMMARY
# ============================================================================
echo -e "\n${GREEN}✅ Download Complete!${NC}"
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Downloaded logos to:${NC}"
echo -e "  • ${YELLOW}public/brand/logos/apple/${NC} (Apple logos)"
echo -e "  • ${YELLOW}public/brand/logos/nike/${NC} (Nike Swoosh & Jumpman)"
echo -e "  • ${YELLOW}public/brand/logos/fedex/${NC} (FedEx Express & Ground)"
echo -e "  • ${YELLOW}public/brand/logos/zomato/${NC} (Zomato logo)"
echo -e "  • ${YELLOW}public/brand/logos/flipkart/${NC} (Flipkart logo)"
echo -e "  • ${YELLOW}public/brand/logos/airbnb/${NC} (Airbnb Bélo)"

echo -e "\n${YELLOW}⚠️  Manual Steps Required:${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo -e "\n${YELLOW}1. Create White Versions${NC} (if ImageMagick failed):"
echo -e "   ${BLUE}→${NC} Open black logos in Figma/Inkscape"
echo -e "   ${BLUE}→${NC} Invert colors (white fill, transparent background)"
echo -e "   ${BLUE}→${NC} Save as:"
echo -e "     • apple/logo-white.svg"
echo -e "     • nike/swoosh-white.svg"
echo -e "     • nike/jumpman-white.svg"

echo -e "\n${YELLOW}2. Download Razorpay Logos${NC}:"
echo -e "   ${BLUE}→${NC} Visit: ${BLUE}https://razorpay.com/newsroom/${NC}"
echo -e "   ${BLUE}→${NC} Or use browser DevTools on razorpay.com:"
echo -e "     • Open DevTools (F12 or Cmd+Opt+I)"
echo -e "     • Network tab → Filter: 'logo' or '.svg'"
echo -e "     • Find logo URL in CDN"
echo -e "     • Save to: ${YELLOW}public/brand/logos/razorpay/logo-full-blue.svg${NC}"
echo -e "     • Save to: ${YELLOW}public/brand/logos/razorpay/logo-white.svg${NC}"
echo -e "     • Save to: ${YELLOW}public/brand/logos/razorpay/logo-icon.svg${NC}"

echo -e "\n${YELLOW}3. Get High-Quality SVGs${NC} (if only PNG downloaded):"
echo -e "   ${BLUE}→${NC} Zomato: Visit brand.zomato.com for official assets"
echo -e "   ${BLUE}→${NC} Flipkart: Check flipkart.com press kit"
echo -e "   ${BLUE}→${NC} Or use online converters: ${BLUE}https://convertio.co/png-svg/${NC}"

echo -e "\n${YELLOW}4. Optimize SVG Files${NC}:"
echo -e "   ${BLUE}→${NC} Visit: ${BLUE}https://jakearchibald.github.io/svgomg/${NC}"
echo -e "   ${BLUE}→${NC} Upload each SVG and optimize"
echo -e "   ${BLUE}→${NC} Target: < 50KB per file"

echo -e "\n${GREEN}Next Steps:${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  ${GREEN}1.${NC} Complete manual steps above"
echo -e "  ${GREEN}2.${NC} Verify all files: ${YELLOW}ls -lh public/brand/logos/*/${NC}"
echo -e "  ${GREEN}3.${NC} Update code URLs: ${YELLOW}bash scripts/update-logo-paths.sh${NC}"
echo -e "  ${GREEN}4.${NC} Commit to git: ${YELLOW}git add public/brand/logos${NC}"

echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ All automatic downloads complete! ✨${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
