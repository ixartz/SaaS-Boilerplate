export const LogoCloud = (props: { text: string; children: React.ReactNode }) => (
  <>
    <div className="text-center text-xl font-medium text-muted-foreground">
      {props.text}
    </div>

    <div className="mt-6 grid grid-cols-2 place-items-center gap-x-3 gap-y-6 md:grid-cols-5 md:gap-x-20 [&_a:hover]:opacity-100 [&_a]:opacity-60">
      {props.children}
    </div>
  </>
);
