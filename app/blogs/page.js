"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

// Sample blog data - Replace with actual data from CMS/API
const blogPosts = [
    {
        id: 1,
        slug: 'luxury-living-redefined',
        title: 'Luxury Living Redefined: The Godrej Reserve Experience',
        excerpt: 'Discover how Godrej Reserve is transforming the landscape of luxury residential living in Mumbai with world-class amenities and sophisticated design.',
        image: '/image1.jpg',
        category: 'Lifestyle',
        date: '2024-11-15',
        readTime: '5 min read',
        author: 'Godrej Properties',
        featured: true
    },
    {
        id: 2,
        slug: 'investment-opportunities',
        title: 'Why Kandivali East is Mumbai\'s Next Real Estate Hotspot',
        excerpt: 'An in-depth analysis of the investment potential and growth prospects of Kandivali East as an emerging premium residential destination.',
        image: '/image4.jpg',
        category: 'Investment',
        date: '2024-11-10',
        readTime: '7 min read',
        author: 'Godrej Properties',
        featured: true
    },
    {
        id: 3,
        slug: 'sustainable-architecture',
        title: 'Sustainable Architecture: Building a Greener Future',
        excerpt: 'Explore the eco-friendly features and sustainable practices integrated into Godrej Reserve\'s design and construction.',
        image: '/image7.jpg',
        category: 'Architecture',
        date: '2024-11-05',
        readTime: '6 min read',
        author: 'Godrej Properties',
        featured: false
    },
    {
        id: 4,
        slug: 'amenities-showcase',
        title: 'World-Class Amenities That Elevate Your Lifestyle',
        excerpt: 'Take a detailed tour of the premium amenities and facilities that make Godrej Reserve a class apart in luxury living.',
        image: '/image10.jpg',
        category: 'Amenities',
        date: '2024-10-28',
        readTime: '4 min read',
        author: 'Godrej Properties',
        featured: false
    }
];

export default function BlogsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Lifestyle', 'Investment', 'Architecture', 'Amenities'];

    const filteredPosts = selectedCategory === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const featuredPost = blogPosts.find(post => post.featured);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50/30">
            {/* Header with Navbar Space */}
            <div className="h-20"></div>

            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center space-y-6">
                        <div className="inline-block">
                            <div className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-full border border-amber-200 mb-6">
                                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                                <span className="text-sm font-semibold text-amber-700 tracking-widest">INSIGHTS & STORIES</span>
                            </div>
                        </div>

                        <h1 className={`${cormorant.className} text-5xl md:text-7xl font-bold text-gray-900 leading-tight`}>
                            The Godrej Reserve
                            <span className="block bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                                Chronicles
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Discover stories of luxury, insights on investment, and updates on Mumbai's most prestigious residential address
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="px-6 pb-16">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-200"></div>
                            <span className="text-sm font-semibold text-amber-700 tracking-widest">FEATURED ARTICLE</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-200"></div>
                        </div>

                        <Link href={`/blogs/${featuredPost.slug}`}>
                            <div className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-amber-200/50 transition-all duration-500 cursor-pointer">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Image */}
                                    <div className="relative h-80 md:h-full overflow-hidden">
                                        <Image
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-full shadow-lg">
                                                Featured
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                                                {featuredPost.category}
                                            </span>
                                            <span className="text-sm text-gray-500">{featuredPost.date}</span>
                                        </div>

                                        <h2 className={`${cormorant.className} text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors`}>
                                            {featuredPost.title}
                                        </h2>

                                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                            {featuredPost.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-semibold">
                                                    G
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{featuredPost.author}</p>
                                                    <p className="text-xs text-gray-500">{featuredPost.readTime}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-4 transition-all">
                                                <span>Read More</span>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Category Filter */}
            <section className="px-6 pb-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/30'
                                        : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <Link key={post.id} href={`/blogs/${post.slug}`}>
                                <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-200/40 transition-all duration-500 cursor-pointer h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-semibold rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.readTime}</span>
                                        </div>

                                        <h3 className={`${cormorant.className} text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors line-clamp-2`}>
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xs font-semibold">
                                                    G
                                                </div>
                                                <span className="text-sm text-gray-700 font-medium">{post.author}</span>
                                            </div>

                                            <div className="text-amber-600 group-hover:translate-x-1 transition-transform">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="px-6 pb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700 p-12 text-center shadow-2xl">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>

                        <div className="relative z-10">
                            <h2 className={`${cormorant.className} text-4xl md:text-5xl font-bold text-white mb-4`}>
                                Stay Updated
                            </h2>
                            <p className="text-amber-50 text-lg mb-8 max-w-2xl mx-auto">
                                Subscribe to our newsletter for the latest insights, exclusive updates, and luxury living inspiration
                            </p>

                            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-white text-amber-700 font-semibold rounded-full hover:bg-amber-50 transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to Home Link */}
            <section className="px-6 pb-16">
                <div className="max-w-6xl mx-auto text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </section>
        </div>
    );
}
