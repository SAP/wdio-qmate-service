const path = require("path");
const fs = require("fs");

describe("PDF Parser", function () {

  describe("parsePdf - from file", function () {
    let text;
    it("Execution", async function () {
      const pdfPath = path.resolve(__dirname, "./testFiles/sample.pdf");
      text = await util.file.parsePdf(pdfPath);
    });
    it("Verification", async function () {
      await common.assertion.expectDefined(text);
    });
  });

  describe("parsePdf - from buffer", function () {
    let text;
    it("Execution", async function () {
      const pdfPath = path.resolve(__dirname, "./testFiles/sample.pdf");
      const buffer = fs.readFileSync(pdfPath);
      text = await util.file.parsePdf(buffer);
    });
    it("Verification", async function () {
      await common.assertion.expectDefined(text);
    });
  });

  describe("expectPdfContainsText - from URL", function () {
    it("Execution and Verification", async function () {
      const pdfPath = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
      // await util.file.expectPdfContainsText(pdfPath, "Dummy PDF file");
      await util.file.expectPdfContainsText(pdfPath, "Dumm y   PDF  fi le");
    });
  });

  describe("expectPdfContainsText - local PDF file", function () {
    it("Execution and Verification", async function () {
      const pdfPath = path.resolve(__dirname, "./testFiles/sample.pdf");
      await util.file.expectPdfContainsText(pdfPath, "A Simple PDF File");
    });
  });
  describe("expectPdfNotContainsText - local PDF file", function () {
    it("Execution and Verification", async function () {
      const pdfPath = path.resolve(__dirname, "./testFiles/sample.pdf");
      await util.file.expectPdfNotContainsText(pdfPath, "Some random text");
    });
  });

  describe("expectPdfContainsText - local PDF file with custom parser", function () {

    it("Execution and Verification", async function () {
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