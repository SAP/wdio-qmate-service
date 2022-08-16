---
name: Bug LOW
about: Create a report to help us improve
title: '[BUG][LOW] - Title of bug'
labels: bug
assignees: DIFSRIP, Templada

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Executable code snippet**

*config.js*
```js title="config"
const path = require("path");
const merge = require(path.resolve(process.env.DEEPMERGE_PATH));
const profile = require(path.resolve(process.env.QMATE_CONFIGS, "chrome.conf.js"));

exports.config = merge(profile.config, {
  baseUrl: "<your_system_url>",

  specs: [
    path.resolve(__dirname, "<your_spec_path>")
  ]
});
```

*yourtest.spec.js*
```js
describe("01_yourScript - describe the test", function () {

    it("Step 01: describe the step", async function () {
        // [...]
    });

    it("Step 02: describe the step", async function () {
        // [...]
    });

    // [...]

});
```

**Screenshots**
If applicable, add screenshots to help explain your problem.

**System information:**
 - OS: [e.g. Windows, Mac, Linux]
 - Browser [e.g. Chrome - Version 96.0.4664.93]
 - Qmate Version [e.g. 1.0.1]


**Additional context**
Add any other context about the problem here.
