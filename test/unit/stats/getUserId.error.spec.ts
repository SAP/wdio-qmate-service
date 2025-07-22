import { describe, it, vi, beforeEach, afterAll, expect } from "vitest";
import { getUserId } from "../../../src/scripts/stats/getUserId";

vi.mock("os", () => {
  return {
    homedir: {
      homedirMock: vi.fn(() => "/mock/home/dir")
    }
  };
});

describe("getUserId - error case", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return null if home directory is not accessible", async () => {
    // Act
    const userId = await getUserId();

    // Verify
    expect(userId).toBeNull();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
