# 🚀 Portfolio Deployment Guide

## ✅ Your Portfolio is Ready to Deploy!

This guide will help you deploy your portfolio to **any GitHub account** and hosting platform.

---

## 📋 Prerequisites

- [ ] A GitHub account (create one at https://github.com/signup if needed)
- [ ] Git installed on your computer
- [ ] Node.js 18+ installed

---

## 🎯 Deployment Options

Choose **ONE** of the following platforms (Netlify is recommended):

### 🌟 **Option 1: Netlify** (EASIEST - Recommended)
- ✅ Free forever
- ✅ Auto-deploys from GitHub
- ✅ Custom domain support
- ✅ SSL certificate included

### 🚀 **Option 2: Vercel** (FASTEST)
- ✅ Optimized for React
- ✅ Auto-deploys from GitHub
- ✅ Edge network (super fast)
- ✅ Free custom domain

### 📦 **Option 3: GitHub Pages** (FREE)
- ✅ Direct GitHub hosting
- ✅ yourname.github.io domain
- ✅ GitHub Actions auto-deploy

---

## 📦 Step 1: Prepare Your Code (REQUIRED)

### 1.1 Test Local Build
```bash
cd /home/aumni/Potfolio/portfolio

# Install dependencies (if not already done)
npm install

# Build the project to ensure no errors
npm run build

# Test the build locally
npm run preview
```

**Expected Output:**
- Build should complete without errors
- Preview should show your portfolio at `http://localhost:4173`

### 1.2 Check Git Status
```bash
# Check if git is initialized
git status

# If not initialized, run:
git init
```

### 1.3 Create .gitignore (if missing)
Make sure you have a `.gitignore` file with these contents:
```
node_modules/
dist/
.env
.DS_Store
```

---

## 🔧 Step 2: Personalize Your Portfolio (IMPORTANT!)

### 2.1 Update Resume Data
Edit: `src/data/resume.ts`

Change:
- Name
- Email
- GitHub URL
- LinkedIn URL
- Skills
- Projects
- Experience

### 2.2 Replace Profile Picture
Replace: `src/assets/profile.png` with your own photo

### 2.3 Update Resume PDF
Replace: `public/resume.pdf` with your actual resume

### 2.4 Update Package.json
Edit: `package.json` - Change author email to yours

---

## 🌐 Step 3: Deploy to Platform

---

## 🟢 **OPTION A: Netlify Deployment** (5 Minutes)

### A1. Push to GitHub

```bash
# Navigate to project
cd /home/aumni/Potfolio/portfolio

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio commit"

# Create a new repository on GitHub first, then:
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### A2. Deploy on Netlify

1. **Sign Up:**
   - Go to https://app.netlify.com/signup
   - Sign up with your GitHub account (FREE)

2. **Import Project:**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify to access your repos
   - Select your portfolio repository

3. **Configure Build Settings:**
   ```
   Build command:    npm run build
   Publish directory: dist
   ```
   *(These should be auto-detected)*

4. **Deploy:**
   - Click "Deploy site"
   - Wait 2-3 minutes for deployment

5. **Done! 🎉**
   - Your site is live at: `https://random-name-12345.netlify.app`
   - Click "Site settings" → "Change site name" to customize URL

### A3. Customize Domain (Optional)
- Go to "Domain settings"
- Change to: `yourname.netlify.app` (FREE)
- Or add custom domain like `yourname.com` (requires domain purchase)

### A4. Auto-Deploy Setup
✅ **Already configured!** Every time you push to GitHub:
```bash
git add .
git commit -m "Update portfolio"
git push
```
Netlify automatically rebuilds and deploys! 🚀

---

## 🔷 **OPTION B: Vercel Deployment** (3 Minutes)

### B1. Push to GitHub
```bash
cd /home/aumni/Potfolio/portfolio
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### B2. Deploy on Vercel

1. **Sign Up:**
   - Go to https://vercel.com/signup
   - Sign up with GitHub (FREE)

2. **Import Project:**
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Import"

3. **Configure (Auto-Detected):**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes

5. **Done! 🎉**
   - Live at: `https://your-repo.vercel.app`

### B3. Auto-Deploy
✅ Automatic! Push to GitHub = Auto-deploy

---

## 📘 **OPTION C: GitHub Pages Deployment**

### C1. Push to GitHub
```bash
cd /home/aumni/Potfolio/portfolio
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### C2. Enable GitHub Pages

1. **Go to Repository Settings:**
   - Navigate to your repo on GitHub
   - Click "Settings" tab
   - Click "Pages" in left sidebar

2. **Configure Source:**
   - Source: "GitHub Actions"
   - (The workflow file is already in `.github/workflows/deploy.yml`)

3. **Configure Vite Base Path:**
   Edit `vite.config.ts` and change:
   ```typescript
   base: '/YOUR_REPO_NAME/'  // Replace with your actual repo name
   ```

4. **Push Changes:**
   ```bash
   git add vite.config.ts
   git commit -m "Configure GitHub Pages base path"
   git push
   ```

5. **Wait for Deployment:**
   - Go to "Actions" tab
   - Watch the deployment workflow
   - Takes 3-5 minutes

6. **Done! 🎉**
   - Live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### C3. Use Custom Domain (Optional)
- Add `CNAME` file in `public/` directory
- Configure DNS settings
- See: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

---

## 🔄 Step 4: Update Your Portfolio

### Local Changes Workflow:
```bash
# 1. Make changes to your code
# 2. Test locally
npm run dev

# 3. Build and test
npm run build
npm run preview

# 4. Commit and push
git add .
git commit -m "Description of changes"
git push

# 5. Auto-deploys! ✅
```

---

## 🛠️ Troubleshooting

### Build Fails?
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### GitHub Push Fails?
```bash
# Check remote
git remote -v

# Reset remote if needed
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Deployment Fails on Platform?
- Check build logs in platform dashboard
- Ensure Node version is 18+
- Verify `npm run build` works locally

### Blank Page After Deploy?
- Check browser console for errors
- Verify `base` path in `vite.config.ts` (for GitHub Pages)
- Ensure all assets are in `public/` folder

---

## 📊 Quick Reference - Deployment Commands

### Netlify CLI (Optional)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
npm run deploy:netlify
```

### Vercel CLI (Optional)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
npm run deploy:vercel
```

### GitHub Pages Manual (Optional)
```bash
# Install gh-pages
npm install -D gh-pages

# Deploy
npm run deploy:gh-pages
```

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] `npm run build` works without errors
- [ ] Portfolio looks good on `npm run preview`
- [ ] Updated `src/data/resume.ts` with your info
- [ ] Replaced `src/assets/profile.png` with your photo
- [ ] Replaced `public/resume.pdf` with your resume
- [ ] Updated `package.json` author field
- [ ] Git repository initialized
- [ ] All changes committed
- [ ] `.gitignore` file present

---

## 🎯 Recommended Workflow

### For Your New GitHub Account:

1. **Create GitHub Account**
   - Go to https://github.com/signup
   - Choose username (e.g., `sankalp-pandey`)

2. **Create New Repository**
   - Name: `portfolio` or `sankalp-portfolio`
   - Description: "My SDET Portfolio"
   - Keep it **Public** (for free deployment)
   - Don't initialize with README (you already have one)

3. **Push Your Code** (from this machine)
   ```bash
   cd /home/aumni/Potfolio/portfolio
   git remote add origin https://github.com/YOUR_NEW_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy on Netlify**
   - Sign up with the GitHub account you just created
   - Import the repository
   - Deploy!

5. **Share Your Portfolio**
   - URL: `https://yourname.netlify.app`
   - Add to resume, LinkedIn, GitHub profile

---

## 🌟 What You Get

After deployment, you'll have:

✅ **Live Portfolio Website**
- Professional URL
- SSL certificate (HTTPS)
- Fast loading times
- Mobile responsive

✅ **Auto-Deployment**
- Push to GitHub → Instant updates
- No manual deployment needed

✅ **Professional Features**
- Custom domain support
- Analytics integration ready
- SEO optimized

✅ **Portfolio Features**
- 🎨 Cyberpunk theme with animations
- 🌓 Dark/light theme toggle
- 🎮 Terminal with Easter eggs
- 🐍 Snake and Memory games
- 📱 Fully responsive
- ⚡ Performance optimized

---

## 📞 Need Help?

If you get stuck:

1. **Check Build Logs** - Platform dashboard shows detailed errors
2. **Test Locally First** - Always run `npm run build` before deploying
3. **GitHub Issues** - Check if others had similar issues
4. **Platform Support** - Netlify/Vercel have great documentation

---

## 🚀 You're Ready to Deploy!

**Recommended Path:**
1. ✅ Create new GitHub account (5 min)
2. ✅ Push code to GitHub (2 min)
3. ✅ Deploy on Netlify (3 min)
4. ✅ **Total: 10 minutes to go live!**

**Your portfolio is professional, feature-rich, and ready to impress! 🎉**

---

*Last Updated: October 5, 2025*
*Portfolio Version: 1.2.0*
