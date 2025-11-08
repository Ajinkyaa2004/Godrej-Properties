"use client";

import { useState, useEffect } from "react";
import Head from 'next/head';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

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
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
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
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent font-['Great_Vibes']">
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
            
            <p className="mt-4 text-sm text-gray-300 opacity-0 animate-fade-in" style={{"animationFillMode": "forwards", "animationDelay": "1s"}}>
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

      {/* ---------------- HIGHLIGHTS ---------------- */}
      <section id="about" className="section container fade-in">
        <h2 className="text-3xl font-heading mb-8 text-center">Project Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F9F8F6] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#EFE9E3] hover:border-[#ad9989]">
            <h3 className="font-heading text-lg text-[#a67d4b] mb-2">Prime Location</h3>
            <p className="text-sm">
              Strategically located in Kandivali East, with schools, malls and metro nearby.
            </p>
          </div>
          <div className="bg-[#F9F8F6] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#EFE9E3] hover:border-[#ad9989]">
            <h3 className="font-heading text-lg text-[#a67d4b] mb-2">Modern Amenities</h3>
            <p className="text-sm">
              Clubhouse, gym, swimming pool, garden, and 24x7 security for a luxury lifestyle.
            </p>
          </div>
          <div className="bg-[#F9F8F6] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#EFE9E3] hover:border-[#ad9989]">
            <h3 className="font-heading text-lg text-[#a67d4b] mb-2">Configurations</h3>
            <p className="text-sm">
              1 / 2 / 3 BHK homes with spacious layouts and scenic balcony views.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- CTA (Booking) ---------------- */}
      <section
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
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer
        id="contact"
        className="bg-[#F9F8F6] border-t border-[#EFE9E3] py-8 text-center text-gray-600"
      >
        <p>
          © {new Date().getFullYear()} Godrej Project — Kandivali East | Designed by{" "}
          <span className="text-[#a67d4b] font-semibold">Ajinkya Dhumal</span>
        </p>
      </footer>
    </>
  );
}
