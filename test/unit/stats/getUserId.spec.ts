import { describe, it, expect } from "vitest";
import { getUserId } from "../../../src/scripts/stats/getUserId";

describe("getUserId", () => {
  it("should return the user ID", () => {
    const userId = getUserId();
    expect(userId).toBeDefined();
  });
});
