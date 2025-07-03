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

  Parse the entire TLE data string. For each satellite, extract the name, line 1, and line 2.
  Count the total number of satellites found.
  Provide a brief summary of what the TLE data represents (e.g., "Processed TLE data for 50 active satellites.").
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
