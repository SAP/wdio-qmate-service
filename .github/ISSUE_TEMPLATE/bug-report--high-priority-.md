---
name: Bug report (High Priority)
about: You found a severe bug? Let us know!
title: "[BUG][HIGH] - Title of bug"
labels: bug
assignees: Templada, DIFSRIP

---

**Describe the issue**
A clear and concise description of the bug.

**Error message / console output**
All relevant console outputs including the error message(s).

**Steps to reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

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

**Expected behavior**
A clear and concise description of the expected behavior.

**Screenshots**
If applicable, add screenshots to help describing the issue.

**System information:**
 - OS: [e.g. Windows, Mac, Linux]
 - Browser [e.g. Chrome - Version 96.0.4664.93]
 - Qmate Service Version [e.g. 1.0.1]

**Additional comments**
Any other relevant infromation about the issue.
