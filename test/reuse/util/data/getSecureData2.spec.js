// Test that if data is imported again in another test file, the data is not decrypted again.

describe("data - getSecureData - external import", function () {
  const data = util.data.getSecureData("getSecureData");

  it("Verification", function () {
    const dataExp = "super-duper-sensitive-pw";
    const dataAct = data.session.password;
    common.assertion.expectEqual(dataAct, dataExp);
  });
});
