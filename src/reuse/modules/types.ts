export type AlignmentValues = "start" | "center" | "end" | "nearest";
export type BehaviorValues = "smooth" | "instant" | "auto";

export type AlignmentOptions = {
  block: AlignmentValues;
  inline: AlignmentValues;
  behavior: BehaviorValues;
};
