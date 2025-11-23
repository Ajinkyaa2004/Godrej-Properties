import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f59e0b' },
    { media: '(prefers-color-scheme: dark)', color: '#d97706' },
  ],
};

export const metadata = {
  title: "Godrej Reserve Kandivali East | Luxury 3 & 4 BHK Flats ₹3.75Cr* | Premium Residences Mumbai",
  description: "Discover Godrej Reserve - Premium 3 & 4 BHK luxury apartments in Kandivali East, Mumbai. Starting ₹3.75Cr*. 18.6 acres, 6 towers, world-class amenities. RERA approved. Book site visit now!",
  keywords: [
    "Godrej Reserve",
    "Kandivali East apartments",
    "3 BHK flats Mumbai",
    "4 BHK flats Mumbai",
    "luxury apartments Mumbai",
    "Godrej Properties",
    "premium residences Kandivali",
    "RERA approved flats",
    "Mumbai real estate",
    "Kandivali real estate",
    "luxury homes Mumbai",
    "new projects Kandivali East"
  ],
  authors: [{ name: "Godrej Properties" }],
  creator: "Godrej Properties",
  publisher: "Godrej Properties",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://godrejreserve.com'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'verification_token', // Replace with actual Google Search Console verification token
    // yandex: 'verification_token',
    // bing: 'verification_token',
  },
  openGraph: {
    title: "Godrej Reserve Kandivali East | Luxury 3 & 4 BHK Flats Mumbai",
    description: "Premium 3 & 4 BHK luxury apartments starting ₹3.75Cr*. 18.6 acres with world-class amenities in Kandivali East, Mumbai. RERA approved.",
    url: 'https://godrejreserve.com',
    siteName: 'Godrej Reserve',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Godrej Reserve - Luxury Apartments in Kandivali East Mumbai',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Godrej Reserve Kandivali East | Luxury Flats Mumbai",
    description: "Premium 3 & 4 BHK apartments starting ₹3.75Cr*. 18.6 acres, world-class amenities. Book site visit!",
    images: ['/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import SiteProtection from "./components/SiteProtection";
import GoogleAnalytics from "./components/GoogleAnalytics";

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body className="min-h-screen bg-white">
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GA_ID}
          gtId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}
        />
        <SiteProtection />
        {children}
      </body>
    </html>
  );
}
