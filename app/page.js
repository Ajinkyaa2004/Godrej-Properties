"use client";

import { useState, useEffect } from "react";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const GalleryModal = ({ isOpen, onClose, images, title }) => {
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
                <img
                  src={img}
                  alt={`${title} - View ${idx + 1}`}
                  className="max-h-full max-w-full object-contain"
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryModalImages, setGalleryModalImages] = useState([]);
  const [galleryModalTitle, setGalleryModalTitle] = useState('');

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

  // Property images data
  const propertyImages = {
    bhk3_1100: [
      '/image2.jpg',
      '/image2.jpg',
      '/image9.jpg'
    ],
    bhk4_1800: [
      '/hero.png',
      '/file.svg'
    ],
    amenities: [
      '/hero.png',
      '/file.svg',
      '/globe.svg',
      '/next.svg'
    ],
    bhk3_1450: [
      '/image3.jpg',
      '/image6.jpg'
    ],
    bhk4_2000: [
      '/image2.jpg',
      '/image10.jpg',
      '/image8.jpg'
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
          {/* Enhanced Glassmorphism Background */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-xl">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/10"></div>
            {/* Noise texture for better glass effect */}
            <div className="absolute inset-0 mix-blend-overlay opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDQwMGg0MDB6Ii8+PC9zdmc+')]"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Brand Name with Partner Badge */}
              <div className="flex items-start space-x-6 h-full">
                <a href="#home" className="relative z-10 flex items-center h-full">
                  <div className="pt-10">
                    <div className="flex items-start">
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent font-['Playfair_Display'] font-semibold tracking-tight">
                        Godrej Reserve
                      </h1>
                      <span className="ml-4 mt-2 text-xs font-medium bg-gradient-to-r from-amber-700/80 to-amber-600/80 text-white px-3 py-1 rounded-full border border-amber-500/30 shadow-sm">
                        PREFERRED PARTNER
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium -mt-4 flex items-center">
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
                  { name: 'Gallery', href: '#gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
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

                {/* CTA Button with Glass Effect */}
                <div className="ml-4 relative group">
                  <a
                    href="#contact"
                    className="relative px-5 py-2.5 bg-gradient-to-r from-amber-600/90 to-amber-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-lg overflow-hidden group-hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform group-hover:-translate-y-0.5 flex items-center border border-white/20 hover:border-white/30"
                  >
                    <span className="relative z-10 flex items-center">
                      <span>Schedule Visit</span>
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                        →
                      </span>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </a>
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
        <div className={`absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="px-6 py-4 space-y-4">
            {[
              { name: 'Home', href: '#home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { name: 'About', href: '#about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { name: 'Amenities', href: '#amenities', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
              { name: 'Gallery', href: '#gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
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
        style={{
          backgroundImage: "url('/hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat',
        }}
      >
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
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-amber-600 tracking-widest">ELITE LIVING SPACES</span>
            <h2 className="section-title mt-2">Premium Residences</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-6 rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Redefining Kandivali's skyline with 18.6 Acres of land parcel & just 6 towers. Discover an endless vacation in your dream home.
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
          <div className="group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl bg-white hover:-translate-y-2">
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="flex h-full transition-transform duration-700 ease-in-out">
                  {propertyImages.bhk3_1100.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full">
                      <img
                        src={img}
                        alt={`3 BHK Residence View ${idx + 1}`}
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
                    <span className="text-sm">Spacious Living & Dining Areas</span>
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
          <div className="group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl bg-white hover:-translate-y-2">
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="flex h-full transition-transform duration-700 ease-in-out">
                  {propertyImages.bhk3_1450.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full">
                      <img
                        src={img}
                        alt={`3 BHK Premium View ${idx + 1}`}
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
                    <span className="text-sm">Luxury Fittings in All Bathrooms</span>
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
          <div className="group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl bg-white hover:-translate-y-2">
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="flex h-full transition-transform duration-700 ease-in-out">
                  {propertyImages.bhk3_1450.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full">
                      <img
                        src={img}
                        alt={`3 BHK Premium View ${idx + 1}`}
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
                    openGallery(propertyImages.bhk3_1450, '3 BHK | 1450+ sq.ft');
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
          <div className="group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl bg-white hover:-translate-y-2">
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

      <section id="amenities" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-amber-600 tracking-widest">Where Comfort Meets Indulgence</span>
            <h2 className="section-title mt-2">WORLD CLASS AMENITIES</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-6 rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Redefining Kandivali's skyline with 18.6 Acres of land parcel & just 6 towers. Discover an endless vacation in your dream home.
            </p>
          </div></div>

          {/* Left-aligned box with limited width */}
          <div className="max-w-sm ml-0 mr-auto"> {/* 👈 changed from mx-auto to ml-0 mr-auto */}
            <div className="group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl bg-white hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="flex h-full transition-transform duration-700 ease-in-out">
                    {['/amenities/pool.jpg', '/amenities/gym.jpg', '/amenities/lounge.jpg'].map((img, idx) => (
                      <div key={idx} className="min-w-full h-full">
                        <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                          <span className="text-5xl">{['🏊', '🏋️', '🍹'][idx]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">Luxury Amenities</h3>
                  <p className="text-amber-300 font-medium">Experience the best in class facilities</p>
                </div>
              </div>

              <div className="p-6">
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
                          className="w-5 h-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  View All Amenities
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* ---------------- CTA (Booking) ---------------- */}
      {/* <section
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
      </section> */}

      {/* ---------------- FOOTER ---------------- */}
      {/* <footer
        id="contact"
        className="bg-[#F9F8F6] border-t border-[#EFE9E3] py-8 text-center text-gray-600"
      >
        <p>
          © {new Date().getFullYear()} Godrej Project — Kandivali East | Designed by{" "}
          <span className="text-[#a67d4b] font-semibold">Ajinkya Dhumal</span>
        </p>
      </footer> */}

      {/* Gallery Modal */}
      {/* <GalleryModal
        isOpen={galleryModalOpen}
        onClose={closeGallery}
        images={galleryModalImages}
        title={galleryModalTitle}
      /> */}
    </>
  );
}
