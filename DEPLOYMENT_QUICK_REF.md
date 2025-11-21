# 🚀 Quick Deployment Reference Card

## Environment Variables to Add in Vercel

Copy and paste these into Vercel's Environment Variables section:

### 1. MongoDB Atlas (REQUIRED)
```
MONGODB_URI
mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority
```

### 2. SMTP Email (Optional)
```
SMTP_HOST
smtp.gmail.com

SMTP_PORT
587

SMTP_SECURE
false

SMTP_USER
dhumalajinkya2004@gmail.com

SMTP_PASS
atah kucy fomd risu

SMTP_FROM
Godrej Reserve <dhumalajinkya2004@gmail.com>

NOTIFICATION_EMAIL
sales@godrejreserve.com
```

---

## 3-Step Deployment Process

### Step 1: Go to Vercel
https://vercel.com/new

### Step 2: Import Repository
Search for: **Ajinkyaa2004/Godrej-Properties**

### Step 3: Add Environment Variables
Paste the MONGODB_URI above, then click **Deploy**

---

## Post-Deployment Test Checklist

- [ ] Visit your live URL
- [ ] Submit contact form
- [ ] Check MongoDB Atlas for new entry
- [ ] Test on mobile device
- [ ] Check browser console for errors

---

## Your URLs After Deployment

- **Live Site:** https://godrej-properties-[random].vercel.app
- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com

---

## Need Help?

See **VERCEL_DEPLOYMENT_GUIDE.md** for detailed instructions.
