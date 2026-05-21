export const CenteredContainer = (props: {
  children: React.ReactNode;
}) => (
  <div className="
    flex min-h-svh flex-col items-center justify-center gap-6 p-6
    md:p-10
  "
  >
    {props.children}
  </div>
);
