import LinkedIn from "../LinkedIn";
import Instagram from "../Instagram";
import Twitter from "../Twitter";
import Behance from "../Behance";
import SocialMediaItemAlt from "./SocialMediaItemAlt";

function createFullURL(input: string, type: string) {
  const linkawal = input;
  let website = "instagram";
  if (type == "instagram") {
    website = "instagram";
  } else if (type == "behance") {
    website = "behance";
  } else if (type == "linkedin") {
    website = "linkedin";
  } else if (type == "twitter") {
    website = "twitter";
  }

  let fullURL;

  if (linkawal.startsWith("https://") || linkawal.startsWith("http://")) {
    fullURL = linkawal;
  } else if (linkawal.startsWith("www.")) {
    fullURL = "https://" + linkawal;
  } else if (linkawal.startsWith("@")) {
    fullURL = "https://www." + website + ".com/" + linkawal.slice(1);
  } else {
    fullURL = "https://www." + website + ".com/" + linkawal;
  }
  return fullURL;
}

const SocialMediaList = ({
  socialMedia,
}: {
  socialMedia: {
    instagramUrl?: string;
    twitterUrl?: string;
    linkedInUrl?: string;
    behanceUrl?: string;
  };
}) => {
  return (
    <div className="mt-5 flex flex-row gap-2 sm:gap-4 md:gap-8">
      {socialMedia?.instagramUrl && (
        <SocialMediaItemAlt
          socialMediaUrl={createFullURL(socialMedia.instagramUrl, "instagram")}
          socialMediaName="Instagram"
        >
          <Instagram />
        </SocialMediaItemAlt>
      )}
      {socialMedia?.twitterUrl && (
        <SocialMediaItemAlt
          socialMediaUrl={createFullURL(socialMedia.twitterUrl, "twitter")}
          socialMediaName="Twitter"
        >
          <Twitter />
        </SocialMediaItemAlt>
      )}
      {socialMedia?.linkedInUrl && (
        <SocialMediaItemAlt
          socialMediaUrl={createFullURL(socialMedia.linkedInUrl, "linkedin")}
          socialMediaName="LinkedIn"
        >
          <LinkedIn />
        </SocialMediaItemAlt>
      )}
      {socialMedia?.behanceUrl && (
        <SocialMediaItemAlt
          socialMediaUrl={createFullURL(socialMedia.behanceUrl, "behance")}
          socialMediaName="Behance"
        >
          <Behance />
        </SocialMediaItemAlt>
      )}
    </div>
  );
};

export default SocialMediaList;
