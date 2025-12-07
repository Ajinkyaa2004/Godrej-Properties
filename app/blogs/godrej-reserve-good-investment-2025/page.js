"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export default function BlogPost() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50/30">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-amber-200/30 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:from-amber-500 hover:to-amber-600 transition-all duration-300 group transform hover:-translate-y-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                            </svg>
                            Back to Blogs
                        </Link>
                        <Link
                            href="/"
                            className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
                        >
                            Home
                        </Link>
                    </div>
                </div>
            </header>

            {/* Article */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Image */}
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl mb-8">
                    <Image
                        src="/image13.jpg"
                        alt="Godrej Reserve Investment 2025"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between mb-8 text-sm">
                    <div className="flex items-center gap-4">
                        <span className="px-4 py-1 bg-amber-100 text-amber-800 rounded-full font-semibold">
                            Investment
                        </span>
                        <span className="text-gray-600">December 7, 2025</span>
                        <span className="text-gray-600">4 min read</span>
                    </div>
                    <span className="text-gray-700 font-medium">By Godrej Properties</span>
                </div>

                {/* Title */}
                <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${cormorant.className}`}>
                    Is Godrej Reserve a Good Investment in 2025?
                </h1>

                {/* Key Points Section */}
                <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-100 p-8 mb-10">
                    <h2 className={`text-2xl font-bold text-amber-800 mb-6 ${cormorant.className}`}>
                        Key Investment Highlights
                    </h2>
                    <ul className="space-y-4">
                        {[
                            'Good location with future development potential',
                            'Trusted Builder - Godrej Properties',
                            'Modern homes with quality design',
                            'Good amenities and open spaces',
                            'Suitable for long-term investment',
                            'Anticipated increase in property value',
                            'Safe and peaceful living environment'
                        ].map((point, index) => (
                            <li key={index} className="flex items-start">
                                <svg className="w-6 h-6 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700 text-lg">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none">
                    <div className="bg-gradient-to-r from-amber-50 to-transparent border-l-4 border-amber-600 p-6 rounded-r-xl mb-8">
                        <p className="text-gray-800 text-lg leading-relaxed">
                            Godrej Reserve will be a good investment option in 2025 for homebuyers seeking comfort, safety, and long-term appreciation. The project is developed by <strong>Godrej Properties</strong>, which assures trust and quality construction.
                        </p>
                    </div>

                    <h2 className={`text-3xl font-bold text-gray-900 mt-12 mb-6 ${cormorant.className}`}>
                        Why Godrej Reserve Stands Out
                    </h2>

                    <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                        <p>
                            It is situated in a <strong>developing area</strong> that has good connectivity and daily convenience. The location offers seamless access to major highways, metro stations, schools, hospitals, and shopping centers, making it an ideal choice for modern families.
                        </p>

                        <p>
                            Equipped with <strong>modern amenities</strong>, green surroundings, and growing demand for quality homes, Godrej Reserve has excellent potential for future appreciation in value. The project features state-of-the-art facilities including:
                        </p>

                        <ul className="list-none space-y-3 ml-6">
                            <li className="flex items-start">
                                <span className="text-amber-600 mr-2">•</span>
                                Premium clubhouse with recreational facilities
                            </li>
                            <li className="flex items-start">
                                <span className="text-amber-600 mr-2">•</span>
                                Swimming pool and fitness center
                            </li>
                            <li className="flex items-start">
                                <span className="text-amber-600 mr-2">•</span>
                                Landscaped gardens and children's play areas
                            </li>
                            <li className="flex items-start">
                                <span className="text-amber-600 mr-2">•</span>
                                24/7 security and concierge services
                            </li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                            Long-Term Investment Potential
                        </h3>

                        <p>
                            The combination of <strong>Godrej Properties' reputation</strong>, strategic location, and premium amenities makes Godrej Reserve a compelling investment choice. The area is witnessing rapid infrastructure development, which is expected to drive significant property value appreciation over the coming years.
                        </p>

                        <p>
                            For investors looking for a <strong>safe and peaceful living environment</strong> with strong rental yields and capital appreciation prospects, Godrej Reserve offers the perfect balance of lifestyle comfort and financial returns.
                        </p>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 mt-12 text-center text-white shadow-2xl">
                        <h3 className={`text-3xl font-bold mb-4 ${cormorant.className}`}>
                            Ready to Invest in Your Future?
                        </h3>
                        <p className="text-lg mb-6 text-amber-50">
                            Discover why Godrej Reserve is the smart investment choice for 2025
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-block px-8 py-4 bg-white text-amber-700 font-bold rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Schedule a Site Visit
                        </Link>
                    </div>
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-gray-600 text-sm mb-4">Share this article:</p>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Facebook
                        </button>
                        <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                            Twitter
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            WhatsApp
                        </button>
                    </div>
                </div>

                {/* Related Posts */}
                <div className="mt-16">
                    <h3 className={`text-3xl font-bold text-gray-900 mb-8 ${cormorant.className}`}>
                        Related Articles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/blogs/investment-benefits-godrej-reserve" className="group">
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="relative h-48">
                                    <Image src="/image4.jpg" alt="Investment Benefits" fill className="object-cover" />
                                </div>
                                <div className="p-6">
                                    <span className="text-amber-600 text-sm font-semibold">Investment</span>
                                    <h4 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-amber-700 transition-colors">
                                        Investment Benefits of Buying at Godrej Reserve
                                    </h4>
                                </div>
                            </div>
                        </Link>
                        <Link href="/blogs/investment-opportunities" className="group">
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="relative h-48">
                                    <Image src="/image7.jpg" alt="Real Estate Hotspot" fill className="object-cover" />
                                </div>
                                <div className="p-6">
                                    <span className="text-amber-600 text-sm font-semibold">Investment</span>
                                    <h4 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-amber-700 transition-colors">
                                        Why Kandivali East is Mumbai's Next Real Estate Hotspot
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
