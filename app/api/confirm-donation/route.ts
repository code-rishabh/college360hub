import { NextRequest, NextResponse } from 'next/server'
import { DatabaseManager } from '@/lib/database-postgres'
import { sendEmail, generateDonationConfirmationEmail } from '@/lib/email'

const db = new DatabaseManager()

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ['donor_name', 'donor_email', 'tickets_donated', 'total_amount', 'payment_intent_id']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Create donation record
    const donation = await db.createDonation({
      donor_name: data.donor_name,
      donor_email: data.donor_email,
      tickets_donated: parseInt(data.tickets_donated),
      total_amount: parseFloat(data.total_amount),
      payment_status: 'completed',
      stripe_payment_intent: data.payment_intent_id,
      created_at: new Date().toISOString()
    })

    // Send confirmation email
    try {
      const emailData = generateDonationConfirmationEmail({
        donor_name: data.donor_name,
        donor_email: data.donor_email,
        tickets_donated: parseInt(data.tickets_donated),
        total_amount: parseFloat(data.total_amount),
        donation_id: donation.id?.toString() || 'N/A'
      })

      await sendEmail({
        to: data.donor_email,
        subject: emailData.subject,
        html: emailData.html
      })
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Don't fail the donation if email fails
    }

    return NextResponse.json({ success: true, donation_id: donation.id })
  } catch (error) {
    console.error('Donation confirmation error:', error)
    return NextResponse.json(
      { error: 'Failed to confirm donation' },
      { status: 500 }
    )
  }
}
