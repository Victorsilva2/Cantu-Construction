# Cantus Construction Website - Project Structure

## 📁 File Organization

```
Cantu-Construction/
├── index.html              # Homepage
├── residential.html         # Residential communities page
├── commercial.html          # Commercial properties page
├── projects.html           # Projects & portfolio page
├── contact.html            # Contact & agents page
├── videos.html             # Videos page
├── brochures.html          # Interactive brochures page
├── README.md               # Project documentation
└── assets/                 # Shared assets folder
    ├── css/
    │   ├── main.css        # Core styles & theme
    │   └── components.css  # Component-specific styles
    └── js/
        ├── main.js         # Core functionality
        └── components.js   # Component interactions
```

## 🎯 Team Collaboration Benefits

### ✅ **Separate Pages**
- Each team member can work on different pages independently
- No conflicts when editing different sections
- Easy to assign specific pages to team members

### ✅ **Shared Assets**
- **CSS**: Split into `main.css` (theme/colors) and `components.css` (specific components)
- **JS**: Split into `main.js` (core functions) and `components.js` (page-specific interactions)
- Consistent styling and functionality across all pages

### ✅ **Modular Navigation**
- Navigation component is consistent across all pages
- Easy to update navigation links in one place
- Active page highlighting works automatically

## 📄 Page Breakdown

### **index.html** - Homepage
- Hero section with video background
- "What We Can Do" overview
- Recent projects showcase
- Residential & Plaza logos
- Client testimonials
- Quick links to other sections

### **residential.html** - Residential Communities
- All 8 residential communities with details
- "Why Build With Cantus" section
- Individual community cards with images
- Links to contact for more information

### **commercial.html** - Commercial Properties
- Retail plazas section
- Office & medical buildings section
- "Why Lease With Cantus" section
- Property details with features lists
- Availability contact links

### **projects.html** - Projects & Portfolio
- Completed projects tab
- Current/ongoing projects tab
- Photo album gallery
- Video integration for project showcases

### **contact.html** - Contact & Team
- Contact information
- Contact form with validation
- Agent bios with photos and contact details
- Company history and values

### **videos.html** - Video Gallery
- Main company overview video
- Residential communities highlight
- Commercial construction overview
- Video modal integration

### **brochures.html** - Interactive Brochures
- Residential brochures (8 communities)
- Commercial brochures (11 properties)
- Placeholder for PDF/flipbook integration
- Organized by category

## 🎨 Design System

### **Color Palette** (CSS Variables)
- `--brand-blue`: #1f6feb (Primary)
- `--brand-blue-dark`: #1a61d1 (Hover states)
- `--brand-red`: #e63946 (Accent)
- `--brand-navy`: #1f2937 (Text/headings)
- `--text`: #333333 (Body text)
- `--muted`: #7f8c8d (Secondary text)
- `--bg`: #ffffff (Background)
- `--bg-alt`: #f8f9fa (Alternate background)
- `--border`: #e1e8ed (Borders)

### **Typography**
- Font Family: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700
- Responsive sizing with rem units

## 🔧 Technical Features

### **Responsive Design**
- Mobile-first approach
- Breakpoints: 768px, 480px
- Hamburger menu for mobile
- Flexible grid layouts

### **Interactive Elements**
- Video modal system
- Tab switching functionality
- Dropdown navigation menus
- Smooth scrolling
- Form validation
- Hover animations

### **Performance**
- Lazy loading for images
- Video preloading
- Optimized CSS/JS structure
- Minimal external dependencies

## 👥 Team Workflow

### **For Designers**
- Work in `assets/css/components.css` for new component styles
- Update color variables in `assets/css/main.css` for theme changes
- Test across all pages for consistency

### **For Developers**
- Add new functionality in `assets/js/components.js`
- Update core functions in `assets/js/main.js`
- Test interactions across all pages

### **For Content Managers**
- Update text content directly in HTML files
- Replace placeholder images with actual photos
- Update contact information in all pages

### **For Project Managers**
- Assign specific pages to team members
- Track progress by page completion
- Coordinate asset updates across pages

## 🚀 Next Steps

1. **Content Integration**
   - Replace placeholder images with actual project photos
   - Add real company videos
   - Update contact information and agent details

2. **Brochure Integration**
   - Implement PDF viewer or flipbook system
   - Connect brochure buttons to actual PDFs
   - Add download functionality

3. **Form Backend**
   - Connect contact forms to email service
   - Add form validation improvements
   - Implement lead tracking

4. **SEO Optimization**
   - Add meta tags to each page
   - Implement structured data
   - Optimize images and content

5. **Performance**
   - Add image optimization
   - Implement caching strategies
   - Add analytics tracking

---

**Ready for team collaboration!** Each team member can work on their assigned pages without conflicts, while maintaining consistency through shared assets.
