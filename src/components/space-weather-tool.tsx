"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bot, Loader2 } from "lucide-react";

import {
  analyzeSpaceWeatherData,
  AnalyzeSpaceWeatherDataInput,
} from "@/ai/flows/process-space-weather-data";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

const formSchema = AnalyzeSpaceWeatherDataInput;

const defaultFlareData = `[
  {
    "flrID": "2024-05-14T09:31:00-FLR-001",
    "beginTime": "2024-05-14T09:20Z",
    "peakTime": "2024-05-14T09:31Z",
    "classType": "X1.7",
    "sourceLocation": "S18W89",
    "activeRegionNum": 13663
  }
]`;

const defaultCMEData = `[
  {
    "activityID": "2024-05-14T11:36:00-CME-001",
    "startTime": "2024-05-14T11:36Z",
    "type": "C",
    "speed": 1200,
    "isMostAccurate": true
  }
]`;

const defaultStormData = `[
  {
    "gstID": "2024-05-14T18:00:00-GST-001",
    "startTime": "2024-05-14T18:00Z",
    "allKpIndex": [
      { "observedTime": "2024-05-14T18:00Z", "kpIndex": 7 }
    ]
  }
]`;


export default function SpaceWeatherTool() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const form = useForm<AnalyzeSpaceWeatherDataInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      solarFlareData: defaultFlareData,
      cmeData: defaultCMEData,
      geomagneticStormData: defaultStormData,
    },
  });

  async function onSubmit(values: AnalyzeSpaceWeatherDataInput) {
    setLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeSpaceWeatherData(values);
      setResult(analysisResult);
      toast({
        title: "Analysis Complete",
        description: "Space weather data processed successfully.",
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="solarFlareData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solar Flare Data (JSON)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste solar flare data here"
                    className="h-32 font-code text-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cmeData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CME Data (JSON)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste CME data here"
                    className="h-32 font-code text-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="geomagneticStormData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Geomagnetic Storm Data (JSON)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste geomagnetic storm data here"
                    className="h-32 font-code text-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Bot className="mr-2 h-4 w-4" />
            )}
            Analyze Weather Data
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        {loading && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
        {!loading && !result && (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
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
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {result.affectedSatellites.map((sat: string) => (
                    <li key={sat}>{sat}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
