"use client";

import NextImage, { type ImageLoaderProps, type ImageProps } from "next/image";

import { insertCloudinaryTransformations } from "../../helpers/cloudinary";

export default function Image(props: ImageProps) {
  return <NextImage {...props} loader={imageLoader} />;
}

function imageLoader(props: ImageLoaderProps) {
  if (props.src.includes("https://media.bauerradio.com/image/upload/")) {
    return cloudinaryLoader(props);
  }

  return props.src;
}

function cloudinaryLoader({ src, width }: ImageLoaderProps) {
  const transformations = ["q_auto", `w_${width}`];
  return insertCloudinaryTransformations(src, transformations);
}
