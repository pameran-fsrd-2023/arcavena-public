const Image = ({
  src,
  alt,
  title,
  width,
  height,
  loading = "lazy",
  className,
}: {
  src: string;
  alt?: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
  className?: string;
}) => {
  const imageProps = {
    ...(alt && { alt }),
    ...(title && { title }),
    ...(width && { width }),
    ...(height && { height }),
    ...(loading && { loading }),
    ...(className && { className }),
  };

  return <img src={src || "/default-image.svg"} {...imageProps} />;
};

export default Image;
