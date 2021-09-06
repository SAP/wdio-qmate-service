/* eslint-disable no-console */
/**
 * @class locator
 * @memberof nonUi5
 */
const Locator = function () {







  // need to be updated - would be good to return all handles getWindowHandles() in array
  /**
   * @function waitForWindows
   * @memberOf nonUi5.element
   * @example await nonUi5.element.waitForWindows();
   */
  this.waitForWindows = async function (expectedWindowsNumber, retries = 50, waitInternal = 1000) {
    try {
      const windowHandles = await browser.getWindowHandles();
      //if(!windowHandles) return await this.waitForWindow(expectedWindowsNumber, retries, waitInternal);
      console.log("Windows length -->" + windowHandles.length);
      if (windowHandles.length === expectedWindowsNumber) {
        return expect(true).toEqual(true);
      }
      retries--;
      await browser.pause(waitInternal);
      if (retries < 1) {
        console.log("waitForWindows(): Timeout reached, increase the retries, window was not loaded fully");
        return expect(true).toEqual(false);
      }
      return await this.waitForWindows(expectedWindowsNumber, retries, waitInternal);
    } catch (error) {
      console.log("Get window handles error--->" + error);
    }
  };

  // better to use this.switchToWindow
  /**
   * @function switchToNewWindow
   * @memberOf nonUi5.element
   * @description Switches the window.
   * @param {String} originalHandle - The main window handle.
   * @param {String} windowTitle - Window Title to be expected
   * @example await nonUi5.element.switchToNewWindow(originalHandle,);
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
                const sTitle = await browser.getTitle();
                console.log("Window title-->" + sTitle + "  expected--->" + windowTitle);
                if (sTitle === windowTitle) {
                  return expect(true).toEqual(true);
                }
                throw new Error("have to retry");
              } else {
                return expect(true).toEqual(true);
              }
            } catch (error) {
              console.log("retrying to switch window");
              return await this.switchToNewWindow(originalHandle, windowTitle);
            }
          }
        } catch (e) {
          console.log("Could not get Title. Window already closed.");
        }
      })(i);
    }
  };

  /**
   * @function switchToWindow
   * @memberOf nonUi5.element
   * @description Switches to the passed window.
   * @param {String} handle - The window handle.
   * @example await nonUi5.element.switchToWindow(originalWindowHandle);
   */
  this.switchToWindow = async function (handle) {
    await browser.switchToWindow(handle);
  };

  /**
   * @function getCurrentWindow
   * @memberOf nonUi5.element
   * @description Returns the current window handle.
   * @example await nonUi5.element.getCurrentWindow();
   */
  this.getCurrentWindow = async function () {
    return browser.getWindowHandle();
  };

};
module.exports = new Locator();