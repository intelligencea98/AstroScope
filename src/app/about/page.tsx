import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <SidebarTrigger className="md:hidden" />
          <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
            About OrbitalView
          </h1>
        </div>
      </header>
      <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="font-headline">Our Mission</CardTitle>
          <CardDescription>
            Monitoring the final frontier to protect critical satellite infrastructure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            OrbitalView is a next-generation space situational awareness dashboard designed to provide real-time insights into the dynamic and often hazardous environment of Earth's orbit. By aggregating and visualizing data on space debris and space weather, we aim to deliver actionable intelligence to satellite operators, researchers, and space enthusiasts.
          </p>
          <p>
            Our platform leverages cutting-edge AI to process complex datasets, identify potential threats, and generate timely alerts for high-risk events such as conjunctions between debris and satellites, or the impact of solar storms on orbital assets.
          </p>
        </CardContent>
      </Card>
       <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="font-headline">Data Sources & Credits</CardTitle>
          <CardDescription>
            This project is made possible by open data from leading space agencies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            We extend our gratitude to the following organizations for providing the public access to their invaluable data:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Celestrak:</strong> For providing comprehensive Two-Line Element (TLE) sets for tracking satellites and space debris.
            </li>
            <li>
              <strong>NASA DONKI (Database of Notifications, Knowledge, Information):</strong> For offering real-time data on space weather events including solar flares, coronal mass ejections (CMEs), and geomagnetic storms.
            </li>
             <li>
              <strong>Firebase & Google Cloud:</strong> For the powerful backend infrastructure and AI capabilities that power this application.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
