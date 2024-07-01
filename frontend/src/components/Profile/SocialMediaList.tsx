import SocialMediaItem from "./SocialMediaItem";
import LinkedIn from "../LinkedIn";
import Instagram from "../Instagram";
import Twitter from "../Twitter";
import Behance from "../Behance";

const SocialMediaList = ({
  socialMedia,
}: {
  socialMedia: {
    instagramUrl: string;
    twitterUrl: string;
    linkedInUrl: string;
    behanceUrl: string;
  };
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-light uppercase tracking-wider text-gray-100">
        Akun sosial media
      </h2>
      <SocialMediaItem
        socialMediaUrl={socialMedia.instagramUrl}
        socialMediaName="Instagram"
      >
        <Instagram />
      </SocialMediaItem>
      <SocialMediaItem
        socialMediaUrl={socialMedia.twitterUrl}
        socialMediaName="Twitter"
      >
        <Twitter />
      </SocialMediaItem>
      <SocialMediaItem
        socialMediaUrl={socialMedia.linkedInUrl}
        socialMediaName="LinkedIn"
      >
        <LinkedIn />
      </SocialMediaItem>
      <SocialMediaItem
        socialMediaUrl={socialMedia.behanceUrl}
        socialMediaName="Behance"
      >
        <Behance />
      </SocialMediaItem>
    </div>
  );
};

export default SocialMediaList;
