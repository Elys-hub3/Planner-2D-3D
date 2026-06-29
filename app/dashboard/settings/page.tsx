'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/lib/auth/context';
import ConfirmModal from '@/components/ConfirmModal';
import { handleApiResponse } from '@/lib/api/utils';

export default function SettingsPage() {
  const { user, isLoading, refreshSession } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    onConfirm?: () => void;
  }>({
    title: '',
    message: '',
    type: 'info'
  });

  // Update form data when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const showErrorModal = (message: string) => {
    setModalConfig({
      title: 'Erreur',
      message,
      type: 'error'
    });
    setShowModal(true);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || formData.name.trim().length === 0) {
      showErrorModal('Veuillez saisir votre nom.');
      return;
    }

    if (formData.name.length > 100) {
      showErrorModal('Le nom est trop long (maximum 100 caractères).');
      return;
    }

    // Show loading modal
    setIsUpdating(true);
    setModalConfig({
      title: 'Mise à jour en cours',
      message: 'Veuillez patienter...',
      type: 'info'
    });
    setShowModal(true);

    try {
      console.log('📤 [FRONTEND] Sending update request:', {
        name: formData.name
      });

      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim()
        }),
      });

      console.log('📥 [FRONTEND] Response status:', response.status);

      // Use handleApiResponse to auto-logout on 401
      const data = await handleApiResponse(response);
      console.log('📥 [FRONTEND] Response data:', data);

      // Show success modal
      console.log('✅ [FRONTEND] Update successful!');

      // Refresh session to get updated user data
      await refreshSession();

      setIsUpdating(false);
      setModalConfig({
        title: 'Succès',
        message: 'Profil mis à jour avec succès!',
        type: 'success'
      });
      setIsEditing(false);
    } catch (error: unknown) {
      console.error('❌ [FRONTEND] Error updating profile:', error);
      setIsUpdating(false);
      setShowModal(false);

      // Don't show error if it's a session expiry (user already redirected)
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.';
      if (errorMessage !== 'Session expirée') {
        showErrorModal(errorMessage);
      }
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!passwordData.currentPassword) {
      showErrorModal('Veuillez saisir votre mot de passe actuel.');
      return;
    }

    if (!passwordData.newPassword) {
      showErrorModal('Veuillez saisir un nouveau mot de passe.');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showErrorModal('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showErrorModal('Les mots de passe ne correspondent pas.');
      return;
    }

    // Show loading modal
    setIsUpdating(true);
    setModalConfig({
      title: 'Changement en cours',
      message: 'Veuillez patienter...',
      type: 'info'
    });
    setShowModal(true);

    try {
      // Call API to change password
      const updateResponse = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      });

      // Check if it's a password validation error (not session expiry)
      if (updateResponse.status === 401) {
        const data = await updateResponse.json();
        if (data.error?.includes('incorrect')) {
          setIsUpdating(false);
          setShowModal(false);
          showErrorModal('Le mot de passe actuel est incorrect.');
          return;
        }
        // Otherwise it's a session expiry, let handleApiResponse handle it
      }

      // Use handleApiResponse to auto-logout on session expiry
      await handleApiResponse(updateResponse);

      setIsUpdating(false);
      setModalConfig({
        title: 'Succès',
        message: 'Mot de passe changé avec succès!',
        type: 'success'
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: unknown) {
      console.error('Error changing password:', error);
      setIsUpdating(false);
      setShowModal(false);
      // Don't show error if it's a session expiry (user already redirected)
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.';
      if (errorMessage !== 'Session expirée') {
        showErrorModal(errorMessage);
      }
    }
  };

  // Loading skeleton component
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="mt-2 h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Skeleton for Profile Section */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex justify-end pt-4">
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Skeleton for Password Section */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="flex justify-end pt-4">
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Paramètres du compte</h2>
          <p className="mt-1 text-sm text-gray-600">
            Gérez vos informations personnelles et vos préférences
          </p>
        </div>

        {/* Section Profil */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Informations du profil</h3>
          </div>
          <form onSubmit={handleProfileUpdate} className="px-6 py-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                disabled={true}
                className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="votre@email.com"
                readOnly
              />
              <p className="mt-1 text-xs text-gray-500">
                L&apos;email ne peut pas être modifié pour des raisons de sécurité
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user?.name || '', email: user?.email || '' });
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Enregistrer les modifications
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary"
                >
                  Modifier le profil
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Section Mot de passe */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Changer le mot de passe</h3>
          </div>
          <form onSubmit={handlePasswordChange} className="px-6 py-4 space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe actuel
              </label>
              <input
                type="password"
                id="currentPassword"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="input-field"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500">
                Au moins 8 caractères
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="btn-primary"
              >
                Changer le mot de passe
              </button>
            </div>
          </form>
        </div>

        {/* Section Danger Zone */}
        <div className="bg-white shadow-sm rounded-lg border border-red-200">
          <div className="px-6 py-4 border-b border-red-200">
            <h3 className="text-lg font-semibold text-red-900">Zone de danger</h3>
          </div>
          <div className="px-6 py-4">
            <p className="text-sm text-gray-600 mb-4">
              La suppression de votre compte est permanente et irréversible. Tous vos projets seront supprimés.
            </p>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => {
                if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                  // TODO: Implémenter la suppression du compte
                  alert('Fonctionnalité de suppression de compte à venir');
                }
              }}
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>

      {/* Success/Error Modal */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => {
          if (!isUpdating) {
            setShowModal(false);
          }
        }}
        onConfirm={() => {
          if (isUpdating) return; // Prevent closing during update
          if (modalConfig.onConfirm) {
            modalConfig.onConfirm();
          }
          setShowModal(false);
        }}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText={isUpdating ? '' : 'OK'}
        cancelText=""
      />
    </DashboardLayout>
  );
}
