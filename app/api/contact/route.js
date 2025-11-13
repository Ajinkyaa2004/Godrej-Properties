import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// MongoDB configuration - REQUIRED
const MONGODB_URI = process.env.MONGODB_URI;

console.log('MongoDB URI check:', MONGODB_URI ? 'Found' : 'Missing');

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing from .env.local file');
  console.error('Please create .env.local file with: MONGODB_URI=mongodb://localhost:27017/godrej-reserve');
}

let client, clientPromise;

if (MONGODB_URI) {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

const DB_NAME = 'godrej-reserve';
const COLLECTION_NAME = 'contacts';

export async function POST(request) {
  try {
    // Check if MongoDB is configured
    if (!MONGODB_URI) {
      return NextResponse.json(
        { 
          error: 'MongoDB not configured', 
          message: 'Please create .env.local file with MONGODB_URI=mongodb://localhost:27017/godrej-reserve',
          setup: 'Check the env-setup.md file for instructions'
        },
        { status: 500 }
      );
    }
    const data = await request.json();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'country'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Phone validation
    const phoneRegex = /^[+]?[0-9]{7,15}$/;
    if (!phoneRegex.test(data.fullPhoneNumber || data.phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Prepare contact document for MongoDB
    const contactDocument = {
      // Personal Information
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.toLowerCase().trim(),
      countryCode: data.countryCode,
      phoneNumber: data.phoneNumber.trim(),
      fullPhoneNumber: data.fullPhoneNumber,
      country: data.country,

      // Hidden/Tracking Fields
      sourcePage: data.sourcePage,
      referrer: data.referrer,
      userAgent: data.userAgent,
      deviceType: data.deviceType,
      utmParams: data.utmParams || {},

      // Metadata
      submittedAt: new Date(),
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown',
      
      // Additional tracking
      timestamp: data.timestamp,
      formVersion: '1.0',
      source: 'website-auto-popup-form',
    };

    // Connect to MongoDB and save contact
    await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Check for duplicate email (optional - update existing or create new)
    const existingContact = await collection.findOne({ email: contactDocument.email });
    
    if (existingContact) {
      // Update existing contact with new information
      const updateResult = await collection.updateOne(
        { email: contactDocument.email },
        { 
          $set: {
            ...contactDocument,
            updatedAt: new Date(),
            submissionCount: (existingContact.submissionCount || 1) + 1
          }
        }
      );

      return NextResponse.json({
        success: true,
        message: 'Contact updated successfully in MongoDB',
        id: existingContact._id,
        updated: true,
        submissionCount: (existingContact.submissionCount || 1) + 1
      });
    } else {
      // Insert new contact
      contactDocument.submissionCount = 1;
      const insertResult = await collection.insertOne(contactDocument);

      return NextResponse.json({
        success: true,
        message: 'Contact saved successfully to MongoDB',
        id: insertResult.insertedId,
        updated: false,
        submissionCount: 1
      });
    }

  } catch (error) {
    console.error('Database error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 50;
    const skip = (page - 1) * limit;

    // Connect to MongoDB
    await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Get contacts from MongoDB
    const contacts = await collection
      .find({})
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments();

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      message: `Retrieved ${contacts.length} contacts from MongoDB`
    });

  } catch (error) {
    console.error('MongoDB error:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve contacts from MongoDB' },
      { status: 500 }
    );
  }
}
