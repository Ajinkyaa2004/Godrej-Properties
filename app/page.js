"use client";

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Cormorant_Garamond } from 'next/font/google';
import ContactForm from './components/ContactForm';
import ScheduleVisitForm from './components/ScheduleVisitForm';

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
const StaticImageBox = ({ image, alt }) => {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer h-full transition-shadow duration-300 hover:shadow-xl">
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
        <div className="bg-black/60 px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-semibold">View Gallery</p>
        </div>
      </div>
    </div>
  );
};

// Amenities Image Grid Component - Optimized
const AmenitiesImageGrid = () => {
  return (
    <div className="space-y-4">
      {/* First Row - Two columns */}
      <div className="grid grid-cols-2 gap-4">
        {/* Image Box 1 */}
        <div className="h-48">
          <StaticImageBox image="/image1.jpg" alt="Amenity view 1" />
        </div>

        {/* Image Box 2 */}
        <div className="h-48">
          <StaticImageBox image="/image4.jpg" alt="Amenity view 2" />
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
          <StaticImageBox image="/image7.jpg" alt="Amenity view 3" />
        </div>

        {/* Image Box 4 */}
        <div className="h-48">
          <StaticImageBox image="/image10.jpg" alt="Amenity view 4" />
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

  // Auto-popup contact form after 10 seconds
  const [showContactForm, setShowContactForm] = useState(false);
  
  // Schedule Visit form state
  const [showScheduleVisitForm, setShowScheduleVisitForm] = useState(false);

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
      return 'We offer premium configurations:\n• 3 BHK - 1100 sq.ft (₹3.75 Cr*)\n• 3 BHK - 1330+ sq.ft (₹5.15 Cr*)\n• 3 BHK - 1450+ sq.ft (₹5.85 Cr*)\n• 4 BHK - 2000+ sq.ft (₹8.50 Cr*)';
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
              {/* Brand Name with Partner Badge */}
              <div className="flex items-start space-x-6 h-full">
                <a href="#home" className="relative z-10 flex items-center h-full">
                  <div className="pt-4">
                    <div className="flex items-start">
                      <Image 
                        src="/Layer 5.png" 
                        alt="Godrej Reserve Logo" 
                        width={290} 
                        height={70}
                        
                        className="object-contain -ml-20 mt-6"
                      />

                      <p className="ml-4 mt-3 text-sm font-medium  text-gray-600 px-3 py-1 rounded-full ">
                        PREFERRED PARTNER
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 font-medium -mt-2 flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-amber-600 rounded-full mr-2"></span>
                      Kandivali East, Mumbai
                    </p>
                  </div>
                </a>
              </div>

              {/* Desktop Nav Links - Enhanced */}
              <nav className="hidden lg:flex items-center space-x-1 relative ">
                {[
                  { name: 'Home', href: '#home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                  { name: 'About', href: '#about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { name: 'Amenities', href: '#amenities', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
                  { name: 'Gallery', href: '/gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                  { name: 'Contact', href: '#contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                ].map((item, index) => (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
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
                    className="relative px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-sm font-medium rounded-lg overflow-hidden group-hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform group-hover:-translate-y-0.5 flex items-center border border-white/20 hover:border-white/30"
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
              { name: 'Contact', href: '#contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-[#EFE9E3] rounded-lg group transition-colors"
                onClick={() => setMenuOpen(false)}
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

      {/* ---------------- HERO ---------------- */}
      <section
        id="home"
        className="relative h-[100vh] flex items-center justify-center overflow-hidden"
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero.png"
            alt="Godrej Reserve Hero Background"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 20%' }}
            priority
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-amber-400/80 animate-float" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-white/60 animate-float animation-delay-2000" />
        <div className="absolute bottom-1/4 right-1/3 w-4 h-4 rounded-full bg-amber-300/50 animate-float animation-delay-1000" />

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Pre-heading */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1 text-xs font-medium tracking-wider text-amber-300 bg-amber-900/30 backdrop-blur-sm rounded-full border border-amber-500/20">
              PREMIUM LIFESTYLE RESIDENCE
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-heading leading-tight mb-6">
            <span className="block mb-2 text-amber-300 text-3xl md:text-4xl font-light tracking-widest">WELCOME TO</span>
            <span className="relative inline-block">
              <span className="relative z-10">Godrej Reserve</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
            </span>
          </h1>

          {/* Subheading */}
          <div className="relative max-w-2xl mx-auto">
            <p className="text-gray-100 text-lg md:text-xl leading-relaxed font-light mb-8">
              Discover <span className="font-medium text-white font-bold">unparalleled elegance</span> at Godrej Reserve, where modern design meets timeless luxury in the heart of Kandivali East.
            </p>

            {/* Divider */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto my-8"></div>

            {/* Amenities Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['Luxury Residences', 'Premium Amenities', 'Green Spaces', '24/7 Security'].map((item, index) => (
                <span key={index} className="px-4 py-2 text-xs font-medium text-amber-100 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="relative group">
            <a
              href="#booking"
              className="relative inline-flex items-center px-8 py-4 overflow-hidden text-sm font-medium text-white transition-all duration-500 rounded-lg group bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-3">Schedule a Private Tour</span>
                <svg className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>

            <p className="mt-4 text-sm text-gray-300 opacity-0 animate-fade-in" style={{ "animationFillMode": "forwards", "animationDelay": "1s" }}>
              Limited availability. Book your exclusive viewing today.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs text-amber-200/70 tracking-widest">EXPLORE</span>
              <div className="w-6 h-10 border-2 border-amber-300/50 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-amber-300 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* ---------------- RESIDENCE CONFIGURATIONS ---------------- */}
      <section id="configurations" className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-amber-50">
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

        {/* Jodi Option Banner
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl p-6 mb-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Exclusive Jodi Options Available</h3>
                  <p className="text-amber-100 text-sm">Combine adjacent units for larger living spaces</p>
                </div>
              </div>
              <button className="bg-white text-amber-700 hover:bg-amber-50 px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                Know More
              </button>
            </div>
          </div> */}

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
                  <span className="text-2xl font-bold text-gray-800">₹3.75 Cr*</span>
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
              <button className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity">
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
              <button className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity">
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
              <button className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity">
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
              <button className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Schedule Viewing
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Amenities Section */}

      <section id="amenities" className="py-20 luxury-gradient-bg relative overflow-hidden">
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
                {/* Premium Badge */}
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  EXCLUSIVE
                </div>

                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="flex h-full transition-transform duration-700 ease-in-out">
                      {['/amenities/pool.jpg', '/amenities/gym.jpg', '/amenities/lounge.jpg'].map((img, idx) => (
                        <div key={idx} className="min-w-full h-full">
                          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center relative">
                            <span className="text-6xl">{['🏊', '🏋️', '🍹'][idx]}</span>
                            <div className="absolute inset-0 shimmer opacity-20"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                  <button className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl magnetic-button ripple-effect">
                    View All Amenities
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Masonry Grid in a Container */}
            <div className="reveal-right flex-1 w-full">
              <div className="glass-morphism rounded-2xl shadow-2xl p-8 border border-amber-100/50 luxury-border hover:shadow-amber-200/50 transition-all duration-500">
                <AmenitiesImageGrid />
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-all duration-500"></div>

              {/* Blur overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-[2px]">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
                  <button className="relative bg-white/95 text-amber-700 px-6 py-2.5 rounded-full font-semibold text-sm shadow-2xl hover:shadow-amber-500/30 hover:scale-110 transition-all duration-300 flex items-center gap-2 border-2 border-amber-200 hover:border-amber-400">
                    <span className="relative z-10">View Details</span>
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

            {/* Image 2 */}
            <div className="reveal group relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer h-[550px] border-2 border-amber-100/50 hover:border-amber-300/80 transition-all duration-700" style={{ animationDelay: '0.2s' }}>
              <img
                src="/Creative For post ads and etc/2.png"
                alt="Premium Feature 2"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Luxury gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-all duration-500"></div>

              {/* Blur overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-[2px]">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
                  <button className="relative bg-white/95 text-amber-700 px-6 py-2.5 rounded-full font-semibold text-sm shadow-2xl hover:shadow-amber-500/30 hover:scale-110 transition-all duration-300 flex items-center gap-2 border-2 border-amber-200 hover:border-amber-400">
                    <span className="relative z-10">View Details</span>
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
      <section id="location" className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
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

            {/* Right Side - Custom Luxury Map (3 columns) */}
            <div className="reveal-right lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-3 border-amber-200 hover:border-amber-400 transition-all duration-500 group">
                {/* Premium Map Container */}
                <div className="relative h-[700px] bg-gradient-to-br from-amber-50 via-white to-amber-50">

                  {/* Custom Illustrated Map */}
                  <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-amber-50 via-white to-blue-50">
                    {/* Map Background Pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4a574" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>

                    {/* Main Roads */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
                      {/* Vertical Main Road */}
                      <line x1="400" y1="0" x2="400" y2="700" stroke="#d4a574" strokeWidth="8" opacity="0.6" />
                      <line x1="400" y1="0" x2="400" y2="700" stroke="#f5f5f5" strokeWidth="4" opacity="0.8" />

                      {/* Horizontal Main Road */}
                      <line x1="0" y1="350" x2="800" y2="350" stroke="#d4a574" strokeWidth="8" opacity="0.6" />
                      <line x1="0" y1="350" x2="800" y2="350" stroke="#f5f5f5" strokeWidth="4" opacity="0.8" />

                      {/* Secondary Roads */}
                      <line x1="200" y1="0" x2="200" y2="700" stroke="#d4a574" strokeWidth="3" opacity="0.4" />
                      <line x1="600" y1="0" x2="600" y2="700" stroke="#d4a574" strokeWidth="3" opacity="0.4" />
                      <line x1="0" y1="200" x2="800" y2="200" stroke="#d4a574" strokeWidth="3" opacity="0.4" />
                      <line x1="0" y1="500" x2="800" y2="500" stroke="#d4a574" strokeWidth="3" opacity="0.4" />

                      {/* Water Body */}
                      <ellipse cx="250" cy="450" rx="80" ry="60" fill="#c9e6f5" opacity="0.6" />
                      <ellipse cx="250" cy="450" rx="70" ry="50" fill="#b3ddf2" opacity="0.4" />

                      {/* Green Spaces */}
                      <rect x="520" y="120" width="60" height="60" fill="#d4edda" opacity="0.5" rx="5" />
                      <rect x="100" y="550" width="50" height="50" fill="#d4edda" opacity="0.5" rx="5" />

                      {/* Central Location Marker (Godrej Reserve) */}
                      <circle cx="400" cy="350" r="30" fill="#dc3545" opacity="0.9" />
                      <circle cx="400" cy="350" r="25" fill="#fff" opacity="0.3" />
                      <circle cx="400" cy="350" r="8" fill="#fff" />

                      {/* Location Pin */}
                      <path d="M 400 320 L 400 350 L 385 365 L 400 380 L 415 365 Z" fill="#dc3545" opacity="0.8" />
                    </svg>

                    {/* Location Labels */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Kandivali East Label */}
                      <div className="absolute" style={{ top: '45%', left: '52%', transform: 'translate(-50%, -50%)' }}>
                        <div className="bg-white/90 px-3 py-1.5 rounded-lg shadow-lg border-2 border-amber-300">
                          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Kandivali East</p>
                        </div>
                      </div>

                      {/* Nearby Areas */}
                      <div className="absolute top-20 left-20 bg-white/80 px-2 py-1 rounded text-xs text-gray-600 shadow">Kandivali West</div>
                      <div className="absolute top-20 right-20 bg-white/80 px-2 py-1 rounded text-xs text-gray-600 shadow">Thakur Village</div>
                      <div className="absolute bottom-20 left-32 bg-white/80 px-2 py-1 rounded text-xs text-gray-600 shadow">Malad</div>
                      <div className="absolute bottom-32 right-32 bg-white/80 px-2 py-1 rounded text-xs text-gray-600 shadow">Hanuman Nagar</div>

                      {/* Metro Stations */}
                      <div className="absolute" style={{ top: '35%', left: '48%' }}>
                        <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                      </div>
                      <div className="absolute" style={{ top: '55%', left: '38%' }}>
                        <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                      </div>
                    </div>
                  </div>

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
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 rounded-lg p-3 shadow-xl border-2 border-amber-300 z-20">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-0.5">Project Address</p>
                        <p className="text-sm font-semibold text-gray-800">Godrej Reserve, Akurli Rd, Kandivali East</p>
                        <p className="text-xs text-gray-600">Mumbai, Maharashtra 400101</p>
                      </div>
                    </div>
                  </div>
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
                  Discover elegant 2, 3 and 4 BHK layouts crafted for premium living with smart space planning.
                </p>
                <div className="flex flex-wrap gap-2 mb-6 text-xs font-medium">
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
                <p className="text-gray-600 text-sm mb-4">
                  Benefit from transparent pricing, launch offers and tailored EMIs designed for discerning buyers.
                </p>
                <div className="flex flex-wrap gap-2 mb-6 text-xs font-medium">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">Flexible EMI</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">Zero Down Payment</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">Subsidy Ready</span>
                </div>
                <div className="mt-auto pt-4 border-t border-amber-100">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Launch price starting from ₹1.65 Cr*</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>10:80:10 milestone-linked payment schedule</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>Pre-EMI waived till possession on select units</span>
                    </li>
                  </ul>
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
                <div className="flex flex-wrap gap-2 mb-6 text-xs font-medium">
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



      {/* Gallery Modal */}
      <GalleryModal
        isOpen={galleryModalOpen}
        onClose={closeGallery}
        images={galleryModalImages}
        title={galleryModalTitle}
      />

      {/* Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {chatbotOpen && (
          <div className="mb-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border-2 border-amber-200 flex flex-col overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Godrej Assistant</h3>
                  <p className="text-xs text-amber-100">Online • Ready to help</p>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-200'
                      }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => {
                    setUserInput('What are the prices?');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors whitespace-nowrap"
                >
                  💰 Pricing
                </button>
                <button
                  onClick={() => {
                    setUserInput('Show me 3 BHK options');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors whitespace-nowrap"
                >
                  🏠 3 BHK
                </button>
                <button
                  onClick={() => {
                    setUserInput('Book a site visit');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors whitespace-nowrap"
                >
                  📅 Visit
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-full hover:opacity-90 transition-opacity shadow-lg"
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
          className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white w-20 h-20 rounded-full shadow-2xl hover:shadow-amber-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center relative group animate-bounce-slow"
        >
          {chatbotOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
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
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg border-2 border-white/40 flex items-center justify-center">
                    {/* Eyes */}
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-blink"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-blink" style={{ animationDelay: '0.1s' }}></div>
                    </div>
                  </div>

                  {/* Smile */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-1.5 border-b-2 border-white rounded-full"></div>
                </div>
              </div>

              {/* Notification Badge with Wave */}
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
                💬
              </span>

              {/* Pulse Ring */}
              <span className="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping"></span>
            </>
          )}
        </button>

        {/* ---------------- CTA (Booking) ---------------- */}
        {/* {<section
        id="booking"
        className="relative py-16 bg-gradient-to-r from-[#a67d4b] to-[#ad9989] text-white text-center fade-in"
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-heading mb-4">Book Your Site Visit Today</h2>
          <p className="text-gray-200 mb-8">
            Schedule a visit and explore the elegance of Godrej Reserve. Limited units available!
          </p>
          <a
            href="#contact"
            className="bg-[#F9F8F6] text-[#a67d4b] px-8 py-3 rounded-lg shadow hover:bg-white hover:text-[#a67d4b] transition"
          >
            Contact Sales Team
          </a>
        </div>
      </section> }

      {/* Auto-Popup Contact Form */}
      <ContactForm 
        isOpen={showContactForm} 
        onClose={hideContactForm}
        markAsSubmitted={markAsSubmitted}
      />

      {/* Schedule Visit Form */}
      <ScheduleVisitForm 
        isOpen={showScheduleVisitForm} 
        onClose={() => setShowScheduleVisitForm(false)}
      />

      {/* ---------------- FOOTER ---------------- */}
        {/* { <footer
        id="contact"
        className="bg-[#F9F8F6] border-t border-[#EFE9E3] py-8 text-center text-gray-600"
      >
        <p>
          © {new Date().getFullYear()} Godrej Project — Kandivali East | Designed by{" "}
          <span className="text-[#a67d4b] font-semibold">Ajinkya Dhumal</span>
        </p>
      </footer> }  */}
      </div>
    </>
  );
}
