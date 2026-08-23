import Image, { type ImageProps } from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";

type BrandLogoProps = Omit<ImageProps, "src" | "width" | "height" | "alt" | "unoptimized"> & {
  variant?: keyof typeof SITE_CONFIG.logos;
  decorative?: boolean;
  alt?: string;
};

export function BrandLogo({
  variant = "short",
  decorative = false,
  alt = SITE_CONFIG.name,
  ...props
}: BrandLogoProps) {
  const logo = SITE_CONFIG.logos[variant];

  return (
    <Image
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={decorative ? "" : alt}
      unoptimized
      {...props}
    />
  );
}
