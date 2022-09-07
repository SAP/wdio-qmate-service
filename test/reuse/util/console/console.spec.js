describe("console", function () {

  describe("log", function () {
    it("Execution", async function () {
      await util.console.log("Test log message");
    });
  });

  describe("error", function () {
    it("Execution", async function () {
      await util.console.error("Test error message");
    });
  });

  describe("warn", function () {
    it("Execution", async function () {
      await util.console.warn("Test warning message");
    });
  });

  describe("info", function () {
    it("Execution", async function () {
      await util.console.log("Test info message");
    });
  });

});