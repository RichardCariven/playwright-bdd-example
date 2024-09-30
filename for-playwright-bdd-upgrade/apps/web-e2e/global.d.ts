import type { RuleConfig } from "html-validate";

export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toHTMLValidate(_config?: { _rules?: RuleConfig }): R;
      toAxeValidate(): R;
    }
  }
}
