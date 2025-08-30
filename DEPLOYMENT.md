# 🚀 Quick Vercel Deployment Guide

## ⚡ **Deploy to Vercel in 5 Minutes**

### **Step 1: Push to GitHub**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### **Step 2: Create Vercel Project**
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel auto-detects Next.js ✅

### **Step 3: Create Postgres Database**
1. In your Vercel project, go to **"Storage"** tab
2. Click **"Create Database"**
3. Choose **"Postgres"**
4. Click **"Create"**

### **Step 4: Add Environment Variables**
Copy these from your Vercel Postgres dashboard:
```env
POSTGRES_URL=your_connection_string
POSTGRES_HOST=your_host
POSTGRES_DATABASE=your_database
POSTGRES_USERNAME=your_username
POSTGRES_PASSWORD=your_password
```

Add your Stripe and Resend keys:
```env
STRIPE_SECRET_KEY=sk_live_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
RESEND_API_KEY=re_your_key
NEXT_PUBLIC_SITE_URL=https://college360hub.com
```

### **Step 5: Deploy!**
- Vercel automatically deploys when you push to GitHub
- Your site is live at `your-project.vercel.app`

## 🌐 **Connect Your Domain**
1. In Vercel dashboard → **Settings** → **Domains**
2. Add: `college360hub.com`
3. Update DNS records as instructed

## ✅ **What's Configured:**
- ✅ **Postgres database** integration
- ✅ **Stripe payment** processing
- ✅ **Email confirmations** (Resend)
- ✅ **Admin dashboard** with analytics
- ✅ **Responsive design** for all devices

## 🧪 **Test Your Live Site:**
- [ ] Homepage loads
- [ ] Booking form works
- [ ] Donation form works
- [ ] Stripe payments process
- [ ] Emails are sent
- [ ] Admin dashboard shows data

## 📚 **Detailed Guides:**
- **Email Setup**: See `EMAIL_SETUP.md`
- **Stripe Setup**: See `STRIPE_SETUP.md`
- **Full Deployment**: See `VERCEL_DEPLOYMENT.md`

---

**🎯 Your 360 Hub Experience will be live and accessible worldwide!**
