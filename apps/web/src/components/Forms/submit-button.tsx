"use client";

import { useFormStatus } from "react-dom";

import { Button, type ButtonProps } from "@rayo/ui/components";

export function SubmitButton(props: Omit<ButtonProps, "isLoading">) {
  const { pending } = useFormStatus();

  return <Button type="submit" isLoading={pending} {...props} />;
}
