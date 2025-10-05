# 🚀 Quick Deployment Reference Card

## ⚡ 3-Minute Deploy to Netlify (RECOMMENDED)

```bash
# 1. Build and test
npm run build && npm run preview

# 2. Push to GitHub
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main

# 3. Deploy on Netlify
# → Go to https://app.netlify.com/signup
# → Sign in with GitHub
# → "Add new site" → "Import from Git"
# → Select your repository
# → Click "Deploy"
# → Done! 🎉
```

---

## 📋 Pre-Deployment Checklist

- [ ] `npm run build` works ✅
- [ ] Updated `src/data/resume.ts` with your info
- [ ] Replaced `src/assets/profile.png` with your photo
- [ ] Replaced `public/resume.pdf` with your resume
- [ ] Git repository set up
- [ ] GitHub account ready

---

## 🌐 Platform URLs

| Platform | Sign Up | Deploy |
|----------|---------|---------|
| **Netlify** | https://app.netlify.com/signup | Import from GitHub |
| **Vercel** | https://vercel.com/signup | Import from GitHub |
| **GitHub Pages** | Already on GitHub | Enable in Settings → Pages |

---

## 🔧 Common Commands

```bash
# Test build
npm run build

# Preview locally
npm run preview

# Commit changes
git add .
git commit -m "Your message"
git push

# Check git status
git status
git remote -v
```

---

## 🎯 Expected Results

After deployment, you'll get:

✅ **Live URL**: `https://yourname.netlify.app`  
✅ **SSL Certificate**: HTTPS enabled  
✅ **Auto-Deploy**: Push to GitHub = Auto-update  
✅ **Free Hosting**: Forever!  

---

## 🆘 Troubleshooting

**Build Fails?**
```bash
rm -rf node_modules dist
npm install
npm run build
```

**Can't Push to GitHub?**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**Deployment Fails?**
- Check build logs on platform dashboard
- Ensure `npm run build` works locally
- Verify Node version is 18+

---

## 📞 Need More Help?

Read the full guide: **`DEPLOYMENT_GUIDE.md`**

Or run the interactive setup script:
```bash
./deploy-setup.sh
```

---

**Your portfolio is ready! Deploy now and share with the world! 🌟**
