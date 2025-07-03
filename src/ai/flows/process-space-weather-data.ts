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
