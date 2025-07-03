import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <SidebarTrigger />
          <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
            Settings
          </h1>
        </div>
      </header>
      <p className="text-muted-foreground">
        Customize your AstroScope experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="font-headline">Notification Preferences</CardTitle>
            <CardDescription>
              Manage how you receive alerts for high-risk events.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <Label htmlFor="high-risk-alerts" className="flex flex-col space-y-1">
                <span>High-Risk Alerts</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive notifications for critical conjunctions and storm impacts.
                </span>
              </Label>
              <Switch id="high-risk-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <Label htmlFor="moderate-risk-alerts" className="flex flex-col space-y-1">
                <span>Moderate-Risk Alerts</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Get alerts for events that may require monitoring.
                </span>
              </Label>
              <Switch id="moderate-risk-alerts" />
            </div>
             <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Email Notifications</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Send a summary of critical alerts to your email.
                </span>
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="font-headline">Display Settings</CardTitle>
            <CardDescription>
              Adjust the visualization and data display.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orbit-focus">Default Orbit Focus</Label>
              <Select defaultValue="leo">
                <SelectTrigger id="orbit-focus">
                  <SelectValue placeholder="Select orbit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leo">Low Earth Orbit (LEO)</SelectItem>
                  <SelectItem value="meo">Medium Earth Orbit (MEO)</SelectItem>
                  <SelectItem value="geo">Geostationary Orbit (GEO)</SelectItem>
                  <SelectItem value="all">All Orbits</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose the primary orbit to focus on when the dashboard loads.
              </p>
            </div>
             <div className="space-y-2">
              <Label htmlFor="map-type">Map Type</Label>
              <Select defaultValue="3d">
                <SelectTrigger id="map-type">
                  <SelectValue placeholder="Select map type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3d">3D Globe</SelectItem>
                  <SelectItem value="2d">2D Mercator</SelectItem>
                </SelectContent>
              </Select>
               <p className="text-sm text-muted-foreground">
                Select your preferred map visualization style.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
