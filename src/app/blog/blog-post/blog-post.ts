import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // 1. Added HttpClient

// Assuming the component is standalone based on the 'imports' array
@Component({
  selector: 'app-blog-post',
  standalone: true, // Assuming this for modern Angular components
  imports: [CommonModule, MarkdownModule, RouterLink],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss',
})
export class BlogPost {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient); // 2. Inject HttpClient

  slug = signal<string>('');
  // This signal will hold the Markdown content AFTER stripping frontmatter
  postContent = signal<string | null>(null);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.slug.set(slug);

        const postPath = `assets/posts/${slug}/post.md`;

        // 3. Fetch the file content, process it, and set the signal
        this.http.get(postPath, { responseType: 'text' }).subscribe({
          next: (rawContent) => {
            const contentWithoutFrontmatter = this.stripFrontmatter(rawContent);
            this.postContent.set(contentWithoutFrontmatter);
          },
          error: (err) => {
            console.error('Failed to load post content:', err);
            this.postContent.set(`# Error\nCould not load blog post. Check console for details.`);
          },
        });
      }
    });
  }

  // Helper function to strip the Frontmatter block
  private stripFrontmatter(content: string): string {
    const lines = content.split('\n');

    // Check if the first line is '---'
    if (lines[0].trim() !== '---') {
      return content; // No frontmatter found
    }

    let endMarker = -1;
    // Look for the closing '---' starting from the second line
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        endMarker = i;
        break;
      }
    }

    // If closing '---' is found, return the content starting after it.
    if (endMarker !== -1) {
      // Join all lines starting from the line AFTER the closing '---'
      return lines
        .slice(endMarker + 1)
        .join('\n')
        .trim();
    }

    return content; // Should not happen with valid frontmatter, but return original content as fallback
  }

  onLoad(e: any) {
    // Optional: Hook to handle when markdown finishes loading
    console.log('Post loaded');
  }
}
