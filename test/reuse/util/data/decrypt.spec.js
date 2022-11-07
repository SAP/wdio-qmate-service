describe("data - decrypt", function() {

  let decrypted;
  const data = util.data.getData("test.secure");

  it("Execution", function () {
    decrypted = util.data.decrypt(data.session.password);
  });

  it("Verification", function () {
    const dataExp = "super-duper-sensitive-pw";
    common.assertion.expectEqual(decrypted, dataExp);
  });

});