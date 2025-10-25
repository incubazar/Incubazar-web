#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all TypeScript/JavaScript files in app and components directories
const files = execSync('find app components -type f \\( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \\)', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean);

let totalFixed = 0;

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // Replace unescaped apostrophes and quotes in JSX text content
    // This regex matches text content between JSX tags
    const jsxTextPattern = /(>)([^<>]*?)(<)/g;
    
    content = content.replace(jsxTextPattern, (match, openBracket, text, closeBracket) => {
      let newText = text;
      
      // Replace straight apostrophes with &apos;
      if (newText.includes("'") && !newText.includes('&apos;')) {
        newText = newText.replace(/'/g, '&apos;');
        modified = true;
      }
      
      // Replace straight double quotes with &quot;
      if (newText.includes('"') && !newText.includes('&quot;')) {
        newText = newText.replace(/"/g, '&quot;');
        modified = true;
      }
      
      return openBracket + newText + closeBracket;
    });

    if (modified) {
      fs.writeFileSync(file, content, 'utf-8');
      totalFixed++;
      console.log(`✓ Fixed: ${file}`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log(`\n✓ Fixed ${totalFixed} files`);
