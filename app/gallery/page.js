"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Cormorant_Garamond } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

// Gallery data with all your images and videos
const galleryItems = [
  // Property Images
  { id: 1, src: '/image1.jpg', type: 'image', title: 'Premium Living Room', category: 'Interior' },
  { id: 2, src: '/image2.jpg', type: 'image', title: 'Master Bedroom', category: 'Interior' },
  { id: 3, src: '/image3.jpg', type: 'image', title: 'Modern Kitchen', category: 'Interior' },
  { id: 4, src: '/image4.jpg', type: 'image', title: 'Elegant Bathroom', category: 'Interior' },
  { id: 5, src: '/image5.jpg', type: 'image', title: 'Balcony View', category: 'Exterior' },
  { id: 6, src: '/image6.jpg', type: 'image', title: 'Dining Area', category: 'Interior' },
  { id: 7, src: '/image7.jpg', type: 'image', title: 'Study Room', category: 'Interior' },
  { id: 8, src: '/image8.jpg', type: 'image', title: 'Walk-in Closet', category: 'Interior' },
  { id: 9, src: '/image9.jpg', type: 'image', title: 'Guest Bedroom', category: 'Interior' },
  { id: 10, src: '/image10.jpg', type: 'image', title: 'Lobby Area', category: 'Common Areas' },
  { id: 11, src: '/image11.jpg', type: 'image', title: 'Swimming Pool', category: 'Amenities' },
  { id: 12, src: '/image12.jpg', type: 'image', title: 'Gymnasium', category: 'Amenities' },
  { id: 13, src: '/image13.jpg', type: 'image', title: 'Club House', category: 'Amenities' },
  { id: 14, src: '/image14.jpg', type: 'image', title: 'Garden View', category: 'Exterior' },
  { id: 15, src: '/image15.jpg', type: 'image', title: 'Kids Play Area', category: 'Amenities' },
  { id: 16, src: '/image16.jpg', type: 'image', title: 'Terrace Garden', category: 'Exterior' },
  { id: 17, src: '/image17.jpg', type: 'image', title: 'Reception', category: 'Common Areas' },
  { id: 18, src: '/image18.jpg', type: 'image', title: 'Parking Area', category: 'Common Areas' },
  { id: 19, src: '/image19.jpg', type: 'image', title: 'Entrance', category: 'Exterior' },
  { id: 20, src: '/image20.jpg', type: 'image', title: 'Landscape', category: 'Exterior' },
  { id: 21, src: '/image21.jpg', type: 'image', title: 'Night View', category: 'Exterior' },
  { id: 22, src: '/image22.jpg', type: 'image', title: 'Facade', category: 'Exterior' },
  { id: 23, src: '/image23.jpg', type: 'image', title: 'Interior Detail', category: 'Interior' },
  { id: 24, src: '/image24.jpg', type: 'image', title: 'Luxury Suite', category: 'Interior' },
  { id: 25, src: '/image25.jpg', type: 'image', title: 'Premium Balcony', category: 'Exterior' },
  { id: 26, src: '/image26.webp', type: 'image', title: 'Designer Kitchen', category: 'Interior' },
  { id: 27, src: '/image27.jpg', type: 'image', title: 'Spa & Wellness', category: 'Amenities' },
  { id: 28, src: '/image28.webp', type: 'image', title: 'Rooftop Lounge', category: 'Common Areas' },
  { id: 29, src: '/image29.webp', type: 'image', title: 'Infinity Pool', category: 'Amenities' },
  
  // Videos
  { id: 30, src: '/videos/IMG_2616_2.mp4', type: 'video', title: 'Property Walkthrough', category: 'Virtual Tour' },
  { id: 31, src: '/videos/Kitchen.mp4', type: 'video', title: 'Kitchen Tour', category: 'Virtual Tour' },
  { id: 32, src: '/videos/Room No 2.mp4', type: 'video', title: 'Bedroom Tour', category: 'Virtual Tour' },
  { id: 33, src: '/videos/Room No1.mp4', type: 'video', title: 'Living Room Tour', category: 'Virtual Tour' },
  
  // Additional creative assets
  { id: 34, src: '/Creative For post ads and etc/1.png', type: 'image', title: 'Marketing Creative 1', category: 'Marketing' },
  { id: 35, src: '/Creative For post ads and etc/2.png', type: 'image', title: 'Marketing Creative 2', category: 'Marketing' },
  { id: 36, src: '/Creative For post ads and etc/3.png', type: 'image', title: 'Marketing Creative 3', category: 'Marketing' },
  { id: 37, src: '/hero.png', type: 'image', title: 'Hero Banner', category: 'Marketing' },
];

// Lightbox Modal Component
const LightboxModal = ({ isOpen, onClose, item, allItems, currentIndex, setCurrentIndex }) => {
  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % allItems.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') nextItem();
    if (e.key === 'ArrowLeft') prevItem();
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen, currentIndex]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-7xl mx-2 sm:mx-4 h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* Responsive Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 text-white hover:text-amber-400 transition-colors z-20 bg-black/30 rounded-full p-1 sm:p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Responsive Content */}
        <div className="relative w-full h-full flex items-center justify-center px-2 sm:px-4 py-16 sm:py-20">
          {item.type === 'video' ? (
            <video
              className="max-w-full max-h-[70vh] sm:max-h-[75vh] lg:max-h-[80vh] rounded-lg shadow-2xl"
              controls
              autoPlay
              loop
              muted
              onError={(e) => {
                console.error('Lightbox video failed to load:', item.src, e);
              }}
            >
              <source src={item.src} type="video/mp4" />
              <source src={item.src} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="relative max-w-full max-h-[70vh] sm:max-h-[75vh] lg:max-h-[80vh] flex items-center justify-center">
              <Image
                src={item.src}
                alt={item.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[70vh] sm:max-h-[75vh] lg:max-h-[80vh] object-contain rounded-lg shadow-2xl"
                quality={95}
                priority
              />
            </div>
          )}
        </div>

        {/* Responsive Navigation */}
        <button
          onClick={prevItem}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextItem}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Responsive Item Info */}
        <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-2 sm:left-4 lg:left-6 right-2 sm:right-4 lg:right-6 text-center">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
          <p className="text-amber-300 text-xs sm:text-sm uppercase tracking-widest">{item.category}</p>
          <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">{currentIndex + 1} of {allItems.length}</p>
        </div>
      </div>
    </div>
  );
};

// Optimized Masonry Grid Item Component with Intersection Observer
const MasonryItem = ({ item, onClick, style }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const itemRef = useRef(null);
  const videoRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.1
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  // Optimized video handling
  const handleVideoMouseEnter = useCallback(() => {
    if (videoRef.current && !isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {}); // Ignore play errors
      setIsVideoPlaying(true);
    }
  }, [isVideoPlaying]);

  const handleVideoMouseLeave = useCallback(() => {
    if (videoRef.current && isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [isVideoPlaying]);

  return (
    <div 
      ref={itemRef}
      className="break-inside-avoid mb-4 cursor-pointer group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      style={style}
      onClick={() => onClick(item)}
    >
      {!isVisible ? (
        // Skeleton loader while not in viewport
        <div className="bg-gray-200 rounded-xl animate-pulse" style={{ height: `${Math.floor(Math.random() * 200) + 300}px` }}>
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      ) : (
        item.type === 'video' ? (
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full rounded-xl"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedMetadata={() => setImageLoaded(true)}
              onError={(e) => {
                console.error('Video failed to load:', item.src, e);
                setImageLoaded(true);
              }}
            >
              <source src={item.src} type="video/mp4" />
              <source src={item.src} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            
          </div>
        ) : (
          <div className="relative">
          <Image
            src={item.src}
            alt={item.title}
            width={400}
            height={Math.floor(Math.random() * 200) + 300} // Random height for masonry effect
            className="w-full rounded-xl object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onLoad={() => setImageLoaded(true)}
            quality={75}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Image Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-amber-300 text-xs uppercase tracking-wider">{item.category}</p>
            </div>
          </div>
          </div>
        )
      )}
    </div>
  );
};

export default function GalleryPage() {
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  
  // Smooth page entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle hash navigation to amenities section
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#amenities') {
      // Wait for page to load and filter to be set
      setTimeout(() => {
        filterItems('Amenities');
        // Scroll to top of page after filtering
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
    }
  }, []);
  
  const ITEMS_PER_PAGE = 12; // Load 12 items at a time for better performance

  const categories = ['All', 'Interior', 'Exterior', 'Amenities', 'Virtual Tour', 'Common Areas', 'Marketing'];

  // Memoized filtered items for performance
  const allFilteredItems = useMemo(() => {
    if (activeFilter === 'All') {
      return galleryItems;
    }
    return galleryItems.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  // Paginated items
  const paginatedItems = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    return allFilteredItems.slice(startIndex, endIndex);
  }, [allFilteredItems, currentPage]);

  const filterItems = useCallback((category) => {
    setIsLoading(true);
    setActiveFilter(category);
    setCurrentPage(1); // Reset to first page when filtering
    
    // Small delay for smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  }, []);

  const loadMore = useCallback(() => {
    if (paginatedItems.length < allFilteredItems.length && !newItemsLoading) {
      setNewItemsLoading(true);
      
      // Add smooth transition delay
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        
        // Reset loading state after animation
        setTimeout(() => {
          setNewItemsLoading(false);
        }, 600); // Allow time for stagger animation
      }, 200);
    }
  }, [paginatedItems.length, allFilteredItems.length, newItemsLoading]);

  const hasMore = paginatedItems.length < allFilteredItems.length;

  const openLightbox = (item) => {
    setCurrentItem(item);
    setCurrentIndex(galleryItems.findIndex(i => i.id === item.id));
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentItem(null);
  };

  return (
      <main className={`min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50/30 transition-all duration-1000 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} role="main" aria-label="Godrej Reserve Property Gallery">
      {/* Responsive Premium Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-white/95 via-amber-50/95 to-white/95 backdrop-blur-xl border-b border-gradient-to-r border-amber-200/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Mobile/Tablet Layout */}
            <div className="flex items-center justify-between w-full lg:hidden">
              {/* Premium Back to Home Button - Mobile */}
              <Link
                href="/"
                className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 group transform hover:-translate-y-1 text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Link>
              
              {/* Mobile Menu Button (Optional for future) */}
              <div className="w-8"></div>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center">
              {/* Premium Back to Home Button - Desktop */}
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 group transform hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Home
              </Link>
            </div>
            
            {/* Responsive Premium Title Section */}
            <div className={`text-center transition-all duration-1000 delay-300 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="relative">
                <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 bg-clip-text text-transparent ${cormorant.className} mb-1 sm:mb-2`}>
                  Property Gallery
                </h1>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
              </div>
              <div className="mt-2 sm:mt-3 lg:mt-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <span className="text-amber-700 font-semibold">{allFilteredItems.length} Premium Items</span>
                </div>
                <div className="hidden sm:block w-px h-3 sm:h-4 bg-amber-300"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                  <span className="text-amber-700 font-semibold">{categories.length - 1} Luxury Categories</span>
                </div>
              </div>
            </div>
            
            {/* Desktop Spacer */}
            <div className="hidden lg:block w-36"></div>
          </div>
        </div>
        
        {/* Elegant bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
      </div>

      {/* Responsive Filter Tabs */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Responsive Category Filters */}
        <div className={`flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3 mb-6 sm:mb-8 transition-all duration-1000 delay-500 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => filterItems(category)}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
              className={`px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 hover:scale-105 transform ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                  : 'bg-white/80 text-amber-700 hover:bg-amber-50 shadow-md hover:shadow-lg'
              }`}
            >
              <span className="whitespace-nowrap">{category}</span>
              <span className="ml-1 sm:ml-2 text-xs opacity-75">
                ({category === 'All' ? galleryItems.length : galleryItems.filter(item => item.category === category).length})
              </span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full shadow-lg">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-600 border-t-transparent mr-3"></div>
              <span className="text-amber-700 font-medium">Loading...</span>
            </div>
          </div>
        )}

        {/* Responsive Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 lg:gap-6">
          {paginatedItems.map((item, index) => {
            const prevPageItems = (currentPage - 1) * ITEMS_PER_PAGE;
            const isNewItem = index >= prevPageItems;
            const itemDelay = isNewItem 
              ? `${200 + ((index - prevPageItems) * 100)}ms` // New items animate in sequence
              : `${800 + (index % 12) * 50}ms`; // Existing items use original timing
            
            return (
              <div
                key={item.id}
                style={{ transitionDelay: itemDelay }}
                className={`transition-all duration-700 transform ${
                  pageLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                } ${isNewItem && newItemsLoading ? 'opacity-0 translate-y-12 scale-90' : ''}`}
              >
                <MasonryItem
                  item={item}
                  onClick={openLightbox}
                />
              </div>
            );
          })}
        </div>

        {/* Enhanced Load More Button with Loading States */}
        {hasMore && !isLoading && (
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <button
              onClick={loadMore}
              disabled={newItemsLoading}
              className={`inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-500 transform hover:-translate-y-1 text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
                newItemsLoading ? 'animate-pulse' : ''
              }`}
            >
              {newItemsLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent mr-2"></div>
                  <span className="hidden sm:inline">Loading More Images...</span>
                  <span className="sm:hidden">Loading...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Load More ({allFilteredItems.length - paginatedItems.length} remaining)</span>
                  <span className="sm:hidden">Load More ({allFilteredItems.length - paginatedItems.length})</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2 transition-transform duration-300 ${newItemsLoading ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </>
              )}
            </button>
            
            {/* Progress indicator */}
            {newItemsLoading && (
              <div className="mt-4 w-full max-w-xs mx-auto">
                <div className="bg-amber-200/30 rounded-full h-1 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {allFilteredItems.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No items found</h3>
            <p className="text-gray-400">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        item={currentItem}
        allItems={galleryItems}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </main>
  );
}
