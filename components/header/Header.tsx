import Logo from "@/components/header/Logo";
import CommonActions from "@/components/header/CommonActions";
import Navigation from "@/components/header/Navigation";

export default function Header() {
  return (
    <header className="fixed bg-nav-background-color top-0 left-0 z-90 w-full h-16 backdrop-blur-sm ease-in-out text-font-color-navbar px-4">
      <div className="w-full xl:w-xl mx-auto flex justify-between items-center leading-16 h-full">
        <Logo />
        <Navigation />
        <CommonActions />
      </div>
    </header>
  )
}