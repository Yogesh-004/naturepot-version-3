import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Loader2, Save, User, Mail, Phone, Building, Calendar, FileText, Lightbulb } from 'lucide-react'
import FormField from './FormField'
import { validateField, validateForm, generateRegistrationId, MATERIALS } from '../../utils/validation'
import { saveSelectedMaterial, getSelectedMaterial, saveFormDraft, loadFormDraft, clearFormDraft } from '../../utils/storage'

const RegistrationForm = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      rollNumber: '',
      department: '',
      yearOfStudy: '',
      email: '',
      phone: '',
      ideaDescription: ''
    }
  })

  const watchedValues = watch()

  // Load saved data on component mount
  useEffect(() => {
    const savedMaterial = getSelectedMaterial()
    if (!savedMaterial) {
      navigate('/materials')
      return
    }
    setSelectedMaterial(savedMaterial)

    // Load form draft if exists
    const draft = loadFormDraft()
    if (draft) {
      Object.keys(draft).forEach(key => {
        if (key !== 'selectedMaterial') {
          setValue(key, draft[key])
        }
      })
    }
  }, [navigate, setValue])

  // Auto-save form draft
  useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        saveFormDraft({
          ...watchedValues,
          selectedMaterial
        })
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [watchedValues, isDirty, selectedMaterial])

  const handleFieldChange = (fieldName, value) => {
    setValue(fieldName, value, { shouldValidate: true })
    clearErrors(fieldName)

    // Real-time validation
    const validation = validateField(fieldName, value)
    if (!validation.isValid) {
      setError(fieldName, { message: validation.message })
    }
  }

  const validateAndSubmit = async (formData) => {
    try {
      setIsLoading(true)
      setServerError('')

      // Add selected material and generate ID
      const submissionData = {
        ...formData,
        selectedMaterial: selectedMaterial.id,
        registrationId: generateRegistrationId()
      }

      // Format phone number and year
      submissionData.phone = submissionData.phone.replace(/\s+/g, '')
      submissionData.yearOfStudy = submissionData.yearOfStudy.trim()

      // Client-side validation
      const validation = validateForm(submissionData)
      if (!validation.isValid) {
        Object.keys(validation.errors).forEach(field => {
          setError(field, { message: validation.errors[field] })
        })
        setIsLoading(false)
        return
      }

      // Submit to API - UPDATED FOR NETLIFY
      const response = await fetch('/.netlify/functions/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.error?.field && result.error?.message) {
          setError(result.error.field, { message: result.error.message })
        } else {
          setServerError(result.error?.message || 'Registration failed. Please try again.')
        }
        setIsLoading(false)
        return
      }

      // Success - clear form draft and save registration data
      clearFormDraft()
      localStorage.setItem('naturepot_success_data', JSON.stringify({
        ...submissionData,
        ...result.data,
        registeredAt: new Date().toISOString()
      }))

      navigate('/confirmation')
    } catch (error) {
      console.error('Registration error:', error)
      setServerError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/materials')
  }

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      icon: User,
      autoComplete: 'name',
      required: true
    },
    {
      name: 'rollNumber',
      label: 'Roll Number',
      type: 'text',
      placeholder: 'e.g., 2024CS045',
      icon: FileText,
      autoComplete: 'off',
      required: true
    },
    {
      name: 'department',
      label: 'Department',
      type: 'text',
      placeholder: 'e.g., Computer Science, Mechanical, etc.',
      icon: Building,
      autoComplete: 'organization',
      required: true
    },
    {
      name: 'yearOfStudy',
      label: 'Year of Study',
      type: 'text',
      placeholder: 'e.g., 1st Year, 2nd Year, 3rd Year',
      icon: Calendar,
      autoComplete: 'off',
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'your.email@college.edu',
      icon: Mail,
      autoComplete: 'email',
      required: true
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+91 98765 43210',
      icon: Phone,
      autoComplete: 'tel',
      required: true
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Selected Material Display */}
      {selectedMaterial && (
        <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-3xl">{selectedMaterial.icon}</span>
            <div>
              <p className="text-sm text-primary-600 font-medium">Selected Material:</p>
              <p className="text-lg font-bold text-primary-800">{selectedMaterial.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(validateAndSubmit)} className="space-y-6">
        {/* Server Error */}
        {serverError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-red-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Registration Error</span>
            </div>
            <p className="text-red-600 mt-1">{serverError}</p>
          </div>
        )}

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map((field) => (
            <FormField
              key={field.name}
              {...field}
              value={watchedValues[field.name]}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              error={errors[field.name]?.message}
            />
          ))}
        </div>

        {/* Optional Idea Description */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-800">Your Creative Idea (Optional)</h3>
          </div>

          <FormField
            name="ideaDescription"
            label="Briefly describe your pot design idea"
            type="textarea"
            placeholder="Share your creative vision for your NaturePot creation..."
            value={watchedValues.ideaDescription}
            onChange={(e) => handleFieldChange('ideaDescription', e.target.value)}
            error={errors.ideaDescription?.message}
            maxLength={140}
            helpText="Maximum 140 characters. This helps us understand your creative approach!"
            rows={3}
            required={false}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <button
            type="button"
            onClick={handleBack}
            className="btn-secondary flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          <button
            type="submit"
            disabled={isLoading || !isValid}
            className="btn-primary flex items-center space-x-2 min-w-[160px] justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Register</span>
              </>
            )}
          </button>
        </div>

        {/* Form Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Your information will be used only for this event management.</p>
          <p>By registering, you agree to participate in the NaturePot Challenge.</p>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm
