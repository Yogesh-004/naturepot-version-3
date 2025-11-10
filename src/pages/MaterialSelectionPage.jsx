import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Navigation from '../components/Layout/Navigation'
import MaterialGrid from '../components/MaterialSelection/MaterialGrid'
import { saveSelectedMaterial, getSelectedMaterial } from '../utils/storage'

const MaterialSelectionPage = () => {
  const navigate = useNavigate()
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load previously selected material on component mount
    const savedMaterial = getSelectedMaterial()
    if (savedMaterial) {
      setSelectedMaterial(savedMaterial)
    }
  }, [])

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material)
    saveSelectedMaterial(material)
  }

  const handleContinue = () => {
    if (selectedMaterial) {
      setIsLoading(true)
      // Small delay to show loading state
      setTimeout(() => {
        navigate('/register')
      }, 300)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-gradient">
      <Header />
      <Navigation
        showBack={true}
        backTo="/"
        title="Choose Your Material"
        currentStep={1}
      />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <MaterialGrid
            onMaterialSelect={handleMaterialSelect}
            selectedMaterial={selectedMaterial}
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 max-w-6xl mx-auto">
            <button
              onClick={handleBack}
              className="btn-secondary flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>

            <button
              onClick={handleContinue}
              disabled={!selectedMaterial || isLoading}
              className="btn-primary flex items-center space-x-2 min-w-[140px] justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MaterialSelectionPage