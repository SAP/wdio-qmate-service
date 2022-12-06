describe("data - storeData", function () {
  it("Execution", function () {
    const data = { test: "TEST" };
    const target = "store";
    util.data.storeData(data, target);
  });

  it("Verification", async function () {
    await util.browser.sleep(5000); // wait for file stored
    const dataAct = util.data.getData("store").test;
    const dataExp = "TEST";
    common.assertion.expectEqual(dataAct, dataExp);
  });
});
