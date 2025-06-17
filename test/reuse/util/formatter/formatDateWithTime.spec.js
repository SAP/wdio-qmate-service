describe("formatter - formatDateWithTime", () => {
  let date;
  let format;
  let formattedDate;
  let expected;

  // =================================== VALID CASES ===================================
  describe("formatDateWithTime - format 'mm/dd/yyyy h:mm:ss a'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "mm/dd/yyyy h:mm:ss a";
      expected = "01/02/2025 3:30:45 PM";
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'mm-dd-yyyy HH:mm:ss'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "mm-dd-yyyy HH:mm:ss";
      expected = "01-02-2025 15:30:45";
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'dd.mm.yyyy HH:mm:ss'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "dd.mm.yyyy HH:mm:ss";
      expected = `02.01.2025 15:30:45`;
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'dd/mm/yyyy HH:mm:ss z'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "dd/mm/yyyy HH:mm:ss z";
      expected = `02/01/2025 15:30:45 ${calculateTimezoneOffset(date)}`;
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'yyyymmdd h:mm:ss a z'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "yyyymmdd h:mm:ss a z";
      expected = `20250102 3:30:45 PM ${calculateTimezoneOffset(date)}`;
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'yyyy/mm/dd HH:mm'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "yyyy/mm/dd HH:mm";
      expected = "2025/01/02 15:30";
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'yyyy.mm.dd h:mm a'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "yyyy.mm.dd h:mm a";
      expected = "2025.01.02 3:30 PM";
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'yyyy-mm-dd HH'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "yyyy-mm-dd HH";
      expected = `2025-01-02 15`;
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'mmm dd, yyyy h a'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 10, 30, 45);
      format = "mmm dd, yyyy h a";
      expected = "Jan 02, 2025 10 AM";
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'mmm d, yyyy h a'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 10, 30, 45);
      format = "mmm d, yyyy h a";
      expected = "Jan 2, 2025 10 AM";
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'datetime'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 10, 30, 45);
      format = "datetime";
      expected = "datetime'2025-01-02T10:30:45'";
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'yyyy/mm/ddTHH:mm:ss' - delimiter 'T' between date and time", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 10, 30, 45);
      format = "yyyy/mm/ddTHH:mm:ss";
      expected = "2025/01/02T10:30:45";
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'yyyy/mm/ddTHH:mm:ss' - delimiter 'TT' between date and time", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 10, 30, 45);
      format = "yyyy/mm/ddTTHH:mm:ss";
      expected = "2025/01/02TT10:30:45";
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'yyyy/mm/ddHH:mm:ss' - no delimiter between date and time", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 10, 30, 45);
      format = "yyyy/mm/ddHH:mm:ss";
      expected = "2025/01/0210:30:45";
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format 'dd.mm.yyyy.hh.mm'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "dd.mm.yyyy.hh.mm";
      expected = "02.01.2025.15.30";
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  // =================================== ERROR CASES ===================================
  const additionalTextFormatError = (format) => `Invalid date time format: if you want to use '${format}' format, please use only '${format}' without any additional text`;

  describe("formatDateWithTime - invalid format - 'object object'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "object object";
    });

    it("Execution & Verification", function () {
      expect(() => util.formatter.formatDateWithTime(date, format)).toThrowError(additionalTextFormatError("object"));
    });
  });

  describe("formatDateWithTime - invalid format - 'datetime object'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "datetime object";
    });

    it("Execution & Verification", function () {
      expect(() => util.formatter.formatDateWithTime(date, format)).toThrowError(additionalTextFormatError("datetime"));
    });
  });

  describe("formatDateWithTime - invalid format - 'datetime HH:mm:ss'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "datetime HH:mm:ss";
    });

    it("Execution & Verification", function () {
      expect(() => util.formatter.formatDateWithTime(date, format)).toThrowError(additionalTextFormatError("datetime"));
    });
  });

  describe("formatDateWithTime - invalid format - 'dd/mm/yyyy object'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "dd/mm/yyyy object";
    });

    it("Execution & Verification", function () {
      expect(() => util.formatter.formatDateWithTime(date, format)).toThrowError(/Invalid time format provided. Available time formats: /);
    });
  });

  describe("formatDateWithTime - invalid format - 'dd/mm/yyyy datetime'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "dd/mm/yyyy datetime";
    });

    it("Execution & Verification", function () {
      expect(() => util.formatter.formatDateWithTime(date, format)).toThrowError(/Invalid time format provided. Available time formats: /);
    });
  });

  describe("formatDateWithTime - invalid format - 'HH:mm:ss a'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "HH:mm:ss a";
    });

    it("Execution & Verification", function () {
      expect(() => util.formatter.formatDateWithTime(date, format)).toThrowError(/Invalid date format provided. Available date formats: /);
    });
  });

  describe("formatDateWithTime - invalid format - 'yy-dd-mm HH:mm:ss a'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "yy-dd-mm HH:mm:ss a";
    });

    it("Execution & Verification", function () {
      expect(() => util.formatter.formatDateWithTime(date, format)).toThrowError(/Invalid date format provided. Available date formats: /);
    });
  });

  describe("formatDateWithTime - invalid format - 'yyyy/mm/dd HH:mm:ss some-text' - some-text after time", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 10, 30, 45);
      format = "yyyy/mm/dd HH:mm:ss some-text";
    });

    it("Execution & Verification", function () {
      expect(() => util.formatter.formatDateWithTime(date, format)).toThrowError(/Invalid time format provided. Available time formats: /);
    });
  });

  describe("formatDateWithTime - invalid format - 'dd.mm.yyyy.hh.mm.HH:mm:ss'", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "dd.mm.yyyy.hh.mm.HH:mm:ss";
    });

    it("Execution & Verification", function () {
      expect(() => util.formatter.formatDateWithTime(date, format)).toThrowError(additionalTextFormatError("dd.mm.yyyy.hh.mm"));
    });
  });
});

function calculateTimezoneOffset(date) {
  const offset = date.getTimezoneOffset();
  const sign = offset < 0 ? "+" : "-";
  const hours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, "0");
  const minutes = Math.abs(offset % 60).toString().padStart(2, "0");
  return `GMT${sign}${hours}:${minutes}`;
}
