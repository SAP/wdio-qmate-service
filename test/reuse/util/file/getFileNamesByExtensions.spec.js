const path = require("path");
describe("file - getFileNamesByExtensions - get file name by extension", function () {
  let dirPath;
  it("Preparation", async function () {
    dirPath = path.join(__dirname, "/testFiles"); //root path taken in pip
  });

  it("Execution & Verification - xml", async function () {
    const files = await util.file.getFileNamesByExtensions(dirPath, "xml");
    common.assertion.expectEqual(files, ["test1.xml", "test2.xml"]);
  });

  it("Execution & Verification - txt", async function () {
    const files = await util.file.getFileNamesByExtensions(dirPath, "txt");
    common.assertion.expectEqual(files, ["test.txt", "test2.txt", "test3.txt"]);
  });

  it("Execution & Verification - xlsx + xls", async function () {
    const files = await util.file.getFileNamesByExtensions(dirPath, ["xlsx", "xls"]);
    common.assertion.expectEqual(files, ["test.xls", "test1.xlsx"]);
  });

  it("Execution & Verification - pdf", async function () {
    const files = await util.file.getFileNamesByExtensions(dirPath, ["pdf"]);
    common.assertion.expectEqual(files, ["sample.pdf"]);
  });
});

describe("file - getFileNamesByExtensions - get file name by extension - error path", function () {
  let dirPath;
  it("Preparation", async function () {
    dirPath = path.join(__dirname, "/testFiles");
  });

  it("Execution & Verification - not existing file - empty array", async function () {
    const files = await util.file.getFileNamesByExtensions(dirPath, ".notExistingExt");
    common.assertion.expectEqual(files, []);
  });
});

