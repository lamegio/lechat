"use client";

import { FaGithub } from "react-icons/fa";
import GoogleIcon from "@/components/ui/GoogleIcon";
import { LoginProvider, UserRole } from "@/types/comment";

interface UserBadgeProps {
  role: UserRole;
  loginProvider?: LoginProvider;
}

export function UserBadge({ role, loginProvider }: UserBadgeProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {role === UserRole.ADMIN && (
        <span className="px-2 py-0.5 text-xs bg-red-50 text-red-600 rounded">
          管理员
        </span>
      )}
      {loginProvider === LoginProvider.GITHUB && (
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <FaGithub size={10} />
        </span>
      )}
      {loginProvider === LoginProvider.GOOGLE && (
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <GoogleIcon />
        </span>
      )}
    </div>
  );
}
