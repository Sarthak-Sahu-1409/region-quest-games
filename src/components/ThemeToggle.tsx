import { useEffect } from 'react';

export const ThemeToggle = () => {
  useEffect(() => {
    // Set light mode as the only theme
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  return null;
};
