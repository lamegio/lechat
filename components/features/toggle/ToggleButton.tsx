'use client'

import { Button } from "@/components/ui/button";
import React from "react";

export default function ToggleButton({
  children,
  fnAction,
  aria,
}: {
  children: React.ReactNode;
  fnAction: React.MouseEventHandler<HTMLButtonElement>;
  aria: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={fnAction}
      className="w-7 h-7 rounded-md cursor-pointer bg-background-color-transparent-1 backdrop-blur-xl hover:bg-theme-color hover:text-font-color-invert shadow-chat-card-shadow transition-all duration-300 hover:scale-105"
      aria-label={aria}
    >
      {children}
    </Button>
  );
}
