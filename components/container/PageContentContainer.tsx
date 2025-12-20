import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContentContainerProps {
  children: ReactNode;
  withMarkdown?: boolean;
}

export default function PageContentContainer({
  children,
  withMarkdown = false,
}: PageContentContainerProps) {
  return (
    <div
      className={cn(
        "bg-background-color-page py-9 px-10 backdrop-blur-xs rounded-2xl shadow-chat-card-shadow animated-[show-up 0.6 ease-out] min-h-[60dvh] w-full xl:w-[68.75rem]",
        withMarkdown && "markdown",
      )}
    >
      {children}
    </div>
  );
}
