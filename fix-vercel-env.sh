#!/bin/bash

# Fix Vercel Environment Variables
# This script removes corrupted variables and adds the correct MONGODB_URI

echo "🔧 Fixing Vercel Environment Variables..."
echo ""

# Remove corrupted variables
echo "📝 Step 1: Removing corrupted variables..."

# Note: You'll need to confirm each removal
vercel env rm Name production
vercel env rm Name preview  
vercel env rm Name development

vercel env rm Value production
vercel env rm Value preview
vercel env rm Value development

vercel env rm Environments production
vercel env rm Environments preview
vercel env rm Environments development

echo ""
echo "✅ Corrupted variables removed"
echo ""

# Check if MONGODB_URI already exists
echo "📝 Step 2: Checking existing MONGODB_URI..."
vercel env ls | grep MONGODB_URI

echo ""
echo "📝 Step 3: Now add MONGODB_URI manually..."
echo ""
echo "Run these commands ONE AT A TIME:"
echo ""
echo "vercel env add MONGODB_URI production"
echo "# Paste: mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority"
echo ""
echo "vercel env add MONGODB_URI preview"
echo "# Paste: mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority"
echo ""
echo "vercel env add MONGODB_URI development"
echo "# Paste: mongodb+srv://dhumalajinkya2004_db_user:Ajinkya_2004@projects.rkmjjpd.mongodb.net/godrej-reserve?retryWrites=true&w=majority"
echo ""
echo "Then deploy:"
echo "vercel --prod"
