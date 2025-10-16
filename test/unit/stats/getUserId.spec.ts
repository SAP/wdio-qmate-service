import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import { getUserId } from "../../../src/scripts/stats/getUserId";
import { STATS_SERVER_URL } from "../../../src/scripts/stats/constants";

const mockUserId = "test-user-id";
const fetchedUserId = "fetched-user-id";

const { getItemMock } = vi.hoisted(() => {
  return {
    getItemMock: vi.fn()
  }
});

const { setItemMock } = vi.hoisted(() => {
  return {
    setItemMock: vi.fn()
  }
});

vi.mock("node-localstorage", () => {
  return {
    LocalStorage: vi.fn(() => {
      return {
        getItem: getItemMock,
        setItem: setItemMock,
      };
    })
  };
});

const { fetchMock } = vi.hoisted(() => {
  return {
    fetchMock: vi.fn()
  }
});

vi.mock("undici", () => {
  return {
    fetch: fetchMock,
    Agent: vi.fn(),
  };
});

describe("getUserId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the correct user ID if it is stored", async () => {
    // Prepare
    getItemMock.mockReturnValue(mockUserId);

    // Act
    const userId = await getUserId();

    // Verify
    expect(userId).toBe(mockUserId);
  });

  it("should not call fetch if user ID is stored", async () => {
    // Prepare
    getItemMock.mockReturnValue(mockUserId);

    // Act
    await getUserId();

    // Verify
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("should return fetched user ID if not stored", async () => {
    // Prepare
    getItemMock.mockReturnValue(null);
    fetchMock.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ id: fetchedUserId })),
    } as Response);

    // Act
    const userId = await getUserId();

    // Verify
    expect(userId).toBe(fetchedUserId);
  });

  it("should fetch user ID from correct URL", async () => {
    // Prepare
    getItemMock.mockReturnValue(null);
    fetchMock.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ id: fetchedUserId })),
    } as Response);

    // Act
    await getUserId();

    // Verify
    expect(fetchMock).toHaveBeenCalledWith(`${STATS_SERVER_URL}/api/user`, {
      method: "POST",
      dispatcher: expect.anything(),
    });
  });

  it("should return null if fetch fails", async () => {
    // Prepare
    getItemMock.mockReturnValue(null);
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: () => Promise.resolve(""),
    } as Response);

    // Act
    const userId = await getUserId();

    // Verify
    expect(userId).toBeNull();
  });

  it("should return null if an error occurs during fetch", async () => {
    // Prepare
    getItemMock.mockReturnValue(null);
    fetchMock.mockRejectedValue(new Error("Network Error"));

    // Act
    const userId = await getUserId();

    // Verify
    expect(userId).toBeNull();
  });

  it("should save user ID to store after fetching", async () => {
    // Prepare
    getItemMock.mockReturnValue(null);

    fetchMock.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ id: fetchedUserId })),
    } as Response);

    // Act
    await getUserId();

    // Verify
    expect(setItemMock).toHaveBeenCalledWith("UserId", fetchedUserId);
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
