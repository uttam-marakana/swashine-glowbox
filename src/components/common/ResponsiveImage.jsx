import { getProductImageMetadata } from "@/data/company";

export default function ResponsiveImage({
  src,
  alt,
  className = "w-full h-full object-contain",
  pictureClassName = "block w-full h-full",
  sizes = "100vw",
  width = 800,
  height = 1000,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  ...imageProps
}) {
  const metadata = getProductImageMetadata(src);
  const srcSet = metadata?.variants
    .map(
      ({ src: variantSrc, width: variantWidth }) =>
        `${variantSrc} ${variantWidth}w`,
    )
    .join(", ");

  return (
    <picture className={pictureClassName}>
      {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        width={metadata?.width || width}
        height={metadata?.height || height}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchPriority}
        {...imageProps}
      />
    </picture>
  );
}
