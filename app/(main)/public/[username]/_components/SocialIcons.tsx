import { SocialButton } from "@prisma/client";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { GrYoutube } from "react-icons/gr";
import { SiDiscord } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";

export const SocialIcons = ({
  socialButton,
}: {
  socialButton: SocialButton;
}) => {
  const getIcon = () => {
    switch (socialButton.type) {
      case "TWITTER":
        return <FaXTwitter className="text-gray-700 text-4xl" />;
      case "GITHUB":
        return <FaGithub className="text-gray-500 text-4xl" />;
      case "LINKEDIN":
        return <FaLinkedin className="text-blue-500 text-4xl" />;
      case "INSTAGRAM":
        return <AiFillInstagram className="text-pink-500 text-4xl" />;
      case "YOUTUBE":
        return <GrYoutube className="text-red-500 text-4xl" />;
      case "DISCORD":
        return <SiDiscord className="text-purple-500 text-4xl" />;
      case "FACEBOOK":
        return <FaFacebookSquare className="text-blue-500 text-4xl" />;
      default:
        break;
    }
  };

  const Icon = getIcon();

  return (
    <Link href={socialButton.url} target="_blank">
      {Icon}
    </Link>
  );
};
