import HomeSideBarProfile from "@/components/features/home/HomeSideBarProfile";
import HomeSideBarAnnouncement from "@/components/features/home/HomeSideBarAnnouncement";
import HomeSideBarCategories from "@/components/features/home/HomeSideBarCategories";
import HomeSideBarTags from "@/components/features/home/HomeSideBarTags";
import HomeSideBarRecentPosts from "@/components/features/home/HomeSideBarRecentPosts";

export default function HomeSideBar() {
  return (
    <div className="max-w-[23.5%] flex-1 flex-col gap-y-3 hidden lg:flex">
      <HomeSideBarProfile />
      <HomeSideBarAnnouncement />
      <HomeSideBarCategories />
      <HomeSideBarTags />
    </div>
  );
}
