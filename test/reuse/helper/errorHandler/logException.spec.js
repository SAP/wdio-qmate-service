"use strict";

const ErrorHandler = require("../../../../lib/reuse/helper/errorHandler").default;

// describe("errorHandler - logException - displaying customized message without stacktrace", async function () {
//   it("Execution & Verification", async function () {
//     const errorHandler = new ErrorHandler(false);
//     await expect(async function display() {
//       errorHandler.logException(new Error("Divide by zero error."));
//     }).rejects.toThrow("Function 'display' failed with : Divide by zero error.");
//   });
// });

describe("errorHandler - logException - displaying customized message with stacktrace by passing the constructor value", async function () {
  const errorHandler = new ErrorHandler(true);
  it("Execution & Verification", async function () {
    //await expect(async function display() {
      errorHandler.logException(new Error("File not found exception"));
    //}).rejects.toThrow(/Function 'display' failed with : File not found exception/);
  });
});

// describe("errorHandler - logException - displaying customized message with stacktrace without default constructor value", async function () {
//   const errorHandler = new ErrorHandler();
//   it("Execution & Verification", async function () {
//     await expect(async function display() {
//       errorHandler.logException(new Error("Array index out of bound exception"));
//     }).rejects.toThrow(/Function 'display' failed with : Array index out of bound exception/);
//   });
// });

// describe("errorHandler - logException - displaying generic error message", async function () {
//   it("Execution & Verification", async function () {
//     const errorHandler = new ErrorHandler(false);
//     await expect(async () => {
//       errorHandler.logException();
//     }).rejects.toThrow("Failed due to the exception occurred in the block");
//   });
// });
