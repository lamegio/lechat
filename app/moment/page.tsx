import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import { fetcher } from "@/lib/fetcher";
import { API_KEYS } from "@/lib/api-keys";
import type { PaginatedData } from "@/lib/fetcher";
import type { MomentItem } from "@/types/moment";
import MomentPageClient from "@/components/features/moment/MomentPageClient";

export default async function MomentPage() {
  const page = 1;
  const pageSize = 5;

  const moments = await fetcher<PaginatedData<MomentItem>>(
    API_KEYS.moments.list({ page, pageSize }),
  );

  return (
    <BaseContainer pageTitle="动态" pageDescription="记录生活的点点滴滴">
      <PageContentContainer>
        {/*<MomentHeader />*/}
        <MomentPageClient initialData={moments} />
      </PageContentContainer>
    </BaseContainer>
  );
}
