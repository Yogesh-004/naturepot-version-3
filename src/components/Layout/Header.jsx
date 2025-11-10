import React from 'react'

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-primary-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-4xl animate-wiggle">🌿</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gradient">
                NaturePot Challenge
              </h1>
              <p className="text-sm text-gray-600 hidden md:block">
                Transform Waste into Green Classrooms!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Eco-Friendly Initiative</span>
            <span className="text-green-500 text-xl">♻️</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header