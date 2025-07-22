import * as os from 'os';
import path from 'path';
import { LocalStorage } from 'node-localstorage';
import { Agent, fetch } from 'undici';

export async function getUserId(): Promise<string | null> {
  if (!isLocalStorageAvailable()) {
    console.log("Cannot retrieve user ID.");
    return null;
  }
  const urlUser = "https://stats.qmate.proc.only.sap/api/user";
  if (isUserIdStored()) {
    return getUserIdFromStore();
  } else {
    try {
      const response = await fetch(urlUser, {
        method: "POST",
        dispatcher: new Agent({
          connect: {
            rejectUnauthorized: false,
          }
        })
      });
      if (!response.ok) {
        console.log(`Failed to create Qmate Stats User: ${response.status} ${response.statusText}`);
        return null;
      } else {
        const responseText = await response.text();
        const responseData = JSON.parse(responseText);
        saveUserIdToStore(responseData.id);
        return responseData.id;
      }
    } catch (error) {
      return null;
    }
  }
}

function isLocalStorageAvailable() {
  try {
    new LocalStorage(path.join(os.homedir(), '.qmate-userId'));
    return true;
  } catch (e) {
    console.log("LocalStorage is not available: ", (e as Error).message);
    return false;
  }
}

function isUserIdStored() {
  return getLocalStorage().getItem("UserId") !== null;
}

function saveUserIdToStore(userId: string) {
  getLocalStorage().setItem("UserId", userId);
}

function getUserIdFromStore() {
  return getLocalStorage().getItem("UserId");
}

function getLocalStorage() {
  return new LocalStorage(path.join(os.homedir(), '.qmate-userId'));
}
