# Google Analytics Verification Guide

## Understanding Why Analytics Appears to "Reset"

**IMPORTANT**: Your Google Analytics data is **NOT being deleted** when you deploy. Historical data is always preserved across all deployments.

### What's Actually Happening

When you see "0" in Google Analytics after deployment, you're likely viewing the **Real-time** report, which only shows users active in the last 30 minutes. Your historical data remains completely intact!

---

## Step-by-Step Verification Process

### Step 1: Verify Your Measurement ID

1. Check what Measurement ID you're using in your deployment:
   - **On Vercel**: Go to your project → Settings → Environment Variables
   - Look for: `NEXT_PUBLIC_GA_ID` or `NEXT_PUBLIC_GOOGLE_TAG_ID`
   - Copy the value (it should look like `G-XXXXXXXXXX`)

2. Verify this matches your Google Analytics property:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Click **Admin** (gear icon in bottom left)
   - Under **Property** column, click **Data Streams**
   - Click on your web stream
   - **Measurement ID** should match your environment variable

---

### Step 2: Check Historical Data (NOT Real-time)

**This is where your actual analytics data lives:**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Make sure you're viewing the correct property (check the dropdown at top)
3. Navigate to: **Reports** → **Life cycle** → **Engagement** → **Pages and screens**
4. Set date range: **Last 7 days** or **Last 30 days** (click date picker in top right)
5. You should see all your historical page views and sessions

**Alternative reports to check:**
- **Reports** → **Life cycle** → **Acquisition** → **Traffic acquisition**
- **Reports** → **Life cycle** → **Engagement** → **Events**
- **Reports** → **Snapshot** (overview of all data)

---

### Step 3: Test Real-time Tracking

**Real-time shows ONLY current users (last 30 mins):**

1. Open your website: https://godrejreserve.com
2. Go to Google Analytics: **Reports** → **Realtime**
3. Within 30-60 seconds, you should see:
   - **1 user** in "Users in last 30 minutes"
   - Your page view in the events list
   - Your location on the map

4. Navigate to 2-3 different pages on your site
5. You should see each page view appear in real-time

**Note**: If you close your website, the Real-time counter will drop to 0 within 30 minutes. This is NORMAL and does NOT mean your data is lost!

---

### Step 4: Verify Tracking Code is Active

#### Method 1: Browser DevTools
1. Visit your website (live or localhost)
2. Open browser DevTools (F12 or Right-click → Inspect)
3. Go to **Console** tab
4. Type: `dataLayer`
5. Press Enter
6. You should see an array with your analytics events

#### Method 2: Network Tab
1. Open DevTools → **Network** tab
2. Filter by "gtag" or "google-analytics"
3. Reload your page
4. You should see requests to `googletagmanager.com`

#### Method 3: View Page Source
1. Visit your website
2. Right-click → **View Page Source**
3. Press Ctrl+F (or Cmd+F) and search for your Measurement ID (e.g., `G-XXXXXXXXXX`)
4. You should find it in the Google Analytics script

---

### Step 5: Verify on Both Localhost and Production

#### Test on Localhost
```bash
npm run dev
```
Then visit: http://localhost:3000

#### Test on Production
Visit: https://godrejreserve.com

**Both should send data to Google Analytics!** (Check Real-time report to confirm)

---

## Common Misconceptions

### ❌ WRONG: "Analytics resets to 0 after deployment"
### ✅ CORRECT: "Real-time shows 0 when no one is actively browsing"

| What You're Seeing | What It Actually Means |
|-------------------|------------------------|
| Real-time: 0 users | No one is on your site RIGHT NOW (last 30 mins) |
| Pages report: Shows data | Your historical data is intact ✅ |
| After deployment: Real-time 0 | Normal - you haven't visited the new deployment yet |
| After visiting site: Real-time 1+ | Working correctly ✅ |

---

## Troubleshooting

### If You See NO Data in Historical Reports

1. **Check the date range**: Make sure you're looking at dates AFTER you set up analytics
2. **Verify environment variable**: Ensure `NEXT_PUBLIC_GA_ID` is set correctly in Vercel
3. **Check property**: Make sure you're viewing the correct GA4 property
4. **Redeploy**: After adding environment variables to Vercel, you MUST redeploy

### If Real-time Works But No Historical Data

- **Wait 24-48 hours**: GA4 can take up to 48 hours to process historical reports
- **Check Data Stream**: Ensure your data stream is active (Admin → Data Streams)

### If Neither Works

1. Check your Measurement ID format (should be `G-XXXXXXXXXX`)
2. Ensure environment variable name is exactly: `NEXT_PUBLIC_GA_ID`
3. Check browser console for errors
4. Verify you're not blocking Google Analytics with browser extensions

---

## Quick Verification Checklist

- [ ] Environment variable `NEXT_PUBLIC_GA_ID` is set in Vercel
- [ ] Measurement ID matches between Vercel and Google Analytics
- [ ] Can see tracking code in page source (search for Measurement ID)
- [ ] Real-time shows activity when you visit the site
- [ ] Historical reports show data (Pages and screens, Traffic acquisition)
- [ ] `dataLayer` exists in browser console
- [ ] Network tab shows requests to googletagmanager.com

---

## What Happens During Deployment

### ✅ Data That Persists (Nothing Changes!)
- All historical analytics data
- Your Measurement ID configuration
- Events, conversions, and custom dimensions
- User properties and audiences

### 🔄 What Gets Rebuilt
- Your website code (HTML, CSS, JS)
- Next.js build output
- Static assets

### 💡 Key Insight
**Your Google Analytics data lives in Google's servers, NOT in your code repository or Vercel deployment!** Deploying new code cannot and will not affect your analytics data.

---

## Best Practices

1. **Always check historical reports** first (not Real-time)
2. **Set proper date ranges** when viewing reports
3. **Bookmark your main reports** for quick access
4. **Use Real-time only for testing**, not for actual metrics
5. **Wait 24-48 hours** for data to fully appear in historical reports

---

## Need More Help?

### View Your Analytics Setup Files
- **Tracking Code**: `app/components/GoogleAnalytics.js`
- **Implementation**: `app/layout.js` (lines 96-99)
- **Setup Guide**: `GOOGLE_ANALYTICS_SETUP.md`

### Test Your Live Site
1. Visit: https://godrejreserve.com
2. Open DevTools Console
3. Type: `dataLayer` - you should see analytics events

### Verify Environment Variables
```bash
# Check Vercel environment variables
vercel env ls
```

---

## Summary

🎯 **Your Google Analytics is working correctly if**:
- Real-time shows users when you visit the site
- Historical reports show data for past dates
- Page source contains your Measurement ID

📊 **Remember**: 
- Real-time = Now (last 30 mins) → Will show 0 when no active visitors
- Historical reports = All time → **This is your actual data!**
- Deployments **never** delete or reset your analytics data
