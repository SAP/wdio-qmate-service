import { Agent, fetch } from 'undici';
import { STATS_SERVER_URL } from './constants';

export async function createUsage(usageData: {
  userId: string;
  version: string;
  osType: string;
  osRelease: string;
  osVersion: string;
  environment: string[];
  configHash: string;
  repoHash: string | null;
  specCounter: number;
}): Promise<string | null> {
  const urlUsage = `${STATS_SERVER_URL}/api/usage/qmate`;
  try {
    const response = await fetch(urlUsage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usageData),
      dispatcher: new Agent({
        connect: {
          rejectUnauthorized: false,
        }
      })
    });

    if (!response.ok) {
      return null;
    } else {
      const responseText = await response.text();
      const responseData = JSON.parse(responseText);
      return responseData.id;
    }
  } catch (error) {
    return null;
  }
}