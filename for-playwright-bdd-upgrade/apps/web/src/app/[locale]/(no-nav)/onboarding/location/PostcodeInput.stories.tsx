import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import PostcodeInput from "./PostcodeInput";

const meta = {
  title: "Web App Components/Forms/Postcode Input",
  parameters: {
    decorator: "web-app-component",
  },
  component: PostcodeInput,
  decorators: [
    (Story) => (
      <div className="min-w-[310px]">
        <Story />
      </div>
    ),
  ],
  args: {
    locale: "en-gb",
  },
} satisfies Meta<typeof PostcodeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithValidation = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/postcode/i);

    await step("Check postcode validation is working", async () => {
      await userEvent.type(input, "zzz");
      await userEvent.tab();
      await expect(
        canvas.getByText(/postcode not recognised/i),
      ).toBeInTheDocument();
      await expect(input).toBeInvalid();
    });

    await step(
      "Check clearing the postcode will clear invalid state",
      async () => {
        await userEvent.clear(input);
        await userEvent.tab();
        await expect(input).toBeValid();
        await expect(
          canvas.queryByText(/postcode not recognised/i),
        ).not.toBeInTheDocument();
      },
    );

    await step("Valid postcode has a valid input state", async () => {
      await userEvent.type(input, "W9 1AG");
      await userEvent.tab();
      await expect(input).toBeValid();
      await expect(
        canvas.queryByText(/postcode not recognised/i),
      ).not.toBeInTheDocument();
    });
  },
} satisfies Story;

export const NoValidation = {
  args: {
    // TODO: Will need updating when validation is added to other regions
    // Currently just testing that no validation rules apply
    locale: "fi-fi",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/postcode/i);

    await step("Check postcode validation is working", async () => {
      await userEvent.type(input, "zzz");
      await userEvent.tab();
      await expect(input).toBeValid();
      await expect(
        canvas.queryByText(/postcode not recognised/i),
      ).not.toBeInTheDocument();
    });
  },
} satisfies Story;
