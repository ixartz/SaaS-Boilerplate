import { act, renderHook } from '@testing-library/react';

import { useMenu } from './UseMenu';

describe('UseMenu', () => {
  describe('Render hook', () => {
    it('shouldn\'t show the menu by default', async () => {
      const { result } = renderHook(() => useMenu());

      expect(result.current.showMenu).toBeFalsy();
    });

    it('should make the menu visible by toggling the menu', () => {
      const { result } = renderHook(() => useMenu());

      act(() => {
        result.current.handleToggleMenu();
      });

      expect(result.current.showMenu).toBeTruthy();
    });

    it('shouldn\'t make the menu visible after toggling and closing the menu', () => {
      const { result } = renderHook(() => useMenu());

      act(() => {
        result.current.handleClose();
      });

      expect(result.current.showMenu).toBeFalsy();
    });

    it('shouldn\'t make the menu visible after toggling the menu twice', () => {
      const { result } = renderHook(() => useMenu());

      act(() => {
        result.current.handleToggleMenu();
        result.current.handleToggleMenu();
      });

      expect(result.current.showMenu).toBeFalsy();
    });
  });
});
