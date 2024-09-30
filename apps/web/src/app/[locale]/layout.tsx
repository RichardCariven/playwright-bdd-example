import "@rayo/ui/tailwind/globals.css";

import React from "react";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { CrowdinProvider } from "@rayo/localisation";
import {
  fetchCrowdinDictionary,
  getLanguageFromLocale,
  getLocale,
} from "@rayo/localisation/server";
import { manrope, rayo } from "@rayo/ui/fonts";
import { type NextLayoutWithParams } from "@web/app/pageTypes";
import { PusherProvider } from "@web/components/Providers/PusherProvider";
import { getRegionalConfig } from "@web/config";

const RootLayout: NextLayoutWithParams = async ({ children }) => {
  const locale = getLocale();
  const dictionary = await fetchCrowdinDictionary(locale, ["client-common"]);
  const { GA4, GTM } = getRegionalConfig(locale, "FEATURES");

  return (
    <html
      lang={getLanguageFromLocale(locale)}
      className={`bg-neutral-invert ${rayo.variable} ${manrope.variable}`}
    >
      {GTM.enabled && GTM.containerId && (
        <GoogleTagManager gtmId={GTM.containerId} />
      )}
      <body>
        <CrowdinProvider dictionary={dictionary}>
          <PusherProvider>{children}</PusherProvider>
        </CrowdinProvider>
      </body>
      {GA4.enabled && GA4.trackingId && (
        <GoogleAnalytics gaId={GA4.trackingId} />
      )}
    </html>
  );
};

export default RootLayout;
