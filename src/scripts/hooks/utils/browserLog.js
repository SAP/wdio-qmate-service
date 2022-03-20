module.exports = {
  showBrowserLogs: async function () {
    const logList = await browser.getLogs("browser");
    if (logList) {
      logList.forEach(function (log) {
        if (log.level === "SEVERE") {
          // eslint-disable-next-line no-console
          console.log(log.message);
        }
      });
    }
  },

  addBrowserLogs: async function (allure) {
    const logList = await browser.getLogs("browser");
    if (logList && logList.length > 0) {
      for (let index = 0; index < logList.length; index++) {
        const log = logList[index];
        if (log.level === "SEVERE") {
          await allure.addAttachment("Browser logs", log.message);
        }
      }
    }
  }

};