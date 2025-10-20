// Development configuration for Cantus Construction website
const path = require('path');

module.exports = {
  // Development server configuration
  devServer: {
    port: 3000,
    open: true,
    watch: ['assets/**/*', '*.html'],
    ignore: ['node_modules/**/*']
  },
  
  // Build configuration
  build: {
    outputDir: 'dist',
    assetsDir: 'assets',
    publicPath: '/'
  },
  
  // CSS processing
  css: {
    preprocessor: 'scss',
    autoprefixer: {
      browsers: ['last 2 versions', '> 1%', 'ie >= 11']
    }
  },
  
  // File watching
  watch: {
    files: ['assets/**/*.css', 'assets/**/*.js', '*.html'],
    ignore: ['node_modules/**/*', 'dist/**/*']
  }
};
