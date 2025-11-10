import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MaterialSelectionPage from './pages/MaterialSelectionPage'
import RegistrationPage from './pages/RegistrationPage'
import ConfirmationPage from './pages/ConfirmationPage'
import { getSelectedMaterial, getRegistrationData } from './utils/storage'

function App() {
  // Initialize app and clear old data on page load
  useEffect(() => {
    // You could add initialization logic here
    // For example, check if user should be redirected to a specific page
    console.log('NaturePot App initialized')
  }, [])

  return (
    <div className="App">
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Material Selection Route */}
        <Route
          path="/materials"
          element={<MaterialSelectionPage />}
        />

        {/* Registration Route */}
        <Route
          path="/register"
          element={<RegistrationPage />}
        />

        {/* Confirmation Route */}
        <Route
          path="/confirmation"
          element={<ConfirmationPage />}
        />

        {/* Catch all - redirect to home */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>
  )
}

export default App