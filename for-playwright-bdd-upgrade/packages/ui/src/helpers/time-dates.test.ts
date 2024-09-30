import {
  formatAMPM,
  formatEpisodeLength,
  timestampFromSeconds,
} from "./time-dates";

describe("timestamFromSeconds", () => {
  it("should format seconds into hh:mm", () => {
    expect(timestampFromSeconds(300, "hh:mm")).toBe("00:05");
  });

  it("should format seconds into mm:ss", () => {
    expect(timestampFromSeconds(300, "mm:ss")).toBe("05:00");
  });

  it("should return 00:00 when an invalid input is given", () => {
    const seconds = "John Doe" as unknown as number;

    expect(timestampFromSeconds(seconds, "mm:ss")).toBe("00:00");
  });
});

describe("formatAMPM", () => {
  it("should return the correct am/pm formatting", () => {
    expect(formatAMPM("2024-07-09 10:00:00")).toBe("10 am");
    expect(formatAMPM("2024-07-09 12:00:00")).toBe("12 pm");
    expect(formatAMPM("2024-07-09 13:00:00")).toBe("1 pm");
    expect(formatAMPM("2024-07-09 00:00:00")).toBe("12 am");
  });

  it("should return a from-to format when a length in seconds is provided", () => {
    expect(formatAMPM("2024-07-09 10:00:00", 3600)).toBe("10 am - 11 am");
    expect(formatAMPM("2024-07-09 10:00:00", 10800)).toBe("10 am - 1 pm");
    expect(formatAMPM("2024-07-09 23:00:00", 7200)).toBe("11 pm - 1 am");
  });

  it("should return an empty string for an invalid date", () => {
    const time = undefined as unknown as string;
    expect(formatAMPM("")).toBe("");
    expect(formatAMPM("20")).toBe("");
    expect(formatAMPM(time)).toBe("");
  });
});

describe("formatEpisodeLength", () => {
  it("should return a length in minutes", () => {
    expect(formatEpisodeLength(3600)).toBe("60 mins");
    expect(formatEpisodeLength(300)).toBe("5 mins");
  });

  it("should return only whole numbers", () => {
    expect(formatEpisodeLength(1832)).toBe("30 mins");
    expect(formatEpisodeLength(1859)).toBe("30 mins");
  });
});
