export function toCamelCase(str: string): string {
  return str
    .trim()
    .replace(/[\s-]+([a-zA-Z])/g, (_, group1: string) => group1.toUpperCase())
    .replace(/^[A-Z]/, (group1: string) => group1.toLowerCase())
    .replace(/[\s-]+/g, "");
}
