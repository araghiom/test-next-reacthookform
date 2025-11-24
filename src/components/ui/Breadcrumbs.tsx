import Link from "next/link"
import ArrowSVG from "@/_assets/icons/chevron-up.svg"
import BackSVG from "_assets/svg/linkArrow.svg"
import type { Route } from "next"
import type { BreadcrumbList, WithContext } from "schema-dts"

const Breadcrumbs = ({
  list,
  isAnalysis,
}: {
  list: { title: string; href: Route | any }[]
  isAnalysis?: boolean
}) => {
  const homeSection = [{ title: "خانه", href: "" as Route }]
  const x = homeSection.concat(list)

  const jsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: x.map(({ title, href }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: title,
      item: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${href}`,
    })),
  }

  return (
    <div className="flex justify-between truncate">
      <div className="flex items-center gap-x-1 text-xxs text-text-subTitle ">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Link href={"/"}>خانه</Link>
        {list.map(({ title, href }, index) => (
          <div key={index} className="flex items-center justify-center gap-x-1">
            <ArrowSVG className="-rotate-90 pb-1" />
            <Link
              href={href}
              className="max-w-[600px] truncate whitespace-nowrap sm:max-w-[200px] md:max-w-[450px]"
            >
              {title}
            </Link>
          </div>
        ))}
      </div>
      {/* {list?.length > 2 && (
        <Link href={list?.[list.length - (isAnalysis ? 3 : 2)]?.href}>
          <BackSVG />
        </Link>
      )} */}
    </div>
  )
}

export default Breadcrumbs
