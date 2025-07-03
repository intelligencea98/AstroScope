import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Satellite, Trash2, Users, Zap } from "lucide-react";

const stats = [
  {
    name: "Tracked Debris",
    value: "27,000+",
    icon: Trash2,
    color: "text-blue-400",
  },
  {
    name: "Storm Intensity",
    value: "High",
    icon: Zap,
    color: "text-red-400",
  },
  {
    name: "Satellites at Risk",
    value: "142",
    icon: Users,
    color: "text-amber-400",
  },
];

const atRiskSatellites = [
  { name: "ISS (ZARYA)", risk: "High", type: "Station" },
  { name: "STARLINK-3011", risk: "Moderate", type: "Comms" },
  { name: "NOAA 19", risk: "Moderate", type: "Weather" },
  { name: "GPS BIIR-7 (PRN 17)", risk: "Low", type: "Nav" },
  { name: "HUBBLE SPACE TELESCOPE", risk: "Low", type: "Science" },
];

export default function RiskPanel() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Current Risk Statistics</CardTitle>
          <CardDescription>Real-time threat analysis</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="p-4 rounded-lg bg-muted/50 flex flex-col items-center text-center lg:items-start lg:flex-row lg:text-left gap-4"
            >
              <stat.icon className={`h-8 w-8 shrink-0 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold font-headline">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Key Satellites at Risk</CardTitle>
          <CardDescription>Prioritized list of vulnerable assets</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {atRiskSatellites.map((sat, index) => (
              <li key={sat.name} className="flex items-center gap-4">
                <Satellite className="h-6 w-6 text-muted-foreground" />
                <div className="flex-grow">
                  <p className="font-semibold leading-tight">{sat.name}</p>
                  <p className="text-xs text-muted-foreground">{sat.type}</p>
                </div>
                <Badge
                  variant={
                    sat.risk === "High"
                      ? "destructive"
                      : sat.risk === "Moderate"
                      ? "secondary" // This will be yellow-ish with our theme
                      : "outline"
                  }
                  className={sat.risk === "Moderate" ? "bg-amber-500/80 text-black" : ""}
                >
                  {sat.risk}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
