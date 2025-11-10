// Form validation rules and functions
export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Name must be 2-100 characters and contain only letters'
  },
  rollNumber: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9]+$/,
    message: 'Roll number must be at least 3 characters (alphanumeric only)'
  },
  department: {
    required: true,
    minLength: 2,
    maxLength: 100,
    message: 'Department must be 2-100 characters'
  },
  yearOfStudy: {
    required: true,
    pattern: /^(1st|2nd|3rd|4th|5th|\d+)[a-zA-Z]*\s*Year/i,
    message: 'Please enter a valid year (e.g., "1st Year", "2nd Year", "3rd Year")'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    required: true,
    pattern: /^\+?[\d\s()-]{10,15}$/,
    message: 'Phone number must be 10-15 digits (country code optional)'
  },
  ideaDescription: {
    required: false,
    maxLength: 140,
    message: 'Idea description must be 140 characters or less'
  }
}

export const MATERIALS = {
  plastic_bottles: { name: "Plastic Bottles", icon: "🥤" },
  thread: { name: "Thread/Yarn", icon: "🧵" },
  shoes: { name: "Old Shoes", icon: "👟" },
  metal_cans: { name: "Metal Cans", icon: "🥫" },
  cardboard: { name: "Cardboard", icon: "📦" },
  other: { name: "Other Materials", icon: "🔧" }
}

export const validateField = (fieldName, value) => {
  const rule = VALIDATION_RULES[fieldName]
  if (!rule) return { isValid: true, message: '' }

  // Required field validation
  if (rule.required && (!value || value.trim() === '')) {
    return { isValid: false, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` }
  }

  // Skip further validation if field is optional and empty
  if (!rule.required && (!value || value.trim() === '')) {
    return { isValid: true, message: '' }
  }

  // Length validation
  if (rule.minLength && value.length < rule.minLength) {
    return { isValid: false, message: rule.message }
  }

  if (rule.maxLength && value.length > rule.maxLength) {
    return { isValid: false, message: rule.message }
  }

  // Pattern validation
  if (rule.pattern && !rule.pattern.test(value)) {
    return { isValid: false, message: rule.message }
  }

  return { isValid: true, message: '' }
}

export const validateForm = (formData) => {
  const errors = {}
  let isValid = true

  Object.keys(formData).forEach(fieldName => {
    const validation = validateField(fieldName, formData[fieldName])
    if (!validation.isValid) {
      errors[fieldName] = validation.message
      isValid = false
    }
  })

  return { isValid, errors }
}

export const generateRegistrationId = () => {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
  return `NP${year}-${random}`
}

export const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '')
  return cleaned
}

export const formatYearOfStudy = (year) => {
  // Standardize year format
  const normalized = year.trim().toLowerCase()
  if (normalized.match(/^\d+[a-z]*\s*year$/)) {
    return normalized.charAt(0).toUpperCase() + normalized.slice(1)
  }
  return year
}