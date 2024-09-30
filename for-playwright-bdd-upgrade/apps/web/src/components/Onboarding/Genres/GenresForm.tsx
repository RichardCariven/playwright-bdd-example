"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { useCrowdin } from "@rayo/localisation";
import { OnboardingDisc, type OnBoardDiscProps } from "@rayo/ui/components";
import { handleSubmitGenres } from "@web/actions/genres";

import { SubmitButton } from "../../Forms/submit-button";

interface OnboardingStep2FormProps {
  genres: OnBoardDiscProps[];
}

export const GenresForm = ({ genres }: OnboardingStep2FormProps) => {
  const t = useCrowdin(["client-common"]);
  const [state, formAction] = useFormState(handleSubmitGenres, { message: "" });
  const { pending } = useFormStatus();

  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string,
  ) => {
    if (e.target.checked) {
      setSelectedGenres((state) => [...state, itemId]);
    } else {
      setSelectedGenres((state) => state.filter((genre) => genre !== itemId));
    }
  };

  // TODO use state message from useFormState for toast?
  // eslint-disable-next-line no-console
  console.log(state.message);

  return (
    <form action={formAction}>
      <fieldset
        aria-disabled={pending}
        className="mx-[1.3rem] grid grid-cols-[repeat(auto-fill,_minmax(90px,_1fr))] flex-wrap justify-evenly gap-6 gap-x-[3vw] sm:mx-7 sm:flex sm:justify-center sm:gap-x-6 md:mx-20 md:gap-12 md:gap-y-8"
      >
        {genres.map((item, i) => (
          <OnboardingDisc
            key={i}
            {...item}
            disabled={pending}
            onChange={(e) => {
              handleOnChange && handleOnChange(e, item.id);
            }}
          />
        ))}
      </fieldset>
      <div className="sticky bottom-0 mt-auto flex flex-col items-center bg-scrim-light px-6 py-10">
        <SubmitButton
          disabled={selectedGenres.length < 3}
          className="w-full max-w-[20.25rem]"
        >
          {t("Continue")}
        </SubmitButton>
      </div>
    </form>
  );
};
