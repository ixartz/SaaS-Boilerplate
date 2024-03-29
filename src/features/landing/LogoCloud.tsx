const LogoCloud = (props: { text: string; children: React.ReactNode }) => (
  <>
    <div className="text-center text-xl font-medium text-muted-foreground">
      {props.text}
    </div>

    <div className="mt-6 grid grid-cols-6 place-items-center gap-x-3 [&_img:hover]:opacity-100 [&_img]:opacity-60">
      {props.children}
    </div>
  </>
);

export { LogoCloud };
