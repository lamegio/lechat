import {
  FiGithub,
  FiMail,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiGlobe,
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

interface SocialIconProps {
  type: string;
  size?: number;
  className?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({
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
  };

  const Icon = iconMap[type.toLowerCase()] || FiGlobe;

  return <Icon size={size} className={className} />;
};

export default SocialIcon;
