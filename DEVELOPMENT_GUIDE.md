# Cantus Construction - Node.js Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 📋 Available Scripts

### Development
```bash
npm run dev          # Start development server with live reload
npm start            # Same as npm run dev
```

### Production
```bash
npm run build        # Build for production (creates dist/ folder)
npm run preview      # Preview production build
```

### Utilities
```bash
npm run serve        # Simple static server (no live reload)
```

## 🏗️ Development Workflow

### 1. **Start Development**
```bash
npm run dev
```
- Opens browser automatically at `http://localhost:3000`
- Live reload enabled - changes auto-refresh
- Watches all HTML, CSS, and JS files

### 2. **Make Changes**
- Edit HTML files in root directory
- Edit CSS in `assets/css/`
- Edit JS in `assets/js/`
- Changes are automatically detected and browser refreshes

### 3. **Build for Production**
```bash
npm run build
```
- Creates optimized `dist/` folder
- Copies all files for deployment
- Ready for hosting

## 📁 Project Structure

```
Cantu-Construction/
├── package.json              # Node.js configuration
├── dev.config.js            # Development configuration
├── dev-server.js            # Custom development server
├── build.js                 # Production build script
├── .gitignore               # Git ignore rules
├── index.html               # Homepage
├── residential.html         # Residential page
├── commercial.html          # Commercial page
├── projects.html           # Projects page
├── contact.html            # Contact page
├── videos.html             # Videos page
├── brochures.html          # Brochures page
├── assets/                 # Shared assets
│   ├── css/
│   │   ├── main.css        # Core styles
│   │   └── components.css  # Component styles
│   └── js/
│       ├── main.js         # Core functionality
│       └── components.js   # Component interactions
└── dist/                   # Production build (generated)
```

## 🛠️ Development Features

### **Live Reload**
- Automatically refreshes browser when files change
- Watches HTML, CSS, and JS files
- No need to manually refresh

### **File Watching**
- Monitors all project files
- Instant feedback on changes
- Efficient change detection

### **Development Server**
- Custom Node.js server
- Port 3000 (configurable)
- Auto-opens browser
- Graceful shutdown (Ctrl+C)

### **Build Process**
- Production-ready build
- Asset optimization ready
- Clean dist/ output
- Deployment ready

## 🎯 Team Collaboration

### **Working on Different Pages**
```bash
# Team member 1: Working on residential page
npm run dev
# Edit residential.html and assets/css/components.css

# Team member 2: Working on commercial page  
npm run dev
# Edit commercial.html and assets/js/components.js
```

### **Shared Development**
- All team members use same `npm run dev` command
- Live reload works for everyone
- No conflicts with file watching
- Consistent development environment

## 🔧 Configuration

### **Development Server Settings**
Edit `dev.config.js` to modify:
- Port number
- Watch directories
- Auto-open behavior
- File ignore patterns

### **Build Settings**
Edit `build.js` to modify:
- Output directory
- File copying rules
- Asset optimization
- Build process steps

## 📦 Dependencies

### **Development Dependencies**
- `live-server`: Development server with live reload
- `concurrently`: Run multiple commands
- `nodemon`: File watching utility
- `sass`: CSS preprocessing
- `postcss`: CSS post-processing
- `autoprefixer`: CSS vendor prefixes
- `cssnano`: CSS minification

### **Adding New Dependencies**
```bash
# Add development dependency
npm install --save-dev package-name

# Add production dependency
npm install package-name
```

## 🚀 Deployment

### **Production Build**
```bash
npm run build
```

### **Deploy Options**
1. **Static Hosting**: Upload `dist/` folder to any static host
2. **CDN**: Upload to CDN for global distribution
3. **Server**: Copy `dist/` contents to web server

### **Recommended Hosts**
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any web server

## 🐛 Troubleshooting

### **Port Already in Use**
```bash
# Kill process on port 3000
npx kill-port 3000
# Then restart
npm run dev
```

### **Dependencies Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Build Issues**
```bash
# Check if dist folder exists
ls -la dist/

# Rebuild from scratch
rm -rf dist/
npm run build
```

## 📈 Next Steps

### **Potential Enhancements**
1. **CSS Preprocessing**: Convert to SCSS/SASS
2. **JS Bundling**: Add Webpack or Vite
3. **Image Optimization**: Add image compression
4. **Testing**: Add Jest or Cypress
5. **Linting**: Add ESLint and Prettier
6. **CI/CD**: Add GitHub Actions

### **Advanced Features**
- Hot Module Replacement (HMR)
- CSS-in-JS solutions
- Component-based architecture
- API integration
- Database connectivity

---

**Happy coding!** 🎉 The Node.js setup provides a solid foundation for modern web development with excellent tooling and team collaboration features.
