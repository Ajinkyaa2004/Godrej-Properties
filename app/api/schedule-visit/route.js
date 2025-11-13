import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// MongoDB configuration - REQUIRED
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing from .env.local file');
}

let client, clientPromise;

if (MONGODB_URI) {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

const DB_NAME = 'godrej-reserve';
const COLLECTION_NAME = 'schedule-visits'; // Separate collection for visit bookings

export async function POST(request) {
  try {
    // Check if MongoDB is configured
    if (!MONGODB_URI) {
      return NextResponse.json(
        { 
          error: 'MongoDB not configured', 
          message: 'Please create .env.local file with MONGODB_URI'
        },
        { status: 500 }
      );
    }

    const data = await request.json();

    // Validate required fields
    const requiredFields = ['fullName', 'phoneNumber', 'preferredDate', 'country'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
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

    // Date validation
    const preferredDate = new Date(data.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (preferredDate < today) {
      return NextResponse.json(
        { error: 'Preferred date must be today or in the future' },
        { status: 400 }
      );
    }

    // Prepare visit document for MongoDB
    const visitDocument = {
      // Personal Information
      fullName: data.fullName.trim(),
      countryCode: data.countryCode,
      phoneNumber: data.phoneNumber.trim(),
      fullPhoneNumber: data.fullPhoneNumber,
      preferredDate: data.preferredDate,
      country: data.country,

      // Hidden/Tracking Fields
      sourcePage: data.sourcePage,
      referrer: data.referrer,
      userAgent: data.userAgent,
      deviceType: data.deviceType,

      // Metadata
      submittedAt: new Date(),
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown',
      
      // Additional tracking
      timestamp: data.timestamp,
      formVersion: '1.0',
      source: 'website-schedule-visit-form',
      status: 'pending', // pending, confirmed, completed, cancelled
    };

    // Connect to MongoDB and save visit
    await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Check for duplicate visit request (same phone + same date)
    const existingVisit = await collection.findOne({
      $and: [
        { 
          $or: [
            { phoneNumber: visitDocument.phoneNumber },
            { fullPhoneNumber: visitDocument.fullPhoneNumber }
          ]
        },
        { preferredDate: visitDocument.preferredDate }
      ]
    });
    
    if (existingVisit) {
      return NextResponse.json({
        success: false,
        message: 'A visit is already scheduled for this date with this phone number',
        existingVisit: {
          id: existingVisit._id,
          preferredDate: existingVisit.preferredDate,
          status: existingVisit.status
        }
      }, { status: 409 });
    }

    // Insert new visit request
    const insertResult = await collection.insertOne(visitDocument);

    return NextResponse.json({
      success: true,
      message: 'Visit scheduled successfully',
      visitId: insertResult.insertedId,
      preferredDate: visitDocument.preferredDate,
      status: 'pending'
    });

  } catch (error) {
    console.error('Schedule visit database error:', error);
    
    return NextResponse.json(
      { error: 'Failed to schedule visit. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 50;
    const status = searchParams.get('status'); // pending, confirmed, completed, cancelled
    const skip = (page - 1) * limit;

    // Connect to MongoDB
    await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Build query
    let query = {};
    if (status) {
      query.status = status;
    }

    // Get visits from MongoDB
    const visits = await collection
      .find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(query);

    // Get status counts
    const statusCounts = await collection.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]).toArray();

    return NextResponse.json({
      success: true,
      data: visits,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      statusCounts: statusCounts.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      message: `Retrieved ${visits.length} visit requests from MongoDB`
    });

  } catch (error) {
    console.error('MongoDB error:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve visit requests from MongoDB' },
      { status: 500 }
    );
  }
}
