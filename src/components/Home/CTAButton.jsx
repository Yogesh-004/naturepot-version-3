import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

const CTAButton = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300 mr-2" />
              <h2 className="text-2xl md:text-3xl font-bold">Ready to Join the Challenge?</h2>
              <Sparkles className="w-8 h-8 text-yellow-300 ml-2" />
            </div>

            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Take the first step towards creating something amazing! Choose your material and let your creativity bloom.
            </p>

            <a
              href="/materials"
              className="inline-flex items-center space-x-3 bg-white text-primary-600 hover:bg-primary-50
                       px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl
                       transform transition-all duration-200 hover:scale-105 active:scale-95
                       group"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-800 mb-1">Win Prizes</h3>
              <p className="text-sm text-gray-600">Exciting rewards for the most creative designs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🌱</div>
              <h3 className="font-semibold text-gray-800 mb-1">Go Green</h3>
              <p className="text-sm text-gray-600">Contribute to a sustainable classroom environment</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🤝</div>
              <h3 className="font-semibold text-gray-800 mb-1">Join Community</h3>
              <p className="text-sm text-gray-600">Connect with fellow eco-conscious students</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTAButton