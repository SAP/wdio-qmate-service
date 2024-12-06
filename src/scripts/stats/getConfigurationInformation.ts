import { execSync } from "child_process";
import shajs from "sha.js";
import path from "path";

export function getConfigurationHash(): string {
  const FALLBACK_NO_CONFIG_HASH = "FALLBACK_NO_CONFIG_HASH";
  const FALLBACK_NO_GIT_PATH = "FALLBACK_NO_GIT_PATH";
  const FALLBACK_HASHING_FAILED = "FALLBACK_HASHING_FAILED";

  if (process.env.CONFIG_PATH) {
    const configPath = process.env.CONFIG_PATH;
    try {
      const gitRoot = execSync("git rev-parse --show-toplevel").toString().trim();
      const relativePath = path.relative(gitRoot, configPath);
      try {
        return shajs("sha256").update(relativePath).digest("hex");
      } catch (error) {
        return FALLBACK_HASHING_FAILED;
      }
    } catch (error) {
      return FALLBACK_NO_GIT_PATH;
    }
  } else {
    return FALLBACK_NO_CONFIG_HASH;
  }
}