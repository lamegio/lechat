import FixedFullScreenBackground from "@/components/features/home/FixedFullScreenBackground";
import HomeBanner from "@/components/features/home/BannerMain";
import HomeScrollDown from "@/components/features/home/ScrollDown";
import HomeContainer from "@/components/features/home/Container";
import { serverRequest } from "@/lib/serverRequest";

async function getArticles(id: string) {
  return serverRequest(`/articles`);
}

export default async function Home() {
  const articles = await getArticles("1");
  return (
    <main className="flex flex-col justify-start">
      <FixedFullScreenBackground />
      <HomeBanner />
      <HomeScrollDown />
      <HomeContainer articles={articles} />
    </main>
  );
}
