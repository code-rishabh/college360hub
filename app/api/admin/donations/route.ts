import { NextResponse } from 'next/server'
import { DatabaseManager } from '@/lib/database-postgres'

const db = new DatabaseManager()

export async function GET() {
  try {
    const donations = await db.getDonations()
    return NextResponse.json(donations)
  } catch (error) {
    console.error('Error fetching donations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    )
  }
}
