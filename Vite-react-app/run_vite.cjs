const { execSync } = require('child_process');
const path = require('path');

const appDir = __dirname;

console.log('--- Setting up React Task Manager Homework App ---');
console.log('1. Installing npm dependencies...');
try {
  execSync('npm install', { stdio: 'inherit', cwd: appDir });
} catch (err) {
  console.error('Failed to install dependencies:', err.message);
  process.exit(1);
}

console.log('\n2. Starting local Vite development server...');
try {
  execSync('npm run dev', { stdio: 'inherit', cwd: appDir });
} catch (err) {
  console.error('Vite dev server failed to start:', err.message);
  process.exit(1);
}
