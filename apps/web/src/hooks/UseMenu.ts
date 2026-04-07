import { useState } from 'react';

/**
 * React Hook to toggle element. Mostly used for responsive menu.
 * @hook
 */
export const useMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(prevState => !prevState);
  };

  const handleClose = () => {
    setShowMenu(false);
  };

  return { showMenu, handleToggleMenu, handleClose };
};
