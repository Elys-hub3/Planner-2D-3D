'use client';

import { useEffect, useState, useCallback, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import TemplateSelector from '@/components/TemplateSelector';
import ConfirmModal from '@/components/ConfirmModal';
import PlanNameModal from '@/components/PlanNameModal';
import { PlanTemplate } from '@/lib/templates';

import PlannerHeader from '@/components/planner/layout/PlannerHeader';
import PlannerSidebar from '@/components/planner/layout/PlannerSidebar';
import PlannerRightPanel from '@/components/planner/layout/PlannerRightPanel';
import PlannerBottomBar from '@/components/planner/layout/PlannerBottomBar';

import PlannerCanvas from '@/components/planner/canvas/PlannerCanvas';

import MainToolbar from '@/components/planner/toolbar/MainToolbar';
import MobileToolbar from '@/components/planner/toolbar/MobileToolbar';

import ZoomControlPlus from '@/components/planner/controls/ZoomControlPlus';
import ZoomControlMoins from '@/components/planner/controls/ZoomControlMoins';
import SnapControls from '@/components/planner/controls/SnapControls';
import CameraControls from '@/components/planner/controls/CameraControls';
import ReturnControls from '@/components/planner/controls/ReturnControls';
import ViewModeControls from '@/components/planner/controls/ViewModeControls';
import CenterCameraControls from '@/components/planner/controls/CenterCameraControls';
import ObjectLibraryPanel from '@/components/planner/panels/ObjectLibraryPanel';
import {usePlannerStore} from '@/store/planner.store';
import { useResponsive } from '@/hooks/useResponsive';
import {
  PlannerService,
} from '@/services/planner.service'
import {
  ExportService,
} from '@/services/export.service'
import MobileControls from '@/components/planner/controls/MobileControls';
import RedoControls from '@/components/planner/controls/RedoControls';

function PlannerContent() {
  const [referrer, setReferrer] = useState('/');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<PlanTemplate | null>(null);

  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPlanNameModal, setShowPlanNameModal] = useState(false);
  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
    type: 'info' | 'warning' | 'error' | 'success';
  }>({
    title: '',
    message: '',
    onConfirm: () => { },
    type: 'info'
  });

  // Plan data
  const [currentPlanName, setCurrentPlanName] = useState('');
  const [pendingSaveData, setPendingSaveData] = useState<{
    planId?: string;
    isUpdate: boolean;
    planData: Record<string, unknown>;
  } | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');

  // Helper functions for modals
  const showModal = useCallback((config: typeof confirmModalConfig) => {
    setConfirmModalConfig(config);
    setShowConfirmModal(true);
  }, []);

  const showSuccess = useCallback((message: string) => {
    showModal({
      title: 'Succès',
      message,
      onConfirm: () => { },
      type: 'success'
    });
  }, [showModal]);

  const showError = useCallback((message: string) => {
    showModal({
      title: 'Erreur',
      message,
      onConfirm: () => { },
      type: 'error'
    });
  }, [showModal]);

  const showConfirm = useCallback((title: string, message: string, onConfirm: () => void) => {
    showModal({
      title,
      message,
      onConfirm,
      type: 'warning'
    });
  }, [showModal]);

  const [viewMode, setViewMode] =
  useState<'2D' | '3D'>('2D');
  

  const [objectLibraryOpen, setObjectLibraryOpen] =
  useState(false);
  
  const { isMobile } = useResponsive();

  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user is authenticated and set referrer
    const checkAuthAndSetReferrer = async () => {
      try {
        const response = await fetch('/api/auth/get-session');
        const session = await response.json();

        // If user is authenticated, always redirect to dashboard
        if (session?.user) {
          setReferrer('/dashboard');
        } else {
          // For guests, check referrer
          const ref = document.referrer;
          if (ref.includes('/dashboard')) {
            setReferrer('/dashboard');
          } else {
            setReferrer('/');
          }
        }
      } catch {
        // If error checking auth, use referrer logic
        const ref = document.referrer;
        if (ref.includes('/dashboard')) {
          setReferrer('/dashboard');
        } else {
          setReferrer('/');
        }
      }
    };

    checkAuthAndSetReferrer();

    // Listen for postMessage from planner iframe
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'CHECK_AUTH_STATUS') {
        // Vérifier le statut d'authentification
        try {
          const response = await fetch('/api/auth/get-session');
          const session = await response.json();

          (event.source as Window)?.postMessage({
            type: 'AUTH_STATUS_RESPONSE',
            isAuthenticated: !!session?.user
          }, '*');
        } catch {
          (event.source as Window)?.postMessage({
            type: 'AUTH_STATUS_RESPONSE',
            isAuthenticated: false
          }, '*');
        }
      }

      if (event.data.type === 'REQUIRE_AUTH') {
        // Utilisateur non connecté - proposer de se connecter
        showConfirm(
          'Connexion requise',
          event.data.message + '\n\nVoulez-vous créer un compte maintenant ?',
          () => router.push('/register')
        );
      }

      if (event.data.type === 'REQUEST_SAVED_PLAN') {
        // Demande du plan sauvegardé (spécifique seulement)
        console.log('📨 Planner requested plan, planId:', planId);

        // Only load from database if there's a specific planId
        if (planId) {
          try {
            const apiUrl = `/api/plans/${planId}`;
            console.log('🎯 Fetching specific plan from:', apiUrl);

            const response = await fetch(apiUrl);

            if (response.ok) {
              const data = await response.json();
              console.log('📦 API response data:', data);
              const planToLoad = data.plan;

              if (planToLoad) {
                console.log('🎯 Plan spécifique envoyé au planner:', planToLoad.name, '(ID:', planId, ')');

                // Set the plan name for header display
                setCurrentPlanName(planToLoad.name || `Plan ${planId}`);

                (event.source as Window)?.postMessage({
                  type: 'LOAD_PLAN_RESPONSE',
                  planData: planToLoad.planData,
                  hasSpecificPlanId: true
                }, '*');
              } else {
                console.log('❌ Specific plan not found in response for ID:', planId);
                (event.source as Window)?.postMessage({
                  type: 'LOAD_PLAN_RESPONSE',
                  planData: null,
                  hasSpecificPlanId: true
                }, '*');
              }
            } else {
              console.log('❌ API request failed with status:', response.status);
              (event.source as Window)?.postMessage({
                type: 'LOAD_PLAN_RESPONSE',
                planData: null,
                hasSpecificPlanId: true
              }, '*');
            }
          } catch (error) {
            console.error('❌ Erreur chargement plan:', error);
            (event.source as Window)?.postMessage({
              type: 'LOAD_PLAN_RESPONSE',
              planData: null,
              hasSpecificPlanId: true
            }, '*');
          }
        } else {
          // No planId - this is a new plan, don't load anything from database
          console.log('✨ New plan - no database loading, templates will be shown');
          setCurrentPlanName('');
          (event.source as Window)?.postMessage({
            type: 'LOAD_PLAN_RESPONSE',
            planData: null,
            hasSpecificPlanId: false
          }, '*');
        }
      }

      if (event.data.type === 'REQUEST_CURRENT_PLAN_ID') {
        // Send back the current planId if we're editing an existing plan
        (event.source as Window)?.postMessage({
          type: 'CURRENT_PLAN_ID_RESPONSE',
          planId: planId || null
        }, '*');
      }

      if (event.data.type === 'SAVE_PLAN') {
        const { planId: existingPlanId, isUpdate, planData } = event.data.data;

        if (isUpdate && existingPlanId) {
          // For updates, save directly without asking for name
          try {
            const response = await fetch(`/api/plans/${existingPlanId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ planData }),
            });

            if (response.ok) {
              const result = await response.json();
              console.log('✅ Plan mis à jour:', result.plan);
              showSuccess('Plan mis à jour avec succès!');
            } else if (response.status === 401) {
              showConfirm(
                'Compte requis',
                'Pour sauvegarder vos plans, vous devez créer un compte.\n\nVoulez-vous créer un compte maintenant?',
                () => router.push('/register')
              );
            } else {
              console.error('❌ Erreur sauvegarde:', response.statusText);
              showError('Erreur lors de la sauvegarde du plan');
            }
          } catch (error) {
            console.error('❌ Erreur sauvegarde:', error);
            showError('Erreur lors de la sauvegarde du plan');
          }
        } else {
          // For new plans, ask for name first
          setPendingSaveData({ planId: existingPlanId, isUpdate: false, planData });
          setShowPlanNameModal(true);
        }
      }

      if (event.data.type === 'AUTO_SAVE_PLAN') {
        // Sauvegarde automatique silencieuse (si activée)
        try {
          const response = await fetch('/api/plans', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: `Plan auto-sauvegardé ${new Date().toLocaleDateString('fr-FR')}`,
              planData: event.data.data.planData
            }),
          });

          if (response.ok) {
            console.log('🔄 Plan auto-sauvegardé en arrière-plan');
          }
        } catch (error) {
          console.error('❌ Erreur auto-sauvegarde:', error);
        }
      }

      if (event.data.type === 'AUTO_SAVE_EXISTING_PLAN') {
        // Auto-save for existing plans (silent update)
        if (planId) {
          try {
            const response = await fetch(`/api/plans/${planId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                planData: event.data.data.planData
              }),
            });

            if (response.ok) {
              console.log('🔄 Plan existant auto-sauvegardé en arrière-plan');
            } else {
              console.error('❌ Erreur auto-sauvegarde plan existant:', response.statusText);
            }
          } catch (error) {
            console.error('❌ Erreur auto-sauvegarde plan existant:', error);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [router, planId, showConfirm, showError, showSuccess]);

  // Load specific plan if planId is provided
  useEffect(() => {
    console.log('🔍 Debug: planId =', planId, 'iframeLoaded =', iframeLoaded);

    if (planId) {
      console.log('🚀 Attempting to load plan:', planId);

      const loadPlan = async () => {
        try {
          console.log('📡 Fetching plan from API...');
          const response = await fetch(`/api/plans/${planId}`);
          console.log('📨 Response status:', response.status);

          if (response.ok) {
            const data = await response.json();
            console.log('📦 Plan data received:', data);

            // Set the plan name for header display
            setCurrentPlanName(data.plan.name || `Plan ${planId}`);

            // Wait a bit for iframe to be ready, then send plan data
            const sendToIframe = () => {
              const iframe = document.querySelector('iframe');
              console.log('🖼️ Iframe found:', !!iframe);

              if (iframe?.contentWindow) {
                iframe.contentWindow.postMessage({
                  type: 'LOAD_PLAN',
                  data: data.plan.planData
                }, '*');
                console.log('✅ Plan chargé:', data.plan.name);
              } else {
                console.log('⏳ Iframe not ready, retrying...');
                setTimeout(sendToIframe, 500);
              }
            };

            // Try immediately, then with delays
            setTimeout(sendToIframe, 1000);
            setTimeout(sendToIframe, 2000);
            setTimeout(sendToIframe, 3000);

          } else {
            // Handle different error cases with user-friendly messages
            if (response.status === 404) {
              showError('Ce plan n\'existe pas ou a été supprimé.');
              router.push('/dashboard');
            } else if (response.status === 401) {
              showError('Vous devez être connecté pour accéder à ce plan.');
              router.push('/login');
            } else if (response.status === 403) {
              showError('Vous n\'avez pas l\'autorisation d\'accéder à ce plan.');
              router.push('/dashboard');
            } else {
              showError('Erreur lors du chargement du plan. Veuillez réessayer.');
              console.log('❌ Response not ok:', response.status, response.statusText);
            }
          }
        } catch (error) {
          showError('Erreur de connexion. Veuillez vérifier votre connexion internet.');
          console.error('❌ Erreur lors du chargement du plan:', error);
        }
      };

      loadPlan();
    }
  }, [planId, router, showError]);

  // Show template selector for new plans (no planId)
  useEffect(() => {
    if (!planId && !selectedTemplate) {
      setShowTemplateSelector(true);
    }
  }, [planId, selectedTemplate]);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(
          event.target as Node
        )
      ) {
        setObjectLibraryOpen(false)
      }
    }
  
    document.addEventListener(
      "mousedown",
      handleClickOutside
    )
  
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
  }, [])
  
  const loadTemplate = usePlannerStore((state) => state.loadTemplate);

  // Handle template selection
  const handleTemplateSelect = (template: PlanTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateSelector(false);
    
    loadTemplate(template.planData);

    // Send template data to iframe
    const iframe = document.querySelector('iframe');
    if (iframe?.contentWindow && template.planData) {
      setTimeout(() => {
        iframe.contentWindow?.postMessage({
          type: 'LOAD_PLAN',
          data: template.planData
        }, '*');
        console.log('✅ Template loaded:', template.name);
      }, 500);
    }
  };

  const handleTemplateClose = () => {
    // User chose to close without selecting - default to empty plan
    setShowTemplateSelector(false);
    setSelectedTemplate({ id: 'empty', name: 'Plan Vierge', description: '', preview: '', planData: null });
  };

  const handleCapture = async () => {

    const canvas =
      document.querySelector("canvas")
  
    if (!canvas) return
  
    const url =
      canvas.toDataURL("image/png")
  
    const link =
      document.createElement("a")
  
    link.href = url
  
    link.download =
      `plan-${Date.now()}.png`
  
    link.click()
  }

  const handleLogout = () => {

    localStorage.clear()
  
    sessionStorage.clear()
  
    router.push("/login")
  }

  function savePlan(): void {
    PlannerService.save();
  }

  function exportPlan(): void {
    ExportService.exportJSON();
  }

  return (
    <main className="flex flex-col h-screen">
      {/* Header */}
      {/*<div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex justify-between items-center">
          <Link href={referrer} className="text-primary hover:underline text-sm">
            ← {referrer === '/dashboard' ? 'Retour au tableau de bord' : 'Retour à l\'accueil'}
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">
            Planificateur 3D {currentPlanName ? `- ${currentPlanName}` : planId ? `(Plan: ${planId})` : '(Nouveau)'}
          </h1>
          <div></div>
        </div>
      </div>*/}
      {/*
      {/* HEADER */}
      <PlannerHeader
         onHome={() => router.push(referrer)}
         onSave={() => savePlan()}
         onExport={() => exportPlan()}
      />

      {/* CONTENT */}
      <section className="flex-1 flex overflow-hidden relative">
        {/* SIDEBAR */}
        <PlannerSidebar
          addOpen={objectLibraryOpen}
          onAdd={() =>
            setObjectLibraryOpen(
              !objectLibraryOpen
            )
          }
          onCapture={handleCapture}
          onSettings={() => {}}
          onLogout={handleLogout}
        />
  
        {/*{objectLibraryOpen && (
          <ObjectLibraryPanel />
        )}*/}
        {objectLibraryOpen && (
          <div ref={panelRef}>
            <ObjectLibraryPanel
              onSelect={() =>
                setObjectLibraryOpen(false)
              }
             />
          </div>
        )}

        {/* CANVAS */}
        <div className="flex-1 relative bg-zinc-200 overflow-hidden">
          {/* TOP TOOLBAR */}
          <MainToolbar />
          
          {/* Canvas */}
          <PlannerCanvas viewMode={viewMode} />

          {/* CONTROLS */}
          {/* Desktop */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
            {!isMobile && (
            <ViewModeControls
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
            )}
            {!isMobile && (
            <ZoomControlPlus />
             )}
             {!isMobile && (
            <ZoomControlMoins />
             )}
            {/* <SnapControls /> */}

            {/* <CameraControls /> */}
             {!isMobile && (
            <ReturnControls />
            )}
            {!isMobile && (
            <RedoControls />
            )}
             {!isMobile && (
            <CenterCameraControls />
            )}
          </div> 
          {/* Mobile */}
          <MobileControls
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

      {/* Planner iframe */}
      {/* <iframe
        src="/planner/index.html"
        className="w-full border-0"
        style={{ height: 'calc(100svh - 42px)' }}
        title="Planificateur 3D idées3D"
        onLoad={() => setIframeLoaded(true)}
      />*/}
      </div> 
            
        {/* RIGHT PANEL */}
        <PlannerRightPanel />
      </section>

      {/* FOOTER */}
      <div className="shrink-0">
        {!isMobile && (
        <PlannerBottomBar />
        )}
      </div>

      {/* MOBILE */}
      <MobileToolbar />

      {/* Template Selector Modal */}
      <TemplateSelector
        isOpen={showTemplateSelector}
        onSelect={handleTemplateSelect}
        onClose={handleTemplateClose}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmModalConfig.onConfirm}
        title={confirmModalConfig.title}
        message={confirmModalConfig.message}
        type={confirmModalConfig.type}
        confirmText="Retour au tableau de bord"
        cancelText="Rester sur le projet"
      />

      {/* Plan Name Modal */}
      <PlanNameModal
        isOpen={showPlanNameModal}
        onClose={() => setShowPlanNameModal(false)}
        onSave={async (name) => {
          if (pendingSaveData) {
            const { planData } = pendingSaveData;

            try {
              const response = await fetch('/api/plans', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, planData }),
              });

              if (response.ok) {
                const result = await response.json();
                console.log('✅ Plan sauvegardé:', result.plan);
                setConfirmModalConfig({
                  title: 'Plan sauvegardé',
                  message: 'Plan sauvegardé avec succès! Voulez-vous retourner au tableau de bord?',
                  onConfirm: () => router.push('/dashboard'),
                  type: 'success'
                });
                setShowConfirmModal(true);
              } else if (response.status === 401) {
                showConfirm(
                  'Compte requis',
                  'Pour sauvegarder vos plans, vous devez créer un compte.\n\nVoulez-vous créer un compte maintenant?',
                  () => router.push('/register')
                );
              } else {
                console.error('❌ Erreur sauvegarde:', response.statusText);
                showError('Erreur lors de la sauvegarde du plan');
              }
            } catch (error) {
              console.error('❌ Erreur sauvegarde:', error);
              showError('Erreur lors de la sauvegarde du plan');
            }

            setPendingSaveData(null);
          }
          setShowPlanNameModal(false);
        }}
        currentName={currentPlanName}
        isUpdate={!!pendingSaveData?.isUpdate}
      />
    </main>
  );
}

export default function PlannerPage() {
  return (
    <Suspense fallback={<div>Loading planner...</div>}>
      <PlannerContent />
    </Suspense>
  );
}
