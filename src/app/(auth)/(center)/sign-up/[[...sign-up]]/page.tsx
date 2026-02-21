import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign Up',
  description: 'Create an account to get started',
};

const SignUpPage = () => (
  <SignUp path="/sign-up" />
);

export default SignUpPage;
