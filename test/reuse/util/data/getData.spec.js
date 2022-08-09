describe("data - getData", function() {

  let dataAct;

  it("Execution & Verification", function () {
    const data = util.data.getData("test");
    dataAct = data.test;
  });

  it("Verification", function () {
    const dataExp = "TEST";
    common.assertion.expectEqual(dataAct, dataExp);
  });

});
