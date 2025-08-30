'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/lib/stripe'
import { FaHeart, FaUsers, FaCreditCard, FaGift } from 'react-icons/fa'
import Link from 'next/link'
import StripePaymentForm from '@/components/StripePaymentForm'

interface DonationForm {
  donor_name: string
  donor_email: string
  tickets_donated: number
}

export default function DonatePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const { register, watch, setValue, formState: { errors } } = useForm<DonationForm>()
  const ticketsDonated = watch('tickets_donated') || 1
  const totalAmount = ticketsDonated * 40

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      const formData = watch()
      
      // Confirm donation
      const donationResponse = await fetch('/api/confirm-donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_amount: totalAmount,
          payment_intent_id: paymentIntentId
        })
      })
      
      const donationResult = await donationResponse.json()
      
      if (donationResult.success) {
        setIsSuccess(true)
      } else {
        throw new Error(donationResult.error)
      }
      
    } catch (error) {
      console.error('Donation error:', error)
      alert('There was an error processing your donation. Please try again.')
    }
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error)
    alert(`Payment failed: ${error}`)
  }

    if (isSuccess) {
    return (
      <Elements stripe={stripePromise}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="card max-w-md w-full text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-4">Thank You for Your Purchase!</h2>
            <p className="text-gray-600 mb-6">
              Your purchase of {ticketsDonated} ticket{ticketsDonated > 1 ? 's' : ''} will provide students 
              with access to the 360 Hub Experience. You will receive a confirmation email shortly.
            </p>
            <Link href="/" className="btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </Elements>
    )
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">360 Hub Experience</Link>
            </div>
                         <div className="flex items-center space-x-4">
               <Link href="/" className="nav-link">Home</Link>
               <Link href="/signup" className="btn-primary">Book Now</Link>
             </div>
          </div>
        </div>
      </nav>

             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="text-center mb-8">
           <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy Tickets for Students</h1>
           <p className="text-lg text-gray-600">Purchase tickets in bulk to provide 360 Hub Experience access to students who need it most</p>
         </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Donation Form */}
                     <div className="card">
             <h2 className="text-xl font-semibold mb-6 flex items-center">
               <FaHeart className="mr-2 text-red-500" />
               Purchase Tickets for Students
             </h2>

            <div className="space-y-6">
                             {/* Number of Tickets */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Number of Tickets to Purchase for Students
                 </label>
                 
                 <div className="max-w-xs">
                   <input
                     type="number"
                     min="1"
                     max="200"
                     placeholder="Enter number of tickets"
                     defaultValue="1"
                     {...register('tickets_donated', { 
                       required: 'Please enter number of tickets',
                       min: { value: 1, message: 'Minimum 1 ticket' },
                       max: { value: 200, message: 'Maximum 200 tickets' },
                       valueAsNumber: true
                     })}
                     className="input-field text-center text-lg font-semibold"
                     onChange={(e) => {
                       const value = parseInt(e.target.value) || 1
                       if (value > 200) {
                         e.target.value = '200'
                         setValue('tickets_donated', 200)
                       } else if (value < 1) {
                         e.target.value = '1'
                         setValue('tickets_donated', 1)
                       } else {
                         setValue('tickets_donated', value)
                       }
                     }}
                   />
                 </div>

                 {errors.tickets_donated && (
                   <p className="text-red-500 text-sm mt-2">{errors.tickets_donated.message}</p>
                 )}

                 <div className="mt-3 text-sm text-gray-600">
                   <span className="font-medium">Price per ticket: $40</span>
                   <span className="ml-3 text-blue-600 font-semibold">
                     Total: ${totalAmount.toLocaleString()}
                   </span>
                 </div>

                 <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3">
                   <p className="text-sm text-gray-700">
                     <span className="font-medium">Range:</span> 1-200 tickets available
                   </p>
                 </div>
               </div>

                             {/* Donor Information */}
               <div className="space-y-4">
                 <h3 className="text-lg font-medium">Purchaser Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register('donor_name', { required: 'Name is required' })}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                  {errors.donor_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.donor_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('donor_email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="input-field"
                    placeholder="Enter your email"
                  />
                  {errors.donor_email && (
                    <p className="text-red-500 text-sm mt-1">{errors.donor_email.message}</p>
                  )}
                </div>
              </div>

                             {/* Summary */}
               <div className="summary-section">
                 <h4 className="summary-label mb-2">Purchase Summary</h4>
                 <div className="summary-text space-y-1">
                   <p><span className="summary-label">Tickets to Purchase:</span> {ticketsDonated}</p>
                   <p><span className="summary-label">Price per Ticket:</span> $40</p>
                   <p><span className="summary-label">Total Amount:</span> ${totalAmount}</p>
                   <p className="text-xs text-gray-500 mt-2">
                     * These tickets will be distributed to students from local schools who cannot afford the experience
                   </p>
                 </div>
               </div>

              <button
                type="button"
                onClick={() => setShowPayment(true)}
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center"
              >
                <FaCreditCard className="mr-2" />
                Proceed to Payment - ${totalAmount}
              </button>
            </div>
          </div>

          {/* Payment Form */}
          {showPayment && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaCreditCard className="mr-2 text-primary-600" />
                Payment Information
              </h2>
              
              <StripePaymentForm
                amount={totalAmount}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                loading={isLoading}
                setLoading={setIsLoading}
                buttonText={`Purchase Tickets - $${totalAmount}`}
                paymentType="donation"
              />
              
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowPayment(false)}
                  className="btn-secondary"
                >
                  Back to Details
                </button>
              </div>
            </div>
          )}

          {/* Information Sidebar */}
          <div className="space-y-6">
                         <div className="card">
               <h3 className="text-lg font-semibold mb-4 flex items-center">
                 <FaGift className="mr-2 text-primary-600" />
                 How Your Purchase Helps Students
               </h3>
               <div className="space-y-3 text-sm text-gray-600">
                 <p>
                   Your ticket purchase directly supports students who may not have the financial means 
                   to experience our immersive college tours.
                 </p>
                 <p>
                   Each ticket you purchase provides a student with access to our 360-degree virtual 
                   campus tours and expert guidance.
                 </p>
                 <p>
                   We work with local schools and community organizations to identify students 
                   who would benefit most from this experience.
                 </p>
               </div>
             </div>

                                      <div className="card">
               <h3 className="text-lg font-semibold mb-4 flex items-center">
                 <FaUsers className="mr-2 text-primary-600" />
                 Impact Examples
               </h3>
               <div className="space-y-4">
                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                   <div className="flex items-center justify-between mb-2">
                     <span className="font-semibold text-blue-900">Small Impact</span>
                     <span className="text-sm text-blue-600">1-30 tickets</span>
                   </div>
                   <p className="text-sm text-blue-700">Perfect for individual donors and small organizations</p>
                 </div>
                 
                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                   <div className="flex items-center justify-between mb-2">
                     <span className="font-semibold text-green-900">Medium Impact</span>
                     <span className="text-sm text-green-600">50-100 tickets</span>
                   </div>
                   <p className="text-sm text-green-700">Great for schools, churches, and medium businesses</p>
                 </div>
                 
                 <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
                   <div className="flex items-center justify-between mb-2">
                     <span className="font-semibold text-purple-900">Large Impact</span>
                     <span className="text-sm text-purple-600">150-200 tickets</span>
                   </div>
                   <p className="text-sm text-purple-700">Ideal for corporations and major organizations</p>
                 </div>
               </div>
             </div>

            <div className="card bg-primary-50 border-primary-200">
              <h3 className="text-lg font-semibold mb-4 text-primary-700">
                Tax Deductible
              </h3>
              <p className="text-sm text-primary-600">
                Your donation may be tax deductible. Please consult with your tax advisor 
                for specific guidance on charitable contributions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Elements>
)
}
