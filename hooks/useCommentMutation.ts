import { mutate } from "swr";
import { API_KEYS } from "@/lib/api-keys";
import { fetcher } from "@/lib/fetcher";
import type { CommentItem, CommentListParams, CreateCommentRequest, LikeCommentResponse } from "@/types/comment";

export function useCommentMutations() {
  const createComment = async (
    data: CreateCommentRequest,
  ): Promise<CommentItem> => {

    return await fetcher<CommentItem>(API_KEYS.comments.create, {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const likeComment = async (id: string): Promise<LikeCommentResponse> => {

    return await fetcher<LikeCommentResponse>(API_KEYS.comments.like(id), {
      method: "POST",
    });
  };

  const unlikeComment = async (id: string): Promise<LikeCommentResponse> => {

    return await fetcher<LikeCommentResponse>(API_KEYS.comments.unlike(id), {
      method: "POST",
    });
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
