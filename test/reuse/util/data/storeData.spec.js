describe("data - storeData", function () {
  it("Execution", function () {
    const data = { test: "TEST" };
    const source = "store";
    util.data.storeData(data, source);
  });

  it("Verification", function () {
    const source = "customSourceData";
    const dataAct = util.data.getData("store", source);
    const dataExp = "TEST";
    common.assertion.expectEqual(dataAct, dataExp);
  });
});
