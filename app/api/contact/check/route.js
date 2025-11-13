import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);
const clientPromise = client.connect();

const DB_NAME = 'godrej-reserve';
const COLLECTION_NAME = 'contacts';

export async function POST(request) {
  try {
    if (!MONGODB_URI) {
      return NextResponse.json({ exists: false, error: 'Database not configured' });
    }

    const { email, phoneNumber, ipAddress } = await request.json();
    
    // Connect to MongoDB
    await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Check if user already exists by email, phone, or IP
    const existingContact = await collection.findOne({
      $or: [
        { email: email?.toLowerCase().trim() },
        { phoneNumber: phoneNumber?.trim() },
        { ipAddress: ipAddress }
      ]
    });

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
