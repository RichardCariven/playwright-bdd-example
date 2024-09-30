import { sortByKey } from "./sortByKey";

describe("sortByKey", () => {
  it("should sort objects by the specified key in the correct order", () => {
    const items = [
      { id: 3, name: "C" },
      { id: 1, name: "A" },
      { id: 2, name: "B" },
    ];

    const order = [1, 2, 3];
    const sortedItems = sortByKey(items, order, "id");

    expect(sortedItems).toEqual([
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 3, name: "C" },
    ]);
  });

  it("should place items with keys not in the order array at the end", () => {
    const items = [
      { id: 3, name: "C" },
      { id: 4, name: "D" },
      { id: 1, name: "A" },
      { id: 2, name: "B" },
    ];

    const order = [1, 2];
    const sortedItems = sortByKey(items, order, "id");

    expect(sortedItems).toEqual([
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 3, name: "C" }, // not in order, so should be at the end
      { id: 4, name: "D" }, // not in order, so should be at the end
    ]);
  });

  it("should handle empty items array", () => {
    const items: { id: number; name: string }[] = [];
    const order = [1, 2, 3];

    const sortedItems = sortByKey(items, order, "id");

    expect(sortedItems).toEqual([]);
  });

  it("should handle empty order array by keeping original order", () => {
    const items = [
      { id: 3, name: "C" },
      { id: 1, name: "A" },
      { id: 2, name: "B" },
    ];

    const order: number[] = [];
    const sortedItems = sortByKey(items, order, "id");

    expect(sortedItems).toEqual([
      { id: 3, name: "C" },
      { id: 1, name: "A" },
      { id: 2, name: "B" },
    ]);
  });

  it("should handle mixed types in the order array", () => {
    const items = [
      { id: "a", value: 10 },
      { id: 2, value: 20 },
      { id: "b", value: 30 },
    ];

    const order = ["a", 2];
    const sortedItems = sortByKey(items, order, "id");

    expect(sortedItems).toEqual([
      { id: "a", value: 10 },
      { id: 2, value: 20 },
      { id: "b", value: 30 }, // not in order, so should be at the end
    ]);
  });
});
