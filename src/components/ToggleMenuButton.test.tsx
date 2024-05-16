import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ToggleMenuButton } from './ToggleMenuButton';

describe('ToggleMenuButton', () => {
  describe('onClick props', () => {
    it('should call the callback when the user click on the button', async () => {
      const handler = jest.fn();

      render(<ToggleMenuButton onClick={handler} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handler).toHaveBeenCalled();
    });
  });
});
