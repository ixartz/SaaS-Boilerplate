import { Button } from '@/components/ui/button';

/**
 * A toggle button to show/hide component in small screen.
 * @param props The properties for the component.
 * @param props.onClick Function to run when the button is clicked.
 */
const MenuToggle = (props: {
  onClick?: () => void;
}) => (
  <Button
    variant="ghost"
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

export { MenuToggle };
