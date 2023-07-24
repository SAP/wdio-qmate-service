"use strict";

const ErrorHandler = require("../../../../lib/reuse/helper/errorHandler").default;

describe("errorHandler - logException - displaying customized message without stacktrace", async function () {
  let errorMessage;
  it("Execution", async function () {
    const errorHandler = new ErrorHandler(false);
    try {
      throw new Error("Divide by zero error.");
    } catch (error) {
      try {
        await errorHandler.logException(error);
      } catch (error) {
        errorMessage = error.message;
      }
    }
  });

  it("Verification", async function () {
    common.assertion.expectEqual(errorMessage.trim(), "Error: Function '' failed with : Divide by zero error.");
  });
});

describe("errorHandler - logException - displaying customized message with stacktrace", async function () {
  let errorMessage;
  it("Execution", async function () {
    const errorHandler = new ErrorHandler(true);
    errorMessage = await (async function display() {
      try {
        throw new Error("File not found exception");
      } catch (error) {
        try {
          await errorHandler.logException(error);
        } catch (error) {
          return error.message;
        }
      }
    })();
  });

  it("Verification", async function () {
    common.assertion.expectTrue(errorMessage.trim().includes("Error: Function 'display' failed with : File not found exception"));
    common.assertion.expectTrue(errorMessage.trim().includes("logException.spec"));
  });
});

describe("errorHandler - logException - displaying customized message with stacktrace without default constructor value", async function () {
  let errorMessage;
  it("Execution", async function () {
    const errorHandler = new ErrorHandler();
    errorMessage = await (async function display() {
      try {
        throw new Error("Array index out of bound exception");
      } catch (error) {
        try {
          await errorHandler.logException(error);
        } catch (error) {
          return error.message;
        }
      }
    })();
  });

  it("Verification", async function () {
    common.assertion.expectTrue(errorMessage.trim().includes("Error: Function 'display' failed with : Array index out of bound exception"));
    common.assertion.expectTrue(errorMessage.trim().includes("logException.spec"));
  });
});

describe("errorHandler - logException - displaying generic error message", async function () {
  let errorMessage;
  it("Execution", async function () {
    const errorHandler = new ErrorHandler(false);
    try {
      await errorHandler.logException();
    } catch (error) {
      errorMessage = error.message;
    }
  });

  it("Verification", async function () {
    common.assertion.expectTrue(errorMessage.trim().includes("Error: Failed due to the exception occurred at the block"));
  });
});
