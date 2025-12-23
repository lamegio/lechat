"use client";
import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import { CommentSection } from "@/components/features/comment/CommentSection";
import { CommentSection111 } from "@/components/features/comment/CommentSection111";
import { CommentType } from "@/types/comment";

interface Props {
  initialData: {
    aboutContent: string;
  };
}

export default function AboutClient({ initialData }: Props) {
  const defaultAboutContent = "<h1>什么都还没有...</h1>";

  const commentRefresh = async () => {
    console.log("refresh comment...");
  };

  const currentUser = {
    id: "1",
    displayName: "ZhiXiao",
    role: "admin",
    oauthAccount: null,
  };

  return (
    <BaseContainer pageTitle="关于" pageDescription="喵喵庙...">
      <PageContentContainer>
        <div
          dangerouslySetInnerHTML={{
            __html: initialData?.aboutContent || defaultAboutContent,
          }}
        ></div>
        <CommentSection type={CommentType.ABOUT} />
        {/*<CommentSection111 type={CommentType.ABOUT} />*/}
      </PageContentContainer>
    </BaseContainer>
  );
}


function getMockComments() {

  return [
    {
      id: "1",
      articleId: "article-123",
      parentId: null,
      author: {
        id: "admin-1",
        displayName: "站长",
        avatarUrl: "https://avatars.githubusercontent.com/u/1234567",
        role: "admin",
      },
      guest: null,
      content: "欢迎大家在这里交流讨论！🎉",
      status: "approved",
      likeCount: 15,
      createdAt: "2024-12-20T10:30:00Z",
      replyToName: null,
      replies: [
        {
          id: "2",
          articleId: "article-123",
          parentId: "1",
          author: null,
          guest: {
            name: "张三",
            email: "zhangsan@example.com",
            website: "https://zhangsan.blog",
          },
          content: "感谢站长的文章，写得非常详细！",
          status: "approved",
          likeCount: 3,
          createdAt: "2024-12-20T11:15:00Z",
          replyToName: "站长",
        },
      ],
    },
    {
      id: "3",
      articleId: "article-123",
      parentId: null,
      author: {
        id: "user-2",
        displayName: "GitHub User",
        avatarUrl: "https://avatars.githubusercontent.com/u/7654321",
        role: "reader",
      },
      guest: null,
      content: "这篇文章解决了我困扰很久的问题，太棒了！",
      status: "approved",
      likeCount: 8,
      createdAt: "2024-12-21T09:20:00Z",
      replyToName: null,
      replies: [],
    },
    {
      id: "4",
      articleId: "article-123",
      parentId: null,
      author: null,
      guest: {
        name: "李四",
        email: "lisi@example.com",
        website: null,
      },
      content: "请问作者有计划写续集吗？期待后续内容 😊",
      status: "approved",
      likeCount: 2,
      createdAt: "2024-12-22T14:45:00Z",
      replyToName: null,
      replies: [
        {
          id: "5",
          articleId: "article-123",
          parentId: "4",
          author: {
            id: "admin-1",
            displayName: "站长",
            avatarUrl: "https://avatars.githubusercontent.com/u/1234567",
            role: "admin",
          },
          guest: null,
          content: "感谢支持！续集正在筹备中，下周发布 👍",
          status: "approved",
          likeCount: 5,
          createdAt: "2024-12-22T15:10:00Z",
          replyToName: "李四",
        },
      ],
    },
  ];
}