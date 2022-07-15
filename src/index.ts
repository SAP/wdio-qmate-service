/* eslint-disable no-console */
"use strict";

import qmateLoaderSession from "./scripts/hooks/beforeSession";
import qmateLoader from "./scripts/hooks/before";
import onPrepareHook from "./scripts/hooks/onPrepare";
import onCompleteHook from "./scripts/hooks/onComplete";
import afterHook from "./scripts/hooks/after";
const pj = require("../package.json");

module.exports = class CustomWorkerService {
  /**
   * `serviceOptions` contains all options specific to the service
   * e.g. if defined as follows:
   *
   * ```
   * services: [['custom', { foo: 'bar' }]]
   * ```
   *
   * the `serviceOptions` parameter will be: `{ foo: 'bar' }`
   */
  // @ts-ignore
  constructor(serviceOptions, capabilities, config, browser) { }

  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // @ts-ignore
  async onPrepare(config, capabilities) {
    const logo = `                         __     
  ____ _____ ___  ____ _/ /____ 
 / __ \`/ __ \`__ \\/ __ \`/ __/ _ \\
/ /_/ / / / / / / /_/ / /_/  __/
\\__, /_/ /_/ /_/\__,_/\\__/\\___/ 
  /_/   \x1b[3m service v.${pj.version}\x1b[0m                              
      `;
    console.log(logo);
    try {
      await onPrepareHook(config, capabilities);
    } catch (e) {
      console.error(`onPrepare hook failed: ${e}`);
    }
  }

  /**
   * Gets executed just before initializing the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // @ts-ignore
  async beforeSession(config, capabilities, specs) {
    try {
      await qmateLoaderSession(config, capabilities, specs);
    } catch (e) {
      if (specs && specs[0]) {
        // `specs` variable is an array, but includes only one current spec
        console.error(`qmateLoader() in 'beforeSession' hook failed for spec '${specs[0]}'. ${e}`);
      } else {
        console.error(`qmateLoader() in 'beforeSession' hook failed. ${e}`);
      }
    }
  }

  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {Object}         browser      instance of created browser/device session
   */
  // @ts-ignore
  async before(capabilities, specs, browser) {
    // Errors in WDIO hooks are suppressed by default => we call process.exit(1). It will mark all specs as failed
    try {
      await qmateLoader(capabilities, specs, browser);
    } catch (e) {
      if (specs && specs[0]) {
        // `specs` variable is an array, but includes only one current spec
        util.console.error(`qmateLoader() in 'before' hook failed for spec '${specs[0]}'. ${e}`);
      } else {
        util.console.error(`qmateLoader() in 'before' hook failed. ${e}`);
      }
    }
  }

  /**
   * Gets executed before the suite starts.
   * @param {Object} suite suite details
   */
  async beforeSuite(suite: any) {
    util.console.log(` ${suite.fullTitle}  `, "black", "white");
  }

  /**
   * Function to be executed after a test (in Mocha/Jasmine)
   */
  // @ts-ignore
  async afterTest(test: any, context: any, { error, result, duration, passed, retries }) {
    // test.title - for mocha framework
    // test.description - for jasmine framework
    const testName = test.title || test.description;
    // Print test titles as in vyperForAll during test run
    if (!error && passed === true) {
      util.console.info(`\x1b[32m\t✓ ${testName}\x1b[0m  (${Math.round(duration / 1000)}s)`);
    } else if (error || passed !== true) {
      util.console.error(`\x1b[31m\t✗ ${testName}\x1b[0m  (${Math.round(duration / 1000)}s)`);
    }
  }

  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  async after(result: number, capabilities: any, specs: any) {
    try {
      afterHook(result, capabilities, specs);
    } catch (e) {
      util.console.error(`after hook failed: ${e}`);
    }
  }

  /**
   * Gets executed after all workers have shut down and the process is about to exit.
   * An error thrown in the `onComplete` hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  async onComplete(exitCode: number, config: any, capabilities: any, results: any) {
    try {
      await onCompleteHook(exitCode, config, capabilities, results);
    } catch (e) {
      util.console.error(`onComplete hook failed: ${e}`);
    }
  }
};
