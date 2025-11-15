import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// MongoDB configuration - REQUIRED
const MONGODB_URI = process.env.MONGODB_URI;

// Email configuration (optional - for sending confirmation emails)
const SMTP_ENABLED = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

// Send visit confirmation email (if SMTP is configured)
async function sendVisitConfirmationEmail(visitData) {
  if (!SMTP_ENABLED) {
    console.log('📧 SMTP not configured - skipping email send');
    return { sent: false, reason: 'SMTP not configured' };
  }

  try {
    const nodemailer = (await import('nodemailer')).default;
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Parse email from fullName or use a default contact method
    const recipientEmail = visitData.email || process.env.NOTIFICATION_EMAIL;
    
    if (!recipientEmail) {
      console.log('⚠️ No recipient email available for visit confirmation');
      return { sent: false, reason: 'No recipient email' };
    }

    const visitDate = new Date(visitData.preferredDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipientEmail,
      subject: 'Visit Scheduled - Godrej Reserve',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .highlight { background: #fff7ed; padding: 15px; border-left: 4px solid #d97706; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Visit Scheduled</h1>
            </div>
            <div class="content">
              <p>Dear ${visitData.fullName},</p>
              <p>Your property visit has been successfully scheduled for <strong>Godrej Reserve</strong>.</p>
              
              <div class="highlight">
                <h3 style="margin-top: 0;">Visit Details:</h3>
                <ul style="margin-bottom: 0;">
                  <li><strong>Date:</strong> ${visitDate}</li>
                  <li><strong>Name:</strong> ${visitData.fullName}</li>
                  <li><strong>Phone:</strong> ${visitData.fullPhoneNumber}</li>
                  <li><strong>Country:</strong> ${visitData.country}</li>
                </ul>
              </div>
              
              <p>Our property consultant will contact you at <strong>${visitData.fullPhoneNumber}</strong> within 24 hours to confirm the exact time and provide you with:</p>
              <ul>
                <li>Detailed visit schedule</li>
                <li>Location and directions</li>
                <li>What to expect during your visit</li>
                <li>Property documentation to review</li>
              </ul>
              
              <p><strong>Important:</strong> If you need to reschedule or have any questions, please contact us immediately.</p>
              
              <p>We look forward to showing you your future home!</p>
              
              <p>Best regards,<br>
              <strong>Godrej Reserve Sales Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Visit confirmation email sent to:', recipientEmail);
    return { sent: true };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { sent: false, error: error.message };
  }
}

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
    const { db } = await connectToDatabase();
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

    // Send confirmation email
    const emailResult = await sendVisitConfirmationEmail(visitDocument);

    return NextResponse.json({
      success: true,
      message: 'Visit scheduled successfully',
      visitId: insertResult.insertedId,
      preferredDate: visitDocument.preferredDate,
      status: 'pending',
      emailSent: emailResult.sent
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
    const { db } = await connectToDatabase();
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
