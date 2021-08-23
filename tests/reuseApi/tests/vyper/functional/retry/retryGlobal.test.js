// this.wdioRetries cannot be used here
// variable (even global) cannot be used here due to scope refresh

// NOTE: this suite is failing all the time due to the first step. The suite should be retried
describe("Failing inner suite for global WDIO retry", function () {
  it("should fail", async function () {
    expect(true).toBe(false);
  });

  it("should be ok", async function () {
    expect(true).toBe(true);
  });
});

// NOTE: this suite is ok, but will be re-executed as prop 'specFileRetries' works for the whole file, not for a failed suite
describe("Successful inner suite for global WDIO retry", function () {
  it("should be ok", async function () {
    expect(true).toBe(true);
  });
});