import shajs from "sha.js";

export function getConfigurationHash(): string {
  // TODO Implement
  return shajs("sha256").update("NOT IMPLEMENTED").digest("hex"); ;
}
