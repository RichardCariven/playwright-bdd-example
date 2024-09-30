/**
 * @jest-environment jsdom
 */
import React, { type FunctionComponent, type ReactNode } from "react";

import { describe, expect, test } from "@jest/globals";
import { renderHook } from "@testing-library/react";

import { useCrowdin } from "../../hooks/useCrowdin/useCrowdin"; // Update this import

import { CrowdinContext } from "./CrowdinProvider";

const Wrapper: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

describe("useCrowdin", () => {
  test("should throw an error if no Translation context is available", () => {
    expect(() => {
      renderHook(() => useCrowdin(["_test"]), {
        wrapper: Wrapper,
      });
    }).toThrow(Error("Can't find Translation context provider"));
  });

  test("should return a translation function from the hook", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CrowdinContext.Provider value={{ greeting: "Hi", welcome: "Welcome" }}>
        {children}
      </CrowdinContext.Provider>
    );

    const { result } = renderHook(() => useCrowdin(["_test"]), {
      wrapper,
    });
    expect(typeof result.current).toBe("function");
  });

  test("should translate strings correctly", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CrowdinContext.Provider
        value={{
          greeting: "Hi",
          welcome: "Welcome",
          helloUser: "Hello {{username}}",
        }}
      >
        {children}
      </CrowdinContext.Provider>
    );

    const { result } = renderHook(() => useCrowdin(["_test"]), {
      wrapper,
    });
    const t = result.current;

    expect(t("greeting")).toBe("Hi");
    expect(t("welcome")).toBe("Welcome");
    expect(t("helloUser", { username: "John" })).toBe("Hello John");
  });
});
