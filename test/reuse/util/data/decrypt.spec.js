describe("data - decrypt", function() {

  let decrypted;
  const data = util.data.getData("test.secure");

  it("Execution", function () {
    decrypted = util.data.decrypt(data.session.password);
  });

  it("Verification", function () {
    const dataExp = "Welcome1!";
    common.assertion.expectEqual(decrypted, dataExp);
  });

});