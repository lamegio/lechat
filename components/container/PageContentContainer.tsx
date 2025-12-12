import { ReactNode } from "react";

export default function PageContentContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="markdown bg-background-color-page py-9 px-10 backdrop-blur-xs rounded-2xl shadow-chat-card-shadow animated-[show-up 0.6 ease-out] min-h-[60dvh] w-full xl:w-[68.75rem]">
      {children}
    </div>
  );
}
