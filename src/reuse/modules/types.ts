export enum AlignmentValues {
  START = "start",
  CENTER = "center",
  END = "end",
  NEAREST = "nearest"
}

export type AlignmentOptions = {
  block: AlignmentValues;
  inline: AlignmentValues;
}
