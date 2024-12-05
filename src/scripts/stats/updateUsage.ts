import { Agent, fetch } from "undici";

export async function updateQmateUsage(id: string, usageData: { result: string }) {
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
                    ca: process.env.SAP_GLOBAL_ROOT_CA
                }
            })
        });

        if (!response.ok) {
            console.log(`Failed to update Qmate Stats Usage: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.log(`Failed to fetch Usage Stats API`);
    }
}