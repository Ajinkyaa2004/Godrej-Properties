// Test MongoDB Connection
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'godrej-reserve';

async function testConnection() {
  console.log('🔄 Testing MongoDB connection...\n');
  
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    console.error('Please create .env.local with: MONGODB_URI=mongodb://localhost:27017/godrej-reserve');
    process.exit(1);
  }

  console.log('✅ MONGODB_URI found:', MONGODB_URI);

  let client;
  try {
    // Connect to MongoDB
    console.log('\n🔄 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');

    // Get database
    const db = client.db(DB_NAME);
    console.log(`✅ Using database: ${DB_NAME}`);

    // List collections
    const collections = await db.listCollections().toArray();
    console.log(`\n📦 Collections in ${DB_NAME}:`);
    if (collections.length === 0) {
      console.log('   (No collections yet - will be created on first insert)');
    } else {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }

    // Test contacts collection
    const contactsCollection = db.collection('contacts');
    const contactCount = await contactsCollection.countDocuments();
    console.log(`\n👥 Contacts: ${contactCount} documents`);

    // Test schedule-visits collection
    const visitsCollection = db.collection('schedule-visits');
    const visitCount = await visitsCollection.countDocuments();
    console.log(`📅 Schedule Visits: ${visitCount} documents`);

    // Show recent contacts
    if (contactCount > 0) {
      console.log('\n📋 Recent contacts:');
      const recentContacts = await contactsCollection
        .find({})
        .sort({ submittedAt: -1 })
        .limit(3)
        .toArray();
      
      recentContacts.forEach((contact, idx) => {
        console.log(`   ${idx + 1}. ${contact.firstName} ${contact.lastName} (${contact.email})`);
      });
    }

    console.log('\n✅ MongoDB connection test successful!\n');

  } catch (error) {
    console.error('\n❌ MongoDB connection failed:');
    console.error(error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔒 Connection closed\n');
    }
  }
}

testConnection();
