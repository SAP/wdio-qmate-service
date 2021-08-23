describe("Mocha retry per suite/step", function () {
  let counterForTestWith2TimesRetry = 0;
  let counterForTestWith4TimesRetry = 0;
  // Retry failing tests in this suite up to 2 times. Can be overwritten via inner this.retries(n) call
  this.retries(2);
  this.beforeAll(async () => {
    await browser.navigateTo("https://webdriver.io");
  });

  it("should use 'this.retries(2)' retry on a suite level (and be retried 2 times)", async function () {
    await browser.navigateTo("https://webdriver.io");
    const title = await browser.getTitle();
    // console.log("number of retries wdio local ------------>" + counterForTestWith2TimesRetry); // for demo purposes
    if (counterForTestWith2TimesRetry < 2) {
      counterForTestWith2TimesRetry++;
      expect(title).toEqual("Wrong title");
    } else {
      expect(title).toEqual("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js");
    }
  });

  it("should use 'this.retries(2)' retry  on a suite level too (and be retried 2 times)", async function () {
    await browser.navigateTo("https://webdriver.io");
    const title = await browser.getTitle();
    // console.log("number of retries wdio local ------------>" + counterForTestWith2TimesRetry); // for demo purposes
    if (counterForTestWith2TimesRetry < 4) {
      counterForTestWith2TimesRetry++;
      expect(title).toEqual("Wrong title");
    } else {
      expect(title).toEqual("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js");
    }
  });

  it("should use local 'this.retries(4)' retry (and be retried 4 times)", async function () {
    // Retry this test up to 4 times.It overwrites outer this.retries(2) call
    this.retries(4);
    const title = await browser.getTitle();
    // console.log("number of retries wdio local ------------>" + counterForTestWith4TimesRetry); // for demo purposes
    if (counterForTestWith4TimesRetry < 4) { // Four retries - five test runs
      counterForTestWith4TimesRetry++;
      expect(title).toEqual("Wrong title");
    } else {
      expect(title).toEqual("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js");
    }
  });
});

describe("Mocha retry per step", function () {
  let counterForTestWith2TimesRetry = 0;
  let counterForTestWithoutRetry = 0;
  this.beforeAll(async () => {
    await browser.navigateTo("https://webdriver.io");
  });

  it("should use 'this.retries(2)' retry too (and be retries 2 times)", async function () {
    this.retries(2);
    const title = await browser.getTitle();
    // console.log("number of retries wdio local ------------>" + counterForTestWith2TimesRetry); // for demo purposes
    if (counterForTestWith2TimesRetry < 2) {
      counterForTestWith2TimesRetry++;
      expect(title).toEqual("Wrong title");
    } else {
      expect(title).toEqual("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js");
    }
  });

  // Should fail as there is no retry defined
  it.skip("should fail as there is no retry for a suite", async function () {
    const title = await browser.getTitle();
    // console.log("number of retries wdio local ------------>" + counterForTestWithoutRetry); // for demo purposes
    if (counterForTestWithoutRetry < 2) {
      counterForTestWithoutRetry++;
      expect(title).toEqual("Wrong title");
    } else {
      expect(title).toEqual("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js");
    }
  });
});