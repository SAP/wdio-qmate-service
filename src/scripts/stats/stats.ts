import { createUsage } from './createUsage';
import { getConfigurationHash } from './getConfigurationInformation';
import { getEnvironmentVariables } from './getEnvironment';
import { getOperatingSystemRelease, getOperatingSystemType, getOperatingSystemVersion } from './getOperatingSystem';
import { getCwdGitRemoteUrlHash } from './getRepositoryInformation';
import { getUserId } from './getUserId';
import { getVersion } from './getVersion';

// LocalStorage
import { LocalStorage } from 'node-localstorage';
import path from 'path';
import os from 'os';
import { updateQmateUsage } from './updateUsage';

const localStorage = new LocalStorage(path.join(os.homedir(), '.qmate-userId'));

export async function sendUsageRequests() {
  const user = await getUserId();
  if (user === null) {
    return;
  }

  const usageData = {
    "userId": user,
    "version": getVersion(),
    "osType": getOperatingSystemType(),
    "osRelease": getOperatingSystemRelease(),
    "osVersion": getOperatingSystemVersion(),
    "environment": getEnvironmentVariables(),
    "configHash": getConfigurationHash(),
    "repoHash": getCwdGitRemoteUrlHash(),
  };

  const usageId = await createUsage(usageData);
  if (usageId === null) {
    return;
  }
  saveUsageIdToStore(usageId);
}

export async function updateUsageRequests(result: string) {
  const usageId = getUsageIdFromStore() as string;

  const usageData = {
    "result": result
  }

  updateQmateUsage(usageId, usageData);
}

function saveUsageIdToStore(usageId: string) {
  localStorage.setItem("UsageId", usageId);
}

function getUsageIdFromStore() {
  return localStorage.getItem("UsageId");
}


