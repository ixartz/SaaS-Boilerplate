import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function LocaleSignInRedirect({ params }: { params: { locale: string } }) {
  redirect('/sign-in'); // usa página única
}
