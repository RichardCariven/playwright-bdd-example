"use server";

import { redirect } from "next/navigation";

export const updatePostcode = async (formData: FormData) => {
  const postcode = formData.get("postcode");

  // TODO: CrowdIn translations for error messages
  // TODO: Add user PATCH request

  // TODO: Remove this mocked response when real user PATCH is added
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  // if successful post, redirct
  if (postcode) {
    redirect("/onboarding/genres");
  }
};
