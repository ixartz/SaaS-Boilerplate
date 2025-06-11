import { Button } from '@/components/ui/button';

/**
 * A toggle button to show/hide component in small screen.
 * @component
 * @params props - Component props.
 * @params props.onClick - Function to run when the button is clicked.
 * @params props.ref - Ref to the button element.
 */
const ToggleMenuButton = (props: {
  onClick?: () => void;
  ref?: React.RefObject<HTMLButtonElement | null>;
}) => (
  <Button
    className="p-2 focus-visible:ring-offset-0"
    variant="ghost"
    ref={props.ref}
    onClick={props.onClick}
  >
    <svg
      className="size-6 stroke-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </Button>
);

export { ToggleMenuButton };
