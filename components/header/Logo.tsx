import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <div className="flex">
      <Image
        src="/logo.svg"
        width={50}
        height={50}
        loading="eager"
        alt="Logo"
      />
      <Link
        href="/"
        className="font-bold text-2xl text-center flex flex-col justify-center"
      >
        CHAT
      </Link>
    </div>
  );
}
