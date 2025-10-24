export const CenteredHero = (props: {
  banner: React.ReactNode;
  title: React.ReactNode;
  description: string;
  buttons: React.ReactNode;
}) => (
  <>
    <div className="text-center">{props.banner}</div>

    <div className="mt-3 text-center text-5xl font-bold tracking-tight">
      {props.title}
    </div>

    <div className="text-muted-foreground mx-auto mt-5 max-w-(--breakpoint-md) text-center text-xl">
      {props.description}
    </div>

    <div className="mt-8 flex justify-center gap-x-5 gap-y-3 max-sm:flex-col">
      {props.buttons}
    </div>
  </>
);
