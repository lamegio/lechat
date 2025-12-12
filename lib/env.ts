// lib/env.ts
export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";
export const isTest = process.env.NODE_ENV === "test";

// Next.js 构建时环境
export const isServer = typeof window === "undefined";
export const isClient = typeof window !== "undefined";

// 常用组合
export const isDevServer = isDev && isServer;
export const isDevClient = isDev && isClient;
