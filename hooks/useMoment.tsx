import useSWR, { type SWRResponse } from "swr";
import { API_KEYS } from "@/lib/api-keys";
import type { PaginatedData } from "@/lib/fetcher";
import type { MomentItem, MomentListParams } from "@/types/moment";

export function useMoments(
  params?: MomentListParams,
): SWRResponse<PaginatedData<MomentItem>, Error> {
  const key = API_KEYS.moments.list(
    params as Record<string, string | number | boolean>,
  );

  return useSWR<PaginatedData<MomentItem>>(key, {
    revalidateOnMount: true,
    dedupingInterval: 3000,
  });
}
