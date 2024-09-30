import Image from "next/image";

interface DiscBaseProps {
  imageSrc: string;
  title: string;
}
export const DiscBase = ({ imageSrc, title }: DiscBaseProps) => {
  return (
    <>
      <div className="relative aspect-square w-[80px] overflow-hidden rounded-full shadow-none transition-all duration-200 hover:shadow-sm group-focus-visible:shadow-focus md:w-[140px]">
        <Image fill src={imageSrc} alt="" />
      </div>
      <div className="mt-2 w-[89px] text-center text-neutral body-s-semibold">
        {title}
      </div>
    </>
  );
};
