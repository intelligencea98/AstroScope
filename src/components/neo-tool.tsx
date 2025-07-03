
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { Bot, CalendarIcon, Loader2 } from "lucide-react";
import { z } from "zod";

import { analyzeNeoData } from "@/ai/flows/process-neo-data";
import {
  AnalyzeNeoDataInputSchema,
  type AnalyzeNeoDataOutput,
} from "@/ai/schemas";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

const formSchema = AnalyzeNeoDataInputSchema;

export default function NeoTool() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeNeoDataOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeNeoData(values);
      setResult(analysisResult);
      toast({
        title: "Analysis Complete",
        description: "NEO data processed successfully.",
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not process the NEO data.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className="p-4 border rounded-lg bg-muted/20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription>
                Select a date range (max 7 days recommended) to fetch and analyze NEO data from the NASA NeoWs API.
            </FormDescription>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Bot className="mr-2 h-4 w-4" />
              )}
              Analyze NEOs
            </Button>
          </form>
        </Form>
      </div>

      <div className="flex items-center justify-center min-h-[300px]">
        {loading && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
        {!loading && !result && (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg w-full">
            <Bot className="mx-auto h-12 w-12" />
            <p className="mt-4 font-headline">NEO Analysis will appear here</p>
          </div>
        )}
        {result && (
          <Card className="w-full bg-muted/30">
            <CardHeader>
              <CardTitle className="font-headline text-primary">NEO Analysis Result</CardTitle>
              <CardDescription>{result.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">Total NEOs: {result.totalNeos}</Badge>
                <Badge variant={result.potentiallyHazardousNeos > 0 ? "destructive" : "secondary"}>Hazardous: {result.potentiallyHazardousNeos}</Badge>
              </div>

              <div>
                <p className="font-semibold text-lg">Closest Approach Object</p>
                <div className="text-sm text-muted-foreground">
                    <p><strong>Name:</strong> {result.closestApproach.name}</p>
                    <p><strong>Miss Distance:</strong> {result.closestApproach.missDistanceKm} km</p>
                    <p><strong>Diameter:</strong> {result.closestApproach.estimatedDiameterKm} km</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-lg">Largest Object</p>
                 <div className="text-sm text-muted-foreground">
                    <p><strong>Name:</strong> {result.largestObject.name}</p>
                    <p><strong>Diameter:</strong> {result.largestObject.estimatedDiameterKm} km</p>
                    <p><strong>Velocity:</strong> {result.largestObject.relativeVelocityKph} km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
