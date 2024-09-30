/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react";

import { useTrue } from "./useTrue";

describe(`useTrue`, () => {
  test(`returns true as the initial state`, () => {
    const { result } = renderHook(() => useTrue());
    expect(result.current).toBe(true);
  });
});
