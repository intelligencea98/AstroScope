// src/ai/schemas.ts
import {z} from 'zod';
import { differenceInDays } from 'date-fns';

// Schema for Space Weather Data Analysis
export const AnalyzeSpaceWeatherDataInputSchema = z.object({
  // No input needed, it will fetch the last 3 days of data automatically.
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
  cmeCount: z.number().describe('Number of Coronal Mass Ejections (CMEs) detected.'),
  gstCount: z.number().describe('Number of Geomagnetic Storms (GSTs) detected.'),
  flrCount: z.number().describe('Number of Solar Flares (FLRs) detected.'),
});
export type AnalyzeSpaceWeatherDataOutput = z.infer<typeof AnalyzeSpaceWeatherDataOutputSchema>;


// Schema for TLE Data Processing
export const ProcessTleDataInputSchema = z.object({
  group: z
    .string()
    .describe("The Celestrak satellite group to fetch TLE data for (e.g., 'active', 'stations')."),
});
export type ProcessTleDataInput = z.infer<typeof ProcessTleDataInputSchema>;

export const ProcessTleDataOutputSchema = z.object({
  satelliteCount: z.number().describe('The number of satellites processed from the TLE data.'),
  satellites: z.array(z.object({
    name: z.string().describe('The name of the satellite.'),
    noradId: z.number().describe('The NORAD catalog number for the satellite.'),
    inclination: z.number().describe('The orbital inclination in degrees.'),
    eccentricity: z.number().describe('The orbital eccentricity, a value between 0 and 1.'),
    meanMotion: z.number().describe('The mean motion in revolutions per day.'),
    epoch: z.string().describe('The epoch of the TLE data as a human-readable date and time (e.g., "2024-07-25 14:30:00 UTC").'),
  })).describe('An array of satellites with their parsed orbital parameters.'),
  summary: z.string().describe('A brief summary of the processed TLE data.'),
});
export type ProcessTleDataOutput = z.infer<typeof ProcessTleDataOutputSchema>;

// Schema for NEO Data Analysis
// This is the schema for what the form on the client uses
export const AnalyzeNeoDataClientInputSchema = z.object({
  startDate: z.date({required_error: "Please select a start date."}).describe('The start date for the NEO feed data.'),
  endDate: z.date({required_error: "Please select an end date."}).describe('The end date for the NEO feed data.'),
}).superRefine((data, ctx) => {
  if (data.endDate < data.startDate) {
    ctx.addIssue({
      code: 'custom',
      path: ['endDate'],
      message: 'End date cannot be before start date.',
    });
  }
  if (differenceInDays(data.endDate, data.startDate) > 6) {
    ctx.addIssue({
      code: 'custom',
      path: ['endDate'],
      message: 'The date range cannot be longer than 7 days.',
    });
  }
});
export type AnalyzeNeoDataInput = z.infer<typeof AnalyzeNeoDataClientInputSchema>;

export const AnalyzeNeoDataOutputSchema = z.object({
  summary: z.string().describe('A brief summary of NEO activity and potential threats for the week.'),
  totalNeos: z.number().describe('The total number of Near Earth Objects detected in the period.'),
  potentiallyHazardousNeos: z.number().describe('The number of potentially hazardous asteroids detected.'),
  closestApproach: z.object({
    name: z.string().describe('Name of the NEO with the closest approach.'),
    missDistanceKm: z.number().describe('The miss distance in kilometers.'),
    estimatedDiameterKm: z.number().describe('The average estimated diameter in kilometers.'),
  }).describe('Details of the object making the closest approach to Earth.'),
  largestObject: z.object({
    name: z.string().describe('Name of the largest NEO detected.'),
    estimatedDiameterKm: z.number().describe('The average estimated diameter in kilometers.'),
    relativeVelocityKph: z.number().describe('The relative velocity in kilometers per hour.'),
  }).describe('Details of the largest object detected in the period.'),
});
export type AnalyzeNeoDataOutput = z.infer<typeof AnalyzeNeoDataOutputSchema>;


// Schema for Mars Weather Analysis
export const AnalyzeMarsWeatherDataInputSchema = z.object({
  // No input needed, it fetches the latest data.
});
export type AnalyzeMarsWeatherDataInput = z.infer<typeof AnalyzeMarsWeatherDataInputSchema>;

export const AnalyzeMarsWeatherDataOutputSchema = z.object({
  summary: z.string().describe('A brief, engaging summary of the current weather conditions on Mars.'),
  sols: z.array(z.object({
    sol: z.string().describe('The Sol (Martian day) number.'),
    terrestrialDate: z.string().describe('The corresponding date on Earth (UTC).'),
    avgTemp: z.number().optional().describe('Average temperature in Celsius.'),
    minTemp: z.number().optional().describe('Minimum temperature in Celsius.'),
    maxTemp: z.number().optional().describe('Maximum temperature in Celsius.'),
    avgWindSpeed: z.number().optional().describe('Average wind speed in meters per second.'),
    pressure: z.number().optional().describe('Atmospheric pressure in Pascals.'),
  })).describe('An array of weather data for each available Sol.'),
});
export type AnalyzeMarsWeatherDataOutput = z.infer<typeof AnalyzeMarsWeatherDataOutputSchema>;
