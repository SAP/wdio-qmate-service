const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/sauce.labs.conf");
exports.config = merge(profile.config, {
  user: "3549e2d146bbf4a502afd06a071f4b0217da2e7015788135765fc3187eb2290fcdbf352518a423948698eefb17ba62dcad1403855ae7a215d0664d7ec05f5c847ea38b6e1cccdd21c5b0d86ed664ef88a7de6f4fe8fbb716db83000a102a5d753d9a43d491160c1e3206a5dcc31ef4a074a1da1e39d6f16613282f548bbe9a61baf33668e88c1443951b2f6dd8d51bfb81b81a80428b5c53197606095946deebca98b20960cc85cd31a5cf9a278d62d867dd602d59754442b8b8a8294307b374c807afc50c45f742d2e9b67a8248992a73abb07e4c271b647ccdb55db5925fa4e81b35fbc4db19eec1fd2410439ba7af5417a9c691faec3e807aba6a17e5f26fb5da8c18a519276dea9ead247c544a65696642c5d7a86dad63895f781a115434eb6626594078412d62ead47887dd0190b224a593a81f27a37d28124c3d6b94d0c17055c304a8de72841672f861693ae89fde4cff5cd6e118cbc0fd749f95f1ae",
  key: "f327bbae23d6881304a675ab9e1547ba9656a3a848f0d95646ae10c2a58814c510af03b80d7d08ffe4019d4b86c681ee09d23c38d97555165ad9f175e70afcb2d738e1d532742f9892325e7ae4400f72559db30c03c64d8dda376c057d4bdd60e7b4f44cc19647083d408772c2cef509826bee963fe1a833ae234e827555050729ef69a63931e1bf0f99e8160dbe62082b393f05e4f1d6089a19b0978b58e17ddfe617fb3f01478681d79a795026cc661d0289d99d06a86692f68817a158282b724166fb93c46ea1870bb3a85ec909b7f117bd6a22bdc70e53b61285d9c9680a55f9750ce9cf7c1dd57b22db91f19dda0ba68ed53de0c2acfb0b71ce0ad6ab8432b35c8f7d86de128c2b0759e90c8efe7ea949ef2d3dd75eb4277782cf71817c4b312cd36765496e04c7194a452e144195e073c625ba8a6c7c0bbe315f3f273bac427b26d6fc062513a0db55ca118bac194f2b90fb930b9b32135d52d8790525",
  region: "eu-central-1",

  maxInstances: 5,
  bail: 1,
  baseUrl: "http://localhost:34005/",

  specs: [
    path.resolve(__dirname, "clear.spec.js"),
    path.resolve(__dirname, "clearAndFill.spec.js"),
    path.resolve(__dirname, "clearAndRetry.spec.js"),
    path.resolve(__dirname, "clearAndFillAndRetry.spec.js"),
    path.resolve(__dirname, "click.spec.js"),
    path.resolve(__dirname, "clickAndRetry.spec.js"),
    path.resolve(__dirname, "clickElementInSvg.spec.js"),
    path.resolve(__dirname, "doubleClick.spec.js"),
    path.resolve(__dirname, "fill.spec.js"),
    path.resolve(__dirname, "fillAndRetry.spec.js"),
    path.resolve(__dirname, "mouseOverElement.spec.js"),
    path.resolve(__dirname, "moveCursorAndClick.spec.js"),
    path.resolve(__dirname, "checkAttributeAndValue.spec.js"),
    path.resolve(__dirname, "scrollToElement.spec.js"),
    path.resolve(__dirname, "rightClick.spec.js"),
    path.resolve(__dirname, "dragAndDrop.spec.js")
  ],
  exclude: [],

  services: [
    ["chromedriver", {
      port: 4444
    }],
    ["static-server", {
      port: 34005,
      folders: [{
        mount: "/waitForElements.html",
        path: path.resolve(__dirname, "../../../helper/website/waitForElements.html")
      },
      {
        mount: "/buttons.html",
        path: path.resolve(__dirname, "../../../helper/website/buttons.html")
      },
      {
        mount: "/checkBox.html",
        path: path.resolve(__dirname, "../../../helper/website/checkBox.html")
      },
      {
        mount: "/dropdown.html",
        path: path.resolve(__dirname, "../../../helper/website/dropdown.html")
      },
      {
        mount: "/forms.html",
        path: path.resolve(__dirname, "../../../helper/website/forms.html")
      },
      {
        mount: "/scrollPage.html",
        path: path.resolve(__dirname, "../../../helper/website/scrollPage.html")
      },
      {
        mount: "/tables.html",
        path: path.resolve(__dirname, "../../../helper/website/tables.html")
      },
      {
        mount: "/dragAndDropWdioExample.html",
        path: path.resolve(__dirname, "../../../helper/website/dragAndDropWdioExample.html")
      },
      {
        mount: "/dragAndDropFailing.html",
        path: path.resolve(__dirname, "../../../helper/website/dragAndDropFailing.html")
      }
      ]
    }]
  ]
});