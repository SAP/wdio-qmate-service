import * as os from 'os';
import path from 'path';
import { LocalStorage } from 'node-localstorage';
import { Agent, fetch, Response } from 'undici';
import { STATS_SERVER_URL } from './constants';

export async function getUserId(): Promise<string | null> {
  if (!isLocalStorageAvailable()) {
    console.log("Cannot retrieve user ID.");
    return null;
  }
  if (isUserIdStored()) {
    return getUserIdFromStore();
  } else {
    const userId = await retrieveNewUserIdFromServer();
    if (userId !== null) {
      saveUserIdToStore(userId);
    }
    return userId;
  }
}

async function retrieveNewUserIdFromServer(): Promise<string | null> {
  try {
    return await fetchNewUserIdFromServer();
  } catch (error) {
    console.log("Error while fetching user ID: ", (error as Error).message);
    return null;
  }
}

async function fetchNewUserIdFromServer(): Promise<string | null> {
  const response = await fetchNewUserResponse();
  return await extractUserIdFromResponse(response);
}

async function fetchNewUserResponse(): Promise<Response> {
  return fetch(`${STATS_SERVER_URL}/api/user`, {
    method: "POST",
    dispatcher: new Agent({
      connect: {
        rejectUnauthorized: false,
      }
    })
  });
}

async function extractUserIdFromResponse(response: Response): Promise<string | null> {
  if (!response.ok) {
    console.log(`Failed to create Qmate Stats User: ${response.status} ${response.statusText}`);
    return null;
  }
  const responseText = await response.text();
  const responseData = JSON.parse(responseText);
  return responseData.id;
}

function isLocalStorageAvailable() {
  try {
    getLocalStorage();
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

let localStorageInstance: LocalStorage | null = null;
function getLocalStorage() {
  localStorageInstance ??= new LocalStorage(path.join(os.homedir(), '.qmate-userId'));
  return localStorageInstance;
}
