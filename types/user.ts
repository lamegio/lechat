export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  provider: "github" | "google";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface GithubLoginParams {
  code: string;
  state?: string;
}

export interface GoogleLoginParams {
  code: string;
  state?: string;
}

export type LoginProvider = "github" | "google";
