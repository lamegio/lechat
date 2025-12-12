import Sidebar from "./SideBar";
import Main from "./Main";

export default function HomeContainer({ articles }: { articles: any[] }) {
  return (
    <div className="min-h-screen w-full h-max py-24 px-4">
      <div className="max-w-xl flex justify-between mx-auto gap-3">
        <Sidebar />
        <Main articles={articles} />
      </div>
    </div>
  );
}
