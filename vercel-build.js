import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Current directory:', process.cwd());
console.log('Files in current directory:');
console.log(fs.readdirSync('.'));

console.log('Index.html exists:', fs.existsSync('index.html'));
console.log('Index.html content (if exists):');
if (fs.existsSync('index.html')) {
  console.log(fs.readFileSync('index.html', 'utf8'));
}

exec('vite build', (error, stdout, stderr) => {
  console.log('Build stdout:', stdout);
  console.log('Build stderr:', stderr);
  if (error) {
    console.error('Build error:', error);
  }
}); 