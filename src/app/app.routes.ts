import { Routes } from '@angular/router';
import { BlogList } from './blog/blog-list/blog-list';
import { BlogPost } from './blog/blog-post/blog-post';

export const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'blog', component: BlogList },
  { path: 'blog/:slug', component: BlogPost },
];
