/**
 * @class browser
 * @memberof common
 */
const Browser = function () {
    
  // =================================== WINDOWS HANDLES ===================================
  //@TODO: refactor whole functions
  //@TODO: need to be updated - would be good to return all handles getWindowHandles() in array
  /**
   * @function waitForWindows
   * @memberOf common.browser
   * @example await common.browser.waitForWindows();
   */
  this.waitForWindows = async function (expectedWindowsNumber, retries = 50, waitInternal = 1000) {
    try {
      const windowHandles = await browser.getWindowHandles();
      //if(!windowHandles) return await this.waitForWindow(expectedWindowsNumber, retries, waitInternal);
      console.log("Windows length -->" + windowHandles.length);
      if (windowHandles.length === expectedWindowsNumber) {
        return expect(true).toEqual(true); //@TODO: change to promise resolve 
      }
      retries--;
      await browser.pause(waitInternal);
      if (retries < 1) {
        common.console.error("Function 'waitForWindows' failed: Timeout reached, increase the retries, window was not loaded fully.");
        return expect(true).toEqual(false); //@TODO: change to promise reject 
      }
      return await this.waitForWindows(expectedWindowsNumber, retries, waitInternal);
    } catch (error) {
      common.console.error(`Function 'waitForWindows' failed: ${error}`);
    }
  };

  // better to use this.switchToWindow
  /**
   * @function switchToNewWindow
   * @memberOf common.browser
   * @description Switches the window.
   * @param {String} originalHandle - The main window handle.
   * @param {String} windowTitle - Window Title to be expected
   * @example await common.browser.switchToNewWindow(originalHandle,);
   */
  this.switchToNewWindow = async function (originalHandle, windowTitle) {
    const windowHandles = await browser.getWindowHandles();

    for (let i = 0; i < windowHandles.length; i++) {
      await (async (idx) => {
        try {
          if (windowHandles[idx] !== originalHandle) {
            try {
              console.log("Switching window" + windowHandles[idx]);
              await browser.switchToWindow(windowHandles[idx]);
              await browser.executeScript("window.focus();", []);
              if (windowTitle) {
                const title = await browser.getTitle();
                if (sTitle === windowTitle) {
                  return expect(true).toEqual(true);
                }
                throw new Error("Function 'switchToNewWindow' failed.");
              } else {
                return expect(true).toEqual(true);
              }
            } catch (error) {
              commons.console.warn("Retrying 'switchToNewWindow'."); //@TODO: check for endeless recursion
              return await this.switchToNewWindow(originalHandle, windowTitle);
            }
          }
        } catch (e) {
          common.console.warn("Function 'switchToNewWindow': Could not get Title. Window already closed.");
        }
      })(i);
    }
  };

  /**
   * @function switchToWindow
   * @memberOf common.browser
   * @description Switches to the passed window.
   * @param {Object} handle - The window handle.
   * @example await common.browser.switchToWindow(originalWindowHandle);
   */
  this.switchToWindow = async function (handle) {
    await browser.switchToWindow(handle);
  };

  /**
   * @function getCurrentWindow
   * @memberOf common.browser
   * @description Returns the current window handle.
   * @returns {Object} The window handle.
   * @example await common.browser.getCurrentWindow();
   */
  this.getCurrentWindow = async function () {
    return browser.getWindowHandle();
  };

};
module.exports = new Browser();