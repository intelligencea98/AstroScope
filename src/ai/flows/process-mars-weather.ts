'use server';
/**
 * @fileOverview Analyzes Mars weather data from the NASA InSight mission API.
 *
 * - analyzeMarsWeatherData - A function that handles the analysis of Mars weather data.
 * - AnalyzeMarsWeatherDataInput - The input type for the analyzeMarsWeatherData function.
 * - AnalyzeMarsWeatherDataOutput - The return type for the analyzeMarsWeatherData function.
 */

import {ai} from '@/ai/genkit';
import {
  AnalyzeMarsWeatherDataInputSchema,
  AnalyzeMarsWeatherDataOutputSchema,
} from '@/ai/schemas';
import type {
  AnalyzeMarsWeatherDataInput,
  AnalyzeMarsWeatherDataOutput,
} from '@/ai/schemas';
import { getInSightWeatherData } from '@/services/nasa-donki';
import { z } from 'zod';

export type {
  AnalyzeMarsWeatherDataInput,
  AnalyzeMarsWeatherDataOutput,
};

export async function analyzeMarsWeatherData(
  input: AnalyzeMarsWeatherDataInput
): Promise<AnalyzeMarsWeatherDataOutput> {
  return analyzeMarsWeatherDataFlow(input);
}

const MarsWeatherPromptInputSchema = z.object({
    marsWeatherData: z.string(),
});

const prompt = ai.definePrompt({
  name: 'analyzeMarsWeatherPrompt',
  input: {schema: MarsWeatherPromptInputSchema},
  output: {schema: AnalyzeMarsWeatherDataOutputSchema},
  prompt: `You are a planetary scientist specializing in Martian meteorology.

  Analyze the provided JSON data from NASA's InSight Mars Lander. The data contains weather information for the last seven available Martian days (Sols).

  Your tasks are:
  1.  Provide a brief, engaging summary of the current weather conditions at Elysium Planitia on Mars, suitable for a general audience. Mention the general temperature and wind conditions.
  2.  Process the data for each Sol provided in the 'sol_keys' array. For each Sol, extract the following information:
      - The Sol number.
      - The Terrestrial Date ('First_UTC').
      - The average, minimum, and maximum atmospheric temperatures ('AT') in degrees Celsius.
      - The average horizontal wind speed ('HWS') in meters per second.
      - The average atmospheric pressure ('PRE') in Pascals.
  3.  Format this extracted information into a 'sols' array of objects.
  4.  Handle missing data gracefully. If a particular metric (e.g., wind speed) is not available for a Sol, do not include the corresponding key in the object for that Sol.

  Return the result as a single JSON object matching the AnalyzeMarsWeatherDataOutputSchema.

  InSight Weather Data:
  {{{marsWeatherData}}}
  `,
});

const analyzeMarsWeatherDataFlow = ai.defineFlow(
  {
    name: 'analyzeMarsWeatherDataFlow',
    inputSchema: AnalyzeMarsWeatherDataInputSchema,
    outputSchema: AnalyzeMarsWeatherDataOutputSchema,
  },
  async () => {
    const weatherData = await getInSightWeatherData();

    if (!weatherData || weatherData.sol_keys.length === 0) {
        throw new Error('No Mars weather data could be retrieved.');
    }

    const {output} = await prompt({
      marsWeatherData: JSON.stringify(weatherData, null, 2),
    });

    return output!;
  }
);
