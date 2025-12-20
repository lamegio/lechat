import { Metadata } from "next";
import { fetcher } from "@/lib/fetcher";
import { PublicConfigGroup } from "@/types/siteConfig";
import { API_KEYS } from "@/lib/api-keys";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const config = await fetcher<PublicConfigGroup>(API_KEYS.config.public());

    const basic = config.site?.basic;
    const seo = config.site?.seo;

    return {
      title: {
        default: basic?.title || "My Blog",
        template: `%s | ${basic?.title || "My Blog"}`,
      },
      description:
        basic?.description ||
        "长亭外，古道边，芳草碧连天。晚风拂柳笛声残，夕阳山外山。天之涯，地之角，知交半零落。人生难得是欢聚，唯有别离多。",
      keywords: seo?.keywords || [],
      authors: [{ name: seo?.author || basic?.author || "Anonymous" }],
      openGraph: {
        type: "website",
        locale: basic?.locale || "en-US",
        url: seo?.canonicalUrl || "https://example.com",
        siteName: basic?.title || "My Blog",
        title: basic?.title || "My Blog",
        description: basic?.description || "A personal blog",
        images: [
          {
            url: seo?.ogImage || "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: basic?.title || "My Blog",
          },
        ],
      },
      // twitter: {
      //   card:
      //     (seo?.twitterCard as "summary_large_image") || "summary_large_image",
      //   title: basic?.title || "My Blog",
      //   description: basic?.description || "A personal blog",
      //   images: [seo?.ogImage || "/og-image.jpg"],
      // },
      robots: {
        index: seo?.robots?.includes("index") ?? true,
        follow: seo?.robots?.includes("follow") ?? true,
      },
      verification: {
        google: seo?.googleSiteVerification || undefined,
        other: seo?.baiduSiteVerification
          ? { baidu: seo.baiduSiteVerification }
          : undefined,
      },
      icons: {
        icon: basic?.favicon || "/favicon.ico",
        shortcut: basic?.favicon || "/favicon.ico",
      },
    };
  } catch (error) {
    console.error("Failed to load config for metadata:", error);

    // 降级方案：返回默认 metadata
    return {
      title: "My Blog1",
      description: "A personal blog",
    };
  }
}
