#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to escape entities in JSX text content only
function fixJSXEntities(content) {
  let modified = false;
  
  // Split by lines and process each
  const lines = content.split('\n');
  const newLines = lines.map(line => {
    // Skip if line is a comment, import, or contains template literals
    if (line.trim().startsWith('//') || 
        line.trim().startsWith('/*') || 
        line.trim().startsWith('import') ||
        line.trim().startsWith('export') ||
        line.includes('`')) {
      return line;
    }
    
    // Match JSX text content: text between > and <
    // But not in attributes (between quotes)
    let newLine = line;
    
    // Simple approach: replace ' and " in text that appears between > and <
    // Match pattern: >[text content]<
    const jsxTextRegex = /(>)([^<{]*?)(<)/g;
    
    newLine = newLine.replace(jsxTextRegex, (match, open, text, close) => {
      // Skip if text is empty or only whitespace
      if (!text.trim()) {
        return match;
      }
      
      // Skip if text contains JSX expressions  
      if (text.includes('{') || text.includes('}')) {
        return match;
      }
      
      // Skip if already escaped
      if (text.includes('&apos;') || text.includes('&quot;') || text.includes('&#39;')) {
        return match;
      }
      
      let newText = text;
      
      // Replace ' with &apos;
      if (text.includes("'")) {
        newText = newText.replace(/'/g, '&apos;');
        modified = true;
      }
      
      // Replace " with &quot; (but be careful with this)
      const straightQuoteRegex = /(?<![=\s])"(?![>\s])/g;
      if (straightQuoteRegex.test(newText)) {
        newText = newText.replace(/"/g, '&quot;');
        modified = true;
      }
      
      return open + newText + close;
    });
    
    return newLine;
  });
  
  return { content: newLines.join('\n'), modified };
}

// Process files
async function processFiles() {
  const patterns = [
    'app/**/*.tsx',
    'app/**/*.jsx',
    'components/**/*.tsx',
    'components/**/*.jsx'
  ];
  
  let allFiles = [];
  for (const pattern of patterns) {
    const files = glob.sync(pattern, { cwd: process.cwd() });
    allFiles = allFiles.concat(files);
  }
  
  let fixedCount = 0;
  
  for (const file of allFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const { content: newContent, modified } = fixJSXEntities(content);
      
      if (modified) {
        fs.writeFileSync(file, newContent, 'utf-8');
        console.log(`✓ Fixed: ${file}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n✓ Total files fixed: ${fixedCount}`);
}

processFiles().catch(console.error);
