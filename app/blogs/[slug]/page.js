"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';
import { notFound } from 'next/navigation';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

// Sample blog data - in production, this would come from CMS/API
const blogData = {
    'luxury-living-redefined': {
        title: 'Luxury Living Redefined: The Godrej Reserve Experience',
        subtitle: 'Discover how Godrej Reserve is transforming the landscape of luxury residential living in Mumbai',
        category: 'Lifestyle',
        date: '2024-11-15',
        readTime: '5 min read',
        author: 'Godrej Properties',
        authorBio: 'Leading real estate developer in India with a legacy of trust and excellence',
        image: '/image1.jpg',
        content: [
            {
                type: 'paragraph',
                text: 'In the heart of Mumbai\'s evolving landscape, Godrej Reserve stands as a testament to what modern luxury living truly means. Sprawling across 18.6 acres of meticulously planned land, this prestigious development represents a paradigm shift in residential excellence.'
            },
            {
                type: 'heading',
                text: 'A New Standard of Luxury'
            },
            {
                type: 'paragraph',
                text: 'Godrej Reserve isn\'t just about premium apartments; it\'s about crafting an entire lifestyle. With only 6 towers across the expansive property, residents enjoy an unprecedented level of space, privacy, and exclusivity that\'s rare in Mumbai\'s dense urban environment.'
            },
            {
                type: 'image',
                src: '/image4.jpg',
                caption: 'Architectural Excellence at Godrej Reserve'
            },
            {
                type: 'heading',
                text: 'World-Class Amenities'
            },
            {
                type: 'paragraph',
                text: 'Every amenity at Godrej Reserve has been thoughtfully designed to elevate your daily life. From the infinity pool that seems to merge with the sky to the state-of-the-art fitness center equipped with the latest technology, every detail speaks of uncompromising quality.'
            },
            {
                type: 'list',
                items: [
                    'Infinity Pool with temperature control',
                    'Olympic-size Swimming Pool',
                    'Fully-equipped Gymnasium with personal trainers',
                    'Luxury Clubhouse for social gatherings',
                    'Children\'s Play Areas with safety features',
                    'Landscaped Gardens and Walking Trails',
                    '24/7 Security with smart access control'
                ]
            },
            {
                type: 'quote',
                text: 'At Godrej Reserve, we haven\'t just built homes; we\'ve created a sanctuary where luxury meets functionality, and where every day feels like a celebration.',
                author: 'Godrej Properties'
            },
            {
                type: 'heading',
                text: 'Strategic Location Advantage'
            },
            {
                type: 'paragraph',
                text: 'Located in Kandivali East, Godrej Reserve offers the perfect balance of serene living and urban connectivity. With the Western Express Highway minutes away and the Dahisar Metro station nearby, residents enjoy seamless connectivity to Mumbai\'s key business districts and entertainment hubs.'
            },
            {
                type: 'paragraph',
                text: 'The surrounding infrastructure is rapidly developing, with new shopping centers, schools, hospitals, and recreational facilities enhancing the neighborhood\'s appeal. This makes Godrej Reserve not just a home, but a smart investment for the future.'
            },
            {
                type: 'heading',
                text: 'Sustainable Living'
            },
            {
                type: 'paragraph',
                text: 'In line with Godrej Properties\' commitment to sustainability, Godrej Reserve incorporates eco-friendly features throughout. From rainwater harvesting systems to energy-efficient lighting and waste management solutions, the development ensures minimal environmental impact while maximizing comfort.'
            }
        ],
        tags: ['Luxury Living', 'Mumbai Real Estate', 'Premium Apartments', 'Godrej Properties']
    },
    // Add more blog posts here as needed
};

export default function BlogDetailPage({ params }) {
    const { slug } = params;
    const blog = blogData[slug];

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50/30">
            {/* Header Space */}
            <div className="h-20"></div>

            {/* Hero Section */}
            <section className="relative px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                        <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/blogs" className="hover:text-amber-600 transition-colors">Blogs</Link>
                        <span>/</span>
                        <span className="text-amber-600 font-medium">{blog.category}</span>
                    </nav>

                    {/* Category Badge */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 text-sm font-semibold rounded-full border border-amber-200">
                            {blog.category}
                        </span>
                        <span className="text-gray-500">{blog.date}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">{blog.readTime}</span>
                    </div>

                    {/* Title */}
                    <h1 className={`${cormorant.className} text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight`}>
                        {blog.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        {blog.subtitle}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                            <span className="text-white text-2xl font-bold">G</span>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-lg">{blog.author}</p>
                            <p className="text-sm text-gray-600">{blog.authorBio}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="px-6 pb-12">
                <div className="max-w-5xl mx-auto">
                    <div className="relative h-96 md:h-[32rem] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="px-6 pb-16">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg max-w-none">
                        {blog.content.map((block, index) => {
                            switch (block.type) {
                                case 'paragraph':
                                    return (
                                        <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                                            {block.text}
                                        </p>
                                    );

                                case 'heading':
                                    return (
                                        <h2 key={index} className={`${cormorant.className} text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-6`}>
                                            {block.text}
                                        </h2>
                                    );

                                case 'image':
                                    return (
                                        <figure key={index} className="my-12">
                                            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                                                <Image
                                                    src={block.src}
                                                    alt={block.caption}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            {block.caption && (
                                                <figcaption className="text-center text-sm text-gray-600 mt-4 italic">
                                                    {block.caption}
                                                </figcaption>
                                            )}
                                        </figure>
                                    );

                                case 'list':
                                    return (
                                        <ul key={index} className="space-y-3 mb-8">
                                            {block.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-700 text-lg">
                                                    <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    );

                                case 'quote':
                                    return (
                                        <blockquote key={index} className="my-12 relative">
                                            <div className="absolute -left-4 top-0 text-8xl text-amber-200 font-serif leading-none">"</div>
                                            <div className="relative bg-gradient-to-br from-amber-50 to-white border-l-4 border-amber-500 p-8 rounded-r-2xl shadow-lg">
                                                <p className={`${cormorant.className} text-2xl text-gray-800 italic mb-4 relative z-10`}>
                                                    {block.text}
                                                </p>
                                                {block.author && (
                                                    <cite className="text-amber-700 font-semibold not-italic">
                                                        — {block.author}
                                                    </cite>
                                                )}
                                            </div>
                                        </blockquote>
                                    );

                                default:
                                    return null;
                            }
                        })}
                    </div>

                    {/* Tags */}
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <div className="flex flex-wrap gap-3">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-full hover:border-amber-300 hover:bg-amber-50 transition-colors cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            {/* Share Section */}
            <section className="px-6 pb-16">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border border-amber-100 shadow-lg">
                        <h3 className={`${cormorant.className} text-2xl font-bold text-gray-900 mb-4`}>
                            Share This Article
                        </h3>
                        <div className="flex gap-4">
                            {[
                                { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', color: 'hover:bg-blue-600' },
                                { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', color: 'hover:bg-blue-400' },
                                { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z', color: 'hover:bg-blue-700' },
                                { name: 'WhatsApp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z', color: 'hover:bg-green-600' },
                            ].map((social, index) => (
                                <button
                                    key={index}
                                    className={`p-3 bg-white border border-gray-200 rounded-full text-gray-600 ${social.color} hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg group`}
                                    aria-label={`Share on ${social.name}`}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 pb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-12 text-center shadow-2xl">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-600/20 rounded-full blur-2xl"></div>

                        <div className="relative z-10">
                            <h2 className={`${cormorant.className} text-4xl md:text-5xl font-bold text-white mb-4`}>
                                Experience Luxury Living
                            </h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                                Discover your dream home at Godrej Reserve. Schedule a visit today and witness luxury redefined.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/#contact"
                                    className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1"
                                >
                                    Schedule a Visit
                                </Link>
                                <Link
                                    href="/gallery"
                                    className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1"
                                >
                                    View Gallery
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to Blogs */}
            <section className="px-6 pb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to All Blogs
                    </Link>
                </div>
            </section>
        </div>
    );
}
