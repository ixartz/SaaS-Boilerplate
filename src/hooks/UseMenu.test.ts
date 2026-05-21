import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useMenu } from './UseMenu';

describe('UseMenu', () => {
  describe('Render hook', () => {
    it('shouldn\'t show the menu by default', async () => {
      const { result } = await renderHook(() => useMenu());

      expect(result.current.isMenuOpen).toBeFalsy();
    });

    it('should allow default open state via parameter', async () => {
      const { result } = await renderHook(() => useMenu(true));

      expect(result.current.isMenuOpen).toBeTruthy();
    });

    it('should make the menu visible by toggling the menu', async () => {
      const { result, act } = await renderHook(() => useMenu());

      act(() => {
        result.current.toggleMenu();
      });

      expect(result.current.isMenuOpen).toBeTruthy();
    });

    it('shouldn\'t make the menu visible after toggling and closing the menu', async () => {
      const { result, act } = await renderHook(() => useMenu());

      act(() => {
        result.current.closeMenu();
      });

      expect(result.current.isMenuOpen).toBeFalsy();
    });

    it('shouldn\'t make the menu visible after toggling the menu twice', async () => {
      const { result, act } = await renderHook(() => useMenu());

      act(() => {
        result.current.toggleMenu();
        result.current.toggleMenu();
      });

      expect(result.current.isMenuOpen).toBeFalsy();
    });
  });
});
