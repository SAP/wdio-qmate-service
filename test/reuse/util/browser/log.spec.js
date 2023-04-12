describe("browser", function () {

  describe("log", function () {
    it("Execution", async function () {
      await util.browser.log("Test log message");
    });
  });

  describe("warn", function () {
    it("Execution", async function () {
      await util.browser.warn("Test warning message");
    });
  });

  describe("error", function () {
    it("Execution", async function () {
      await util.browser.error("Test error message");
    });
  });

});