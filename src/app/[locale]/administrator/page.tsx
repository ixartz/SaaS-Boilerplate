import { redirect } from 'next/navigation';

export default function AdministratorRedirect() {
  redirect('/dashboard/admin');
}
