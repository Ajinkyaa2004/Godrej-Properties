import { Inter } from 'next/font/google';
import Footer from '../components/Footer';
import BlogNavbar from '../components/BlogNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Blogs - Godrej Reserve | Luxury Living Insights & Updates',
    description: 'Explore insights on luxury living, real estate investment, and updates from Godrej Reserve - Mumbai\'s premier residential destination in Kandivali East.',
    keywords: 'Godrej Reserve blogs, luxury living, Mumbai real estate, property investment, Kandivali East, premium apartments',
    openGraph: {
        title: 'Blogs - Godrej Reserve',
        description: 'Discover stories of luxury, insights on investment, and updates from Mumbai\'s most prestigious residential address',
        images: ['/hero.png'],
    },
};

export default function BlogsLayout({ children }) {
    return (
        <>
            <BlogNavbar />
            {children}
            <Footer />
        </>
    );
}
