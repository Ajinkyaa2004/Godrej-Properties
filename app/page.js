"use client";

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Cormorant_Garamond } from 'next/font/google';
import ContactForm from './components/ContactForm';
import ScheduleVisitForm from './components/ScheduleVisitForm';
import Footer from './components/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700', '700'],
})

const GalleryModal = ({ isOpen, onClose, images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setImageLoading(true);
    setImageError(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageLoading(true);
    setImageError(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen, currentIndex]);

  useEffect(() => {
    // Reset to first image when modal opens
    if (isOpen) {
      setCurrentIndex(0);
      setImageLoading(true);
      setImageError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="relative w-full max-w-6xl mx-4 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="absolute -top-12 left-0 text-white">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm text-gray-300">Image {currentIndex + 1} of {images.length}</p>
        </div>

        {/* Main Image */}
        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
          <div className="relative w-full h-[70vh] flex items-center justify-center">
            {/* Loading Spinner */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent"></div>
              </div>
            )}

            {/* Error State */}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <svg className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>Image failed to load</p>
                </div>
              </div>
            )}

            {/* Main Image */}
            <img
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
                console.error('Failed to load image:', images[currentIndex]);
              }}
              style={{ maxWidth: '100%', maxHeight: '70vh' }}
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${idx === currentIndex
                ? 'border-amber-500 scale-110 shadow-lg shadow-amber-500/50'
                : 'border-white/30 hover:border-white/60'
                }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Placeholder for old implementation
const OldGalleryModal = ({ isOpen, onClose, images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full max-w-6xl h-[80vh]" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-amber-400 transition-colors"
          aria-label="Close gallery"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, idx) => (
              <div key={idx} className="min-w-full h-full flex items-center justify-center">
                <Image
                  src={img}
                  alt={`${title} - View ${idx + 1}`}
                  width={1200}
                  height={600}
                  className="max-h-full max-w-full object-contain"
                  priority={idx === 0}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  quality={80}
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full transition-opacity duration-300 opacity-70 hover:opacity-100"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full transition-opacity duration-300 opacity-70 hover:opacity-100"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`w-3 h-3 rounded-full ${currentIndex === idx ? 'bg-amber-500' : 'bg-white/50'}`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Static Image Box Component - Optimized for performance
const StaticImageBox = ({ image, alt, onGalleryClick }) => {
  const handleClick = () => {
    const formSubmitted = localStorage.getItem('contactFormSubmitted');

    if (formSubmitted === 'true') {
      // User has filled the form, redirect to gallery
      window.location.href = '/gallery';
    } else {
      // User hasn't filled the form, open contact form
      if (onGalleryClick) {
        onGalleryClick();
      }
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer h-full transition-shadow duration-300 hover:shadow-xl"
      onClick={handleClick}
    >
      <div className="relative h-full overflow-hidden">
        <Image
          src={image}
          alt={alt}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          quality={80}
        />
      </div>
      {/* Simple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {/* View Gallery text */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
        <div className="bg-black/60 px-4 py-1.5 rounded-lg">
          <p className="text-white text-sm font-semibold">View Gallery</p>
        </div>
      </div>
    </div>
  );
};

// Amenities Image Grid Component - Optimized
const AmenitiesImageGrid = ({ onGalleryClick }) => {
  return (
    <div className="space-y-4">
      {/* First Row - Two columns */}
      <div className="grid grid-cols-2 gap-4">
        {/* Image Box 1 */}
        <div className="h-48">
          <StaticImageBox image="/image1.jpg" alt="Amenity view 1" onGalleryClick={onGalleryClick} />
        </div>

        {/* Image Box 2 */}
        <div className="h-48">
          <StaticImageBox image="/image4.jpg" alt="Amenity view 2" onGalleryClick={onGalleryClick} />
        </div>
      </div>

      {/* Second Row - Full width video */}
      <div className="w-full">
        <div className="relative overflow-hidden rounded-xl shadow-lg border border-amber-100/70 h-56 group transition-all duration-300 hover:shadow-amber-200/40">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/IMG_2616_2.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent opacity-40 group-hover:opacity-55 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-200">Immersive Preview</p>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-200">Room Walkthrough</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-amber-200 text-xs font-medium">
              <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              <span>Now Playing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Third Row - Two columns */}
      <div className="grid grid-cols-2 gap-4">
        {/* Image Box 3 */}
        <div className="h-48">
          <StaticImageBox image="/image7.jpg" alt="Amenity view 3" onGalleryClick={onGalleryClick} />
        </div>

        {/* Image Box 4 */}
        <div className="h-48">
          <StaticImageBox image="/image10.jpg" alt="Amenity view 4" onGalleryClick={onGalleryClick} />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryModalImages, setGalleryModalImages] = useState([]);
  const [galleryModalTitle, setGalleryModalTitle] = useState('');
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hello! 👋 Welcome to Godrej Reserve. How can I assist you today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ApartmentComplex",
        "name": "Godrej Reserve",
        "description": "Premium luxury residential project offering 3 & 4 BHK apartments in Kandivali East, Mumbai. Spread across 18.6 acres with world-class amenities.",
        "priceRange": "₹3.75 Cr - ₹8.50 Cr",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kandivali East",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "postalCode": "400101",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "19.2074",
          "longitude": "72.8777"
        },
        "numberOfAccommodationUnits": "Multiple",
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Swimming Pool" },
          { "@type": "LocationFeatureSpecification", "name": "Fitness Center" },
          { "@type": "LocationFeatureSpecification", "name": "Clubhouse" },
          { "@type": "LocationFeatureSpecification", "name": "Landscaped Gardens" },
          { "@type": "LocationFeatureSpecification", "name": "Children Play Area" },
          { "@type": "LocationFeatureSpecification", "name": "24/7 Security" }
        ],
        "containsPlace": [
          {
            "@type": "Accommodation",
            "name": "3 BHK Apartment - 1100 sq.ft",
            "floorSize": { "@type": "QuantitativeValue", "value": "1100", "unitCode": "SQF" },
            "numberOfRooms": "3",
            "offers": {
              "@type": "Offer",
              "price": "37500000",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@type": "Accommodation",
            "name": "3 BHK Apartment - 1330+ sq.ft",
            "floorSize": { "@type": "QuantitativeValue", "value": "1330", "unitCode": "SQF" },
            "numberOfRooms": "3",
            "offers": {
              "@type": "Offer",
              "price": "51500000",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@type": "Accommodation",
            "name": "3 BHK Apartment - 1450+ sq.ft",
            "floorSize": { "@type": "QuantitativeValue", "value": "1450", "unitCode": "SQF" },
            "numberOfRooms": "3",
            "offers": {
              "@type": "Offer",
              "price": "57500000",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@type": "Accommodation",
            "name": "4 BHK Apartment - 2000+ sq.ft",
            "floorSize": { "@type": "QuantitativeValue", "value": "2000", "unitCode": "SQF" },
            "numberOfRooms": "4",
            "offers": {
              "@type": "Offer",
              "price": "72500000",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          }
        ]
      },
      {
        "@type": "RealEstateAgent",
        "name": "Godrej Properties",
        "description": "Leading real estate developer in India, offering premium residential and commercial properties.",
        "url": "https://godrejreserve.com",
        "logo": "https://godrejreserve.com/Layer 5.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kandivali East",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "postalCode": "400101",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Sales",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi", "Marathi"]
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "Godrej Reserve Sales Office",
        "image": "https://godrejreserve.com/hero.png",
        "description": "Luxury residential apartments sales office in Kandivali East, Mumbai",
        "@id": "https://godrejreserve.com",
        "url": "https://godrejreserve.com",
        "telephone": "+91-XXXXXXXXXX",
        "priceRange": "₹₹₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kandivali East",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "postalCode": "400101",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "19.2074",
          "longitude": "72.8777"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the price range for apartments in Godrej Reserve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Godrej Reserve offers premium apartments starting from ₹3.75 Cr for 3 BHK (1100 sq.ft) up to ₹8.50 Cr for 4 BHK (2000+ sq.ft). Prices vary based on configuration, floor, and view."
            }
          },
          {
            "@type": "Question",
            "name": "What configurations are available at Godrej Reserve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Godrej Reserve offers spacious 3 BHK apartments (1100 sq.ft, 1330+ sq.ft, 1450+ sq.ft) and luxurious 4 BHK apartments (2000+ sq.ft) with premium specifications and world-class amenities."
            }
          },
          {
            "@type": "Question",
            "name": "Where is Godrej Reserve located?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Godrej Reserve is located in Kandivali East, Mumbai, with excellent connectivity to Western Express Highway, Dahisar Metro, and major landmarks. The project spans 18.6 acres with just 6 towers."
            }
          },
          {
            "@type": "Question",
            "name": "When is the expected possession date?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The expected possession date for Godrej Reserve is December 2027. The project is currently under construction with regular updates available."
            }
          },
          {
            "@type": "Question",
            "name": "Is Godrej Reserve RERA approved?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Godrej Reserve is RERA approved with Registration Number: P51800052847. The project is fully compliant with all regulations."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://godrejreserve.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Kandivali East",
            "item": "https://godrejreserve.com#location"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Gallery",
            "item": "https://godrejreserve.com/gallery"
          }
        ]
      }
    ]
  };

  // Auto-popup contact form after 10 seconds
  const [showContactForm, setShowContactForm] = useState(false);

  // Schedule Visit form state
  const [showScheduleVisitForm, setShowScheduleVisitForm] = useState(false);

  // Gallery access control - tracks if user clicked gallery
  const [pendingGalleryAccess, setPendingGalleryAccess] = useState(false);

  // EOI Box dropdown state for mobile
  const [eoiDropdownOpen, setEoiDropdownOpen] = useState(false);

  useEffect(() => {
    console.log('ContactForm initialization started');

    const checkUserAndShowForm = async () => {
      try {
        // Get user's IP address and other identifiers
        const ipAddress = 'user_ip'; // Will be set server-side

        // Check if user already submitted (database check)
        const checkResponse = await fetch('/api/contact/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ipAddress: window.location.href, // Use URL as identifier for now
            email: '', // Empty for initial check
            phoneNumber: ''
          }),
        });

        const checkResult = await checkResponse.json();

        if (checkResult.exists) {
          console.log('User already submitted form, not showing popup');
          return; // Don't show form
        }

        // Check localStorage as backup
        const formSubmitted = localStorage.getItem('contactFormSubmitted');
        if (formSubmitted === 'true') {
          console.log('Form marked as submitted in localStorage, not showing');
          return;
        }

        // Show form immediately after checks
        console.log('User is new, showing contact form immediately');
        setShowContactForm(true);

      } catch (error) {
        console.error('Failed to check user submission status:', error);
        // Fallback to localStorage check only
        const formSubmitted = localStorage.getItem('contactFormSubmitted');
        if (formSubmitted !== 'true') {
          console.log('Error occurred but user is new, showing contact form');
          setShowContactForm(true);
        }
      }
    };

    checkUserAndShowForm();
  }, []);

  const hideContactForm = () => {
    setShowContactForm(false);
  };

  const markAsSubmitted = () => {
    localStorage.setItem('contactFormSubmitted', 'true');
    setShowContactForm(false);

    // If user was trying to access gallery, navigate there now
    if (pendingGalleryAccess) {
      setPendingGalleryAccess(false);
      window.location.href = '/gallery#amenities';
    }
  };

  const handleGalleryClick = (e) => {
    e.preventDefault();

    // Check if user already submitted form
    const formSubmitted = localStorage.getItem('contactFormSubmitted');

    if (formSubmitted === 'true') {
      // User already filled form, allow direct access
      window.location.href = '/gallery';
    } else {
      // User hasn't filled form, show it first
      setPendingGalleryAccess(true);
      setShowContactForm(true);
    }
  };

  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Optimized scroll reveal animation with better performance
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px' // Start animation earlier for smoother experience
    };

    const observer = new IntersectionObserver((entries) => {
      // Batch DOM updates for better performance
      const updates = entries.filter(entry => entry.isIntersecting);

      if (updates.length > 0) {
        requestAnimationFrame(() => {
          updates.forEach(entry => {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once animated
          });
        });
      }
    }, observerOptions);

    // Use passive event listeners and batch queries
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Chatbot Q&A Logic
  const getChatbotResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    // Project Info
    if (lowerMsg.includes('project') || lowerMsg.includes('about')) {
      return 'Godrej Reserve is a premium luxury residential project in Kandivali East, Mumbai. Spread across 18.6 acres with just 6 towers, offering spacious 3 & 4 BHK residences with world-class amenities. 🏢';
    }
    if (lowerMsg.includes('location') || lowerMsg.includes('where') || lowerMsg.includes('address')) {
      return 'Godrej Reserve is located in Kandivali East, Mumbai. Prime location with excellent connectivity to Western Express Highway, Dahisar Metro, and major landmarks. 📍';
    }
    if (lowerMsg.includes('amenities') || lowerMsg.includes('facilities')) {
      return 'World-class amenities include: Infinity Pool 🏊, State-of-the-Art Gym 🏋️, Clubhouse, Landscaped Gardens 🌳, Children\'s Play Area, 24/7 Security, Concierge Services, and much more!';
    }
    if (lowerMsg.includes('configuration') || lowerMsg.includes('bhk') || lowerMsg.includes('flat')) {
      return 'We offer premium configurations:\n• 3 BHK - 1100 sq.ft (₹4.50 Cr*)\n• 3.5 BHK - 1330+ sq.ft (₹5.15 Cr*)\n• 3 BHK - 1450+ sq.ft (₹5.75 Cr*)\n• 4 BHK - 2000+ sq.ft (₹8.50 Cr*)';
    }

    // Pricing
    if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
      return 'Starting price: ₹3.75 Cr* for 3 BHK (1100 sq.ft) up to ₹8.50 Cr* for 4 BHK (2000+ sq.ft). Prices vary based on configuration, floor, and view. 💰';
    }
    if (lowerMsg.includes('payment') || lowerMsg.includes('plan') || lowerMsg.includes('emi')) {
      return 'Flexible payment plans available with milestone-based payments. EMI options through partner banks. Contact our sales team for detailed payment schedule. 📊';
    }
    if (lowerMsg.includes('offer') || lowerMsg.includes('discount')) {
      return 'Special launch offers available! Limited period discounts for early bookings. Contact us for exclusive deals. 🎁';
    }
    if (lowerMsg.includes('booking amount')) {
      return 'Booking amount varies by configuration. Please contact our sales team for exact booking details and documentation. 📝';
    }
    if (lowerMsg.includes('loan') || lowerMsg.includes('bank')) {
      return 'Home loan assistance available through our partner banks including HDFC, ICICI, SBI, and Axis Bank. Pre-approved loans can be arranged. 🏦';
    }

    // Technical Details
    if (lowerMsg.includes('carpet area') || lowerMsg.includes('area')) {
      return 'Carpet areas range from 1100 sq.ft to 2000+ sq.ft depending on configuration. All units are spacious with premium specifications. 📐';
    }
    if (lowerMsg.includes('possession') || lowerMsg.includes('ready') || lowerMsg.includes('completion')) {
      return 'Expected possession: December 2027. Project is currently under construction with regular updates available. 🏗️';
    }
    if (lowerMsg.includes('rera')) {
      return 'Yes, the project is RERA approved. RERA Registration Number: P51800052847. Fully compliant with all regulations. ✅';
    }
    if (lowerMsg.includes('material') || lowerMsg.includes('construction')) {
      return 'Premium construction with imported fittings, vitrified tiles, modular kitchens, branded fixtures, and high-quality materials throughout. 🏗️';
    }
    if (lowerMsg.includes('floor plan')) {
      return 'Detailed floor plans available for all configurations. Scroll to the Residence Configurations section or contact us for downloadable PDFs. 📋';
    }

    // Contact & Support
    if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email')) {
      return 'Contact us:\n📞 Phone: +91-XXXXXXXXXX\n📧 Email: sales@godrejreserve.com\nOur team is available 9 AM - 6 PM, Monday to Sunday.';
    }
    if (lowerMsg.includes('call back') || lowerMsg.includes('callback')) {
      return 'I\'d be happy to arrange a callback! Please share your contact number and our sales team will reach out within 2 hours. 📞';
    }
    if (lowerMsg.includes('office') || lowerMsg.includes('visit office')) {
      return 'Sales Office: Godrej Reserve, Kandivali East, Mumbai. Open Monday to Sunday, 9 AM - 6 PM. Appointments recommended. 🏢';
    }

    // Booking & Visit
    if (lowerMsg.includes('site visit') || lowerMsg.includes('visit') || lowerMsg.includes('schedule')) {
      return 'Book your site visit today! Available Monday to Sunday, 9 AM - 6 PM. Contact us or fill the enquiry form to schedule your visit. 📅';
    }
    if (lowerMsg.includes('appointment')) {
      return 'Appointments are recommended for a personalized experience. Walk-ins are also welcome during visiting hours (9 AM - 6 PM). 🕐';
    }
    if (lowerMsg.includes('book online')) {
      return 'Yes! You can book online by filling our enquiry form or clicking "Enquire Now" on any configuration. Our team will guide you through the process. 💻';
    }

    // Navigation
    if (lowerMsg.includes('photo') || lowerMsg.includes('gallery') || lowerMsg.includes('image')) {
      return 'View our stunning property photos in the gallery section! Scroll up to see residence configurations and amenities. 📸';
    }
    if (lowerMsg.includes('360') || lowerMsg.includes('virtual')) {
      return '360° virtual tour coming soon! Meanwhile, check out our detailed photos and floor plans. Contact us for a physical site visit. 🎥';
    }
    if (lowerMsg.includes('brochure') || lowerMsg.includes('download')) {
      return 'Download our detailed brochure with all specifications, floor plans, and pricing. Click "Enquire Now" and request the brochure. 📥';
    }

    // Specific Queries
    if (lowerMsg.includes('3bhk') || lowerMsg.includes('3 bhk')) {
      return 'Yes! We have 3 BHK flats in three variants:\n• 1100 sq.ft - ₹3.75 Cr*\n• 1330+ sq.ft - ₹5.15 Cr*\n• 1450+ sq.ft - ₹5.85 Cr*\nAll with premium specifications! 🏠';
    }
    if (lowerMsg.includes('4bhk') || lowerMsg.includes('4 bhk')) {
      return 'Yes! Luxurious 4 BHK flats available - 2000+ sq.ft starting at ₹8.50 Cr*. Perfect for spacious family living with premium amenities. 🏠';
    }
    if (lowerMsg.includes('under construction')) {
      return 'Yes, the project is currently under construction with expected possession in December 2027. Regular construction updates available. 🏗️';
    }
    if (lowerMsg.includes('total area') || lowerMsg.includes('project size')) {
      return 'Godrej Reserve spans across 18.6 acres of prime land with just 6 towers, ensuring spacious living and low density. 🌳';
    }
    if (lowerMsg.includes('maintenance')) {
      return 'Maintenance charges will be approximately ₹3-5 per sq.ft per month depending on the configuration. Final charges will be confirmed at possession. 💵';
    }
    if (lowerMsg.includes('landmark') || lowerMsg.includes('nearby')) {
      return 'Nearby landmarks:\n🏫 Schools: Ryan International, Thakur International\n🏥 Hospitals: Shree Sai Hospital, Apex Hospital\n🛍️ Malls: Growel\'s 101, Raghuleela Mall\n🚇 Metro: Dahisar Metro (5 mins)\n🛣️ Highway: Western Express Highway (2 mins)';
    }

    // Greetings
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return 'Hello! 👋 Welcome to Godrej Reserve. How can I help you today? Ask me about configurations, pricing, amenities, or booking!';
    }
    if (lowerMsg.includes('thank')) {
      return 'You\'re welcome! 😊 Feel free to ask if you have any more questions. We\'re here to help!';
    }

    // Default
    return 'I\'m here to help! You can ask me about:\n• Property details & configurations\n• Pricing & payment plans\n• Amenities & features\n• Location & connectivity\n• Booking & site visits\n\nWhat would you like to know? 🤔';
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { type: 'user', text: userInput }];
    setChatMessages(newMessages);

    // Get bot response
    setTimeout(() => {
      const botResponse = getChatbotResponse(userInput);
      setChatMessages([...newMessages, { type: 'bot', text: botResponse }]);
    }, 500);

    setUserInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const openGallery = (images, title) => {
    setGalleryModalImages(images);
    setGalleryModalTitle(title);
    setGalleryModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setGalleryModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Property images data - Using image1 to image24 (6 images per configuration)
  const propertyImages = {
    bhk3_1100: [
      '/image1.jpg',
      '/image2.jpg',
      '/image3.jpg',
      '/image4.jpg',
      '/image5.jpg',
      '/image6.jpg'
    ],
    bhk3_1450: [
      '/image7.jpg',
      '/image8.jpg',
      '/image9.jpg',
      '/image10.jpg',
      '/image11.jpg',
      '/image12.jpg'
    ],
    bhk3_1600: [
      '/image13.jpg',
      '/image14.jpg',
      '/image15.jpg',
      '/image16.jpg',
      '/image17.jpg',
      '/image18.jpg'
    ],
    bhk4_2000: [
      '/image19.jpg',
      '/image20.jpg',
      '/image21.jpg',
      '/image22.jpg',
      '/image23.jpg',
      '/image24.jpg'
    ]
  };

  useEffect(() => {
    // Show navbar after 3.5 seconds with a slight random delay (3-4 seconds)
    const timer = setTimeout(() => {
      setIsNavbarVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      {/* ================ PREMIUM GLASS NAVBAR ================ */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ease-out transform ${isNavbarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <div className="relative">
          {/* Premium glassmorphism background */}
          <div className="absolute inset-0 rounded-b-3xl bg-white/30 backdrop-blur-3xl border border-white/45 shadow-[0_18px_50px_rgba(15,23,42,0.26)]">
            <div className="absolute inset-0 rounded-b-3xl bg-gradient-to-r from-white/90 via-white/35 to-white/15 opacity-100"></div>
            <div className="absolute inset-0 rounded-b-3xl bg-gradient-to-b from-white/45 via-white/15 to-white/12"></div>
            <div className="absolute -top-20 right-24 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-60px] left-12 w-48 h-48 bg-amber-300/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Brand Section with Logo, Badge & Location */}
              <div className="flex items-center gap-4 h-full py-3">
                <a href="#home" className="relative z-10 flex items-center">
                  {/* Logo */}
                  <div className="flex flex-col">
                    <Image
                      src="/Layer 5.png"
                      alt="Godrej Reserve Logo"
                      width={280}
                      height={70}
                      className="object-contain w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] h-auto"
                      priority
                    />
                  </div>
                </a>

                {/* Vertical Divider */}
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                {/* Badge and Location */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center">
                    <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-amber-200">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="whitespace-nowrap">PREFERRED PARTNER</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-700">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold whitespace-nowrap">Kandivali East, Mumbai</span>
                  </div>
                </div>
              </div>

              {/* Desktop Nav Links - Enhanced */}
              <nav className="hidden lg:flex items-center space-x-1 relative ">
                {[
                  { name: 'Home', href: '#home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                  { name: 'About', href: '#about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { name: 'Amenities', href: '#amenities', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
                  { name: 'Gallery', href: '/gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                  { name: 'Blogs', href: '/blogs', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
                  { name: 'Contact', href: '#contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', action: 'contact' },
                ].map((item, index) => (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (item.name === 'Gallery') {
                          handleGalleryClick(e);
                        } else if (item.action === 'contact') {
                          e.preventDefault();
                          const footer = document.querySelector('footer');
                          footer?.scrollIntoView({ behavior: 'smooth' });
                          setTimeout(() => setShowContactForm(true), 800);
                        }
                      }}
                      className={`flex items-center px-5 py-3 text-sm font-medium text-gray-700 hover:text-amber-800 transition-all duration-300 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-amber-600 before:to-amber-400 before:transition-all before:duration-300 before:-translate-x-1/2 hover:before:w-3/4`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <span className="relative z-10 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2.5 text-amber-600 opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={item.icon} />
                        </svg>
                        {item.name}
                      </span>
                    </a>
                    <span className="absolute -inset-2 bg-gradient-to-r from-amber-100/50 to-transparent rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </div>
                ))}

                {/* CTA Button - Optimized */}
                <div className="ml-4 relative group">
                  <button
                    onClick={() => setShowScheduleVisitForm(true)}
                    className="relative px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-sm font-medium rounded-lg overflow-hidden group-hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform group-hover:-translate-y-0.5 flex items-center border border-white/20 hover:border-white/30 whitespace-nowrap"
                  >
                    <span className="relative z-10 flex items-center">
                      <span>Schedule Visit</span>
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                        →
                      </span>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-[#EFE9E3] focus:outline-none focus:ring-2 focus:ring-[#a67d4b]/50 transition-colors z-50"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute top-20 left-0 right-0 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="px-6 py-4 space-y-4">
            {[
              { name: 'Home', href: '#home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { name: 'About', href: '#about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { name: 'Amenities', href: '#amenities', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
              { name: 'Gallery', href: '/gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { name: 'Blogs', href: '/blogs', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
              { name: 'Contact', href: '#contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', action: 'contact' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-[#EFE9E3] rounded-lg group transition-colors"
                onClick={(e) => {
                  if (item.name === 'Gallery') {
                    handleGalleryClick(e);
                  } else if (item.action === 'contact') {
                    e.preventDefault();
                    setMenuOpen(false);
                    const footer = document.querySelector('footer');
                    footer?.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => setShowContactForm(true), 800);
                  } else {
                    setMenuOpen(false);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#a67d4b] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </a>
            ))}
            <a
              href="#booking"
              className="block w-full mt-4 px-6 py-3 text-center bg-gradient-to-r from-[#a67d4b] to-[#ad9989] text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Book Site Visit
            </a>
          </div>
        </div>
      </div>

      {/* ---------------- PREMIUM LUXURY HERO ---------------- */}
      <section
        id="home"
        className="relative h-[100vh] flex items-center justify-center overflow-hidden"
        aria-label="Godrej Reserve Hero Banner - Luxury Apartments in Kandivali East Mumbai"
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero.png"
            alt="Godrej Reserve Luxury Apartments Kandivali East Mumbai - Premium 3 BHK and 4 BHK Residential Complex with Modern Architecture"
            fill
            className="object-cover transition-transform duration-[20s] hover:scale-105"
            style={{ objectPosition: 'center 20%' }}
            priority
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* Premium Multi-layered Gradient Overlays */}
        <div className="absolute inset-0 overlay-luxury-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Floating Particles - Premium Effect */}
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        {/* EOI Premium Box - Desktop Version (Hidden on Mobile) */}
        <div className="hidden md:block absolute bottom-24 right-0 z-20 animate-fade-in animate-bounce-slow" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
          <div className="relative group">
            {/* Soft glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-300/50 via-amber-400/50 to-amber-500/50 rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 ease-out"></div>

            {/* Main Box */}
            <div className="relative bg-gradient-to-br from-amber-50/95 via-white/95 to-amber-50/95 backdrop-blur-xl border-2 border-amber-400/60 group-hover:border-amber-500/80 rounded-xl shadow-2xl p-3 w-56 mr-4 transition-all duration-700 ease-out">
              {/* Premium Badge */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <span className="inline-block px-3 py-0.5 text-[13px] font-bold tracking-widest text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-full shadow-lg animate-pulse">
                  EOI OPEN
                </span>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-500/70 group-hover:w-4 group-hover:h-4 group-hover:border-amber-600/90 transition-all duration-500"></div>
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-amber-500/70 group-hover:w-4 group-hover:h-4 group-hover:border-amber-600/90 transition-all duration-500"></div>
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-500/70 group-hover:w-4 group-hover:h-4 group-hover:border-amber-600/90 transition-all duration-500"></div>
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-500/70 group-hover:w-4 group-hover:h-4 group-hover:border-amber-600/90 transition-all duration-500"></div>

              {/* Content */}
              <div className="mt-3 space-y-2">
                {/* Title */}
                <div className="text-center border-b border-amber-400/40 group-hover:border-amber-500/50 pb-1.5 transition-colors duration-500">
                  <h3 className="text-amber-700 group-hover:text-amber-800 text-[15px] font-bold tracking-wide uppercase mb-0.5 transition-colors duration-500">
                    Collector's Edition
                  </h3>
                  <p className="text-gray-600 text-[11px] font-medium">
                    Palatial Higher Floor
                  </p>
                </div>

                {/* Configurations */}
                <div className="space-y-1">
                  {/* 3 BHK */}
                  <div className="bg-gradient-to-r from-amber-50 to-transparent group-hover:from-amber-100/80 border-l-2 border-amber-500 pl-2 py-0.5 transition-colors duration-500">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-700 text-[13px] font-semibold">3 BHK</span>
                      <span className="text-gray-900 text-xs font-bold">₹6.49Cr<sup className="text-[8px]">++</sup></span>
                    </div>
                  </div>

                  {/* 4 BHK */}
                  <div className="bg-gradient-to-r from-amber-50 to-transparent group-hover:from-amber-100/80 border-l-2 border-amber-500 pl-2 py-0.5 transition-colors duration-500">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-700 text-[13px] font-semibold">4 BHK</span>
                      <span className="text-gray-900 text-xs font-bold">₹8.69Cr<sup className="text-[8px]">++</sup></span>
                    </div>
                  </div>
                </div>

                {/* Exclusive Feature */}
                <div className="pt-1.5 border-t border-amber-400/30 group-hover:border-amber-500/40 transition-colors duration-500">
                  <div className="flex items-start gap-1.5">
                    <div className="mt-0.5">
                      <div className="w-1 h-1 rounded-full bg-amber-500 animate-ping"></div>
                    </div>
                    <p className="text-gray-700 text-[12px] font-medium leading-snug">
                      Exclusive Jodi Options
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full mt-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-1"
                >
                  <span>Contact for Details</span>
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Soft radial glow on hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-300/0 group-hover:bg-amber-300/10 rounded-full blur-2xl transition-all duration-1000 ease-out pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* EOI Mobile Collapsible Tab (Visible on Mobile Only) */}
        <div className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-30 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
          {/* Collapsible Tab Button */}
          <button
            onClick={() => setEoiDropdownOpen(!eoiDropdownOpen)}
            className="bg-gradient-to-br from-amber-600 via-amber-500 to-amber-600 text-white px-2 py-6 rounded-l-xl shadow-2xl flex flex-col items-center gap-2 hover:from-amber-500 hover:to-amber-700 transition-all duration-300 border-2 border-amber-400/50"
          >
            <span className="text-[10px] font-bold tracking-widest [writing-mode:vertical-rl] rotate-180">
              EOI OPEN
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${eoiDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Content */}
          <div
            className={`absolute right-0 top-0 transition-all duration-500 ease-out ${eoiDropdownOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0 pointer-events-none'
              }`}
          >
            <div className="relative group mr-2">
              {/* Soft glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-300/50 via-amber-400/50 to-amber-500/50 rounded-xl blur-lg opacity-60"></div>

              {/* Main Box */}
              <div className="relative bg-white/30 backdrop-blur-2xl border-2 border-white/40 rounded-xl shadow-2xl p-3 w-64" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                {/* Close Button */}
                <button
                  onClick={() => setEoiDropdownOpen(false)}
                  className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full p-1 shadow-lg hover:bg-amber-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Premium Badge */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="inline-block px-3 py-0.5 text-[11px] font-bold tracking-widest text-white bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-full shadow-lg animate-pulse">
                    EOI OPEN
                  </span>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-500/70"></div>
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-amber-500/70"></div>
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-500/70"></div>
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-500/70"></div>

                {/* Content */}
                <div className="mt-3 space-y-2">
                  {/* Title */}
                  <div className="text-center border-b border-amber-400/40 pb-1.5">
                    <h3 className="text-amber-700 text-[14px] font-bold tracking-wide uppercase mb-0.5">
                      Collector's Edition
                    </h3>
                    <p className="text-gray-600 text-[10px] font-medium">
                      Palatial Higher Floor
                    </p>
                  </div>

                  {/* Configurations */}
                  <div className="space-y-1">
                    {/* 3 BHK */}
                    <div className="bg-gradient-to-r from-amber-50 to-transparent border-l-2 border-amber-500 pl-2 py-1">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-700 text-[12px] font-semibold">3 BHK</span>
                        <span className="text-gray-900 text-[11px] font-bold">₹6.49Cr<sup className="text-[7px]">++</sup></span>
                      </div>
                    </div>

                    {/* 4 BHK */}
                    <div className="bg-gradient-to-r from-amber-50 to-transparent border-l-2 border-amber-500 pl-2 py-1">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-700 text-[12px] font-semibold">4 BHK</span>
                        <span className="text-gray-900 text-[11px] font-bold">₹8.69Cr<sup className="text-[7px]">++</sup></span>
                      </div>
                    </div>
                  </div>

                  {/* Exclusive Feature */}
                  <div className="pt-1.5 border-t border-amber-400/30">
                    <div className="flex items-start gap-1.5">
                      <div className="mt-0.5">
                        <div className="w-1 h-1 rounded-full bg-amber-500 animate-ping"></div>
                      </div>
                      <p className="text-gray-700 text-[11px] font-medium leading-snug">
                        Exclusive Jodi Options
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      setShowContactForm(true);
                      setEoiDropdownOpen(false);
                    }}
                    className="w-full mt-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-[10px] font-bold py-2 px-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1"
                  >
                    <span>Contact for Details</span>
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Decorative Elements with Enhanced Animation */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-amber-400/90 shadow-luxury-md" style={{ animation: 'floatParticle 12s infinite' }} />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-white/70 shadow-luxury-sm" style={{ animation: 'floatParticle 15s infinite 2s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-5 h-5 rounded-full bg-amber-300/60 shadow-luxury-md" style={{ animation: 'floatParticle 18s infinite 4s' }} />

        {/* Main Content - Enhanced with Premium Typography */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Pre-heading with Premium Badge */}
          <div className="mb-6 fade-slide-up">
            <span className="inline-flex items-center gap-2 px-6 py-2 text-xs font-bold tracking-widest text-amber-200 glass-premium rounded-full border border-amber-400/30 shadow-luxury-md">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              PREMIUM LIFESTYLE RESIDENCE
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            </span>
          </div>

          {/* Main Heading with Luxury Typography */}
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-reveal-luxury text-luxury-shadow" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="block mb-3 text-amber-200 text-3xl md:text-4xl font-light tracking-[0.3em]">WELCOME TO</span>
            <span className="relative inline-block luxury-text-gradient">
              <span className="relative z-10">Godrej Reserve</span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </span>
          </h1>

          {/* Subheading with Enhanced Styling */}
          <div className="relative max-w-2xl mx-auto fade-slide-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-gray-100 text-lg md:text-xl leading-relaxed font-light mb-8">
              Discover <span className="font-bold text-white underline-elegant">unparalleled elegance</span> at Godrej Reserve, where modern design meets timeless luxury in the heart of Kandivali East.
            </p>

            {/* Premium Divider */}
            <div className="divider-luxury mx-auto my-8"></div>

            {/* Amenities Badges with Enhanced Styling */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['Luxury Residences', 'Premium Amenities', 'Green Spaces', '24/7 Security'].map((item, index) => (
                <span key={index} className="px-5 py-2.5 text-xs font-semibold text-amber-100 glass-premium rounded-full border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 shadow-luxury-sm hover:shadow-luxury-md cursor-pointer">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Premium CTA Button */}
          <div className="relative group fade-slide-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={() => setShowScheduleVisitForm(true)}
              className="luxury-button relative inline-flex items-center px-10 py-5 overflow-hidden text-base font-bold text-white transition-all duration-500 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 cursor-pointer shadow-luxury-md hover:shadow-luxury-lg border-2 border-amber-500/30"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-3">Schedule a Private Tour</span>
                <svg className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            <p className="mt-5 text-sm text-amber-100 opacity-0 animate-fade-in font-medium tracking-wide" style={{ "animationFillMode": "forwards", "animationDelay": "1.2s" }}>
              ✨ Limited availability. Book your exclusive viewing today.
            </p>
          </div>

          {/* Premium Scroll Indicator */}
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 fade-slide-up" style={{ animationDelay: '0.9s' }}>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs text-amber-200/80 tracking-[0.3em] font-semibold">EXPLORE</span>
              <div className="w-7 h-11 border-2 border-amber-300/60 rounded-full flex justify-center p-1.5 shadow-luxury-sm">
                <div className="w-1.5 h-3 bg-amber-300 rounded-full" style={{ animation: 'bounce 2s infinite' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Premium Overlay for Depth */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }} />
      </section>

      {/* ---------------- RESIDENCE CONFIGURATIONS ---------------- */}
      <section id="configurations" className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-amber-50" aria-label="3 BHK and 4 BHK Apartment Configurations with Pricing">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-morphism mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent tracking-widest uppercase">Elite Living Spaces</span>
              <span className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-pulse"></span>
            </div>

            {/* Luxury Heading */}
            <h2 className="luxury-heading text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 bg-clip-text text-transparent mb-8 animate-text-reveal">
              PREMIUM RESIDENCES
            </h2>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="w-3 h-3 rotate-45 border-2 border-amber-500"></div>
              <div className="h-px w-32 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400"></div>
              <div className="w-3 h-3 rotate-45 border-2 border-amber-500"></div>
              <div className="h-px w-20 bg-gradient-to-r from-amber-400 to-transparent"></div>
            </div>

            <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
              Redefining Kandivali's skyline with <span className="font-semibold text-amber-700">18.6 Acres</span> of land parcel & just <span className="font-semibold text-amber-700">6 towers</span>. Discover an endless vacation in your dream home.
            </p>
          </div></div>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* 3 BHK - 1100 sq.ft */}
          <div className="reveal group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl bg-white hover:-translate-y-2" style={{ animationDelay: '0.1s' }}>
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="flex h-full transition-transform duration-700 ease-in-out">
                  {propertyImages.bhk3_1100.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full">
                      <Image
                        src={img}
                        alt={`3 BHK Residence View ${idx + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        priority={idx === 0}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        quality={75}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openGallery(propertyImages.bhk3_1100, '3 BHK | 1100 sq.ft');
                  }}
                  className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full flex items-center transition-opacity duration-300 hover:opacity-90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>View Gallery</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">3 BHK</h3>
                <p className="text-amber-300 font-medium">1100 sq.ft</p>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-2xl font-bold text-gray-800">₹4.50 Cr*</span>
                  <span className="text-sm text-gray-500">Starting Price</span>
                </div>
                <div className="w-fit">
                  <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Smart Living</span>
                </div>
              </div>
              <div className="mb-6">
                <div className="mb-3">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-amber-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">3 Beds, 2 Baths</span>
                  </div>
                </div>

                <ul className="space-y-3 text-gray-600 border-t border-gray-100 pt-4">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Premium Specifications & Imported Finishes</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Elegantly Spacious Living & Dining Areas</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Modular Kitchen with Premium Fittings</span>
                  </li>
                </ul>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Floor:</span>
                    <span className="font-medium">High Floors Available</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-500">View:</span>
                    <span className="font-medium">Park Facing</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowContactForm(true)}
                className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </div>

          {/* 3 BHK - 1330+ sq.ft */}
          <div className="reveal group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl bg-white hover:-translate-y-2" style={{ animationDelay: '0.2s' }}>
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="flex h-full transition-transform duration-700 ease-in-out">
                  {propertyImages.bhk3_1450.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full">
                      <Image
                        src={img}
                        alt={`3 BHK Premium View ${idx + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        quality={75}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openGallery(propertyImages.bhk3_1450, '3 BHK | 1450 sq.ft');
                  }}
                  className="bg-black/40 hover:bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>View Gallery</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">3 BHK</h3>
                <p className="text-amber-300 font-medium">1330+ sq.ft</p>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-2xl font-bold text-gray-800">₹5.15 Cr*</span>
                  <span className="text-sm text-gray-500">Starting Price</span>
                </div>
                <div className="w-fit">
                  <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Premium Choice</span>
                </div>
              </div>
              <div className="mb-6">
                <div className="mb-3">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-amber-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">3 Beds, 3 Baths</span>
                  </div>
                </div>

                <ul className="space-y-3 text-gray-600 border-t border-gray-100 pt-4">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Enhanced Space with Premium Wooden Flooring</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Master Bedroom with Walk-in Closet</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Premium Luxury Fittings in All Bathrooms</span>
                  </li>
                </ul>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Floor:</span>
                    <span className="font-medium">High Floors Available</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-500">View:</span>
                    <span className="font-medium">City & Garden View</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowContactForm(true)}
                className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </div>

          {/* 3 BHK - 1450+ sq.ft */}
          <div className="reveal group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl bg-white hover:-translate-y-2" style={{ animationDelay: '0.3s' }}>
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="flex h-full transition-transform duration-700 ease-in-out">
                  {propertyImages.bhk3_1600.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full">
                      <Image
                        src={img}
                        alt={`3 BHK Premium View ${idx + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        quality={75}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openGallery(propertyImages.bhk3_1600, '3 BHK | 1450+ sq.ft');
                  }}
                  className="bg-black/40 hover:bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>View Gallery</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">3 BHK</h3>
                <p className="text-amber-300 font-medium">1450+ sq.ft</p>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-2xl font-bold text-gray-800">₹5.75 Cr*</span>
                  <span className="text-sm text-gray-500">Starting Price</span>
                </div>
                <div className="w-fit">
                  <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Elite Collection</span>
                </div>
              </div>
              <div className="mb-6">
                <div className="mb-3">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-amber-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">3 Beds, 3.5 Baths</span>
                  </div>
                </div>

                <ul className="space-y-3 text-gray-600 border-t border-gray-100 pt-4">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Elite Living & Dining with Wooden Floors</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Master Suite with Walk-in Wardrobe & En-suite</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Premium Fittings & Smart Home Features</span>
                  </li>
                </ul>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Floor:</span>
                    <span className="font-medium">High Floors Only</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-500">View:</span>
                    <span className="font-medium">Panoramic City Views</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowContactForm(true)}
                className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </div>

          {/* 4 BHK - 2000+ sq.ft */}
          <div className="reveal group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl bg-white hover:-translate-y-2" style={{ animationDelay: '0.4s' }}>
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="flex h-full transition-transform duration-700 ease-in-out">
                  {propertyImages.bhk4_2000.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full">
                      <img
                        src={img}
                        alt={`4 BHK Premium View ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openGallery(propertyImages.bhk4_2000, '4 BHK | 2000+ sq.ft');
                  }}
                  className="bg-black/40 hover:bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>View Gallery</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">4 BHK</h3>
                <p className="text-amber-300 font-medium">2000+ sq.ft</p>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-2xl font-bold text-gray-800">₹7.25 Cr*</span>
                  <span className="text-sm text-gray-500">Starting Price</span>
                </div>
                <div className="w-fit">
                  <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Ultimate Luxury</span>
                </div>
              </div>
              <div className="mb-6">
                <div className="mb-3">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-amber-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">4 Beds, 4.5 Baths</span>
                  </div>
                </div>

                <ul className="space-y-3 text-gray-600 border-t border-gray-100 pt-4">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Sprawling Living Space with Imported Italian Flooring</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Master Suite with His & Hers Walk-in Closets</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Private Terrace with Stunning City Views</span>
                  </li>
                </ul>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Floor:</span>
                    <span className="font-medium">Top Floors Only</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-500">View:</span>
                    <span className="font-medium">360° Panoramic Views</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowContactForm(true)}
                className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Amenities Section */}

      <section id="amenities" className="py-20 luxury-gradient-bg relative overflow-hidden" aria-label="World Class Amenities - Swimming Pool, Gym, Clubhouse, Gardens">
        {/* Decorative background elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-amber-200/20 to-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-amber-300/10 to-amber-100/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-20">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-morphism mb-6 animate-fade-in">
                <span className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent tracking-widest uppercase">Where Comfort Meets Indulgence</span>
                <span className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-pulse"></span>
              </div>

              {/* Luxury Heading */}
              <h2 className="luxury-heading text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 bg-clip-text text-transparent mb-8 animate-text-reveal">
                WORLD CLASS AMENITIES
              </h2>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
                <div className="w-3 h-3 rotate-45 border-2 border-amber-500"></div>
                <div className="h-px w-32 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400"></div>
                <div className="w-3 h-3 rotate-45 border-2 border-amber-500"></div>
                <div className="h-px w-20 bg-gradient-to-r from-amber-400 to-transparent"></div>
              </div>

              <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
                Redefining Kandivali's skyline with <span className="font-semibold text-amber-700">18.6 Acres</span> of land parcel & just <span className="font-semibold text-amber-700">6 towers</span>. Discover an endless vacation in your dream home.
              </p>
            </div>
          </div>

          {/* Flex container for left box and right masonry grid */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left-aligned box with limited width */}
            <div className="reveal-left w-full lg:w-96 flex-shrink-0 float-luxury">
              <div className="group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl bg-white hover:-translate-y-2 luxury-border pulse-glow">
                {/* View Gallery Button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openGallery(['/image25.jpg', '/image26.webp', '/image27.jpg', '/image28.webp', '/image29.webp'], 'Luxury Amenities Gallery');
                    }}
                    className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full flex items-center transition-opacity duration-300 hover:opacity-90"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span>View Gallery</span>
                  </button>
                </div>

                {/* Premium Badge */}
                <div className="absolute top-14 right-4 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  EXCLUSIVE
                </div>

                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/image29.webp"
                    alt="Luxury Amenities"
                    fill
                    className="object-cover"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-bold text-white luxury-heading">Luxury Amenities</h3>
                    <p className="text-amber-300 font-medium text-sm mt-1">Experience the best in class facilities</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-b from-white to-amber-50/30">
                  <div className="mb-6">
                    <ul className="space-y-3 text-gray-600">
                      {[
                        'Infinity Pool with Skyline Views',
                        'State-of-the-Art Fitness Center',
                        'Exclusive Residents Lounge',
                        'Landscaped Gardens',
                        "Children's Play Area",
                        '24/7 Security & Concierge'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      const formSubmitted = localStorage.getItem('contactFormSubmitted');
                      if (formSubmitted === 'true') {
                        window.location.href = '/gallery#amenities';
                      } else {
                        setShowContactForm(true);
                        setPendingGalleryAccess(true);
                      }
                    }}
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl magnetic-button ripple-effect"
                  >
                    View All Amenities
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Masonry Grid in a Container */}
            <div className="reveal-right flex-1 w-full">
              <div className="glass-morphism rounded-2xl shadow-2xl p-8 border border-amber-100/50 luxury-border hover:shadow-amber-200/50 transition-all duration-500">
                <AmenitiesImageGrid onGalleryClick={() => setShowContactForm(true)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PREMIUM SHOWCASE SECTION ---------------- */}
      <section className="relative py-24 bg-gradient-to-b from-amber-50/30 via-white to-gray-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 reveal">
            <div className="inline-block mb-4">
              <span className="text-amber-600 text-sm font-semibold tracking-[0.2em] uppercase bg-amber-100/50 px-4 py-2 rounded-full border border-amber-200">
                Exclusive Highlights
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 luxury-heading">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">Premium Living</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Image 1 */}
            <div className="reveal group relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer h-[550px] border-2 border-amber-100/50 hover:border-amber-300/80 transition-all duration-700" style={{ animationDelay: '0.1s' }}>
              <img
                src="/Creative For post ads and etc/1.png"
                alt="Premium Feature 1"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Luxury gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-all duration-500 pointer-events-none"></div>

              {/* Blur overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-[2px] pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const formSubmitted = localStorage.getItem('contactFormSubmitted');
                      if (formSubmitted === 'true') {
                        window.location.href = '/gallery';
                      } else {
                        setShowContactForm(true);
                      }
                    }}
                    className="relative bg-white/95 text-amber-700 px-6 py-2.5 rounded-full font-semibold text-sm shadow-2xl hover:shadow-amber-500/30 hover:scale-110 transition-all duration-300 flex items-center gap-2 border-2 border-amber-200 hover:border-amber-400 pointer-events-auto z-20"
                  >
                    <span className="relative z-10">View Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </button>
                </div>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            {/* Image 2 */}
            <div className="reveal group relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer h-[550px] border-2 border-amber-100/50 hover:border-amber-300/80 transition-all duration-700" style={{ animationDelay: '0.2s' }}>
              <img
                src="/Creative For post ads and etc/2.png"
                alt="Premium Feature 2"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Luxury gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-all duration-500 pointer-events-none"></div>

              {/* Blur overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-[2px] pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const formSubmitted = localStorage.getItem('contactFormSubmitted');
                      if (formSubmitted === 'true') {
                        window.location.href = '/gallery';
                      } else {
                        setShowContactForm(true);
                      }
                    }}
                    className="relative bg-white/95 text-amber-700 px-6 py-2.5 rounded-full font-semibold text-sm shadow-2xl hover:shadow-amber-500/30 hover:scale-110 transition-all duration-300 flex items-center gap-2 border-2 border-amber-200 hover:border-amber-400 pointer-events-auto z-20"
                  >
                    <span className="relative z-10">View Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </button>
                </div>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            {/* Image 3 */}
            <div className="reveal group relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer h-[550px] border-2 border-amber-100/50 hover:border-amber-300/80 transition-all duration-700" style={{ animationDelay: '0.3s' }}>
              <img
                src="/Creative For post ads and etc/3.png"
                alt="Premium Feature 3"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Luxury gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-all duration-500"></div>

              {/* Blur overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-[2px]">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
                  <button className="relative bg-white/95 text-amber-700 px-6 py-2.5 rounded-full font-semibold text-sm shadow-2xl hover:shadow-amber-500/30 hover:scale-110 transition-all duration-300 flex items-center gap-2 border-2 border-amber-200 hover:border-amber-400">
                    <span className="relative z-10">View 360 Tour</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </button>
                </div>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- LOCATION & CONNECTIVITY SECTION ---------------- */}
      <section id="location" className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white" aria-label="Prime Location in Kandivali East Mumbai with Excellent Connectivity">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-morphism mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></span>
              <span className="text-sm font-medium bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent tracking-widest uppercase">Prime Location</span>
              <span className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></span>
            </div>

            {/* Luxury Heading */}
            <h2 className="luxury-heading text-4xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 bg-clip-text text-transparent mb-8 animate-text-reveal">
              LOCATION & CONNECTIVITY
            </h2>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="w-3 h-3 rotate-45 border-2 border-amber-500"></div>
              <div className="h-px w-32 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400"></div>
              <div className="w-3 h-3 rotate-45 border-2 border-amber-500"></div>
              <div className="h-px w-20 bg-gradient-to-r from-amber-400 to-transparent"></div>
            </div>

            <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
              Strategically located in <span className="font-semibold text-amber-700">Kandivali East</span>, Mumbai's most sought-after neighborhood with unparalleled connectivity.
            </p>
          </div>

          {/* Main Content Grid - SWAPPED: Info Box Left, Map Right */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* Left Side - Compact Info Box (2 columns) */}
            <div className="reveal-left lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl border-3 border-amber-200 overflow-hidden h-[700px] flex flex-col">

                {/* Scrollable Content Container */}
                <div className="overflow-y-auto flex-1 custom-scrollbar" style={{
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#d97706 #fef3c7'
                }}>
                  <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                      width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background: linear-gradient(to bottom, #fef3c7, #fde68a);
                      border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background: linear-gradient(to bottom, #d97706, #b45309);
                      border-radius: 10px;
                      border: 2px solid #fef3c7;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                      background: linear-gradient(to bottom, #b45309, #92400e);
                    }
                  `}</style>

                  {/* Education Section - WHITE BACKGROUND */}
                  <div className="border-b-2 border-amber-100 p-5 bg-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">Education</h3>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { name: 'Cambridge School', time: '5 min' },
                        { name: 'Thakur Public School', time: '7 min' },
                        { name: 'Lokhandwala Foundation School', time: '8 min' },
                        { name: 'Oxford International School', time: '9 min' },
                        { name: 'Oberoi International School', time: '12 min' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-gray-700">{item.name}</span>
                          <span className="text-amber-600 font-semibold">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Healthcare Section - WHITE BACKGROUND */}
                  <div className="border-b-2 border-amber-100 p-5 bg-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">Healthcare</h3>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { name: 'ESIS Hospital', time: '1 min' },
                        { name: 'ALAP Hospital', time: '4 min' },
                        { name: 'Thunga Hospital', time: '6 min' },
                        { name: 'DNA Multispecialty Hospital', time: '7 min' },
                        { name: 'Sanjeevani Hospital', time: '8 min' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-gray-700">{item.name}</span>
                          <span className="text-amber-600 font-semibold">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Entertainment Section - WHITE BACKGROUND */}
                  <div className="border-b-2 border-amber-100 p-5 bg-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">Entertainment</h3>
                    </div>
                    <div className="space-y-1.5">
                      {[

                        { name: 'Centrium Mall', time: '8 min' },
                        { name: 'Sachin Tendulkar Gymkhana', time: '9 min' },
                        { name: 'Oberoi Mall', time: '10 min' },
                        { name: 'Infiniti Mall, Malad', time: '10 min' },
                        { name: 'Goregaon Sports Club', time: '10 min' },
                        { name: 'Inorbit, Malad', time: '12 min' },
                        { name: 'Eskay Resort', time: '14 min' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-gray-700">{item.name}</span>
                          <span className="text-amber-600 font-semibold">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connectivity Section - ORANGE/AMBER BACKGROUND */}
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-bold text-white uppercase tracking-wide">Connectivity</h3>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { name: 'Akurli Metro Station', time: '2 min' },
                        { name: 'Poisar Metro Station', time: '2 min' },
                        { name: 'Kandivali Railway Station', time: '2 min' },
                        { name: 'Dahanukarwadi Metro Station', time: '8 min' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-white font-medium">{item.name}</span>
                          <span className="text-white font-bold">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Side - Location Map (3 columns) */}
            <div className="reveal-right lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-3 border-amber-200 hover:border-amber-400 hover:shadow-amber-300/50 transition-all duration-700 ease-in-out group">
                {/* Map Container */}
                <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50">
                  <Image
                    src="/map.png"
                    alt="Location Map - Godrej Reserve, Kandivali East"
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    priority
                  />

                  {/* Luxury Corner Decorations */}
                  <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-500"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-500"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-500"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-500"></div>
                  </div>

                  {/* Premium Overlay for Luxury Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none z-5"></div>

                  {/* Address Badge */}
                  <a
                    href="https://maps.app.goo.gl/RNfEUo2cq8qorHbPA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-4 right-4 bg-white/95 rounded-lg p-2.5 shadow-xl border-2 border-amber-300 z-20 hover:bg-white hover:border-amber-400 hover:shadow-2xl transition-all duration-300 cursor-pointer group "
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wide mb-0.5">Project Address</p>
                        <p className="text-xs font-semibold text-gray-800 group-hover:text-gray-700 transition-colors duration-300">Godrej Reserve, Akurli Rd, Kandivali East</p>
                        <p className="text-[12px] text-gray-500">https://maps.app.goo.gl/RNfEUo2cq8qorHbPA <br></br>Mumbai, Maharashtra 400101</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PREMIUM INFO BOXES ---------------- */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 via-white to-amber-50/30 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-amber-600 text-sm font-semibold tracking-[0.2em] uppercase bg-amber-100/50 px-4 py-2 rounded-full border border-amber-200">
                Essential Information
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 luxury-heading">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">Premium Living</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
          </div>

          {/* Three Horizontal Boxes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Box 1 - Floor Plans & Configurations */}
            <div className="group relative bg-white rounded-3xl shadow-xl border-2 border-amber-100/50 hover:border-amber-300/90 transition-all duration-500 overflow-hidden min-h-[420px] lg:min-h-[460px]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-400/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex flex-col p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-amber-500/30 transition-all duration-500 group-hover:scale-110 mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                  Floor Plans
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover elegant 3, 3.5 and 4 BHK layouts crafted for premium living with smart space planning.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">2 BHK</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">3 BHK</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">4 BHK</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">Luxury Duplex</span>
                </div>
                <div className="mt-auto pt-4 border-t border-amber-100">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>3D walkthroughs & modular kitchen layouts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Vaastu-aligned plans with dual balconies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Dedicated study & utility zones in select homes</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Box 2 - Pricing & Payment Plans */}
            <div className="group relative bg-white rounded-3xl shadow-xl border-2 border-amber-100/50 hover:border-amber-300/90 transition-all duration-500 overflow-hidden min-h-[420px] lg:min-h-[460px]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-400/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex flex-col p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-amber-500/30 transition-all duration-500 group-hover:scale-110 mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                  Pricing & Payment Plans
                </h3>

                {/* Collector's Edition Badge */}
                <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border-l-4 border-amber-500">
                  <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">Presenting The Collector's Edition</p>
                  <p className="text-xs text-amber-800 italic">27 exclusive residences crafted for connoisseurs of luxury</p>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Benefit from transparent pricing, launch offers and tailored EMIs designed for discerning buyers.
                </p>

                <div className="flex flex-wrap gap-2 mb-4 text-xs font-medium">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full shadow-sm">10:20:30:40 Payment Plan^</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">EOI Window Open</span>
                </div>

                <div className="mt-auto pt-4 border-t border-amber-100">
                  <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-xs font-bold text-amber-900 mb-2">Palatial Higher Floor Residencies</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-medium">3 BHK</span>
                        <span className="text-amber-700 font-bold">₹6.49 Cr<sup className="text-[10px]">++</sup></span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-medium">4 BHK</span>
                        <span className="text-amber-700 font-bold">₹8.69 Cr<sup className="text-[10px]">++</sup></span>
                      </div>
                    </div>
                    <p className="text-[10px] text-amber-600 mt-2 italic">• Exclusive Jodi Options Available</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Box 3 - Developer Profile */}
            <div className="group relative bg-white rounded-3xl shadow-xl border-2 border-amber-100/50 hover:border-amber-300/90 transition-all duration-500 overflow-hidden min-h-[420px] lg:min-h-[460px]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-400/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex flex-col p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-amber-500/30 transition-all duration-500 group-hover:scale-110 mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                  Godrej Properties
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Godrej Properties carries a 125+ year legacy of excellence, innovation and sustainable design.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">125+ Years</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">150+ Projects</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">ISO Certified</span>
                </div>
                <div className="mt-auto pt-4 border-t border-amber-100">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Winner of 400+ industry awards globally</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Leadership in IGBC Platinum-rated communities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Dedicated customer care with 24/7 concierge desk</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section id="about" className="relative py-20 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Content (Stick to left, end before middle) */}
            <div className="lg:pr-8">
              {/* Section Header */}
              <div className="mb-8">
                <div className="inline-block mb-4">
                  <span className="text-amber-600 text-sm font-semibold tracking-[0.2em] uppercase bg-amber-100/50 px-4 py-2 rounded-full border border-amber-200">
                    About Godrej Reserve
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 luxury-heading">
                  A Legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">Excellence</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent mb-8"></div>
              </div>

              {/* Content */}
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <span className="font-bold text-amber-700">Godrej Reserve</span> is a special initiative made to provide you constant security and enable you to live without anxiety. Godrej Properties has recently secured an expansive <span className="font-semibold text-gray-900">18.6-acre land</span> in the vibrant city of Mumbai, strategically located in the thriving suburb of Kandivali.
                </p>

                <p className="text-base">
                  This acquisition marks a significant stride for the company as it seeks to enhance its presence in the highly competitive Mumbai real estate market. Godrej Reserve is a symphony of urban design and natural beauty offering a blend of Mumbai's modern living.
                </p>

                <p className="text-base">
                  The site is one of the <span className="font-semibold text-gray-900">largest freehold land parcels in western suburbs</span>, offering <span className="font-semibold text-amber-700">6 towers with 51 floors each</span>.
                </p>

                {/* Key Highlights */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl border border-amber-200">
                    <p className="text-3xl font-bold text-amber-700 mb-1">18.6</p>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Acres of Land</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl border border-amber-200">
                    <p className="text-3xl font-bold text-amber-700 mb-1">6</p>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Premium Towers</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl border border-amber-200">
                    <p className="text-3xl font-bold text-amber-700 mb-1">51</p>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Floors Each</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl border border-amber-200">
                    <p className="text-3xl font-bold text-amber-700 mb-1">Western</p>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Suburb Location</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Images */}
            <div className="space-y-6 mt-16">
              {/* Image 1 */}
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl border-2 border-amber-200/50 hover:border-amber-400/80 transition-all duration-700">
                <Image
                  src="/image30.jpg"
                  alt="Godrej Reserve - View 1"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Image 2 */}
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl border-2 border-amber-200/50 hover:border-amber-400/80 transition-all duration-700">
                <Image
                  src="/Image31.jpg"
                  alt="Godrej Reserve - View 2"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={galleryModalOpen}
        onClose={closeGallery}
        images={galleryModalImages}
        title={galleryModalTitle}
      />

      {/* Premium Footer - At the end of all sections */}
      <Footer handleGalleryClick={handleGalleryClick} setShowScheduleVisitForm={setShowScheduleVisitForm} />

      {/* Chatbot Widget - Fixed position, outside main container */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]">
        {/* Chat Window */}
        {chatbotOpen && (
          <div className="mb-4 w-[calc(100vw-2rem)] md:w-96 h-[calc(100vh-8rem)] md:h-[600px] bg-white rounded-2xl shadow-2xl border-2 border-amber-200 flex flex-col overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 md:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg">Godrej Assistant</h3>
                  <p className="text-[10px] md:text-xs text-amber-100">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setChatbotOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] p-2.5 md:p-3 rounded-2xl ${msg.type === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-200'
                      }`}
                  >
                    <p className="text-xs md:text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-3 md:px-4 py-2 bg-white border-t border-gray-200">
              <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => {
                    setUserInput('What are the prices?');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-[10px] md:text-xs bg-amber-100 text-amber-700 px-2.5 md:px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  💰 Pricing
                </button>
                <button
                  onClick={() => {
                    setUserInput('Show me 3 BHK options');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-[10px] md:text-xs bg-amber-100 text-amber-700 px-2.5 md:px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  🏠 3 BHK
                </button>
                <button
                  onClick={() => {
                    setUserInput('Book a site visit');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-[10px] md:text-xs bg-amber-100 text-amber-700 px-2.5 md:px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  📅 Visit
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-xs md:text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-2 md:p-3 rounded-full hover:opacity-90 transition-opacity shadow-lg flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Chat Button */}
        <button
          onClick={() => setChatbotOpen(!chatbotOpen)}
          className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl hover:shadow-amber-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center relative group"
        >
          {chatbotOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <>
              {/* Playful Robot/Assistant Icon */}
              <div className="relative">
                {/* Robot Head */}
                <div className="relative">
                  {/* Antenna */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-white"></div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>

                  {/* Head */}
                  <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg border-2 border-white/40 flex items-center justify-center">
                    {/* Eyes */}
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Smile */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-1.5 border-b-2 border-white rounded-full"></div>
                </div>
              </div>

              {/* Notification Badge with Wave */}
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg">
                💬
              </span>

              {/* Pulse Ring */}
              <span className="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping"></span>
            </>
          )}
        </button>
      </div>

      {/* Auto-Popup Contact Form - Outside main container */}
      <ContactForm
        isOpen={showContactForm}
        onClose={hideContactForm}
        markAsSubmitted={markAsSubmitted}
      />

      {/* Schedule Visit Form - Outside main container */}
      <ScheduleVisitForm
        isOpen={showScheduleVisitForm}
        onClose={() => setShowScheduleVisitForm(false)}
      />
    </>
  );
}
