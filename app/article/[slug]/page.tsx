import PageContentContainer from "@/components/container/PageContentContainer";
import BaseContainer from "@/components/container/BaseContainer";
import ArticleToc from "@/components/features/article/sidebar/Toc";
import { serverRequest } from "@/lib/serverRequest";
import { formatLocalDate } from "@/lib/date";
import { GiOpenFolder } from "react-icons/gi";

import Link from "next/link";
import Image from "next/image";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { MdUpdate } from "react-icons/md";
import { BsFileSpreadsheet } from "react-icons/bs";
import { IoTimerOutline } from "react-icons/io5";
import { FaFireFlameCurved } from "react-icons/fa6";
import renderMarkdown from "@/lib/markdownRenderer";

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await serverRequest(`/article/${slug}`, {
    next: {
      revalidate: 60,
      tags: [`article-${slug}`],
    },
  });
  const { html, toc } = await renderMarkdown(article.content)
    console.log(toc)
  return (
    <BaseContainer size="wide">
      <PageContentContainer>
        <article className="text-center">
          <h1 className="before:content-none m-0">{article.title}</h1>
          <p className="text-xl mt-7 mb-4">作者: {article.author}</p>
          <div className="flex gap-x-4 justify-center flex-wrap article-meta-info-box text-font-color-light-1">
            <div className="article-meta-info">
              <PiPencilSimpleLineBold />
              <time>发表于{formatLocalDate(article.publishDate)}</time>
            </div>
            <div>
              <MdUpdate />
              <time>更新于{formatLocalDate(article.updateDate)}</time>
            </div>
            <div>
              <BsFileSpreadsheet />
              <p>总字数:{article.WordCount}</p>
            </div>
            <div>
              <IoTimerOutline />
              <p>阅读时长:{article.readTime}</p>
            </div>
            <div>
              <FaFireFlameCurved />
              <p>访问量:{article.views}</p>
            </div>
            <div>
              <GiOpenFolder />
              <Link
                className="text-font-color-light-1 hover:no-underline"
                href={`/category/${article.category.slug}`}
              >
                {article.category.name}
              </Link>
            </div>
          </div>
          {article?.excerpt && (
            <div className="article-excerpt">{article.excerpt}</div>
          )}
          <div className="">
            <Image
              alt="article cover image"
              src={article.featuredImage}
              width={1000}
              height={500}
              loading="eager"
              sizes="cover"
              className="object-cover w-auto"
            />
          </div>
            <div className="article-main-content" dangerouslySetInnerHTML={{ __html: html }}></div>
        </article>
      </PageContentContainer>
      <ArticleToc items={toc} />
    </BaseContainer>
  );
}
