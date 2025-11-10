import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronLeft, Home, Package, FileText, CheckCircle } from 'lucide-react'

const Navigation = ({ showBack = false, backTo = -1, title, currentStep = 0 }) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (typeof backTo === 'number') {
      navigate(backTo)
    } else {
      navigate(backTo)
    }
  }

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/materials', icon: Package, label: 'Materials' },
    { path: '/register', icon: FileText, label: 'Register' },
    { path: '/confirmation', icon: CheckCircle, label: 'Success' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Back Button */}
          {showBack && (
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700
                       transition-colors duration-200 p-2 rounded-lg hover:bg-primary-50"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
          )}

          {/* Page Title */}
          {title && (
            <h2 className="text-lg font-semibold text-gray-800 flex-1 text-center">
              {title}
            </h2>
          )}

          {/* Progress Indicator */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <div key={item.path} className="flex items-center">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium
                    transition-all duration-200
                    ${isActive
                      ? 'bg-primary-500 text-white'
                      : index < currentStep
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-400 hover:text-gray-600'
                    }
                  `}
                >
                  <item.icon className="w-3 h-3" />
                  <span>{item.label}</span>
                </NavLink>
                {index < navItems.length - 1 && (
                  <div className="w-2 h-0.5 bg-gray-300 mx-1" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Progress */}
          <div className="flex md:hidden">
            <div className="flex items-center space-x-1">
              {[0, 1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                    step <= currentStep ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation