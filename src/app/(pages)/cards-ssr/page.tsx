import type { Metadata } from "next";
import { cardsSSRRequest } from "@/requests/cards-ssr.request";
import { Card } from "@/components/shared/Card";
import { postCardType } from "@/types/card.type";
import { PageSchema } from "@/components/shared/PageSchema";
import { appConfig } from "@/configs/app.config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cards SSR | Next.js App",
  description:
    "View cards using Server-Side Rendering (SSR) - generated on each request",
  openGraph: {
    title: "Cards SSR | Next.js App",
    description:
      "View cards using Server-Side Rendering (SSR) - generated on each request",
    url: `${appConfig.url}/cards-ssr`,
    siteName: appConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cards SSR | Next.js App",
    description:
      "View cards using Server-Side Rendering (SSR) - generated on each request",
  },
};

const limit = 10;
const page = 1;

export default async function CardsSSRPage() {
  const cards: postCardType[] = await cardsSSRRequest({
    limit,
    page,
  });

  return (
    <>
      <PageSchema
        title="Cards SSR Page"
        description="This page uses Server-Side Rendering (SSR) and is generated on each request"
        url={`${appConfig.url}/cards-ssr`}
        type="CollectionPage"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Cards SSR Page</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This page uses Server-Side Rendering (SSR) and is generated on each
          request.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}