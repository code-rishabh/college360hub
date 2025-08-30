import { NextResponse } from 'next/server'

export async function GET() {
  const times = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM', 
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM'
  ]
  return NextResponse.json(times)
}
