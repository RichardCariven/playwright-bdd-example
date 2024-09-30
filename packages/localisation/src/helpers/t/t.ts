import { type DicMap, type PageId } from "../../types";
import { renderTemplate } from "../renderTemplate/renderTemplate";

export const t = <T extends PageId[]>(dictionary: Record<string, string>) => {
  type UnionToIntersection<U> = (
    U extends unknown ? (_k: U) => void : never
  ) extends (_k: infer I) => void
    ? I
    : never;

  type TDictionary = UnionToIntersection<
    {
      [K in T[number]]: K extends keyof DicMap ? DicMap[K] : never;
    }[T[number]]
  >;

  return <K extends keyof TDictionary & string = keyof TDictionary & string>(
    key: K,
    ...args: TDictionary[K] extends null ? [] : [params: TDictionary[K]]
  ) => {
    const params = args[0] ?? null;
    const entry = dictionary[key] ? dictionary[key] : key;
    return entry && params ? renderTemplate(entry, params) : entry || key;
  };
};
