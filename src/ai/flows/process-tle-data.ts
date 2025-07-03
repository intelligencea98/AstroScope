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
import {z} from 'genkit';

const ProcessTleDataInputSchema = z.object({
  tleData: z
    .string()
    .describe('The TLE data to process.'),
});
export type ProcessTleDataInput = z.infer<typeof ProcessTleDataInputSchema>;

const ProcessTleDataOutputSchema = z.object({
  orbitalPositions: z.string().describe('The orbital positions extracted from the TLE data.'),
});
export type ProcessTleDataOutput = z.infer<typeof ProcessTleDataOutputSchema>;

export async function processTleData(input: ProcessTleDataInput): Promise<ProcessTleDataOutput> {
  return processTleDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processTleDataPrompt',
  input: {schema: ProcessTleDataInputSchema},
  output: {schema: ProcessTleDataOutputSchema},
  prompt: `You are an expert in processing TLE data and extracting orbital positions.

  You will use this information to get the orbital positions.

  Use the following as the primary source of information about the TLE data.

  TLE Data: {{{tleData}}}`,
});

const processTleDataFlow = ai.defineFlow(
  {
    name: 'processTleDataFlow',
    inputSchema: ProcessTleDataInputSchema,
    outputSchema: ProcessTleDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
