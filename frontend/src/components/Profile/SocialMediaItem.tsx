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
        className="flex h-6 w-full items-center gap-2"
        title={`click to open ${socialMediaName} link`}
      >
        <div className="h-6 w-6 shrink-0">{children}</div>
        <span className="max-w-[14rem] grow overflow-hidden text-ellipsis hover:underline">
          {socialMediaUrl}
        </span>
      </a>
    );
  }
  return <></>;
};

export default SocialMediaItem;
