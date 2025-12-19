import Image from "next/image";
import Link from "next/link";
import { ChevronsRight, FolderOpen, PencilLine, Tags } from "lucide-react";
import {formatLocalDate} from "@/lib/date";

export default function ArticleCardRect({ article }: { article: any }) {
  return (
    <div className="bg-background-color-transparent-1 hover:scale-[1.01] duration-200 h-auto transition-all ease-in-out backdrop-blur-sm shadow-chat-card-shadow overflow-hidden rounded-2xl flex flex-col justify-start">
      {article?.coverImage && (
        <div className="w-full h-36  relative bg-red-300 overflow-hidden">
          <Image
            alt="article cover image"
            src={article.coverImage}
            loading="eager"
            fill
            sizes="cover"
            className="object-cover"
          />
        </div>
      )}
      <div className="h-auto py-6 px-9">
        <div>
          {article.isFeatured ? (
            <p className="inline mr-2 rounded-md bg-theme-color p-2 h-8 text-link-hover-font-color whitespace-nowrap">
              置顶
            </p>
          ) : null}
          <Link
            href={`/article/${article.slug}`}
            className="text-2xl font-bold text-font-color hover:text-theme-color"
          >
            {article.title}
          </Link>
          <div className="text-justify text-lg my-[0.9rem] line-clamp-3">
            {article.excerpt}
          </div>
          <div className="text-font-color-light-1 flex items-center justify-between text-[0.95rem] gap-[0.5rem]">
            <div className="flex justify-start gap-x-3.5">
              <div className="flex items-center flex-nowrap overflow-hidden">
                <PencilLine size={16} className="mr-1" />
                <span className="whitespace-nowrap">{formatLocalDate(article.publishedAt)}</span>
              </div>
              { article.categories[0] &&
              <div className="flex items-center flex-nowrap overflow-hidden">
                <FolderOpen size={16} className="mr-1" />
                <Link
                  href={`/category/${article.categories[0].slug}`}
                  className="whitespace-nowrap hover:text-theme-color"
                >
                  {article.categories[0].name}
                </Link>
              </div> }
              {article.tags ? (
                <div className="flex items-center flex-nowrap overflow-hidden">
                  <Tags size={16} className="mr-1" />
                  {article.tags.map((item: {id: string, name: string, slug: string}, index: number) => (
                    <div key={item.name}>
                      {index > 0 && <span className="mx-1">|</span>}
                      <Link
                        href={`/tag/${item.slug}`}
                        className="whitespace-nowrap hover:text-theme-color"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <Link
              href={`/article/${article.slug}`}
              className="flex hover:text-theme-color"
            >
              <p>阅读全文</p>
              <ChevronsRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
