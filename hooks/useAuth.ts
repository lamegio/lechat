import useSWR, { type SWRResponse } from "swr";
import useSWRMutation, { type SWRMutationResponse } from "swr/mutation";
import { API_KEYS } from "@/lib/api-keys";
import { fetcher, setAuthToken, clearAuthToken } from "@/lib/fetcher";
import type {
  User,
  AuthResponse,
  GithubLoginParams,
  GoogleLoginParams,
} from "@/types/user";

export function useCurrentUser(): SWRResponse<User, Error> {
  return useSWR<User>(API_KEYS.auth.me, {
    revalidateOnMount: true,
    shouldRetryOnError: false,
  });
}

async function loginFetcher<T>(
  url: string,
  { arg }: { arg: T },
): Promise<AuthResponse> {
  const response = await fetcher<AuthResponse>(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });

  setAuthToken(response.accessToken);
  return response;
}

export function useGithubLogin(): SWRMutationResponse<
  AuthResponse,
  Error,
  string,
  GithubLoginParams
> {
  return useSWRMutation(API_KEYS.auth.github, loginFetcher<GithubLoginParams>);
}

export function useGoogleLogin(): SWRMutationResponse<
  AuthResponse,
  Error,
  string,
  GoogleLoginParams
> {
  return useSWRMutation(API_KEYS.auth.google, loginFetcher<GoogleLoginParams>);
}

export function useLogout(): { logout: () => void } {
  const logout = (): void => {
    clearAuthToken();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return { logout };
}
