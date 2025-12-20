// hooks/useConfig.ts
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { API_KEYS } from "@/lib/api-keys";
import type {
  PublicConfigGroup,
  SiteInfoConfig,
  SiteSeoConfig,
  SiteCommentConfig,
  SiteArticleConfig,
  SiteFeatureConfig,
  SiteFooterConfig,
  SiteNavigationConfig,
  SiteBackgroundConfig,
} from "@/types/siteConfig";

interface UseConfigReturn {
  config: PublicConfigGroup | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | undefined;
}

/**
 * 获取所有公开配置
 */
export function useConfig(category?: string): UseConfigReturn {
  const { data, error, isLoading } = useSWR<PublicConfigGroup>(
    API_KEYS.config.public(category),
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    },
  );

  return {
    config: data,
    isLoading,
    isError: !!error,
    error: error as Error | undefined,
  };
}

/**
 * 获取网站信息配置（包含站长信息和社交链接）
 */
export function useSiteInfo(): SiteInfoConfig | undefined {
  const { config } = useConfig();
  return config?.site?.info;
}

/**
 * 获取 SEO 配置
 */
export function useSiteSeo(): SiteSeoConfig | undefined {
  const { config } = useConfig();
  return config?.seo;
}

/**
 * 获取评论系统配置
 */
export function useSiteComment(): SiteCommentConfig | undefined {
  const { config } = useConfig();
  return config?.comment;
}

/**
 * 获取文章展示配置
 */
export function useSiteArticle(): SiteArticleConfig | undefined {
  const { config } = useConfig();
  return config?.article;
}

/**
 * 获取网站功能配置
 */
export function useSiteFeature(): SiteFeatureConfig | undefined {
  const { config } = useConfig();
  return config?.feature;
}

/**
 * 获取页脚配置
 */
export function useSiteFooter(): SiteFooterConfig | undefined {
  const { config } = useConfig();
  return config?.site?.footer;
}

/**
 * 获取导航菜单配置
 */
export function useSiteNavigation(): SiteNavigationConfig | undefined {
  const { config } = useConfig();
  return config?.site?.navigation;
}

/**
 * 获取背景配置
 */
export function useSiteBackground(): SiteBackgroundConfig | undefined {
  const { config } = useConfig();
  return config?.site?.background;
}

/**
 * 获取单个配置项（按 key）
 */
export function useConfigByKey<T = Record<string, unknown>>(
  key: string,
): {
  config: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | undefined;
} {
  const { data, error, isLoading } = useSWR<T>(
    API_KEYS.config.publicByKey(key),
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    },
  );

  return {
    config: data,
    isLoading,
    isError: !!error,
    error: error as Error | undefined,
  };
}
