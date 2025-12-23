import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function LocaleSignUpRedirect({ params }: { params: { locale: string } }) {
  redirect('/sign-in');
}
