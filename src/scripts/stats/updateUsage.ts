import { Agent, fetch } from "undici";

export async function updateQmateUsage(id: string, usageData: { result: string }) {
  const urlUsage = `https://stats.qmate.proc.only.sap/api/usage/qmate/${id}`;
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
          // ca: process.env.SAP_GLOBAL_ROOT_CA
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