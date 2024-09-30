import localFont from "next/font/local";

export const manrope = localFont({
  src: [
    {
      path: "./Manrope-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "./Manrope-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Manrope-SemiBold.woff2",
      weight: "600",
      style: "semi-bold",
    },
  ],
  variable: "--font-manrope",
});

export const rayo = localFont({
  src: [
    {
      path: "./Rayomabrypro-bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-rayo",
});
