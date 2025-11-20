// Generate dynamic robots.txt for SEO
export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
        ],
        sitemap: 'https://godrejreserve.com/sitemap.xml',
        host: 'https://godrejreserve.com',
    };
}
