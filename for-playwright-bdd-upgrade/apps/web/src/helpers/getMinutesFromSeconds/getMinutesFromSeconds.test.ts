import { getMinutesFromSeconds } from "./getMinutesFromSeconds";

describe(`getMinutesFromSeconds`, () => {
  it(`returns the correct number of minutes`, () => {
    expect(getMinutesFromSeconds(180)).toBe(3);
    expect(getMinutesFromSeconds(120)).toBe(2);
    expect(getMinutesFromSeconds(60)).toBe(1);
    expect(getMinutesFromSeconds(30)).toBe(0);
  });
});
