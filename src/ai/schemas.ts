// src/ai/schemas.ts
import {z} from 'genkit';

// Schema for Space Weather Data Analysis
export const AnalyzeSpaceWeatherDataInputSchema = z.object({
  solarFlareData: z.string().describe('Data about solar flares from NASA DONKI.'),
  cmeData: z.string().describe('Data about coronal mass ejections (CMEs) from NASA DONKI.'),
  geomagneticStormData: z
    .string()
    .describe('Data about geomagnetic storms from NASA DONKI.'),
});
export type AnalyzeSpaceWeatherDataInput = z.infer<typeof AnalyzeSpaceWeatherDataInputSchema>;

export const AnalyzeSpaceWeatherDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the potential risks to satellites based on the space weather data.'),
  riskLevel: z
    .enum(['low', 'moderate', 'high'])
    .describe('The overall risk level to satellites based on the space weather data.'),
  affectedSatellites: z
    .array(z.string())
    .describe('A list of specific satellites that may be at risk.'),
});
export type AnalyzeSpaceWeatherDataOutput = z.infer<typeof AnalyzeSpaceWeatherDataOutputSchema>;


// Schema for TLE Data Processing
export const ProcessTleDataInputSchema = z.object({
  tleData: z
    .string()
    .describe('The TLE data to process.'),
});
export type ProcessTleDataInput = z.infer<typeof ProcessTleDataInputSchema>;

export const ProcessTleDataOutputSchema = z.object({
  orbitalPositions: z.string().describe('The orbital positions extracted from the TLE data.'),
});
export type ProcessTleDataOutput = z.infer<typeof ProcessTleDataOutputSchema>;
