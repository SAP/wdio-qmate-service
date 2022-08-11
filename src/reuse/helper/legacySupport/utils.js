const fs = require("fs");

module.exports = {
  getLegacyMappingObjects: function (legacyMappingPath) {
    let legacyMappingFile;
    try {
      legacyMappingFile = fs.readFileSync(legacyMappingPath);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Unable to read from legacyMapping file. Error: ", e);
    }
    return JSON.parse(legacyMappingFile);
  }
};
// © 2022 SAP SE or an SAP affiliate company. All rights reserved.


