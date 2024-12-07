import { Agent, fetch } from 'undici';

export async function createUsage(usageData: {
  userId: string;
  version: string;
  osType: string;
  osRelease: string;
  osVersion: string;
  environment: string[];
  configHash: string;
  repoHash: string | null;
}): Promise<string | null> {
  const urlUsage = "https://stats.qmate.proc.only.sap/api/usage/qmate";
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
          // ca: process.env.SAP_GLOBAL_ROOT_CA
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