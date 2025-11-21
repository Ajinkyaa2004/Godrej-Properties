# Vercel 500 Error Troubleshooting Guide

## 🔍 Diagnosing the Schedule Visit 500 Error

---

## ✅ Step 1: Check Vercel Function Logs

### How to Access Logs:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click on your **"godrej-properties"** project

2. **View Function Logs**
   - Click on the **"Logs"** tab (or "Functions" → "Logs")
   - Look for errors around the time you submitted the form
   - Search for: `Schedule visit database error`

3. **What to Look For:**
   - MongoDB connection errors
   - Authentication failures
   - Missing environment variables
   - Validation errors

---

## 🔧 Step 2: Verify Environment Variables

### Check These in Vercel:

Go to: **Project Settings** → **Environment Variables**

#### Required Variable:
```
MONGODB_URI = mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority
```

### Common Issues:

❌ **Variable not set**
- Solution: Add MONGODB_URI in Vercel environment variables

❌ **Variable has extra spaces**
- Solution: Remove any leading/trailing spaces

❌ **Wrong environment selected**
- Solution: Ensure it's enabled for "Production"

❌ **Typo in variable name**
- Solution: Must be exactly `MONGODB_URI` (case-sensitive)

---

## 🗄️ Step 3: Check MongoDB Atlas Network Access

### Allow Vercel to Connect:

1. **Go to MongoDB Atlas Dashboard**
   - Visit: https://cloud.mongodb.com

2. **Click "Network Access"** (left sidebar)

3. **Check IP Whitelist:**
   - Should have: **0.0.0.0/0** (Allow access from anywhere)
   - OR add Vercel's IP ranges

4. **If Not Present:**
   - Click **"Add IP Address"**
   - Select **"Allow Access from Anywhere"**
   - Enter: `0.0.0.0/0`
   - Click **"Confirm"**

### Why This Matters:
Vercel's servers have dynamic IPs, so you need to allow all IPs or specifically add Vercel's ranges.

---

## 🔑 Step 4: Verify MongoDB Credentials

### Test Connection String:

1. **Copy your MONGODB_URI from Vercel**

2. **Test locally using mongosh:**
```bash
mongosh "mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve"
```

3. **If it fails:**
   - Password might be wrong
   - User might not have permissions
   - Database name might be incorrect

### Fix MongoDB User Permissions:

1. Go to **MongoDB Atlas** → **Database Access**
2. Find user: `dhumalajinkya2004_db_user`
3. Ensure role is: **"Read and write to any database"**
4. If not, click **"Edit"** and update permissions

---

## 📋 Step 5: Check Form Data Being Sent

### Common Data Issues:

The schedule visit form requires:
- ✅ `fullName` (string)
- ✅ `phoneNumber` (string, 7-15 digits)
- ✅ `fullPhoneNumber` (string with country code)
- ✅ `preferredDate` (valid date string)
- ✅ `country` (string)
- ✅ `countryCode` (string, e.g., "+91")

### Check Browser Console:

1. Open browser DevTools (F12)
2. Go to **"Network"** tab
3. Submit the form
4. Click on the failed request
5. Check **"Payload"** - ensure all fields are present

---

## 🔄 Step 6: Redeploy with Updated Code

I've updated the error handling to show more details. Now:

### Commit and Push Changes:

```bash
cd "/Users/ajinkya/Documents/My Files/godrej-project"
git add .
git commit -m "Fix: Improve error handling for schedule visit API"
git push origin main
```

### Vercel Auto-Deploys:
- Wait 2-3 minutes for deployment
- Try submitting the form again
- Check browser console for detailed error message

---

## 🐛 Step 7: Common Error Messages & Solutions

### Error: "MONGODB_URI is not defined"
**Solution:**
- Add MONGODB_URI to Vercel environment variables
- Redeploy (not just rebuild)

### Error: "MongoServerError: bad auth"
**Solution:**
- Check password in connection string
- Verify user exists in MongoDB Atlas
- Check user has correct permissions

### Error: "MongoNetworkError: connection timeout"
**Solution:**
- Add 0.0.0.0/0 to MongoDB Network Access
- Check MongoDB cluster is running
- Verify connection string is correct

### Error: "Missing required fields"
**Solution:**
- Check form is sending all required fields
- Verify field names match API expectations
- Check for typos in field names

### Error: "Invalid phone number format"
**Solution:**
- Ensure phone number is 7-15 digits
- Include country code
- Remove special characters except +

---

## 🧪 Step 8: Test API Directly

### Test Using cURL:

```bash
curl -X POST https://your-site.vercel.app/api/schedule-visit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "phoneNumber": "9876543210",
    "fullPhoneNumber": "+919876543210",
    "countryCode": "+91",
    "country": "India",
    "preferredDate": "2025-12-01",
    "sourcePage": "test",
    "timestamp": "2025-11-21T15:30:00.000Z"
  }'
```

### Expected Response (Success):
```json
{
  "success": true,
  "message": "Visit scheduled successfully",
  "visitId": "...",
  "preferredDate": "2025-12-01",
  "status": "pending"
}
```

### Expected Response (Error):
```json
{
  "error": "Failed to schedule visit. Please try again.",
  "details": "Detailed error message here",
  "errorType": "MongoNetworkError"
}
```

---

## 📊 Step 9: Check MongoDB Atlas Directly

### Verify Database & Collection Exist:

1. **Go to MongoDB Atlas**
2. **Click "Browse Collections"**
3. **Check for:**
   - Database: `godrej-reserve`
   - Collection: `schedule-visits`

4. **If Missing:**
   - They'll be created automatically on first insert
   - But verify database name is correct

---

## 🔍 Step 10: Enable Detailed Logging

### Add Temporary Debug Logging:

The updated code now logs:
- ✅ Error name
- ✅ Error message
- ✅ Full stack trace
- ✅ Detailed error in development mode

### View Logs in Vercel:

1. Go to **Vercel Dashboard** → **Your Project**
2. Click **"Logs"** or **"Functions"** → **"Logs"**
3. Filter by: `/api/schedule-visit`
4. Look for the detailed error messages

---

## ✅ Quick Checklist

Run through this checklist:

- [ ] **MONGODB_URI** is set in Vercel environment variables
- [ ] **0.0.0.0/0** is in MongoDB Network Access
- [ ] **MongoDB user** has read/write permissions
- [ ] **Connection string** is correct (no typos)
- [ ] **Database name** is `godrej-reserve`
- [ ] **Collection name** is `schedule-visits`
- [ ] **Latest code** is deployed to Vercel
- [ ] **Form sends** all required fields
- [ ] **Vercel logs** show detailed error

---

## 🚀 Most Likely Solutions

### Solution 1: MongoDB Network Access (90% of cases)
```
1. MongoDB Atlas → Network Access
2. Add IP: 0.0.0.0/0
3. Wait 1-2 minutes
4. Try form again
```

### Solution 2: Missing Environment Variable
```
1. Vercel → Project Settings → Environment Variables
2. Add MONGODB_URI
3. Redeploy (important!)
4. Try form again
```

### Solution 3: Wrong Database/Collection Name
```
1. Check MongoDB Atlas
2. Verify database: godrej-reserve
3. Collection: schedule-visits
4. Update code if needed
```

---

## 📞 Next Steps

1. **Check Vercel Function Logs** (most important!)
2. **Verify MongoDB Network Access** (0.0.0.0/0)
3. **Confirm MONGODB_URI** in Vercel env vars
4. **Redeploy** with updated error handling
5. **Test again** and check browser console
6. **Share the detailed error message** if still failing

---

## 🎯 Expected Fix

After adding **0.0.0.0/0** to MongoDB Network Access:
- ✅ Form should submit successfully
- ✅ Data appears in MongoDB Atlas
- ✅ No 500 error
- ✅ Success message shown

---

**Most Common Issue:** MongoDB Network Access not allowing Vercel's IPs.

**Quick Fix:** Add 0.0.0.0/0 to MongoDB Atlas Network Access, wait 1-2 minutes, try again.
