// Alternative solution is to get a substring of hh:mm:ss
// new Date(5261 * 1000).toISOString().substring(11, 19)
// Then trim and "0" characters at the start of the string
// Again, this is waiting on confirmation from design team around how we will format timestamps in Helix Web
export function timestampFromSeconds(
  seconds: number,
  format: "mm:ss" | "hh:mm",
): string {
  if (typeof seconds !== "number") return "00:00";

  const timestamp = new Date(seconds * 1000).toISOString();

  if (format === "hh:mm") {
    return timestamp.substring(11, 16);
  } else {
    return timestamp.substring(14, 19);
  }
}

export function formatAMPM(date: string, length?: number): string {
  const _date = new Date(date);
  let hours = _date.getHours();

  if (isNaN(hours)) return "";

  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;

  if (!length) return `${hours} ${ampm}`;

  const endDate = new Date(_date.valueOf() + length * 1000).toISOString();
  return `${hours} ${ampm} - ${formatAMPM(endDate)}`;
}

export function formatEpisodeLength(length: number) {
  return `${Math.floor(length / 60)} mins`;
}
