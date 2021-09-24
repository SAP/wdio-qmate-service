var path = require("path");

describe("script", function () {
  it("Step 1", async function () {
    var files = ["1.txt", "2.txt"];
    var resolvedFilePaths = [];
    for (var i = 0; i < files.length; i++)
      // For example if your file structure is this :
      /*C:.
    └───Qmate Scripts
        │   FileUpload.spec.js
        │   FileUploadConfig.js
        │
        └───Files
                1.txt
                2.txt */
      // You require the following command
      // One step back, Inside Files folder
      resolvedFilePaths[i] = path.resolve("Files", files[i]);
    await util.dialogInteraction.uploadFile(resolvedFilePaths);
  });
});