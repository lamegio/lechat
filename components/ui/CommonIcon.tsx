import {
  FiGithub,
  FiMail,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiGlobe,
  FiFileText,
  FiInfo,
  FiLink,
  FiMessageSquare,
  FiArchive, FiFolder,
} from "react-icons/fi";
import {
  SiWechat,
  SiSinaweibo,
  SiZhihu,
  SiBilibili,
  SiTelegram,
  SiDiscord,
  SiReddit,
  SiMedium,
} from "react-icons/si";
import React from "react";

interface CommonIconProps {
  type: string;
  size?: number;
  className?: string;
}

const CommonIcon: React.FC<CommonIconProps> = ({
  type,
  size,
  className = "w-5 h-5",
}) => {
  const iconMap: Record<string, React.ElementType> = {
    github: FiGithub,
    email: FiMail,
    twitter: FiTwitter,
    linkedin: FiLinkedin,
    facebook: FiFacebook,
    instagram: FiInstagram,
    youtube: FiYoutube,
    website: FiGlobe,
    wechat: SiWechat,
    weibo: SiSinaweibo,
    zhihu: SiZhihu,
    bilibili: SiBilibili,
    telegram: SiTelegram,
    discord: SiDiscord,
    reddit: SiReddit,
    medium: SiMedium,
    // Navigation
    article: FiFileText,
    about: FiInfo,
    friend: FiLink,
    message: FiMessageSquare,
    archive: FiArchive,
    category: FiFolder,
    moment: FiInfo,
  };

  const Icon = iconMap[type.toLowerCase()] || FiGlobe;

  return <Icon size={size} className={className} />;
};

export default CommonIcon;
