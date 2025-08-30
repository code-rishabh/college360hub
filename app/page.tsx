import Link from 'next/link'
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaGraduationCap } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">360 Hub Experience</h1>
            </div>
                         <div className="flex items-center space-x-4">
               <Link href="/" className="nav-link">Home</Link>
               <Link href="/signup" className="btn-primary">Book Now</Link>
               <Link href="/donate" className="btn-secondary">Buy for Students</Link>
             </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Experience College Like Never Before
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join us for immersive 360-degree college tours that bring campuses to life. 
            Discover your future at our weekend experiences in Atlanta, Flint, and Detroit.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup" className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Book Your Tour
            </Link>
            <Link href="/donate" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
              Buy Tickets for Students
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose 360 Hub?</h2>
            <p className="text-lg text-gray-600">Experience college tours reimagined for the digital age</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Immersive Experience</h3>
              <p className="text-gray-600">360-degree virtual tours that make you feel like you're actually on campus</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Locations</h3>
              <p className="text-gray-600">Visit our hubs in Atlanta, Flint, and Detroit for convenient access</p>
            </div>
            
                         <div className="text-center">
               <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <FaCalendarAlt className="text-2xl text-primary-600" />
               </div>
               <h3 className="text-xl font-semibold mb-2">Weekend Sessions</h3>
               <p className="text-gray-600">Flexible weekend scheduling from 9 AM to 2 PM EST</p>
             </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Individual Focus</h3>
              <p className="text-gray-600">Personalized attention with individual sign-up options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At 360 Hub Experience, we believe every student deserves the opportunity to explore their college options 
                in an engaging and accessible way. Our mission is to bridge the gap between students and their dream colleges 
                through innovative technology and immersive experiences.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We provide weekend college tour services that combine cutting-edge 360-degree technology with expert guidance, 
                helping students make informed decisions about their educational future.
              </p>
              <Link href="/signup" className="btn-primary">
                Start Your Journey
              </Link>
            </div>
            <div className="bg-primary-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary-600 mb-4">What You'll Experience</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Virtual campus tours with 360-degree views
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Interactive facility exploration
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Student life insights and testimonials
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Academic program overviews
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Admission requirements and processes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Your Future?</h2>
          <p className="text-xl mb-8">Book your weekend session today and take the first step toward your college dreams.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup" className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Book Now - $40
            </Link>
            <Link href="/donate" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors">
              Buy Tickets for Students
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">360 Hub Experience</h3>
            <p className="text-gray-400">Empowering students through immersive college exploration</p>
            <div className="mt-4 text-sm text-gray-400">
              <p>Locations: Atlanta, GA | Flint, MI | Detroit, MI</p>
              <p>Weekend Sessions: 9 AM - 2 PM EST</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
