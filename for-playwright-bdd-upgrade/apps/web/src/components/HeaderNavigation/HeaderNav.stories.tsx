import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";

import HeaderNav from "./HeaderNav";

const meta = {
  title: "Web App Components/HeaderNavigation",
  component: HeaderNav,
  parameters: {
    decorator: "web-app-component",
    layout: "fullscreen",
  },
  args: { premium: true },
} satisfies Meta<typeof HeaderNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Open Mobile Nav", async () => {
      await userEvent.click(canvas.getByTestId("open-menu"));
      await waitFor(() =>
        expect(canvas.getByTestId("mobile-nav")).toHaveStyle({
          visibility: "visible",
        }),
      );
    });

    await step("Close Mobile Nav", async () => {
      await userEvent.click(canvas.getByTestId("close-menu"));
      await waitFor(() =>
        expect(canvas.getByTestId("mobile-nav")).toHaveStyle({
          visibility: "hidden",
        }),
      );
    });
  },
} satisfies Story;

export const MobileNavOpen = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
    chromatic: {
      modes: {
        mobile: { disable: true },
        "desktop (light)": { disable: true },
        "desktop (dark)": { disable: true },
        "mobile (light)": {
          theme: "light",
          viewport: "mobile2",
        },
        "mobile (dark)": {
          theme: "dark",
          viewport: "mobile2",
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("open-menu"));
  },
} satisfies Story;

export const LoggedIn = {
  args: { login: { loggedIn: true, helloName: "Tom" } },
  play: async ({ canvasElement, step }) => {
    const body = canvasElement.ownerDocument.body;
    const canvas = within(canvasElement);

    await step("Open Profile Menu", async () => {
      await userEvent.click(canvas.getByTestId("profile-menu"));
      await waitFor(() =>
        expect(
          within(body).getByTestId("profile-menu-portal"),
        ).not.toHaveAttribute("hidden"),
      );
    });

    await step("Close Profile Menu", async () => {
      await userEvent.click(body);
      await waitFor(() =>
        expect(within(body).getByTestId("profile-menu-portal")).toHaveAttribute(
          "hidden",
        ),
      );
    });
  },
} satisfies Story;

export const LoggedInAsPremium = {
  args: { login: { loggedIn: true, premiumUser: true, helloName: "Tom" } },
} satisfies Story;
