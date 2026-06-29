import { Metadata } from 'next';
import AuthForm from '@/components/AuthForm';

export const metadata: Metadata = {
  title: 'Inscription | idées3D',
  description: 'Créez votre compte idées3D gratuitement et commencez à sauvegarder vos projets de plans.',
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}