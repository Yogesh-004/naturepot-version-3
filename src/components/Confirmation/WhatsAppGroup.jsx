import React from 'react'
import { MessageCircle, Users, Bell, Gift } from 'lucide-react'

const WhatsAppGroup = () => {
  const whatsappGroupUrl = import.meta.env.VITE_WHATSAPP_GROUP_URL || '#'
  const deadline = import.meta.env.VITE_REGISTRATION_DEADLINE || '2024-11-30'

  const handleJoinWhatsApp = () => {
    if (whatsappGroupUrl !== '#') {
      window.open(whatsappGroupUrl, '_blank')
    } else {
      alert('WhatsApp group link will be available soon!')
    }
  }

  const benefits = [
    {
      icon: Bell,
      title: 'Important Updates',
      description: 'Get instant notifications about deadlines and events'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with fellow participants and share ideas'
    },
    {
      icon: Gift,
      title: 'Exclusive Content',
      description: 'Access tips, tutorials, and special announcements'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-6 md:p-8 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 text-6xl animate-bounce">💬</div>
          <div className="absolute bottom-10 left-10 text-5xl animate-wiggle">📱</div>
          <div className="absolute top-1/2 right-1/3 text-4xl">✨</div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-white animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Join Our WhatsApp Community! 📱
            </h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Stay connected with fellow NaturePot enthusiasts! Get updates, share your progress, and be part of our growing eco-community.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <benefit.icon className="w-8 h-8 mb-3 text-yellow-300" />
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-green-100 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={handleJoinWhatsApp}
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center space-x-3 mx-auto"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Join WhatsApp Group</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>

            {whatsappGroupUrl === '#' && (
              <p className="text-green-100 text-sm mt-3">
                Group link will be activated soon. Check back later!
              </p>
            )}
          </div>

          {/* Deadline Reminder */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <span className="text-yellow-300">⏰</span>
              <span className="text-sm">
                Submission Deadline: {new Date(deadline).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatsAppGroup