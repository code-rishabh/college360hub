import Database from 'better-sqlite3'
import type { Database as BetterSqlite3Database } from 'better-sqlite3'

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
  private db: BetterSqlite3Database

  constructor() {
    this.db = new Database('360hub.db')
    this.init()
  }

  private init() {
    // Create bookings table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        location TEXT NOT NULL,
        date TEXT NOT NULL,
        time_slot TEXT NOT NULL,
        participants INTEGER NOT NULL,
        total_amount REAL NOT NULL,
        payment_status TEXT NOT NULL,
        stripe_payment_intent TEXT,
        created_at TEXT NOT NULL
      )
    `)

    // Create donations table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donor_name TEXT NOT NULL,
        donor_email TEXT NOT NULL,
        tickets_donated INTEGER NOT NULL,
        total_amount REAL NOT NULL,
        payment_status TEXT NOT NULL,
        stripe_payment_intent TEXT,
        created_at TEXT NOT NULL
      )
    `)
  }

  createBooking(booking: Booking) {
    const stmt = this.db.prepare(`
      INSERT INTO bookings (name, email, phone, location, date, time_slot, participants, total_amount, payment_status, stripe_payment_intent, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    const result = stmt.run(
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
    )
    
    return { ...booking, id: result.lastInsertRowid as number }
  }

  createDonation(donation: Donation) {
    const stmt = this.db.prepare(`
      INSERT INTO donations (donor_name, donor_email, tickets_donated, total_amount, payment_status, stripe_payment_intent, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    
    const result = stmt.run(
      donation.donor_name,
      donation.donor_email,
      donation.tickets_donated,
      donation.total_amount,
      donation.payment_status,
      donation.stripe_payment_intent,
      donation.created_at
    )
    
    return { ...donation, id: result.lastInsertRowid as number }
  }

  getBookings(): Booking[] {
    const stmt = this.db.prepare('SELECT * FROM bookings ORDER BY created_at DESC')
    return stmt.all() as Booking[]
  }

  getDonations(): Donation[] {
    const stmt = this.db.prepare('SELECT * FROM donations ORDER BY created_at DESC')
    return stmt.all() as Donation[]
  }

  getBookingStats() {
    const stmt = this.db.prepare(`
      SELECT 
        COUNT(*) as total_bookings,
        SUM(total_amount) as total_revenue,
        SUM(participants) as total_participants
      FROM bookings 
      WHERE payment_status = 'completed'
    `)
    return stmt.get()
  }

  getDonationStats() {
    const stmt = this.db.prepare(`
      SELECT 
        COUNT(*) as total_donations,
        SUM(total_amount) as total_donated,
        SUM(tickets_donated) as total_tickets_donated
      FROM donations 
      WHERE payment_status = 'completed'
    `)
    return stmt.get()
  }

  getLocationStats() {
    const stmt = this.db.prepare(`
      SELECT 
        location,
        COUNT(*) as bookings,
        SUM(participants) as total_participants,
        SUM(total_amount) as revenue
      FROM bookings 
      WHERE payment_status = 'completed'
      GROUP BY location
    `)
    return stmt.all()
  }

  close() {
    this.db.close()
  }
}
