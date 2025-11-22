import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// Force dynamic to ensure we always get fresh data
export const dynamic = 'force-dynamic';

const DB_NAME = 'godrej-reserve';
const COLLECTION_NAME = 'contacts';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Fetch all contacts, sorted by submission time (newest first)
        const contacts = await collection
            .find({})
            .sort({ submittedAt: -1 })
            .toArray();

        // Transform _id to string and ensure dates are ISO strings
        const cleanContacts = contacts.map(contact => ({
            ...contact,
            _id: contact._id.toString(),
            submittedAt: contact.submittedAt ? new Date(contact.submittedAt).toISOString() : null,
            updatedAt: contact.updatedAt ? new Date(contact.updatedAt).toISOString() : null,
        }));

        return NextResponse.json(cleanContacts, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });

    } catch (error) {
        console.error('Failed to fetch contacts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}
