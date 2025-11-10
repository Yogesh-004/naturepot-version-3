// Local storage utility functions
export const storageKeys = {
  SELECTED_MATERIAL: 'naturepot_selected_material',
  REGISTRATION_DATA: 'naturepot_registration_data',
  FORM_DRAFT: 'naturepot_form_draft'
}

export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error writing to localStorage:', error)
      return false
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  },

  clear: () => {
    try {
      Object.values(storageKeys).forEach(key => {
        localStorage.removeItem(key)
      })
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}

export const saveFormDraft = (formData) => {
  return storage.set(storageKeys.FORM_DRAFT, formData)
}

export const loadFormDraft = () => {
  return storage.get(storageKeys.FORM_DRAFT)
}

export const clearFormDraft = () => {
  return storage.remove(storageKeys.FORM_DRAFT)
}

export const saveSelectedMaterial = (material) => {
  return storage.set(storageKeys.SELECTED_MATERIAL, material)
}

export const getSelectedMaterial = () => {
  return storage.get(storageKeys.SELECTED_MATERIAL)
}

export const saveRegistrationData = (data) => {
  return storage.set(storageKeys.REGISTRATION_DATA, data)
}

export const getRegistrationData = () => {
  return storage.get(storageKeys.REGISTRATION_DATA)
}