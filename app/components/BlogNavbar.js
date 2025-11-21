"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show navbar after a brief delay for smooth entrance
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/#about' },
        { name: 'Amenities', href: '/#amenities' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Blogs', href: '/blogs' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
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
                        {/* Brand Section */}
                        <div className="flex items-center gap-4 h-full py-3">
                            <Link href="/" className="relative z-10 flex items-center">
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
                            </Link>

                            {/* Vertical Divider */}
                            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                            {/* Location Badge */}
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

                        {/* Desktop Nav Links */}
                        <nav className="hidden lg:flex items-center space-x-1 relative">
                            {navItems.map((item, index) => (
                                <div key={item.name} className="relative group">
                                    <Link
                                        href={item.href}
                                        className={`flex items-center px-5 py-3 text-sm font-medium text-gray-700 hover:text-amber-800 transition-all duration-300 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-amber-600 before:to-amber-400 before:transition-all before:duration-300 before:-translate-x-1/2 hover:before:w-3/4 ${item.name === 'Blogs' ? 'text-amber-700' : ''
                                            }`}
                                        style={{ transitionDelay: `${index * 50}ms` }}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                    </Link>
                                    <span className="absolute -inset-2 bg-gradient-to-r from-amber-100/50 to-transparent rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </div>
                            ))}

                            {/* CTA Button */}
                            <div className="ml-4 relative group">
                                <Link
                                    href="/#contact"
                                    className="relative px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-sm font-medium rounded-lg overflow-hidden group-hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform group-hover:-translate-y-0.5 flex items-center border border-white/20 hover:border-white/30 whitespace-nowrap"
                                >
                                    <span className="relative z-10 flex items-center">
                                        <span>Schedule Visit</span>
                                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                                            →
                                        </span>
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </Link>
                            </div>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors z-50"
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

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`absolute top-20 left-0 right-0 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div className="px-6 py-4 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-amber-50 rounded-lg transition-colors ${item.name === 'Blogs' ? 'bg-amber-50 text-amber-700' : ''
                                    }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/#contact"
                            className="block w-full mt-4 px-6 py-3 text-center bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-300"
                            onClick={() => setMenuOpen(false)}
                        >
                            Schedule Visit
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
