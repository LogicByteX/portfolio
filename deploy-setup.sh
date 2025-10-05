#!/bin/bash

# 🚀 Portfolio Deployment Quick Start Script
# This script helps you prepare your portfolio for deployment

set -e  # Exit on error

echo "======================================"
echo "🚀 Portfolio Deployment Setup"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found!${NC}"
    echo "Please run this script from the portfolio directory."
    exit 1
fi

echo "📋 Step 1: Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules not found. Installing dependencies...${NC}"
    npm install
else
    echo -e "${GREEN}✅ Dependencies installed${NC}"
fi
echo ""

echo "🔨 Step 2: Testing build process..."
if npm run build; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed! Please fix errors before deploying.${NC}"
    exit 1
fi
echo ""

echo "👀 Step 3: Testing preview..."
echo -e "${YELLOW}Starting preview server on http://localhost:4173${NC}"
echo -e "${YELLOW}Press Ctrl+C when done reviewing${NC}"
npm run preview &
PREVIEW_PID=$!

# Wait for user to check preview
echo ""
read -p "Press Enter after reviewing the preview to continue..." 

# Kill preview server
kill $PREVIEW_PID 2>/dev/null || true
echo ""

echo "📝 Step 4: Git setup check..."
if [ -d ".git" ]; then
    echo -e "${GREEN}✅ Git repository initialized${NC}"
    
    # Check if there are uncommitted changes
    if [[ -n $(git status -s) ]]; then
        echo -e "${YELLOW}⚠️  You have uncommitted changes.${NC}"
        read -p "Do you want to commit all changes? (y/n): " commit_choice
        
        if [ "$commit_choice" = "y" ] || [ "$commit_choice" = "Y" ]; then
            echo ""
            read -p "Enter commit message: " commit_msg
            git add .
            git commit -m "$commit_msg"
            echo -e "${GREEN}✅ Changes committed${NC}"
        fi
    else
        echo -e "${GREEN}✅ No uncommitted changes${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Git not initialized${NC}"
    read -p "Initialize git repository? (y/n): " init_choice
    
    if [ "$init_choice" = "y" ] || [ "$init_choice" = "Y" ]; then
        git init
        git add .
        read -p "Enter initial commit message (default: 'Initial commit'): " commit_msg
        commit_msg=${commit_msg:-"Initial commit"}
        git commit -m "$commit_msg"
        echo -e "${GREEN}✅ Git repository initialized and first commit made${NC}"
    fi
fi
echo ""

echo "======================================"
echo -e "${GREEN}🎉 Your portfolio is ready for deployment!${NC}"
echo "======================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Create a GitHub account (if you don't have one):"
echo "   https://github.com/signup"
echo ""
echo "2️⃣  Create a new repository on GitHub:"
echo "   https://github.com/new"
echo "   Name: portfolio (or sankalp-portfolio)"
echo "   Keep it PUBLIC for free deployment"
echo ""
echo "3️⃣  Push your code to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4️⃣  Deploy on Netlify (RECOMMENDED):"
echo "   → Go to: https://app.netlify.com/signup"
echo "   → Sign up with GitHub"
echo "   → Import your repository"
echo "   → Deploy! (takes 2-3 minutes)"
echo ""
echo "5️⃣  Alternative: Deploy on Vercel:"
echo "   → Go to: https://vercel.com/signup"
echo "   → Sign up with GitHub"
echo "   → Import your repository"
echo "   → Deploy!"
echo ""
echo "======================================"
echo ""
echo "📖 For detailed instructions, read:"
echo "   DEPLOYMENT_GUIDE.md"
echo ""
echo -e "${GREEN}✅ Setup complete! Good luck! 🚀${NC}"
echo ""
