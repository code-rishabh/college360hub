# 360 Hub Experience - College Tour Booking Platform

A modern Next.js application for booking immersive 360-degree college tour experiences. Built with TypeScript, Tailwind CSS, and Stripe payment integration.

## Features

- **Home Page**: Landing page with mission overview and service highlights
- **Booking System**: Weekend-only calendar with location selection and time slots
- **Payment Integration**: Stripe payment processing for $40 tickets
- **Donation System**: Allow donors to purchase tickets for students
- **Admin Dashboard**: Analytics and management interface
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: 
  - **Local Development**: SQLite with better-sqlite3
  - **Production**: Vercel Postgres
- **Payment**: Stripe
- **Email**: Resend
- **Forms**: React Hook Form
- **Icons**: React Icons
- **Deployment**: Vercel (automatic)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 360-hub-experience
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🚀 Production Deployment (Vercel)

**Super Fast: 5 minutes to live!**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Create Postgres database
   - Add environment variables
   - Deploy automatically!

**📚 See `QUICK_DEPLOY.md` for complete 5-minute deployment guide!**

## Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── admin/             # Admin endpoints
│   │   ├── available-dates/   # Weekend dates
│   │   ├── available-times/   # Time slots
│   │   ├── confirm-booking/   # Booking confirmation
│   │   ├── confirm-donation/  # Donation confirmation
│   │   └── create-payment-intent/ # Stripe integration
│   ├── admin/                 # Admin dashboard
│   ├── donate/                # Donation page
│   ├── signup/                # Booking page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── lib/
│   └── database.ts            # Database layer
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Key Features Implementation

### Weekend-Only Calendar
- Automatically generates available weekend dates for the next 3 months
- Only Saturday and Sunday dates are selectable
- Weekday dates are disabled

### Location Management
- Three locations: Atlanta, GA; Flint, MI; Detroit, MI
- Dropdown selection with validation
- Location-specific analytics in admin dashboard

### Time Slots
- Weekend sessions: 9 AM to 2 PM EST (hourly slots)
- Five time slots: 9:00 AM - 10:00 AM, 10:00 AM - 11:00 AM, 11:00 AM - 12:00 PM, 12:00 PM - 1:00 PM, 1:00 PM - 2:00 PM
- Individual booking system

### Payment Processing
- Stripe integration for secure payments
- $40 per ticket pricing
- Support for multiple participants
- Payment confirmation and booking storage

### Donation System
- Donors can purchase tickets for students
- Flexible donation amounts (1-20 tickets)
- Tax-deductible donation tracking
- Impact visualization

### Admin Dashboard
- Real-time booking and donation statistics
- Location-based analytics
- Payment status tracking
- Export capabilities

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_SECRET_KEY` | Stripe secret key for payment processing | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for frontend | Yes |

## Database Schema

### Bookings Table
```sql
CREATE TABLE bookings (
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
);
```

### Donations Table
```sql
CREATE TABLE donations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  tickets_donated INTEGER NOT NULL,
  total_amount REAL NOT NULL,
  payment_status TEXT NOT NULL,
  stripe_payment_intent TEXT,
  created_at TEXT NOT NULL
);
```

## API Endpoints

### Public Endpoints
- `GET /api/available-dates` - Get weekend dates
- `GET /api/available-times` - Get time slots
- `POST /api/create-payment-intent` - Create Stripe payment intent
- `POST /api/confirm-booking` - Confirm booking
- `POST /api/confirm-donation` - Confirm donation

### Admin Endpoints
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/donations` - Get all donations
- `GET /api/admin/stats` - Get analytics

## Customization

### Adding New Locations
1. Update the location options in `/app/signup/page.tsx`
2. Add location-specific styling if needed
3. Update analytics queries in `/lib/database.ts`

### Modifying Time Slots
1. Update the time array in `/app/api/available-times/route.ts`
2. Adjust the time slot display in the booking form

### Changing Pricing
1. Update the ticket price in booking and donation components
2. Modify Stripe payment intent creation
3. Update pricing displays throughout the application

## Support

For technical support or questions about the 360 Hub Experience platform, please contact the development team.

## License

This project is proprietary software developed for 360 Hub Experience.
