#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  
  // Simple replacements for common patterns in JSX text
  // Replace straight apostrophes with &apos; (only in specific contexts)
  content = content.replace(/(>[\s\w]*?)'([\s\w]*?<)/g, '$1&apos;$2');
  
  // More targeted replacements
  content = content.replace(/you're/g, 'you&apos;re');
  content = content.replace(/don't/g, 'don&apos;t');
  content = content.replace(/doesn't/g, 'doesn&apos;t');
  content = content.replace(/isn't/g, 'isn&apos;t');
  content = content.replace(/aren't/g, 'aren&apos;t');
  content = content.replace(/won't/g, 'won&apos;t');
  content = content.replace(/can't/g, 'can&apos;t');
  content = content.replace(/haven't/g, 'haven&apos;t');
  content = content.replace(/hasn't/g, 'hasn&apos;t');
  content = content.replace(/wouldn't/g, 'wouldn&apos;t');
  content = content.replace(/couldn't/g, 'couldn&apos;t');
  content = content.replace(/shouldn't/g, 'shouldn&apos;t');
  content = content.replace(/it's/g, 'it&apos;s');
  content = content.replace(/that's/g, 'that&apos;s');
  content = content.replace(/what's/g, 'what&apos;s');
  content = content.replace(/there's/g, 'there&apos;s');
  content = content.replace(/here's/g, 'here&apos;s');
  content = content.replace(/let's/g, 'let&apos;s');
  content = content.replace(/we're/g, 'we&apos;re');
  content = content.replace(/they're/g, 'they&apos;re');
  content = content.replace(/we've/g, 'we&apos;ve');
  content = content.replace(/they've/g, 'they&apos;ve');
  content = content.replace(/I'm/g, 'I&apos;m');
  content = content.replace(/I've/g, 'I&apos;ve');
  content = content.replace(/I'll/g, 'I&apos;ll');
  content = content.replace(/you'll/g, 'you&apos;ll');
  content = content.replace(/we'll/g, 'we&apos;ll');
  content = content.replace(/they'll/g, 'they&apos;ll');
  content = content.replace(/he's/g, 'he&apos;s');
  content = content.replace(/she's/g, 'she&apos;s');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

// Get all files
const files = [
  ...glob.sync('app/**/*.tsx'),
  ...glob.sync('app/**/*.jsx'),
  ...glob.sync('components/**/*.tsx'),
  ...glob.sync('components/**/*.jsx')
];

let fixed = 0;
files.forEach(file => {
  if (fixFile(file)) {
    console.log(`✓ ${file}`);
    fixed++;
  }
});

console.log(`\nFixed ${fixed} files`);
