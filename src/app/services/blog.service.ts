import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  path: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);

  posts = signal<BlogPost[]>([]);

  constructor() {
    this.loadPosts();
  }

  private loadPosts() {
    this.http
      .get<BlogPost[]>('/assets/blog-data.json')
      .pipe(tap((data) => this.posts.set(data)))
      .subscribe();
  }

  getPostBySlug(slug: string) {
    return this.posts().find((p) => p.slug === slug);
  }
}
