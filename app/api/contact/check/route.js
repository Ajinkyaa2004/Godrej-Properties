import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'godrej-reserve';
const COLLECTION_NAME = 'contacts';

// Lazy connection function
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function POST(request) {
  try {
    if (!MONGODB_URI) {
      return NextResponse.json({ exists: false, error: 'Database not configured' });
    }

    const { email, phoneNumber, ipAddress } = await request.json();
    
    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);

    // Check if contact exists by email or phone number
    const orConditions = [];
    if (email && typeof email === 'string') {
      orConditions.push({ email: email.toLowerCase().trim() });
    }
    if (phoneNumber && typeof phoneNumber === 'string') {
      orConditions.push({ phoneNumber: phoneNumber.trim() });
    }
    
    if (orConditions.length === 0) {
      return NextResponse.json({
        exists: false,
        message: 'No valid identifiers provided'
      });
    }
    
    const query = { $or: orConditions };
    
    const existingContact = await collection.findOne(query);

    if (existingContact) {
      return NextResponse.json({
        exists: true,
        message: 'Your details have already been submitted',
        submittedAt: existingContact.submittedAt,
        email: existingContact.email
      });
    }

    return NextResponse.json({
      exists: false,
      message: 'No previous submission found'
    });

  } catch (error) {
    console.error('Database check error:', error);
    return NextResponse.json({ 
      exists: false, 
      error: 'Failed to check database' 
    });
  }
}
