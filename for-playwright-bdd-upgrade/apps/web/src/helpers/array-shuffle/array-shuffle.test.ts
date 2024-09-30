import { shuffle } from "./array-shuffle";

describe("array shuffle", () => {
  beforeAll(() => {
    jest.spyOn(Math, "random").mockReturnValue(0.123456789);
  });

  afterAll(() => {
    jest.spyOn(Math, "random").mockRestore();
  });

  it("shuffles an array into a random order", () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled = [9, 3, 4, 5, 6, 7, 8, 1, 10, 2];

    expect(shuffle(original)).toEqual(shuffled);
  });

  it("shuffles an array of objects into a random order", () => {
    const original = [
      { stationId: 1 },
      { stationId: 2 },
      { stationId: 3 },
      { stationId: 4 },
    ];
    const shuffled = [
      { stationId: 2 },
      { stationId: 3 },
      { stationId: 4 },
      { stationId: 1 },
    ];

    expect(shuffle(original)).toEqual(shuffled);
  });
});
