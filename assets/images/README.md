# Images Directory Structure

This folder contains all images for the Cantus Construction website, organized by category for easy management.

## 📁 Folder Structure

```
assets/images/
├── hero/              # Homepage hero section images
├── residential/       # Residential community images
├── commercial/        # Commercial property images
├── projects/          # Project portfolio images
├── agents/            # Agent/team member photos
├── logos/             # Company and community logos
└── gallery/           # General gallery images
```

## 🖼️ Image Guidelines

### **File Formats**
- **Web Images**: Use `.jpg` for photos, `.png` for graphics with transparency
- **Logos**: Use `.png` or `.svg` for crisp logos at any size
- **Optimization**: Compress images for web (aim for <500KB per image)

### **Naming Convention**
- Use lowercase with hyphens: `villagio-community.jpg`
- Be descriptive: `uptown-plaza-exterior.jpg`
- Include size if multiple versions: `agent-john-cantu-400x400.jpg`

## 📂 Folder Details

### **hero/**
- Homepage background video thumbnail
- Hero section overlay images
- Main company imagery

### **residential/**
- Villagio community photos
- Bougainvillea neighborhood shots
- Del Lago waterfront images
- Lago Vista community photos
- Paseo Del Lago modern homes
- Cimarron Country Club golf course
- The Village on Dove traditional homes
- Villas at Del Lago renderings

### **commercial/**
- Uptown Plaza retail photos
- La Placita shopping center
- Lone Star Plaza exterior/interior
- Expressway 83 highway frontage
- Art Village cultural spaces
- Water Tower Center landmark
- Amistad Plaza office building
- Harlingen MOB medical facility
- Brownsville MOB healthcare center
- StarPoint I executive suites
- MidValley Professionals office complex

### **projects/**
- Completed project photos
- Construction progress images
- Before/after comparisons
- Project milestone photos

### **agents/**
- John Cantu (President & Founder)
- Maria Rodriguez (Sales Director)
- Carlos Martinez (Commercial Leasing)
- Additional team member photos

### **logos/**
- Cantus Construction main logo
- Residential community logos
- Commercial property logos
- Partner/vendor logos

### **gallery/**
- General construction photos
- Team photos
- Equipment photos
- Miscellaneous project images

## 🔧 Usage in Code

### **HTML Image References**
```html
<!-- Hero section -->
<img src="assets/images/hero/company-overview.jpg" alt="Cantus Construction">

<!-- Residential community -->
<img src="assets/images/residential/villagio-community.jpg" alt="Villagio Community">

<!-- Agent photo -->
<img src="assets/images/agents/john-cantu.jpg" alt="John Cantu">
```

### **CSS Background Images**
```css
.hero-section {
    background-image: url('../images/hero/construction-site.jpg');
}
```

## 📱 Responsive Images

### **Multiple Sizes**
For important images, provide multiple sizes:
- `image-400.jpg` (mobile)
- `image-800.jpg` (tablet)
- `image-1200.jpg` (desktop)

### **WebP Format**
Consider using WebP format for better compression:
- `image.jpg` (fallback)
- `image.webp` (modern browsers)

## 🚀 Optimization Tips

1. **Compress Images**: Use tools like TinyPNG or ImageOptim
2. **Proper Dimensions**: Don't use oversized images
3. **Lazy Loading**: Implement lazy loading for better performance
4. **Alt Text**: Always include descriptive alt text
5. **File Names**: Use SEO-friendly file names

## 📋 Image Checklist

- [ ] All images compressed for web
- [ ] Descriptive file names
- [ ] Alt text added to HTML
- [ ] Multiple sizes for responsive design
- [ ] Logos in PNG/SVG format
- [ ] Photos in JPG format
- [ ] Images organized by category

---

**Ready for your images!** Drop them into the appropriate folders and update the HTML references accordingly.
