import React from 'react'
import { User, FileText, Mail, Phone, Building, Calendar, Package, Clock, Download, Share2 } from 'lucide-react'
import { MATERIALS } from '../../utils/validation'

const RegistrationDetails = ({ registrationData }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const downloadConfirmation = () => {
    const content = `
NATUREPOT CHALLENGE - REGISTRATION CONFIRMATION

Registration ID: ${registrationData.registrationId}
Registration Date: ${formatDate(registrationData.registeredAt)}

STUDENT INFORMATION:
Name: ${registrationData.name}
Roll Number: ${registrationData.rollNumber}
Department: ${registrationData.department}
Year of Study: ${registrationData.yearOfStudy}
Email: ${registrationData.email}
Phone: ${registrationData.phone}

SELECTED MATERIAL: ${MATERIALS[registrationData.selectedMaterial]?.name} ${MATERIALS[registrationData.selectedMaterial]?.icon}

IDEA DESCRIPTION:
${registrationData.ideaDescription || 'No specific idea provided'}

NEXT STEPS:
1. Join our WhatsApp group for updates
2. Start collecting your chosen material
3. Design and create your NaturePot
4. Submit photos by the deadline
5. Join us for the exhibition!

Thank you for joining the NaturePot Challenge! 🌿
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `NaturePot_Registration_${registrationData.registrationId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const shareRegistration = async () => {
    const shareText = `I've registered for the NaturePot Challenge! 🌿 Registration ID: ${registrationData.registrationId}. Join me in transforming waste into green classrooms!`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NaturePot Challenge Registration',
          text: shareText,
          url: window.location.origin
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText)
        alert('Registration details copied to clipboard!')
      } catch (error) {
        console.log('Error copying to clipboard:', error)
      }
    }
  }

  const details = [
    {
      icon: User,
      label: 'Name',
      value: registrationData.name
    },
    {
      icon: FileText,
      label: 'Roll Number',
      value: registrationData.rollNumber
    },
    {
      icon: Building,
      label: 'Department',
      value: registrationData.department
    },
    {
      icon: Calendar,
      label: 'Year of Study',
      value: registrationData.yearOfStudy
    },
    {
      icon: Mail,
      label: 'Email',
      value: registrationData.email
    },
    {
      icon: Phone,
      label: 'Phone',
      value: registrationData.phone
    },
    {
      icon: Package,
      label: 'Selected Material',
      value: `${MATERIALS[registrationData.selectedMaterial]?.name} ${MATERIALS[registrationData.selectedMaterial]?.icon}`
    },
    {
      icon: Clock,
      label: 'Registration Date',
      value: formatDate(registrationData.registeredAt)
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Registration Details</h2>
          <div className="flex space-x-2">
            <button
              onClick={downloadConfirmation}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={shareRegistration}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {details.map((detail, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <detail.icon className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600">{detail.label}</p>
                <p className="text-gray-800 break-words">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Idea Description */}
        {registrationData.ideaDescription && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="text-xl mr-2">💡</span>
              Your Creative Idea
            </h3>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
              <p className="text-gray-700 italic">"{registrationData.ideaDescription}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegistrationDetails