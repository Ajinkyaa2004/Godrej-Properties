# MongoDB Connection - Setup Complete! ✅

## Current Status
✅ **MongoDB is connected and working!**

### Database Details
- **Database Name:** `godrej-reserve`
- **Connection URI:** `mongodb://localhost:27017/godrej-reserve`
- **MongoDB Version:** 8.0.1
- **Status:** Running locally

### Collections
1. **contacts** - 2 documents
   - Stores contact form submissions
   - Fields: firstName, lastName, email, phoneNumber, country, etc.

2. **schedule-visits** - 4 documents  
   - Stores site visit bookings
   - Fields: fullName, phoneNumber, preferredDate, preferredTime, etc.

### API Endpoints

#### 1. Contact Form API
- **POST** `/api/contact`
  - Saves contact form submissions
  - Sends confirmation email (if SMTP configured)
  - Checks for duplicates by email/phone
  
- **GET** `/api/contact?page=1&limit=50`
  - Retrieves all contacts with pagination

#### 2. Contact Check API
- **POST** `/api/contact/check`
  - Checks if contact already exists
  - Used to prevent duplicate submissions

#### 3. Schedule Visit API
- **POST** `/api/schedule-visit`
  - Saves site visit bookings
  - Sends confirmation email (if SMTP configured)

- **GET** `/api/schedule-visit?page=1&limit=50`
  - Retrieves all visit bookings

### Files Created/Modified

#### 1. `/lib/mongodb.js` ✅ NEW
- Reusable MongoDB connection utility
- Connection pooling for better performance

#### 2. `.env.local` ✅ EXISTS
- MongoDB URI configuration
- SMTP email settings (optional)

#### 3. API Routes Updated
- `/app/api/contact/route.js` - Added `connectToDatabase()` function
- `/app/api/contact/check/route.js` - Already has connection
- `/app/api/schedule-visit/route.js` - Added `connectToDatabase()` function

#### 4. Test Script
- `test-mongodb.js` - Connection test utility

## How to Use

### Test Connection
```bash
node test-mongodb.js
```

### View Data in MongoDB Compass
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `godrej-reserve`
4. View collections: `contacts` and `schedule-visits`

### View Data via Terminal
```bash
# Connect to MongoDB shell
mongosh

# Switch to database
use godrej-reserve

# View all contacts
db.contacts.find().pretty()

# View all visits
db['schedule-visits'].find().pretty()

# Count documents
db.contacts.countDocuments()
db['schedule-visits'].countDocuments()
```

### API Testing

#### Submit Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",
    "countryCode": "+91",
    "fullPhoneNumber": "+911234567890",
    "country": "India"
  }'
```

#### Get All Contacts
```bash
curl http://localhost:3000/api/contact?page=1&limit=10
```

#### Schedule a Visit
```bash
curl -X POST http://localhost:3000/api/schedule-visit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "phoneNumber": "1234567890",
    "countryCode": "+91",
    "fullPhoneNumber": "+911234567890",
    "country": "India",
    "preferredDate": "2025-11-20",
    "preferredTime": "10:00 AM - 12:00 PM"
  }'
```

## Email Configuration (Optional)

Your `.env.local` already has SMTP configured:
- **Service:** Gmail
- **Email:** dhumalajinkya2004@gmail.com
- **Status:** Ready to send confirmation emails

## Next Steps

1. ✅ MongoDB connected successfully
2. ✅ Collections created automatically
3. ✅ API routes working
4. ✅ Email notifications configured

Your forms are now saving data to MongoDB and sending confirmation emails! 🎉

## Troubleshooting

### If MongoDB is not running:
```bash
brew services start mongodb-community
```

### If connection fails:
1. Check if MongoDB is running: `mongosh`
2. Verify `.env.local` has correct MONGODB_URI
3. Restart Next.js dev server: `npm run dev`

### View Logs:
- Check browser console for frontend errors
- Check terminal for API/database errors
- MongoDB logs: `/opt/homebrew/var/log/mongodb/mongo.log`
