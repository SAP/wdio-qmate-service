const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/mobile.conf");

exports.config = merge(profile.config, {
    specs: [
        path.resolve(__dirname, "isPresent.spec.js"),
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    capabilities: [
        {
            "platformName": "Android",
            "appium:automationName": "UiAutomator2",
            "appium:platformVersion": "14.0",
            "appium:deviceName": "Pixel 7 API 34",
            "appium:app": path.join(process.cwd(), "app/sap-ibx-v1.12.0-1-debug.apk"),
            "appium:connectHardwareKeyboard": true,
            "appium:newCommandTimeout": 3600,
            "appium:name": 'Mobile App Automation wdio'
        }
    ],
    logLevel: 'debug',
    logLevels: {
        webdriver: 'info',
        webdriverio: 'info',
        '@wdio/appium-service': 'info'
    },
    services: [
        ['appium', {
            logPath: './logs',
            logFileName: 'wdio-appium.log',
        }]
    ],
    reporters: [
        'spec'
    ],
    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {object}  test             test object
     * @param {object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {*}       result.result    return object of test function
     * @param {number}  result.duration  duration of test
     * @param {boolean} result.passed    true if test has passed, otherwise false
     * @param {object}  result.retries   information about spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    }
});
