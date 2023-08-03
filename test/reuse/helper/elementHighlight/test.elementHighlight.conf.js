const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,
  params: {
    highlightElements: {
      enable: true,
      duration: 2000,
      color: "green",
      actions: ["ui5.userInteraction.click", "ui5.userInteraction.fill"]
    }
  },
  baseUrl: "http://localhost:34005/",

  specs: [
    path.resolve(__dirname, "elementHighlight.spec.js")
  ],

  services: [
    [
      "static-server",
      {
        port: 34005,
        folders: [
          {
            mount: "/buttons.html",
            path: path.resolve(__dirname, "../../../helper/website/buttons.html")
          },
          {
            mount: "/forms.html",
            path: path.resolve(__dirname, "../../../helper/website/forms.html")
          },
        ]
      }
    ]
  ]
});
