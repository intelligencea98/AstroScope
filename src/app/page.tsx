import AlertBanner from '@/components/alert-banner';
import OrbitalMap from '@/components/orbital-map';
import RiskPanel from '@/components/risk-panel';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { getApod } from '@/services/nasa-donki';

export default async function DashboardPage() {
  const apodData = await getApod().catch(err => {
    console.error("Failed to fetch APOD:", err);
    return null;
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <SidebarTrigger className="md:hidden" />
          <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
        </div>
      </header>

      <AlertBanner />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrbitalMap data={apodData} />
        </div>
        <div className="lg:col-span-1">
          <RiskPanel />
        </div>
      </div>
    </div>
  );
}
