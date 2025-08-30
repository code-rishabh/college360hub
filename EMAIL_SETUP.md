# Email Service Setup Guide

## 🚀 **Resend Email Service Setup**

We've integrated **Resend** as the email service for sending confirmation emails to buyers and donors. Resend is recommended because it's:
- **Easy to integrate** with Next.js
- **Free tier**: 3,000 emails/month
- **Great deliverability** and analytics
- **Simple API** and good documentation

## 📋 **Step 1: Create Resend Account**

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Complete email verification
4. Navigate to your dashboard

## 🔑 **Step 2: Get API Key**

1. In your Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "360 Hub Experience")
4. Copy the generated API key (starts with `re_`)

## ⚙️ **Step 3: Configure Environment Variables**

Add this to your `.env.local` file:

```env
# Email Service
RESEND_API_KEY=re_your_api_key_here

# Existing variables
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
DATABASE_URL=./database.sqlite
```

## 📧 **Step 4: Verify Domain (Optional but Recommended)**

For production use, verify your domain:

1. In Resend dashboard, go to **Domains**
2. Add your domain: `college360hub.com`
3. Follow DNS verification steps
4. Update the `from` email in `lib/email.ts` to use your verified domain

## 🧪 **Step 5: Test the Integration**

1. Start your development server: `npm run dev`
2. Make a test booking or donation
3. Check your email for confirmation
4. Check Resend dashboard for email logs

## 📱 **Email Templates Created**

### **Booking Confirmation Email**
- **Subject**: "Booking Confirmation - 360 Hub Experience"
- **Content**: Tour details, location, date, time, what to expect
- **Design**: Professional, mobile-responsive HTML email

### **Donation Confirmation Email**
- **Subject**: "Thank You for Your Generous Donation - 360 Hub Experience"
- **Content**: Donation details, impact explanation, thank you message
- **Design**: Warm, engaging design with impact highlights

## 🔧 **Customization Options**

### **Update Email Content**
Edit the email templates in `lib/email.ts`:
- Change colors, fonts, and styling
- Modify email content and messaging
- Add your logo or branding

### **Add More Email Types**
You can easily add:
- Reminder emails before tours
- Follow-up emails after tours
- Newsletter emails for donors
- Admin notifications

## 📊 **Monitoring & Analytics**

### **Resend Dashboard**
- Track email delivery rates
- Monitor bounce rates
- View email analytics
- Check spam reports

### **Logs in Your App**
- Email sending errors are logged to console
- Failed emails don't break the booking/donation process
- You can add more detailed logging if needed

## 🚨 **Troubleshooting**

### **Common Issues**

1. **"Invalid API key" error**
   - Check your `RESEND_API_KEY` in `.env.local`
   - Ensure the key starts with `re_`

2. **Emails not sending**
   - Check browser console for errors
   - Verify your Resend account is active
   - Check email limits (free tier: 3,000/month)

3. **Emails going to spam**
   - Verify your domain in Resend
   - Use a professional "from" address
   - Avoid spam trigger words

### **Testing Checklist**
- [ ] Resend API key configured
- [ ] Test booking sends confirmation email
- [ ] Test donation sends confirmation email
- [ ] Check email formatting on mobile
- [ ] Verify email content accuracy

## 💰 **Pricing & Limits**

### **Free Tier (Resend)**
- **3,000 emails/month**
- **Unlimited domains**
- **Basic analytics**
- **Good for starting out**

### **Paid Plans**
- **Pro**: $20/month for 50,000 emails
- **Business**: $99/month for 500,000 emails
- **Enterprise**: Custom pricing

## 🔒 **Security Best Practices**

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate API keys** regularly
4. **Monitor email activity** for suspicious patterns
5. **Implement rate limiting** if needed

## 📞 **Support**

- **Resend Documentation**: [resend.com/docs](https://resend.com/docs)
- **Resend Support**: Available in dashboard
- **Community**: Active Discord community

## 🎯 **Next Steps**

After setup:
1. **Test thoroughly** with real email addresses
2. **Customize templates** to match your brand
3. **Set up monitoring** for email delivery
4. **Plan for scaling** as your business grows

---

**Note**: The email service is designed to be non-blocking - if emails fail to send, the booking/donation process will still complete successfully. This ensures a smooth user experience even if there are email delivery issues.
