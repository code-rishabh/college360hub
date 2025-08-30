import { Pool } from 'pg'

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
  private pool: Pool

  constructor() {
    // Use local Postgres or environment variables
    this.pool = new Pool({
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      database: process.env.POSTGRES_DATABASE || '360hub_local',
      user: process.env.POSTGRES_USERNAME || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
    })
    
    this.init()
  }

  private async init() {
    try {
      // Create bookings table
      await this.pool.query(`
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
      `)

      // Create donations table
      await this.pool.query(`
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
      `)

      console.log('✅ Local Postgres database initialized successfully')
    } catch (error) {
      console.error('❌ Local Postgres initialization error:', error)
      console.log('💡 Make sure you have Postgres running locally or set environment variables')
    }
  }

  async createBooking(booking: Booking) {
    try {
      const result = await this.pool.query(`
        INSERT INTO bookings (name, email, phone, location, date, time_slot, participants, total_amount, payment_status, stripe_payment_intent, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id
      `, [
        booking.name,
        booking.email,
        booking.phone,
        booking.location,
        booking.date,
        booking.time_slot,
        booking.participants,
        booking.total_amount,
        booking.payment_status,
        booking.stripe_payment_intent,
        booking.created_at
      ])
      
      return { ...booking, id: result.rows[0].id }
    } catch (error) {
      console.error('Create booking error:', error)
      throw error
    }
  }

  async createDonation(donation: Donation) {
    try {
      const result = await this.pool.query(`
        INSERT INTO donations (donor_name, donor_email, tickets_donated, total_amount, payment_status, stripe_payment_intent, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `, [
        donation.donor_name,
        donation.donor_email,
        donation.tickets_donated,
        donation.total_amount,
        donation.payment_status,
        donation.stripe_payment_intent,
        donation.created_at
      ])
      
      return { ...donation, id: result.rows[0].id }
    } catch (error) {
      console.error('Create donation error:', error)
      throw error
    }
  }

  async getBookings(): Promise<Booking[]> {
    try {
      const result = await this.pool.query('SELECT * FROM bookings ORDER BY created_at DESC')
      return result.rows as Booking[]
    } catch (error) {
      console.error('Get bookings error:', error)
      return []
    }
  }

  async getDonations(): Promise<Donation[]> {
    try {
      const result = await this.pool.query('SELECT * FROM donations ORDER BY created_at DESC')
      return result.rows as Donation[]
    } catch (error) {
      console.error('Get donations error:', error)
      return []
    }
  }

  async getBookingStats() {
    try {
      const result = await this.pool.query(`
        SELECT 
          COUNT(*) as total_bookings,
          COALESCE(SUM(total_amount), 0) as total_revenue,
          COALESCE(SUM(participants), 0) as total_participants
        FROM bookings 
        WHERE payment_status = 'completed'
      `)
      return result.rows[0]
    } catch (error) {
      console.error('Get booking stats error:', error)
      return { total_bookings: 0, total_revenue: 0, total_participants: 0 }
    }
  }

  async getDonationStats() {
    try {
      const result = await this.pool.query(`
        SELECT 
          COUNT(*) as total_donations,
          COALESCE(SUM(total_amount), 0) as total_donated,
          COALESCE(SUM(tickets_donated), 0) as total_tickets_donated
        FROM donations 
        WHERE payment_status = 'completed'
      `)
      return result.rows[0]
    } catch (error) {
      console.error('Get donation stats error:', error)
      return { total_donations: 0, total_donated: 0, total_tickets_donated: 0 }
    }
  }

  async getLocationStats() {
    try {
      const result = await this.pool.query(`
        SELECT 
          location,
          COUNT(*) as bookings,
          COALESCE(SUM(participants), 0) as total_participants,
          COALESCE(SUM(total_amount), 0) as revenue
        FROM bookings 
        WHERE payment_status = 'completed'
        GROUP BY location
      `)
      return result.rows
    } catch (error) {
      console.error('Get location stats error:', error)
      return []
    }
  }

  async close() {
    await this.pool.end()
  }
}
