import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SharedPlanViewer from '@/components/SharedPlanViewer';

interface PageProps {
  params: Promise<{
    shareId: string;
  }>;
}

async function getSharedPlan(shareId: string) {
  try {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? process.env.NEXTAUTH_URL || 'https://app.idees3d.fr'
      : 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/shared/${shareId}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.plan;
  } catch (error) {
    console.error('Erreur lors du chargement du plan partagé:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const plan = await getSharedPlan(resolvedParams.shareId);

  if (!plan) {
    return {
      title: 'Plan non trouvé | idées3D',
      description: 'Ce plan n\'existe pas ou n\'est plus accessible.',
    };
  }

  return {
    title: `${plan.name} | Plan partagé - idées3D`,
    description: plan.description || `Plan architectural créé avec idées3D`,
    openGraph: {
      title: plan.name,
      description: plan.description || 'Plan architectural créé avec idées3D',
      images: plan.thumbnail ? [plan.thumbnail] : [],
    },
  };
}

export default async function SharedPlanPage({ params }: PageProps) {
  const resolvedParams = await params;
  const plan = await getSharedPlan(resolvedParams.shareId);

  if (!plan) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold text-primary">
                idées3D
              </Link>
              <div className="text-gray-300">|</div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{plan.name}</h1>
                {plan.description && (
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Par {plan.creatorName || 'Utilisateur'}
              </div>
              <Link
                href="/register"
                className="btn-primary"
              >
                Créer mon compte
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Plan Info */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-blue-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Plan en mode lecture seule</span>
            </div>
            <div className="text-sm text-blue-600">
              Créé le {new Date(plan.createdAt).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      </div>

      {/* Plan Viewer */}
      <main className="flex-1">
        <SharedPlanViewer plan={plan} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Créé avec idées3D - Planificateur architectural en ligne
            </div>
            <Link
              href="/register"
              className="text-sm text-primary hover:underline"
            >
              Créer vos propres plans gratuitement
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}