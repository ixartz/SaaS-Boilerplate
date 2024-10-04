export const TitleBar = (props: {
  title: React.ReactNode;
  description?: React.ReactNode;
}) => (
  <div className="mb-8">
    <div className="text-2xl font-semibold">{props.title}</div>

    {props.description && (
      <div className="text-sm font-medium text-muted-foreground">
        {props.description}
      </div>
    )}
  </div>
);
