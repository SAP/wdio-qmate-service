const ENVIRONMENT_VARIABLES = ["JENKINS_URL", "GITHUB_ACTIONS", "TF_BUILD", "QMATE_EXEC_CONFIG"];

export function getEnvironmentVariables(): string[] {
  return ENVIRONMENT_VARIABLES.filter((variableName) => process.env[variableName] !== undefined);
}
