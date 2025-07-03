'use server';

import { subDays, format } from 'date-fns';

const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const DONKI_BASE_URL = 'https://api.nasa.gov/DONKI';
const NEO_BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

async function fetchDonkiData(endpoint: string, params: Record<string, string>) {
  const url = new URL(`${DONKI_BASE_URL}/${endpoint}`);
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
    console.error(`Error fetching data from DONKI ${endpoint}:`, error);
    return [];
  }
}

async function fetchNeoData(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${NEO_BASE_URL}/${endpoint}`);
    url.searchParams.append('api_key', API_KEY);
    for (const key in params) {
        url.searchParams.append(key, params[key]);
    }

    try {
        const response = await fetch(url.toString(), { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`NASA NeoWs API request failed with status ${response.status}: ${await response.text()}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching data from NeoWs ${endpoint}:`, error);
        return null;
    }
}


export async function getCmeData(startDate: string, endDate: string) {
  return fetchDonkiData('CME', { startDate, endDate });
}

export async function getGstData(startDate: string, endDate: string) {
  return fetchDonkiData('GST', { startDate, endDate });
}

export async function getFlrData(startDate: string, endDate: string) {
  return fetchDonkiData('FLR', { startDate, endDate });
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

// NEO Functions
export async function getNeoFeed(startDate: string, endDate: string) {
    return fetchNeoData('feed', { start_date: startDate, end_date: endDate });
}

export async function getNeoLookup(asteroidId: string) {
    return fetchNeoData(`neo/${asteroidId}`);
}

export async function getNeoBrowse() {
    return fetchNeoData('neo/browse');
}
