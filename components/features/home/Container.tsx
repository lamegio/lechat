import Sidebar from "./SideBar";
import HomeMain from "./Main";
import { ArticleListItem } from "@/types/article";

export default function HomeContainer({ articles }: { articles: ArticleListItem[] }) {
  return (
    <div className="min-h-screen w-full h-max px-4">
      <div className="max-w-xl flex justify-between mx-auto gap-3">
        <Sidebar />
        <HomeMain articles={articles} />
      </div>
    </div>
  );
}
