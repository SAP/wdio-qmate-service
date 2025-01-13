describe("data - decrypt", function () {
  let decrypted;
  const data = util.data.getData("decrypt.secure");

  it("Execution", function () {
    decrypted = util.data.decrypt(data.password);
  });

  it("Verification", function () {
    const dataExp = "super-duper-sensitive-pw";
    common.assertion.expectEqual(decrypted, dataExp);
  });
});

describe("data - decrypt - includeRepoUrl: false", function () {
  let decrypted;
  const data = util.data.getData("decrypt.noRepo.secure");

  it("Execution", function () {
    const options = { includeRepoUrl: false };
    decrypted = util.data.decrypt(data.password, options);
  });

  it("Verification", function () {
    const dataExp = "super-duper-sensitive-pw";
    common.assertion.expectEqual(decrypted, dataExp);
  });
});

describe("data - decrypt - useBase64Output: true", function () {
  let decrypted;
  const data = util.data.getData("decrypt.secure");

  it("Execution", function () {
    const options = { useBase64Output: true };
    decrypted = util.data.decrypt(data.password, options);
  });

  it("Verification", function () {
    const dataExp = "c3VwZXItZHVwZXItc2Vuc2l0aXZlLXB3";
    common.assertion.expectEqual(decrypted, dataExp);
  });
});

describe("data - decrypt - useBase64Input: true", function () {
  let decrypted;
  const data = util.data.getData("decrypt.base64.secure");

  it("Execution", function () {
    const options = { useBase64Input: true };
    decrypted = util.data.decrypt(data.password, options);
  });

  it("Verification", function () {
    const dataExp = "super-duper-sensitive-pw";
    common.assertion.expectEqual(decrypted, dataExp);
  });
});

describe("data - decrypt - error case (bad decrypt)", function () {
  const data = util.data.getData("decrypt.secure");

  it("Execution & Verification", function () {
    const errorMessageExp = "Function 'decrypt' failed: Decryption failed: None of the given data values could be decrypted using the given private key";
    const options = { includeRepoUrl: false };
    expect(() => util.data.decrypt(data.password, options)).toThrow(errorMessageExp);
  });
});
