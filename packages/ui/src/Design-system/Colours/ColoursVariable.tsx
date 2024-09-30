const Colour = ({ className }: { className: string }) => (
  <div className="flex items-center justify-between gap-4">
    <p>{className.replace("bg-", "")}</p>
    <div
      className={`${className} flex h-10 min-w-[100px] justify-center`}
    ></div>
  </div>
);

export const ColoursVariable = () => {
  return (
    <div className="flex flex-col gap-8 p-4 text-neutral">
      <div>
        <p className="mb-4 text-lg font-bold">Base Theme - Variable Colours</p>
        <div className="flex gap-4">
          <div>
            <Colour className="bg-neutral" />
            <Colour className="bg-neutral-light" />
            <Colour className="bg-neutral-dark" />
            <Colour className="bg-neutral-darker" />
            <Colour className="bg-neutral-invert" />
          </div>
          <div>
            <Colour className="bg-primary" />
            <Colour className="bg-primary-light" />
            <Colour className="bg-primary-dark" />
          </div>
          <div>
            <Colour className="bg-secondary-pink" />
            <Colour className="bg-secondary-aqua" />
            <Colour className="bg-system-red" />
            <Colour className="bg-system-green" />
          </div>
        </div>
      </div>
      <div>
        <p className="mb-4 text-lg font-bold">Base Theme - Opacity</p>
        <div className="flex gap-4">
          <div>
            <Colour className="bg-primary" />
            <Colour className="bg-primary/90" />
            <Colour className="bg-primary/80" />
            <Colour className="bg-primary/70" />
            <Colour className="bg-primary/60" />
          </div>
          <div>
            <Colour className="bg-primary/50" />
            <Colour className="bg-primary/40" />
            <Colour className="bg-primary/30" />
            <Colour className="bg-primary/20" />
            <Colour className="bg-primary/10" />
          </div>
        </div>
      </div>
    </div>
  );
};
