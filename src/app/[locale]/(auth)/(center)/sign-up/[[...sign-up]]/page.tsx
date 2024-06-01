import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignUpPage = () => (
  // props: { params: { locale: string } }
  <div>
    <h1>Sign up page</h1>
  </div>
);

export default SignUpPage;
