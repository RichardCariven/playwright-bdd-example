"use server";

export const handleSubmitGenres = async (
  _prevState: { message: string },
  formData: FormData,
): Promise<{ message: string }> => {
  // get selected genres as an array of strings.
  const selectedGenres: string[] = Array.from(formData.entries())
    .filter(([, value]) => value === "on")
    .map(([key]) => key);

  // validate form data here...
  if (selectedGenres.length < 3) {
    return { message: "Not enough genres selected" };
  }

  // save to subscription API here...

  // mock async request with message
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { message: "Genres submitted successfully" };
};
