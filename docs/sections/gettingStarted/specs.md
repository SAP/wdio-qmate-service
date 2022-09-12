# Specs

Inside the *.spec.js* file, you define the sequence of steps for your test script. Each file consists of at least one *describe* block.

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