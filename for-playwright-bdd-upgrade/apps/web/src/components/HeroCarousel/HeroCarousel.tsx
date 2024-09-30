import { CarouselCard } from "@rayo/ui/components";
import { cn } from "@rayo/ui/tailwind/utils/cn";

import { HeroCarouselScrollerWrapper } from "./components/HeroCarouselScrollerWrapper";

function HeroCarousel() {
  const slides = [
    <CarouselCard
      key="slide_1"
      title={
        <>
          Say hello to <span className="block md:inline">Rayo</span>
        </>
      }
      subtitle="The home of your favourite artists, presenters and more!"
      bg="/static-assets/hero-carousel/Background-Large.webp"
      mobileBg="/static-assets/hero-carousel/Background-Mobile.png"
      focalImage="/static-assets/hero-carousel/Model-Large.webp"
      buttons={[
        {
          type: "link",
          variant: "secondary",
          href: "https://about.hellorayo.co.uk",
          label: "Learn more",
          hardNav: true,
          target: "_blank",
        },
      ]}
    />,
    <CarouselCard
      key="slide_2"
      title="Win life-changing cash!"
      subtitle="Win Happy is the home of our biggest cash competitions - will you be our next winner?"
      bg="/static-assets/hero-carousel/mmaw-hero-desktop.webp"
      mobileBg="/static-assets/hero-carousel/mmaw-hero-mobile.webp"
      focalImage="/static-assets/hero-carousel/mmaw-focal.webp"
      buttons={[
        {
          type: "link",
          variant: "secondary",
          href: "https://winhappy.com/?utm_source=rayonav&utm_medium=referral&utm_campaign=whrayowebbanner",
          label: "Enter now",
          hardNav: true,
          target: "_blank",
        },
      ]}
    />,
  ];

  return (
    <HeroCarouselScrollerWrapper>
      {slides.map((slide) => (
        <div
          key={slide.key}
          className={cn("w-full snap-center justify-center pt-10 lg:pt-20")}
        >
          {slide}
        </div>
      ))}
    </HeroCarouselScrollerWrapper>
  );
}

export { HeroCarousel };
