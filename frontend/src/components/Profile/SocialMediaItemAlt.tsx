import React from "react";

const SocialMediaItem = ({
  socialMediaUrl,
  socialMediaName,
  children,
}: {
  socialMediaUrl: string;
  socialMediaName: string;
  children: React.ReactNode;
}) => {
  if (socialMediaUrl) {
    return (
      <a
        target="_blank"
        href={socialMediaUrl}
        className="flex h-6 w-auto items-center gap-2"
        title={`click to open ${socialMediaName} link`}
      >
        <div className="h-5 w-5 sm:h-7 sm:w-7 md:h-10 md:w-10 shrink-0">{children}</div>
        
      </a>
    );
  }
  return <></>;
};

export default SocialMediaItem;
