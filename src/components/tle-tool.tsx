"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bot, Loader2 } from "lucide-react";

import {
  processTleData,
  ProcessTleDataInput,
} from "@/ai/flows/process-tle-data";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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

const formSchema = ProcessTleDataInput;

const defaultTleData = `ISS (ZARYA)
1 25544U 98067A   24137.91690972  .00016717  00000-0  30965-3 0  9993
2 25544  51.6416 252.0977 0006703 130.5360 343.2267 15.49501224 274295`;

export default function TleTool() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const form = useForm<ProcessTleDataInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tleData: defaultTleData,
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
        description: "TLE data processed successfully.",
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="tleData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two-Line Element (TLE) Data</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste TLE data here"
                    className="h-48 font-code text-xs"
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
            Process TLE Data
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        {loading && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
        {!loading && !result && (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <Bot className="mx-auto h-12 w-12" />
            <p className="mt-4 font-headline">Processed data will appear here</p>
          </div>
        )}
        {result && (
          <Card className="w-full bg-muted/30">
            <CardHeader>
              <CardTitle className="font-headline text-primary">
                Extracted Orbital Positions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-background/50 rounded-lg text-sm text-foreground overflow-x-auto">
                <code>{result.orbitalPositions}</code>
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
