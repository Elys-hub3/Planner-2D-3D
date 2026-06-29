import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Navigation />
      
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8">
              Créez vos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600">
                plans
              </span>{' '}
              facilement
            </h1>
            
            <p className="max-w-3xl mx-auto text-xl text-muted-foreground mb-12 leading-relaxed">
              Concevez et visualisez vos espaces architecturaux avec notre outil moderne et intuitif. 
              Commencez immédiatement ou créez un compte pour sauvegarder vos projets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/planner"
                className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Commencer maintenant
              </Link>
              <Link
                href="/register"
                className="btn-secondary text-lg px-8 py-4 hover:shadow-md transform hover:scale-105 transition-all duration-300"
              >
                Créer un compte gratuit
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-white/20">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accès immédiat</h3>
                <p className="text-muted-foreground">
                  Commencez à dessiner vos plans instantanément, sans inscription requise.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-white/20">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Interface moderne</h3>
                <p className="text-muted-foreground">
                  Outils intuitifs et interface élégante pour une expérience de conception optimale.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-white/20">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sauvegarde automatique</h3>
                <p className="text-muted-foreground">
                  Vos projets sont automatiquement sauvegardés. Créez un compte pour les retrouver partout.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="m-100 0h201v201h-201Z M699 0h201v201h-201Z M499 400h201v201h-201Z M-300 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
          </svg>
        </div>
      </main>
    </div>
  );
}
