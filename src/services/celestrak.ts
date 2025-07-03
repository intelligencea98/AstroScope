'use server';

const BASE_URL = 'https://celestrak.org/NORAD/elements/gp.php';

export async function getTleData(group: string) {
    const url = `${BASE_URL}?GROUP=${group}&FORMAT=tle`;
    try {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Celestrak API request failed with status ${response.status}`);
        }
        const tleData = await response.text();
        return tleData;
    } catch (error) {
        console.error(`Error fetching TLE data for group ${group}:`, error);
        return null;
    }
}
