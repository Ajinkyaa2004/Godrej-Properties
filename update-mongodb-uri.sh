#!/bin/bash

# MongoDB Atlas Connection String Update Script
# This script will help you update your .env.local file with the MongoDB Atlas connection string

echo "🔧 MongoDB Atlas Connection String Updater"
echo "=========================================="
echo ""

ENV_FILE=".env.local"

# Backup existing .env.local
if [ -f "$ENV_FILE" ]; then
    cp "$ENV_FILE" "${ENV_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
    echo "✅ Backed up existing .env.local"
fi

# MongoDB Atlas connection string
MONGODB_URI="mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority"

# Check if MONGODB_URI already exists in .env.local
if grep -q "^MONGODB_URI=" "$ENV_FILE" 2>/dev/null; then
    echo "📝 Updating existing MONGODB_URI..."
    # Use sed to replace the line (macOS compatible)
    sed -i '' "s|^MONGODB_URI=.*|MONGODB_URI=$MONGODB_URI|" "$ENV_FILE"
    echo "✅ Updated MONGODB_URI in $ENV_FILE"
else
    echo "📝 Adding MONGODB_URI to $ENV_FILE..."
    echo "" >> "$ENV_FILE"
    echo "# MongoDB Atlas Connection" >> "$ENV_FILE"
    echo "MONGODB_URI=$MONGODB_URI" >> "$ENV_FILE"
    echo "✅ Added MONGODB_URI to $ENV_FILE"
fi

echo ""
echo "=========================================="
echo "✅ MongoDB Atlas connection string configured!"
echo ""
echo "📋 Next Steps:"
echo "1. Restart your development server:"
echo "   - Press Ctrl+C to stop the current server"
echo "   - Run: npm run dev"
echo ""
echo "2. Test the connection by submitting a form"
echo ""
echo "3. Verify data in MongoDB Atlas using:"
echo "   - MongoDB Compass"
echo "   - Or mongosh command line"
echo ""
echo "=========================================="
