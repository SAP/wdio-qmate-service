// File with a successful test to show the order of executed tests in case of a global WDIO retry
describe("Successful independent suite for global WDIO retry", function () {
  it("should be ok", async function () {
    expect(true).toBe(true);
  });
});