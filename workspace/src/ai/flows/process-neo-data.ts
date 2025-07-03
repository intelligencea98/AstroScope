// src/ai/flows/process-neo-data.ts
'use server';
/**
 * @fileOverview Analyzes Near Earth Object (NEO) data from NASA NeoWs to identify potential threats.
 *
 * - analyzeNeoData - A function that handles the analysis of NEO data.
 * - AnalyzeNeoDataInput - The input type for the analyzeNeoData function.
 * - AnalyzeNeoDataOutput - The return type for the analyzeNeoData function.
 */

import {ai} from '@/ai/genkit';
import {
  AnalyzeNeoDataOutputSchema,
} from '@/ai/schemas';
import type {
  AnalyzeNeoDataInput,
  AnalyzeNeoDataOutput,
} from '@/ai/schemas';
import { getNeoFeed } from '@/services/nasa-donki';
import { z } from 'zod';
import { format } from 'date-fns';

export type {
  AnalyzeNeoDataInput,
  AnalyzeNeoDataOutput,
};

// This is the schema for what the flow *actually* receives
const FlowInputSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format"),
});


export async function analyzeNeoData(
  input: AnalyzeNeoDataInput
): Promise<AnalyzeNeoDataOutput> {
  // Convert dates to YYYY-MM-DD strings before calling the flow
  const flowInput = {
    startDate: format(input.startDate, 'yyyy-MM-dd'),
    endDate: format(input.endDate, 'yyyy-MM-dd'),
  };
  return analyzeNeoDataFlow(flowInput);
}

const NeoAnalysisPromptInputSchema = z.object({
    neoData: z.string(),
    startDate: z.string(),
    endDate: z.string(),
});

const prompt = ai.definePrompt({
  name: 'analyzeNeoDataPrompt',
  input: {schema: NeoAnalysisPromptInputSchema},
  output: {schema: AnalyzeNeoDataOutputSchema},
  prompt: `You are an expert astronomer specializing in Near Earth Objects (NEOs) and planetary defense.

  Analyze the provided NEO data from NASA's NeoWs API for the period of {{startDate}} to {{endDate}}.
  The data contains a list of asteroids approaching Earth.

  Your tasks are:
  1.  Count the total number of NEOs listed in the data.
  2.  Identify the number of potentially hazardous asteroids (PHAs) where 'is_potentially_hazardous_asteroid' is true.
  3.  Find the object with the closest approach distance ('miss_distance' in kilometers). Provide its name, miss distance, and estimated diameter (average of 'estimated_diameter_min' and 'estimated_diameter_max' in kilometers).
  4.  Find the largest object based on its average estimated diameter. Provide its name, diameter, and velocity (kilometers per hour).
  5.  Provide a brief summary of the NEO activity for the given week, highlighting any significant objects or overall threat level.

  Format the output as a JSON object matching the AnalyzeNeoDataOutputSchema.

  NEO Data:
  {{{neoData}}}
  `,
});

const analyzeNeoDataFlow = ai.defineFlow(
  {
    name: 'analyzeNeoDataFlow',
    inputSchema: FlowInputSchema,
    outputSchema: AnalyzeNeoDataOutputSchema,
  },
  async ({ startDate, endDate }) => {
    const neoData = await getNeoFeed(startDate, endDate);

    const {output} = await prompt({
        neoData: JSON.stringify(neoData, null, 2),
        startDate: startDate,
        endDate: endDate,
    });

    return output!;
  }
);
