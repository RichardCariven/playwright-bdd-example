import { useState } from "react";

export const useTrue = () => {
  const [state] = useState(true);
  return state;
};
