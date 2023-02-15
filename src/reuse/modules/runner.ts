"use strict";

import { TestFunction } from "mocha";

// Custom step type for Qmate Proxy Service -> will be skipped in REPLAY mode
export async function cit(testName: string, fn: TestFunction) {
  if (browser.config.params.qmateProxyService.mode === "REPLAY") {
    it.skip(testName, fn);
  } else {
    it(testName, fn);
  }
}

// Keep for future custom Qmate syntax

// export async function step(testName: string, fn: TestFunction) {
//   it(testName, fn);
// }

// export async function stepSkip(testName: string, fn: TestFunction) {
//   it.skip(testName, fn);
// }

// export async function stepRecordMode(testName: string, fn: TestFunction) {
//   if (browser.config.params.qmateProxyService.mode === "REPLAY") {
//     it.skip(testName, fn);
//   } else {
//     it(testName, fn);
//   }
// }
