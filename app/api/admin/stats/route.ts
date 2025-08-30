import { NextResponse } from 'next/server'
import { DatabaseManager } from '@/lib/database-postgres'

const db = new DatabaseManager()

export async function GET() {
  try {
    const [bookingStats, donationStats, locationStats] = await Promise.all([
      db.getBookingStats(),
      db.getDonationStats(),
      db.getLocationStats()
    ])

    const stats = {
      total_bookings: bookingStats?.total_bookings || 0,
      total_donations: donationStats?.total_donations || 0,
      total_revenue: bookingStats?.total_revenue || 0,
      total_donated: donationStats?.total_donated || 0,
      location_stats: locationStats || []
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
