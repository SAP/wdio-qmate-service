describe("formatter - formatDateWithTime", () => {
  let date;
  let format;
  let formattedDate;
  let expected;
  describe("formatDateWithTime - format mm/dd/yyyy h:mm:ss a", () => {
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

  describe("formatDateWithTime - format mm-dd-yyyy HH:mm:ss", () => {
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

  describe("formatDateWithTime - format dd.mm.yyyy HH:mm:ss", () => {
    it("Preparation", () => {
      date = new Date(2025, 0, 2, 15, 30, 45);
      format = "dd.mm.yyyy HH:mm:ss z";
      expected = `02.01.2025 15:30:45 ${calculateTimezoneOffset(date)}`;
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });

  describe("formatDateWithTime - format dd/mm/yyyy HH:mm:ss z", () => {
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

  describe("formatDateWithTime - format yyyymmdd h:mm:ss a z", () => {
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

  describe("formatDateWithTime - format yyyy/mm/dd HH:mm", () => {
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

  describe("formatDateWithTime - format yyyy.mm.dd h:mm a", () => {
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

  describe("formatDateWithTime - format yyyy-mm-dd HH", () => {
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

  describe("formatDateWithTime - format mmm dd, yyyy h a", () => {
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

  describe("formatDateWithTime - format mmm d, yyyy h a", () => {
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
});

function calculateTimezoneOffset(date) {
  const offset = date.getTimezoneOffset();
  return offset < 0 ? `GMT+${Math.abs(offset / 60)}` : `GMT-${offset / 60}`;
}
