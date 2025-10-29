#!/usr/bin/env node

/**
 * Build script for Cantus Construction website
 * Optimizes assets for production
 */

const fs = require('fs');
const path = require('path');

console.log('🏗️  Building Cantus Construction website for production...\n');

// Helper function to copy directories recursively
function copyDirectoryRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectoryRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy HTML files
const htmlFiles = ['index.html', 'residential.html', 'commercial.html', 'projects.html', 'contact.html', 'videos.html', 'brochures.html'];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`✅ Copied ${file}`);
  }
});

  // Copy assets directory
  const assetsDir = path.join(__dirname, 'assets');
  const distAssetsDir = path.join(distDir, 'assets');

  if (fs.existsSync(assetsDir)) {
    // Create assets directory in dist
    if (!fs.existsSync(distAssetsDir)) {
      fs.mkdirSync(distAssetsDir, { recursive: true });
    }
    
    // Copy CSS files
    const cssDir = path.join(assetsDir, 'css');
    const distCssDir = path.join(distAssetsDir, 'css');
    
    if (fs.existsSync(cssDir)) {
      if (!fs.existsSync(distCssDir)) {
        fs.mkdirSync(distCssDir, { recursive: true });
      }
      
      const cssFiles = fs.readdirSync(cssDir);
      cssFiles.forEach(file => {
        fs.copyFileSync(path.join(cssDir, file), path.join(distCssDir, file));
        console.log(`✅ Copied CSS: ${file}`);
      });
    }
    
    // Copy JS files
    const jsDir = path.join(assetsDir, 'js');
    const distJsDir = path.join(distAssetsDir, 'js');
    
    if (fs.existsSync(jsDir)) {
      if (!fs.existsSync(distJsDir)) {
        fs.mkdirSync(distJsDir, { recursive: true });
      }
      
      const jsFiles = fs.readdirSync(jsDir);
      jsFiles.forEach(file => {
        fs.copyFileSync(path.join(jsDir, file), path.join(distJsDir, file));
        console.log(`✅ Copied JS: ${file}`);
      });
    }
    
  // Copy Images directory
  const imagesDir = path.join(assetsDir, 'images');
  const distImagesDir = path.join(distAssetsDir, 'images');
  
  if (fs.existsSync(imagesDir)) {
    // Copy entire images directory recursively
    copyDirectoryRecursive(imagesDir, distImagesDir);
    console.log(`✅ Copied Images directory`);
  }
  
  // Copy public/images directory
  const publicImagesDir = path.join(__dirname, 'public', 'images');
  const distPublicImagesDir = path.join(distDir, 'public', 'images');
  
  if (fs.existsSync(publicImagesDir)) {
    // Create public/images directory in dist
    if (!fs.existsSync(path.join(distDir, 'public'))) {
      fs.mkdirSync(path.join(distDir, 'public'), { recursive: true });
    }
    if (!fs.existsSync(distPublicImagesDir)) {
      fs.mkdirSync(distPublicImagesDir, { recursive: true });
    }
    
    // Copy entire public/images directory recursively
    copyDirectoryRecursive(publicImagesDir, distPublicImagesDir);
    console.log(`✅ Copied public/images directory`);
  }
  }

// Copy API directory (for Vercel serverless functions)
const apiDir = path.join(__dirname, 'api');
const distApiDir = path.join(distDir, 'api');

if (fs.existsSync(apiDir)) {
  copyDirectoryRecursive(apiDir, distApiDir);
  console.log(`✅ Copied api directory`);
}

// Copy vercel.json (Vercel configuration)
if (fs.existsSync('vercel.json')) {
  fs.copyFileSync('vercel.json', path.join(distDir, 'vercel.json'));
  console.log(`✅ Copied vercel.json`);
}

// Copy README and documentation
const docsFiles = ['README.md', 'PROJECT_STRUCTURE.md'];
docsFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`✅ Copied documentation: ${file}`);
  }
});

console.log('\n🎉 Build completed successfully!');
console.log(`📁 Production files are in the 'dist' directory`);
console.log('🚀 Ready for deployment!\n');
