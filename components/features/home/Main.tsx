import ArticleCardRect from "@/components/features/home/card/ArticleCardRect";

export default function HomeMain({ articles }: { articles: any[] }) {
  return (
    <div className="w-full lg:max-w-[75%] rounded-xl flex-1 flex flex-col gap-y-5">
      {articles.map((article: any, index) => <ArticleCardRect key={index} article={article} />)}
    </div>
  )
}