const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');

// Define paths relative to this script
const postsDir = path.join(__dirname, '../src/assets/posts');
const outputFile = path.join(__dirname, '../src/assets/blog-data.json');

const posts = [];

// 1. Ensure the 'posts' directory exists to avoid crashes if it's empty/missing
if (!fs.existsSync(postsDir)) {
  console.log(`⚠️  Directory not found: ${postsDir}. Creating it...`);
  fs.mkdirSync(postsDir, { recursive: true });
}

// 2. Read the directory
const folders = fs.readdirSync(postsDir);

folders.forEach((folder) => {
  const postPath = path.join(postsDir, folder, 'post.md');

  if (fs.existsSync(postPath)) {
    const content = fs.readFileSync(postPath, 'utf8');
    const parsed = frontMatter(content);

    posts.push({
      slug: folder,
      title: parsed.attributes.title || folder,
      date: parsed.attributes.date || new Date(),
      description: parsed.attributes.description || '',
      path: `assets/posts/${folder}/post.md`,
      attributes: parsed.attributes,
    });
  }
});

// Sort by date (newest first)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// 3. Ensure the output directory (src/assets) exists before writing
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 4. Write the file
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`✅ Generated ${posts.length} posts in blog-data.json`);
