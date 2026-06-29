import { Metadata } from 'next';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Mot de passe oublié | idées3D',
  description: 'Réinitialisez votre mot de passe idées3D en recevant un code de vérification par email.',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}