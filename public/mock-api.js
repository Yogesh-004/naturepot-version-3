// Mock API for development purposes
// This simulates the server-side registration logic

// Mock database storage
const mockDatabase = new Map();

// Rate limiting simulation
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];

  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  // Add current request
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return true;
}

function generateRegistrationId() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `NP${year}-${random}`;
}

function validateForm(data) {
  const errors = {};

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  } else if (!/^[a-zA-Z\s]+$/.test(data.name.trim())) {
    errors.name = 'Name should contain only letters and spaces';
  }

  // Roll number validation
  if (!data.rollNumber || data.rollNumber.trim().length < 3) {
    errors.rollNumber = 'Roll number must be at least 3 characters long';
  } else if (!/^[a-zA-Z0-9]+$/.test(data.rollNumber.trim())) {
    errors.rollNumber = 'Roll number should contain only letters and numbers';
  }

  // Department validation
  if (!data.department || data.department.trim().length < 2) {
    errors.department = 'Department must be at least 2 characters long';
  }

  // Year validation
  const yearPattern = /^(1st|2nd|3rd|4th|5th|\d+)[a-zA-Z]*\s*Year/i;
  if (!data.yearOfStudy || !yearPattern.test(data.yearOfStudy.trim())) {
    errors.yearOfStudy = 'Please enter a valid year (e.g., "1st Year", "2nd Year", "3rd Year")';
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailPattern.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  const phonePattern = /^\+?[\d\s()-]{10,15}$/;
  if (!data.phone || !phonePattern.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number (10-15 digits)';
  }

  // Material validation
  const validMaterials = ['plastic_bottles', 'thread', 'shoes', 'metal_cans', 'cardboard', 'other'];
  if (!data.selectedMaterial || !validMaterials.includes(data.selectedMaterial)) {
    errors.selectedMaterial = 'Please select a valid material type';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Mock API endpoint handler
window.mockRegisterAPI = async function(requestData) {
  console.log('Mock API: Received registration request:', requestData);

  try {
    // Simulate rate limiting
    const clientIp = '127.0.0.1'; // Mock IP for development
    if (!checkRateLimit(clientIp)) {
      return {
        success: false,
        error: {
          message: 'Too many registration attempts. Please try again later.'
        }
      };
    }

    // Validate form data
    const validation = validateForm(requestData);
    if (!validation.isValid) {
      const firstErrorField = Object.keys(validation.errors)[0];
      return {
        success: false,
        error: {
          field: firstErrorField,
          message: validation.errors[firstErrorField]
        }
      };
    }

    // Extract and format data
    const registrationData = {
      id: generateRegistrationId(),
      name: requestData.name.trim(),
      rollNumber: requestData.rollNumber.trim().toUpperCase(),
      department: requestData.department.trim(),
      yearOfStudy: requestData.yearOfStudy.trim(),
      email: requestData.email.trim().toLowerCase(),
      phone: requestData.phone.replace(/\s+/g, ''),
      selectedMaterial: requestData.selectedMaterial,
      ideaDescription: requestData.ideaDescription?.trim() || '',
      registeredAt: new Date().toISOString(),
      status: 'registered',
      ipAddress: clientIp
    };

    // Check for duplicates
    for (const [id, existing] of mockDatabase.entries()) {
      if (existing.rollNumber === registrationData.rollNumber) {
        return {
          success: false,
          error: {
            field: 'rollNumber',
            message: 'This roll number is already registered'
          }
        };
      }

      if (existing.email === registrationData.email) {
        return {
          success: false,
          error: {
            field: 'email',
            message: 'This email address is already registered'
          }
        };
      }
    }

    // Store registration
    mockDatabase.set(registrationData.id, registrationData);

    console.log('Mock API: Registration successful:', registrationData);

    // Return success response
    return {
      success: true,
      data: {
        id: registrationData.id,
        message: 'Registration successful! Check your email for confirmation.'
      }
    };

  } catch (error) {
    console.error('Mock API: Registration error:', error);
    return {
      success: false,
      error: {
        message: 'Registration failed. Please try again later.'
      }
    };
  }
};

// Store mock database in window for debugging
window.mockDatabase = mockDatabase;