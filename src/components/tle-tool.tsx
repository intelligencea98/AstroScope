"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bot, Loader2 } from "lucide-react";

import { processTleData } from "@/ai/flows/process-tle-data";
import {
  ProcessTleDataInputSchema,
  type ProcessTleDataInput,
  type ProcessTleDataOutput,
} from "@/ai/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";


const formSchema = ProcessTleDataInputSchema;

const tleGroups = [
    { value: 'active', label: 'Active Satellites' },
    { value: 'stations', label: 'Space Stations' },
    { value: 'gps-ops', label: 'GPS Operational' },
    { value: 'glo-ops', label: 'GLONASS Operational' },
    { value: 'galileo', label: 'Galileo' },
    { value: 'beidou', label: 'BeiDou' },
    { value: 'starlink', label: 'Starlink' },
    { value: 'spire', label: 'Spire' },
    { value: 'planet', label: 'Planet' },
    { value: 'ses', label: 'SES' },
    { value: 'iridium-next', label: 'Iridium NEXT' },
    { value: 'orbcomm', label: 'Orbcomm' },
    { value: 'noaa', label: 'NOAA Weather' },
    { value: 'goes', label: 'GOES Weather' },
    { value: 'resource', label: 'Earth Resources' },
    { value: 'sarsat', label: 'Search & Rescue (SARSAT)' },
    { value: 'tdrss', label: 'TDRSS' },
    { value: 'argos', label: 'ARGOS' },
    { value: 'last-30-days', label: 'Last 30 Days Launches' },
    { value: '1999-025', label: 'Debris from Cosmos 2251 Collision' },
    { value: '2012-044', label: 'Debris from Breeze-M Breakup' },
];


export default function TleTool() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProcessTleDataOutput | null>(null);

  const form = useForm<ProcessTleDataInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group: "stations",
    },
  });

  async function onSubmit(values: ProcessTleDataInput) {
    setLoading(true);
    setResult(null);
    try {
      const analysisResult = await processTleData(values);
      setResult(analysisResult);
      toast({
        title: "Processing Complete",
        description: `TLE data for '${values.group}' processed successfully.`,
      });
    } catch (error) {
      console.error("Processing failed:", error);
      toast({
        variant: "destructive",
        title: "Processing Failed",
        description: "Could not process the TLE data.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satellite Group</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a satellite group" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {tleGroups.map(group => (
                            <SelectItem key={group.value} value={group.value}>{group.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
            Process TLE Data from Celestrak
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center min-h-[300px]">
        {loading && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
        {!loading && !result && (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg w-full">
            <Bot className="mx-auto h-12 w-12" />
            <p className="mt-4 font-headline">Processed data will appear here</p>
          </div>
        )}
        {result && (
          <Card className="w-full bg-muted/30 animate-in fade-in-50 slide-in-from-bottom-10 duration-500">
            <CardHeader>
              <CardTitle className="font-headline text-primary">
                Processed TLE Data
              </CardTitle>
              <p className="text-sm text-muted-foreground">{result.summary}</p>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-72 w-full rounded-md border">
                    <pre className="p-4 bg-background/50 text-xs text-foreground">
                        <code>
                            {result.positions.map(p => `${p.name}\n${p.line1}\n${p.line2}`).join('\n\n')}
                        </code>
                    </pre>
                </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
