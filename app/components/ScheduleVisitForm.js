'use client';

import { useState } from 'react';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const countries = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
];

const ScheduleVisitForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+91',
    phoneNumber: '',
    preferredDate: '',
    country: 'India',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  // Validation functions
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    // Phone validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Preferred Date validation
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    } else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.preferredDate = 'Please select a future date';
      }
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const captureHiddenFields = () => {
    return {
      sourcePage: window.location.href,
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      deviceType: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
      timestamp: new Date().toISOString(),
    };
  };

  const handleSubmit = async (e, isRetry = false) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors(prev => ({ ...prev, submit: '' }));

    try {
      const hiddenFields = captureHiddenFields();
      
      const submitData = {
        ...formData,
        fullPhoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
        ...hiddenFields,
      };

      const response = await fetch('/api/schedule-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (response.status === 409) {
          throw new Error('A visit is already scheduled for this date. Please choose a different date.');
        }
        
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const result = await response.json();
      
      setSubmitSuccess(true);
      setRetryCount(0);
      
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        // Reset form
        setFormData({
          fullName: '',
          countryCode: '+91',
          phoneNumber: '',
          preferredDate: '',
          country: 'India',
        });
      }, 3000);
    } catch (error) {
      console.error('Schedule visit submission error:', error);
      
      let errorMessage = 'An unexpected error occurred. ';
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = 'Network connection issue. Please check your internet connection. ';
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error. Our team has been notified. ';
      } else if (error.message.includes('already scheduled')) {
        errorMessage = error.message;
      } else if (error.message.includes('400')) {
        errorMessage = 'Invalid form data. Please check your inputs. ';
      } else if (error.message) {
        errorMessage = error.message + ' ';
      }
      
      setErrors({ 
        submit: errorMessage,
        canRetry: retryCount < MAX_RETRIES && !error.message.includes('400') && !error.message.includes('already scheduled')
      });
      
      if (!isRetry) {
        setRetryCount(prev => prev + 1);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = (e) => {
    e.preventDefault();
    handleSubmit(e, true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-sync country code when country changes
      if (field === 'country') {
        const selectedCountry = countries.find(c => c.name === value);
        if (selectedCountry) {
          newData.countryCode = selectedCountry.code;
        }
      }
      
      return newData;
    });
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full p-2 transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Success State */}
        {submitSuccess && (
          <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Visit Scheduled!</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Thank you for scheduling a visit! Our team will reach out to you soon to confirm the details and arrange your property tour.
              </p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className={`text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent mb-2 ${cormorant.className}`}>
              Schedule Visit
            </h2>
            <p className="text-gray-600 text-sm">
              Book your personalized property tour
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                  errors.fullName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) => handleInputChange('countryCode', e.target.value)}
                  className="px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.name})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="9876543210"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date *
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                min={getTodayDate()}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                  errors.preferredDate ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                  errors.country ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-6 rounded-lg font-medium hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Scheduling Visit...
                </div>
              ) : (
                'Schedule Visit'
              )}
            </button>

            {errors.submit && (
              <div className="bg-red-50 text-red-700 border border-red-200 text-sm text-center mt-2 p-3 rounded-lg">
                <p>{errors.submit}</p>
                {errors.canRetry && (
                  <button
                    onClick={handleRetry}
                    disabled={isSubmitting}
                    className="mt-2 text-xs underline hover:no-underline disabled:opacity-50"
                  >
                    {retryCount > 0 ? `Retry (${retryCount}/${MAX_RETRIES})` : 'Retry'}
                  </button>
                )}
              </div>
            )}
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Our team will contact you to confirm your visit details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisitForm;
