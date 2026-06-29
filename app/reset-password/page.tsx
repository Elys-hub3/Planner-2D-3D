import { Metadata } from 'next';
import ResetPasswordForm from '@/components/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Réinitialiser le mot de passe | idées3D',
  description: 'Saisissez votre code de vérification et votre nouveau mot de passe pour réinitialiser votre compte idées3D.',
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}