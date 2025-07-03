// This is an AI-powered function that processes TLE data to extract orbital positions.
'use server';

/**
 * @fileOverview TLE data processing AI agent.
 *
 * - processTleData - A function that handles the TLE data processing.
 * - ProcessTleDataInput - The input type for the processTleData function.
 * - ProcessTleDataOutput - The return type for the processTleData function.
 */

import {ai} from '@/ai/genkit';
import {
  ProcessTleDataInputSchema,
  ProcessTleDataOutputSchema,
} from '@/ai/schemas';
import type {
  ProcessTleDataInput,
  ProcessTleDataOutput,
} from '@/ai/schemas';
import { getTleData } from '@/services/celestrak';
import { z } from 'zod';

export type { ProcessTleDataInput, ProcessTleDataOutput };

export async function processTleData(input: ProcessTleDataInput): Promise<ProcessTleDataOutput> {
  return processTleDataFlow(input);
}

const TleParsingPromptInputSchema = z.object({
    tleData: z.string(),
});

const prompt = ai.definePrompt({
  name: 'processTleDataPrompt',
  input: {schema: TleParsingPromptInputSchema},
  output: {schema: ProcessTleDataOutputSchema},
  prompt: `You are an expert in processing Two-Line Element (TLE) data.
  Your task is to parse the provided raw TLE text data, which contains records for multiple satellites.
  Each satellite record consists of three lines: a name line, followed by line 1 and line 2.

  For each satellite in the data, extract the following information and convert it to a human-readable format:
  - Satellite Name (from the name line)
  - NORAD Catalog Number (from line 1 and 2, field 2)
  - Orbital Inclination (from line 2, field 3, in degrees)
  - Eccentricity (from line 2, field 5, with an assumed leading decimal point)
  - Mean Motion (from line 2, field 8, in revolutions per day)
  - Epoch (from line 1, fields 4 & 5 - epoch year and day. Convert this to a human-readable UTC date and time string like 'YYYY-MM-DD HH:MM:SS UTC')

  Count the total number of satellites found.
  Provide a brief summary of what the TLE data represents (e.g., "Processed TLE data for 50 active satellites, providing key orbital parameters.").
  Return the result as a JSON object matching the ProcessTleDataOutputSchema.

  TLE Data:
  {{{tleData}}}
  `,
});

const processTleDataFlow = ai.defineFlow(
  {
    name: 'processTleDataFlow',
    inputSchema: ProcessTleDataInputSchema,
    outputSchema: ProcessTleDataOutputSchema,
  },
  async ({ group }) => {
    const tleData = await getTleData(group);
    if (!tleData) {
      throw new Error(`Could not fetch TLE data for group: ${group}`);
    }

    const {output} = await prompt({ tleData });
    return output!;
  }
);
