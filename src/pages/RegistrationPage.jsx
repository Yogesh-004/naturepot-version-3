import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Navigation from '../components/Layout/Navigation'
import RegistrationForm from '../components/Registration/RegistrationForm'

const RegistrationPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-green-gradient">
      <Header />
      <Navigation
        showBack={true}
        backTo="/materials"
        title="Register for NaturePot"
        currentStep={2}
      />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Join the NaturePot Challenge! 🌱
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fill in your details to register for this eco-friendly initiative.
                Let's create something amazing together!
              </p>
            </div>

            {/* Registration Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <RegistrationForm />
            </div>

            {/* Additional Information */}
            <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">📋</span>
                What's Next?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="font-medium text-gray-800">Create Your Pot</p>
                    <p className="text-sm text-gray-600">Design and build your NaturePot creation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📸</span>
                  <div>
                    <p className="font-medium text-gray-800">Submit Photos</p>
                    <p className="text-sm text-gray-600">Share your creation with the community</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="font-medium text-gray-800">Win Prizes</p>
                    <p className="text-sm text-gray-600">Recognition for creative designs</p>
                  </div>
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

export default RegistrationPage