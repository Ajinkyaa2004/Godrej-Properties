# MongoDB Atlas Setup Guide

## ✅ Status: Successfully Connected!

You've successfully:
- ✅ Connected to MongoDB Atlas
- ✅ Imported 2 contacts
- ✅ Imported 5 schedule-visits

---

## 🔧 Required Code Changes

### 1. Update `.env.local` File

You need to update your `.env.local` file with your MongoDB Atlas connection string.

**Location:** `/Users/ajinkya/Documents/My Files/godrej-project/.env.local`

**Add/Update this line:**

```env
MONGODB_URI=mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority
```

### Complete `.env.local` File Should Look Like:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority

# Optional: Email Configuration (if you want to send confirmation emails)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# SMTP_FROM=your-email@gmail.com
```

---

## 🚀 After Updating `.env.local`

### 1. Restart Your Development Server

Stop the current server (Ctrl+C) and restart:

```bash
npm run dev
```

### 2. Test the Connection

The code will automatically:
- ✅ Connect to MongoDB Atlas
- ✅ Save new contacts to the `contacts` collection
- ✅ Save schedule visits to the `schedule-visits` collection

---

## 📊 Your Current Data

Based on your imports:

### Contacts Collection:
- **Count:** 2 documents
- **Collection Name:** `contacts`

### Schedule Visits Collection:
- **Count:** 5 documents
- **Collection Name:** `schedule-visits`

---

## 🔍 Verify Connection

### Option 1: Using MongoDB Compass
1. Open MongoDB Compass
2. Connect using: `mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/`
3. Select database: `godrej-reserve`
4. View collections: `contacts` and `schedule-visits`

### Option 2: Using mongosh (Terminal)
```bash
mongosh "mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?authSource=admin"
```

Then run:
```javascript
// Check database
db.getName()

// List collections
db.getCollectionNames()

// Count contacts
db.contacts.countDocuments()

// Count schedule visits
db.getCollection("schedule-visits").countDocuments()

// View sample contacts
db.contacts.find().limit(5).pretty()

// View sample schedule visits
db.getCollection("schedule-visits").find().limit(5).pretty()
```

---

## 🎯 What Happens Now

### When Users Submit Contact Form:
1. Form data is sent to `/api/contact`
2. Data is validated
3. **Saved to MongoDB Atlas** in `contacts` collection
4. Optional: Confirmation email sent (if SMTP configured)
5. Response sent back to user

### When Users Schedule a Visit:
1. Form data is sent to `/api/schedule-visit`
2. Data is validated
3. **Saved to MongoDB Atlas** in `schedule-visits` collection
4. Optional: Confirmation email sent (if SMTP configured)
5. Response sent back to user

---

## ⚠️ Important Security Notes

### 1. Never Commit `.env.local` to Git
The file is already in `.gitignore`, which is good!

### 2. For Production Deployment
When deploying to Vercel/Netlify/etc., add the environment variable:
- **Key:** `MONGODB_URI`
- **Value:** `mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority`

### 3. Consider Using MongoDB Atlas IP Whitelist
In MongoDB Atlas:
1. Go to Network Access
2. Add your IP address or use `0.0.0.0/0` for all IPs (less secure but easier for development)

---

## 📝 Connection String Breakdown

```
mongodb+srv://                          ← Protocol (SRV for Atlas)
dhumalajinkya2004_db_user:Ajinkya_2004  ← Username:Password
@projects.rkmjjpd.mongodb.net           ← Cluster hostname
/godrej-reserve                         ← Database name
?retryWrites=true&w=majority            ← Connection options
```

---

## 🧪 Test Your Setup

### 1. Check Server Logs
After restarting, you should see:
```
MongoDB URI check: Found
```

### 2. Submit a Test Form
1. Go to http://localhost:3000
2. Fill out the contact form
3. Submit
4. Check MongoDB Atlas - you should see a new document!

### 3. Check API Endpoint
Visit: http://localhost:3000/api/contact

You should see your contacts data.

---

## 🔧 Troubleshooting

### Error: "bad auth: authentication failed"
- ✅ **Already Fixed!** You're using the correct credentials now.

### Error: "MONGODB_URI is not defined"
- Update `.env.local` with the connection string above
- Restart the dev server

### Error: "Network timeout"
- Check MongoDB Atlas Network Access
- Add your IP to whitelist or use `0.0.0.0/0`

### Can't see new data in Atlas
- Wait 5-10 seconds for sync
- Refresh MongoDB Compass
- Check you're viewing the correct database (`godrej-reserve`)

---

## ✅ Checklist

- [ ] Update `.env.local` with MongoDB Atlas URI
- [ ] Restart development server (`npm run dev`)
- [ ] Check server logs for "MongoDB URI check: Found"
- [ ] Test contact form submission
- [ ] Verify data appears in MongoDB Atlas
- [ ] (Optional) Configure SMTP for email notifications

---

## 🎉 You're All Set!

Your application is now connected to **MongoDB Atlas** (cloud database) instead of local MongoDB. All form submissions will be saved to the cloud and accessible from anywhere!

### Benefits:
- ✅ Cloud-hosted (no local MongoDB needed)
- ✅ Automatic backups
- ✅ Scalable
- ✅ Accessible from anywhere
- ✅ Free tier available

---

## 📞 Need Help?

If you encounter any issues:
1. Check the server console for error messages
2. Verify `.env.local` has the correct connection string
3. Ensure MongoDB Atlas Network Access allows your IP
4. Check that the database name is `godrej-reserve`

---

**Last Updated:** 2025-11-21
**Status:** ✅ Ready to Use
