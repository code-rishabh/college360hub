# Vercel Deployment Guide with Postgres Database

## 🚀 **Why Vercel + Postgres is Perfect for Your Project**

### **Vercel Benefits:**
- **Automatic deployments** from Git
- **Global CDN** for fast loading worldwide
- **Serverless functions** that scale automatically
- **Free tier** with generous limits
- **Perfect for Next.js** applications

### **Postgres Benefits:**
- **Reliable database** that persists data
- **SQL support** for complex queries
- **Automatic backups** and scaling
- **Free tier** available

## 📋 **Step 1: Prepare Your Project for Vercel**

### **Database Migration:**
Your project now has **two database options**:

1. **`lib/database.ts`** - SQLite (for local development)
2. **`lib/database-postgres.ts`** - Postgres (for Vercel production)

### **Environment Variables Setup:**
Create a `.env.local` file for local development:

```env
# Local Development (SQLite)
DATABASE_URL=./360hub.db

# Stripe Keys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Email Service
RESEND_API_KEY=re_your_api_key_here
```

## 🔧 **Step 2: Set Up Vercel Postgres**

### **Option A: Vercel Dashboard (Recommended)**

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Create a new project** from your Git repository
3. **Go to Storage tab** → **Create Database**
4. **Choose Postgres** → **Create**
5. **Copy the connection details** (you'll need these)

### **Option B: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Create database
vercel storage create postgres
```

## ⚙️ **Step 3: Configure Environment Variables on Vercel**

In your Vercel project dashboard, add these environment variables:

```env
# Database (Vercel will provide these)
POSTGRES_URL=your_postgres_connection_string
POSTGRES_HOST=your_postgres_host
POSTGRES_DATABASE=your_database_name
POSTGRES_USERNAME=your_username
POSTGRES_PASSWORD=your_password

# Stripe Keys (use your live keys for production)
STRIPE_SECRET_KEY=sk_live_your_live_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_publishable_key

# Email Service
RESEND_API_KEY=re_your_resend_api_key

# Domain (optional)
NEXT_PUBLIC_SITE_URL=https://college360hub.com
```

## 🔄 **Step 4: Switch to Postgres Database**

### **For Production (Vercel):**
Update your API routes to use the Postgres database:

```typescript
// In all API routes, change this line:
import { DatabaseManager } from '@/lib/database-postgres'
```

### **For Local Development:**
Keep using the SQLite database:

```typescript
// In all API routes, keep this line:
import { DatabaseManager } from '@/lib/database'
```

## 🚀 **Step 5: Deploy to Vercel**

### **Automatic Deployment:**
1. **Push your code** to GitHub/GitLab
2. **Vercel automatically detects** the Next.js project
3. **Builds and deploys** automatically
4. **Your site is live** at `your-project.vercel.app`

### **Manual Deployment:**
```bash
# Deploy from command line
vercel --prod
```

## 🌐 **Step 6: Connect Your Domain**

1. **In Vercel dashboard**, go to **Settings** → **Domains**
2. **Add your domain**: `college360hub.com`
3. **Update DNS records** as instructed by Vercel
4. **Wait for DNS propagation** (can take up to 48 hours)

## 🧪 **Step 7: Test Your Deployment**

### **Test Checklist:**
- [ ] **Homepage loads** correctly
- [ ] **Booking form** works
- [ ] **Donation form** works
- [ ] **Stripe payments** process successfully
- [ ] **Emails are sent** after payments
- [ ] **Admin dashboard** shows data
- [ ] **Database stores** bookings and donations

## 💰 **Vercel Pricing (Free Tier)**

### **Hobby Plan (Free):**
- **Unlimited deployments**
- **100GB bandwidth/month**
- **100GB storage**
- **Perfect for starting out**

### **Pro Plan ($20/month):**
- **Unlimited bandwidth**
- **Unlimited storage**
- **Team collaboration**
- **Advanced analytics**

## 🔒 **Security Best Practices**

### **Environment Variables:**
- **Never commit** API keys to Git
- **Use Vercel's environment variables** for production
- **Rotate keys** regularly

### **Database Security:**
- **Vercel Postgres** handles security automatically
- **Connection strings** are encrypted
- **Automatic backups** included

## 🚨 **Common Issues & Solutions**

### **Issue 1: Database Connection Error**
```bash
# Error: "Cannot connect to database"
# Solution: Check POSTGRES_URL in Vercel environment variables
```

### **Issue 2: Build Failures**
```bash
# Error: "Build failed"
# Solution: Check for TypeScript errors locally first
```

### **Issue 3: Environment Variables Not Working**
```bash
# Error: "API key undefined"
# Solution: Verify environment variables in Vercel dashboard
```

## 📊 **Monitoring & Analytics**

### **Vercel Analytics:**
- **Real-time performance** monitoring
- **Error tracking** and logging
- **Deployment history** and rollbacks

### **Database Monitoring:**
- **Query performance** insights
- **Connection pool** monitoring
- **Automatic scaling** alerts

## 🔄 **Local vs Production Development**

### **Local Development:**
```bash
# Use SQLite database
npm run dev
# Database file: ./360hub.db
```

### **Production (Vercel):**
```bash
# Uses Vercel Postgres
# Automatic scaling and backups
# No database file management needed
```

## 🎯 **Next Steps After Deployment**

1. **Test thoroughly** with real payments
2. **Set up monitoring** and alerts
3. **Configure custom domain** and SSL
4. **Set up staging environment** for testing
5. **Monitor performance** and optimize

## 📞 **Support Resources**

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: Available in dashboard
- **Postgres Documentation**: [vercel.com/docs/storage/vercel-postgres](https://vercel.com/docs/storage/vercel-postgres)

---

**Note**: This setup gives you the best of both worlds - fast local development with SQLite and reliable production hosting with Vercel Postgres. The database layer is designed to work seamlessly in both environments.
