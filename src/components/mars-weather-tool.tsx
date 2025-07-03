// src/components/mars-weather-tool.tsx
"use client";

import { useState } from "react";
import { Bot, Loader2, Sun, Thermometer, Wind } from "lucide-react";

import { analyzeMarsWeatherData } from "@/ai/flows/process-mars-weather";
import { type AnalyzeMarsWeatherDataOutput } from "@/ai/schemas";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

export default function MarsWeatherTool() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeMarsWeatherDataOutput | null>(null);

  async function handleAnalyze() {
    setLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeMarsWeatherData({});
      setResult(analysisResult);
      toast({
        title: "Mars Weather Loaded",
        description: "Latest InSight weather data processed.",
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Could not process Mars weather data.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 items-start">
        <div className="w-full flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-muted/20">
            <div className="space-y-2 flex-grow">
                <h3 className="font-semibold font-headline">Get Latest Mars Weather Report</h3>
                <p className="text-sm text-muted-foreground">
                    Click the button to fetch the latest weather data from the NASA InSight lander at Elysium Planitia. An AI will summarize the conditions.
                </p>
            </div>
            <Button onClick={handleAnalyze} disabled={loading} className="w-full sm:w-auto">
                {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                <Bot className="mr-2 h-4 w-4" />
                )}
                Analyze Mars Weather
            </Button>
        </div>

        <div className="w-full flex items-center justify-center min-h-[300px]">
            {loading && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
            {!loading && !result && (
            <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg w-full">
                <Bot className="mx-auto h-12 w-12" />
                <p className="mt-4 font-headline">Mars Weather Analysis will appear here</p>
                <p className="text-xs mt-2">Data is from the last 7 available Sols.</p>
            </div>
            )}
            {result && (
            <div className="w-full space-y-6 animate-in fade-in-50 slide-in-from-bottom-10 duration-500">
                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">AI Weather Summary</CardTitle>
                        <CardDescription>A brief overview of the conditions at Elysium Planitia.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-sm text-muted-foreground">{result.summary}</p>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {result.sols.map(sol => (
                        <Card key={sol.sol} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="font-headline flex justify-between items-baseline">
                                    <span>Sol {sol.sol}</span>
                                     <Badge variant="outline">{new Date(sol.terrestrialDate).toLocaleDateString()}</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm flex-grow">
                                {sol.minTemp !== undefined && (
                                    <div className="flex items-center gap-3">
                                        <Thermometer className="h-5 w-5 text-primary" />
                                        <div>
                                            <span className="font-semibold">Temperature</span>
                                            <p className="text-muted-foreground text-xs">
                                                Avg: {sol.avgTemp?.toFixed(1)}°C, Min: {sol.minTemp.toFixed(1)}°C, Max: {sol.maxTemp?.toFixed(1)}°C
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {sol.avgWindSpeed !== undefined && (
                                    <div className="flex items-center gap-3">
                                        <Wind className="h-5 w-5 text-primary" />
                                         <div>
                                            <span className="font-semibold">Wind Speed</span>
                                            <p className="text-muted-foreground text-xs">
                                                Avg: {sol.avgWindSpeed.toFixed(2)} m/s
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {sol.pressure !== undefined && (
                                    <div className="flex items-center gap-3">
                                         <Sun className="h-5 w-5 text-primary" />
                                         <div>
                                            <span className="font-semibold">Pressure</span>
                                            <p className="text-muted-foreground text-xs">
                                                Avg: {sol.pressure.toFixed(2)} Pa
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {sol.minTemp === undefined && sol.avgWindSpeed === undefined && sol.pressure === undefined && (
                                    <p className="text-muted-foreground text-sm">No sensor data available for this Sol.</p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
            )}
        </div>
    </div>
  );
}
