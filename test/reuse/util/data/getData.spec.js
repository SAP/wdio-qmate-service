describe("data - getData - default source", function() {

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

describe("data - getData - custom source", function() {

  let dataAct;

  it("Execution & Verification", function () {
    const source = "customSourceData";
    const data = util.data.getData("test", source);
    dataAct = data.test;
  });

  it("Verification", function () {
    const dataExp = "TEST";
    common.assertion.expectEqual(dataAct, dataExp);
  });

});