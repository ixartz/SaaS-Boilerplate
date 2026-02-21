import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

const SignInPage = () => (
  <SignIn path="/sign-in" />
);

export default SignInPage;
