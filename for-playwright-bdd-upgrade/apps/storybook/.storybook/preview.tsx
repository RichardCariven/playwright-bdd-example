import "@rayo/ui/tailwind/globals.css";

import { Suspense, type ReactElement } from "react";
import { initialize, mswLoader } from "msw-storybook-addon";

import { crowdinMocks, CrowdinProvider } from "@rayo/localisation";
import { handlers } from "@rayo/msw-handlers/src/handlers";
import { Screens } from "@rayo/ui/tailwind/globals";
import { withThemeByClassName } from "@storybook/addon-themes";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { type Preview } from "@storybook/react";

import { manrope, rayo } from "../fonts";
import {
  mockGetLocale,
  mockShuffle,
  mockUseLocale,
  mockUsePusherNowPlaying,
} from "./mocks";

initialize(
  {
    onUnhandledRequest: "bypass",
  },
  handlers,
);

const customPreview: Preview = {
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: `^on[A-Z].*` },
    backgrounds: { disable: true },
    nextjs: {
      appDirectory: true,
    },
    moduleMock: {
      mock: () => [
        mockGetLocale(),
        mockUseLocale(),
        mockUsePusherNowPlaying(),
        mockShuffle(),
      ],
    },
    loaders: [mswLoader],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    chromatic: {
      pauseAnimationAtEnd: true,
      modes: {
        mobile: {
          theme: "light",
          viewport: "mobile1",
        },
        "desktop (light)": {
          theme: "light",
          viewport: "xl",
        },
        "desktop (dark)": {
          theme: "dark",
          viewport: "xl",
        },
      },
    },
    viewport: {
      defaultViewport: "reset",
      viewports: {
        ...MINIMAL_VIEWPORTS,
        sm: {
          name: "Tailwind breakpoint - sm",
          styles: {
            width: `${Screens.SM}px`,
            height: "900px",
          },
        },
        md: {
          name: "Tailwind breakpoint - md",
          styles: {
            width: `${Screens.MD}px`,
            height: "900px",
          },
        },
        lg: {
          name: "Tailwind breakpoint - lg",
          styles: {
            width: `${Screens.LG}px`,
            height: "900px",
          },
        },
        xl: {
          name: "Tailwind breakpoint - xl",
          styles: {
            width: `${Screens.XL}px`,
            height: "900px",
          },
        },
        xxl: {
          name: "Tailwind breakpoint - 2xl",
          styles: {
            width: `${Screens.XXL}px`,
            height: "900px",
          },
        },
      },
    },
  },
  decorators: [
    (Story, { parameters }) => {
      const { decorator } = parameters;
      switch (decorator) {
        case "web-app-page":
        case "web-app-component":
          return (
            <WebAppDecorators>
              <Story />
            </WebAppDecorators>
          );
        default:
          return <Story />;
      }
    },
    (Story) => (
      <div className={`${manrope.variable} ${rayo.variable}`}>
        <Story />
      </div>
    ),
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default customPreview;

const WebAppDecorators = ({ children }: { children: ReactElement }) => (
  <CrowdinProvider dictionary={crowdinMocks["client-common"]}>
    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
  </CrowdinProvider>
);
