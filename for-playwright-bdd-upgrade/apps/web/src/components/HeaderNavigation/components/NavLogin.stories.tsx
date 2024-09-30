import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import NavLogin from "./NavLogin";

const meta = {
  title: "Web App Components/HeaderNavigation/components/NavLogin",
  component: NavLogin,
  parameters: {
    decorator: "web-app-component",
  },
} satisfies Meta<typeof NavLogin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedOut = {
  args: {},
} satisfies Story;

export const LoggedIn = {
  args: {
    loggedIn: true,
    helloName: "Timo",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("profile-menu"));
  },
} satisfies Story;

export const LoggedInPremium = {
  args: {
    loggedIn: true,
    premiumUser: true,
    helloName: "Timo",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("profile-menu"));
  },
} satisfies Story;
