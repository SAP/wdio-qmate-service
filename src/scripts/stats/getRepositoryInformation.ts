import { execSync } from "child_process";
import shajs from "sha.js";

function azureGetGitRemoteUrl(): string {
  if (process.env.BUILD_REPOSITORY_URI) {
    return process.env.BUILD_REPOSITORY_URI;
  } else {
    throw Error();
  }
}

function getGitRemoteUrl(configPath: string): string {
  try {
    return execSync("git config --get remote.origin.url", {
      cwd: configPath, // Run the command in the configPath directory to support absolute path execution
      stdio: ["pipe", "pipe", "ignore"] // Ignore stderr
    })
      .toString()
      .trim();
  } catch (error) {
    // Intentionally left blank
  }

  try {
    return azureGetGitRemoteUrl();
  } catch (error) {
    // Intentionally left blank
  }

  throw Error();
}

export function getCwdGitRemoteUrlHash(): string {
  const FALLBACK_NO_GIT_ORIGIN_REMOTE = "FALLBACK_NO_GIT_ORIGIN_REMOTE";
  const FALLBACK_HASHING_FAILED = "FALLBACK_HASHING_FAILED";

  try {
    if (!process.env.CONFIG_PATH) {
      throw Error();
    }
    const remoteUrl = getGitRemoteUrl(process.env.CONFIG_PATH);
    try {
      const remoteUrlHash = shajs("sha256").update(remoteUrl).digest("hex");
      return remoteUrlHash;
    } catch (error) {
      return FALLBACK_HASHING_FAILED;
    }
  } catch (error) {
    return FALLBACK_NO_GIT_ORIGIN_REMOTE;
  }
}
