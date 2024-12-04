import { createUsage } from './createUsage';
import { getConfigurationHash } from './getConfigurationInformation';
import { getEnvironmentVariables } from './getEnvironment';
import { getOperatingSystemRelease, getOperatingSystemType, getOperatingSystemVersion } from './getOperatingSystem';
import { getCwdGitRemoteUrlHash } from './getRepositoryInformation';
import { getUserId } from './getUserId';
import { getVersion } from './getVersion';

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

  await createUsage(usageData);
}
