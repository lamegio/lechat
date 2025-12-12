import PageBanner from "@/components/PageBanner";
type Size = "default" | "wide";
export default function BaseContainer({
  children,
  size = "default",
}: {
  children: React.ReactNode;
  size?: Size;
}) {
  const widthClass = {
    default: "w-full xl:w-[69rem]",
    wide: "w-full xl:w-xl px-4 flex items-start justify-between",
  }[size];
  return (
    <div className="w-full">
      <PageBanner />
      <div className={`py-9 mx-auto ${widthClass}`}>{children}</div>
    </div>
  );
}
