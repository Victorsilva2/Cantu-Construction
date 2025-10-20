# Image Integration Examples

Here are examples of how to integrate your images into the Cantus Construction website:

## 🏠 Homepage Hero Section

Replace the current video background with your company video:

```html
<!-- In index.html, update the video source -->
<video autoplay muted loop playsinline>
    <source src="assets/images/hero/company-overview-video.mp4" type="video/mp4">
</video>
```

## 🏘️ Residential Communities

Update residential community images:

```html
<!-- In residential.html -->
<div class="community-card">
    <img src="assets/images/residential/villagio-community.jpg" alt="Villagio Community">
    <div class="community-content">
        <h3>Villagio</h3>
        <p>Luxury living in the heart of McAllen...</p>
    </div>
</div>
```

## 🏢 Commercial Properties

Update commercial property images:

```html
<!-- In commercial.html -->
<div class="property-card">
    <img src="assets/images/commercial/uptown-plaza-exterior.jpg" alt="Uptown Plaza">
    <div class="property-content">
        <h3>Uptown Plaza</h3>
        <p>Prime retail location...</p>
    </div>
</div>
```

## 👥 Agent Photos

Update agent photos:

```html
<!-- In contact.html -->
<div class="agent-card">
    <div class="agent-photo">
        <img src="assets/images/agents/john-cantu.jpg" alt="John Cantu">
    </div>
    <h4>John Cantu</h4>
    <p class="agent-title">President & Founder</p>
</div>
```

## 🏗️ Project Portfolio

Update project images:

```html
<!-- In projects.html -->
<div class="portfolio-item">
    <img src="assets/images/projects/villagio-completed.jpg" alt="Villagio Completed Project">
    <div class="portfolio-overlay">
        <h4>Villagio Community</h4>
        <p>50 luxury homes completed</p>
    </div>
</div>
```

## 🎨 Logo Integration

Add company and community logos:

```html
<!-- Company logo in navigation -->
<div class="nav-logo">
    <img src="assets/images/logos/cantus-construction-logo.png" alt="Cantus Construction">
</div>

<!-- Community logos -->
<div class="logo-box">
    <img src="assets/images/logos/villagio-logo.png" alt="Villagio">
</div>
```

## 📸 Gallery Images

Add gallery photos:

```html
<!-- In projects.html photo album section -->
<div class="photo-item">
    <img src="assets/images/gallery/construction-progress-1.jpg" alt="Construction Progress">
    <div class="photo-overlay">
        <h4>Construction Progress</h4>
    </div>
</div>
```

## 🎥 Video Thumbnails

Add video thumbnails:

```html
<!-- In videos.html -->
<div class="video-thumbnail">
    <img src="assets/images/hero/company-video-thumbnail.jpg" alt="Company Overview Video">
    <div class="play-button" onclick="openVideoModal('main')">
        <i class="fas fa-play"></i>
    </div>
</div>
```

## 📱 Responsive Images

For better performance, use multiple image sizes:

```html
<picture>
    <source media="(min-width: 1200px)" srcset="assets/images/residential/villagio-1200.jpg">
    <source media="(min-width: 800px)" srcset="assets/images/residential/villagio-800.jpg">
    <img src="assets/images/residential/villagio-400.jpg" alt="Villagio Community">
</picture>
```

## 🔧 CSS Background Images

Use images as CSS backgrounds:

```css
.hero-section {
    background-image: url('../images/hero/construction-site.jpg');
    background-size: cover;
    background-position: center;
}

.community-card {
    background-image: url('../images/residential/villagio-bg.jpg');
}
```

## 📋 Image Checklist

When adding images:

- [ ] Place in correct folder (`assets/images/[category]/`)
- [ ] Use descriptive file names
- [ ] Compress images for web (< 500KB)
- [ ] Add alt text for accessibility
- [ ] Test on different screen sizes
- [ ] Update HTML references
- [ ] Verify images load correctly

## 🚀 Quick Start

1. **Drop your images** into the appropriate folders
2. **Update HTML** with correct image paths
3. **Test locally** with `npm run dev`
4. **Build for production** with `npm run build`

---

**Ready to integrate your images!** The folder structure is set up and the build process will include all your images automatically.
