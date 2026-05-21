import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { MenuToggle } from './MenuToggle';

describe('MenuToggle', () => {
  describe('onClick props', async () => {
    it('should call the callback when the user click on the button', async () => {
      const handler = vi.fn();

      await render(<MenuToggle onClick={handler} />);
      const button = page.getByRole('button');
      await userEvent.click(button);

      expect(handler).toHaveBeenCalled();
    });
  });
});
