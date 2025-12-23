import { redirect } from 'next/navigation';

export default function SignUpRedirect() {
  // Redireciona sempre para a tela de login única
  redirect('/sign-in');
}
