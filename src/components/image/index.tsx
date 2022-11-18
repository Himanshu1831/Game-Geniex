import React from "react";
import { loadImage } from "./cache";

//https://sergiodxa.com/articles/react/suspense-image-loading
export function SuspenseImage(
    props: React.ImgHTMLAttributes<HTMLImageElement>
  ): JSX.Element {
    loadImage(props.src as string).read();
    return <img {...props} />;
  }