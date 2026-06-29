'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlanTemplate, PLAN_TEMPLATES } from '@/lib/templates';

interface TemplateSelectorProps {
  isOpen: boolean;
  onSelect: (template: PlanTemplate) => void;
  onClose: () => void;
}

export default function TemplateSelector({ isOpen, onSelect, onClose }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('empty');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const template = PLAN_TEMPLATES.find(t => t.id === selectedTemplate);
    if (template) {
      onSelect(template);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Choisir un modèle de plan</h2>
              <p className="text-gray-600 mt-1">Sélectionnez un modèle pour commencer votre conception</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Template Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {PLAN_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'border-primary ring-2 ring-primary ring-opacity-20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                {/* Preview Image */}
                <div className="aspect-[3/2] bg-gray-50 flex items-center justify-center border-b border-gray-200 p-3">
                  <Image
                    src={template.preview}
                    alt={template.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Template Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{template.name}</h3>
                  <p className="text-xs text-gray-600">{template.description}</p>
                </div>

                {/* Selection Indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedTemplate === 'empty' && 'Commencez avec un canevas vierge'}
              {selectedTemplate === 'square' && 'Plan carré simple de 5m x 5m'}
              {selectedTemplate === 'rectangular' && 'Plan rectangulaire de 8m x 4m'}
              {selectedTemplate === 't-shape' && 'Layout en T avec couloir central'}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirm}
                className="btn-primary"
              >
                Commencer avec ce modèle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}