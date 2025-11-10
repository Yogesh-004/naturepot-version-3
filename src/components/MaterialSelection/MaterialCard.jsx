import React from 'react'

const MaterialCard = ({ material, isSelected, onClick, disabled = false }) => {
  const getCardColor = () => {
    if (disabled) return 'bg-gray-100 border-gray-200'
    if (isSelected) return 'bg-primary-50 border-primary-500 ring-2 ring-primary-300'
    return 'bg-white border-gray-300 hover:border-primary-400 hover:shadow-xl'
  }

  const getIconSize = () => {
    return isSelected ? 'scale-110' : 'hover:scale-110'
  }

  return (
    <button
      onClick={() => !disabled && onClick(material)}
      disabled={disabled}
      className={`
        relative p-6 rounded-xl border-3 transition-all duration-300 transform
        ${getCardColor()}
        ${!disabled && !isSelected ? 'hover:scale-105 hover:-translate-y-1' : ''}
        ${isSelected ? 'scale-105 -translate-y-1 shadow-lg' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Icon */}
      <div className={`text-6xl mb-4 transition-transform duration-200 ${getIconSize()}`}>
        {material.icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {material.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {material.description}
      </p>

      {/* Hover Effect */}
      {!disabled && (
        <div className="absolute inset-0 bg-primary-500 bg-opacity-0 hover:bg-opacity-5 rounded-xl transition-all duration-300 pointer-events-none" />
      )}
    </button>
  )
}

export default MaterialCard