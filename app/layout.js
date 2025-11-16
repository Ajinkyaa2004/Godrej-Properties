import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Godrej Reserve Kandivali East | Luxury 3 & 4 BHK Flats ₹3.75Cr* | Premium Residences Mumbai",
  description: "Discover Godrej Reserve - Premium 3 & 4 BHK luxury apartments in Kandivali East, Mumbai. Starting ₹3.75Cr*. 18.6 acres, 6 towers, world-class amenities. RERA approved. Book site visit now!",
  keywords: "Godrej Reserve, Kandivali East flats, luxury apartments Mumbai, 3 BHK Kandivali, 4 BHK Mumbai, Godrej Properties, premium residences, RERA approved flats, Mumbai real estate",
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
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
