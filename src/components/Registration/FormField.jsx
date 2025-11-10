import React from 'react'

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  maxLength,
  helpText,
  autoComplete,
  ...props
}) => {
  const getInputType = () => {
    if (type === 'tel') return 'tel'
    if (type === 'email') return 'email'
    return 'text'
  }

  const getInputMode = () => {
    if (type === 'tel') return 'tel'
    if (type === 'email') return 'email'
    return 'text'
  }

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={getInputType()}
        inputMode={getInputMode()}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className={`
          form-input
          ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
        {...props}
      />

      {/* Character Counter */}
      {maxLength && (
        <div className="flex justify-between items-center">
          {helpText && (
            <p className="text-xs text-gray-500">{helpText}</p>
          )}
          <p className="text-xs text-gray-400 ml-auto">
            {value?.length || 0}/{maxLength}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-1 text-red-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="form-error">{error}</span>
        </div>
      )}

      {/* Help Text (no character counter) */}
      {helpText && !maxLength && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  )
}

export default FormField