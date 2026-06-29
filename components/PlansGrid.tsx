'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Plan {
  id: string;
  shareId: string;
  name: string;
  description?: string;
  thumbnail?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PlansGridProps {
  showAll?: boolean;
  limit?: number;
}

export default function PlansGrid({ showAll = false, limit = 6 }: PlansGridProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      if (response.status === 401) {
        // User not authenticated - just show empty state, no error
        setPlans([]);
        setLoading(false);
        return;
      }
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des plans');
      }
      const data = await response.json();
      setPlans(data.plans);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (planId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce plan ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/plans/${planId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setPlans(plans.filter(plan => plan.id !== planId));
    } catch (err) {
      alert('Erreur lors de la suppression du plan');
      console.error(err);
    }
  };

  const togglePublic = async (planId: string, currentPublic: boolean) => {
    try {
      const plan = plans.find(p => p.id === planId);
      if (!plan) return;

      const response = await fetch(`/api/plans/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...plan,
          isPublic: !currentPublic,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      setPlans(plans.map(p =>
        p.id === planId ? { ...p, isPublic: !currentPublic } : p
      ));
    } catch (err) {
      alert('Erreur lors de la mise à jour du plan');
      console.error(err);
    }
  };

  const copyShareLink = (shareId: string) => {
    const shareUrl = `${window.location.origin}/shared/${shareId}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Lien de partage copié dans le presse-papiers !');
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchPlans}
          className="btn-primary mt-4"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h4 className="mt-4 text-lg font-semibold text-gray-900">Aucun plan pour le moment</h4>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Vous n&apos;avez pas encore créé de projet. Commencez dès maintenant à concevoir vos premiers plans.
        </p>
        <div className="mt-6">
          <Link href="/planner" className="btn-primary">
            Créer mon premier projet
          </Link>
        </div>
      </div>
    );
  }

  // Filter plans based on showAll prop
  const displayedPlans = showAll ? plans : plans.slice(0, limit);
  const hasMorePlans = !showAll && plans.length > limit;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedPlans.map((plan) => (
        <div key={plan.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          {/* Thumbnail */}
          <div className="aspect-video bg-gray-100 relative">
            {plan.thumbnail ? (
              <Image
                src={plan.thumbnail}
                alt={plan.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            )}
            {/* Public Badge */}
            {plan.isPublic && (
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                Public
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-1">{plan.name}</h3>
            {plan.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {plan.description}
              </p>
            )}
            <div className="text-xs text-muted-foreground mb-4 space-y-1">
              <p>
                Créé le {new Date(plan.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })} à {new Date(plan.createdAt).toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p>
                Modifié le {new Date(plan.updatedAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })} à {new Date(plan.updatedAt).toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/planner?planId=${plan.id}`}
                className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary/90"
              >
                Ouvrir
              </Link>

              <button
                onClick={() => togglePublic(plan.id, plan.isPublic)}
                className={`text-xs px-3 py-1 rounded ${
                  plan.isPublic
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {plan.isPublic ? 'Privé' : 'Public'}
              </button>

              {plan.isPublic && (
                <button
                  onClick={() => copyShareLink(plan.shareId)}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                >
                  Copier lien
                </button>
              )}

              <button
                onClick={() => deletePlan(plan.id)}
                className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>

      {/* Show "View All" link if there are more plans */}
      {hasMorePlans && (
        <div className="text-center">
          <Link
            href="/plans"
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Voir tous mes projets ({plans.length})
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}