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
                        src="/image15.jpg"
                        alt="Godrej Reserve Perfect for Families"
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
                            Lifestyle
                        </span>
                        <span className="text-gray-600">December 7, 2025</span>
                        <span className="text-gray-600">4 min read</span>
                    </div>
                    <span className="text-gray-700 font-medium">By Godrej Properties</span>
                </div>

                {/* Title */}
                <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${cormorant.className}`}>
                    Why Godrej Reserve Is Perfect for Families
                </h1>

                {/* Key Points Section */}
                <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-100 p-8 mb-10">
                    <h2 className={`text-2xl font-bold text-amber-800 mb-6 ${cormorant.className}`}>
                        Family-Friendly Features
                    </h2>
                    <ul className="space-y-4">
                        {[
                            'Gated and safe community',
                            'Good schools and hospitals nearby',
                            'Spacious and comfortable apartments',
                            "Children's play area and open spaces",
                            'Peaceful and healthy environment',
                            '24/7 security system',
                            'Good neighbourhood and community life'
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
                            Godrej Reserve is the <strong>perfect destination for families</strong> seeking security, comfort, and an upgraded lifestyle. The project offers a secure environment with modern amenities and open areas where children can play and grow freely.
                        </p>
                    </div>

                    <h2 className={`text-3xl font-bold text-gray-900 mt-12 mb-6 ${cormorant.className}`}>
                        A Safe Haven for Your Family
                    </h2>

                    <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                        <p>
                            Living in a <strong>gated and safe community</strong> is every family's priority, and Godrej Reserve delivers exactly that. With advanced security systems including CCTV surveillance, access control, and trained security personnel available round the clock, families can enjoy peace of mind knowing their loved ones are protected.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                            Convenience at Your Doorstep
                        </h3>

                        <p>
                            With the nearest <strong>schools, hospitals, and daily needs nearby</strong>, convenience combines well with peaceful living. The strategic location ensures that:
                        </p>

                        <ul className="list-none space-y-3 ml-6">
                            <li className="flex items-start">
                                <span className="text-amber-600 mr-2">🏫</span>
                                Top-rated schools and educational institutions are within a 10-minute drive
                            </li>
                            <li className="flex items-start">
                                <span className="text-amber-600 mr-2">🏥</span>
                                Multi-specialty hospitals and healthcare facilities nearby
                            </li>
                            <li className="flex items-start">
                                <span className="text-amber-600 mr-2">🛒</span>
                                Shopping malls and supermarkets for daily convenience
                            </li>
                            <li className="flex items-start">
                                <span className="text-amber-600 mr-2">🚇</span>
                                Excellent connectivity to major business districts
                            </li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                            Spacious Living for Growing Families
                        </h3>

                        <p>
                            The <strong>spacious and comfortable apartments</strong> are thoughtfully designed to accommodate the needs of modern families. With well-ventilated rooms, ample natural light, and functional layouts, every home at Godrej Reserve provides the perfect environment for family bonding and growth.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                            Where Children Thrive
                        </h3>

                        <p>
                            The project features dedicated <strong>children's play areas and open spaces</strong> where kids can play, explore, and make lasting friendships. From landscaped gardens to safe play zones, every aspect is designed keeping young families in mind.
                        </p>

                        <p>
                            The <strong>well-planned layout and green surroundings</strong> create a peaceful and healthy environment that nurtures physical and mental well-being. The abundance of greenery not only enhances the aesthetic appeal but also ensures cleaner air and a refreshing atmosphere.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                            Building Community Connections
                        </h3>

                        <p>
                            Beyond the physical amenities, Godrej Reserve fosters a <strong>good neighbourhood and community life</strong>. Regular community events, shared spaces, and a friendly environment make it easy for families to connect, creating a true sense of belonging.
                        </p>

                        <p>
                            This makes it one of the <strong>best places to raise your family</strong> – a place where safety meets comfort, convenience meets peace, and neighbors become lifelong friends.
                        </p>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 mt-12 text-center text-white shadow-2xl">
                        <h3 className={`text-3xl font-bold mb-4 ${cormorant.className}`}>
                            Give Your Family the Home They Deserve
                        </h3>
                        <p className="text-lg mb-6 text-amber-50">
                            Experience family-friendly living at Godrej Reserve
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-block px-8 py-4 bg-white text-amber-700 font-bold rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Book a Family Tour
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
                        <Link href="/blogs/luxury-living-redefined" className="group">
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="relative h-48">
                                    <Image src="/image1.jpg" alt="Luxury Living" fill className="object-cover" />
                                </div>
                                <div className="p-6">
                                    <span className="text-amber-600 text-sm font-semibold">Lifestyle</span>
                                    <h4 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-amber-700 transition-colors">
                                        Luxury Living Redefined: The Godrej Reserve Experience
                                    </h4>
                                </div>
                            </div>
                        </Link>
                        <Link href="/blogs/amenities-showcase" className="group">
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="relative h-48">
                                    <Image src="/image10.jpg" alt="Amenities" fill className="object-cover" />
                                </div>
                                <div className="p-6">
                                    <span className="text-amber-600 text-sm font-semibold">Amenities</span>
                                    <h4 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-amber-700 transition-colors">
                                        World-Class Amenities That Elevate Your Lifestyle
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
