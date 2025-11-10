// Netlify serverless function for registration submission

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10
}

// Mock database for demonstration
const mockDatabase = new Map()

// Rate limiting
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5

function checkRateLimit(ip) {
  const now = Date.now()
  const requests = rateLimitMap.get(ip) || []
  const validRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW)

  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  validRequests.push(now)
  rateLimitMap.set(ip, validRequests)
  return true
}

function generateRegistrationId() {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
  return `NP${year}-${random}`
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: { message: 'Method not allowed' }
      })
    }
  }

  try {
    // Rate limiting
    const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown'
    if (!checkRateLimit(clientIp)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          success: false,
          error: { message: 'Too many registration attempts. Please try again later.' }
        })
      }
    }

    // Parse request body
    const body = JSON.parse(event.body)
    
    if (!body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: { message: 'Request body is required' }
        })
      }
    }

    // Validate required fields
    const requiredFields = ['name', 'rollNumber', 'department', 'yearOfStudy', 'email', 'phone', 'selectedMaterial']
    
    for (const field of requiredFields) {
      if (!body[field] || body[field].toString().trim() === '') {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: {
              field: field,
              message: `${field} is required`
            }
          })
        }
      }
    }

    // Validate email
    if (!validateEmail(body.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: {
            field: 'email',
            message: 'Invalid email address'
          }
        })
      }
    }

    // Validate phone
    if (!validatePhone(body.phone)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: {
            field: 'phone',
            message: 'Invalid phone number. Must be 10 digits'
          }
        })
      }
    }

    // Extract and format data
    const registrationData = {
      id: generateRegistrationId(),
      name: body.name.trim(),
      rollNumber: body.rollNumber.trim().toUpperCase(),
      department: body.department.trim(),
      yearOfStudy: body.yearOfStudy.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.replace(/\s+/g, ''),
      selectedMaterial: body.selectedMaterial,
      ideaDescription: body.ideaDescription?.trim() || '',
      registeredAt: new Date().toISOString(),
      status: 'registered',
      ipAddress: clientIp
    }

    // Check for duplicates
    for (const [id, existing] of mockDatabase.entries()) {
      if (existing.rollNumber === registrationData.rollNumber) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({
            success: false,
            error: {
              field: 'rollNumber',
              message: 'This roll number is already registered'
            }
          })
        }
      }

      if (existing.email === registrationData.email) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({
            success: false,
            error: {
              field: 'email',
              message: 'This email address is already registered'
            }
          })
        }
      }
    }

    // Store registration
    mockDatabase.set(registrationData.id, registrationData)

    // Log successful registration
    console.log(`New registration: ${registrationData.id} - ${registrationData.name}`)

    // Return success
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          id: registrationData.id,
          message: 'Registration successful! Check your email for confirmation.'
        }
      })
    }

  } catch (error) {
    console.error('Registration error:', error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: { message: 'Registration failed. Please try again later.' }
      })
    }
  }
}