export const CTABanner = (props: {
  title: string;
  description: string;
  buttons: React.ReactNode;
}) => (
  <div className="bg-muted rounded-xl bg-linear-to-br from-indigo-400 via-purple-400 to-pink-400 px-6 py-10 text-center">
    <div className="text-primary-foreground text-3xl font-bold">
      {props.title}
    </div>

    <div className="text-muted mt-2 text-lg font-medium">
      {props.description}
    </div>

    <div className="mt-6">{props.buttons}</div>
  </div>
);
