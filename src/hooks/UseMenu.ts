import { useState } from 'react';

/**
 * React hook for menu visibility.
 * @param defaultOpen Initial open state (default: false).
 * @returns containing menu state and control functions.
 */
export const useMenu = (defaultOpen: boolean = false) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(defaultOpen);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const closeMenu = () => setIsMenuOpen(false);

  const openMenu = () => setIsMenuOpen(true);

  return { isMenuOpen, openMenu, closeMenu, toggleMenu };
};
