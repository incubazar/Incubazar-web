#!/usr/bin/env python3
import re
import os
import sys
from pathlib import Path

def fix_jsx_entities(content):
    """Fix unescaped entities in JSX text content."""
    lines = content.split('\n')
    modified = False
    
    for i, line in enumerate(lines):
        # Skip lines that are comments or imports
        if line.strip().startswith('//') or line.strip().startswith('/*') or line.strip().startswith('import'):
            continue
        
        # Skip lines that are in code blocks (between backticks)
        if '`' in line:
            continue
            
        # Find JSX text content (text between > and <)
        # But skip if it's inside a code string or attribute
        parts = re.split(r'(>.*?<)', line)
        new_parts = []
        
        for part in parts:
            if part.startswith('>') and part.endswith('<'):
                # This is JSX text content
                text = part[1:-1]  # Remove > and <
                
                # Skip if it's empty or just whitespace
                if not text or text.isspace():
                    new_parts.append(part)
                    continue
                
                # Skip if it contains JSX expressions
                if '{' in text and '}' in text:
                    new_parts.append(part)
                    continue
                
                # Replace straight apostrophes with &apos;
                new_text = text.replace("'", "&apos;")
                
                # Replace straight double quotes with &quot;
                new_text = new_text.replace('"', "&quot;")
                
                if new_text != text:
                    modified = True
                    new_parts.append('>' + new_text + '<')
                else:
                    new_parts.append(part)
            else:
                new_parts.append(part)
        
        if new_parts != parts:
            lines[i] = ''.join(new_parts)
    
    return '\n'.join(lines), modified

def process_file(filepath):
    """Process a single file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content, modified = fix_jsx_entities(content)
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Fixed: {filepath}")
            return True
        return False
    except Exception as e:
        print(f"✗ Error processing {filepath}: {e}")
        return False

def main():
    # Find all TSX and JSX files
    files_to_process = []
    
    for pattern in ['app/**/*.tsx', 'app/**/*.jsx', 'components/**/*.tsx', 'components/**/*.jsx']:
        files_to_process.extend(Path('.').glob(pattern))
    
    fixed_count = 0
    for filepath in files_to_process:
        if process_file(filepath):
            fixed_count += 1
    
    print(f"\n✓ Fixed {fixed_count} files")

if __name__ == '__main__':
    main()
