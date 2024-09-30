/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    `src/**/*.{js,ts,jsx,tsx}`,
    `../../packages/**/*.{js,ts,jsx,tsx}`,
    `**/.storybook/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    colors: {
      // Primitives
      "neutral-1000": "rgb(var(--neutral-1000) / <alpha-value>)",
      "neutral-900": "rgb(var(--neutral-900) / <alpha-value>)",
      "neutral-850": "rgb(var(--neutral-850) / <alpha-value>)",
      "neutral-750": "rgb(var(--neutral-750) / <alpha-value>)",
      "neutral-650": "rgb(var(--neutral-650) / <alpha-value>)",
      "neutral-350": "rgb(var(--neutral-350) / <alpha-value>)",
      "neutral-150": "rgb(var(--neutral-150) / <alpha-value>)",
      "neutral-50": "rgb(var(--neutral-50) / <alpha-value>)",
      "neutral-10": "rgb(var(--neutral-10) / <alpha-value>)",
      "neutral-0": "rgb(var(--neutral-0) / <alpha-value>)",
      "purple-800": "rgb(var(--purple-800) / <alpha-value>)",
      "purple-700": "rgb(var(--purple-700) / <alpha-value>)",
      "purple-500": "rgb(var(--purple-500) / <alpha-value>)",
      "purple-300": "rgb(var(--purple-300) / <alpha-value>)",
      "purple-100": "rgb(var(--purple-100) / <alpha-value>)",
      "purple-50": "rgb(var(--purple-50) / <alpha-value>)",
      "pink-500": "rgb(var(--pink-500) / <alpha-value>)",
      "aqua-500": "rgb(var(--aqua-500) / <alpha-value>)",
      "red-500": "rgb(var(--red-500) / <alpha-value>)",
      "red-300": "rgb(var(--red-300) / <alpha-value>)",
      "green-500": "rgb(var(--green-500) / <alpha-value>)",
      "green-300": "rgb(var(--green-300) / <alpha-value>)",
      // Variables
      primary: "rgb(var(--primary) / <alpha-value>)",
      "primary-light": "rgb(var(--primary-light) / <alpha-value>)",
      "primary-dark": "rgb(var(--primary-dark) / <alpha-value>)",
      "secondary-pink": "rgb(var(--secondary-pink) / <alpha-value>)",
      "secondary-aqua": "rgb(var(--secondary-aqua) / <alpha-value>)",
      "system-red": "rgb(var(--system-red) / <alpha-value>)",
      "system-green": "rgb(var(--system-green) / <alpha-value>)",
      neutral: "rgb(var(--neutral) / <alpha-value>)",
      "neutral-invert": "rgb(var(--neutral-invert) / <alpha-value>)",
      "neutral-light": "rgb(var(--neutral-light) / <alpha-value>)",
      "neutral-dark": "rgb(var(--neutral-dark) / <alpha-value>)",
      "neutral-darker": "rgb(var(--neutral-darker) / <alpha-value>)",
      "neutral-blur": "rgb(var(--neutral-blur) / 0.5)",
    },
    boxShadow: {
      sm: "var(--box-shadow-sm)",
      md: "var(--box-shadow-md)",
      lg: "var(--box-shadow-lg)",
      disc: "var(--box-shadow-disc)",
      focus: "var(--box-shadow-focus)",
      none: "var(--box-shadow-none)",
    },
    backdropBlur: {
      sm: "var(--blur-sm)",
      md: "var(--blur-md)",
      lg: "var(--blur-lg)",
    },
    extend: {
      fontFamily: {
        manrope: [`var(--font-manrope)`],
        rayo: [`var(--font-rayo)`],
      },
      backgroundImage: {
        "scrim-light":
          "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgb(var(--neutral-invert)) 41.67%)",
      },
      animation: {
        "mobile-nav-open": "mobile-nav-open .3s forwards",
        "mobile-nav-close": "mobile-nav-close .3s forwards",
        "slide-down": "slide-down .3s ease",
        selected:
          "selected-in 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), selected-out 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 200ms",
        fill: "fill-line 200ms forwards 300ms ease-in-out",
      },
      keyframes: {
        "selected-in": {
          "0%": { transform: "scaleX(1) scaleY(1)" },
          "100%": { transform: "scaleX(0.8) scaleY(0.8)" },
        },
        "selected-out": {
          "0%": { transform: "scaleX(0.8) scaleY(0.8)" },
          "100%": { transform: "scaleX(1) scaleY(1)" },
        },
        "fill-line": {
          to: {
            "stroke-dashoffset": 0,
          },
        },
        "mobile-nav-open": {
          "100%": { right: 0 },
        },
        "mobile-nav-close": {
          "0%": { right: 0, visibility: "visible" },
          "100%": { right: "-75%", visibility: "hidden" },
        },
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        "out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".heading-xxl-bold": {
          "@apply font-rayo text-[4rem] font-bold leading-[4.375rem]": {},
        },
        ".heading-xl-bold": {
          "@apply font-rayo text-[3.5rem] font-bold leading-[3.875rem]": {},
        },
        ".heading-l-bold": {
          "@apply font-rayo text-4xl font-bold leading-10": {},
        },
        ".heading-m-bold": {
          "@apply font-rayo text-2xl font-bold leading-[1.625rem]": {},
        },
        ".heading-s-bold": {
          "@apply font-rayo text-xl font-bold leading-[1.375rem]": {},
        },
        ".body-m-medium": {
          "@apply font-manrope text-base	font-medium leading-[1.375rem]": {},
        },
        ".body-m-bold": {
          "@apply font-manrope text-base font-bold leading-[1.375rem]": {},
        },
        ".body-s-medium": {
          "@apply font-manrope text-sm font-medium leading-[1.25rem]": {},
        },
        ".body-s-semibold": {
          "@apply font-manrope text-sm font-semibold leading-[1.25rem]": {},
        },
        ".body-s-bold": {
          "@apply font-manrope text-sm font-bold leading-[1.25rem]": {},
        },
        ".label-s-semibold": {
          "@apply font-manrope text-xs font-semibold leading-3": {},
        },
        ".label-s-bold": {
          "@apply font-manrope text-xs font-bold leading-3": {},
        },
        ".label-xs-semibold": {
          "@apply font-manrope text-[0.625rem] font-semibold leading-[0.625rem]":
            {},
        },
        ".label-xs-bold": {
          "@apply font-manrope text-[0.625rem] font-bold leading-[0.625rem]":
            {},
        },
        ".action-m-bold": {
          "@apply font-manrope text-base font-bold leading-4": {},
        },
        ".action-s-semibold": {
          "@apply font-manrope text-sm font-semibold leading-[0.875rem]": {},
        },
        ".content-wrapper-padding": {
          "@apply px-6 scroll-px-6 md:px-20 md:scroll-px-20 lg:px-[8.75rem] lg:scroll-px-[8.75rem]":
            {},
        },
        ".content-wrapper-padding-scrim": {
          "@apply relative before:left-0 before:hidden before:bg-gradient-to-r before:from-neutral-invert before:to-neutral-invert/0 after:right-0 after:hidden after:bg-gradient-to-l after:from-neutral-invert after:to-neutral-invert/0 lg:before:block lg:after:block":
            {},
        },
      });
    },
  ],
};
