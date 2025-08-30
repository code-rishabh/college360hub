import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail(emailData: EmailData) {
  try {
    const { data, error } = await resend.emails.send({
      from: '360 Hub Experience <noreply@college360hub.com>',
      ...emailData,
    })

    if (error) {
      console.error('Email sending error:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}

export function generateBookingConfirmationEmail(data: {
  name: string
  email: string
  location: string
  date: string
  time_slot: string
  participants: number
  total_amount: number
  booking_id: string
}) {
  const subject = `Booking Confirmation - 360 Hub Experience`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #3b82f6; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 360 Hub Experience</h1>
          <p>Your College Tour is Confirmed!</p>
        </div>
        
        <div class="content">
          <h2>Hello ${data.name},</h2>
          <p>Thank you for booking your 360 Hub Experience! Your tour has been confirmed and we're excited to show you around.</p>
          
          <div class="details">
            <h3>📋 Booking Details</h3>
            <p><strong>Booking ID:</strong> ${data.booking_id}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time_slot}</p>
            <p><strong>Participants:</strong> ${data.participants}</p>
            <p><strong>Total Amount:</strong> $${data.total_amount.toLocaleString()}</p>
          </div>
          
          <h3>📍 What to Expect</h3>
          <ul>
            <li>Arrive 15 minutes before your scheduled time</li>
            <li>Bring comfortable walking shoes</li>
            <li>Bring a water bottle</li>
            <li>Feel free to ask questions!</li>
          </ul>
          
          <h3>❓ Questions?</h3>
          <p>If you have any questions or need to make changes, please contact us at support@college360hub.com</p>
          
          <a href="https://college360hub.com" class="button">Visit Our Website</a>
        </div>
        
        <div class="footer">
          <p>360 Hub Experience<br>
          Making college tours accessible to all students</p>
        </div>
      </div>
    </body>
    </html>
  `

  return { subject, html }
}

export function generateDonationConfirmationEmail(data: {
  donor_name: string
  donor_email: string
  tickets_donated: number
  total_amount: number
  donation_id: string
}) {
  const subject = `Thank You for Your Generous Donation - 360 Hub Experience`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Donation Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .impact { background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>❤️ 360 Hub Experience</h1>
          <p>Thank You for Your Generous Donation!</p>
        </div>
        
        <div class="content">
          <h2>Hello ${data.donor_name},</h2>
          <p>Thank you for your generous donation to the 360 Hub Experience! Your contribution will make a real difference in students' lives.</p>
          
          <div class="details">
            <h3>📋 Donation Details</h3>
            <p><strong>Donation ID:</strong> ${data.donation_id}</p>
            <p><strong>Tickets Donated:</strong> ${data.tickets_donated}</p>
            <p><strong>Total Amount:</strong> $${data.total_amount.toLocaleString()}</p>
          </div>
          
          <div class="impact">
            <h3>🌟 Your Impact</h3>
            <p>With your donation of ${data.tickets_donated} ticket${data.tickets_donated > 1 ? 's' : ''}, you're providing:</p>
            <ul>
              <li>Access to college tours for ${data.tickets_donated} student${data.tickets_donated > 1 ? 's' : ''}</li>
              <li>Life-changing experiences that could shape their future</li>
              <li>Opportunities for students who might not otherwise afford it</li>
            </ul>
          </div>
          
          <h3>📧 Stay Connected</h3>
          <p>We'll keep you updated on how your donation is making a difference. You'll receive stories and updates about the students benefiting from your generosity.</p>
          
          <a href="https://college360hub.com" class="button">Learn More About Our Mission</a>
        </div>
        
        <div class="footer">
          <p>360 Hub Experience<br>
          Making college tours accessible to all students<br>
          Thank you for being part of our mission!</p>
        </div>
      </div>
    </body>
    </html>
  `

  return { subject, html }
}
