#!/bin/bash

# 🚀 Deploy Script for Handmade 3D Landing Page
# Usage: ./deploy.sh

set -e

echo "🎉 Starting deployment..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${RED}❌ Git repository not initialized${NC}"
    echo "Run: git init"
    exit 1
fi

# Add all files
echo -e "${BLUE}📦 Adding files to git...${NC}"
git add .

# Commit
echo -e "${BLUE}💾 Creating commit...${NC}"
read -p "Enter commit message (or press Enter for default): " COMMIT_MSG
COMMIT_MSG=${COMMIT_MSG:-"Update landing page - $(date +%Y-%m-%d)"}
git commit -m "$COMMIT_MSG" || echo "No changes to commit"

# Push
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
git push origin main || git push origin master

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "📊 Next steps:"
echo "1. Enable GitHub Pages: Settings → Pages → Source: main branch"
echo "2. Your site will be at: https://YOUR_USERNAME.github.io/3d/"
echo "3. Add custom domain (optional): Settings → Pages → Custom domain"
echo ""
echo "🎯 Production checklist:"
echo "- [ ] Update TELEGRAM_USERNAME in scripts/main.js"
echo "- [ ] Update WHATSAPP_PHONE in scripts/main.js"
echo "- [ ] Update Google Analytics ID in index.html"
echo "- [ ] Test with ?pixel=YOUR_PIXEL_ID parameter"
echo "- [ ] Add og-image.jpg for social media"
echo "- [ ] Add favicon.ico"
