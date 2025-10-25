/**
 * Generate Low Quality Image Placeholders (LQIP)
 * 
 * This script generates tiny blurred versions of images for smooth loading
 * Run: node scripts/generate-lqip.js
 */

const fs = require('fs');
const path = require('path');

/**
 * LQIP Generation Guide
 * 
 * Since sharp requires native dependencies, here's how to generate LQIP images:
 * 
 * Option 1: Use Online Tools (Easiest)
 * ------------------------------------
 * 1. Squoosh.app (Google's image optimizer)
 *    - Upload image
 *    - Resize to 20px width
 *    - Quality: 50
 *    - Save as [original-name]-lqip.jpg
 * 
 * 2. TinyPNG.com
 *    - Upload and compress
 *    - Manually resize to 20px
 * 
 * Option 2: ImageMagick (Command Line)
 * ------------------------------------
 * Install: brew install imagemagick (macOS)
 * 
 * Convert single image:
 * ```bash
 * convert input.jpg -resize 20x -quality 50 input-lqip.jpg
 * ```
 * 
 * Batch convert all images in folder:
 * ```bash
 * for img in *.jpg; do
 *   convert "$img" -resize 20x -quality 50 "${img%.jpg}-lqip.jpg"
 * done
 * ```
 * 
 * Option 3: Sharp (Node.js) - Install if needed
 * --------------------------------------------
 * npm install sharp
 * 
 * Then use this script:
 */

async function generateLQIP() {
  try {
    // Try to require sharp
    const sharp = require('sharp');
    
    const inputDir = path.join(__dirname, '../public/images');
    const outputDir = path.join(__dirname, '../public/images/lqip');

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Get all image files
    const files = fs.readdirSync(inputDir).filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file) && !file.includes('-lqip')
    );

    console.log(`Found ${files.length} images to process...`);

    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace(/\.\w+$/, '-lqip.jpg'));

      await sharp(inputPath)
        .resize(20) // 20px width, height auto
        .jpeg({ quality: 50 })
        .toFile(outputPath);

      console.log(`✓ Generated LQIP: ${file}`);
    }

    console.log('\n✅ All LQIP images generated successfully!');
    console.log(`📁 Output directory: ${outputDir}`);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log(`
⚠️  Sharp is not installed.

To use this script, install sharp:
  npm install sharp

Or use alternative methods described in the comments above.

Manual LQIP Generation:
-----------------------
1. Use Squoosh.app (easiest)
2. Use ImageMagick CLI:
   convert image.jpg -resize 20x -quality 50 image-lqip.jpg
3. Use Photoshop: Save for Web, 20px width, quality 50

Tips:
- LQIP should be ~1-2KB per image
- Width: 20px (height auto)
- Quality: 30-50
- Format: JPEG (best compression for blurred images)
      `);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Example: Generate LQIP data URL for embedding
function generateDataURL() {
  console.log(`
Example: Inline LQIP as Data URL
---------------------------------
Instead of separate files, you can inline LQIP as base64:

const lqipDataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRg...";

Benefits:
- No extra HTTP request
- Instant display
- Perfect for above-fold images

Generate with:
1. Convert image to 20px LQIP
2. Convert to base64:
   base64 -i image-lqip.jpg
3. Add data URL prefix:
   data:image/jpeg;base64,[BASE64_STRING]
  `);
}

// Command line interface
const command = process.argv[2];

if (command === 'dataurl') {
  generateDataURL();
} else {
  generateLQIP();
}

module.exports = { generateLQIP };
