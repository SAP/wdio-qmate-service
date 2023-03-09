describe("formatter - formatDate", function () {
  let date;
  let format;
  let formatted;
  let expected;

  describe("formatDate - format mm/dd/yyyy", async function () {
    it("Preparation", function () {
      date = new Date(2021, 0, 2);
      format = "mm/dd/yyyy";
      expected = "01/02/2021";
    });

    it("Execution", function () {
      formatted = util.formatter.formatDate(date, format);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(formatted, expected);
    });
  });

  describe("formatDate - format dd.mm.yyyy", async function () {
    it("Preparation", function () {
      date = new Date(2021, 0, 2);
      format = "dd.mm.yyyy";
      expected = "02.01.2021";
    });

    it("Execution", function () {
      formatted = util.formatter.formatDate(date, format);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(formatted, expected);
    });
  });

  describe("formatDate - format dd/mm/yyyy", async function () {
    it("Preparation", function () {
      date = new Date(2021, 0, 2);
      format = "dd/mm/yyyy";
      expected = "02/01/2021";
    });

    it("Execution", function () {
      formatted = util.formatter.formatDate(date, format);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(formatted, expected);
    });
  });

  describe("formatDate - format yyyymmdd", async function () {
    it("Preparation", function () {
      date = new Date(2021, 10, 1);
      format = "yyyymmdd";
      expected = "20211101";
    });

    it("Execution", function () {
      formatted = util.formatter.formatDate(date, format);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(formatted, expected);
    });
  });

  describe("formatDate - format yyyy/mm/dd", async function () {
    it("Preparation", function () {
      date = new Date(2021, 10, 1);
      format = "yyyy/mm/dd";
      expected = "2021/11/01";
    });

    it("Execution", function () {
      formatted = util.formatter.formatDate(date, format);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(formatted, expected);
    });
  });

  describe("formatDate - format dd.mm.yyyy.HH.MM", async function () {
    it("Preparation", function () {
      date = new Date(2021, 10, 1, 8, 5);
      format = "dd.mm.yyyy.HH.MM";
      expected = "01.11.2021.08.05";
    });

    it("Execution", function () {
      formatted = util.formatter.formatDate(date, format);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(formatted, expected);
    });
  });

  describe("formatDate - format MMM dd, yyyy - 'en-us'", async function () {
    it("Preparation", function () {
      date = new Date(2021, 9, 1, 8, 5);
      format = "MMM dd, yyyy";
      expected = "Oct 01, 2021";
    });

    it("Execution", function () {
      formatted = util.formatter.formatDate(date, format);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(formatted, expected);
    });
  });

  describe("formatDate - format MMM dd, yyyy - 'de-DE'", async function () {
    it("Preparation", function () {
      date = new Date(2021, 9, 1, 8, 5);
      format = "MMM dd, yyyy";
      expected = "Okt 01, 2021";
    });

    it("Execution", function () {
      formatted = util.formatter.formatDate(date, format, "de-DE");
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(formatted, expected);
    });
  });

  describe("formatDate - format MMM dd, yyyy - 'en-us' - short", async function () {
    it("Preparation", function () {
      date = new Date(2021, 9, 1, 8, 5);
      format = "MMM d, yyyy";
      expected = "Oct 1, 2021";
    });

    it("Execution", function () {
      formatted = util.formatter.formatDate(date, format, "en-us");
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(formatted, expected);
    });
  });
  
  describe("formatDate - format MMM dd, yyyy - 'de-DE' - short", async function () {
    it("Preparation", function () {
      date = new Date(2021, 9, 1, 8, 5);
      format = "MMM d, yyyy";
      expected = "Okt 1, 2021";
    });

    it("Execution", function () {
      formatted = util.formatter.formatDate(date, format, "de-DE");
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(formatted, expected);
    });
  });

  describe("formatDate - format datetime", async function () {
    it("Preparation", function () {
      date = new Date(2021, 10, 1, 8, 5, 5);
      format = "datetime";
      expected = `datetime'2021-11-01T08:05:05'`;
    });

    it("Execution", function () {
      formatted = util.formatter.formatDate(date, format);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(formatted, expected);
    });
  });
});