"use client";

import useSWR from "swr";
import { FriendItem } from "@/types/friend";
import { useState } from "react";
import { API_KEYS } from "@/lib/api-keys";
import { fetcher } from "@/lib/fetcher";
import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import FriendCard from "@/components/features/friend/FriendCard";
import FriendInfoTabs from "@/components/features/friend/FriendInfoTabs";

interface Props {
  initialData: FriendItem[];
}

export default function FriendLinksClient({ initialData }: Props) {
  // const [activeTab, setActiveTab] = useState<"info" | "apply">("info");

  // ✅ SWR 使用初始数据，后续自动刷新
  // const { data: friends } = useSWR<FriendItem[]>(
  //   API_KEYS.friends.list(),
  //   fetcher,
  //   { fallbackData: initialData }, // 使用 SSR 数据作为初始值
  // );

  return (
    <BaseContainer
      pageTitle="友情链接"
      pageDescription="海内存知己，天涯若比邻"
    >
      <PageContentContainer>
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialData?.map((link) => (
              <FriendCard key={link.name} friend={link} />
            ))}
          </div>

          {/*<FriendInfoTabs activeTab={activeTab} setActiveTab={setActiveTab} />*/}
          <FriendInfoTabs />
        </div>
      </PageContentContainer>
    </BaseContainer>
  );
}
