import { type ReactElement } from "react";
import { getImageProps } from "next/image";

import { cn } from "../../tailwind/utils/cn";
import Image from "../Image/Image";
import { CarouselButton, type CarouselButtonProps } from "./CarouselButton";

interface HeroCardProps {
  title: string | ReactElement;
  subtitle: string;
  bg: string;
  mobileBg: string;
  focalImage?: string;
  centered?: boolean;
  buttons: CarouselButtonProps[];
}

function CarouselCard({
  title,
  subtitle,
  buttons,
  bg,
  mobileBg,
  focalImage,
  centered,
}: HeroCardProps) {
  const common = { alt: "" };

  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, width: 2320, height: 640, src: bg });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, width: 684, height: 650, src: mobileBg });

  return (
    <div className="relative m-auto h-[325px] w-full md:h-[256px] lg:h-[320px]">
      <div className="relative z-[1] grid h-full grid-cols-5 px-8 py-7 md:py-5">
        <h2
          className={cn(
            "col-span-full text-left text-[36px] font-light leading-[40px] text-neutral-0 md:col-span-3 md:content-end md:text-center md:text-[36px] md:leading-[40px] lg:text-[64px] lg:leading-[70px]",
            centered && "text-center md:col-span-full",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "col-span-3 text-sm text-neutral-0 md:content-center md:text-center lg:px-16",
            centered && "col-span-full text-center",
          )}
        >
          {subtitle}
        </p>
        <div
          className={cn(
            "col-span-full flex items-end justify-center gap-4 px-4 md:col-span-3 md:items-start",
            centered && "md:col-span-full",
          )}
        >
          {buttons.map((props, key) => (
            <CarouselButton key={key} {...props} />
          ))}
        </div>
      </div>
      <picture className="bg-neutral650 absolute top-0 -z-10 h-full w-full overflow-hidden rounded-xl">
        <source srcSet={desktop} media="(min-width: 767px)" />
        <img
          srcSet={mobile}
          className="h-full w-full object-cover"
          alt=""
          {...rest}
        />
      </picture>
      {focalImage && (
        <div className="absolute bottom-0 right-0 top-5 -z-10 w-3/4 overflow-hidden rounded-xl md:-top-10 lg:-top-12">
          <Image
            src={focalImage}
            fill={true}
            className="h-full w-full object-contain object-[right_-80px_bottom_0] md:object-right-bottom"
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export { CarouselCard };
