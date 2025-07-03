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
import {z} from 'genkit';

const AnalyzeSpaceWeatherDataInputSchema = z.object({
  solarFlareData: z.string().describe('Data about solar flares from NASA DONKI.'),
  cmeData: z.string().describe('Data about coronal mass ejections (CMEs) from NASA DONKI.'),
  geomagneticStormData: z
    .string()
    .describe('Data about geomagnetic storms from NASA DONKI.'),
});
export type AnalyzeSpaceWeatherDataInput = z.infer<typeof AnalyzeSpaceWeatherDataInputSchema>;

const AnalyzeSpaceWeatherDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the potential risks to satellites based on the space weather data.'),
  riskLevel: z
    .enum(['low', 'moderate', 'high'])
    .describe('The overall risk level to satellites based on the space weather data.'),
  affectedSatellites: z
    .array(z.string())
    .describe('A list of specific satellites that may be at risk.'),
});
export type AnalyzeSpaceWeatherDataOutput = z.infer<typeof AnalyzeSpaceWeatherDataOutputSchema>;

export async function analyzeSpaceWeatherData(
  input: AnalyzeSpaceWeatherDataInput
): Promise<AnalyzeSpaceWeatherDataOutput> {
  return analyzeSpaceWeatherDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSpaceWeatherDataPrompt',
  input: {schema: AnalyzeSpaceWeatherDataInputSchema},
  output: {schema: AnalyzeSpaceWeatherDataOutputSchema},
  prompt: `You are an expert in space weather and its effects on satellites.

  Analyze the provided space weather data from NASA DONKI and identify potential risks to satellites.
  Provide a summary of the risks, an overall risk level (low, moderate, or high), and a list of specific satellites that may be affected.

  Solar Flare Data: {{{solarFlareData}}}
  CME Data: {{{cmeData}}}
  Geomagnetic Storm Data: {{{geomagneticStormData}}}

  Format the output as a JSON object matching the AnalyzeSpaceWeatherDataOutputSchema schema.`,
});

const analyzeSpaceWeatherDataFlow = ai.defineFlow(
  {
    name: 'analyzeSpaceWeatherDataFlow',
    inputSchema: AnalyzeSpaceWeatherDataInputSchema,
    outputSchema: AnalyzeSpaceWeatherDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
