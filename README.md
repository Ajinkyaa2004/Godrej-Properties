<div align="center">

# 🏡 Godrej Reserve - Premium Real Estate Platform

### *Transform Property Exploration Into Dream Home Acquisition*

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](#)

[🚀 Live Demo](#) • [📖 Documentation](#documentation) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

<!-- 
  Uncomment and add your banner image here:
  ![Godrej Reserve Banner](public/banner.png)
-->

</div>

---

## 📋 Overview

**Godrej Reserve** is a high-performance, luxury real estate platform for showcasing premium 3 & 4 BHK apartments in Kandivali East, Mumbai. Built with Next.js 14 and optimized for conversions, this platform delivers seamless lead capture, automated email workflows, content management, and real-time analytics—all wrapped in a stunning, responsive UI.

### 🎯 Why This Platform?

| Feature | Description |
|---------|-------------|
| 🎨 **Premium UX/UI** | Luxury-focused design with gold gradients, glassmorphism effects, and smooth animations |
| ⚡ **Lightning Fast** | Optimized images (WebP/AVIF), lazy loading, and performance monitoring |  
| 📊 **Analytics-Driven** | Google Analytics 4 integration with custom event tracking and conversion metrics |
| 🔐 **Secure & Scalable** | MongoDB Atlas integration with environment-based configuration |
| 📧 **Automated Workflows** | Gmail SMTP OAuth2 for instant lead notifications and confirmations |
| 📱 **Mobile-First** | Fully responsive across all devices with optimized touch interactions |

---

## ⚡ Quick Start

```bash
# Clone and install
git clone <repository-url>
cd godrej-project
npm install

# Configure environment (see Installation section)
cp .env.example .env.local

# Run development server
npm run dev
```

🌐 Open [http://localhost:3000](http://localhost:3000) to view the application.

📚 For detailed setup, see [Installation](#installation) and [Environment Setup](env-setup.md).

---

## 🎥 Demo

<!-- 
  Add your live demo link here:
  **Live Site:** [https://godrejreserve.com](https://godrejreserve.com)
-->

<details>
<summary>📸 Click to view screenshots</summary>

```
<!-- Add screenshots here:
![Homepage Hero](docs/screenshots/hero.png)
![Gallery Page](docs/screenshots/gallery.png)
![Blog Section](docs/screenshots/blog.png)
![Contact Form](docs/screenshots/contact.png)
-->
```

</details>

---

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Support](#support)

---

## ✨ Features

| 🏠 **Core Platform** | 📝 **Content Management** |
|----------------------|---------------------------|
| ✅ **Premium Landing Page**<br/>• Hero section with luxury design<br/>• Property highlights & pricing<br/>• Amenities showcase<br/>• Location & connectivity<br/>• Floor plans display | ✅ **Blog System**<br/>• Dynamic routing with slugs<br/>• Category filtering<br/>• Featured posts<br/>• SEO-optimized articles<br/>• Newsletter subscription |
| ✅ **Lead Capture System**<br/>• Contact form with validation<br/>• Schedule visit booking<br/>• Real-time form submissions<br/>• Success confirmations<br/>• MongoDB storage | ✅ **Gallery Module**<br/>• Pinterest-style masonry layout<br/>• 32+ media items<br/>• Category filtering (7 categories)<br/>• Full-screen lightbox<br/>• Video support |
| ✅ **Email Automation**<br/>• Gmail SMTP OAuth2<br/>• Instant lead notifications<br/>• Visit confirmations<br/>• Custom email templates<br/>• Graceful fallbacks | ✅ **Analytics & Tracking**<br/>• Google Analytics 4<br/>• Custom event tracking<br/>• Conversion monitoring<br/>• Google Sheets sync<br/>• Performance metrics |

### 🔧 Technical Features

- 🚀 **Performance Optimized**: WebP/AVIF images, lazy loading, code splitting
- 🎨 **Glassmorphism UI**: Premium gold gradients, smooth animations, luxury fonts
- 📱 **Fully Responsive**: Mobile-first design with optimized touch interactions
- 🔍 **SEO Ready**: Meta tags, Open Graph, sitemap.xml, robots.txt
- 🛡️ **Security**: Environment variables, CORS protection, input validation
- ⚡ **Real-time Updates**: Instant form submissions with loading states

---

## 🛠️ Tech Stack

### Core Technologies

![Next.js](https://img.shields.io/badge/Next.js-14.0-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

<details>
<summary>📦 Complete Technology Breakdown</summary>

### **Frontend**
- **Framework**: Next.js 14 (App Router, Server Components, Image Optimization)
- **UI Library**: React 18 (Hooks, Context, Custom Components)
- **Styling**: Tailwind CSS 3.3 + Custom Plugins (@tailwindcss/forms, @tailwindcss/typography)
- **Fonts**: Google Fonts (Inter, Cormorant Garamond)
- **Animations**: CSS Transitions, Keyframes, Hover Effects
- **Icons**: Custom SVG icons, Emoji decorations

### **Backend**
- **Runtime**: Node.js 20+
- **API**: Next.js API Routes (RESTful endpoints)
- **Email Service**: Nodemailer with Gmail SMTP OAuth2
- **HTTP Client**: Axios for external API calls
- **Environment**: dotenv for configuration management

### **Database**
- **Primary DB**: MongoDB Atlas (Cloud)
- **Driver**: Official MongoDB Node.js Driver 7.0
- **Collections**: contacts, visits, blog_posts
- **Features**: Connection pooling, error handling

### **DevOps & Deployment**
- **Hosting**: Vercel (Serverless, Edge Network)
- **CI/CD**: Automatic deployments from Git
- **Performance**: Image optimization, compression, caching
- **Monitoring**: Vercel Analytics, Google Analytics 4

### **Development Tools**
- **Build Tool**: SWC (Super-fast JavaScript/TypeScript compiler)
- **CSS Processing**: PostCSS, Autoprefixer
- **Code Quality**: ES6+, Modern JavaScript patterns
- **Version Control**: Git

</details>

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Client Browser] -->|HTTPS| B[Vercel Edge Network]
    B --> C[Next.js App]
    C --> D[Server Components]
    C --> E[Client Components]
    C --> F[API Routes]
    
    F --> G[MongoDB Atlas]
    F --> H[Gmail SMTP]
    F --> I[Google Sheets API]
    
    E --> J[Google Analytics]
    
    D --> K[Static Generation]
    D --> L[Dynamic Rendering]
    
    style A fill:#61dafb
    style C fill:#000000
    style G fill:#47A248
    style J fill:#E37400
```

### Design Patterns

| Pattern | Implementation | Purpose |
|---------|----------------|---------|
| **Server Components** | Default in App Router | Reduce client-side JavaScript |
| **API Route Handlers** | `/app/api/**/route.js` | Serverless backend endpoints |
| **Component Composition** | Reusable UI components | Maintainable, modular code |
| **Custom Hooks** | `useScrollTrigger` | Encapsulate stateful logic |
| **Environment Config** | `.env.local` variables | Secure, environment-specific settings |
| **Error Boundaries** | Graceful degradation | Handle failures without crashes |

---

## 📥 Installation

### Prerequisites

Before you begin, ensure you have:
- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB Atlas** account ([Sign up](https://www.mongodb.com/cloud/atlas))
- **Gmail** account with App Password or OAuth2 credentials
- **Google Analytics** account (optional, for tracking)

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd godrej-project
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/godrej_reserve?retryWrites=true&w=majority

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Godrej Reserve <noreply@godrejreserve.com>

# Google Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Sheets Integration (Optional)
GOOGLE_SHEETS_PRIVATE_KEY=your-private-key
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_SHEET_ID=your-sheet-id

# Application Settings
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

<details>
<summary>🔐 How to get Gmail App Password</summary>

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Select **Mail** and **Other (Custom name)**
5. Generate password and copy to `EMAIL_PASS`

</details>

<details>
<summary>🗄️ MongoDB Atlas Setup</summary>

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier available)
3. Go to **Database Access** → Add new user
4. Go to **Network Access** → Add IP Address (0.0.0.0/0 for all)
5. Click **Connect** → **Connect your application**
6. Copy connection string to `MONGODB_URI`

See [MONGODB_ATLAS_SETUP.md](MONGODB_ATLAS_SETUP.md) for detailed guide.

</details>

<details>
<summary>⚠️ Common Installation Issues</summary>

**Issue**: `Module not found` errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: MongoDB connection fails
```bash
# Solution: Check network access and credentials
# Verify MONGODB_URI format and IP whitelist
```

**Issue**: Email sending fails
```bash
# Solution: Verify Gmail settings
# Ensure 2FA is enabled and App Password is correct
```

</details>

### 4️⃣ Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### 5️⃣ Build for Production

```bash
npm run build
npm start
```

---

## 💡 Usage

### Application Workflow

```mermaid
graph LR
    A[Visitor Lands] --> B{Browse Content}
    B --> C[View Properties]
    B --> D[Read Blogs]
    B --> E[Explore Gallery]
    
    C --> F{Interested?}
    F -->|Yes| G[Fill Contact Form]
    F -->|Yes| H[Schedule Visit]
    
    G --> I[Submit Lead]
    H --> I
    
    I --> J[MongoDB Storage]
    I --> K[Email Confirmation]
    I --> L[Google Sheets Sync]
    
    K --> M[Admin Notification]
    L --> N[CRM Update]
    
    style I fill:#47A248
    style K fill:#EA4335
    style L fill:#34A853
```

### 1️⃣ Explore Properties

Navigate to the homepage to view:
- **Hero Section**: Primary property showcase with CTA
- **Amenities**: 20+ world-class facilities
- **Floor Plans**: Detailed 3 BHK & 4 BHK layouts
- **Location**: Interactive map and connectivity details

### 2️⃣ Capture Leads

**Contact Form** (`/`)
- Collects: Name, Email, Phone, Message
- Validation: Real-time input validation
- Response: Instant email confirmation
- Storage: MongoDB + Google Sheets

**Schedule Visit** (`/`)
- Additional Field: Preferred date/time
- Auto-emails: Confirmation with visit details
- Tracking: Visit scheduling analytics

### 3️⃣ Content Exploration

**Blog** (`/blogs`)
- Dynamic articles about lifestyle, investment, architecture
- Category filtering for easy navigation
- SEO-optimized with meta tags

**Gallery** (`/gallery`)
- Browse 32+ high-quality images and videos
- Filter by: Interior, Exterior, Amenities, Virtual Tour, etc.
- Full-screen lightbox with keyboard navigation

### Configuration Parameters

| Parameter | Environment Variable | Default | Description |
|-----------|---------------------|---------|-------------|
| MongoDB URI | `MONGODB_URI` | Required | Database connection string |
| Email User | `EMAIL_USER` | Required | Gmail account for sending |
| Email Password | `EMAIL_PASS` | Required | Gmail App Password |
| GA Tracking ID | `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 ID |
| Site URL | `NEXT_PUBLIC_SITE_URL` | `localhost:3000` | Base URL for links |

<details>
<summary>🔧 Advanced Configuration</summary>

### Custom Email Templates

Edit email templates in API routes:
- [Contact Email](app/api/contact/route.js)
- [Visit Email](app/api/schedule-visit/route.js)

### Analytics Events

Configure custom events in [utils/analytics.js](app/utils/analytics.js):
```javascript
// Track custom actions
trackEvent(GA_CATEGORIES.ENGAGEMENT, GA_EVENTS.SECTION_VIEW, 'Amenities', 1);
```

### Image Optimization

Adjust settings in [next.config.js](next.config.js):
```javascript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
}
```

</details>

---

## 📂 Project Structure

```
godrej-project/
│
├── app/                          # Next.js 14 App Router
│   ├── layout.js                 # Root layout with metadata
│   ├── page.js                   # Homepage (main landing page)
│   ├── globals.css               # Global styles & Tailwind imports
│   ├── robots.js                 # Dynamic robots.txt generation
│   ├── sitemap.js                # Dynamic XML sitemap
│   │
│   ├── api/                      # Backend API routes
│   │   ├── contact/              
│   │   │   ├── route.js          # Contact form submission handler
│   │   │   └── check/route.js    # Contact verification endpoint
│   │   ├── getContacts/route.js  # Fetch all contacts from DB
│   │   ├── getVisits/route.js    # Fetch scheduled visits
│   │   └── schedule-visit/       
│   │       └── route.js          # Visit scheduling handler
│   │
│   ├── blogs/                    # Blog module
│   │   ├── layout.js             # Blog-specific layout
│   │   ├── page.js               # Blog listing page
│   │   └── [slug]/               # Dynamic blog post routing
│   │       └── page.js           # Individual blog post page
│   │
│   ├── gallery/                  # Gallery module
│   │   ├── layout.js             # Gallery layout
│   │   └── page.js               # Pinterest-style image grid
│   │
│   ├── components/               # Reusable React components
│   │   ├── BlogNavbar.js         # Blog navigation component
│   │   ├── ContactForm.js        # Lead capture form
│   │   ├── Footer.js             # Site-wide footer
│   │   ├── GoogleAnalytics.js    # GA4 integration component
│   │   ├── ImagePreloader.js     # Image optimization utility
│   │   ├── LoadingSpinner.js     # Loading state component
│   │   ├── PerformanceMonitor.js # Performance tracking
│   │   ├── ScheduleVisitForm.js  # Visit booking form
│   │   └── SiteProtection.js     # Security features
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useScrollTrigger.js   # Scroll-based animations
│   │
│   └── utils/                    # Utility functions
│       ├── analytics.js          # GA4 event tracking helpers
│       ├── debounce.js           # Performance optimization
│       └── performance.js        # Performance monitoring utils
│
├── lib/                          # External service integrations
│   └── mongodb.js                # MongoDB connection handler
│
├── public/                       # Static assets
│   ├── manifest.json             # PWA manifest
│   ├── robots.txt                # Search engine directives
│   ├── amenities/                # Amenity images
│   ├── Creative For post ads and etc/  # Marketing assets
│   └── videos/                   # Video content
│
├── scripts/                      # Utility scripts
│
├── .env.local                    # Environment variables (not in repo)
├── .gitignore                    # Git ignore rules
├── jsconfig.json                 # JavaScript config for path aliases
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── vercel.json                   # Vercel deployment config
│
├── contacts.json                 # Sample contact data
├── schedule-visits.json          # Sample visit data
├── test-mongodb.js               # DB connection test script
├── fix-vercel-env.sh             # Environment fix script
├── update-mongodb-uri.sh         # MongoDB URI update script
│
└── Documentation/                # Comprehensive guides
    ├── ANALYTICS_QUICK_REFERENCE.md
    ├── BLOGS_FEATURE.md
    ├── DEPLOYMENT_QUICK_REF.md
    ├── GALLERY_FEATURES.md
    ├── GMAIL_SETUP_GUIDE.md
    ├── GOOGLE_ANALYTICS_SETUP.md
    ├── GOOGLE_SHEETS_SYNC_GUIDE.md
    ├── IMAGE_OPTIMIZATION_GUIDE.md
    ├── MONGODB_ATLAS_SETUP.md
    ├── PERFORMANCE_OPTIMIZATIONS.md
    ├── REAL_ESTATE_ANALYTICS_GUIDE.md
    └── VERCEL_DEPLOYMENT_GUIDE.md
```

---

## 📡 API Documentation

### Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

### Endpoints

#### 🔹 Contact Management

**POST** `/api/contact`

Submit a contact form inquiry.

```json
// Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "message": "Interested in 3 BHK apartment"
}

// Response (200 OK)
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": "65a1b2c3d4e5f6g7h8i9j0",
    "timestamp": "2026-02-16T10:30:00Z"
  }
}
```

**GET** `/api/getContacts`

Retrieve all contact submissions (admin use).

```json
// Response
{
  "success": true,
  "contacts": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 9876543210",
      "message": "Interested in 3 BHK",
      "createdAt": "2026-02-16T10:30:00Z"
    }
  ],
  "count": 1
}
```

#### 🔹 Visit Scheduling

**POST** `/api/schedule-visit`

Schedule a property site visit.

```json
// Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "preferredDate": "2026-02-20",
  "preferredTime": "14:00"
}

// Response (200 OK)
{
  "success": true,
  "message": "Visit scheduled successfully",
  "visitId": "65a1b2c3d4e5f6g7h8i9j0"
}
```

**GET** `/api/getVisits`

Retrieve all scheduled visits.

### Authentication

Currently, API routes are public for lead generation. For production admin endpoints, implement authentication:

```javascript
// Example: Add to API route
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  const token = request.headers.get('authorization');
  if (!verifyToken(token)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ... rest of handler
}
```

### Rate Limiting

Implement rate limiting for production:
- Contact form: 5 requests per IP per hour
- Visit scheduling: 3 requests per IP per day

See [Vercel Edge Config](https://vercel.com/docs/storage/edge-config) for implementation.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1️⃣ **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2️⃣ **Connect to Vercel**
- Visit [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure environment variables (see below)

3️⃣ **Environment Variables**

Add these in Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI
EMAIL_USER
EMAIL_PASS
EMAIL_FROM
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_SITE_URL
GOOGLE_SHEETS_PRIVATE_KEY
GOOGLE_SHEETS_CLIENT_EMAIL
GOOGLE_SHEETS_SHEET_ID
```

4️⃣ **Deploy**
- Click "Deploy"
- Wait for build completion
- Your site is live! 🎉

### Alternative Deployment Options

- 🐳 **Docker**: See [Dockerfile](Dockerfile) (if you create one)
- ☁️ **AWS**: Use Amplify or EC2 with Node.js
- 🌊 **Netlify**: Configure for Next.js in `netlify.toml`
- 🔷 **DigitalOcean**: App Platform with Node.js

### Detailed Guides

- [📘 Vercel Deployment Guide](VERCEL_DEPLOYMENT_GUIDE.md)
- [🔧 Environment Setup](env-setup.md)
- [📊 Analytics Setup](GOOGLE_ANALYTICS_SETUP.md)
- [📧 Gmail Configuration](GMAIL_SETUP_GUIDE.md)

---

## 🧪 Testing

### Run Tests

```bash
# Test MongoDB connection
node test-mongodb.js

# Check API endpoints
curl http://localhost:3000/api/contact/check
```

### Manual Testing Checklist

- [ ] Homepage loads without errors
- [ ] Contact form submits successfully
- [ ] Email confirmations are sent
- [ ] Visit scheduling works
- [ ] Gallery filters function correctly
- [ ] Blog posts render properly
- [ ] Mobile responsive on all pages
- [ ] Analytics tracking fires
- [ ] Images lazy load
- [ ] Forms validate inputs

### Performance Testing

Monitor performance with built-in tools:

```javascript
// Performance monitoring is active in production
// Check app/components/PerformanceMonitor.js
```

View metrics:
- **Vercel Analytics**: Dashboard → Analytics tab
- **Google Analytics**: Real-time performance data
- **Lighthouse**: Run in Chrome DevTools

---

## 📚 Documentation

Comprehensive guides available in the root directory:

- [📊 Analytics Quick Reference](ANALYTICS_QUICK_REFERENCE.md)
- [✍️ Blogs Feature Guide](BLOGS_FEATURE.md)
- [🚀 Deployment Quick Reference](DEPLOYMENT_QUICK_REF.md)
- [🖼️ Gallery Features](GALLERY_FEATURES.md)
- [📧 Gmail Setup Guide](GMAIL_SETUP_GUIDE.md)
- [📈 Google Analytics Setup](GOOGLE_ANALYTICS_SETUP.md)
- [📊 Google Sheets Sync Guide](GOOGLE_SHEETS_SYNC_GUIDE.md)
- [🖼️ Image Optimization Guide](IMAGE_OPTIMIZATION_GUIDE.md)
- [🗄️ MongoDB Atlas Setup](MONGODB_ATLAS_SETUP.md)
- [⚡ Performance Optimizations](PERFORMANCE_OPTIMIZATIONS.md)
- [🏠 Real Estate Analytics Guide](REAL_ESTATE_ANALYTICS_GUIDE.md)
- [☁️ Vercel Deployment Guide](VERCEL_DEPLOYMENT_GUIDE.md)

---

## 🗺️ Roadmap

### ✅ Completed

- [x] Premium landing page with luxury UI
- [x] Contact and visit scheduling forms
- [x] Email automation with Gmail SMTP
- [x] MongoDB integration for lead storage
- [x] Blog system with dynamic routing
- [x] Pinterest-style gallery with lightbox
- [x] Google Analytics 4 integration
- [x] Google Sheets sync for CRM
- [x] Performance optimizations (WebP, lazy loading)
- [x] SEO optimization (meta tags, sitemap, robots.txt)
- [x] Vercel deployment with CI/CD
- [x] Comprehensive documentation

### 🚧 In Progress

- [ ] Admin dashboard for lead management
- [ ] WhatsApp API integration for instant notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (English/Hindi/Marathi)

### 📅 Planned

- [ ] **Q2 2026**
  - [ ] Virtual 360° property tours
  - [ ] Live chat support
  - [ ] Payment gateway integration
  - [ ] Customer portal for booking tracking
  
- [ ] **Q3 2026**
  - [ ] Mobile app (React Native)
  - [ ] AI-powered chatbot
  - [ ] Mortgage calculator
  - [ ] Document upload system

- [ ] **Q4 2026**
  - [ ] Video testimonials section
  - [ ] Neighborhood insights
  - [ ] Comparison tool for units
  - [ ] Referral program

💡 **Have a Feature Request?** [Open an issue](../../issues) with the label `enhancement`.

---

## 🤝 Contributing

<div align="center">

![Contributors](https://img.shields.io/github/contributors/yourusername/godrej-project?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/yourusername/godrej-project?style=for-the-badge)
![Pull Requests](https://img.shields.io/github/issues-pr/yourusername/godrej-project?style=for-the-badge)

</div>

We welcome contributions! Here's how you can help:

### How to Contribute

1️⃣ **Fork the repository**

2️⃣ **Create a feature branch**
```bash
git checkout -b feature/AmazingFeature
```

3️⃣ **Make your changes**
```bash
git add .
git commit -m "Add some AmazingFeature"
```

4️⃣ **Push to your branch**
```bash
git push origin feature/AmazingFeature
```

5️⃣ **Open a Pull Request**
- Describe your changes
- Reference related issues
- Wait for review

### Contribution Guidelines

| Do ✅ | Don't ❌ |
|-------|----------|
| Follow existing code style | Submit untested code |
| Write clear commit messages | Mix multiple features in one PR |
| Update documentation | Break existing functionality |
| Add comments for complex logic | Include personal/sensitive data |
| Test on multiple devices | Ignore linting errors |

### Development Setup

```bash
# Fork and clone your fork
git clone https://github.com/yourusername/godrej-project.git
cd godrej-project

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/my-new-feature

# Start development
npm run dev

# Make changes and test
# ... code ...

# Commit and push
git add .
git commit -m "feat: add my new feature"
git push origin feature/my-new-feature
```

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

---

## 💬 Support

- 📖 **Documentation**: Check the [Documentation](#documentation) section
- 🐛 **Bug Reports**: [Open an issue](../../issues/new?template=bug_report.md)
- ✨ **Feature Requests**: [Open an issue](../../issues/new?template=feature_request.md)

---

<div align="center">

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Made with ❤️ by [Ajinkya Dhumal](https://itsajinkya.vercel.app)

🔗 [LinkedIn](https://www.linkedin.com/in/ajinkya842004/) • 📧 [Email](mailto:dhumalajinkya2004@gmail.com) • 🌐 [Portfolio](https://itsajinkya.vercel.app)

**Synergy Three** - *Building Digital Excellence*

---

⭐ **If you find this project helpful, please give it a star!** ⭐

</div>



