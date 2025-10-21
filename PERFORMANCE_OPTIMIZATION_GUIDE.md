# Tecnoesis 2025 - Performance Optimization Guide

## 🎯 Executive Summary

This document outlines comprehensive optimization strategies for the Tecnoesis 2025 website, including prerendering, code splitting, caching, and performance best practices.

---

## 📊 Current Status Analysis

### ✅ Already Optimized
- ✓ Dynamic imports for heavy components (robotron page)
- ✓ React.memo for complex components
- ✓ SWC minification enabled
- ✓ Console removal in production
- ✓ Image optimization configured
- ✓ Lazy loading for non-critical sections

### ⚠️ Needs Optimization
- Landing page (page.tsx) - Client-side heavy
- Gallery page - All client-side rendering
- Team page - No dynamic imports
- Home page - Multiple heavy components
- Global BGM implementation
- Missing metadata for SEO

---

## 🚀 Recommended Optimizations

### 1. **Root Layout Optimizations** (`src/app/layout.tsx`)

#### Add Static Metadata
```tsx
export const metadata: Metadata = {
  title: "Tecnoesis 2025 | NIT Silchar's Premier Technical Fest",
  description: "Join us at Tecnoesis 2025, the annual technical festival of NIT Silchar featuring robotics, coding competitions, workshops, and much more.",
  keywords: ["Tecnoesis", "NIT Silchar", "Technical Fest", "Robotics", "Coding", "Engineering"],
  authors: [{ name: "GDSC NIT Silchar" }],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Tecnoesis 2025",
    description: "The Official Website of Tecnoesis 2025",
    url: "https://tecnoesis25.pages.dev/",
    siteName: "Tecnoesis 2025",
    images: [{
      url: "https://tecnoesis25.pages.dev/tecnoesis25.png",
      width: 300,
      height: 300,
      alt: "Tecnoesis 2025 Logo",
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tecnoesis 2025",
    description: "NIT Silchar's Premier Technical Festival",
    images: ["https://tecnoesis25.pages.dev/tecnoesis25.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
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
```

#### Optimize Font Loading
```tsx
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap", // ADD THIS - prevents FOIT (Flash of Invisible Text)
  preload: true,
  fallback: ["system-ui", "arial"],
});
```

---

### 2. **Landing Page** (`src/app/page.tsx`)

#### Current Issues:
- Entire page is client-side rendered
- Heavy 3D Model loads immediately
- Multiple state management for animations

#### Optimization Strategy:

```tsx
// Add metadata export for SEO
export const metadata = {
  title: "Tecnoesis 2025 | Welcome",
  description: "Experience the future of technology at Tecnoesis 2025",
};

// Split into smaller components with dynamic imports
const Model = dynamic(() => import("~/components/Model"), {
  loading: () => <div className="h-screen w-screen bg-black" />,
  ssr: false, // 3D models don't need SSR
});

const Countdown = dynamic(() => import("~/components/Countdown"), {
  loading: () => <div className="animate-pulse">Loading...</div>,
  ssr: false,
});

const Tecnoesis = dynamic(() => import("~/components/Tecno"), {
  ssr: false,
});

// Preload critical assets
export const viewport = {
  themeColor: '#000000',
};
```

#### Add Resource Hints:
```tsx
// In layout.tsx <head>
<link rel="preconnect" href="https://d3f6voaditlmqg.cloudfront.net" />
<link rel="dns-prefetch" href="https://d3f6voaditlmqg.cloudfront.net" />
<link rel="preconnect" href="https://res.cloudinary.com" />
<link rel="dns-prefetch" href="https://res.cloudinary.com" />
```

---

### 3. **Home Page** (`src/app/(main)/home/page.tsx`)

#### Current Issues:
- All components lazy loaded but could be optimized further
- No metadata
- Multiple heavy components loading sequentially

#### Optimizations:

```tsx
// Add metadata
export const metadata = {
  title: "Home | Tecnoesis 2025",
  description: "Explore events, modules, gallery and sponsors of Tecnoesis 2025",
};

// Optimize dynamic imports with priority loading
const Landing = dynamic(() => import("~/components/Home/Landing"), {
  loading: () => <div className="h-screen w-screen bg-black" />,
});

const About = dynamic(() => import("~/components/About"), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-black animate-pulse" />,
});

// Use Intersection Observer to load components when they come into view
const SnakeMatrix = dynamic(() => import("~/components/SnakeMatrix"), {
  ssr: false,
  loading: () => null,
});

const Modules = dynamic(() => import("~/components/Home/Modules"), {
  ssr: false,
  loading: () => null,
});

const Gallery = dynamic(() => import("~/components/gallery"), {
  ssr: false,
  loading: () => null,
});

const RobotronHero = dynamic(() => import("~/components/RobotronHero"), {
  ssr: false,
  loading: () => null,
});

const PreviousSponsors = dynamic(() => import("~/components/PreviousSponsors"), {
  ssr: false,
  loading: () => null,
});

const Footer = dynamic(() => import("~/components/footer"), {
  ssr: false,
  loading: () => null,
});
```

---

### 4. **Gallery Page** (`src/app/(main)/gallery/page.tsx`)

#### Current Issues:
- Massive file (~600+ lines)
- All client-side rendering
- Heavy animations and effects
- No code splitting

#### Optimizations:

```tsx
// Add metadata
export const metadata = {
  title: "Photo Gallery | Tecnoesis 2025",
  description: "Explore moments captured at Tecnoesis events over the years",
};

// Split components into separate files
const GalleryAnimation = dynamic(() => import("~/components/GalleryAnimation"), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-black" />,
});

const EventCard = dynamic(() => import("~/components/gallery/EventCard"), {
  ssr: false,
});

const MobileEventCard = dynamic(() => import("~/components/gallery/MobileEventCard"), {
  ssr: false,
});

const CustomScrollbar = dynamic(() => import("~/components/gallery/CustomScrollbar"), {
  ssr: false,
});

// Optimize event data loading
export const dynamic = 'force-static'; // Pre-render at build time
export const revalidate = 3600; // Revalidate every hour

// Lazy load images
import Image from "next/image";

<Image
  src={event.imageUrl}
  alt={event.name}
  width={1200}
  height={1200}
  loading="lazy" // ADD THIS
  placeholder="blur" // ADD THIS
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Generate blur placeholder
  className="rounded-lg border border-gray-800"
/>
```

---

### 5. **Team Page** (`src/app/(main)/team/page.tsx`)

#### Current Issues:
- Client-side only
- Loading JSON directly in component
- No optimization for images

#### Optimizations:

```tsx
// Add metadata
export const metadata = {
  title: "Our Team | Tecnoesis 2025",
  description: "Meet the organizing committee and team members of Tecnoesis 2025",
};

// Server Component for data loading
import { Suspense } from 'react';

// Move team data loading to server
async function getTeamData() {
  const techData = await import("../../../../data/tech.json");
  const coreData = await import("../../../../data/core.json");
  
  return {
    tech: techData.default,
    core: coreData.default,
  };
}

// Main component as Server Component
export default async function TeamPage() {
  const teamData = await getTeamData();
  
  return (
    <Suspense fallback={<TeamPageSkeleton />}>
      <TeamContent teamData={teamData} />
    </Suspense>
  );
}

// Client component for interactive parts only
"use client";
function TeamContent({ teamData }) {
  const [selectedTeam, setSelectedTeam] = useState("Tech Team");
  // ... rest of the logic
}
```

---

### 6. **Robotron Page** (Already Good! 🎉)

The robotron page is already well-optimized with:
- ✓ Dynamic imports
- ✓ Loading skeletons
- ✓ Suspense boundaries
- ✓ SSR disabled for heavy components

**Minor improvements:**
```tsx
// Add metadata
export const metadata = {
  title: "Robotron | Tecnoesis 2025",
  description: "Explore Robotron - The flagship robotics competition at Tecnoesis 2025",
};

// Add revalidation
export const revalidate = 3600;
```

---

## 🔧 Component-Level Optimizations

### **Images**

#### Current:
```tsx
<Image src="/image.png" width={600} height={600} />
```

#### Optimized:
```tsx
<Image
  src="/image.png"
  width={600}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL="..." // Generate with plaiceholder or sharp
  quality={75} // Reduce for non-critical images
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Descriptive alt text"
/>
```

### **Fonts**

Create a font loader file: `src/lib/fonts.ts`
```tsx
import { Orbitron } from "next/font/google";
import localFont from "next/font/local";

export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const nyxerin = localFont({
  src: "../public/fonts/nyxerin.woff2", // Convert to woff2 for better compression
  variable: "--font-nyxerin",
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});
```

### **BGM (Background Music)**

Create optimized hook: `src/hooks/useOptimizedBgm.ts`
```tsx
import { useEffect, useRef, useState } from "react";

export function useOptimizedBgm(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    // Only initialize on user interaction
    audioRef.current = document.getElementById("bgm-audio") as HTMLAudioElement;
    
    // Preload only on fast connections
    if (audioRef.current && 'connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn && conn.effectiveType === '4g') {
        audioRef.current.preload = 'auto';
      }
    }
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return { isPlaying, toggle };
}
```

---

## 📦 next.config.js Enhancements

```javascript
/** @type {import("next").NextConfig} */
const config = {
  // ... existing config
  
  // Add static optimization
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "gsap",
      "react-slick",
      "react-icons",
      "@react-three/fiber",
      "@react-three/drei",
    ],
    
    // Enable Turbopack for faster dev builds (Next.js 14+)
    // turbo: {},
  },
  
  // Optimize bundle
  webpack: (config, { dev, isServer }) => {
    // Optimize production builds
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];
              return `npm.${packageName?.replace('@', '')}`;
            },
            priority: 10,
          },
        },
      };
    }
    return config;
  },
  
  // Enable compression
  compress: true,
  
  // Generate standalone output for smaller deploys
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
  
  // Optimize images further
  images: {
    // ... existing config
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default config;
```

---

## 🎨 CSS Optimizations

### 1. Extract Critical CSS
Create `src/styles/critical.css` for above-the-fold styles:
```css
/* Critical styles that should load first */
@layer critical {
  body {
    margin: 0;
    padding: 0;
    background: #000;
    color: #fff;
  }
  
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
}
```

### 2. Use CSS Containment
```css
.team-card {
  contain: layout style paint;
}

.gallery-section {
  contain: layout;
}
```

### 3. Optimize Animations
```css
/* Use will-change sparingly */
.animated-element {
  will-change: transform;
}

.animated-element:not(:hover) {
  will-change: auto;
}

/* Use transform instead of position */
/* Bad */
.slide-in {
  left: -100px;
  transition: left 0.3s;
}

/* Good */
.slide-in {
  transform: translateX(-100px);
  transition: transform 0.3s;
}
```

---

## 📱 Progressive Enhancement

### Add Service Worker for Offline Support

Create `public/sw.js`:
```javascript
const CACHE_NAME = 'tecnoesis-v1';
const urlsToCache = [
  '/',
  '/home',
  '/gallery',
  '/team',
  '/robotron',
  '/fonts/nyxerin.woff2',
  '/tecnoesis25.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

Register in `src/app/layout.tsx`:
```tsx
useEffect(() => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js');
  }
}, []);
```

---

## 🏗️ Build & Deployment Optimizations

### 1. **Static Generation Strategy**

Create `src/app/sitemap.ts`:
```tsx
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://tecnoesis25.pages.dev',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://tecnoesis25.pages.dev/home',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://tecnoesis25.pages.dev/gallery',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://tecnoesis25.pages.dev/team',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://tecnoesis25.pages.dev/robotron',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
```

Create `src/app/robots.ts`:
```tsx
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://tecnoesis25.pages.dev/sitemap.xml',
  };
}
```

### 2. **Analyze Bundle Size**

Add to `package.json`:
```json
{
  "scripts": {
    "analyze": "ANALYZE=true next build",
    "build:production": "next build && next-sitemap"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^14.0.0"
  }
}
```

Create `next.config.analyze.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... your config
});
```

---

## 📊 Performance Monitoring

### Add Web Vitals Reporting

Create `src/app/_vitals.tsx`:
```tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
    
    // Send to analytics
    if (process.env.NODE_ENV === 'production') {
      const body = JSON.stringify(metric);
      const url = 'https://example.com/analytics';
      
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body);
      } else {
        fetch(url, { body, method: 'POST', keepalive: true });
      }
    }
  });

  return null;
}
```

Add to root layout:
```tsx
import { WebVitals } from './_vitals';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
```

---

## ✅ Implementation Checklist

### High Priority (Do First)
- [ ] Add metadata to all pages
- [ ] Optimize font loading with display: swap
- [ ] Convert Team page to Server Component
- [ ] Add loading states to all dynamic imports
- [ ] Optimize images with blur placeholders
- [ ] Add resource hints for external domains
- [ ] Split Gallery page into smaller components

### Medium Priority
- [ ] Implement service worker for offline support
- [ ] Add bundle analyzer
- [ ] Optimize BGM loading
- [ ] Add CSS containment
- [ ] Create sitemap and robots.txt
- [ ] Add Web Vitals monitoring

### Low Priority
- [ ] Implement advanced caching strategies
- [ ] Add Progressive Web App features
- [ ] Create performance budget
- [ ] Add prefetching for likely routes
- [ ] Optimize animation performance

---

## 🎯 Expected Performance Gains

### Before Optimization (Estimated):
- **First Contentful Paint (FCP)**: 2.5s
- **Largest Contentful Paint (LCP)**: 4.2s
- **Time to Interactive (TTI)**: 5.8s
- **Total Blocking Time (TBT)**: 850ms
- **Cumulative Layout Shift (CLS)**: 0.15

### After Optimization (Target):
- **First Contentful Paint (FCP)**: 1.2s ⬇️ 52% improvement
- **Largest Contentful Paint (LCP)**: 2.1s ⬇️ 50% improvement
- **Time to Interactive (TTI)**: 3.2s ⬇️ 45% improvement
- **Total Blocking Time (TBT)**: 250ms ⬇️ 71% improvement
- **Cumulative Layout Shift (CLS)**: 0.05 ⬇️ 67% improvement

---

## 📚 Additional Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Image Optimization Best Practices](https://web.dev/fast/#optimize-your-images)

---

**Generated**: $(date)
**Version**: 1.0
**Team**: GDSC NIT Silchar
