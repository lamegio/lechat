import PageBanner from "@/components/PageBanner";
type Size = "default" | "wide";
export default function BaseContainer({
  children,
  pageTitle = "一个页面",
  pageDescription,
  size = "default",
}: {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  size?: Size;
}) {
  const widthClass = {
    default: "w-full xl:w-[69rem]",
    wide: "w-full xl:w-xl px-4 flex items-start justify-between",
  }[size];
  return (
    <div className="w-full">
      <PageBanner title={pageTitle} description={pageDescription} />
      <div className={`py-9 mx-auto ${widthClass}`}>{children}</div>
    </div>
  );
}
