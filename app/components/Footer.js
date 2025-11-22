"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { trackEvent, trackConversion, GA_EVENTS, GA_CATEGORIES } from '../utils/analytics';

const Footer = ({ handleGalleryClick, setShowScheduleVisitForm }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const openModal = (type) => {
    if (type === 'disclaimer') {
      setModalContent({
        title: 'Disclaimer',
        content: `
          <h3 class="text-xl font-bold text-amber-400 mb-4">Disclaimer</h3>
          <p class="mb-4 text-white">This website is only for the purpose of providing information regarding real estate projects in different regions. By accessing this website, the viewer confirms that the information including brochures and marketing collaterals on this website is solely for informational purposes and the viewer has not relied on this information for making any booking/purchase in any project of the company. Nothing on this website constitutes advertising, marketing, booking, selling or an offer for sale, or invitation to purchase a unit in any project by the company. The company is not liable for any consequence of any action taken by the viewer relying on such material/ information on this website.</p>
          <p class="mb-4 text-white">Please also note that the company has not verified the information and the compliances of the projects. Further, the company has not checked the RERA (Real Estate Regulation Act 2016) registration status of the real estate projects listed herein. The company does not make any representation in regards to the compliances done against these projects. You should make yourself aware about the RERA registration status of the listed real estate projects before purchasing property.</p>
          <p class="text-white">This site is for information purpose only and should not be treated as the official website.</p>
        `
      });
    } else if (type === 'privacy') {
      setModalContent({
        title: 'Privacy Policy',
        content: `
          <h3 class="text-xl font-bold text-amber-400 mb-4">Privacy Policy</h3>
          <p class="mb-4 text-white">In our endeavor and commitment of protecting your personal information, we have designed this comprehensive privacy policy. This is to keep your interests and information safe on our website.</p>
          
          <h4 class="text-lg font-semibold text-amber-300 mb-2 mt-6">Updation of privacy policy</h4>
          <p class="mb-4 text-white">This privacy policy is subject to undergo change and review without any prior notice or approval. So to keep yourself updated on the changes introduced, please keep visiting and reviewing the terms and conditions of this privacy policy.</p>
          
          <h4 class="text-lg font-semibold text-amber-300 mb-2 mt-6">User information</h4>
          <p class="mb-4 text-white">By using our website, you agree to abide by the rules laid out by us and consent to collection and use of all such information that you may furnish to, or through, our website. In some cases, while you visit our website, you may not need to provide any personal information. But in certain instances, we must have your personal information in order for us to grant you access to some of the links or sites. Such links/ pages may ask for your name, e-mail address, phone number etc. The information furnished by you is used to provide relevant products and services and to acknowledge receipt of your communication or to send out information and updates to you. You have option of requesting removal from our mailing list. We do not give away your personal information to any third party.</p>
          
          <h4 class="text-lg font-semibold text-amber-300 mb-2 mt-6">Security</h4>
          <p class="mb-4 text-white">To ensure security while transferring sensitive information, all the ongoing transmissions between client and server are encrypted using advanced and standard protocols. We also practice restricted access by employees and hold them to high levels of confidentiality.</p>
          
          <h4 class="text-lg font-semibold text-amber-300 mb-2 mt-6">Use of Cookies</h4>
          <p class="mb-4 text-white">We may use cookies for security, session continuity, and customization purposes. In case of a user opting to reject a cookie, he/ she may not be able to gain access to some of the limited services or use some features of the site.</p>
          
          <p class="mb-4 text-white">In case of any queries or suggestions regarding privacy statement or your dealings with this web site, please contact us.</p>
        `
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      {/* Premium gold border top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-16">

          {/* Column 1: Brand & Description - 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <div className="group flex justify-center md:justify-start">
              <Image
                src="/Layer 5.png"
                alt="Godrej Reserve Logo"
                width={240}
                height={60}
                className="object-contain md:-ml-12 brightness-200 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <p className="text-gray-300 text-sm leading-relaxed pr-4">
              Experience unparalleled luxury living at Godrej Reserve, Kandivali East.
              Where elegance meets comfort in Mumbai's most prestigious address.
            </p>

            {/* RERA Section */}
            <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-lg p-4 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-amber-400 font-semibold text-sm leading-none">MahaRERA Approved</p>
              </div>

              {/* RERA Barcodes Grid */}
              <div className="space-y-3">
                {[
                  { barcode: 'Barcode1.jpeg', wing: 'Wing 1', rera: 'P51800054703' },
                  { barcode: 'Barcode2.jpeg', wing: 'Wing 4', rera: 'P51800054691' },
                  { barcode: 'Barcode3.jpeg', wing: 'Wing 5', rera: 'P51800054690' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5">
                    <div className="bg-white rounded p-1 flex-shrink-0">
                      <Image
                        src={`/${item.barcode}`}
                        alt={`${item.wing} Barcode`}
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs text-amber-400 font-medium leading-tight">Godrej Reserve {item.wing}</p>
                      <p className="text-[10px] text-gray-300 leading-tight">MahaRERA: {item.rera}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-4">
              <p className="text-sm text-gray-400 font-medium">Follow Us:</p>
              <div className="flex gap-3">
                {[
                  { icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', label: 'Facebook' },
                  { icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', label: 'Twitter' },
                  { icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z', label: 'Instagram' },
                  { icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', label: 'LinkedIn' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-amber-500 hover:border-amber-400 transition-all duration-300 group"
                  >
                    <svg className="w-4 h-4 fill-current text-gray-300 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-amber-400 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#home', requiresForm: false },
                { name: 'About Us', href: '#about', requiresForm: false },
                { name: 'Configurations', href: '#configurations', requiresForm: false },
                { name: 'Amenities', href: '#amenities', requiresForm: true },
                { name: 'Gallery', href: '/gallery', requiresForm: true },
                { name: 'Location', href: '#location', requiresForm: false },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.requiresForm && handleGalleryClick) {
                        handleGalleryClick(e);
                      }
                    }}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group text-sm cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-400 transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Property Info - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-amber-400 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
              Property Info
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setShowScheduleVisitForm && setShowScheduleVisitForm(true)}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group text-sm cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-400 transition-colors"></span>
                  Floor Plans
                </button>
              </li>
              <li>
                <a
                  href="#configurations"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#configurations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group text-sm cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-400 transition-colors"></span>
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#location')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group text-sm cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-400 transition-colors"></span>
                  Payment Plans
                </a>
              </li>
              <li>
                <a
                  href="https://www.godrejproperties.com/digitalcollateral/mumbai/reserve/pdf/Reserve_opp-doc-v2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent(GA_EVENTS.DOWNLOAD, {
                    event_category: GA_CATEGORIES.CONVERSION,
                    event_label: 'Footer Brochure'
                  })}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-400 transition-colors"></span>
                  Brochure
                </a>
              </li>
              <li>
                <button
                  onClick={() => setShowScheduleVisitForm && setShowScheduleVisitForm(true)}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group text-sm cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-400 transition-colors"></span>
                  Site Visit
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info - 4 columns */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-bold text-amber-400 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
              Get In Touch
            </h3>

            <div className="space-y-4 mb-6">
              {/* Address */}
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/30 transition-colors">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Address</p>
                  <p className="text-sm text-gray-300">Akurli Rd, Kandivali East<br />Mumbai, Maharashtra 400101</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/30 transition-colors">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Call Us</p>
                  <a
                    href="tel:+919876543210"
                    onClick={() => trackConversion('call', 'Footer Phone')}
                    className="text-sm text-gray-300 hover:text-amber-400 transition-colors"
                  >
                    +91 8879006523
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/30 transition-colors">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                  <a
                    href="mailto:info@godrejreserve.com"
                    onClick={() => trackEvent(GA_EVENTS.CONTACT_CLICK, {
                      event_category: GA_CATEGORIES.CONVERSION,
                      event_label: 'Footer Email'
                    })}
                    className="text-sm text-gray-300 hover:text-amber-400 transition-colors"
                  >
                    godrejreserve.org.in@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-sm text-amber-400 font-semibold mb-2">Subscribe to Updates</p>
              <p className="text-xs text-gray-400 mb-3">Get latest news and exclusive offers</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center gap-1 hover:scale-105"
                >
                  {subscribed ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Done
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} <span className="text-amber-400 font-semibold">Godrej Reserve</span>. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Crafted with ❤️ by <span className="text-amber-400 font-medium">Synergy Three</span>
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <button
                onClick={() => openModal('privacy')}
                className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => openModal('disclaimer')}
                className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
              >
                Disclaimer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-amber-500/30 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-amber-500/30 opacity-30"></div>

      {/* Modal for Disclaimer and Privacy Policy */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-amber-500/30 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4 flex items-center justify-between border-b border-amber-500/30">
              <h2 className="text-2xl font-bold text-white">{modalContent.title}</h2>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-6 text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: modalContent.content }} className="prose prose-invert prose-amber max-w-none" />
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 to-transparent px-6 py-4 border-t border-amber-500/20">
              <button
                onClick={closeModal}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
