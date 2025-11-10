import React, { useState } from 'react'
import { MATERIALS } from '../../utils/validation'
import MaterialCard from './MaterialCard'

const MaterialGrid = ({ onMaterialSelect, selectedMaterial: externalSelectedMaterial }) => {
  const [internalSelectedMaterial, setInternalSelectedMaterial] = useState(null)

  const selectedMaterial = externalSelectedMaterial || internalSelectedMaterial

  const materials = [
    {
      id: 'plastic_bottles',
      name: MATERIALS.plastic_bottles.name,
      icon: MATERIALS.plastic_bottles.icon,
      description: 'Soda bottles, water bottles, containers',
      color: 'blue'
    },
    {
      id: 'thread',
      name: MATERIALS.thread.name,
      icon: MATERIALS.thread.icon,
      description: 'Colorful threads, yarn, strings',
      color: 'pink'
    },
    {
      id: 'shoes',
      name: MATERIALS.shoes.name,
      icon: MATERIALS.shoes.icon,
      description: 'Sneakers, boots, slippers',
      color: 'green'
    },
    {
      id: 'metal_cans',
      name: MATERIALS.metal_cans.name,
      icon: MATERIALS.metal_cans.icon,
      description: 'Food cans, paint containers',
      color: 'gray'
    },
    {
      id: 'cardboard',
      name: MATERIALS.cardboard.name,
      icon: MATERIALS.cardboard.icon,
      description: 'Boxes, packaging materials',
      color: 'yellow'
    },
    {
      id: 'other',
      name: MATERIALS.other.name,
      icon: MATERIALS.other.icon,
      description: 'Your own creative ideas!',
      color: 'purple'
    }
  ]

  const handleMaterialSelect = (material) => {
    if (externalSelectedMaterial !== undefined) {
      // External control - let parent handle state
      onMaterialSelect(material)
    } else {
      // Internal control - manage own state
      setInternalSelectedMaterial(material)
      onMaterialSelect && onMaterialSelect(material)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Instructions */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Choose Your Material 🎨
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the recycled material you'd like to use for your NaturePot creation.
          Each material offers unique possibilities for creative expression!
        </p>
      </div>

      {/* Material Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            isSelected={selectedMaterial?.id === material.id}
            onClick={() => handleMaterialSelect(material)}
          />
        ))}
      </div>

      {/* Selected Material Display */}
      {selectedMaterial && (
        <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl">{selectedMaterial.icon}</span>
            <div>
              <p className="text-sm text-primary-600 font-medium">Selected Material:</p>
              <p className="text-lg font-bold text-primary-800">{selectedMaterial.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
          <span className="text-2xl mr-2">💡</span>
          Pro Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✓</span>
            <p className="text-sm text-gray-700">
              <strong>Safety First:</strong> Make sure materials are clean and safe to handle
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✓</span>
            <p className="text-sm text-gray-700">
              <strong>Be Creative:</strong> Think about colors, textures, and patterns
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✓</span>
            <p className="text-sm text-gray-700">
              <strong>Plan Ahead:</strong> Consider how your plant will grow in the pot
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✓</span>
            <p className="text-sm text-gray-700">
              <strong>Get Help:</strong> Ask friends or family for ideas and assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaterialGrid