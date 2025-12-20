import Image from "next/image";
import HomeSideBarBox from "@/components/features/home/SideBarBox";

export default function HomeSideBarProfile() {
  const siteStat = {
    nickname: "知晓",
    bio: "不知晓不知晓",
    adminAvatarImageUrl: "/avatar.png",
    stat: [
      { name: "博客", stat: 21 },
      { name: "归档", stat: 10 },
      { name: "分类", stat: 5 },
      { name: "标签", stat: 6 },
    ],
  };

  return (
    <HomeSideBarBox>
      <div className="flex flex-col gap-y-3">
        <div className="w-24 h-24 rounded-3xl mx-auto overflow-hidden">
          <Image
            src={siteStat.adminAvatarImageUrl}
            alt="avatar"
            width={100}
            height={100}
            sizes="100px"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <p className="text-center font-bold text-xl">{siteStat.nickname}</p>
        <p className="text-center text-md text-font-color-light-1">
          {siteStat.bio}
        </p>
        <div className="flex justify-center gap-x-3 ">
          {siteStat.stat.map((item) => (
            <div key={item.name} className="flex flex-col items-center">
              <span>{item.stat}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </HomeSideBarBox>
  );
}
