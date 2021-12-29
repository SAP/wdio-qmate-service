const path = require("path");

describe("PDF Parser", function () {

  describe("PDF from URL", function () {
    it("Verify text", async function () {
      const pdfPath = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
      // await util.file.expectPdfContainsText(pdfPath, "Dummy PDF file");
      await util.file.expectPdfContainsText(pdfPath, "Dumm y   PDF  fi le");
    });
  });

  describe("Local PDF file", function () {
    it("Verify text is present", async function () {
      const pdfPath = path.resolve(__dirname, "./testFiles/sample.pdf");
      await util.file.expectPdfContainsText(pdfPath, "A Simple PDF File");
    });
    it("Verify text is absent", async function () {
      const pdfPath = path.resolve(__dirname, "./testFiles/sample.pdf");
      await util.file.expectPdfNotContainsText(pdfPath, "Some random text");
    });
  });

  describe("Local PDF file with custom parser", function () {

    it("Verify text", async function () {
      const pdfPath = path.resolve(__dirname, "./testFiles/sample.pdf");
      function customParser(pageData) {
        const render_options = {
          //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
          normalizeWhitespace: false,
          //do not attempt to combine same line TextItem's. The default value is `false`.
          disableCombineTextItems: false
        };

        return pageData.getTextContent(render_options)
          .then(function (textContent) {
            //console.log(JSON.stringify(textContent));
            let lastY, text = "";
            for (const item of textContent.items) {
              if (lastY == item.transform[5] || !lastY) {
                text += " " + item.str + "Qmate is Awesome";
              }
              else {
                text += "\n" + item.str;
              }
              lastY = item.transform[5];
            }
            return text;
          });
      }
      await util.file.expectPdfContainsText(pdfPath, "Qmate is Awesome", customParser);
    });
  });
});