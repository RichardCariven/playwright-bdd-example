/**
 * Without catch-all route all paths which do not exist
 * under [locale] drops outside of [locale] dynamic route
 * where we can not get locale and 404 pages would be
 * not localised.
 */

import { notFound } from "next/navigation";

import { type NextPageWithProps } from "@web/app/pageTypes";

const NotFound: NextPageWithProps<{
  params: { 404: string[] };
}> = () => {
  notFound();
};

export default NotFound;

export const revalidate = 60 * 5;

export function generateStaticParams() {
  return [];
}
