import { unstable_setRequestLocale } from 'next-intl/server';

const BlogPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="mt-4 text-muted-foreground">Content coming soon.</p>
    </div>
  );
};

export default BlogPage;
