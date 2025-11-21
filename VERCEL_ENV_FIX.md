# CRITICAL FIX: Vercel Environment Variable Not Loading

## The Problem
Vercel is not loading the MONGODB_URI environment variable, even after redeployment.

## Solution: Use Vercel CLI to Force Environment Variable

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Link Your Project

```bash
cd "/Users/ajinkya/Documents/My Files/godrej-project"
vercel link
```

When prompted:
- Set up and deploy: **N** (No)
- Link to existing project: **Y** (Yes)
- Select your project: **godrej-properties** or similar
- Link to it: **Y** (Yes)

### Step 4: Add Environment Variable via CLI

```bash
vercel env add MONGODB_URI production
```

When prompted for value, paste:
```
mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority
```

Then run:
```bash
vercel env add MONGODB_URI preview
```

Paste the same value.

Then run:
```bash
vercel env add MONGODB_URI development
```

Paste the same value.

### Step 5: Deploy

```bash
vercel --prod
```

This will deploy with the environment variables properly set.

---

## Alternative Solution: Check Variable Name in Vercel Dashboard

The variable name MUST be exactly: `MONGODB_URI`

**NOT:**
- ❌ `MONGODB_URL`
- ❌ `MONGO_URI`
- ❌ `DATABASE_URL`
- ❌ Any other variation

**Must be:** ✅ `MONGODB_URI`

---

## Quick Fix Commands (Run These)

```bash
# Navigate to project
cd "/Users/ajinkya/Documents/My Files/godrej-project"

# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variable for production
vercel env add MONGODB_URI production

# When prompted, paste:
# mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority

# Deploy
vercel --prod
```

---

## If Vercel CLI Doesn't Work

### Manual Fix in Vercel Dashboard:

1. **Delete ALL deployments:**
   - Go to Deployments tab
   - Delete the last 2-3 deployments

2. **Verify Environment Variable:**
   - Settings → Environment Variables
   - Ensure `MONGODB_URI` exists
   - Value should start with `mongodb+srv://`
   - All 3 environments checked

3. **Trigger Fresh Deployment:**
   - Make a small code change
   - Push to Git
   - Wait for deployment

---

## Screenshot Verification Needed

Please take a screenshot of:
1. Vercel → Settings → Environment Variables page (showing MONGODB_URI)
2. The exact error from Vercel Function Logs (not browser console)

This will help diagnose if it's a variable name mismatch or deployment issue.
