import React from 'react'

const SamplePots = () => {
  const samplePots = [
    {
      id: 1,
      title: "Plastic Bottle Planters",
      icon: "🥤",
      description: "Colorful hanging planters made from recycled soda and water bottles",
      features: ["Easy to make", "Waterproof", "Hanging design", "Paintable"],
      color: "from-blue-400 to-cyan-300",
      difficulty: "Easy",
      time: "30 mins"
    },
    {
      id: 2,
      title: "Thread-Wrapped Pots",
      icon: "🧵",
      description: "Decorative pots wrapped in colorful threads and yarn patterns",
      features: ["Decorative", "Customizable", "Textured finish", "Bright colors"],
      color: "from-pink-400 to-purple-400",
      difficulty: "Medium",
      time: "45 mins"
    },
    {
      id: 3,
      title: "Shoe Gardens",
      icon: "👟",
      description: "Unique planters created from old sneakers and boots",
      features: ["Creative", "Unique shape", "Durable", "Conversation starter"],
      color: "from-green-400 to-emerald-400",
      difficulty: "Easy",
      time: "20 mins"
    }
  ]

  return (
    <section className="py-16 bg-green-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Creative Pot Ideas 🌟
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get inspired by these creative pot designs. Choose your style and bring your imagination to life!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {samplePots.map((pot) => (
            <div
              key={pot.id}
              className="card group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon and Title */}
              <div className={`bg-gradient-to-br ${pot.color} p-6 rounded-t-xl text-white text-center`}>
                <div className="text-6xl mb-4 group-animate-bounce">{pot.icon}</div>
                <h3 className="text-xl font-bold">{pot.title}</h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {pot.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {pot.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-green-500 text-lg">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Difficulty:</span>
                    <span className={`text-sm font-medium ${
                      pot.difficulty === 'Easy' ? 'text-green-600' :
                      pot.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {pot.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Time:</span>
                    <span className="text-sm font-medium text-primary-600">{pot.time}</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary-500 bg-opacity-0 group-hover:bg-opacity-5
                              rounded-xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-3 bg-white rounded-full shadow-lg px-6 py-3 border border-primary-200">
            <span className="text-2xl">💡</span>
            <span className="text-gray-700">Have your own creative idea?</span>
            <a
              href="/materials"
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Choose "Other Materials" →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SamplePots