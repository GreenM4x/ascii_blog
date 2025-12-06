import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss',
})
export class BlogPost {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  slug = signal<string>('');
  postPath = signal<string | null>(null);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.slug.set(slug);
        // Construct path dynamically: assets/posts/slug/post.md
        this.postPath.set(`assets/posts/${slug}/post.md`);
      }
    });
  }

  onLoad(e: any) {
    // Optional: Hook to handle when markdown finishes loading
    console.log('Post loaded');
  }
}
