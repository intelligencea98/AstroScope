import { config } from 'dotenv';
config();

import '@/ai/flows/process-space-weather-data.ts';
import '@/ai/flows/process-tle-data.ts';
import '@/ai/flows/process-neo-data.ts';
