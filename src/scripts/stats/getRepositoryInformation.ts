import { execSync } from "child_process";
import shajs from "sha.js";

function azureGetGitRemoteUrl(): string {
  if (process.env.BUILD_REPOSITORY_URI) {
    return process.env.BUILD_REPOSITORY_URI
  } else {
    throw Error();
  }
}

function getGitRemoteUrl(): string {
  try {
    return execSync("git config --get remote.origin.url").toString().trim();
  } catch (error) {
    // Intentionally left blank
  }

  try {
    return azureGetGitRemoteUrl()
  } catch (error) {
    // Intentionally left blank
  }

  throw Error();
}

export function getCwdGitRemoteUrlHash(): string {
  const FALLBACK_NO_GIT_ORIGIN_REMOTE = "FALLBACK_NO_GIT_ORIGIN_REMOTE";
  const FALLBACK_HASHING_FAILED = "FALLBACK_HASHING_FAILED";

  try {
    const remoteUrl = getGitRemoteUrl();
    try {
      const remoteUrlHash = shajs("sha256").update(remoteUrl).digest("hex");
      return remoteUrlHash;
    } catch (error) {
      return FALLBACK_HASHING_FAILED;
    }
  } catch (error) {
    return FALLBACK_NO_GIT_ORIGIN_REMOTE
  }
}