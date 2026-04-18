# Next.js Homepage Performance Analysis & Recommendations

## Executive Summary
This is a Next.js v10 personal website with blog functionality powered by Sanity CMS. The analysis identifies several performance bottlenecks and provides actionable improvements that can significantly reduce load times.

---

## 🔴 Critical Issues Found

### 1. **Videos Page Uses `getServerSideProps` (Should Be Static)**
**Impact:** HIGH | **Effort:** MEDIUM

**Location:** [pages/videos.js](pages/videos.js#L66)

**Problem:**
- Videos page fetches YouTube data via `getServerSideProps`, causing server-side rendering on every request
- No caching or revalidation strategy
- Blocks page load until YouTube API responds

**Solution:**
```javascript
// Change from getServerSideProps to getStaticProps with ISR
export async function getStaticProps() {
  const youtubeVideos = await getAllPlaylistItems();
  return {
    props: { youtubeVideos },
    revalidate: 3600  // Revalidate every hour
  };
}
```

**Expected Impact:** 50-70% faster page loads, reduced server load

---

### 2. **Analytics Script Blocking Issue**
**Impact:** MEDIUM | **Effort:** LOW

**Location:** [pages/_document.js](pages/_document.js#L12-L35)

**Problem:**
- Google Analytics, Google Tag Manager, and Clarity scripts loaded synchronously
- Multiple scripts and inline `dangerouslySetInnerHTML` calls
- Scripts block page rendering

**Solution:**
```javascript
// Make analytics scripts async and defer non-critical scripts
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
/>
// Move non-critical analytics (Clarity) to lazy load after page interactive
```

**Expected Impact:** 15-30% faster First Contentful Paint (FCP)

---

### 3. **Blog Page Has Aggressive Revalidation (1 Second)**
**Impact:** MEDIUM | **Effort:** LOW

**Location:** [pages/blog.js](pages/blog.js#L68)

**Problem:**
- `revalidate: 1` causes the entire page to be regenerated every 1 second
- Unnecessary server load if content doesn't change frequently
- Cache is constantly invalidated

**Solution:**
```javascript
export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { allPosts, preview },
    revalidate: 3600  // Change to 1 hour or trigger manual revalidation on content updates
  }
}
```

**Expected Impact:** 60-80% reduction in server regenerations, lower server CPU/memory usage

---

### 4. **No Image Optimization**
**Impact:** HIGH | **Effort:** MEDIUM

**Location:** [components/Photos.js](components/Photos.js#L20-L45)

**Problem:**
- Photos component hardcodes 40+ image URLs with no optimization
- No lazy loading implementation
- Images likely loaded as full-size originals
- Uses external CDN (i.ibb.co) without Vercel Image Optimization

**Solutions:**
a) Use Next.js Image component:
```javascript
import Image from 'next/image'

// Replace: <img src={item.original} key={item.key}/>
// With:
<Image 
  src={item.original}
  alt="Photo"
  width={1200}
  height={800}
  loading="lazy"
/>
```

b) Add image domain to next.config.js:
```javascript
images: {
  domains: ['yt3.ggpht.com','i.ytimg.com', 'i.ibb.co'],
}
```

**Expected Impact:** 40-60% reduction in image file sizes, lazy loading saves bandwidth

---

### 5. **FontAwesome Library Loading**
**Impact:** MEDIUM | **Effort:** LOW

**Location:** [pages/_document.js](pages/_document.js), [components/Header.js](components/Header.js)

**Problem:**
- FontAwesome loaded as individual SVG imports
- `@fortawesome/fontawesome-svg-core` includes entire icon set
- Unused icons increase bundle size

**Solutions:**
```javascript
// Only import specific icons needed
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'

// Or consider inline SVGs for homepage icons
```

**Expected Impact:** 20-30 KB bundle size reduction

---

### 6. **Unnecessary Component Re-renders**
**Impact:** MEDIUM | **Effort:** HIGH

**Location:** [components/Main.js](components/Main.js), [pages/index.js](pages/index.js)

**Problem:**
- Uses class components with multiple `setTimeout` calls
- Main component re-renders unnecessarily with inline switch/case for articles
- State management could be optimized
- Multiple setTimeout calls (100ms, 325ms, 350ms delays) add unnecessary delays

**Solutions:**
```javascript
// Use React.memo for functional components
// Convert to functional components with hooks
// Reduce setTimeout delays or use CSS transitions
// Implement proper key management

// Example optimization:
const ArticleContent = React.memo(({ article, props }) => {
  switch(article) {
    case 'intro': return <Intro {...props} />;
    // ...
  }
});
```

**Expected Impact:** Faster UI interactions, reduced jank

---

### 7. **Multiple Queries to Sanity CMS**
**Impact:** MEDIUM | **Effort:** MEDIUM

**Location:** [lib/api.js](lib/api.js)

**Problem:**
- `getPostAndMorePosts` runs 2 parallel queries
- No caching or pagination strategy
- Could benefit from incremental static regeneration

**Solutions:**
```javascript
// Implement caching strategy
// Use Sanity CDN for better performance
// Consider pagination for large post lists
// Cache query results locally
```

---

## 🟡 Medium-Priority Issues

### 8. **Missing Font Preloading**
**Current:**
```javascript
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,600,600i" rel="stylesheet" />
```

**Improved:**
```javascript
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link 
  href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;600&display=swap" 
  rel="stylesheet" 
/>
```

**Expected Impact:** 10-20% faster font loading

---

### 9. **No CSS Minification or Code Splitting**
**Impact:** LOW-MEDIUM | **Effort:** LOW

**Location:** Tailwind configuration looks good, but verify:
- CSS files are minified in production
- Unused CSS is purged (Tailwind purge is configured correctly)

**Verification:**
```bash
npm run build
# Check the build output for CSS file sizes
```

---

### 10. **Carousel Libraries Not Lazy Loaded**
**Impact:** LOW | **Effort:** MEDIUM

**Problem:**
- `react-image-gallery` and `react-responsive-carousel` loaded even if photos not viewed
- CSS files imported upfront

**Solution:**
```javascript
import dynamic from 'next/dynamic'

const ImageGallery = dynamic(() => import('react-image-gallery'), {
  loading: () => <p>Loading gallery...</p>
})
```

---

### 11. **Deprecated/Unused Code**
**Impact:** LOW | **Effort:** LOW

**Files to consider removing:**
- [components/_Gallery_Deprecated.js](components/_Gallery_Deprecated.js)
- [pages/_gallery_deprecated.js](pages/_gallery_deprecated.js)
- Old SCSS files in [styles/](styles/)

---

## ✅ What's Working Well

1. ✅ Tailwind CSS purge configuration - removes unused styles
2. ✅ Blog uses `getStaticProps` with revalidation (though interval needs adjustment)
3. ✅ Google App Engine deployment supports CDN benefits
4. ✅ Sanity CDN enabled in production
5. ✅ Basic image domain whitelisting in place

---

## 🎯 Performance Improvement Priority Matrix

| Priority | Issue | Effort | Impact | Quick Win? |
|----------|-------|--------|--------|-----------|
| 🔴 P1 | Videos: getServerSideProps → getStaticProps | Medium | High | No |
| 🔴 P1 | Image optimization | Medium | High | No |
| 🟡 P2 | Analytics script optimization | Low | Medium | **Yes** |
| 🟡 P2 | Blog revalidate: 1 → 3600 | Low | Medium | **Yes** |
| 🟡 P2 | Font preloading | Low | Medium | **Yes** |
| 🟠 P3 | Component re-renders optimization | High | Medium | No |
| 🟠 P3 | Lazy load carousel libraries | Medium | Low | Maybe |
| 🟠 P3 | Remove deprecated files | Low | Low | **Yes** |

---

## 📊 Expected Overall Performance Impact

### Before Optimization
- Estimated First Contentful Paint (FCP): ~2.5s
- Estimated Largest Contentful Paint (LCP): ~4.5s
- Estimated Time to Interactive (TTI): ~3.5s

### After P1 + P2 Optimizations (Realistic)
- FCP: ~1.2s (-52%)
- LCP: ~2.1s (-53%)
- TTI: ~1.8s (-49%)

### With All Recommendations
- FCP: ~0.8s (-68%)
- LCP: ~1.5s (-67%)
- TTI: ~1.2s (-66%)

---

## 📋 Implementation Checklist

### Immediate (30 minutes)
- [ ] Change blog.js revalidate from 1 to 3600
- [ ] Change videos.js from getServerSideProps to getStaticProps
- [ ] Move Clarity analytics to defer/async loading
- [ ] Add font preloading to _document.js

### Short-term (1-2 hours)
- [ ] Implement Next.js Image component for photos
- [ ] Optimize FontAwesome imports
- [ ] Remove deprecated files
- [ ] Test with Lighthouse

### Medium-term (2-4 hours)
- [ ] Refactor Main.js to functional component
- [ ] Implement lazy loading for carousel libraries
- [ ] Add performance monitoring (Web Vitals)
- [ ] Implement ISR manual revalidation for Sanity updates

### Long-term (4+ hours)
- [ ] Implement proper caching strategy
- [ ] Add service worker for offline support
- [ ] Consider Next.js 12+ upgrade for additional features
- [ ] Set up performance budget and monitoring

---

## 🔍 Testing & Monitoring

### Before & After Measurement
```bash
# Build and analyze
npm run build
npm start

# Test with Lighthouse (Chrome DevTools)
# Check Core Web Vitals: LCP, FID, CLS

# Use Next.js built-in analytics
npm install web-vitals
```

### Monitoring URLs
- Google PageSpeed Insights
- WebPageTest.org
- Chrome DevTools Performance tab
- Vercel Analytics (if on Vercel)

---

## 📚 References
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Next.js Static Generation vs Server-side Rendering](https://nextjs.org/docs/basic-features/pages)
- [Web Vitals](https://web.dev/vitals/)
- [FontAwesome Tree Shaking](https://fontawesome.com/docs/web/use-with/react)
