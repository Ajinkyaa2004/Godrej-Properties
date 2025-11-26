# Google Analytics Quick Reference Card

## 🚨 THE ANSWER TO YOUR QUESTION

**Q: Why does my Google Analytics reset to 0 after deployment?**

**A: It doesn't! You're looking at the wrong report.**

---

## 📊 Two Types of Reports

### ❌ Real-time Report (Shows 0 Often - This is NORMAL!)
- **Time Range**: Last 30 minutes ONLY
- **Shows**: Current active visitors RIGHT NOW
- **URL**: Reports → Realtime
- **Will Show 0 When**: No one is actively browsing
- **Use For**: Testing if tracking works
- **Use For**: Monitoring current live events
- **NOT For**: Measuring overall performance

### ✅ Historical Reports (Your ACTUAL Data - Use This!)
- **Time Range**: Any range you choose (7 days, 30 days, 90 days, etc.)
- **Shows**: ALL your cumulative data
- **URLs**: 
  - Reports → Engagement → Pages and screens
  - Reports → Acquisition → Traffic acquisition
  - Reports → Snapshot
- **Will Show 0 When**: NEVER (unless truly no visitors in that date range)
- **Use For**: All actual analytics and metrics
- **Use For**: Business decisions and reporting

---

## ⚡ Quick Checks (30 Seconds)

### ✅ Is My Analytics Working?

**Test 1** (On your website):
```
1. Right-click page → Inspect
2. Click Console tab
3. Type: dataLayer
4. Press Enter
5. ✅ See an array? = Working!
```

**Test 2** (In Google Analytics):
```
1. Go to analytics.google.com
2. Reports → Engagement → Pages and screens
3. Set date range: Last 7 days
4. ✅ See data? = Working!
```

### ❌ What To Do If You See "0"

**If in Real-time report:**
- ✅ This is normal! Visit your site and wait 60 seconds. It will show up.
- This does NOT mean your data is gone.

**If in historical reports:**
- Check date range (make sure it includes dates when you had visitors)
- Wait 24-48 hours if you just set up analytics
- Verify `NEXT_PUBLIC_GA_ID` in Vercel environment variables

---

## 🎯 What Happens During Deployment

| When You Deploy New Code To GitHub/Vercel |  |
|-------------------------------------------|--|
| ✅ Your website code updates | **Updated** |
| ✅ Your website design changes | **Updated** |
| ✅ New features go live | **Updated** |
| ❌ Google Analytics data | **NEVER CHANGES** |
| ❌ Historical analytics data | **NEVER CHANGES** |
| ❌ Your Measurement ID | **NEVER CHANGES** |
| ❌ Past page views | **NEVER CHANGES** |
| ❌ Past user sessions | **NEVER CHANGES** |

**Why?** Your analytics data lives on **Google's servers**, not in your code!

---

## 🔧 Your Configuration

### Where Analytics is Set Up

**Frontend Code**:
- `app/components/GoogleAnalytics.js` - The tracking component
- `app/layout.js` (lines 96-99) - Where it's loaded on every page

**Environment Variables**:
- **Vercel**: Settings → Environment Variables → `NEXT_PUBLIC_GA_ID`
- **Local**: `.env.local` file → `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

**Measurement ID Format**: `G-XXXXXXXXXX` (starts with G-)

---

## 📍 Bookmarks You Need

Save these Google Analytics URLs:

1. **Main Dashboard**: 
   - https://analytics.google.com/
   - Reports → Snapshot

2. **Page Views** (Check this for data!):
   - Reports → Life cycle → Engagement → Pages and screens

3. **Traffic Sources**:
   - Reports → Life cycle → Acquisition → Traffic acquisition

4. **Real-time** (Testing only!):
   - Reports → Realtime

---

## 🎓 Common Scenarios Explained

### Scenario 1: "I just deployed and see 0 users"
- ✅ **Normal!** Real-time shows 0 when no one is browsing
- ✅ **Solution**: Visit your site, wait 60 seconds, check Real-time again
- ✅ **OR**: Check historical reports (Pages and screens) instead

### Scenario 2: "My analytics was working yesterday, now it's 0"
- ✅ **Check**: Are you looking at Real-time? (Will show 0 if no active visitors)
- ✅ **Check**: Date range in historical reports (might be set to "Today" with no visitors yet)
- ✅ **Solution**: Set date range to "Last 7 days" in historical reports

### Scenario 3: "After every push to GitHub, I lose my data"
- ❌ **This is impossible!** Deployments cannot affect Google Analytics data
- ✅ **Reality**: You're comparing Real-time (before = active, after = 0) with historical reports
- ✅ **Solution**: Always use historical reports for metrics

### Scenario 4: "I want to see all my analytics data"
- ✅ **Go to**: Reports → Engagement → Pages and screens
- ✅ **Set date range**: "Last 30 days" or custom range
- ✅ **This shows**: ALL your data, never resets

---

## 🔍 Verification Commands

### Check if tracking code is loaded:
1. Visit your website
2. View page source (Right-click → View Page Source)
3. Press Ctrl+F (Cmd+F on Mac)
4. Search for: `googletagmanager.com`
5. ✅ Found it? = Tracking code is loaded!

### Check what Measurement ID is being used:
1. Same as above, but search for: `G-`
2. You should see something like `gtag/js?id=G-XXXXXXXXXX`
3. This should match your Google Analytics property

### Check environment variable (from terminal):
```bash
# If you have Vercel CLI installed
vercel env ls

# Or check your local .env.local file
cat .env.local | grep NEXT_PUBLIC_GA_ID
```

---

## 💡 The Ultimate Truth

### Your Google Analytics Data:
- ✅ Lives on Google's servers
- ✅ Is completely separate from your code
- ✅ Persists through all deployments
- ✅ Never gets "reset" or deleted
- ✅ Is always accessible in historical reports

### What "Resets" to 0:
- ❌ **ONLY**: The Real-time report (last 30 mins)
- ❌ **WHY**: Because no one is actively browsing RIGHT NOW
- ❌ **DOES NOT MEAN**: Your data is gone

### The Real-time Report:
- 📍 Shows: Active users in last 30 minutes
- 📍 Purpose: Testing tracking, monitoring live events
- 📍 Limitations: Not for measuring overall performance
- 📍 Behavior: Drops to 0 when traffic stops (this is expected!)

---

## 🎬 Do This Right Now

### 5-Minute Verification:

**Step 1** (30 seconds):
- Open http://localhost:3000 in browser
- Right-click → Inspect → Console
- Type `dataLayer` and press Enter
- ✅ See array? Your tracking works!

**Step 2** (1 minute):
- Go to https://analytics.google.com/
- Make sure correct property is selected (top dropdown)

**Step 3** (2 minutes):
- Click: Reports → Engagement → Pages and screens
- Set date range: Last 7 days
- ✅ See data? Your analytics is working perfectly!

**Step 4** (1 minute):
- Click: Reports → Realtime
- In another tab, visit your website
- Within 60 seconds, Real-time should show 1 user
- ✅ Shows up? Tracking is working in real-time!

**Step 5** (30 seconds):
- Bookmark the "Pages and screens" report
- **Use this as your main analytics dashboard**

---

## 📞 Still See Issues?

### Checklist:

- [ ] Verified `dataLayer` exists in browser console
- [ ] Checked "Pages and screens" report (not Real-time)
- [ ] Set proper date range (Last 7 or 30 days)
- [ ] Viewing correct Google Analytics property
- [ ] Environment variable `NEXT_PUBLIC_GA_ID` is set in Vercel
- [ ] Measurement ID in Vercel matches Google Analytics

**If ALL checked** = Your analytics is working! You were just looking at Real-time report when no one was active.

**If some unchecked** = Review the guides:
- `HOW_TO_CHECK_ANALYTICS.md` - Step-by-step verification
- `VERIFY_GOOGLE_ANALYTICS.md` - Complete troubleshooting guide
- `GOOGLE_ANALYTICS_SETUP.md` - Setup instructions

---

## 💾 Print This Page

Keep this as a quick reference whenever you have questions about your analytics!

**Remember**: 
- Real-time = Last 30 minutes only (will show 0 often)
- Historical = All your actual data (never resets)
- Deployments = Never affect your analytics data

---

**Created**: 2025-11-25
**Version**: 1.0
**Verified**: ✅ Analytics working on localhost
