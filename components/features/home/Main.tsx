import ArticleCardRect from "@/components/features/home/card/ArticleCardRect";
import { ArticleListItem } from "@/types/article";

export default function HomeMain({ articles }: { articles: ArticleListItem[] }) {
  return (
    <div className="w-full lg:max-w-[75%] rounded-xl flex-1 flex flex-col gap-y-5">
      {articles.map((article: ArticleListItem, index) => <ArticleCardRect key={index} article={article} />)}
    </div>
  )
}