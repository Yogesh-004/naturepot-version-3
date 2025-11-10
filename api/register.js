// Vercel serverless function for registration submission
// In a real deployment, this would connect to a database like Vercel KV

import { validateField, validateForm } from '../src/utils/validation.js'

// Mock database for demonstration (in production, use Vercel KV or real database)
const mockDatabase = new Map()

// Rate limiting (simple implementation)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5

function checkRateLimit(ip) {
  const now = Date.now()
  const requests = rateLimitMap.get(ip) || []

  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW)

  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  // Add current request
  validRequests.push(now)
  rateLimitMap.set(ip, validRequests)
  return true
}

function generateRegistrationId() {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
  return `NP${year}-${random}`
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: {
        message: 'Method not allowed'
      }
    })
  }

  try {
    // Rate limiting
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        error: {
          message: 'Too many registration attempts. Please try again later.'
        }
      })
    }

    // Get and validate request body
    const body = req.body
    if (!body) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Request body is required'
        }
      })
    }

    // Validate required fields
    const validation = validateForm(body)
    if (!validation.isValid) {
      // Find the first field with an error for detailed response
      const firstErrorField = Object.keys(validation.errors)[0]
      return res.status(400).json({
        success: false,
        error: {
          field: firstErrorField,
          message: validation.errors[firstErrorField]
        }
      })
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

    // Check for duplicate roll number or email
    for (const [id, existing] of mockDatabase.entries()) {
      if (existing.rollNumber === registrationData.rollNumber) {
        return res.status(409).json({
          success: false,
          error: {
            field: 'rollNumber',
            message: 'This roll number is already registered'
          }
        })
      }

      if (existing.email === registrationData.email) {
        return res.status(409).json({
          success: false,
          error: {
            field: 'email',
            message: 'This email address is already registered'
          }
        })
      }
    }

    // Store registration (in production, use real database)
    mockDatabase.set(registrationData.id, registrationData)

    // Log successful registration (for monitoring)
    console.log(`New registration: ${registrationData.id} - ${registrationData.name} (${registrationData.email})`)

    // Return success response
    return res.status(201).json({
      success: true,
      data: {
        id: registrationData.id,
        message: 'Registration successful! Check your email for confirmation.'
      }
    })

  } catch (error) {
    console.error('Registration error:', error)

    // Return generic error to avoid exposing implementation details
    return res.status(500).json({
      success: false,
      error: {
        message: 'Registration failed. Please try again later.'
      }
    })
  }
}

// Enable CORS for development
export const config = {
  api: {
    bodyParser: true,
    cors: {
      origin: ['http://localhost:3000', 'https://naturepot.vercel.app'],
      methods: ['POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  },
}