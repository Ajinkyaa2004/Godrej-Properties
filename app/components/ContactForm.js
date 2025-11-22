'use client';

import { useState, useEffect } from 'react';
import { Cormorant_Garamond } from 'next/font/google';
import { trackEvent, trackConversion } from '../utils/analytics';

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

const ContactForm = ({ isOpen, onClose, markAsSubmitted }) => {
  console.log('ContactForm rendered with isOpen:', isOpen);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '+91',
    phoneNumber: '',
    email: '',
    country: 'India',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const captureHiddenFields = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {};

    // Capture UTM parameters
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      if (urlParams.get(param)) {
        utmParams[param] = urlParams.get(param);
      }
    });

    // Detect device type
    const getDeviceType = () => {
      const userAgent = navigator.userAgent;
      if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
      if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
      return 'desktop';
    };

    return {
      sourcePage: window.location.href,
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      deviceType: getDeviceType(),
      utmParams,
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
      // Proceed with submission directly (backend handles duplicates)
      const hiddenFields = captureHiddenFields();

      const submitData = {
        ...formData,
        fullPhoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
        ...hiddenFields,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const result = await response.json();

      // Mark as submitted immediately to prevent showing again
      if (markAsSubmitted) {
        markAsSubmitted();
      }

      // Track Conversion in GA4
      trackConversion('form', 'Contact Form');
      trackEvent('form_submit', {
        form_name: 'Contact Form',
        page_location: window.location.href
      });

      setSubmitSuccess(true);
      setRetryCount(0);

      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          countryCode: '+91',
          phoneNumber: '',
          email: '',
          country: 'India',
        });
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);

      let errorMessage = 'An unexpected error occurred. ';

      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = 'Network connection issue. Please check your internet connection. ';
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error. Our team has been notified. ';
      } else if (error.message.includes('400')) {
        errorMessage = 'Invalid form data. Please check your inputs. ';
      } else if (error.message) {
        errorMessage = error.message + ' ';
      }

      setErrors({
        submit: errorMessage,
        canRetry: retryCount < MAX_RETRIES && !error.message.includes('400')
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
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
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-gray-600 text-sm px-4">Your information has been submitted successfully. You'll receive a confirmation email shortly with property details.</p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className={`text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent mb-2 ${cormorant.className}`}>
              Get In Touch
            </h2>
            <p className="text-gray-600 text-sm">
              Discover your dream home at Godrej Reserve
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.firstName ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="John"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.lastName ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
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
                  className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="9876543210"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.country ? 'border-red-300' : 'border-gray-300'
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
                  Submitting...
                </div>
              ) : (
                'Get Property Details'
              )}
            </button>

            {errors.submit && (
              <div className={`text-sm text-center mt-2 p-3 rounded-lg ${errors.submit.includes('already been processed')
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
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
            By submitting, you agree to our privacy policy. We'll contact you with property details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
