export const metadata = {
  title: "Photo Gallery - Godrej Reserve Kandivali East | 3 & 4 BHK Interior & Amenities Images",
  description: "Browse premium photos of Godrej Reserve luxury apartments - interiors, exteriors, amenities, clubhouse, pool, gym. View 3 BHK & 4 BHK configurations in Kandivali East Mumbai.",
  openGraph: {
    title: "Photo Gallery - Godrej Reserve Kandivali East",
    description: "Browse premium photos of Godrej Reserve - luxury 3 & 4 BHK apartments with world-class amenities in Kandivali East, Mumbai.",
    url: 'https://godrejreserve.com/gallery',
    images: [
      {
        url: '/image1.jpg',
        width: 1200,
        height: 630,
        alt: 'Godrej Reserve Gallery - Luxury Apartment Interiors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Photo Gallery - Godrej Reserve",
    description: "Premium photos of luxury 3 & 4 BHK apartments with world-class amenities.",
    images: ['/image1.jpg'],
  },
};

export default function GalleryLayout({ children }) {
  return children;
}
