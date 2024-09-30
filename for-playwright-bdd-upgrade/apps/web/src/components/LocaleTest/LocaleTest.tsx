"use client";

import { useCrowdin } from "@rayo/localisation";

export const LocaleTest = () => {
  const t = useCrowdin(["client-common"]);

  return (
    <p className="m-5 text-center">
      This comes from context: {t("hello-username", { username: "me" })}
    </p>
  );
};
