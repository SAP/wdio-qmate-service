import { Agent, fetch } from "undici";

export async function updateQmateUsage(id: string, usageData: { result: string}) {
  const urlUsage = `http://localhost:3000/api/usage/qmate/${id}`;
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