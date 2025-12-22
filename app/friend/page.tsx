import { FriendItem } from "@/types/friend";
import { API_KEYS } from "@/lib/api-keys";
import { fetcher } from "@/lib/fetcher";
import FriendLinksClient from "@/components/features/friend/FriendLinksClient";

export default async function FriendLink() {
  const friends = await fetcher<FriendItem[]>(API_KEYS.friends.list());

  return <FriendLinksClient initialData={friends} />;
}
