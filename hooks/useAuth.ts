"use client";

import { useState, useEffect } from "react";

// 与NextAuth Session类型一致
export interface Session {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
  expires: string;
}

// 与NextAuth useSession返回类型一致
interface UseSessionReturn {
  data: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  update: (data?: unknown) => Promise<Session | null>;
}

// 模拟测试数据
const MOCK_SESSION: Session = {
  user: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "ZhiXiao",
    email: "ZhiXiao@example.com",
    image: "/avatar.png",
  },
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
};

/**
 * 模拟NextAuth的useSession
 * TODO: 后续替换为真实NextAuth的useSession
 */
export function useSession(): UseSessionReturn {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  useEffect(() => {
    // 模拟异步加载
    // const timer = setTimeout(() => {
      // TODO: 改为真实NextAuth session获取

      // 测试：已登录状态
      setSession(MOCK_SESSION);
      setStatus("authenticated");

      // 测试：未登录状态
      // setSession(null);
      // setStatus("unauthenticated");
    // }, 500);
    //
    // return (): void => {
    //   clearTimeout(timer);
    // };

  }, []);


  const update = async (data?: unknown): Promise<Session | null> => {
    // TODO: 实现session更新逻辑
    console.log("Update session:", data);
    return session;
  };

  return {
    data: session,
    status,
    update,
  };
}

// 与NextAuth signIn签名一致
interface SignInOptions {
  callbackUrl?: string;
  redirect?: boolean;
}

interface SignInResponse {
  error?: string;
  status?: number;
  ok?: boolean;
  url?: string | null;
}

/**
 * 模拟NextAuth的signIn
 * TODO: 后续替换为真实NextAuth的signIn
 */
export async function signIn(
  provider: "github" | "google",
  options?: SignInOptions,
): Promise<SignInResponse | undefined> {
  // TODO: 实现OAuth跳转
  console.log(`Sign in with ${provider}`, options);

  return {
    ok: true,
    status: 200,
    url: options?.callbackUrl || "/",
  };
}

/**
 * 模拟NextAuth的signOut
 * TODO: 后续替换为真实NextAuth的signOut
 */
export async function signOut(options?: {
  callbackUrl?: string;
}): Promise<void> {
  // TODO: 调用后端revoke token
  console.log("Sign out", options);

  if (typeof window !== "undefined") {
    window.location.href = options?.callbackUrl || "/login";
  }
}
