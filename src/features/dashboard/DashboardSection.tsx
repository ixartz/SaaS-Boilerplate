export const DashboardSection = (props: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-md bg-card p-5">
    <div className="max-w-3xl">
      <div className="text-lg font-semibold">{props.title}</div>

      <div className="mb-4 text-sm font-medium text-muted-foreground">
        {props.description}
      </div>

      {props.children}
    </div>
  </div>
);
