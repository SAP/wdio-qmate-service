import { execSync } from "child_process";
import shajs from "sha.js";
import path from "path";

function azureGetGitRoot(): string {
  if (process.env.BUILD_REPOSITORY_LOCALPATH) {
    return process.env.BUILD_REPOSITORY_LOCALPATH;
  } else {
    throw Error();
  }
}

function getGitRoot(configPath: string): string {
  try {
    return execSync("git rev-parse --show-toplevel", {
      cwd: configPath, // Run the command in the configPath directory to support absolute path execution
      stdio: ["pipe", "pipe", "ignore"] // Ignore stderr
    })
      .toString()
      .trim();
  } catch (error) {
    // Intentionally left blank
  }

  try {
    return azureGetGitRoot();
  } catch (error) {
    // Intentionally left blank
  }

  throw Error();
}

export function getConfigurationHash(): string {
  const FALLBACK_NO_CONFIG_HASH = "FALLBACK_NO_CONFIG_HASH";
  const FALLBACK_NO_GIT_PATH = "FALLBACK_NO_GIT_PATH";
  const FALLBACK_HASHING_FAILED = "FALLBACK_HASHING_FAILED";

  if (process.env.CONFIG_PATH) {
    const configPath = process.env.CONFIG_PATH;
    try {
      const gitRoot = getGitRoot(configPath);
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
