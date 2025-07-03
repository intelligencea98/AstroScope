
import { subDays, format } from 'date-fns';

const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const DONKI_BASE_URL = 'https://api.nasa.gov/DONKI';
const NEO_BASE_URL = 'https://api.nasa.gov/neo/rest/v1';
const EPIC_BASE_URL = 'https://api.nasa.gov/EPIC/api';
const INSIGHT_BASE_URL = 'https://api.nasa.gov/insight_weather/';
const PLANETARY_BASE_URL = 'https://api.nasa.gov/planetary';

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
            let errorMessage = `Request failed with status ${response.status}`;
            try {
                const errorJson = await response.json();
                if (errorJson.error_message) {
                    errorMessage = errorJson.error_message;
                }
            } catch (e) {
                // Ignore if response is not JSON
            }
            throw new Error(errorMessage);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching data from NeoWs ${endpoint}:`, error);
        throw error;
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

// EPIC Functions
async function fetchEpicData(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${EPIC_BASE_URL}/${endpoint}`);
    url.searchParams.append('api_key', API_KEY);
    for (const key in params) {
        url.searchParams.append(key, params[key]);
    }

    try {
        const response = await fetch(url.toString(), { cache: 'no-store' });
        if (!response.ok) {
            let errorMessage = `EPIC API request failed with status ${response.status}`;
            try {
                const errorJson = await response.json();
                if (errorJson.msg) {
                    errorMessage = errorJson.msg;
                }
            } catch (e) {
                // Ignore if response is not JSON
            }
            throw new Error(errorMessage);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching data from EPIC ${endpoint}:`, error);
        throw error;
    }
}

export async function getRecentEpicImages() {
    return fetchEpicData('natural/images');
}

export function buildEpicImageUrl(image: { image: string, date: string }) {
    const date = new Date(image.date);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${image.image}.png?api_key=${API_KEY}`;
}

// InSight Mars Weather Functions
async function fetchInSightData() {
    const url = new URL(INSIGHT_BASE_URL);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('feedtype', 'json');
    url.searchParams.append('ver', '1.0');

    try {
        const response = await fetch(url.toString(), { cache: 'no-store' });
        if (!response.ok) {
             throw new Error(`InSight API request failed with status ${response.status}: ${await response.text()}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching InSight Mars weather data:`, error);
        throw error;
    }
}

export async function getInSightWeatherData() {
    return fetchInSightData();
}

// Planetary API Functions
async function fetchPlanetaryData(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${PLANETARY_BASE_URL}/${endpoint}`);
    url.searchParams.append('api_key', API_KEY);
    for (const key in params) {
        url.searchParams.append(key, params[key]);
    }
    try {
        const response = await fetch(url.toString(), { cache: 'no-store' });
        if (!response.ok) {
            let errorMessage = `Planetary API request failed with status ${response.status}`;
            try {
                const errorJson = await response.json();
                if (errorJson.msg) {
                    errorMessage = errorJson.msg;
                }
            } catch (e) {
                // Ignore if response is not JSON
            }
            throw new Error(errorMessage);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching data from Planetary API ${endpoint}:`, error);
        throw error;
    }
}

export async function getApod() {
    return fetchPlanetaryData('apod');
}
