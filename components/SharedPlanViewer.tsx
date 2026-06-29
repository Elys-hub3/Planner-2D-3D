'use client';

import { useEffect, useRef } from 'react';

interface Plan {
  id: string;
  shareId: string;
  name: string;
  description?: string;
  planData: Record<string, unknown>;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  creatorName?: string;
}

interface SharedPlanViewerProps {
  plan: Plan;
}

export default function SharedPlanViewer({ plan }: SharedPlanViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIframeLoad = () => {
      if (iframeRef.current?.contentWindow) {
        // Charger le plan dans l'iframe immédiatement une fois qu'elle est prête
        // Utilisation d'un délai minimal pour s'assurer que l'iframe est prête
        setTimeout(() => {
          iframeRef.current?.contentWindow?.postMessage({
            type: 'LOAD_PLAN',
            data: plan.planData
          }, '*');
        }, 100);
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      return () => iframe.removeEventListener('load', handleIframeLoad);
    }
  }, [plan.planData]);

  return (
    <div className="h-[calc(100vh-200px)] w-full relative">
      {/* Loading overlay */}
      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du plan...</p>
        </div>
      </div>

      {/* Planner iframe */}
      <iframe
        ref={iframeRef}
        src="/planner/index.html"
        className="w-full h-full border-0 relative z-20"
        title={`Plan: ${plan.name}`}
        style={{
          background: 'white',
        }}
        onLoad={() => {
          // Hide loading overlay when iframe loads
          const loadingOverlay = document.querySelector('.absolute.inset-0.bg-gray-100') as HTMLElement;
          if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
          }
        }}
      />

      {/* Readonly overlay to prevent interactions */}
      <div className="absolute top-4 right-4 z-30">
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>Lecture seule</span>
        </div>
      </div>
    </div>
  );
}