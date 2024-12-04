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

export function getCwdGitRemoteUrlHash(): string | null {
  if (!isCwdGitRepo()) {
    return null;
  }

  try {
    const remoteUrl = execSync("git config --get remote.origin.url").toString().trim();
    const remoteUrlHash = shajs("sha256").update(remoteUrl).digest("hex");
    return remoteUrlHash;
  } catch (error) {
    return null;
  }
}