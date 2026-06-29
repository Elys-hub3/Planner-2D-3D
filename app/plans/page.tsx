import { Metadata } from 'next';
import DashboardLayout from '@/components/DashboardLayout';
import PlansGrid from '@/components/PlansGrid';

export const metadata: Metadata = {
  title: 'Mes projets | idées3D',
  description: 'Gérez tous vos projets de plans architecturaux.',
};

export default function PlansPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tous mes projets</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Gérez et organisez tous vos projets de plans architecturaux
            </p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <PlansGrid showAll={true} />
        </div>
      </div>
    </DashboardLayout>
  );
}