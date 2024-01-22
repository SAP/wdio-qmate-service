"use strict";

const { assert } = require("chai");

const ErrorHandler = require("../../../../lib/reuse/helper/errorHandler").default;

describe("errorHandler - logException - error message without stacktrace", async function () {
  it("Execution & Verification", async function () {
    const errorHandler = new ErrorHandler();
    await expect(async function display() {
      errorHandler.logException(new Error("Divide by zero error."), undefined, false);
    }).rejects.toThrow("Function 'display' failed with: Divide by zero error.");
  });
});

describe("errorHandler - logException - error message with stacktrace by passing stacktrace parameter value true", async function () {
  const errorHandler = new ErrorHandler();
  it("Execution & Verification", async function () {
    try {
      (function display() {
        errorHandler.logException(new Error("File not found exception"), undefined, true);
      })();
    } catch (error) {
      assert.isTrue(error.stack.toString().trim().includes(`QmateError: Function 'display' failed with: File not found exception`));
    }
  });
});

describe("errorHandler - logException - error message with stacktrace default value", async function () {
  const errorHandler = new ErrorHandler();
  it("Execution & Verification", async function () {
    await expect(async function display() {
      errorHandler.logException(new Error("Array index out of bound exception"));
    }).rejects.toThrow(/Function 'display' failed with: Array index out of bound exception/);
  });
});

describe("errorHandler - logException - generic error message", async function () {
  it("Execution & Verification", async function () {
    const errorHandler = new ErrorHandler();
    await expect(async () => {
      errorHandler.logException(undefined, undefined, false);
    }).rejects.toThrow("Failed due to an exception in the code block");
  });
});

describe("errorHandler - logException - Without message", async function () {
  it("Execution & Verification", async function () {
    const errorHandler = new ErrorHandler();
    await expect(async function display() {
      errorHandler.logException(new Error(), undefined, false);
    }).rejects.toThrow("Function 'display' failed with: unknown error");
  });
});

describe("errorHandler - logException - customized error message with stacktrace by having default constructor value", async function () {
  const errorHandler = new ErrorHandler();
  it("Execution & Verification", async function () {
    await expect(async function display() {
      errorHandler.logException(new Error(), "File not found in given path please pass the correct path");
    }).rejects.toThrow(/Function 'display' failed with: File not found in given path please pass the correct path/);
  });
});
