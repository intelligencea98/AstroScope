// src/ai/flows/process-space-weather-data.ts
'use server';
/**
 * @fileOverview Analyzes space weather data from NASA DONKI to identify potential risks to satellites.
 *
 * - analyzeSpaceWeatherData - A function that handles the analysis of space weather data.
 * - AnalyzeSpaceWeatherDataInput - The input type for the analyzeSpaceWeatherData function.
 * - AnalyzeSpaceWeatherDataOutput - The return type for the analyzeSpaceWeatherData function.
 */

import {ai} from '@/ai/genkit';
import {
  AnalyzeSpaceWeatherDataInputSchema,
  AnalyzeSpaceWeatherDataOutputSchema,
} from '@/ai/schemas';
import type {
  AnalyzeSpaceWeatherDataInput,
  AnalyzeSpaceWeatherDataOutput,
} from '@/ai/schemas';
import { getRecentSpaceWeatherData } from '@/services/nasa-donki';
import { z } from 'zod';

export type {
  AnalyzeSpaceWeatherDataInput,
  AnalyzeSpaceWeatherDataOutput,
};

export async function analyzeSpaceWeatherData(
  input: AnalyzeSpaceWeatherDataInput
): Promise<AnalyzeSpaceWeatherDataOutput> {
  return analyzeSpaceWeatherDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSpaceWeatherDataPrompt',
  input: {schema: z.object({
    cmeData: z.string(),
    gstData: z.string(),
    flrData: z.string(),
  })},
  output: {schema: AnalyzeSpaceWeatherDataOutputSchema},
  prompt: `You are an expert in space weather and its effects on satellites.

  Analyze the provided space weather data from NASA DONKI for the last 3 days and identify potential risks to satellites.
  Provide a summary of the risks, an overall risk level (low, moderate, or high), a count for each event type (CME, GST, FLR), and a list of specific satellites that may be affected.

  Coronal Mass Ejection (CME) Data: {{{cmeData}}}
  Geomagnetic Storm (GST) Data: {{{gstData}}}
  Solar Flare (FLR) Data: {{{flrData}}}

  Format the output as a JSON object matching the AnalyzeSpaceWeatherDataOutputSchema schema. Base your analysis on the quantity and severity of events. For example, numerous high-class flares and CMEs would indicate a 'high' risk level.`,
});

const analyzeSpaceWeatherDataFlow = ai.defineFlow(
  {
    name: 'analyzeSpaceWeatherDataFlow',
    inputSchema: AnalyzeSpaceWeatherDataInputSchema,
    outputSchema: AnalyzeSpaceWeatherDataOutputSchema,
  },
  async () => {
    const { cme, gst, flr } = await getRecentSpaceWeatherData();

    const {output} = await prompt({
      cmeData: JSON.stringify(cme, null, 2),
      gstData: JSON.stringify(gst, null, 2),
      flrData: JSON.stringify(flr, null, 2),
    });

    return output!;
  }
);
