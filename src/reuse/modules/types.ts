export type AlignmentValues = "start" | "center" | "end" | "nearest";

export type AlignmentOptions = {
  block: AlignmentValues;
  inline: AlignmentValues;
};

export type DecryptionOptions = {
  useBase64Input?: boolean;
  useBase64Output?: boolean;
  includeRepoUrl?: boolean;
};