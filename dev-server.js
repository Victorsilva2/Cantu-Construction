#!/usr/bin/env node

/**
 * Development server for Cantus Construction website
 * Provides live reload and file watching
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🏗️  Starting Cantus Construction Development Server...\n');

// Start live-server with configuration
const server = spawn('npx', ['live-server', '--port=3000', '--open=/index.html', '--watch=assets,*.html'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (err) => {
  console.error('❌ Failed to start development server:', err);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`\n🛑 Development server stopped with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...');
  server.kill('SIGINT');
  process.exit(0);
});

console.log('✅ Development server started successfully!');
console.log('📱 Open http://localhost:3000 in your browser');
console.log('🔄 Live reload is enabled - changes will auto-refresh');
console.log('⏹️  Press Ctrl+C to stop the server\n');
