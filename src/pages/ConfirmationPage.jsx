import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Navigation from '../components/Layout/Navigation'
import SuccessMessage from '../components/Confirmation/SuccessMessage'
import RegistrationDetails from '../components/Confirmation/RegistrationDetails'
import WhatsAppGroup from '../components/Confirmation/WhatsAppGroup'
import { Lightbulb, Target, Calendar, Trophy } from 'lucide-react'

const ConfirmationPage = () => {
  const navigate = useNavigate()
  const [registrationData, setRegistrationData] = useState(null)

  useEffect(() => {
    // Load registration data from localStorage
    const savedData = localStorage.getItem('naturepot_success_data')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setRegistrationData(data)
      } catch (error) {
        console.error('Error parsing registration data:', error)
        navigate('/')
      }
    } else {
      // No registration data found, redirect to home
      navigate('/')
    }
  }, [navigate])

  if (!registrationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-gradient">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your confirmation...</p>
        </div>
      </div>
    )
  }

  const nextSteps = [
    {
      icon: Lightbulb,
      title: 'Start Collecting Materials',
      description: 'Gather your chosen recycled materials and any additional supplies you might need'
    },
    {
      icon: Target,
      title: 'Design Your NaturePot',
      description: 'Sketch your design and plan how you\'ll create your unique plant pot'
    },
    {
      icon: Calendar,
      title: 'Join WhatsApp Group',
      description: 'Stay updated with deadlines, tips, and connect with other participants'
    },
    {
      icon: Trophy,
      title: 'Submit Your Creation',
      description: 'Complete your NaturePot and submit photos before the deadline for evaluation'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-green-gradient">
      <Header />
      <Navigation
        showBack={false}
        title="Registration Success"
        currentStep={3}
      />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Success Message */}
          <SuccessMessage registrationId={registrationData.registrationId} />

          {/* Registration Details */}
          <RegistrationDetails registrationData={registrationData} />

          {/* WhatsApp Group CTA */}
          <WhatsAppGroup />

          {/* Next Steps Timeline */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Your Journey to Green Classrooms 🌱
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nextSteps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Step Number */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>

                    {/* Step Content */}
                    <div className="bg-gray-50 rounded-xl p-4 pt-8 h-full border-2 border-gray-200 hover:border-primary-300 transition-colors">
                      <step.icon className="w-8 h-8 text-primary-600 mb-3" />
                      <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>

                    {/* Arrow Connection (Desktop) */}
                    {index < nextSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                        <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8 pt-6 border-t">
                <p className="text-lg text-gray-700 mb-4">
                  Need help or have questions? Our WhatsApp community is here to support you!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="btn-secondary"
                  >
                    Back to Top
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="btn-primary"
                  >
                    Go to Home
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">📌</span>
                Important Notes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <p className="text-sm text-gray-700">
                    Save your Registration ID for future reference
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <p className="text-sm text-gray-700">
                    Join the WhatsApp group for important updates
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <p className="text-sm text-gray-700">
                    Submit your project before the deadline
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <p className="text-sm text-gray-700">
                    Be creative and have fun with your project!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ConfirmationPage