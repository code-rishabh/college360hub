'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/lib/stripe'
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaCreditCard } from 'react-icons/fa'
import Link from 'next/link'
import StripePaymentForm from '@/components/StripePaymentForm'

interface BookingForm {
  name: string
  email: string
  phone: string
  location: string
  date: string
  time_slot: string
  participants: number
}

export default function SignupPage() {
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [showPayment, setShowPayment] = useState(false)

  const { register, watch, setValue, formState: { errors } } = useForm<BookingForm>()
  const participants = watch('participants') || 1
  const totalAmount = participants * 40

  useEffect(() => {
    // Load available dates
    fetch('/api/available-dates')
      .then(res => res.json())
      .then(setAvailableDates)
    
    // Load available times
    fetch('/api/available-times')
      .then(res => res.json())
      .then(setAvailableTimes)
  }, [])

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      const formData = watch()
      
      // Confirm booking
      const bookingResponse = await fetch('/api/confirm-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_amount: totalAmount,
          payment_intent_id: paymentIntentId
        })
      })
      
      const bookingResult = await bookingResponse.json()
      
      if (bookingResult.success) {
        setStep(3) // Success step
      } else {
        throw new Error(bookingResult.error)
      }
      
    } catch (error) {
      console.error('Booking error:', error)
      alert('There was an error processing your booking. Please try again.')
    }
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error)
    alert(`Payment failed: ${error}`)
  }

  const getWeekendDates = () => {
    const dates = []
    const currentDate = new Date()
    
    for (let i = 0; i < 90; i++) {
      const checkDate = new Date(currentDate)
      checkDate.setDate(currentDate.getDate() + i)
      
      if (checkDate.getDay() === 0 || checkDate.getDay() === 6) { // Sunday or Saturday
        dates.push(checkDate)
      }
    }
    
    return dates
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateValue = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  if (step === 3) {
    return (
      <Elements stripe={stripePromise}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="card max-w-md w-full text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for booking your 360 Hub Experience. You will receive a confirmation email shortly.
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
               <Link href="/donate" className="btn-secondary">Buy for Students</Link>
             </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your 360 Hub Experience</h1>
          <p className="text-lg text-gray-600">Select your preferred date, location, and time slot</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1: Date and Location Selection */}
          {step === 1 && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaCalendarAlt className="mr-2 text-primary-600" />
                Step 1: Select Date & Location
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date (Weekends Only)
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {getWeekendDates().map((date) => (
                                             <button
                         key={date.toISOString()}
                         type="button"
                         onClick={() => {
                           setSelectedDate(formatDateValue(date))
                           setValue('date', formatDateValue(date))
                         }}
                         className={`date-button ${
                           selectedDate === formatDateValue(date)
                             ? 'selected'
                             : ''
                         }`}
                       >
                        <div className="font-medium">{formatDate(date)}</div>
                      </button>
                    ))}
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">Please select a date</p>
                  )}
                </div>

                {/* Location Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Location
                  </label>
                  <select
                    {...register('location', { required: 'Please select a location' })}
                    className="input-field"
                  >
                    <option value="">Choose a location...</option>
                    <option value="Atlanta, GA">Atlanta, GA</option>
                    <option value="Flint, MI">Flint, MI</option>
                    <option value="Detroit, MI">Detroit, MI</option>
                  </select>
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!selectedDate || !watch('location')}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Time Selection
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Time and Personal Details */}
          {step === 2 && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaClock className="mr-2 text-primary-600" />
                Step 2: Select Time & Personal Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                                         {availableTimes.map((time) => (
                       <button
                         key={time}
                         type="button"
                         onClick={() => setValue('time_slot', time)}
                         className={`time-button ${
                           watch('time_slot') === time
                             ? 'selected'
                             : ''
                         }`}
                       >
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.time_slot && (
                    <p className="text-red-500 text-sm mt-1">Please select a time slot</p>
                  )}
                </div>

                {/* Participants */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Participants
                  </label>
                  <select
                    {...register('participants', { required: 'Please select number of participants' })}
                    className="input-field"
                  >
                    <option value="">Select participants...</option>
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                  {errors.participants && (
                    <p className="text-red-500 text-sm mt-1">{errors.participants.message}</p>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="input-field"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

                             {/* Summary */}
               <div className="mt-6 summary-section">
                 <h4 className="summary-label mb-2">Booking Summary</h4>
                 <div className="summary-text space-y-1">
                   <p><span className="summary-label">Date:</span> {selectedDate && formatDate(new Date(selectedDate))}</p>
                   <p><span className="summary-label">Location:</span> {watch('location')}</p>
                   <p><span className="summary-label">Time:</span> {watch('time_slot')}</p>
                   <p><span className="summary-label">Participants:</span> {participants}</p>
                   <p><span className="summary-label">Total Amount:</span> ${totalAmount}</p>
                 </div>
               </div>

                             <div className="mt-6 flex justify-between">
                 <button
                   type="button"
                   onClick={() => setStep(1)}
                   className="btn-secondary"
                 >
                   Back
                 </button>
                 <button
                   type="button"
                   onClick={() => setShowPayment(true)}
                   disabled={isLoading}
                   className="btn-primary flex items-center"
                 >
                   <FaCreditCard className="mr-2" />
                   Proceed to Payment - ${totalAmount}
                 </button>
               </div>
             </div>
           )}

           {/* Payment Step */}
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
                 buttonText={`Pay $${totalAmount}`}
                 paymentType="booking"
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
         </div>
       </div>
     </div>
   </Elements>
 )
}
