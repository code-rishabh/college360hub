import { sql } from '@vercel/postgres'

interface Booking {
  id?: number
  name: string
  email: string
  phone: string
  location: string
  date: string
  time_slot: string
  participants: number
  total_amount: number
  payment_status: string
  stripe_payment_intent?: string
  created_at: string
}

interface Donation {
  id?: number
  donor_name: string
  donor_email: string
  tickets_donated: number
  total_amount: number
  payment_status: string
  stripe_payment_intent?: string
  created_at: string
}

export class DatabaseManager {
  constructor() {
    this.init()
  }

  private async init() {
    try {
      // Create bookings table
      await sql`
        CREATE TABLE IF NOT EXISTS bookings (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          location VARCHAR(100) NOT NULL,
          date VARCHAR(20) NOT NULL,
          time_slot VARCHAR(50) NOT NULL,
          participants INTEGER NOT NULL,
          total_amount DECIMAL(10,2) NOT NULL,
          payment_status VARCHAR(50) NOT NULL,
          stripe_payment_intent VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `

      // Create donations table
      await sql`
        CREATE TABLE IF NOT EXISTS donations (
          id SERIAL PRIMARY KEY,
          donor_name VARCHAR(255) NOT NULL,
          donor_email VARCHAR(255) NOT NULL,
          tickets_donated INTEGER NOT NULL,
          total_amount DECIMAL(10,2) NOT NULL,
          payment_status VARCHAR(50) NOT NULL,
          stripe_payment_intent VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
    } catch (error) {
      console.error('Database initialization error:', error)
    }
  }

  async createBooking(booking: Booking) {
    try {
      const result = await sql`
        INSERT INTO bookings (name, email, phone, location, date, time_slot, participants, total_amount, payment_status, stripe_payment_intent, created_at)
        VALUES (${booking.name}, ${booking.email}, ${booking.phone}, ${booking.location}, ${booking.date}, ${booking.time_slot}, ${booking.participants}, ${booking.total_amount}, ${booking.payment_status}, ${booking.stripe_payment_intent}, ${booking.created_at})
        RETURNING id
      `
      
      return { ...booking, id: result.rows[0].id }
    } catch (error) {
      console.error('Create booking error:', error)
      throw error
    }
  }

  async createDonation(donation: Donation) {
    try {
      const result = await sql`
        INSERT INTO donations (donor_name, donor_email, tickets_donated, total_amount, payment_status, stripe_payment_intent, created_at)
        VALUES (${donation.donor_name}, ${donation.donor_email}, ${donation.tickets_donated}, ${donation.total_amount}, ${donation.payment_status}, ${donation.stripe_payment_intent}, ${donation.created_at})
        RETURNING id
      `
      
      return { ...donation, id: result.rows[0].id }
    } catch (error) {
      console.error('Create donation error:', error)
      throw error
    }
  }

  async getBookings(): Promise<Booking[]> {
    try {
      const result = await sql`
        SELECT * FROM bookings ORDER BY created_at DESC
      `
      return result.rows as Booking[]
    } catch (error) {
      console.error('Get bookings error:', error)
      return []
    }
  }

  async getDonations(): Promise<Donation[]> {
    try {
      const result = await sql`
        SELECT * FROM donations ORDER BY created_at DESC
      `
      return result.rows as Donation[]
    } catch (error) {
      console.error('Get donations error:', error)
      return []
    }
  }

  async getBookingStats() {
    try {
      const result = await sql`
        SELECT 
          COUNT(*) as total_bookings,
          COALESCE(SUM(total_amount), 0) as total_revenue,
          COALESCE(SUM(participants), 0) as total_participants
        FROM bookings 
        WHERE payment_status = 'completed'
      `
      return result.rows[0]
    } catch (error) {
      console.error('Get booking stats error:', error)
      return { total_bookings: 0, total_revenue: 0, total_participants: 0 }
    }
  }

  async getDonationStats() {
    try {
      const result = await sql`
        SELECT 
          COUNT(*) as total_donations,
          COALESCE(SUM(total_amount), 0) as total_donated,
          COALESCE(SUM(tickets_donated), 0) as total_tickets_donated
        FROM donations 
        WHERE payment_status = 'completed'
      `
      return result.rows[0]
    } catch (error) {
      console.error('Get donation stats error:', error)
      return { total_donations: 0, total_donated: 0, total_tickets_donated: 0 }
    }
  }

  async getLocationStats() {
    try {
      const result = await sql`
        SELECT 
          location,
          COUNT(*) as bookings,
          COALESCE(SUM(participants), 0) as total_participants,
          COALESCE(SUM(total_amount), 0) as revenue
        FROM bookings 
        WHERE payment_status = 'completed'
        GROUP BY location
      `
      return result.rows
    } catch (error) {
      console.error('Get location stats error:', error)
      return []
    }
  }
}
