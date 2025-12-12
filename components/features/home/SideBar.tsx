import HomeSideBarBox from "@/components/features/home/SIdeBarBox";
import HomeSideBarProfile from "@/components/features/home/SideBarProfile";

export default function HomeSideBar() {
  return (
    <div className="max-w-[23.5%] flex-1 flex-col gap-y-3 hidden lg:flex">
      <HomeSideBarProfile />
      <HomeSideBarBox icon="/uc-announcement.svg" title="公告">
        <p>line 1</p>
        <p>line 2</p>
        <p>line 3</p>
        <p>line 4</p>
        <p>line 5</p>
        <p>line 6</p>
      </HomeSideBarBox>

      <HomeSideBarBox icon="/uc-announcement.svg" title="公告">
        <p className="wrap-anywhere">
          111111111111111111111111111111111111111111111111111111111111111111
        </p>
      </HomeSideBarBox>
    </div>
  );
}
