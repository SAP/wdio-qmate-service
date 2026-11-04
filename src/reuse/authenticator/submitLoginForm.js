/** Submit through the owned BiDi context without assuming navigation or reloading app state. */
async function submitLoginForm(element, context = browser) {
  if (!browser.isBidi) {
    await element.click();
    return;
  }
  if (context === browser) {
    const windowHandle = await browser.getWindowHandle();
    context = (await browser.browsingContexts()).find((candidate) => candidate.contextId === windowHandle);
  }
  if (!context) throw new Error("Could not resolve the active login browsing context");
  await context
    .action("pointer", { parameters: { pointerType: "mouse" } })
    .move({ origin: element, x: 0, y: 0, duration: 0 })
    .down({ button: 0 })
    .up({ button: 0 })
    .perform();
}

module.exports = submitLoginForm;
