'use server';

import { subDays, format } from 'date-fns';

const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov/DONKI';

async function fetchData(endpoint: string, params: Record<string, string>) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }

  try {
    const response = await fetch(url.toString(), { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`NASA DONKI API request failed with status ${response.status}: ${await response.text()}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return [];
  }
}

export async function getCmeData(startDate: string, endDate: string) {
  return fetchData('CME', { startDate, endDate });
}

export async function getGstData(startDate: string, endDate: string) {
  return fetchData('GST', { startDate, endDate });
}

export async function getFlrData(startDate: string, endDate: string) {
  return fetchData('FLR', { startDate, endDate });
}

export async function getRecentSpaceWeatherData() {
    const endDate = new Date();
    const startDate = subDays(endDate, 3);
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');

    const [cme, gst, flr] = await Promise.all([
        getCmeData(formattedStartDate, formattedEndDate),
        getGstData(formattedStartDate, formattedEndDate),
        getFlrData(formattedStartDate, formattedEndDate)
    ]);

    return { cme, gst, flr };
}
