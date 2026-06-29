'use client';

import { useState } from 'react';
import Modal from './Modal';

interface PlanNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  currentName?: string;
  isUpdate?: boolean;
}

export default function PlanNameModal({
  isOpen,
  onClose,
  onSave,
  currentName = '',
  isUpdate = false
}: PlanNameModalProps) {
  const [planName, setPlanName] = useState(currentName);
  const [error, setError] = useState('');

  const handleSave = () => {
    const trimmedName = planName.trim();

    if (!trimmedName) {
      setError('Le nom du plan est requis');
      return;
    }

    if (trimmedName.length < 2) {
      setError('Le nom doit contenir au moins 2 caractères');
      return;
    }

    if (trimmedName.length > 50) {
      setError('Le nom ne peut pas dépasser 50 caractères');
      return;
    }

    onSave(trimmedName);
    setPlanName('');
    setError('');
  };

  const handleClose = () => {
    setPlanName(currentName);
    setError('');
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isUpdate ? 'Renommer le plan' : 'Nommer votre plan'}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="planName" className="block text-sm font-medium text-gray-700 mb-2">
            Nom du plan
          </label>
          <input
            id="planName"
            type="text"
            value={planName}
            onChange={(e) => {
              setPlanName(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Ex: Salon avec cuisine ouverte"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="btn-primary"
          >
            {isUpdate ? 'Renommer' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </Modal>
  );
}