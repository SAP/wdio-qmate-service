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
      expected = `02.01.2025 15:30:45 ${date.getTimezoneOffset() < 0 ? "GMT+" : "GMT-"}${Math.abs(date.getTimezoneOffset() / 60)}`;
    });

    it("Execution", () => {
      formattedDate = util.formatter.formatDateWithTime(date, format);
    });

    it("Verification", async () => {
      await common.assertion.expectEqual(formattedDate, expected);
    });
  });
});
