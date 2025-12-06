import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // Added RouterLink

// Constants for local storage key and class name
const DARK_MODE_KEY = 'blog-dark-mode';
const DARK_MODE_CLASS = 'dark-mode';

@Component({
  selector: 'app-blog-wrapper',
  standalone: true, // Assuming standalone for modern Angular
  imports: [RouterOutlet, RouterLink], // Added RouterLink for the template
  templateUrl: './blog-wrapper.html',
  styleUrl: './blog-wrapper.scss',
})
export class BlogWrapper {
  // Signal to track the current mode state
  isDarkMode = signal(false);

  constructor() {
    // Only run initialization logic in the browser environment
    if (typeof localStorage !== 'undefined' && typeof document !== 'undefined') {
      const savedMode = localStorage.getItem(DARK_MODE_KEY);

      let initialMode = false;

      if (savedMode !== null) {
        // If saved in storage, use the saved value ('true' or 'false')
        initialMode = savedMode === 'true';
      } else {
        // If not saved, check system preference (e.g., Windows/macOS dark theme)
        initialMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      this.isDarkMode.set(initialMode);

      // Apply the class immediately to the body
      document.body.classList.toggle(DARK_MODE_CLASS, initialMode);
    }
  }

  /**
   * Toggles the dark mode state, updates the body class, and saves to localStorage.
   */
  toggleDarkMode() {
    this.isDarkMode.update((currentValue) => {
      const newValue = !currentValue;

      if (typeof localStorage !== 'undefined' && typeof document !== 'undefined') {
        // 1. Toggle the class on the body
        document.body.classList.toggle(DARK_MODE_CLASS, newValue);

        // 2. Save the new state to localStorage
        localStorage.setItem(DARK_MODE_KEY, String(newValue));
      }

      return newValue;
    });
  }
}
