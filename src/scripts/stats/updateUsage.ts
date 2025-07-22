import { Agent, fetch } from "undici";
import { STATS_SERVER_URL } from "./constants";

export async function updateQmateUsage(id: string, usageData: { result: string }) {
  const urlUsage = `${STATS_SERVER_URL}/api/usage/qmate/${id}`;
  try {
    const response = await fetch(urlUsage, {
      method: "PUT",
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
      // Intentionally ignore
    }
  } catch (error) {
    // Intentionally ignore
  }
}