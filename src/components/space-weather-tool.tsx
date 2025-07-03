"use client";

import { useState } from "react";
import { Bot, Loader2 } from "lucide-react";

import { analyzeSpaceWeatherData } from "@/ai/flows/process-space-weather-data";
import { type AnalyzeSpaceWeatherDataOutput } from "@/ai/schemas";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

export default function SpaceWeatherTool() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeSpaceWeatherDataOutput | null>(null);

  async function handleAnalyze() {
    setLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeSpaceWeatherData({});
      setResult(analysisResult);
      toast({
        title: "Analysis Complete",
        description: "Recent space weather data processed successfully.",
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not process the space weather data.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-muted/20">
         <div className="space-y-2">
            <h3 className="font-semibold font-headline">Analyze Recent Space Weather</h3>
            <p className="text-sm text-muted-foreground">
                Click the button to fetch and analyze space weather data (CME, GST, FLR) from the last 3 days using the NASA DONKI API. The AI will provide a risk assessment based on the events.
            </p>
         </div>
          <Button onClick={handleAnalyze} disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Bot className="mr-2 h-4 w-4" />
            )}
            Analyze Last 3 Days
          </Button>
      </div>
      <div className="flex items-center justify-center min-h-[300px]">
        {loading && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
        {!loading && !result && (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg w-full">
            <Bot className="mx-auto h-12 w-12" />
            <p className="mt-4 font-headline">AI Analysis will appear here</p>
          </div>
        )}
        {result && (
          <Card className="w-full bg-muted/30">
            <CardHeader>
              <CardTitle className="font-headline text-primary">
                AI Analysis Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <p className="font-semibold text-lg">Event Counts (Last 3 Days)</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                    <Badge variant="secondary">CMEs: {result.cmeCount}</Badge>
                    <Badge variant="secondary">GSTs: {result.gstCount}</Badge>
                    <Badge variant="secondary">Flares: {result.flrCount}</Badge>
                </div>
              </div>
              <div>
                <p className="font-semibold text-lg">Risk Level</p>
                <Badge
                  variant={
                    result.riskLevel === "high"
                      ? "destructive"
                      : result.riskLevel === "moderate"
                      ? "secondary"
                      : "default"
                  }
                  className={result.riskLevel === "moderate" ? "bg-amber-500/80 text-black capitalize" : "capitalize"}
                >
                  {result.riskLevel}
                </Badge>
              </div>
              <div>
                <p className="font-semibold text-lg">Summary</p>
                <p className="text-sm text-muted-foreground">
                  {result.summary}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">Potentially Affected Satellites</p>
                {result.affectedSatellites.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {result.affectedSatellites.map((sat: string) => (
                        <li key={sat}>{sat}</li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">None specified in analysis.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
