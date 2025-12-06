import { Routes } from '@angular/router';
import { BlogList } from './blog/blog-list/blog-list';
import { BlogPost } from './blog/blog-post/blog-post';
import { BlogWrapper } from './blog/blog-wrapper/blog-wrapper';

export const routes: Routes = [
  {
    path: '',
    component: BlogWrapper, // Parent component for the whole layout
    children: [
      { path: '', component: BlogList }, // / displays the list
      { path: 'blog/:slug', component: BlogPost }, // /blog/post-slug displays the post
    ],
  },
];
