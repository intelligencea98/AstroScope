import SpaceWeatherTool from "@/components/space-weather-tool";
import TleTool from "@/components/tle-tool";
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
    <div className="flex flex-col gap-6">
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="space-weather">Space Weather Analysis</TabsTrigger>
          <TabsTrigger value="tle-data">TLE Data Processing</TabsTrigger>
        </TabsList>
        <TabsContent value="space-weather">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Space Weather Analysis</CardTitle>
              <CardDescription>
                Input raw data from NASA DONKI to get an AI-powered risk assessment for satellites.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SpaceWeatherTool />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tle-data">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">TLE Data Processing</CardTitle>
              <CardDescription>
                Paste Two-Line Element (TLE) data to extract orbital position information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TleTool />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
