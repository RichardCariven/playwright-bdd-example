import { useContext, useMemo } from "react";

import { CrowdinContext } from "../../components/CrowdinProvider/CrowdinProvider";
import { t } from "../../helpers/t/t";
import { type PageId } from "../../types";

export const useCrowdin = <T extends PageId[]>(_: T) => {
  const dictionary = useContext(CrowdinContext);

  if (!dictionary) {
    throw new Error("Can't find Translation context provider");
  }

  return useMemo(() => {
    return t<T>(dictionary);
  }, [dictionary]);
};
