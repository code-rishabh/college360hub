# Stripe Integration Setup Guide

## Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete the account verification process
3. Navigate to the Stripe Dashboard

## Step 2: Get API Keys

1. In the Stripe Dashboard, go to **Developers** → **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_` for test mode)
3. Copy your **Secret Key** (starts with `sk_test_` for test mode)

## Step 3: Set Environment Variables

Create a `.env.local` file in your project root with the following content:

```env
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Database
DATABASE_URL=./database.sqlite
```

**Important:** Replace `your_secret_key_here` and `your_publishable_key_here` with your actual Stripe API keys.

## Step 4: Test the Integration

### Test Card Numbers

Use these test card numbers for testing:

- **Visa**: `4242424242424242`
- **Visa (debit)**: `4000056655665556`
- **Mastercard**: `5555555555554444`
- **American Express**: `378282246310005`

### Donation Ticket Limits

- **Minimum**: 1 ticket ($40)
- **Maximum**: 200 tickets ($8,000)
- **Donor Control**: Complete control over quantity selection

### Test CVC and Expiry

- **CVC**: Any 3 digits (e.g., `123`)
- **Expiry**: Any future date (e.g., `12/25`)

## Step 5: Test the Payment Flow

1. Start the development server: `npm run dev`
2. Navigate to the booking page: `http://localhost:3000/signup`
3. Fill out the booking form
4. Proceed to payment
5. Use a test card number to complete the payment

## Step 6: Monitor Payments

1. In your Stripe Dashboard, go to **Payments**
2. You'll see all test payments listed there
3. Check the payment status and details

## Step 7: Go Live (Production)

When ready for production:

1. Switch to **Live** mode in your Stripe Dashboard
2. Get your live API keys (they start with `pk_live_` and `sk_live_`)
3. Update your `.env.local` file with live keys
4. Deploy your application

## Security Best Practices

1. **Never commit API keys** to version control
2. Use environment variables for all sensitive data
3. Keep your secret key secure and never expose it in client-side code
4. Use HTTPS in production
5. Implement proper error handling

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check that your API keys are correct
   - Ensure you're using test keys for development

2. **"Payment failed" error**
   - Verify the card number is valid
   - Check that the amount is in the correct format (cents)

3. **"Stripe not loaded" error**
   - Ensure your publishable key is correct
   - Check that the Stripe script is loading properly

### Testing Checklist

- [ ] Test booking payment flow
- [ ] Test donation payment flow
- [ ] Verify payment confirmation emails
- [ ] Check database records are created
- [ ] Test error handling with invalid cards
- [ ] Verify admin dashboard shows payments

## Support

If you encounter issues:

1. Check the [Stripe Documentation](https://stripe.com/docs)
2. Review the [Stripe API Reference](https://stripe.com/docs/api)
3. Contact Stripe Support if needed

## Next Steps

After successful integration:

1. Set up webhook endpoints for real-time payment updates
2. Implement email notifications for successful payments
3. Add payment analytics and reporting
4. Consider implementing subscription payments if needed
