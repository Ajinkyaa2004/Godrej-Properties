import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// Force dynamic to ensure we always get fresh data
export const dynamic = 'force-dynamic';

const DB_NAME = 'godrej-reserve';
const COLLECTION_NAME = 'schedule-visits';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Fetch all visits, sorted by submission time (newest first)
        const visits = await collection
            .find({})
            .sort({ submittedAt: -1 })
            .toArray();

        // Transform _id to string and ensure dates are ISO strings
        const cleanVisits = visits.map(visit => ({
            ...visit,
            _id: visit._id.toString(),
            submittedAt: visit.submittedAt ? new Date(visit.submittedAt).toISOString() : null,
            preferredDate: visit.preferredDate ? new Date(visit.preferredDate).toISOString() : null,
        }));

        return NextResponse.json(cleanVisits, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });

    } catch (error) {
        console.error('Failed to fetch visits:', error);
        return NextResponse.json(
            { error: 'Failed to fetch visits' },
            { status: 500 }
        );
    }
}
