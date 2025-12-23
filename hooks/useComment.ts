import useSWR, { type SWRResponse } from "swr";
import { API_KEYS } from "@/lib/api-keys";
import type { CommentListResponse, CommentListParams } from "@/types/comment";

export function useComments(
  params: CommentListParams,
): SWRResponse<CommentListResponse, Error> {
  const key = API_KEYS.comments.list(
    params as unknown as Record<string, string | number | boolean>,
  );

  return useSWR<CommentListResponse>(key, {
    revalidateOnMount: true,
    dedupingInterval: 3000,
  });
}
