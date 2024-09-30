"use client";

import { useRef, useState } from "react";

import { useCrowdin } from "@rayo/localisation";
import { type Locale } from "@rayo/localisation/i18n";
import { Input } from "@rayo/ui/components";
import { getPostcodeValidation } from "@web/helpers/validation/postcodeValidation";

export default function PostcodeInput({ locale }: { locale: Locale }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const t = useCrowdin(["client-common"]);

  const validateInput = () => {
    if (!inputRef.current) return;

    // Need to reset each time, or the input will never be valid, even if it passes pattern matching
    inputRef.current.setCustomValidity("");

    if (inputRef.current.value === "" || inputRef.current.validity.valid) {
      return setErrorMessage("");
    }

    const invalidMessage = t(
      "postcode-not-recognised-double-check-and-try-again",
    );

    if (inputRef.current.validity.patternMismatch) {
      setErrorMessage(invalidMessage);
      inputRef.current.setCustomValidity(invalidMessage);
    }

    if (!touched) setTouched(true);
  };

  function onChange() {
    // Track if the input has been activated so that validation only happens on keystroke after first attempt
    if (touched) {
      validateInput();
    }
  }

  return (
    <Input
      ref={inputRef}
      id="postcode"
      name="postcode"
      label={t("what-s-your-postcode")}
      placeholder={t("postcode-placeholder")}
      pattern={getPostcodeValidation(locale)}
      onBlur={validateInput}
      onChange={onChange}
      errorMessage={errorMessage}
    />
  );
}
