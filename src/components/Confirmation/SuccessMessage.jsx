import React from 'react'
import { CheckCircle, Star } from 'lucide-react'

const SuccessMessage = ({ registrationId }) => {
  return (
    <div className="text-center mb-8">
      {/* Success Icon and Animation */}
      <div className="flex justify-center items-center mb-6">
        <div className="relative">
          <CheckCircle className="w-20 h-20 text-green-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Star className="w-8 h-8 text-white animate-bounce" />
          </div>
        </div>
      </div>

      {/* Success Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Registration Successful! 🎉
      </h1>

      {/* Registration ID */}
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 inline-block mb-4">
        <p className="text-sm text-green-600 font-medium">Your Registration ID</p>
        <p className="text-xl font-bold text-green-800">{registrationId}</p>
      </div>

      {/* Success Message */}
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Congratulations! You're officially part of the NaturePot Challenge.
        Get ready to transform waste into something wonderful!
      </p>

      {/* Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-pulse">
          <span className="absolute top-10 left-1/4 text-4xl">🌿</span>
          <span className="absolute top-20 right-1/3 text-3xl">🌱</span>
          <span className="absolute top-32 left-1/2 text-5xl">✨</span>
          <span className="absolute top-16 right-1/4 text-4xl">🍃</span>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage