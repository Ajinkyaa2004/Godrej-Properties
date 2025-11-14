import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// MongoDB configuration - REQUIRED
const MONGODB_URI = process.env.MONGODB_URI;

// Email configuration (optional - for sending confirmation emails)
const SMTP_ENABLED = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

// Send confirmation email (if SMTP is configured)
async function sendConfirmationEmail(contactData) {
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

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: contactData.email,
      subject: 'Thank you for your interest in Godrej Reserve',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #d97706; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Godrej Reserve</h1>
            </div>
            <div class="content">
              <p>Dear ${contactData.firstName} ${contactData.lastName},</p>
              <p>Thank you for your interest in <strong>Godrej Reserve</strong>. We have received your inquiry and our team will be in touch with you shortly.</p>
              
              <h3>Your Details:</h3>
              <ul>
                <li><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</li>
                <li><strong>Email:</strong> ${contactData.email}</li>
                <li><strong>Phone:</strong> ${contactData.fullPhoneNumber}</li>
                <li><strong>Country:</strong> ${contactData.country}</li>
              </ul>
              
              <p>Our property consultant will reach out to you within 24 hours with comprehensive details about the property, pricing, and available units.</p>
              
              <p style="text-align: center;">
                <a href="${contactData.sourcePage || 'https://godrejreserve.com'}" class="button">Visit Our Website</a>
              </p>
              
              <p>If you have any immediate questions, please feel free to reply to this email.</p>
              
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
    console.log('✅ Confirmation email sent to:', contactData.email);
    return { sent: true };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { sent: false, error: error.message };
  }
}

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
    const { db } = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);

    // Check for duplicate email (optional - update existing or create new)
    const existingContact = await collection.findOne({ email: contactDocument.email });
    
    let emailResult = { sent: false };
    
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

      // Send confirmation email for updates too
      emailResult = await sendConfirmationEmail(contactDocument);

      return NextResponse.json({
        success: true,
        message: 'Contact updated successfully in MongoDB',
        id: existingContact._id,
        updated: true,
        submissionCount: (existingContact.submissionCount || 1) + 1,
        emailSent: emailResult.sent
      });
    } else {
      // Insert new contact
      contactDocument.submissionCount = 1;
      const insertResult = await collection.insertOne(contactDocument);

      // Send confirmation email to new contact
      emailResult = await sendConfirmationEmail(contactDocument);

      return NextResponse.json({
        success: true,
        message: 'Contact saved successfully to MongoDB',
        id: insertResult.insertedId,
        updated: false,
        submissionCount: 1,
        emailSent: emailResult.sent
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
    const { db } = await connectToDatabase();
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
