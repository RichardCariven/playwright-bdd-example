"use client";

import { useCallback } from "react";

export default function useObserver<T extends Element>(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit | undefined,
) {
  const ref = useCallback(
    (node: T) => {
      const observer = new IntersectionObserver(callback, options);

      if (node) {
        observer.observe(node);
      }

      return () => {
        observer.disconnect();
      };
    },
    [callback, options],
  );

  return ref;
}
