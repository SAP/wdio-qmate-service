"use strict";

const ErrorHandler = require("../../../../lib/reuse/helper/errorHandler").default;

describe("errorHandler - logException - displaying customized message without stacktrace", async function () {
  it("Execution & Verification", async function () {
    const errorHandler = new ErrorHandler(false);
    await expect(async () => {
      await errorHandler.logException(new Error("Divide by zero error."));
    }).rejects.toThrow("Error: Function 'at' failed with : Divide by zero error.");
  });
});

describe("errorHandler - logException - displaying customized message with stacktrace", async function () {
  let errorObject;
  it("Execution", async function () {
    const errorHandler = new ErrorHandler(true);
    errorObject = await (async function display() {
      try {
        throw new Error("File not found exception");
      } catch (error) {
        try {
          await errorHandler.logException(error);
        } catch (error) {
          return error;
        }
      }
    })();
  });

  it("Verification", async function () {
    common.assertion.expectTrue(errorObject.message.includes("Error: Function 'display' failed with : File not found exception"));
    common.assertion.expectTrue(errorObject.stack.trim().includes("logException.spec"));
  });
});

describe("errorHandler - logException - displaying customized message with stacktrace without default constructor value", async function () {
  let errorObject;
  it("Execution", async function () {
    const errorHandler = new ErrorHandler();
    errorObject = await (async function display() {
      try {
        throw new Error("Array index out of bound exception");
      } catch (error) {
        try {
          await errorHandler.logException(error);
        } catch (error) {
          return error;
        }
      }
    })();
  });

  it("Verification", async function () {
    common.assertion.expectTrue(errorObject.message.trim().includes("Error: Function 'display' failed with : Array index out of bound exception"));
    common.assertion.expectTrue(errorObject.stack.trim().includes("logException.spec"));
  });
});

describe("errorHandler - logException - displaying generic error message", async function () {
  it("Execution & Verification", async function () {
    const errorHandler = new ErrorHandler(false);
    await expect(async () => {
      await errorHandler.logException();
    }).rejects.toThrow("Error: Failed due to the exception occurred at the block");
  });
});
