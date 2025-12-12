export default function HomeSideBarBox({
  children,
  icon,
  title,
}: {
  children: React.ReactNode;
  icon?: string;
  title?: string;
}) {
  return (
    <div className="w-full h-max bg-background-color-transparent-1 shadow-sm rounded-3xl py-6 px-5 overflow-hidden space-y-3">
      { title ?
        <div className="flex justify-start gap-x-3">
          { icon ? <img className="h-6" src={icon} alt="home sidebar icon"/> : null }
          <p className="text-xl">{ title }</p>
        </div> : null}
      <div>
        { children }
      </div>
    </div>
  )
}
