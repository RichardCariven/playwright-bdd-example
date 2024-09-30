import type { Meta, StoryObj } from "@storybook/react";

import Layout from "./layout";
import Home from "./page";

const meta = {
  title: "Web App Pages/Home",
  parameters: {
    decorator: "web-app-page",
    layout: "fullscreen",
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
  },
  component: Home,
  decorators: [
    (
      Story,
      {
        args: {
          params: { locale },
        },
      },
    ) => (
      <Layout params={{ locale }}>
        <Story />
      </Layout>
    ),
  ],
  args: {
    params: {
      locale: "en-gb",
    },
  },
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page = {} satisfies Story;
