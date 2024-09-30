"use client";

import React, { createContext, type ReactNode } from "react";

export const CrowdinContext = createContext<Record<string, string> | null>(
  null,
);
CrowdinContext.displayName = "CrowdinContext";

export const CrowdinProvider: React.FC<{
  dictionary: Record<string, string> | null;
  children: ReactNode | JSX.Element;
}> = ({ dictionary, children }) => {
  return (
    <CrowdinContext.Provider value={dictionary}>
      {children}
    </CrowdinContext.Provider>
  );
};
