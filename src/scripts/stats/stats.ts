import { createUsage } from './createUsage';
import { getConfigurationHash } from './getConfigurationInformation';
import { getEnvironmentVariables } from './getEnvironment';
import { getOperatingSystemRelease, getOperatingSystemType, getOperatingSystemVersion } from './getOperatingSystem';
import { getCwdGitRemoteUrlHash } from './getRepositoryInformation';
import { getUserId } from './getUserId';
import { getVersion } from './getVersion';
import { updateQmateUsage } from './updateUsage';

export async function sendUsageRequests(): Promise<string | null> {
  const user = await getUserId();
  if (user === null) {
    return null;
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
    return null;
  }
  return usageId;
}

export async function updateUsageRequests(usageId: string, result: string) {
  const usageData = {
    result
  }

  console.log(usageData);

  void updateQmateUsage(usageId, usageData);
}


