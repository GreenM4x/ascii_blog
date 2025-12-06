import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog-wrapper',
  imports: [RouterOutlet],
  templateUrl: './blog-wrapper.html',
  styleUrl: './blog-wrapper.scss',
})
export class BlogWrapper {
  // Logic to toggle the dark-mode class on the body (since global styles target body)
  isDarkMode = signal(false);

  constructor() {
    // Initialize state from local storage or system preference if desired
    if (typeof document !== 'undefined') {
      this.isDarkMode.set(document.body.classList.contains('dark-mode'));
    }
  }

  toggleDarkMode() {
    this.isDarkMode.update((value) => {
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('dark-mode', !value);
      }
      return !value;
    });
  }
}
