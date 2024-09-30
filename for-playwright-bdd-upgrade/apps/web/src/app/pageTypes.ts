import type React from "react";
import { type NextPage } from "next";

import { type Locale } from "@rayo/localisation/i18n";

export interface NextPageParams {
  params: { locale: Locale };
}

export interface NextLayoutProps extends NextPageParams {
  children: React.ReactNode | JSX.Element;
}

export type NextPageWithProps<PageProps = unknown> = NextPage<
  PageProps & NextPageParams
>;

export type NextLayoutWithParams<Params = unknown> = NextPage<
  Params & NextLayoutProps
>;
