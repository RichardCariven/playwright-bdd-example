import React from "react";

const Box = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} flex h-32 w-32 rounded-lg bg-neutral-invert text-center`}
    >
      <p className="m-auto">{children}</p>
    </div>
  );
};

const IconBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative h-32 w-32">
      <div
        className={`${className} relative z-20 flex h-32 w-32 rounded-lg bg-neutral-blur text-center`}
      >
        <p className="m-auto">{children}</p>
      </div>
      <img
        className="absolute bottom-0 left-0 right-0 top-0 z-10 m-auto w-20"
        src="/rayo_icon_logo.svg"
        alt="rayo icon"
      />
    </div>
  );
};
export const Effects = () => {
  return (
    <div className="text-neutral">
      <h1 className="mb-4 text-2xl">Effects</h1>
      <div className="flex gap-20">
        <div className="flex flex-col">
          <h2 className="mb-4 text-xl">Drop Shadow</h2>
          <div className="flex flex-col gap-10">
            <Box className="shadow-sm">Small</Box>
            <Box className="shadow-md">Medium</Box>
            <Box className="shadow-lg">Large</Box>
            <div className="al flex h-32 w-32 rounded-full shadow-disc">
              <p className="m-auto bg-neutral-invert text-neutral">
                Station Disc
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-4 text-xl">Blur</h2>
          <div className="flex flex-col gap-10">
            <IconBox className="backdrop-blur-sm">Small</IconBox>
            <IconBox className="backdrop-blur-md">Medium</IconBox>
            <IconBox className="backdrop-blur-lg">Large</IconBox>
          </div>
        </div>
      </div>
    </div>
  );
};
