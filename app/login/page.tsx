import { Metadata } from 'next';
import AuthForm from '@/components/AuthForm';

export const metadata: Metadata = {
  title: 'Connexion | idées3D',
  description: 'Connectez-vous à votre compte idées3D pour accéder à vos projets sauvegardés.',
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}