export type ReplaceDictionary = Record<string, string | undefined>;

export const renderTemplate = (
  str: string,
  dictionary: ReplaceDictionary,
): string => {
  return str.replace(
    /{{(.*?)}}/g,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (org, captured) => dictionary[captured] ?? (org || ""),
  );
};
