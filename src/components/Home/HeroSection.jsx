import React from 'react'
import { ArrowRight, Sparkles, Leaf, Recycle } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-green-700 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl animate-bounce-slow">🌿</div>
        <div className="absolute top-20 right-20 text-6xl animate-wiggle">♻️</div>
        <div className="absolute bottom-10 left-1/4 text-7xl animate-bounce" style={{ animationDelay: '1s' }}>🌱</div>
        <div className="absolute bottom-20 right-1/3 text-5xl animate-wiggle" style={{ animationDelay: '0.5s' }}>🍃</div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              🌿 NaturePot Challenge
            </h1>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              <p className="text-xl md:text-3xl font-light">
                Transform Waste into Green Classrooms!
              </p>
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
              Join our eco-friendly initiative and create beautiful plant pots from recycled materials!
              Turn plastic bottles, old shoes, thread, and other waste into stunning home for money plants
              that will brighten up our classrooms.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Recycle className="w-8 h-8 mx-auto mb-2 text-accent-yellow" />
              <h3 className="font-semibold mb-1">Recycle & Reuse</h3>
              <p className="text-sm text-primary-100">Give new life to waste materials</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Leaf className="w-8 h-8 mx-auto mb-2 text-accent-yellow" />
              <h3 className="font-semibold mb-1">Grow Green</h3>
              <p className="text-sm text-primary-100">Add plants to your classroom</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-accent-yellow" />
              <h3 className="font-semibold mb-1">Win Prizes</h3>
              <p className="text-sm text-primary-100">Showcase your creativity</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/materials"
              className="btn-primary bg-white text-primary-600 hover:bg-primary-50
                       text-lg px-8 py-4 flex items-center space-x-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center space-x-2 text-primary-100">
              <span className="text-2xl">⏱️</span>
              <span className="text-sm">Limited time event!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 fill-current text-white"
          viewBox="0 0 1440 16"
          preserveAspectRatio="none"
        >
          <path d="M0,16 L1440,16 L1440,0 C1200,8 960,12 720,10 C480,8 240,4 0,8 Z" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection