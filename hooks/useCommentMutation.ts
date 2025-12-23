import { mutate } from "swr";
import { API_KEYS } from "@/lib/api-keys";
import { fetcher } from "@/lib/fetcher";
import type {
  CreateCommentRequest,
  CommentItem,
  LikeCommentResponse,
  CommentListParams,
} from "@/types/comment";

export function useCommentMutations() {
  const createComment = async (
    data: CreateCommentRequest,
  ): Promise<CommentItem> => {
    const result = await fetcher<CommentItem>(API_KEYS.comments.create, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return result;
  };

  const likeComment = async (id: string): Promise<LikeCommentResponse> => {
    const result = await fetcher<LikeCommentResponse>(
      API_KEYS.comments.like(id),
      {
        method: "POST",
      },
    );
    return result;
  };

  const unlikeComment = async (id: string): Promise<LikeCommentResponse> => {
    const result = await fetcher<LikeCommentResponse>(
      API_KEYS.comments.unlike(id),
      {
        method: "POST",
      },
    );
    return result;
  };

  const revalidateComments = (params: CommentListParams): void => {
    const key = API_KEYS.comments.list(
      params as unknown as Record<string, string | number | boolean>,
    );
    // TODO ???
    mutate(key);
  };

  return {
    createComment,
    likeComment,
    unlikeComment,
    revalidateComments,
  };
}
