import Link from "next/link";

export default function Navigation() {
  const navList = [
    { id: 1, name: "关于", path: '/about' },
    { id: 2, name: "文章", path: '/article' },
    { id: 3, name: "链接", path: '/link' },
    { id: 4, name: "留言", path: '/message' },
  ]
  return (
    <div className="h-full w-full flex justify-center items-center">
      {navList.map((item) =>
        <Link
          className="hover:bg-theme-color rounded-sm hover:text-link-hover-font-color py-1 px-5 text-xl self-center leading-none"
          key={item.id}
          href={item.path}>
          {item.name}
        </Link>)
      }
    </div>
  )
}