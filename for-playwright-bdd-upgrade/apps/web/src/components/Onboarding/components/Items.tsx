import { OnboardingDisc, type OnBoardDiscProps } from "@rayo/ui/components";

export const Items = ({
  renderedItems,
  loading,
  numLoadingItems,
}: {
  renderedItems: OnBoardDiscProps[];
  loading?: boolean;
  numLoadingItems?: number;
}) => {
  const _renderedItems = loading
    ? createLoadingStations(numLoadingItems ?? 4)
    : renderedItems;

  return (
    <section className="mx-[1.3rem] grid grid-cols-[repeat(auto-fill,_minmax(90px,_1fr))] flex-wrap justify-evenly gap-6 gap-x-[3vw] sm:mx-7 sm:flex sm:justify-center sm:gap-x-6 md:mx-20 md:gap-12 md:gap-y-8">
      {_renderedItems.map((item, i) => (
        <OnboardingDisc key={i} {...item} loading={loading} />
      ))}
    </section>
  );
};

const createLoadingStations = (count: number): OnBoardDiscProps[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i.toString(),
    loading: true,
    imageSrc: "",
    title: "",
  }));
