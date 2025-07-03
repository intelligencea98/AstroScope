import SpaceWeatherTool from "@/components/space-weather-tool";
import TleTool from "@/components/tle-tool";
import NeoTool from "@/components/neo-tool";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function ToolsPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
         <div className="flex items-center gap-2">
           <SidebarTrigger className="md:hidden" />
          <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
            AI Tools
          </h1>
        </div>
      </header>
      <p className="text-muted-foreground">
        Leverage GenAI to process and analyze complex space data.
      </p>

      <Tabs defaultValue="space-weather" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="space-weather">Space Weather</TabsTrigger>
          <TabsTrigger value="tle-data">TLE Data</TabsTrigger>
          <TabsTrigger value="neo-data">NEO Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="space-weather" className="animate-in fade-in-50 duration-500">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Space Weather Analysis</CardTitle>
              <CardDescription>
                Get an AI-powered risk assessment for satellites based on recent NASA DONKI data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SpaceWeatherTool />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tle-data" className="animate-in fade-in-50 duration-500">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">TLE Data Processing</CardTitle>
              <CardDescription>
                Fetch TLE data from Celestrak for a group of satellites and let an AI process it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TleTool />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="neo-data" className="animate-in fade-in-50 duration-500">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Near Earth Object (NEO) Analysis</CardTitle>
              <CardDescription>
                Analyze asteroids and comets that have a close approach to Earth within a date range.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NeoTool />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
