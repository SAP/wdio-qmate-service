describe("data - getSecureData - default source", function() {

  let data;

  it("Execution", function () {
    data = util.data.getSecureData("test");
  });

  it("Verification 1 - hashed value", function () {
    const dataExp = "super-duper-sensitive-pw";
    const dataAct = data.session.password;
    common.assertion.expectEqual(dataAct, dataExp);
  });

  it("Verification 2 - plain value", function () {
    const dataExp = 42;
    const dataAct = data.test.number;
    common.assertion.expectEqual(dataAct, dataExp);
  });

  it("Verification 3 - nested value", function () {
    const dataExp = "TEST";
    const dataAct = data.test.inner.value;
    common.assertion.expectEqual(dataAct, dataExp);
  });

  it("Verification 4 - alternatives from different keys", function () {
    const dataExp = "super-duper-sensitive-pw";
    const dataAct = data.alternatives;
    common.assertion.expectEqual(dataAct, dataExp);
  });

});

describe("data - getSecureData - custom source", function() {

  let data;

  it("Execution", function () {
    const source = "customSourceData";
    data = util.data.getSecureData("test", source);
  });

  it("Verification", function () {
    const dataExp = "super-duper-sensitive-pw";
    const dataAct = data.session.password;
    common.assertion.expectEqual(dataAct, dataExp);
  });

});

// =================================== KEEP DISABLED ===================================
// Can't be executed in pipeline because file is missing. Add the following to "data" folder to execute locally:

// test.local.json
// {
//   "session": {
//     "password": "super-duper-sensitive-pw"
//   }
// }

// describe("data - getSecureData - local fallback", function() {

//   let data;

//   it("Preparation", function () {
//     process.env.PRIVATEKEY_FOUND = false;
//   });

//   it("Execution", function () {
//     data = util.data.getSecureData("test");
//   });

//   it("Verification", function () {
//     const dataExp = "super-duper-sensitive-pw";
//     const dataAct = data.session.password;
//     common.assertion.expectEqual(dataAct, dataExp);
//   });
// });
// =======================================================================================