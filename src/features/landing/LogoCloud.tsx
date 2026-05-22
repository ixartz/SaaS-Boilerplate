export const LogoCloud = (props: {
  text: string;
  children: React.ReactNode;
}) => (
  <>
    <div className="text-center text-sm font-semibold text-muted-foreground">
      {props.text}
    </div>

    <div className="
      mt-5 grid grid-cols-2 place-items-center gap-x-3 gap-y-6
      md:grid-cols-6 md:gap-x-5
      [&_a]:opacity-60
      [&_a:hover]:opacity-100
    "
    >
      {props.children}
    </div>
  </>
);
