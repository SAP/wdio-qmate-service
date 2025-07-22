import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import { getUserId } from "../../../src/scripts/stats/getUserId";

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

const { homedirMock } = vi.hoisted(() => {
  return {
    homedirMock: vi.fn(() => "/mock/home/dir")
  }
});

vi.mock("os", () => {
  return {
    homedir: homedirMock
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

  it("should return null if home directory is not accessible", async () => {
    // Prepare
    homedirMock.mockImplementation(() => {
      throw new Error("Home directory not accessible");
    });

    // Act
    const userId = await getUserId();

    // Verify
    expect(userId).toBeNull();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
