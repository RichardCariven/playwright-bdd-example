import * as React from "react";

export const Card = ({
  title,
  cta,
  href,
}: {
  title: string;
  cta: string;
  href: string;
}) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="border-transparent from-brandred to-brandblue group mt-4 overflow-hidden rounded-lg border bg-gradient-to-r bg-origin-border text-[#6b7280]"
    >
      <div className="bg-zinc-900 h-full p-4">
        <p className="text-white inline-block text-xl">{title}</p>
        <div
          data-ignore-a11y="color-contrast"
          className="mt-4 text-xs group-hover:underline"
        >
          {cta} →
        </div>
      </div>
    </a>
  );
};
