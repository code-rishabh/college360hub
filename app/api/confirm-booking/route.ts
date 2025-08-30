import { NextRequest, NextResponse } from 'next/server'
import { DatabaseManager } from '@/lib/database-postgres'
import { sendEmail, generateBookingConfirmationEmail } from '@/lib/email'

const db = new DatabaseManager()

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'location', 'date', 'time_slot', 'participants', 'total_amount', 'payment_intent_id']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Create booking record
    const booking = await db.createBooking({
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      date: data.date,
      time_slot: data.time_slot,
      participants: parseInt(data.participants),
      total_amount: parseFloat(data.total_amount),
      payment_status: 'completed',
      stripe_payment_intent: data.payment_intent_id,
      created_at: new Date().toISOString()
    })

    // Send confirmation email
    try {
      const emailData = generateBookingConfirmationEmail({
        name: data.name,
        email: data.email,
        location: data.location,
        date: data.date,
        time_slot: data.time_slot,
        participants: parseInt(data.participants),
        total_amount: parseFloat(data.total_amount),
        booking_id: booking.id?.toString() || 'N/A'
      })

      await sendEmail({
        to: data.email,
        subject: emailData.subject,
        html: emailData.html
      })
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Don't fail the booking if email fails
    }

    return NextResponse.json({ success: true, booking_id: booking.id })
  } catch (error) {
    console.error('Booking confirmation error:', error)
    return NextResponse.json(
      { error: 'Failed to confirm booking' },
      { status: 500 }
    )
  }
}
