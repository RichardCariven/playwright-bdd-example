"use client";

import { signIn } from "@web/actions/signIn";

export const LoginExample = () => {
  return <button onClick={() => signIn()}>Login</button>;
};
