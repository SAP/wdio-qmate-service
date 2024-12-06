import { execSync } from "child_process";
import shajs from "sha.js";

export function isCwdGitRepo(): boolean {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
}

export function getCwdGitRemoteUrlHash(): string {
  const FALLBACK_NO_GIT_REPOSITORY = "FALLBACK_NO_GIT_REPOSITORY";
  const FALLBACK_NO_GIT_ORIGIN_REMOTE = "FALLBACK_NO_GIT_ORIGIN_REMOTE";
  const FALLBACK_HASHING_FAILED = "FALLBACK_HASHING_FAILED";

  if (!isCwdGitRepo()) {
    return FALLBACK_NO_GIT_REPOSITORY;
  }
  try {
    const remoteUrl = execSync("git config --get remote.origin.url").toString().trim();
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