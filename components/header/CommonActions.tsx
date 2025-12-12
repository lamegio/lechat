import { Menu, Search as SearchIcon } from "lucide-react";

export default function CommonActions() {
  return (
    <div className="flex justify-end min-w-40">
      <ActionButton>
        <SearchIcon className="w-7 h-7 hover:text-link-hover-font-color" />
      </ActionButton>
      <button className="cursor-pointer block lg:hidden">
        <Menu className="font-bold hover:text-link-hover-font-color"/>
      </button>
    </div>
  );
}

function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="cursor-pointer backdrop-blur-md">
      {children}
    </button>
  )
}