/* eslint-disable no-console */
// Temporary Linux CI probe. Remove after resolving the v10 select regressions.
exports.traceSelectInteraction = async function (interaction) {
  const context = util.browser.getContext();
  await browser.sessionSubscribe({ events: ["log.entryAdded", "browsingContext.navigationStarted"] });
  const browserLog = event => {
    if (event.text?.includes("[DEBUG-select-v10]")) console.log(event.text);
  };
  const navigation = event => console.log("[DEBUG-select-v10] navigation", JSON.stringify({ context: event.context, url: event.url }));
  browser.on("log.entryAdded", browserLog);
  browser.on("browsingContext.navigationStarted", navigation);
  await browser.execute(() => { window.__qmateSelectTrace = []; });
  const install = () => {
    for (const type of ["pointerdown", "click", "wheel", "scroll"]) {
      document.addEventListener(type, event => {
        const trace = window.top.__qmateSelectTrace;
        trace.push({ type, frame: window !== window.top, id: event.target.id, tag: event.target.tagName,
          x: event.clientX, y: event.clientY, deltaY: event.deltaY });
        console.log("[DEBUG-select-v10] event " + JSON.stringify(trace[trace.length - 1]));
        if (trace.length > 30) trace.shift();
      }, true);
    }
  };
  await browser.execute(install);
  await context.execute(install);
  const destroyed = event => console.log("[DEBUG-select-v10] destroyed", event.context);
  browser.on("browsingContext.contextDestroyed", destroyed);
  const snapshot = async phase => {
    const top = await browser.execute(() => ({ url: location.href, title: document.title,
      events: window.__qmateSelectTrace,
      frames: Array.from(document.querySelectorAll("iframe")).map(frame => ({ id: frame.id, src: frame.src, rect: frame.getBoundingClientRect().toJSON() }))
    }));
    let frame;
    try {
      frame = await context.execute(() => ({ url: location.href,
        controls: Object.values(window.sap.ui.core.Element.registry.all())
          .filter(control => control.isA("sap.m.MultiComboBox") || control.isA("sap.m.Select"))
          .map(control => ({ id: control.getId(), selected: control.getSelectedKeys?.() ?? control.getSelectedKey?.(),
            open: control.isOpen?.(), rect: control.getDomRef()?.getBoundingClientRect().toJSON() }))
      }));
    } catch (error) { frame = { error: error.message }; }
    console.log("[DEBUG-select-v10]", JSON.stringify({ phase, context: context.contextId, top, frame }));
  };
  await snapshot("before");
  try {
    return await interaction();
  } finally {
    await snapshot("after");
    browser.off("browsingContext.contextDestroyed", destroyed);
    browser.off("log.entryAdded", browserLog);
    browser.off("browsingContext.navigationStarted", navigation);
  }
};
