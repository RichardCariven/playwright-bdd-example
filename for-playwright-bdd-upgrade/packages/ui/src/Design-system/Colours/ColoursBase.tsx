const Colour = ({ className }: { className: string }) => (
  <div className="flex items-center justify-between gap-4">
    <p>{className.replace("bg-", "")}</p>
    <div
      className={`${className} flex h-10 min-w-[100px] justify-center`}
    ></div>
  </div>
);

export const ColoursBase = () => {
  return (
    <div className="flex flex-col gap-8 p-4 text-neutral">
      <div>
        <p className="mb-4 text-lg font-bold">Base Theme - Primitives</p>
        <div className="flex gap-4">
          {/* Neutral Colors */}
          <div>
            <Colour className="bg-neutral-1000" />
            <Colour className="bg-neutral-900" />
            <Colour className="bg-neutral-850" />
            <Colour className="bg-neutral-750" />
            <Colour className="bg-neutral-650" />
            <Colour className="bg-neutral-350" />
            <Colour className="bg-neutral-150" />
            <Colour className="bg-neutral-50" />
            <Colour className="bg-neutral-10" />
            <Colour className="bg-neutral-0" />
          </div>
          <div>
            <Colour className="bg-purple-800" />
            <Colour className="bg-purple-700" />
            <Colour className="bg-purple-500" />
            <Colour className="bg-purple-300" />
            <Colour className="bg-purple-100" />
            <Colour className="bg-purple-50" />
          </div>
          <div>
            <Colour className="bg-pink-500" />
            <Colour className="bg-aqua-500" />
            <Colour className="bg-red-500" />
            <Colour className="bg-red-300" />
            <Colour className="bg-green-500" />
            <Colour className="bg-green-300" />
          </div>
        </div>
      </div>
      <div>
        <p className="mb-4 text-lg font-bold">Base Theme - Opacity</p>
        <div className="flex gap-4">
          {/* Neutral Colors */}
          <div>
            <Colour className="bg-purple-500" />
            <Colour className="bg-purple-500/90" />
            <Colour className="bg-purple-500/80" />
            <Colour className="bg-purple-500/70" />
            <Colour className="bg-purple-500/60" />
          </div>
          <div>
            <Colour className="bg-purple-500/50" />
            <Colour className="bg-purple-500/40" />
            <Colour className="bg-purple-500/30" />
            <Colour className="bg-purple-500/20" />
            <Colour className="bg-purple-500/10" />
          </div>
        </div>
      </div>
    </div>
  );
};
