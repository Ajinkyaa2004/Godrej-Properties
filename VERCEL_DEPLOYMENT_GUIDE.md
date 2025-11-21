# Vercel Deployment Guide - Godrej Reserve

## 🚀 Complete Step-by-Step Deployment Process

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure you have:
- ✅ GitHub repository with latest code pushed
- ✅ MongoDB Atlas connection string ready
- ✅ SMTP credentials (for email notifications)
- ✅ All environment variables documented

---

## 📋 Step 1: Create Vercel Account

### Option A: Sign Up with GitHub (Recommended)

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account
5. Complete the signup process

### Option B: Sign Up with Email

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Enter your email and create a password
4. Verify your email address

---

## 📋 Step 2: Import Your GitHub Repository

### Method 1: Using Vercel Dashboard (Easiest)

1. **Log in to Vercel** at https://vercel.com/dashboard

2. **Click "Add New..."** button (top right)
   - Select **"Project"**

3. **Import Git Repository**
   - You'll see a list of your GitHub repositories
   - Find **"Ajinkyaa2004/Godrej-Properties"**
   - Click **"Import"**

4. **If you don't see your repository:**
   - Click **"Adjust GitHub App Permissions"**
   - Grant Vercel access to your repository
   - Return to Vercel dashboard
   - Try importing again

### Method 2: Using Direct Link

1. Go to: **https://vercel.com/new**
2. Connect your GitHub account if not already connected
3. Search for **"Godrej-Properties"**
4. Click **"Import"**

---

## 📋 Step 3: Configure Project Settings

### Framework Preset
- Vercel should **auto-detect Next.js**
- If not, select **"Next.js"** from the dropdown

### Root Directory
- Leave as **"./"** (root of repository)

### Build Settings (Usually Auto-Detected)
- **Build Command:** `npm run build` or `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

**✅ Don't change these unless you have a custom setup**

---

## 📋 Step 4: Add Environment Variables (CRITICAL!)

This is the **most important step**. Click **"Environment Variables"** section:

### Required Variables:

#### 1. MongoDB Atlas Connection
```
Name:  MONGODB_URI
Value: mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority
```

#### 2. SMTP Configuration (Optional but Recommended)
```
Name:  SMTP_HOST
Value: smtp.gmail.com

Name:  SMTP_PORT
Value: 587

Name:  SMTP_SECURE
Value: false

Name:  SMTP_USER
Value: dhumalajinkya2004@gmail.com

Name:  SMTP_PASS
Value: atah kucy fomd risu

Name:  SMTP_FROM
Value: Godrej Reserve <dhumalajinkya2004@gmail.com>

Name:  NOTIFICATION_EMAIL
Value: sales@godrejreserve.com
```

### How to Add Each Variable:

1. Click **"Add"** or **"New Variable"**
2. Enter the **Name** (e.g., `MONGODB_URI`)
3. Enter the **Value** (the connection string)
4. Select environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **"Add"** or **"Save"**
6. Repeat for all variables

---

## 📋 Step 5: Deploy!

1. **Review all settings**:
   - ✅ Framework: Next.js
   - ✅ Root Directory: ./
   - ✅ Environment Variables: Added
   - ✅ Build Command: Correct

2. **Click "Deploy"** button

3. **Wait for deployment** (usually 2-5 minutes)
   - You'll see a build log
   - Watch for any errors
   - Green checkmarks = success!

---

## 📋 Step 6: Verify Deployment

### After Deployment Completes:

1. **You'll see a success screen** with:
   - 🎉 Confetti animation
   - Your live URL (e.g., `godrej-properties.vercel.app`)
   - Screenshot preview

2. **Click "Visit"** to open your live site

3. **Test the following:**
   - ✅ Homepage loads correctly
   - ✅ Images display properly
   - ✅ Navigation works
   - ✅ Contact form submits successfully
   - ✅ Schedule visit form works
   - ✅ Check MongoDB Atlas for new submissions

---

## 📋 Step 7: Configure Custom Domain (Optional)

### If you have a custom domain (e.g., godrejreserve.com):

1. **Go to Project Settings**
   - Click on your project
   - Go to **"Settings"** tab
   - Click **"Domains"**

2. **Add Domain**
   - Click **"Add"**
   - Enter your domain: `godrejreserve.com`
   - Click **"Add"**

3. **Configure DNS** (at your domain registrar):
   
   **For Root Domain (godrejreserve.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For WWW Subdomain (www.godrejreserve.com):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Wait for DNS propagation** (can take 24-48 hours)

5. **Vercel will auto-issue SSL certificate** (HTTPS)

---

## 🔧 Troubleshooting Common Issues

### Issue 1: Build Fails

**Error:** "Module not found" or "Cannot find package"

**Solution:**
```bash
# Locally, ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push origin main
```
Then redeploy on Vercel.

---

### Issue 2: Environment Variables Not Working

**Error:** "MONGODB_URI is not defined"

**Solution:**
1. Go to **Project Settings** → **Environment Variables**
2. Verify all variables are added
3. Make sure they're enabled for **Production**
4. Click **"Redeploy"** (don't just rebuild)

---

### Issue 3: MongoDB Connection Fails

**Error:** "MongoServerError: bad auth"

**Solution:**
1. Check MongoDB Atlas **Network Access**
   - Go to MongoDB Atlas dashboard
   - Click **"Network Access"**
   - Add IP: **0.0.0.0/0** (allow all IPs)
   - Or add Vercel's IP ranges

2. Verify connection string in Vercel environment variables

---

### Issue 4: Images Not Loading

**Error:** Images show broken or don't load

**Solution:**
1. Ensure all images are in `/public` folder
2. Check image paths (use `/image.png` not `./image.png`)
3. Verify images are committed to Git
4. Redeploy

---

### Issue 5: API Routes Return 404

**Error:** "/api/contact" returns 404

**Solution:**
1. Ensure API routes are in `/app/api/` folder
2. Check file structure:
   ```
   app/
   ├── api/
   │   ├── contact/
   │   │   └── route.js
   │   └── schedule-visit/
   │       └── route.js
   ```
3. Redeploy

---

## 📊 Post-Deployment Checklist

After successful deployment:

- [ ] **Test Homepage**
  - [ ] Hero section loads
  - [ ] Images display
  - [ ] Animations work
  - [ ] Floating particles visible

- [ ] **Test Forms**
  - [ ] Contact form submits
  - [ ] Schedule visit form submits
  - [ ] Check MongoDB Atlas for data
  - [ ] Verify email notifications

- [ ] **Test Navigation**
  - [ ] All menu links work
  - [ ] Gallery page loads
  - [ ] Blogs section works
  - [ ] Footer links work

- [ ] **Test Performance**
  - [ ] Page loads quickly
  - [ ] No console errors
  - [ ] Mobile responsive
  - [ ] SEO meta tags present

- [ ] **MongoDB Atlas**
  - [ ] New form submissions appear
  - [ ] Data structure is correct
  - [ ] Collections are accessible

---

## 🎯 Quick Commands Reference

### Redeploy from Git
```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# Vercel auto-deploys on push!
```

### Manual Redeploy
1. Go to Vercel Dashboard
2. Click on your project
3. Click **"Deployments"** tab
4. Click **"..."** on latest deployment
5. Click **"Redeploy"**

### View Logs
1. Go to Vercel Dashboard
2. Click on your project
3. Click **"Deployments"** tab
4. Click on a deployment
5. View **"Build Logs"** or **"Function Logs"**

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env.local` to Git
- ✅ Use Vercel's environment variables UI
- ✅ Rotate passwords regularly

### 2. MongoDB Atlas
- ✅ Use strong passwords
- ✅ Enable IP whitelisting (or use 0.0.0.0/0 for Vercel)
- ✅ Use separate databases for dev/prod

### 3. API Routes
- ✅ Validate all inputs
- ✅ Rate limit API endpoints
- ✅ Use CORS if needed

---

## 📱 Mobile Testing

After deployment, test on:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop (Chrome, Firefox, Safari)

Use: https://www.browserstack.com/responsive (free trial)

---

## 🎉 Success Indicators

Your deployment is successful when:

1. ✅ **Build completes** without errors
2. ✅ **Site is live** at your Vercel URL
3. ✅ **Forms work** and save to MongoDB Atlas
4. ✅ **Emails send** (if SMTP configured)
5. ✅ **No console errors** in browser
6. ✅ **Mobile responsive** on all devices
7. ✅ **Fast loading** (< 3 seconds)

---

## 🔗 Important Links

### Your Project URLs:
- **GitHub Repo:** https://github.com/Ajinkyaa2004/Godrej-Properties
- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com

### After Deployment:
- **Production URL:** `https://godrej-properties.vercel.app` (or similar)
- **Preview URLs:** Auto-generated for each Git branch

---

## 📞 Support Resources

### Vercel Documentation:
- **Getting Started:** https://vercel.com/docs
- **Next.js on Vercel:** https://vercel.com/docs/frameworks/nextjs
- **Environment Variables:** https://vercel.com/docs/environment-variables

### MongoDB Atlas:
- **Network Access:** https://www.mongodb.com/docs/atlas/security/ip-access-list/
- **Connection Strings:** https://www.mongodb.com/docs/manual/reference/connection-string/

### Need Help?
- **Vercel Support:** https://vercel.com/support
- **Vercel Community:** https://github.com/vercel/vercel/discussions

---

## 🎯 Quick Start Summary

**TL;DR - Fastest Path to Deployment:**

1. Go to **https://vercel.com/new**
2. Import **"Ajinkyaa2004/Godrej-Properties"**
3. Add environment variable:
   ```
   MONGODB_URI=mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority
   ```
4. Click **"Deploy"**
5. Wait 2-5 minutes
6. Visit your live site!

---

## ✅ Final Checklist Before Deploying

- [ ] Latest code pushed to GitHub
- [ ] MongoDB Atlas connection string ready
- [ ] SMTP credentials ready (optional)
- [ ] All images in `/public` folder
- [ ] No sensitive data in code
- [ ] `.env.local` in `.gitignore`
- [ ] `package.json` has all dependencies
- [ ] Local build works (`npm run build`)

---

**Ready to deploy?** Follow the steps above and your Godrej Reserve website will be live in minutes! 🚀

**Good luck!** 🎉
