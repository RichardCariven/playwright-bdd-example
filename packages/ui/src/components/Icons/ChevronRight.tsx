import { ChevronLeft } from "./ChevronLeft";

export const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => {
  return <ChevronLeft {...props} style={{ transform: "rotate(180deg)" }} />;
};
